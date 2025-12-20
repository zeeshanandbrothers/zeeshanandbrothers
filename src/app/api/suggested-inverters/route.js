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

    const minWatt = Math.floor(load * 0.8);
    const maxWatt = Math.ceil(load * 1.25);

    // 🟢 STEP 1 — Ideal range
    let inverters = await Inverter.find({
      systemType,
      actualWatt: { $gte: minWatt, $lte: maxWatt },
    }).sort({ actualWatt: 1 });

    if (inverters.length > 0) {
      return NextResponse.json({
        success: true,
        strategy: "ideal-range",
        suggestions: inverters,
      });
    }

    // 🟡 STEP 2 — Slightly bigger single inverter
    const bigger = await Inverter.findOne({
      systemType,
      actualWatt: { $gt: maxWatt },
    }).sort({ actualWatt: 1 });

    if (bigger) {
      return NextResponse.json({
        success: true,
        strategy: "single-bigger",
        suggestions: [
          {
            ...bigger.toObject(),
            quantity: 1,
          },
        ],
      });
    }

    // 🔴 STEP 3 — Multiple inverter strategy
    const maxInverter = await Inverter.findOne({ systemType }).sort({
      actualWatt: -1,
    });

    if (!maxInverter) {
      return NextResponse.json({
        success: false,
        message: "No inverter available in stock",
      });
    }

    const qty = Math.ceil(load / maxInverter.actualWatt);

    return NextResponse.json({
      success: true,
      strategy: "multiple-inverters",
      suggestions: [
        {
          ...maxInverter.toObject(),
          quantity: qty,
        },
      ],
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
