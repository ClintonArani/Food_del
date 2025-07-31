import express from "express";
import cors from "cors";
import "dotenv/config.js";

import { connectDB } from "./config/db.js";

import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/images", express.static("uploads"));

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("Food Delivery API is running");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// Start server only in development
const startServer = async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
    }
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// Export app for Vercel
export default app;
