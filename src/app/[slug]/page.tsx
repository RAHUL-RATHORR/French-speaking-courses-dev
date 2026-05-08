import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Root dynamic route [slug] is now a redirection layer.
 * Any legacy or root-level course URLs are permanently redirected to /course/[slug].
 */
export default async function RootSlugRedirect({ params }: Params) {
  const { slug } = await params;

  // Reserved routes are handled by their own folders. 
  // If we reach here for a reserved route, we return null to let the 
  // static route take precedence (Next.js routing behavior).
  const reservedRoutes = ['admin', 'api', 'blog', 'courses', 'support', 'robots.txt', 'sitemap.xml'];
  if (reservedRoutes.includes(slug)) {
    return null;
  }

  // Check if it's a valid course slug in the database
  const course = await prisma.course.findUnique({
    where: { slug },
    select: { slug: true }
  });

  if (course) {
    // 301 Permanent Redirect to canonical singular course URL
    redirect(`/course/${course.slug}`);
  }

  // If slug is not a course and not a reserved route, trigger a proper 404
  notFound();
}

// Generate static params for possible root slugs (optional, helps with SEO redirects)
export async function generateStaticParams() {
  try {
    const courses = await prisma.course.findMany({ select: { slug: true } });
    return courses.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}
