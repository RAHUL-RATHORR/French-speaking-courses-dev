import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Query ID is required" }, { status: 400 });
    }

    // Get query by ID
    const query = await prisma.query.findUnique({
      where: { id },
    });

    if (!query) {
      return NextResponse.json({ error: "Query not found" }, { status: 404 });
    }

    return NextResponse.json(query);
  } catch (error) {
    console.error("Error fetching query:", error);
    return NextResponse.json(
      { error: "Failed to fetch query" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Query ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { status, notes } = body;

    // Check if query exists
    const existingQuery = await prisma.query.findUnique({
      where: { id },
    });

    if (!existingQuery) {
      return NextResponse.json({ error: "Query not found" }, { status: 404 });
    }

    // Update query
    const updatedQuery = await prisma.query.update({
      where: { id },
      data: {
        status: status !== undefined ? status : existingQuery.status,
        notes: notes !== undefined ? notes : existingQuery.notes,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedQuery);
  } catch (error) {
    console.error("Error updating query:", error);
    return NextResponse.json(
      { error: "Failed to update query" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Query ID is required" }, { status: 400 });
    }

    // Check if query exists
    const existingQuery = await prisma.query.findUnique({
      where: { id },
    });

    if (!existingQuery) {
      return NextResponse.json({ error: "Query not found" }, { status: 404 });
    }

    // Delete query
    await prisma.query.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Query deleted successfully" });
  } catch (error) {
    console.error("Error deleting query:", error);
    return NextResponse.json(
      { error: "Failed to delete query" },
      { status: 500 }
    );
  }
}
