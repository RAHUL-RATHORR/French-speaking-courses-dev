# Sitemap System Documentation

This project includes a comprehensive sitemap system that automatically generates sitemaps for courses and blog posts.

## Available Sitemaps

### Main Sitemap
- **URL**: `/sitemap.xml`
- **Type**: Next.js native sitemap
- **Content**: Main pages + dynamic courses and blogs
- **Cache**: 1 hour

### Course Sitemap
- **URL**: `/sitemap-courses.xml`
- **Type**: Dynamic XML sitemap
- **Content**: All courses from database
- **Cache**: 1 hour
- **Fallback**: Empty sitemap if database unavailable

### Blog Sitemap
- **URL**: `/sitemap-blogs.xml`
- **Type**: Dynamic XML sitemap
- **Content**: Blog posts from database or static data
- **Cache**: 30 minutes
- **Fallback**: Static blog data if database unavailable

### Sitemap Index
- **URL**: `/sitemap-index.xml`
- **Type**: XML sitemap index
- **Content**: References to all other sitemaps
- **Cache**: 1 hour

## Features

### Automatic Generation
- Sitemaps are generated dynamically from database content
- Fallback to static data when database is unavailable
- Proper caching headers for performance

### Error Handling
- Graceful fallbacks when database is unavailable
- Empty sitemaps returned on errors
- Detailed error logging

### SEO Optimization
- Proper XML formatting
- Last modified dates from database
- Appropriate change frequencies and priorities
- Referenced in robots.txt

## Usage

### Manual Regeneration
You can manually trigger sitemap regeneration using the API:

\`\`\`bash
# Without authentication
curl -X POST https://frenchskill.com/api/revalidate-sitemaps

# With authentication token
curl -X POST https://frenchskill.com/api/revalidate-sitemaps \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

### Script-based Regeneration
Use the provided script for batch regeneration:

\`\`\`bash
node scripts/regenerate-sitemaps.js
\`\`\`

## Configuration

### Environment Variables
- \`NEXT_PUBLIC_SITE_URL\`: Base URL for sitemaps (defaults to https://frenchskill.com)
- \`SITEMAP_REVALIDATION_TOKEN\`: Optional token for API authentication

### Cache Settings
- Courses: 1 hour cache
- Blogs: 30 minutes cache
- Index: 1 hour cache

## File Structure

\`\`\`
src/
├── app/
│   ├── sitemap.ts                    # Main Next.js sitemap
│   ├── robots.ts                     # Updated with sitemap URLs
│   ├── sitemap-courses.xml/route.ts  # Courses sitemap endpoint
│   ├── sitemap-blogs.xml/route.ts    # Blogs sitemap endpoint
│   ├── sitemap-index.xml/route.ts    # Sitemap index endpoint
│   └── api/
│       └── revalidate-sitemaps/route.ts # Manual regeneration API
├── lib/
│   └── sitemap-utils.ts              # Shared utilities
└── scripts/
    └── regenerate-sitemaps.js        # Regeneration script
\`\`\`

## Integration with CMS

When content is added/updated through the admin panel, you can automatically trigger sitemap regeneration by calling the revalidation API:

\`\`\`typescript
// After creating/updating content
await fetch('/api/revalidate-sitemaps', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.SITEMAP_REVALIDATION_TOKEN}\`
  }
});
\`\`\`

## Search Engine Submission

The sitemaps are automatically referenced in robots.txt and will be discovered by search engines. You can also manually submit them to:

- Google Search Console
- Bing Webmaster Tools
- Other search engines

## Monitoring

Monitor sitemap health by checking:
- Response times and status codes
- Content freshness (last modified dates)
- Error logs for database connectivity issues
