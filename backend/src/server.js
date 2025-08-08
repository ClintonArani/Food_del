import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { ENV } from "./config/env.js";
import { arcjetMiddleware } from "./middleware/arcjetmiddleware.js";

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// security middleware
app.use(arcjetMiddleware)


// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Food Delivery API is running");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// Start server
const startServer = async () =>{
  try{
    await connectDB()
    await connectCloudinary()
    //listen for local development
    if (process.env.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => console.log(`Server is running on PORT: ${ENV.PORT}`));
    }
      
  }catch(error){
    console.error("Failed to start Server:", error)
    process.exit(1)
  }
 }


// Export app for Vercel
startServer()
export default app;
