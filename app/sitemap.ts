import { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";
import { getBaseUrl } from "@/lib/sitemap-utils";

export const dynamic = "force-dynamic";

/**
 * Single dynamic sitemap generator for Next.js 15.
 * Generates all URLs for Main pages, Courses, and Blogs.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Fetch dynamic content with safe catch
  let courses: any[] = [];
  let blogPosts: any[] = [];

  try {
    [courses, blogPosts] = await Promise.all([
      prisma.course.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.blogPost.findMany({ select: { slug: true, updatedAt: true } }),
    ]);
  } catch (error) {
    console.error("Sitemap generation database error:", error);
  }

  // Main static pages
  const mainPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/support/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic Course pages
  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/course/${course.slug}`,
    lastModified: course.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic Blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...mainPages, ...coursePages, ...blogPages];
}
