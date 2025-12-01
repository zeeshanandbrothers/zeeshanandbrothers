import mongoose from "mongoose";

const inverterSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Off-Grid, Single Phase Hybrid, On-Grid
    description: { type: String, required: true },
    phase: { type: String }, // Single / 3 Phase
    kw: { type: Number, required: true },
    watts: { type: Number, required: true },
    actualSupplyWatts: { type: Number, required: true },
    batteryVoltage: { type: String }, // Optional
    batteryWatts: { type: Number }, // Optional
    amps: { type: Number }, // Optional
    numOfBatteries: { type: Number }, // Optional
  },
  { timestamps: true }
);

export default mongoose.models.Inverter ||
  mongoose.model("Inverter", inverterSchema);
