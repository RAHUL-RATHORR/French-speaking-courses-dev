#!/usr/bin/env node

/**
 * Script to trigger sitemap regeneration
 * Can be used in webhooks or CRON jobs
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frenchskill.com';

const sitemapUrls = [
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/sitemap-courses.xml`,
  `${SITE_URL}/sitemap-blogs.xml`,
  `${SITE_URL}/sitemap-index.xml`,
];

async function regenerateSitemaps() {
  console.log('🔄 Starting sitemap regeneration...');
  
  for (const url of sitemapUrls) {
    try {
      console.log(`📍 Fetching: ${url}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (response.ok) {
        console.log(`✅ Success: ${url}`);
      } else {
        console.log(`❌ Failed: ${url} (${response.status})`);
      }
    } catch (error) {
      console.log(`❌ Error: ${url} - ${error.message}`);
    }
  }
  
  console.log('🎉 Sitemap regeneration completed!');
}

// Run if called directly
if (require.main === module) {
  regenerateSitemaps().catch(console.error);
}

module.exports = { regenerateSitemaps };
