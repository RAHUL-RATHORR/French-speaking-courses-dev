import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const traceId = Math.random().toString(36).substring(7);
  console.log(`[API-Contact-${traceId}] Starting request...`);

  try {
    const body = await request.json();
    const { name, email, message, phone, recaptchaToken } = body;

    // 1. Validation Trace
    if (!name || !email || !message) {
      console.warn(`[API-Contact-${traceId}] Validation failed: Missing fields`);
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // 2. reCAPTCHA Trace
    console.log(`[API-Contact-${traceId}] Verifying reCAPTCHA...`);
    const captcha = await verifyRecaptcha(recaptchaToken, "contact_submit");
    if (!captcha.success) {
      console.error(`[API-Contact-${traceId}] reCAPTCHA Failed:`, captcha.errorCodes);
      return NextResponse.json({ error: "Security check failed. Try again." }, { status: 400 });
    }

    // 3. Database Trace
    console.log(`[API-Contact-${traceId}] Saving to Database...`);
    try {
      const newQuery = await prisma.query.create({
        data: { name, email, message, phone: phone || null, type: "CONTACT", status: "NEW" },
      });
      console.log(`[API-Contact-${traceId}] Success: ID ${newQuery.id}`);
      return NextResponse.json({ message: "Submitted", id: newQuery.id }, { status: 201 });
    } catch (dbError) {
      console.error(`[API-Contact-${traceId}] DATABASE ERROR:`, dbError);
      throw dbError; // Bubble up to main catch
    }

  } catch (error) {
    console.error(`[API-Contact-${traceId}] GLOBAL CRASH:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
