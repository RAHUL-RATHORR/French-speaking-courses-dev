import { prisma } from "./prisma";

export async function getDashboardData() {
  const [
    courseCount,
    blogCount,
    testimonialCount,
    recentCourses,
    recentBlogs,
    recentTestimonials,
    courseStats,
    testimonialStats
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
    prisma.course.aggregate({
      _sum: { students: true },
      _avg: { rating: true }
    }),
    prisma.testimonial.aggregate({
      _avg: { rating: true }
    })
  ]);

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
}
