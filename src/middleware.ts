import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware() {
  // Bare minimum pass-through to restore site functionality
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
