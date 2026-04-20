import { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";
import { blogPosts as staticBlogPosts } from "@/lib/blog-data";
import { getBaseUrl } from "@/lib/sitemap-utils";

export const dynamic = "force-dynamic";

// Helper function to safely fetch courses from database
async function getCourses() {
  try {
    // Try to fetch from database in all environments
    const courses = await prisma.course.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return courses;
  } catch (error) {
    console.warn("Failed to fetch courses from database for sitemap:", error);
  }

  // Fallback: return empty array or static data if needed
  return [];
}

// Helper function to safely fetch blog posts from database
async function getBlogPosts() {
  try {
    // Try to fetch from database in all environments
    const blogPosts = await prisma.blogPost.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return blogPosts;
  } catch (error) {
    console.warn(
      "Failed to fetch blog posts from database for sitemap:",
      error
    );
  }

  // Fallback: use static blog data
  return staticBlogPosts.map((post) => ({
    slug: post.slug,
    updatedAt: new Date(post.date),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Fetch dynamic content
  const [courses, blogPosts] = await Promise.all([
    getCourses(),
    getBlogPosts(),
  ]);

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic course pages - Standardized to /course/[slug]
  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/course/${course.slug}`,
    lastModified: course.updatedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic blog post pages
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Combine all pages
  return [...mainPages, ...coursePages, ...blogPostPages];
}

// HTTP GET route handler to serve the sitemap as XML
export async function GET(): Promise<Response> {
  const entries = await sitemap();

  const escapeXml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries
      .map((item) => {
        const lastmod = item.lastModified
          ? new Date(item.lastModified).toISOString()
          : undefined;
        const changefreq = item.changeFrequency;
        const priority = item.priority;
        return (
          `<url>` +
          `<loc>${escapeXml(item.url)}</loc>` +
          (lastmod ? `<lastmod>${lastmod}</lastmod>` : "") +
          (changefreq ? `<changefreq>${changefreq}</changefreq>` : "") +
          (priority !== undefined
            ? `<priority>${priority.toFixed(1)}</priority>`
            : "") +
          `</url>`
        );
      })
      .join("") +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=30, max-age=30", // 1 min cache
    },
  });
}
