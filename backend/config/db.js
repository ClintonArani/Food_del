import mongoose from "mongoose";

let isConnected = false; // Global cache for connection state

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://greatstack:28922002@cluster0.4gelb4x.mongodb.net/food_del');

    isConnected = true;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};
