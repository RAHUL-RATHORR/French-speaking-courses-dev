import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
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

// GET all blog posts
export async function GET() {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        excerpt: true,
        image: true,
        createdAt: true
      }
    });
    
    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

// POST create a new blog post
export async function POST(request: NextRequest) {
  try {
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
    
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    // Check if slug is already taken
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: data.slug }
    });
    
    if (existingPost) {
      return NextResponse.json({ error: "Blog post with this slug already exists" }, { status: 409 });
    }
    
    const blogPost = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        slug: data.slug,
        image: normalizeSameOriginAssetUrl(data.image, origin),
        excerpt: data.excerpt,
        author: data.author || "French Skill Academy"
      }
    });

    // Ensure public pages reflect the new post immediately
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${blogPost.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/sitemap-blogs.xml");
    
    return NextResponse.json(blogPost, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
