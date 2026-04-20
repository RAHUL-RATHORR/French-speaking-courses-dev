import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
export const revalidate = 0;
// GET a single blog post by slug
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const blogPost = await prisma.blogPost.findFirst({
      where: { slug }
    });
    
    if (!blogPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const origin = request.nextUrl.origin;
    const normalize = (value: unknown) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("/")) return trimmed;
      try {
        const url = new URL(trimmed);
        const originUrl = new URL(origin);
        if (url.host === originUrl.host) return `${url.pathname}${url.search}`;
      } catch {
        // ignore
      }
      return trimmed;
    };

    return NextResponse.json({
      ...blogPost,
      image: normalize(blogPost.image),
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}
