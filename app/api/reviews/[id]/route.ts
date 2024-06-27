import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { reviews } from "@/db/schema";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "../../auth/[...nextauth]/auth-options";

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

  // Delete review
  try {
    await db.delete(reviews).where(eq(reviews.id, params.id));

    return NextResponse.json(
      {
        message: "Review deleted successfully",
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
