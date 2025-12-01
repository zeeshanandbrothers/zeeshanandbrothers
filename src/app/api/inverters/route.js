import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Inverter from "@/models/Inverter";

// GET ALL INVERTERS
export async function GET() {
  await connectDB();
  const data = await Inverter.find({});
  return NextResponse.json(data);
}

// CREATE INVERTER
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const inverter = await Inverter.create(body);
  return NextResponse.json(inverter);
}
