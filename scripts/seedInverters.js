import { connectDB } from "../src/lib/db.js";
import { Inverter } from "../src/models/Product.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
async function seedInverters() {
  try {
    await connectDB();

    // ❗ optional: pehle old inverters delete
    await Inverter.deleteMany();

    const inverters = [
      {
        name: "Inverex Veyron II 3kW",
        category: "inverter",
        brand: "Inverex",
        price: 185000,
        stock: 10,
        image: "/images/inverex1_5.jpg",
        watt: 3000,
        actualWatt: 2800,
        systemType: "hybrid",
        phase: "single",
      },
      {
        name: "Knox Xenon 5kW",
        category: "inverter",
        brand: "Knox",
        price: 260000,
        stock: 8,
        image: "/images/inverex1_5.jpg",
        watt: 5000,
        actualWatt: 2800,
        systemType: "hybrid",
        phase: "single",
      },
      {
        name: "Tesla PowerMax 10kW",
        category: "inverter",
        brand: "Tesla",
        price: 520000,
        stock: 5,
        image: "/images/inverex1_5.jpg",
        watt: 10000,
        actualWatt: 2800,
        systemType: "ongrid",
        phase: "three",
      },
      {
        name: "Crown Elego 6kW",
        category: "inverter",
        brand: "Crown",
        price: 310000,
        stock: 7,
        image: "/images/inverex1_5.jpg",
        watt: 6000,
        actualWatt: 5800,
        systemType: "hybrid",
        phase: "single",
      },
      {
        name: "SolarMax Orion 8kW",
        category: "inverter",
        brand: "SolarMax",
        price: 420000,
        stock: 6,
        image: "/images/inverex1_5.jpg",
        watt: 8000,
        actualWatt: 2800,
        systemType: "offgrid",
        phase: "three",
      },
      {
        name: "Inverex Nitrox 2kW",
        category: "inverter",
        brand: "Inverex",
        price: 125000,
        stock: 12,
        image: "/images/inverex1_5.jpg",
        watt: 2000,
        actualWatt: 1800,
        systemType: "offgrid",
        phase: "single",
      },
      {
        name: "Homage Solar Hybrid 4kW",
        category: "inverter",
        brand: "Homage",
        price: 220000,
        stock: 9,
        image: "/images/inverex1_5.jpg",
        watt: 4000,
        actualWatt: 3800,
        systemType: "hybrid",
        phase: "single",
      },
      {
        name: "Huawei SUN2000 12kW",
        category: "inverter",
        brand: "Huawei",
        price: 610000,
        stock: 4,
        image: "/images/inverex1_5.jpg",
        watt: 12000,
        actualWatt: 11500,
        systemType: "ongrid",
        phase: "three",
      },
      {
        name: "GoodWe GW5000",
        category: "inverter",
        brand: "GoodWe",
        price: 245000,
        stock: 10,
        image: "/images/inverex1_5.jpg",
        watt: 5000,
        actualWatt: 4700,
        systemType: "ongrid",
        phase: "single",
      },
      {
        name: "Fronius Primo 7kW",
        category: "inverter",
        brand: "Fronius",
        price: 390000,
        stock: 5,
        image: "/images/inverex1_5.jpg",
        watt: 7000,
        actualWatt: 6800,
        systemType: "ongrid",
        phase: "three",
      },
    ];

    await Inverter.insertMany(inverters);

    console.log("✅ 10 Inverters inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seedInverters();
