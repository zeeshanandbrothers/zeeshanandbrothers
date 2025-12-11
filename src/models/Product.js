// models/Product.js
import mongoose, { Schema } from "mongoose";

if (mongoose.models.Product) {
  // Prevent Overwrite Error in Next.js hot reload
  delete mongoose.models.Product;
}

// BASE SCHEMA
const ProductBaseSchema = new Schema(
  {
    sku: String,
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["panel", "inverter", "battery", "accessory"],
    },
    brand: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true }, // ⭐ ADDED HERE
  },
  {
    timestamps: true,
    discriminatorKey: "category",
  }
);

const Product = mongoose.model("Product", ProductBaseSchema);

// ⭐ IMPORTANT — Prevent discriminator duplication
const Panel =
  mongoose.models.panel ||
  Product.discriminator(
    "panel",
    new Schema({
      watt: Number,
      actualWatt: Number,
    })
  );

const Inverter =
  mongoose.models.inverter ||
  Product.discriminator(
    "inverter",
    new Schema({
      watt: Number,
      actualWatt: Number,
      systemType: { type: String, enum: ["ongrid", "offgrid", "hybrid"] },
      phase: { type: String, enum: ["single", "three"] },
    })
  );

const Battery =
  mongoose.models.battery ||
  Product.discriminator(
    "battery",
    new Schema({
      watt: Number,
      actualWatt: Number,
      Ah: Number,
    })
  );

const Accessory =
  mongoose.models.accessory ||
  Product.discriminator("accessory", new Schema({}));

export { Product, Panel, Inverter, Battery, Accessory };
export default Product;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true }, // e.g. “Knox Eco 3kW pv4000”
//     category: { type: String, required: true }, // Off-Grid, On-Grid...
//     image: { type: String, required: true }, // Image URL
//     price: { type: String, required: true }, // “79k”
//     description: { type: String, required: true }, // Full description text
//     technicalSpecs: { type: String }, // Long text block (free-form)
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Product ||
//   mongoose.model("Product", productSchema);
