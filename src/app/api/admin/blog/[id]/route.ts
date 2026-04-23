import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

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

// GET a single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

// PUT update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const origin = request.nextUrl.origin;

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // If slug is changed, check if new slug is taken
    if (data.slug && data.slug !== existingPost.slug) {
      const slugTaken = await prisma.blogPost.findUnique({
        where: { slug: data.slug }
      });
      if (slugTaken) {
        return NextResponse.json({ error: "Slug already taken" }, { status: 409 });
      }
    }

    const updatedPost = await prisma.blogPost.update({
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

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);
    if (existingPost.slug !== updatedPost.slug) {
      revalidatePath(`/blog/${existingPost.slug}`);
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // Check if post exists
    const post = await prisma.blogPost.findUnique({
      where: { id }
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    await prisma.blogPost.delete({
      where: { id }
    });

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
