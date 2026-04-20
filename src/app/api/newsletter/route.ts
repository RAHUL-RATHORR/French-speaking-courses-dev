import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  try {
  const body = await request.json();
  const { email, name, recaptchaToken } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const captcha = await verifyRecaptcha(recaptchaToken, "newsletter_submit");
    if (!captcha.success || (typeof captcha.score === "number" && captcha.score < 0.3)) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    // Create new newsletter subscription query
    const newQuery = await prisma.query.create({
      data: {
        name: name || "Newsletter Subscriber",
        email,
        message: "Newsletter subscription request",
        type: "NEWSLETTER",
        status: "NEW",
      },
    });

    return NextResponse.json(
      { message: "Newsletter subscription successful", id: newQuery.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting newsletter subscription:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
