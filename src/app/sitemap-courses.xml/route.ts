import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
export const dynamic = "force-dynamic";
import { generateXMLSitemap, entriesToSitemapUrls, getSitemapCacheHeaders, getBaseUrl } from '@/lib/sitemap-utils';

export async function GET() {
  try {
    // Fetch all courses from the database
    const courses = await prisma.course.findMany({
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const baseUrl = getBaseUrl();
    
    // Convert to sitemap URLs
    const sitemapUrls = entriesToSitemapUrls(
      courses,
      baseUrl,
      '/course/',
      'monthly',
      0.8
    );
    
    // Generate XML sitemap
    const sitemap = generateXMLSitemap(sitemapUrls);

    return new NextResponse(sitemap, {
      headers: getSitemapCacheHeaders(3600), // 1 hour cache
    });
  } catch (error) {
    console.error('Error generating courses sitemap:', error);
    
    // Return empty sitemap on error
    const emptySitemap = generateXMLSitemap([]);

    return new NextResponse(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
