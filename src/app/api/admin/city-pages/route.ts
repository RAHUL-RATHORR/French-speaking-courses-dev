import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET all city pages
export async function GET() {
  try {
    console.log("Fetching city pages from database...");
    
    const cityPages = await prisma.cityPage.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        cityName: true,
        slug: true,
        title: true,
        content: true,
        middleContent: true,
        afterCourseContent: true,
        headerImage: true,
        faqs: true,
        testimonials: true,
        metaTitle: true,
        metaDescription: true,
        keywords: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    console.log(`Successfully fetched ${cityPages.length} city pages.`);
    return NextResponse.json(cityPages);
  } catch (error) {
    console.error("CRITICAL ERROR FETCHING CITY PAGES:", error);

    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to fetch city pages",
      details: error
    }, { status: 500 });
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

    try {
      const cityPage = await prisma.cityPage.create({
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
        },
        select: {
          id: true,
          cityName: true,
          slug: true,
          title: true,
          content: true,
          middleContent: true,
          afterCourseContent: true,
          headerImage: true,
          faqs: true,
          testimonials: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return NextResponse.json(cityPage);
    } catch (dbError) {
      console.error("PRISMA CREATE ERROR:", dbError);
      if (typeof dbError === 'object' && dbError !== null && 'code' in dbError && dbError.code === 'P2002') {
        return NextResponse.json({ error: "A page with this URL Slug already exists" }, { status: 400 });
      }
      return NextResponse.json({ error: `Database Error: ${dbError instanceof Error ? dbError.message : String(dbError)}` }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in POST /api/admin/city-pages:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create city page" }, { status: 500 });
  }
}
