import { NextRequest, NextResponse } from "next/server";
import { branchSchema } from "@/lib/zod-schema";
import { db } from "@/db/drizzle";
import { branches } from "@/db/schema";
import { v4 as uuid } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";

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
  const id = uuid();

  // Create branch
  try {
    await db.insert(branches).values({
      id: id,
      name: name,
      location: location,
      openingTime: openingTime,
      closingTime: closingTime,
    });

    return NextResponse.json(
      {
        message: "Branch created successfully",
        id: id,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to create branch",
      },
      { status: 500 },
    );
  }
}
