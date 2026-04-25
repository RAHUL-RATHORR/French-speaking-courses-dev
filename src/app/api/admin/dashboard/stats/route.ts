import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Check authentication once
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch everything in parallel on the server
    const [
      courseCount,
      blogCount,
      testimonialCount,
      recentCourses,
      recentBlogs,
      recentTestimonials,
      allCourseStats
    ] = await Promise.all([
      prisma.course.count(),
      prisma.blogPost.count(),
      prisma.testimonial.count(),
      prisma.course.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, level: true, slug: true, createdAt: true }
      }),
      prisma.blogPost.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, slug: true, createdAt: true }
      }),
      prisma.testimonial.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, rating: true, createdAt: true }
      }),
      prisma.course.findMany({
        select: { students: true, rating: true }
      })
    ]);

    // Calculate total students and average rating from testimonials
    const totalStudents = allCourseStats.reduce((sum, c) => sum + (c.students || 0), 0);
    
    // Average rating logic
    const testimonialRatings = recentTestimonials.map(t => t.rating); // This is just recent, but good enough for dashboard quick view
    // Or fetch all ratings if it's small
    const allTestimonialRatings = await prisma.testimonial.findMany({ select: { rating: true } });
    const ratings = [
      ...allCourseStats.filter(c => c.rating).map(c => c.rating as number),
      ...allTestimonialRatings.map(t => t.rating)
    ];
    
    const avgRating = ratings.length > 0 
      ? parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1))
      : 0;

    return NextResponse.json({
      stats: {
        courses: courseCount,
        blogPosts: blogCount,
        testimonials: testimonialCount,
        totalStudents,
        avgRating
      },
      recent: {
        courses: recentCourses,
        blogs: recentBlogs,
        testimonials: recentTestimonials
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
