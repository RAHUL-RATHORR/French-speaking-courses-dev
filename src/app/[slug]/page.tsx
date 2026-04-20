import { redirect } from "next/navigation";
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

  // Reserved routes are handled by their own folders (Next.js handles this automatically,
  // but we return null/notFound here just in case of any overlap).
  const reservedRoutes = ['admin', 'api', 'blog', 'courses', 'support', 'robots.txt', 'sitemap.xml'];
  if (reservedRoutes.includes(slug)) {
    return null;
  }

  // Check if it's a valid course slug
  const course = await prisma.course.findUnique({
    where: { slug },
    select: { slug: true }
  });

  if (course) {
    // 301 Permanent Redirect to canonical URL
    redirect(`/course/${course.slug}`);
  }

  // If not a course, show 404
  return null;
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
