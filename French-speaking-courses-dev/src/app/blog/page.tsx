import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts as staticBlogPosts } from '@/lib/blog-data';
import type { Metadata } from 'next';
import { getRequestOrigin } from '@/lib/server-url';
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'French Learning Blog | French Skill',
  description: 'Tips, resources, and insights for French learners. Read our latest articles on vocabulary, grammar, pronunciation, and exam prep.',
  alternates: { canonical: 'https://www.frenchskill.com/blog' },
  openGraph: {
    title: 'French Learning Blog | French Skill',
    description: 'Tips, resources, and insights for French learners.',
    url: 'https://www.frenchskill.com/blog',
    type: 'website',
  },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image',
    title: 'French Learning Blog | French Skill',
    description: 'Tips, resources, and insights for French learners.',
  },
};

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

async function getBlogPosts() {
  // Always try API first, then fallback to static data
  try {
    const baseUrl = getRequestOrigin();
    const response = await fetch(`${baseUrl}/api/blogs`, {
      next: { revalidate: 10 }, // Cache for 10 seconds
      cache: "no-store" // ⬅ always fresh
    });
    
    if (response.ok) {
      const posts = await response.json();
      return posts;
    }
    
    console.warn('API response not ok:', response.status);
  } catch (error) {
    console.warn('API fetch failed, falling back to static data:', error);
  }
  
  // Transform static blog data to match API interface
  return staticBlogPosts.map(post => ({
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
}

export default async function BlogPage() {
  // Server-side data fetching
  let blogPosts: BlogPost[] = [];
  let error = null;
  
  try {
    blogPosts = await getBlogPosts();
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = 'Failed to load blog posts. Please try again later.';
  }

  // Generate structured data for SEO (simplified version)
  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': blogPosts.map((post, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'BlogPosting',
        'headline': post.title,
        'url': `/blog/${post.slug}`,
        'datePublished': post.createdAt
      }
    }))
  };

  // Show error state if blog posts failed to load
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64 flex-col">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <Link 
            href="/blog"
            className="px-4 py-2 bg-french-blue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <div className="min-h-screen bg-gray-50">
        <Header />
      
        {/* Page Header */}
        <section className="relative hero-gradient-enhanced text-white py-24 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="mr-2">📝</span>
              French Learning Blog
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our Blog
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-12">
              Tips, resources, and insights for French language learners
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {blogPosts && blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id}>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="relative h-48">
                        <Image 
                          src={post.image || '/french-skill.png'} 
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>{post.author}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
                        <p className="text-gray-600">{post.excerpt || 'Read more about this topic...'}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m0 0V6a2 2 0 012-2h2.5a2 2 0 012 2v1.5a2 2 0 01-2 2H17" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We&apos;re working on creating amazing content for French learners. Check back soon for new articles and resources.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-french-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Our Courses
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
