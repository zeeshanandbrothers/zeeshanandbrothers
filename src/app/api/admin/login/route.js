import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    const admin = await Admin.findOne({ email });
    if (!admin)
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });

    return NextResponse.json({ message: "Login successful", admin });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
