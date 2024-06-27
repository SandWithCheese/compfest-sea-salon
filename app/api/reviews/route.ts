import { NextRequest, NextResponse } from "next/server";
import { reviewsSchema } from "@/lib/zod-schema";
import { db } from "@/db/drizzle";
import { reviews } from "@/db/schema";
import { v4 as uuid } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
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
  const numericFields = ["rating"];
  const data = Object.fromEntries([
    ...Array.from(reqFormData.entries()).map(([key, value]) => [
      key,
      numericFields.includes(key) ? Number(value) : value,
    ]),
  ]);

  // Validate form data
  const zodParseResult = reviewsSchema.safeParse(data);
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
  const { name, comment, rating } = zodParseResult.data;

  // Create reservation
  try {
    await db.insert(reviews).values({
      id: uuid(),
      comment: comment,
      rating: rating,
      userId: session.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Review created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to create review",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
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
  const numericFields = ["rating"];
  const data = Object.fromEntries([
    ...Array.from(reqFormData.entries()).map(([key, value]) => [
      key,
      numericFields.includes(key) ? Number(value) : value,
    ]),
  ]);

  // Validate form data
  const zodParseResult = reviewsSchema.safeParse(data);
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
  const { name, comment, rating } = zodParseResult.data;

  // Create reservation
  try {
    await db
      .update(reviews)
      .set({ comment: comment, rating: rating, updatedAt: new Date() })
      .where(eq(reviews.userId, session.id));

    return NextResponse.json(
      {
        message: "Review updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to update review",
      },
      { status: 500 },
    );
  }
}
