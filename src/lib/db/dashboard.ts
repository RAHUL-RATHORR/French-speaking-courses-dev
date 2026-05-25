import { prisma } from "./prisma";

import { unstable_cache } from 'next/cache';

export const getDashboardData = unstable_cache(async () => {
  console.log("Fetching dashboard data sequentially...");
  const courseCount = await prisma.course.count();
  const blogCount = await prisma.blogPost.count();
  const testimonialCount = await prisma.testimonial.count();
  
  const recentCourses = await prisma.course.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, level: true, slug: true, createdAt: true }
  });
  
  const recentBlogs = await prisma.blogPost.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, createdAt: true }
  });
  
  const recentTestimonials = await prisma.testimonial.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, rating: true, createdAt: true }
  });
  
  const courseStats = await prisma.course.aggregate({
    _sum: { students: true },
    _avg: { rating: true }
  });
  
  const testimonialStats = await prisma.testimonial.aggregate({
    _avg: { rating: true }
  });

  // Calculate total students
  const totalStudents = courseStats._sum.students || 0;
  
  // Combine ratings for average
  const courseAvg = courseStats._avg.rating || 0;
  const testimonialAvg = testimonialStats._avg.rating || 0;
  
  const avgRating = courseAvg && testimonialAvg 
    ? parseFloat(((courseAvg + testimonialAvg) / 2).toFixed(1))
    : parseFloat((courseAvg || testimonialAvg || 0).toFixed(1));

  return {
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
  };
}, ['dashboard-stats'], { revalidate: 60, tags: ['dashboard-stats'] });
