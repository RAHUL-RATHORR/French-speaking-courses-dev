import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    const slug = params.slug;
    
    if (!slug) {
      return NextResponse.json({ error: "Course slug is required" }, { status: 400 });
    }
    
    const course = await prisma.course.findUnique({
      where: { slug }
    });
    
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
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
      ...course,
      image: normalize(course.image),
      instructorImage: normalize(course.instructorImage),
      brochureUrl: normalize(course.brochureUrl),
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
