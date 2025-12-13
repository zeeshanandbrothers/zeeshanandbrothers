// src/app/api/inverters/suggest/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inverter } from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();

    const { load, systemType } = await req.json();

    if (!load || !systemType) {
      return NextResponse.json(
        { error: "Load and systemType required" },
        { status: 400 }
      );
    }

    const inverters = await Inverter.find({
      systemType,
      actualWatt: { $gte: load }, // 🔥 key logic
    })
      .sort({ actualWatt: 1 }) // nearest first
      .limit(5); // optional: top 5 suggestions

    return NextResponse.json({
      success: true,
      count: inverters.length,
      suggestions: inverters,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
