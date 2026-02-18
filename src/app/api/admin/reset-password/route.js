import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp, newPassword } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin)
      return NextResponse.json({ error: "Invalid email" }, { status: 404 });

    if (admin.otp !== otp)
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    if (admin.otpExpires < new Date())
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });

    if (!newPassword) {
      return NextResponse.json({ success: true, message: "OTP verified" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.otp = null;
    admin.otpExpires = null;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password reset successful!",
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
