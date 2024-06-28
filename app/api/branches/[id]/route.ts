import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { branchSchema } from "@/lib/zod-schema";
import { branches } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Validate user session
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "No Access" },
      { status: 401 },
    );
  }

  // Get form data
  const reqFormData = await request.formData();
  const data = Object.fromEntries(reqFormData.entries());

  // Validate form data
  const zodParseResult = branchSchema.safeParse(data);
  if (!zodParseResult.success) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: zodParseResult.error.issues,
      },
      { status: 400 },
    );
  }

  // Desctructure form data
  const { name, location, openingTime, closingTime } = zodParseResult.data;

  // Update branch
  try {
    await db
      .update(branches)
      .set({
        name: name,
        location: location,
        openingTime: openingTime,
        closingTime: closingTime,
      })
      .where(eq(branches.id, params.id));

    return NextResponse.json(
      {
        message: "Branch updated successfully",
        id: params.id,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to update branch",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Validate user session
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "No Access" },
      { status: 401 },
    );
  }

  // Delete branch
  try {
    await db.delete(branches).where(eq(branches.id, params.id));

    return NextResponse.json(
      {
        message: "Branch deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error,
      },
      { status: 500 },
    );
  }
}
