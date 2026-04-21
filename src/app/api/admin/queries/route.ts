import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all queries, sorted by createdAt in descending order (newest first)
    const queries = await prisma.query.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    return NextResponse.json(
      { error: "Failed to fetch queries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, message, phone, type, courseId, courseTitle, status } = body;

    // Validate required fields
    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new query
    const newQuery = await prisma.query.create({
      data: {
        name,
        email,
        message,
        phone,
        type,
        courseId,
        courseTitle,
        status: status || "NEW",
      },
    });

    return NextResponse.json(newQuery, { status: 201 });
  } catch (error) {
    console.error("Error creating query:", error);
    return NextResponse.json(
      { error: "Failed to create query" },
      { status: 500 }
    );
  }
}
