import { prisma } from "./prisma";

export async function getDashboardData() {
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

  // Calculate total students
  const totalStudents = allCourseStats.reduce((sum, c) => sum + (c.students || 0), 0);
  
  // Average rating logic
  const allTestimonialRatings = await prisma.testimonial.findMany({ select: { rating: true } });
  const ratings = [
    ...allCourseStats.filter(c => c.rating).map(c => c.rating as number),
    ...allTestimonialRatings.map(t => t.rating)
  ];
  
  const avgRating = ratings.length > 0 
    ? parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1))
    : 0;

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
