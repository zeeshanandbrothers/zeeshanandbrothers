import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Panel } from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();

    const { load } = await req.json();

    if (!load || load <= 0) {
      return NextResponse.json(
        { error: "Valid load (Watt) is required" },
        { status: 400 }
      );
    }

    // 1️⃣ All panels >= 585W, sorted by stock DESC
    const panels = await Panel.find({
      watt: { $gte: 585 },
    }).sort({ stock: -1 });

    if (!panels.length) {
      return NextResponse.json(
        { error: "No suitable panels available" },
        { status: 404 }
      );
    }

    // 2️⃣ Main suggested panel
    const selectedPanel = panels[0];

    if (!selectedPanel.actualWatt) {
      return NextResponse.json(
        { error: "Panel actualWatt not defined" },
        { status: 500 }
      );
    }

    // 3️⃣ Calculate required quantity
    const panelsNeeded = Math.ceil(load / selectedPanel.actualWatt);

    // 4️⃣ Alternatives logic
    const alternatives = panels.filter((p) => {
      // ❌ same panel (brand + watt)
      if (
        p.brand === selectedPanel.brand &&
        p.actualWatt === selectedPanel.actualWatt
      ) {
        return false;
      }

      // ✅ same watt but different brand
      if (
        p.actualWatt === selectedPanel.actualWatt &&
        p.brand !== selectedPanel.brand
      ) {
        return true;
      }

      // ✅ higher watt panels
      if (p.actualWatt > selectedPanel.actualWatt) {
        return true;
      }

      return false;
    });

    return NextResponse.json({
      success: true,
      load,
      selectedPanel,
      panelsNeeded,
      totalCapacity: panelsNeeded * selectedPanel.actualWatt,
      totalPrice: panelsNeeded * selectedPanel.price,
      alternatives, // 🔥 empty ho sakta hai (perfect)
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// // src/app/api/panels/suggest/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Panel } from "@/models/Product";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { load } = await req.json();

//     if (!load || load <= 0) {
//       return NextResponse.json(
//         { error: "Valid load (Watt) is required" },
//         { status: 400 }
//       );
//     }

//     // 1️⃣ Get only panels >= 585W, sorted by stock DESC
//     const panels = await Panel.find({
//       watt: { $gte: 585 },
//     }).sort({ stock: -1 });

//     if (!panels.length) {
//       return NextResponse.json(
//         { error: "No suitable panels available" },
//         { status: 404 }
//       );
//     }

//     // 2️⃣ Best panel = highest stock
//     const bestPanel = panels[0];

//     if (!bestPanel.actualWatt || bestPanel.actualWatt <= 0) {
//       return NextResponse.json(
//         { error: "Panel actualWatt not defined" },
//         { status: 500 }
//       );
//     }

//     // 3️⃣ Panels required (IMPORTANT → actualWatt)
//     const panelsNeeded = Math.ceil(load / bestPanel.actualWatt);

//     // 4️⃣ Alternative panels (same watt, different brands)
//     const alternatives = panels.filter((p) => p.watt === bestPanel.watt);

//     return NextResponse.json({
//       success: true,
//       load,
//       selectedPanel: bestPanel,
//       alternatives, // 👈 dropdown ke liye
//       panelsNeeded,
//       totalCapacity: panelsNeeded * bestPanel.actualWatt,
//       totalPrice: panelsNeeded * bestPanel.price,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Product, { Panel } from "@/models/Product";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { load } = await req.json();

//     if (!load || load <= 0) {
//       return NextResponse.json(
//         { error: "Valid load (Watt) is required" },
//         { status: 400 }
//       );
//     }

//     // 1️⃣ Get all panels sorted by stock (DESC)
//     const panels = await Panel.find({}).sort({
//       stock: -1,
//     });
//     // console.log("panels", panels);

//     if (!panels.length) {
//       return NextResponse.json(
//         { error: "No panels available in stock" },
//         { status: 404 }
//       );
//     }

//     // 2️⃣ Pick panel with highest stock
//     const bestPanel = panels[0];
//     console.log("bestpanel", bestPanel);
//     const actWatt = bestPanel.actualWatt;
//     console.log("actWatt", actWatt);

//     if (bestPanel.actualWatt == null) {
//       return NextResponse.json(
//         { error: "Panel actualWatt not defined" },
//         { status: 500 }
//       );
//     }

//     // 3️⃣ Calculate required panels (IMPORTANT → actualWatt)
//     const panelsNeeded = Math.ceil(load / bestPanel.actualWatt);
//     console.log("panelsneeded", panelsNeeded);

//     // 4️⃣ Final response
//     return NextResponse.json({
//       success: true,
//       load,
//       selectedPanel: bestPanel,
//       panelsNeeded,
//       totalCapacity: panelsNeeded * bestPanel.actualWatt,
//       totalPrice: panelsNeeded * bestPanel.price,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
