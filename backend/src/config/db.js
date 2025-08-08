import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false; // Global cache for connection state

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    await mongoose.connect(`${ENV.MONGO_URI}/food_del`);

    isConnected = true;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};
