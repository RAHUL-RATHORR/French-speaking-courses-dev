import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic";

// GET all testimonials for public consumption
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
