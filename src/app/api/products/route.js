import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Product, { Panel, Inverter, Battery, Accessory } from "@/models/Product";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const category = formData.get("category");
    const name = formData.get("name");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const price = formData.get("price");
    const stock = formData.get("stock");

    const watt = formData.get("watt");
    const actualWatt = formData.get("actualWatt");
    const systemType = formData.get("systemType");
    const phase = formData.get("phase");
    const Ah = formData.get("Ah");

    const imageFile = formData.get("image");

    let imageUrl = "";

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = `data:${imageFile.type};base64,${buffer.toString(
        "base64"
      )}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "products",
      });

      imageUrl = upload.secure_url;
    }

    const productData = {
      name,
      description,
      category,
      brand,
      price,
      stock,
      image: imageUrl,
    };

    if (category === "panel") {
      productData.watt = watt;
      productData.actualWatt = actualWatt;
    }

    if (category === "inverter") {
      productData.watt = watt;
      productData.actualWatt = actualWatt;
      productData.systemType = systemType;
      productData.phase = phase;
    }

    if (category === "battery") {
      productData.watt = watt;
      productData.actualWatt = actualWatt;
      productData.Ah = Ah;
    }

    // ⭐ IMPORTANT CHANGE — USE RIGHT MODEL
    let product;

    if (category === "panel") product = await Panel.create(productData);
    else if (category === "inverter")
      product = await Inverter.create(productData);
    else if (category === "battery")
      product = await Battery.create(productData);
    else product = await Accessory.create(productData);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
