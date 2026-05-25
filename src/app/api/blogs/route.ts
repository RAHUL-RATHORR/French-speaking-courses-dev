import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const revalidate = 60;
// GET all blog posts for public consumption
export async function GET(request: NextRequest) {
  try {
    console.log("Fetching blog posts from DB...");
    const blogPosts = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        author: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${blogPosts.length} blog posts`);

    const normalize = (value: unknown) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      if (!trimmed) return null;
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
