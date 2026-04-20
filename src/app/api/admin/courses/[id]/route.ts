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
    if (url.host === originUrl.host) return `${url.pathname}${url.search}`;
  } catch {
    // ignore
  }

  return value;
}

// GET a specific course by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const course = await prisma.course.findUnique({
      where: { id }
    });
    
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

// PUT update a course by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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
    
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id }
    });
    
    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    // Check if slug is changed and already exists for another course
    if (data.slug !== existingCourse.slug) {
      const slugExists = await prisma.course.findUnique({
        where: { slug: data.slug }
      });
      
      if (slugExists && slugExists.id !== id) {
        return NextResponse.json({ error: "Course with this slug already exists" }, { status: 409 });
      }
    }
    
    const updatedCourse = await prisma.course.update({
      where: { id },
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
        brochureUrl: normalizeSameOriginAssetUrl(data.brochureUrl, origin),
        instructor: data.instructor || null,
        instructorImage: normalizeSameOriginAssetUrl(data.instructorImage, origin),
        instructorBio: data.instructorBio || null,
        instructorExperience: data.instructorExperience || null,
        instructorSpecialties: data.instructorSpecialties || [],
        lessons: data.lessons ? parseInt(data.lessons) : null,
        certificate: data.certificate || false,
        language: data.language || null,
        access: data.access || null,
        
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

    // Ensure public pages reflect updates (including new uploaded images)
    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath(`/course/${updatedCourse.slug}`);
    revalidatePath(`/courses/${updatedCourse.slug}`);
    revalidatePath(`/` + updatedCourse.slug);
    // If slug changed, also revalidate the old routes
    if (existingCourse.slug && existingCourse.slug !== updatedCourse.slug) {
      revalidatePath(`/course/${existingCourse.slug}`);
      revalidatePath(`/courses/${existingCourse.slug}`);
      revalidatePath(`/` + existingCourse.slug);
    }
    revalidatePath("/sitemap.xml");
    
    return NextResponse.json(updatedCourse);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update course" }, 
      { status: 500 }
    );
  }
}

// DELETE a course by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id }
    });
    
    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    await prisma.course.delete({
      where: { id }
    });

    // Ensure public pages drop the deleted course
    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath(`/course/${existingCourse.slug}`);
    revalidatePath(`/courses/${existingCourse.slug}`);
    revalidatePath(`/` + existingCourse.slug);
    revalidatePath("/sitemap.xml");
    
    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
