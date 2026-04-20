import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
export const dynamic = "force-dynamic";
import { blogPosts as staticBlogPosts } from '@/lib/blog-data';
import { generateXMLSitemap, entriesToSitemapUrls, getSitemapCacheHeaders, getBaseUrl } from '@/lib/sitemap-utils';

export async function GET() {
  try {
    let blogPosts;
    
    try {
      // Try to fetch blog posts from database
      blogPosts = await prisma.blogPost.findMany({
        select: {
          slug: true,
          updatedAt: true,
          createdAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch {
      console.warn('Database unavailable, using static blog data for sitemap');
      // Fallback to static blog data
      blogPosts = staticBlogPosts.map(post => ({
        slug: post.slug,
        updatedAt: new Date(post.date),
        createdAt: new Date(post.date),
      }));
    }

    const baseUrl = getBaseUrl();
    
    // Convert to sitemap URLs
    const sitemapUrls = entriesToSitemapUrls(
      blogPosts,
      baseUrl,
      '/blog/',
      'weekly',
      0.7
    );
    
    // Generate XML sitemap
    const sitemap = generateXMLSitemap(sitemapUrls);

    return new NextResponse(sitemap, {
      headers: getSitemapCacheHeaders(1800), // 30 minutes cache for blogs
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    
    // Return empty sitemap on error
    const emptySitemap = generateXMLSitemap([]);

    return new NextResponse(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
