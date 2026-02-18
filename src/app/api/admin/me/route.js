import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("adminToken")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin)
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    return NextResponse.json(admin);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
