import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/zod-schema";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

export async function POST(request: NextRequest) {
  // Get form data
  const reqFormData = await request.formData();
  const data = Object.fromEntries(reqFormData.entries());

  // Validate form data
  const zodParseResult = signUpSchema.safeParse(data);
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
  const { name, email, phone, password } = zodParseResult.data;

  // Create user
  try {
    await db.insert(users).values({
      id: uuid(),
      name: name,
      email: email,
      phone: phone,
      password: await hash(password, 10),
      role: "member",
    });

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to create user",
      },
      { status: 500 },
    );
  }
}
