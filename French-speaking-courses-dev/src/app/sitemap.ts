import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/sitemap-utils";

export const dynamic = "force-dynamic";

// Helper function to safely fetch courses from database


// Helper function to safely fetch blog posts from database


export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

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
  ];

  // Combine all pages
  return [...mainPages];
}

export default function sitemapIndex(): MetadataRoute.SitemapIndex {
  const baseUrl = getBaseUrl();
  const today = new Date().toISOString().split("T")[0];

  return [
    {
      url: `${baseUrl}/sitemap-courses.xml`,
      lastModified: today,
    },
    {
      url: `${baseUrl}/sitemap-blogs.xml`,
      lastModified: today,
    },
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
  ];
}
