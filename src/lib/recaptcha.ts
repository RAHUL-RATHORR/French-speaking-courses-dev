/**
 * Google reCAPTCHA v3 verification utility
 */

export interface RecaptchaVerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  errorCodes?: string[];
}

export async function verifyRecaptcha(token?: string, expectedAction?: string): Promise<RecaptchaVerifyResult> {
  const secret = "6LdKD5krAAAAAMi8gW28LQllZGiRxoDq1TYRzWRE";

  if (!secret) {
    // If not configured, skip verification but log a warning
    console.warn("RECAPTCHA_SECRET_KEY not set. Skipping reCAPTCHA verification.");
    return { success: true };
  }

  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      // Prevent any caching of verification
      cache: "no-store",
    });

    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      hostname?: string;
      [key: string]: unknown;
    };

    // If an expected action is provided, ensure it matches for extra safety
    if (data.success && expectedAction && data.action && data.action !== expectedAction) {
      return { success: false, score: data.score, action: data.action, hostname: data.hostname };
    }

    return {
      success: !!data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
    };
  } catch (err) {
    console.error("reCAPTCHA verification failed:", err);
    return { success: false, errorCodes: ["verification-failed"] };
  }
}
