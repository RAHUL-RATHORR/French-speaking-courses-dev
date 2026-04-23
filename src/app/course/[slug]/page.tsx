import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { CourseWithSections } from "@/types/course";
import CoursePageClient from "./CoursePageClient";
import { generateCourseStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CourseParams {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch course data on the server
async function getCourse(slug: string): Promise<CourseWithSections | null> {
  try {
    const course = await prisma.course.findUnique({
      where: { slug }
    });

    // Transform the course data to match our interface
    if (!course) return null;

    return {
      ...course,
      originalPrice: course.originalPrice || undefined,
    } as unknown as CourseWithSections;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CourseParams): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.slug);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found."
    };
  }

  const baseTitle = course.title || "French Language Course";
  const title = course.metaTitle || `${baseTitle} - French Speaking Courses`;
  const description = course.metaDescription || course.description || `Learn French with our comprehensive ${baseTitle} program. Expert instructors, interactive lessons, and flexible scheduling.`;
  const price = course.price || "₹299";

  return {
    title: title,
    description: description.substring(0, 160), // SEO best practice for description length
    keywords: [
      "French language course",
      "Learn French online",
      "French classes",
      "French conversation",
      "French grammar",
      "French pronunciation",
      course.title?.toLowerCase(),
      "online French course",
      "French certification"
    ].filter(Boolean).join(", "),
    authors: [{ name: "French Speaking Courses" }],
    creator: "French Speaking Courses",
    publisher: "French Speaking Courses",
    category: "Education",
    openGraph: {
      title: title,
      description: description,
      type: "website",
      locale: "en_US",
      siteName: "French Speaking Courses",
      url: `https://www.frenchskill.com/courses/${course.slug}`,
      images: [
        {
          url: course.image || "/french-skill.png",
          width: 1200,
          height: 630,
          alt: `${title} course image`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [course.image || "/french-skill.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://www.frenchskill.com/courses/${course.slug}`,
    },
    other: {
      "price:amount": price.replace(/[^\d.,]/g, ""),
      "price:currency": "EUR",
      "product:availability": "in stock",
      "course:duration": course.duration || "40 hours",
      "course:level": course.level || "All levels",
    },
  };
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  try {
    const courses = await prisma.course.findMany({
      select: { slug: true },
    });

    return courses.map((course) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Server Component
export default async function CoursePage({ params }: CourseParams) {
  const resolvedParams = await params;
  const course = await getCourse(resolvedParams.slug);

  if (!course) {
    notFound();
  }

  // Generate structured data for rich snippets
  const courseStructuredData = generateCourseStructuredData({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    level: course.level,
    duration: course.duration,
    price: course.price,
    rating: course.rating || 5,
    students: course.students,
    instructor: course.instructor || "Expert French Instructor",
    image: course.image || "/french-skill.png"
  });

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.frenchskill.com/" },
    { name: "Courses", url: "https://www.frenchskill.com/courses" },
    { name: course.title, url: `https://www.frenchskill.com/courses/${course.slug}` }
  ]);

  return (
    <>
      {/* Course Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />

      {/* Breadcrumb Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* Client-side component for interactivity */}
      <CoursePageClient course={course} />
    </>
  );
}
