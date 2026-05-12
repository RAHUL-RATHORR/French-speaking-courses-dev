import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET single city page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cityPage = await prisma.cityPage.findUnique({
      where: { id },
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

    if (!cityPage) {
      return NextResponse.json({ error: "City page not found" }, { status: 404 });
    }

    return NextResponse.json(cityPage);
  } catch (error) {
    console.error("Error fetching city page:", error);
    return NextResponse.json({ error: "Failed to fetch city page" }, { status: 500 });
  }
}

// PATCH update city page
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    console.log("Updating city page", id, "with data:", JSON.stringify(body, null, 2));
    
    // Remove ID from body if present to avoid prisma error
    const updateData = { ...body };
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.section4Content; // Forcefully remove Section 4 to avoid DB errors

    try {
      const cityPage = await prisma.cityPage.update({
        where: { id },
        data: updateData,
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
      console.error("PRISMA UPDATE ERROR:", dbError);
      if (typeof dbError === 'object' && dbError !== null && 'code' in dbError && dbError.code === 'P2002') {
        return NextResponse.json({ error: "A page with this URL Slug already exists" }, { status: 400 });
      }
      return NextResponse.json({ error: `Database Error: ${dbError instanceof Error ? dbError.message : String(dbError)}` }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in PATCH /api/admin/city-pages/[id]:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update city page" }, { status: 500 });
  }
}

// DELETE city page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.cityPage.delete({
      where: { id }
    });

    return NextResponse.json({ message: "City page deleted successfully" });
  } catch (error) {
    console.error("Error deleting city page:", error);
    return NextResponse.json({ error: "Failed to delete city page" }, { status: 500 });
  }
}
