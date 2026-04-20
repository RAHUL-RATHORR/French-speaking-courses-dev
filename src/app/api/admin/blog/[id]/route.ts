import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
function normalizeSameOriginAssetUrl(input: unknown, origin: string): string | null {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if (!value) return null;
  if (value.startsWith("/")) return value;

  try {
    const url = new URL(value);
    const originUrl = new URL(origin);
    if (url.host === originUrl.host) return `${url.pathname}${url.search}`;
  } catch {
    // ignore
  }

  return value;
}

// GET a specific blog post by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const blogPost = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!blogPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    
    return NextResponse.json(blogPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

// PUT update a blog post by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    const origin = request.nextUrl.origin;
    
    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Check if blog post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    
    // Check if slug is changed and already exists for another post
    if (data.slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug: data.slug }
      });
      
      if (slugExists && slugExists.id !== id) {
        return NextResponse.json({ error: "Blog post with this slug already exists" }, { status: 409 });
      }
    }
    
    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        slug: data.slug,
        image: normalizeSameOriginAssetUrl(data.image, origin),
        excerpt: data.excerpt,
        author: data.author
      }
    });

    // Ensure public pages reflect updates (including new uploaded images)
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedBlogPost.slug}`);
    if (existingPost.slug && existingPost.slug !== updatedBlogPost.slug) {
      revalidatePath(`/blog/${existingPost.slug}`);
    }
    revalidatePath("/sitemap.xml");
    revalidatePath("/sitemap-blogs.xml");
    
    return NextResponse.json(updatedBlogPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE a blog post by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if blog post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    
    await prisma.blogPost.delete({
      where: { id }
    });

    // Ensure public pages drop the deleted post
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${existingPost.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/sitemap-blogs.xml");
    
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
