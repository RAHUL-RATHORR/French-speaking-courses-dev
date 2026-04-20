import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'All French Courses | French Skill',
  description: 'Browse all our French courses by level and goals. Interactive live classes for beginners to advanced learners.',
  alternates: { canonical: 'https://www.frenchskill.com/courses' },
  openGraph: {
    title: 'All French Courses | French Skill',
    description: 'Interactive online French classes for all levels.',
    url: 'https://www.frenchskill.com/courses',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
