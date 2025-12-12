import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    // ----- EMAIL SENDING -----
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP is: ${otp}. Valid for 10 minutes.`,
    });

    return NextResponse.json({ success: true, message: "OTP sent to email." });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
