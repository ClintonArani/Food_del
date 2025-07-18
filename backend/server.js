import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/FoodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB(); // ✅ ensure this is async safe (see note below)

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Health check route
app.get('/', (req, res) => {
  res.send('API Working on Serverless');
});

// ❌ This will crash your Vercel deployment — comment it
// const port = 4000;
// app.listen(port, () => {
//     console.log(`Server started on http://localhost:${port}`);
// });

// ✅ For Vercel: export the Express instance
export default app;
