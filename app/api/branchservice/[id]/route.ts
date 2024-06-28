import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { db } from "@/db/drizzle";
import { branchservices } from "@/db/schema";
import { eq } from "drizzle-orm";

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
    await db
      .delete(branchservices)
      .where(eq(branchservices.branchId, params.id));

    return NextResponse.json(
      {
        message: "Branch/services deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to delete branch/services",
      },
      { status: 500 },
    );
  }
}
