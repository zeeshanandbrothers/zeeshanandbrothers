// lib/mongoose.js
import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
}
