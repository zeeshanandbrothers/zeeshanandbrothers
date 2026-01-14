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

    const inverters = await Inverter.find({ systemType }).sort({
      actualWatt: 1,
    });

    if (!inverters.length) {
      return NextResponse.json({
        success: false,
        message: "No inverter available",
      });
    }

    const TOLERANCE = 0.1;

    // 1️⃣ Try tolerance-based single inverter
    const firstSuitableIndex = inverters.findIndex((inv) => {
      const effectiveCapacity = inv.actualWatt * (1 + TOLERANCE);
      return load <= effectiveCapacity;
    });

    // 2️⃣ If tolerance-based single NOT found
    if (firstSuitableIndex === -1) {
      // 🔥 Prefer higher-capacity single inverter (NO tolerance)
      const higherSingle = inverters.find((inv) => inv.actualWatt > load);

      if (higherSingle) {
        return NextResponse.json({
          success: true,
          strategy: "single-higher-capacity",
          defaultSelectedId: higherSingle._id.toString(),
          suggestions: [
            {
              ...higherSingle.toObject(),
              quantity: 1,
              effectiveCapacity: Math.round(
                higherSingle.actualWatt * (1 + TOLERANCE)
              ),
              reason: "Higher capacity inverter available",
            },
          ],
        });
      }

      // ❌ No single inverter can handle full load
      // 🔥 SMART SPLIT LOGIC
      const biggest = inverters[inverters.length - 1];

      // If load is greater than biggest inverter → split load into 2
      if (load > biggest.actualWatt) {
        const halfLoad = load / 2;

        const halfMatch = inverters.find((inv) => {
          const effectiveCapacity = inv.actualWatt * (1 + TOLERANCE);
          return halfLoad <= effectiveCapacity;
        });

        if (halfMatch) {
          return NextResponse.json({
            success: true,
            strategy: "split-load-dual-inverter",
            suggestions: [
              {
                ...halfMatch.toObject(),
                quantity: 2,
                effectiveCapacity: Math.round(
                  halfMatch.actualWatt * (1 + TOLERANCE)
                ),
                reason: "Load split into two equal parts",
              },
            ],
          });
        }
      }

      // 🧯 FINAL fallback (very rare)
      const quantity = Math.ceil(load / biggest.actualWatt);

      return NextResponse.json({
        success: true,
        strategy: "multiple-inverters-fallback",
        suggestions: [
          {
            ...biggest.toObject(),
            quantity,
            reason: "Load exceeds available inverter capacities",
          },
        ],
      });
    }

    // 3️⃣ Normal limited single inverter suggestions
    const MAX_STEPS = 3;

    const limitedInverters = inverters
      .slice(firstSuitableIndex, firstSuitableIndex + MAX_STEPS)
      .sort((a, b) => {
        if (a.actualWatt === b.actualWatt) {
          return b.stock - a.stock;
        }
        return a.actualWatt - b.actualWatt;
      });

    const sortedByStock = [...limitedInverters].sort(
      (a, b) => b.stock - a.stock
    );

    const defaultSelectedId = sortedByStock[0]._id.toString();

    return NextResponse.json({
      success: true,
      strategy: "single-with-tolerance-limited",
      defaultSelectedId,
      suggestions: limitedInverters.map((inv) => ({
        ...inv.toObject(),
        quantity: 1,
        effectiveCapacity: Math.round(inv.actualWatt * (1 + TOLERANCE)),
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
