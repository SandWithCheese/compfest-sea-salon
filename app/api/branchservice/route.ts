import { NextRequest, NextResponse } from "next/server";
import { branchServiceFormSchema } from "@/lib/zod-schema";
import { db } from "@/db/drizzle";
import { branchservices } from "@/db/schema";
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
  const zodParseResult = branchServiceFormSchema.safeParse(data);
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
  const { branchId, serviceId } = zodParseResult.data;

  // Create branch
  try {
    await db.insert(branchservices).values({
      branchId: branchId,
      serviceId: serviceId,
    });

    return NextResponse.json(
      {
        message: "Branch/service created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to create branch/service",
      },
      { status: 500 },
    );
  }
}
