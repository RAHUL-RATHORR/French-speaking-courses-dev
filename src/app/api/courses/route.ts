import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Course } from "@prisma/client";

export const revalidate = 60;
// GET all courses for public consumption
export async function GET(request: NextRequest) {
  try {
    console.log("Fetching courses from DB...");
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        level: true,
        duration: true,
        price: true,
        originalPrice: true,
        rating: true,
        students: true,
        image: true,
        registrationOpen: true,
        instructorImage: true,
        brochureUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${courses.length} courses`);

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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching courses:", error);
    return NextResponse.json({
      error: "Failed to fetch courses",
      details: message
    }, { status: 500 });
  }
}
