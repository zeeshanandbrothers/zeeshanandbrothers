import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectDB();

  try {
    const { name, email, password } = await request.json();

    const exists = await Admin.findOne({ email });
    if (exists)
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Admin registered", admin });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
