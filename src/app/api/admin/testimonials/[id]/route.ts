import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";

// GET a specific testimonial by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    const testimonial = await prisma.testimonial.findUnique({
      where: { id }
    });
    
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 });
  }
}

// PUT update a testimonial by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.message || !data.rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Validate rating is between 1 and 5
    const rating = parseInt(data.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }
    
    // Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id }
    });
    
    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: data?.name,
        role: data.role,
        message: data.message,
        rating: rating,
        avatar: data.avatar
      }
    });
    
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE a testimonial by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    
    // Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id }
    });
    
    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    
    await prisma.testimonial.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
