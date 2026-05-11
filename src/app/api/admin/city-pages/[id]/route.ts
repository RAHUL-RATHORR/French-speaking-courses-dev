import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET single city page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const { id: _, createdAt, updatedAt, ...updateData } = body;

    try {
      const cityPage = await (prisma as any).cityPage.update({
        where: { id },
        data: updateData
      });
      return NextResponse.json(cityPage);
    } catch (dbError: any) {
      console.error("PRISMA UPDATE ERROR:", dbError);
      if (dbError.code === 'P2002') {
        return NextResponse.json({ error: "A page with this URL Slug already exists" }, { status: 400 });
      }
      return NextResponse.json({ error: `Database Error: ${dbError.message}` }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error in PATCH /api/admin/city-pages/[id]:", error);
    return NextResponse.json({ error: error.message || "Failed to update city page" }, { status: 500 });
  }
}

// DELETE city page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await (prisma as any).cityPage.delete({
      where: { id }
    });

    return NextResponse.json({ message: "City page deleted successfully" });
  } catch (error) {
    console.error("Error deleting city page:", error);
    return NextResponse.json({ error: "Failed to delete city page" }, { status: 500 });
  }
}
