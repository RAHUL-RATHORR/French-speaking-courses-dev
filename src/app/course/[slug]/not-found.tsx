import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Course Not Found | French Skill Academy',
  description: 'The course you are looking for could not be found. Browse our other French language courses.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Course Not Found</h1>
        <p className="mb-8">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/courses" className="btn-french-primary px-8 py-3 rounded-xl font-semibold inline-block">
          Browse All Courses
        </Link>
      </div>
      
      <Footer />
    </div>
  );
}
