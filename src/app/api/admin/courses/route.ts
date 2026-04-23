import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

function normalizeSameOriginAssetUrl(input: unknown, origin: string): string | null {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if (!value) return null;
  if (value.startsWith("/")) return value;

  try {
    const url = new URL(value);
    const originUrl = new URL(origin);
    // If the image/file points to this same site, store it as a relative path.
    if (url.host === originUrl.host) return `${url.pathname}${url.search}`;
  } catch {
    // ignore
  }

  return value;
}

// GET all courses
export async function GET() {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        level: true,
        duration: true,
        price: true,
        originalPrice: true,
        students: true,
        registrationOpen: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// POST create a new course
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    const origin = request.nextUrl.origin;
    
    // Validate required fields
    if (!data.title || !data.description || !data.level || !data.duration || !data.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    // Check if slug is already taken
    const existingCourse = await prisma.course.findUnique({
      where: { slug: data.slug }
    });
    
    if (existingCourse) {
      return NextResponse.json({ error: "Course with this slug already exists" }, { status: 409 });
    }
    
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription || data.description,
        level: data.level,
        duration: data.duration,
        price: data.price,
        originalPrice: data.originalPrice || null,
        rating: data.rating ? parseFloat(data.rating) : null,
        students: data.students ? parseInt(data.students) : 0,
        image: normalizeSameOriginAssetUrl(data.image, origin),
        instructor: data.instructor || null,
        instructorImage: normalizeSameOriginAssetUrl(data.instructorImage, origin),
        instructorBio: data.instructorBio || null,
        instructorExperience: data.instructorExperience || null,
        instructorSpecialties: data.instructorSpecialties || [],
        lessons: data.lessons ? parseInt(data.lessons) : null,
        certificate: data.certificate || false,
        language: data.language || null,
        access: data.access || null,
        brochureUrl: normalizeSameOriginAssetUrl(data.brochureUrl, origin), // Add brochure URL field
        
        // Legacy fields
        modules: data.modules || null,
        features: data.features || null,
        outcomes: data.outcomes || [],
        faq: data.faq || null,
        testimonials: data.testimonials || null,
        tools: data.tools || [],
        projects: data.projects || null,
        benefits: data.benefits || null,
        companies: data.companies || [],
        offerEndDate: data.offerEndDate ? new Date(data.offerEndDate) : null,
        promotionBannerText: data.promotionBannerText || null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        batches: data.batches || null,
        requirements: data.requirements || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        ctaText: data.ctaText || null,
        timings: data.timings || null,
        
        // Dynamic Sections
        heroBannerSection: data.heroBannerSection || null,
        overviewSection: data.overviewSection || null,
        whyEnrollSection: data.whyEnrollSection || null,
        benefitsSection: data.benefitsSection || null,
        curriculumSection: data.curriculumSection || null,
        feesSection: data.feesSection || null,
        skillsToolsSection: data.skillsToolsSection || null,
        projectsSection: data.projectsSection || null,
        reviewsSection: data.reviewsSection || null,
        faqSection: data.faqSection || null,
        comparisonSection: data.comparisonSection || null,
        batchScheduleSection: data.batchScheduleSection || null,
        ctaSections: data.ctaSections || null,
        
        registrationOpen: data.registrationOpen !== undefined ? Boolean(data.registrationOpen) : true,
        slug: data.slug
      }
    });

    // Ensure public pages reflect the new course immediately
    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath(`/course/${course.slug}`);
    revalidatePath(`/courses/${course.slug}`);
    revalidatePath(`/` + course.slug);
    revalidatePath("/sitemap.xml");
    
    // Add revalidateTag for unstable_cache
    const { revalidateTag } = await import("next/cache");
    revalidateTag("courses");
    
    return NextResponse.json(course, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create course" }, 
      { status: 500 }
    );
  }
}
