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
  { name: "Knox Xenon 5kW", category: "inverter", brand: "Knox", price: 260000, stock: 8, image: "/images/inverex1_5.jpg", watt: 5000, actualWatt: 4500, systemType: "hybrid", phase: "single" },
  { name: "SolarMax 2.5kW", category: "inverter", brand: "SolarMax", price: 85000, stock: 12, image: "/images/inverex1_5.jpg", watt: 2500, actualWatt: 2200, systemType: "hybrid", phase: "single" },
  { name: "PowerPro 3kW", category: "inverter", brand: "PowerPro", price: 95000, stock: 10, image: "/images/inverex1_5.jpg", watt: 3000, actualWatt: 2700, systemType: "hybrid", phase: "single" },
  { name: "EcoVolt 2.5kW", category: "inverter", brand: "EcoVolt", price: 80000, stock: 15, image: "/images/inverex1_5.jpg", watt: 2500, actualWatt: 2200, systemType: "hybrid", phase: "single" },
  { name: "GreenWave 4kW", category: "inverter", brand: "GreenWave", price: 175000, stock: 5, image: "/images/inverex1_5.jpg", watt: 4000, actualWatt: 3600, systemType: "hybrid", phase: "single" },
  { name: "SunCharge 3.5kW", category: "inverter", brand: "SunCharge", price: 120000, stock: 7, image: "/images/inverex1_5.jpg", watt: 3500, actualWatt: 3200, systemType: "hybrid", phase: "single" },
  { name: "Inverex 3.5kW", category: "inverter", brand: "Inverex", price: 125000, stock: 8, image: "/images/inverex1_5.jpg", watt: 3500, actualWatt: 3200, systemType: "hybrid", phase: "single" },
  { name: "VoltMaster 6kW", category: "inverter", brand: "VoltMaster", price: 310000, stock: 4, image: "/images/inverex1_5.jpg", watt: 6000, actualWatt: 5500, systemType: "hybrid", phase: "single" },
  { name: "AlphaPower 2.5kW", category: "inverter", brand: "AlphaPower", price: 83000, stock: 9, image: "/images/inverex1_5.jpg", watt: 2500, actualWatt: 2200, systemType: "hybrid", phase: "single" },
  { name: "MegaGrid 5kW", category: "inverter", brand: "MegaGrid", price: 265000, stock: 6, image: "/images/inverex1_5.jpg", watt: 5000, actualWatt: 4500, systemType: "hybrid", phase: "single" },
  { name: "PowerEdge 4.5kW", category: "inverter", brand: "PowerEdge", price: 195000, stock: 8, image: "/images/inverex1_5.jpg", watt: 4500, actualWatt: 4000, systemType: "hybrid", phase: "single" },
  { name: "SolarTech 3kW", category: "inverter", brand: "SolarTech", price: 97000, stock: 11, image: "/images/inverex1_5.jpg", watt: 3000, actualWatt: 2700, systemType: "hybrid", phase: "single" },
  { name: "FusionPower 2kW", category: "inverter", brand: "FusionPower", price: 70000, stock: 13, image: "/images/inverex1_5.jpg", watt: 2000, actualWatt: 1800, systemType: "hybrid", phase: "single" },
  { name: "UltraVolt 7kW", category: "inverter", brand: "UltraVolt", price: 350000, stock: 3, image: "/images/inverex1_5.jpg", watt: 7000, actualWatt: 6400, systemType: "hybrid", phase: "single" },
  { name: "NextGen 2.5kW", category: "inverter", brand: "NextGen", price: 82000, stock: 14, image: "/images/inverex1_5.jpg", watt: 2500, actualWatt: 2200, systemType: "hybrid", phase: "single" },
  { name: "ProSolar 3.2kW", category: "inverter", brand: "ProSolar", price: 104000, stock: 9, image: "/images/inverex1_5.jpg", watt: 3200, actualWatt: 2900, systemType: "hybrid", phase: "single" },
  { name: "EnergyHub 4kW", category: "inverter", brand: "EnergyHub", price: 180000, stock: 6, image: "/images/inverex1_5.jpg", watt: 4000, actualWatt: 3600, systemType: "hybrid", phase: "single" },
  { name: "SunWave 5.5kW", category: "inverter", brand: "SunWave", price: 285000, stock: 5, image: "/images/inverex1_5.jpg", watt: 5500, actualWatt: 5000, systemType: "hybrid", phase: "single" },
  { name: "EcoPower 3.8kW", category: "inverter", brand: "EcoPower", price: 140000, stock: 10, image: "/images/inverex1_5.jpg", watt: 3800, actualWatt: 3400, systemType: "hybrid", phase: "single" },
  { name: "VoltX 2.5kW", category: "inverter", brand: "VoltX", price: 81000, stock: 12, image: "/images/inverex1_5.jpg", watt: 2500, actualWatt: 2200, systemType: "hybrid", phase: "single" },
  { name: "TitanPower 6.5kW", category: "inverter", brand: "TitanPower", price: 330000, stock: 4, image: "/images/inverex1_5.jpg", watt: 6500, actualWatt: 6000, systemType: "hybrid", phase: "single" }
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
