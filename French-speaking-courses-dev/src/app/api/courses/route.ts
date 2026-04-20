import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;
// GET all courses for public consumption
export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });

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

    const normalized = courses.map((course) => ({
      ...course,
      image: normalize(course.image),
      instructorImage: normalize(course.instructorImage),
      brochureUrl: normalize(course.brochureUrl),
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
