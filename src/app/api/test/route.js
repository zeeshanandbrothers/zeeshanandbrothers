// app/api/test/route.js

import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB(); // <-- MUST CALL THIS FUNCTION

  return NextResponse.json({ message: "DB Connected!" });
}
