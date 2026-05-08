import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

// GET a single city page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const cityPage = await (prisma as any).cityPage.findUnique({
      where: { id }
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

// PATCH update a city page
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    
    const cityPage = await (prisma as any).cityPage.update({
      where: { id },
      data: {
        cityName: data.cityName,
        slug: data.slug,
        title: data.title,
        description: data.description,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        published: data.published,
      }
    });

    revalidatePath(`/french-classes-in-${cityPage.slug}`);
    
    return NextResponse.json(cityPage);
  } catch (error) {
    console.error("Error updating city page:", error);
    return NextResponse.json({ error: "Failed to update city page" }, { status: 500 });
  }
}

// DELETE a city page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const cityPage = await (prisma as any).cityPage.delete({
      where: { id }
    });

    revalidatePath(`/french-classes-in-${cityPage.slug}`);
    
    return NextResponse.json({ message: "City page deleted successfully" });
  } catch (error) {
    console.error("Error deleting city page:", error);
    return NextResponse.json({ error: "Failed to delete city page" }, { status: 500 });
  }
}
