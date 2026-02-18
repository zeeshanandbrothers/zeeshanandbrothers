import { connectDB } from "../src/lib/db.js";
import { Panel } from "../src/models/Product.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
async function seedPanels() {
  await connectDB();

  await Panel.deleteMany(); // optional (clean slate)

  const PANELS_SEED = [
    {
      name: "Bifacial Solar Plate 240W",
      category: "panel",
      brand: "Generic",
      watt: 240,
      actualWatt: 168,
      price: 28000,
      stock: 50,
      image: "https://res.cloudinary.com/xxx/image/upload/panels/240w.jpg",
    },
    {
      name: "Bifacial Solar Plate 340W",
      category: "panel",
      brand: "Generic",
      watt: 340,
      actualWatt: 238,
      price: 39000,
      stock: 40,
      image: "https://res.cloudinary.com/xxx/image/upload/panels/340w.jpg",
    },
    {
      name: "Bifacial Solar Plate 575W",
      category: "panel",
      brand: "Generic",
      watt: 575,
      actualWatt: 402.5,
      price: 72000,
      stock: 30,
      image: "https://res.cloudinary.com/xxx/image/upload/panels/575w.jpg",
    },
    {
      name: "Bifacial Solar Plate 585W",
      category: "panel",
      brand: "Generic",
      watt: 585,
      actualWatt: 409.5,
      price: 75000,
      stock: 25,
      image: "https://res.cloudinary.com/xxx/image/upload/panels/585w.jpg",
    },
    {
      name: "Bifacial Solar Plate 610W",
      category: "panel",
      brand: "Generic",
      watt: 610,
      actualWatt: 427,
      price: 79000,
      stock: 20,
      image: "https://res.cloudinary.com/xxx/image/upload/panels/610w.jpg",
    },
    {
      name: "Bifacial Solar Plate 630W",
      category: "panel",
      brand: "Generic",
      watt: 630,
      actualWatt: 441,
      price: 82000,
      stock: 20,
      image: "https://res.cloudinary.com/xxx/image/upload/panels/630w.jpg",
    },
    {
      name: "Bifacial Solar Plate 640W",
      category: "panel",
      brand: "Generic",
      watt: 640,
      actualWatt: 448,
      price: 85000,
      stock: 15,
      image: "https://res.cloudinary.com/xxx/image/upload/panels/640w.jpg",
    },
  ];

  await Panel.insertMany(PANELS_SEED);

  console.log("✅ Panels seeded successfully");
  process.exit();
}

seedPanels();
