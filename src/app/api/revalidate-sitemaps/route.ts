import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic"; // top of file
export async function POST(request: NextRequest) {
  try {
    // Check for authorization (optional)
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.SITEMAP_REVALIDATION_TOKEN;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Revalidate sitemap paths to trigger regeneration
    const paths = ["/sitemap.xml"];

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      message: "Sitemaps regenerated successfully",
      revalidatedPaths: paths,
    });
  } catch (error) {
    console.error("Error regenerating sitemaps:", error);
    return NextResponse.json(
      { error: "Failed to regenerate sitemaps" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to regenerate sitemaps",
    usage: "POST /api/revalidate-sitemaps with optional Bearer token",
  });
}
