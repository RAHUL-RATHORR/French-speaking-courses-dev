import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const orderedIds = body?.orderedIds;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ error: "orderedIds array is required" }, { status: 400 });
    }

    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.course.update({
          where: { id },
          data: { sortOrder: index + 1 },
        })
      )
    );

    revalidatePath("/");
    revalidatePath("/courses");
    revalidateTag("courses");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering courses:", error);
    return NextResponse.json({ error: "Failed to reorder courses" }, { status: 500 });
  }
}
