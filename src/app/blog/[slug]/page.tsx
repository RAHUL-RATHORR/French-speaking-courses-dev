import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate } from "@/lib/utils";
import { generateBreadcrumbStructuredData } from "@/lib/structured-data";
import { blogPosts as staticBlogPosts } from "@/lib/blog-data";
import { prisma } from "@/lib/db/prisma";
export const revalidate = 60;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  author: string;
  createdAt: string;
  updatedAt: string;
}

// Custom structured data function for API blog posts
function createBlogPostStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post?.image || "/french-skill.png",
    publisher: {
      "@type": "Organization",
      name: "French Skill Academy",
      logo: {
        "@type": "ImageObject",
        url: "https://frenchskill.com/logo.png",
      },
    },
    datePublished: post.createdAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
  };
}

// Fetch a single blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (post) {
      return {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.warn("DB fetch failed, falling back to static data:", error);
  }

  // Fallback to static data
  const staticPost = staticBlogPosts.find((post) => post.slug === slug);
  if (!staticPost) {
    return null;
  }

  return {
    id: staticPost.id,
    title: staticPost.title,
    slug: staticPost.slug,
    excerpt: staticPost.excerpt,
    content: staticPost.content,
    image: staticPost.image,
    author: staticPost.author.name,
    createdAt: staticPost.date,
    updatedAt: staticPost.date,
  };
}

// Fetch related blog posts (simplified version)
async function getRelatedPosts(currentPostId: string): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        id: { not: currentPostId }
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        author: true,
        createdAt: true,
        updatedAt: true,
      },
      take: 3,
      orderBy: { createdAt: 'desc' }
    });

    return posts.map(post => ({
      ...post,
      content: '', // Related posts don't need content
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.warn("DB fetch failed for related posts, falling back to static data:", error);
  }

  // Fallback to static data
  const relatedPosts = staticBlogPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3)
    .map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author.name,
      createdAt: post.date,
      updatedAt: post.date,
    }));

  return relatedPosts;
}

// Fetch all blog posts for static params generation
async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      select: { slug: true }
    });
    return posts.map(p => ({ slug: p.slug } as BlogPost));
  } catch {
    // Fallback to static data
    return staticBlogPosts.map((post) => ({
      slug: post.slug,
    } as BlogPost));
  }
}

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "French learning blog post",
    openGraph: {
      title: post.title,
      description: post.excerpt || "French learning blog post",
      images: [
        {
          url: post?.image || "/french-skill.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.createdAt,
      locale: "en_US",
      siteName: "French Skill",
    },
    alternates: {
      canonical: `https://www.frenchskill.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "French learning blog post",
      images: [post?.image || "/french-skill.png"],
      creator: "@frenchskill",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.id);

  // Generate structured data
  const postStructuredData = createBlogPostStructuredData(post);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.frenchskill.com/" },
    { name: "Blog", url: "https://www.frenchskill.com/blog" },
    { name: post.title, url: `https://www.frenchskill.com/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <main>
        {/* Breadcrumbs */}
        <nav className="bg-slate-50 py-3 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <ol className="flex flex-wrap items-center text-sm">
              <li className="flex items-center">
                <Link href="/" className="text-gray-500 hover:text-french-blue">
                  Home
                </Link>
                <svg
                  className="w-3 h-3 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <li className="flex items-center">
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-french-blue"
                >
                  Blog
                </Link>
                <svg
                  className="w-3 h-3 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <li className="text-french-blue font-medium truncate max-w-xs">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Blog Post Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full h-75 md:h-100 mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>By {post.author}</span>
              </div>
            </div>

            {/* Post Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-french-blue">
                {post.excerpt}
              </div>
            )}
          </header>

          {/* HTML Content from API */}
          <article className="prose prose-lg prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <div
                  key={relatedPost.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg"
                >
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedPost?.image || "/french-skill.png"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 hover:text-french-blue transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <time dateTime={relatedPost.createdAt}>
                          {formatDate(relatedPost.createdAt)}
                        </time>
                        <span>By {relatedPost.author}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="bg-linear-to-r from-french-blue to-blue-600 rounded-xl p-8 md:p-12 text-white">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Ready to start your French journey?
                </h3>
                <p className="text-white text-opacity-90">
                  Take your French skills to the next level with our expert-led
                  courses.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/courses"
                  className="bg-white text-french-blue px-6 py-3 rounded-lg font-medium inline-block hover:bg-blue-50 transition-colors"
                >
                  Explore Our Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
