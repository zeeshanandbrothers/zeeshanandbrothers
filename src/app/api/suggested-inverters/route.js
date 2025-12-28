// // src/app/api/inverters/suggest/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Inverter } from "@/models/Product";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { load, systemType } = await req.json();
//     if (!load || !systemType) {
//       return NextResponse.json(
//         { error: "Load and systemType required" },
//         { status: 400 }
//       );
//     }

//     const minWatt = Math.floor(load * 0.8);
//     const maxWatt = Math.ceil(load * 1.25);

//     // 🟢 STEP 1 — Ideal range
//     let inverters = await Inverter.find({
//       systemType,
//       actualWatt: { $gte: minWatt, $lte: maxWatt },
//     }).sort({ actualWatt: 1 });

//     if (inverters.length > 0) {
//       return NextResponse.json({
//         success: true,
//         strategy: "ideal-range",
//         suggestions: inverters,
//       });
//     }

//     // 🟡 STEP 2 — Slightly bigger single inverter
//     const bigger = await Inverter.findOne({
//       systemType,
//       actualWatt: { $gt: maxWatt },
//     }).sort({ actualWatt: 1 });

//     if (bigger) {
//       return NextResponse.json({
//         success: true,
//         strategy: "single-bigger",
//         suggestions: [
//           {
//             ...bigger.toObject(),
//             quantity: 1,
//           },
//         ],
//       });
//     }

//     // 🔴 STEP 3 — Multiple inverter strategy
//     const maxInverter = await Inverter.findOne({ systemType }).sort({
//       actualWatt: -1,
//     });

//     if (!maxInverter) {
//       return NextResponse.json({
//         success: false,
//         message: "No inverter available in stock",
//       });
//     }

//     const qty = Math.ceil(load / maxInverter.actualWatt);

//     return NextResponse.json({
//       success: true,
//       strategy: "multiple-inverters",
//       suggestions: [
//         {
//           ...maxInverter.toObject(),
//           quantity: qty,
//         },
//       ],
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // code 2
// // src/app/api/suggested-inverters/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Inverter } from "@/models/Product";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { load, systemType } = await req.json();

//     if (!load || !systemType) {
//       return NextResponse.json(
//         { error: "Load and systemType required" },
//         { status: 400 }
//       );
//     }

//     // 1️⃣ Get all inverters sorted by capacity (ASC)
//     const inverters = await Inverter.find({ systemType }).sort({
//       actualWatt: 1,
//     });

//     if (!inverters.length) {
//       return NextResponse.json({
//         success: false,
//         message: "No inverter available",
//       });
//     }

//     // 2️⃣ Try single inverter with 12% tolerance
//     const tolerance = 0.12;
//     const suitable = inverters.find((inv) => {
//       const maxAllowedLoad = inv.actualWatt * (1 + tolerance);
//       return load <= maxAllowedLoad;
//     });

//     if (suitable) {
//       return NextResponse.json({
//         success: true,
//         strategy: "single-with-12-percent",
//         suggestions: [
//           {
//             ...suitable.toObject(),
//             quantity: 1,
//           },
//         ],
//       });
//     }

//     // 3️⃣ Fallback → multiple inverter strategy
//     const biggest = inverters[inverters.length - 1];
//     const quantity = Math.ceil(load / biggest.actualWatt);

//     return NextResponse.json({
//       success: true,
//       strategy: "multiple-inverters",
//       suggestions: [
//         {
//           ...biggest.toObject(),
//           quantity,
//         },
//       ],
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// code 3
// // src/app/api/inverters/suggest/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Inverter } from "@/models/Product";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { load, systemType } = await req.json();

//     if (!load || !systemType) {
//       return NextResponse.json(
//         { error: "Load and systemType required" },
//         { status: 400 }
//       );
//     }

//     const tolerance = 0.12;
//     const maxAllowedLoad = Math.ceil(load * (1 + tolerance));

//     // ✅ STEP 1: sirf suitable inverters (near load)
//     let suitableInverters = await Inverter.find({
//       systemType,
//       actualWatt: {
//         $gte: load, // ❌ chhota inverter reject
//         $lte: maxAllowedLoad, // ❌ bohat bara reject
//       },
//     }).sort({
//       stock: -1, // 🔥 pehle zyada stock
//       actualWatt: 1, // phir near capacity
//     });

//     // ✅ STEP 2: agar mil gaye → return all
//     if (suitableInverters.length > 0) {
//       return NextResponse.json({
//         success: true,
//         strategy: "near-load-inverters",
//         load,
//         maxAllowedLoad,
//         count: suitableInverters.length,
//         suggestions: suitableInverters.map((inv) => ({
//           ...inv.toObject(),
//           quantity: 1,
//         })),
//       });
//     }

//     // 🟡 STEP 3: agar near-load kuch bhi nahi mila → next bigger ONE
//     const bigger = await Inverter.findOne({
//       systemType,
//       actualWatt: { $gt: maxAllowedLoad },
//     }).sort({ actualWatt: 1 });

//     if (bigger) {
//       return NextResponse.json({
//         success: true,
//         strategy: "single-bigger-fallback",
//         suggestions: [
//           {
//             ...bigger.toObject(),
//             quantity: 1,
//           },
//         ],
//       });
//     }

//     // 🔴 STEP 4: last fallback → multiple biggest inverter
//     const biggest = await Inverter.findOne({ systemType }).sort({
//       actualWatt: -1,
//     });

//     if (!biggest) {
//       return NextResponse.json({
//         success: false,
//         message: "No inverter available",
//       });
//     }

//     const quantity = Math.ceil(load / biggest.actualWatt);

//     return NextResponse.json({
//       success: true,
//       strategy: "multiple-inverters",
//       suggestions: [
//         {
//           ...biggest.toObject(),
//           quantity,
//         },
//       ],
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// ibad code
// code 4
// src/app/api/suggested-inverters/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inverter } from "@/models/Product";

export async function POST(req) {
  try {
    // Connect database
    await connectDB();

    // Read user input
    const { load, systemType } = await req.json();

    // Validate input
    if (!load || !systemType) {
      return NextResponse.json(
        { error: "Load and systemType required" },
        { status: 400 }
      );
    }

    // Get inverters of given system type
    // Sorted by actualWatt (small to big)
    const inverters = await Inverter.find({ systemType }).sort({
      actualWatt: 1,
    });

    // No inverter found
    if (!inverters.length) {
      return NextResponse.json({
        success: false,
        message: "No inverter available",
      });
    }

    // Client rule: actual watt + 12%
    const TOLERANCE = 0.12;

    // Find the first inverter
    // whose (actualWatt + 12%) can handle the load
    const firstSuitableIndex = inverters.findIndex((inv) => {
      const effectiveCapacity = inv.actualWatt * (1 + TOLERANCE);
      return load <= effectiveCapacity;
    });

    // If no single inverter can handle the load
    // use multiple inverter strategy
    if (firstSuitableIndex === -1) {
      const biggest = inverters[inverters.length - 1];
      const quantity = Math.ceil(load / biggest.actualWatt);

      return NextResponse.json({
        success: true,
        strategy: "multiple-inverters",
        suggestions: [
          {
            ...biggest.toObject(),
            quantity,
            reason: "Load exceeds all single inverter capacities",
          },
        ],
      });
    }

    // 🔒 LIMIT OPTIONS:
    // Show only base inverter + next 2 capacity steps
    const MAX_STEPS = 3; // base + 2 next

    const limitedInverters = inverters.slice(
      firstSuitableIndex,
      firstSuitableIndex + MAX_STEPS
    );

    // Default selection:
    // inverter with highest stock
    const sortedByStock = [...limitedInverters].sort(
      (a, b) => b.stock - a.stock
    );

    const defaultSelectedId = sortedByStock[0]._id.toString();

    // Final response
    return NextResponse.json({
      success: true,
      strategy: "single-with-12-percent-limited",
      defaultSelectedId,
      suggestions: limitedInverters.map((inv) => ({
        ...inv.toObject(),
        quantity: 1,
        effectiveCapacity: Math.round(inv.actualWatt * (1 + TOLERANCE)),
      })),
    });
  } catch (error) {
    // Unexpected error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}