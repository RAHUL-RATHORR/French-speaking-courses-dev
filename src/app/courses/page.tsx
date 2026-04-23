import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateCoursesListingStructuredData } from "@/lib/structured-data";
import CourseFilter from "@/components/courses/CourseFilter";
import { prisma } from "@/lib/db/prisma";

import { unstable_cache } from "next/cache";

export const revalidate = 60;

// Define course type according to the structured data interface in structured-data.ts
interface CourseFromAPI {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  students: number;
  image?: string;
  registrationOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

// Course type matching the one expected by structured data
interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  rating: number;
  students: number;
  instructor: string;
  image: string;
}

const getCachedCourses = unstable_cache(
  async () => {
    try {
      const courses = await prisma.course.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          level: true,
          duration: true,
          price: true,
          originalPrice: true,
          rating: true,
          students: true,
          image: true,
          registrationOpen: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' }
      });

      return courses.map(course => ({
        ...course,
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
        originalPrice: course.originalPrice || undefined,
        rating: course.rating || undefined,
        image: course.image || undefined,
      })) as CourseFromAPI[];
    } catch (err) {
      console.error("Error fetching courses from DB:", err);
      return [];
    }
  },
  ["courses-list"],
  { revalidate: 60, tags: ["courses"] }
);

async function getCoursesData(): Promise<CourseFromAPI[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.frenchskill.com';
    const response = await fetch(`${baseUrl}/api/courses`, { 
      next: { revalidate: 60, tags: ['courses'] } 
    });
    if (!response.ok) throw new Error("Failed to fetch courses");
    return await response.json();
  } catch (err) {
    console.error("Error fetching courses via API:", err);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCoursesData();

  // Define filter options based on fetched courses
  const filterOptions =
    courses.length > 0
      ? [
        { label: "All courses", value: "all", count: courses.length },
        {
          label: "Beginner",
          value: "Beginner",
          count: courses.filter((c: CourseFromAPI) => c.level === "Beginner")
            .length,
        },
        {
          label: "Intermediate",
          value: "Intermediate",
          count: courses.filter(
            (c: CourseFromAPI) => c.level === "Intermediate"
          ).length,
        },
        {
          label: "Advanced",
          value: "Advanced",
          count: courses.filter((c: CourseFromAPI) => c.level === "Advanced")
            .length,
        },
        {
          label: "All levels",
          value: "All levels",
          count: courses.filter(
            (c: CourseFromAPI) => c.level === "All levels"
          ).length,
        },
      ]
      : [];

  // Map API courses to the format required by structured data
  const coursesForStructuredData: Course[] = courses.map(
    (course: CourseFromAPI) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
      price: course.price,
      rating: course.rating ?? 5.0,
      students: course.students,
      instructor: "French Skill Academy Instructors",
      image: course.image ?? "/french-skill.png",
    })
  );

  // Generate structured data for SEO
  const coursesStructuredData = generateCoursesListingStructuredData(
    coursesForStructuredData
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(coursesStructuredData),
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Page Header */}
        <section className="relative hero-gradient-enhanced text-white py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="mr-2">🎓</span>
              Over {courses.length} courses available
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              All our
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-yellow-200 to-white">
                {" Courses"}
              </span>
              <span className="block text-4xl md:text-5xl mt-2">in French</span>
            </h1>

            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-12">
              Discover our complete catalog of French courses, designed by
              experts for all levels and goals.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-4 french-gradient-horizontal"></div>
        </section>

        {/* Client-side filtering is handled in the CourseFilter component */}
        <CourseFilter courses={courses} filterOptions={filterOptions} />

        {/* Stats Section */}
        <section className="py-16 bg-linear-to-br from-blue-50 to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-french-blue mb-2 group-hover:scale-110 transition-transform">
                  {courses.length}+
                </div>
                <div className="text-gray-600">Courses available</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-french-red mb-2 group-hover:scale-110 transition-transform">
                  15,000+
                </div>
                <div className="text-gray-600">Students enrolled</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-accent-blue mb-2 group-hover:scale-110 transition-transform">
                  98%
                </div>
                <div className="text-gray-600">Success rate</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-french-blue mb-2 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-gray-600">Support available</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Can&apos;t find the
              <span className="text-yellow-300"> ideal course</span>?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Contact us to create a personalized program according to your
              specific needs. Our experts are here to assist you in your
              learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-french-blue px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300 shadow-xl">
                Personalized Course
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-french-blue transition-colors duration-300">
                Talk to a Counselor
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
