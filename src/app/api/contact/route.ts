import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  try {
  const body = await request.json();
  const { name, email, message, phone, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const captcha = await verifyRecaptcha(recaptchaToken, "contact_submit");
    if (!captcha.success || (typeof captcha.score === "number" && captcha.score < 0.3)) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    // Create new contact query
    const newQuery = await prisma.query.create({
      data: {
        name,
        email,
        message,
        phone: phone || null,
        type: "CONTACT",
        status: "NEW",
      },
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully", id: newQuery.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
