import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  try {
  const body = await request.json();
  const { name, email, message, phone, courseId, courseTitle, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !courseId || !courseTitle) {
      return NextResponse.json(
        { error: "Name, email, course ID, and course title are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const captcha = await verifyRecaptcha(recaptchaToken, "course_inquiry_submit");
    if (!captcha.success || (typeof captcha.score === "number" && captcha.score < 0.3)) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    // Create new course inquiry
    const newQuery = await prisma.query.create({
      data: {
        name,
        email,
        message: message || `Inquiry about ${courseTitle}`,
        phone: phone || null,
        type: "COURSE_INQUIRY",
        courseId,
        courseTitle,
        status: "NEW",
      },
    });

    return NextResponse.json(
      { message: "Course inquiry submitted successfully", id: newQuery.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting course inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit course inquiry" },
      { status: 500 }
    );
  }
}
