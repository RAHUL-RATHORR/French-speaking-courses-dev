import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET all city pages
export async function GET() {
  try {
    const cityPageModel = (prisma as any).cityPage;
    if (!cityPageModel) {
      return NextResponse.json({ error: "Prisma model 'cityPage' not found. Please restart your dev server (CTRL+C and npm run dev)." }, { status: 500 });
    }
    const cityPages = await cityPageModel.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(cityPages);
  } catch (error: any) {
    console.error("Error fetching city pages:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch city pages" }, { status: 500 });
  }
}

// POST create new city page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cityName, slug, title, headerImage,
      content, middleContent, afterCourseContent,
      metaTitle, metaDescription, keywords,
      faqs, testimonials
    } = body;

    if (!cityName || !slug) {
      return NextResponse.json({ error: "City Name and Slug are required" }, { status: 400 });
    }

    const cityPageModel = (prisma as any).cityPage;
    if (!cityPageModel) {
      return NextResponse.json({ error: "Prisma model 'cityPage' not found. Please restart your dev server (CTRL+C and npm run dev)." }, { status: 500 });
    }

    try {
      const cityPage = await cityPageModel.create({
        data: {
          cityName,
          slug,
          title: title || cityName,
          headerImage,
          content: content || "",
          middleContent: middleContent || null,
          afterCourseContent: afterCourseContent || null,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
          keywords: keywords || null,
          faqs: faqs || [],
          testimonials: testimonials || [],
          isActive: true
        }
      });
      return NextResponse.json(cityPage);
    } catch (dbError: any) {
      console.error("PRISMA CREATE ERROR:", dbError);
      if (dbError.code === 'P2002') {
        return NextResponse.json({ error: "A page with this URL Slug already exists" }, { status: 400 });
      }
      return NextResponse.json({ error: `Database Error: ${dbError.message}` }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Error in POST /api/admin/city-pages:", error);
    return NextResponse.json({ error: error.message || "Failed to create city page" }, { status: 500 });
  }
}
