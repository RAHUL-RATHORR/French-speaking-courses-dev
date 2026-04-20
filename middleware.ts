import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allowed origins for CORS
const allowedOrigins = new Set<string>(
  [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://www.frenchskill.com",
    "https://frenchskill.com",
    // Optionally include other local ports commonly used
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    // Add production origins via env when available
    process.env.NEXT_PUBLIC_SITE_URL || "",
    process.env.SITE_URL || "",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  ].filter(Boolean)
);

function getCorsHeaders(origin: string | null) {
  const headers = new Headers();
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
    headers.set("Access-Control-Allow-Credentials", "true");
  }
  headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  headers.set("Access-Control-Max-Age", "86400");
  return headers;
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Canonical host enforcement: redirect non-www to www in production
  const host = request.headers.get("host") || "";
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  if (!isLocalhost) {
    if (host === "frenchskill.com") {
      const url = new URL(request.url);
      url.host = "www.frenchskill.com";
      return NextResponse.redirect(url, 308);
    }
  }

  // Handle preflight request
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }

  // For actual requests, append CORS headers when origin is allowed
  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders(origin);
  corsHeaders.forEach((value, key) => response.headers.set(key, value));
  return response;
}

// Apply CORS only to API routes by default
export const config = {
  // Apply CORS on API and host canonicalization on all paths
  matcher: ["/api/:path*", "/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|pdf)$).*)"],
};
