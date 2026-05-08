import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

// GET all city pages
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cityPages = await (prisma as any).cityPage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(cityPages);
  } catch (error) {
    console.error("Error fetching city pages:", error);
    return NextResponse.json({ error: "Failed to fetch city pages" }, { status: 500 });
  }
}

// POST create a new city page
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    
    if (!data.cityName || !data.title || !data.slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Check if slug is already taken
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingPage = await (prisma as any).cityPage.findUnique({
      where: { slug: data.slug }
    });
    
    if (existingPage) {
      return NextResponse.json({ error: "City page with this slug already exists" }, { status: 409 });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cityPage = await (prisma as any).cityPage.create({
      data: {
        cityName: data.cityName,
        slug: data.slug,
        title: data.title,
        description: data.description || "",
        content: data.content || {},
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.description || "",
        published: data.published !== undefined ? data.published : true,
      }
    });

    // Revalidate paths if needed
    revalidatePath(`/french-classes-in-${cityPage.slug}`);
    
    return NextResponse.json(cityPage, { status: 201 });
  } catch (error) {
    console.error("Error creating city page:", error);
    return NextResponse.json({ error: "Failed to create city page" }, { status: 500 });
  }
}
