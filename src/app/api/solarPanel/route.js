import { connectDB } from "@/lib/db";
import SolarPanel from "@/models/SolarPanel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const panels = await SolarPanel.find({});
  return NextResponse.json(panels);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const panel = await SolarPanel.create(data);
  return NextResponse.json(panel);
}
