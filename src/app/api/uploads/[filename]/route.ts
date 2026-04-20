import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join, basename } from "path";

function contentTypeFor(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".jfif")) return "image/jpeg";
  if (lower.endsWith(".pdf")) return "application/pdf";
  return "application/octet-stream";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const safeName = basename(params.filename);
    const filePath = join(process.cwd(), "public", "uploads", safeName);
    const data = await readFile(filePath);

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": contentTypeFor(safeName),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
