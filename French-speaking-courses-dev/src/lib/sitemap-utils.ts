/**
 * Utilities for sitemap generation
 */

export interface SitemapEntry {
  slug: string;
  updatedAt: Date;
  createdAt?: Date;
}

export interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate XML sitemap from entries
 */
export function generateXMLSitemap(entries: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('')}
</urlset>`;
}

/**
 * Convert database entries to sitemap URLs
 */
export function entriesToSitemapUrls(
  entries: SitemapEntry[],
  baseUrl: string,
  pathPrefix: string,
  changeFrequency: SitemapUrl['changeFrequency'] = 'weekly',
  priority: number = 0.7
): SitemapUrl[] {
  return entries.map(entry => ({
    url: `${baseUrl}${pathPrefix}${entry.slug}`,
    lastModified: entry.updatedAt.toISOString().split('T')[0],
    changeFrequency,
    priority,
  }));
}

/**
 * Get cache headers for sitemap responses
 */
export function getSitemapCacheHeaders(maxAge: number = 3600) {
  return {
    'Content-Type': 'application/xml',
    'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
  };
}

/**
 * Get base URL from environment or fallback
 */
export function getBaseUrl(): string {
  return 'https://www.frenchskill.com';
}
