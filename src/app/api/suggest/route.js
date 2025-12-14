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

    const minWatt = Math.floor(load * 0.8); // -20%
    const maxWatt = Math.ceil(load * 1.25); // +25%

    const inverters = await Inverter.find({
      systemType,
      actualWatt: {
        $gte: minWatt,
        $lte: maxWatt,
      },
    }).sort({ actualWatt: 1 });

    return NextResponse.json({
      success: true,
      load,
      range: { minWatt, maxWatt },
      count: inverters.length,
      suggestions: inverters,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
