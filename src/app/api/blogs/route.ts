import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic"; // ⬅ force API route to run on each request
// GET all blog posts for public consumption
export async function GET(request: NextRequest) {
  try {
    console.log("Fetching blog posts from DB...");
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${blogPosts.length} blog posts`);

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

    const normalized = blogPosts.map((post) => ({
      ...post,
      image: normalize(post.image),
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
