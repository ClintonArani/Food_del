import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/FoodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App configuration
const app = express();
const port = 4000; // Not used in serverless

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
await connectDB(); // Ensure the DB is connected before handling requests

// API endpoints
app.use("/api/food", foodRouter);

// ❌ Not supported in Vercel serverless: cannot serve static files from disk
// app.use("/images", express.static('uploads'));

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});

// ❌ Not used in serverless functions (Vercel handles the request lifecycle)
// app.listen(port, () => {
//     console.log(`Server started on http://localhost:${port}`);
// });

// ✅ Export app for serverless deployment
export default app;
