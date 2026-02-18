// lib/mongoose.js
import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      maxPoolSize: 10,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    throw error;
  }
}
