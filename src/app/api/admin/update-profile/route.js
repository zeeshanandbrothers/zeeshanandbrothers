import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    await connectDB();
    const { id, name, email, oldPassword, newPassword } = await req.json();

    const admin = await Admin.findById(id);
    if (!admin)
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    admin.name = name;
    admin.email = email;

    if (newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch)
        return NextResponse.json(
          { error: "Old password incorrect" },
          { status: 400 }
        );

      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();

    return NextResponse.json({ success: true, message: "Profile updated!" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
