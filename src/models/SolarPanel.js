import mongoose from "mongoose";

const solarPanelSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    watt: { type: Number, required: true },
    actualProduction: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.SolarPanel ||
  mongoose.model("SolarPanel", solarPanelSchema);
