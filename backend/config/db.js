import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:28922002@cluster0.4gelb4x.mongodb.net/food_del').then(() =>console.log("DB Connected"));
}