import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="text-6xl mb-6">📚</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/blog" 
            className="bg-french-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse All Articles
          </Link>
          <Link 
            href="/" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
