import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function GET(_, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);
    if (!product)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const formData = await request.formData();

    const existing = await Product.findById(params.id);
    if (!existing)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });

    const name = formData.get("name");
    const price = formData.get("price");
    const imageFile = formData.get("image");

    let imageUrl = existing.image;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = `data:${imageFile.type};base64,${buffer.toString(
        "base64"
      )}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "products",
      });

      imageUrl = upload.secure_url;
    }

    const updateData = {
      name,
      price,
      image: imageUrl,
    };

    // ----- CATEGORY SPECIFIC -----
    if (existing.category === "panel") {
      updateData.watt = formData.get("watt");
      updateData.actualWatt = formData.get("actualWatt");
    }

    if (existing.category === "inverter") {
      updateData.watt = formData.get("watt");
      updateData.actualWatt = formData.get("actualWatt");
      updateData.systemType = formData.get("systemType");
      updateData.phase = formData.get("phase");
    }

    if (existing.category === "battery") {
      updateData.watt = formData.get("watt");
      updateData.actualWatt = formData.get("actualWatt");
      updateData.Ah = formData.get("Ah");
    }

    const updated = await Product.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();

    await Product.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
