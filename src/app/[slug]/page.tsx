import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cityPage = await (prisma as any).cityPage.findUnique({
    where: { slug, published: true }
  });

  if (cityPage) {
    return {
      title: cityPage.metaTitle || cityPage.title,
      description: cityPage.metaDescription || cityPage.description,
    };
  }

  return {
    title: "French Skill Academy",
  };
}

/**
 * Root dynamic route [slug] is now a redirection layer.
 * Any legacy or root-level course URLs are permanently redirected to /course/[slug].
 */
export default async function RootSlugRedirect({ params }: Params) {
  const { slug } = await params;

  // Reserved routes are handled by their own folders. 
  const reservedRoutes = ['admin', 'api', 'blog', 'courses', 'support', 'robots.txt', 'sitemap.xml'];
  if (reservedRoutes.includes(slug)) {
    return null;
  }

  // 1. Check if it's a valid city page slug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cityPage = await (prisma as any).cityPage.findUnique({
    where: { slug, published: true }
  });

  if (cityPage) {
    // Render the city page UI (I will create this component/layout)
    return <CityPageDisplay page={cityPage} />;
  }

  // 2. Check if it's a valid course slug in the database
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

// Simple display component for City Pages (can be expanded)
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

function CityPageDisplay({ page }: { page: any }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">{page.title}</h1>
          <div className="w-20 h-1 bg-blue-600 mb-8"></div>
          
          <div 
            className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: typeof page.content === 'string' ? page.content : "" }}
          />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
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
