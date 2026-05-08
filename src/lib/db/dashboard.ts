import { prisma } from "./prisma";

export async function getDashboardData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    (prisma as any).course.count(),
    (prisma as any).blogPost.count(),
    (prisma as any).testimonial.count(),
    (prisma as any).course.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, level: true, slug: true, createdAt: true }
    }),
    (prisma as any).blogPost.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true, createdAt: true }
    }),
    (prisma as any).testimonial.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, rating: true, createdAt: true }
    }),
    (prisma as any).course.aggregate({
      _sum: { students: true },
      _avg: { rating: true }
    }),
    (prisma as any).testimonial.aggregate({
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
