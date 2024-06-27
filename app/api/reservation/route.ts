import { NextRequest, NextResponse } from "next/server";
import { reservationSchema } from "@/lib/zod-schema";
import { db } from "@/db/drizzle";
import { reservations } from "@/db/schema";
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
  const zodParseResult = reservationSchema.safeParse(data);
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
  const { branch, datetime, service, userId } = zodParseResult.data;

  // Convert datetime to GMT+7
  const date = new Date(datetime);
  date.setHours(date.getHours() + 7);

  // Create reservation
  try {
    await db.insert(reservations).values({
      id: uuid(),
      datetime: date,
      branchId: branch,
      serviceId: service,
      userId: userId,
    });

    return NextResponse.json(
      {
        message: "Reservation created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to create reservation",
      },
      { status: 500 },
    );
  }
}
