import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is required" });
  }

  try {
    // Wrap Cloudinary upload_stream into a promise for async/await usage
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "food_items" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // Upload the buffer to Cloudinary
    const result = await uploadFromBuffer(req.file.buffer);

    // Save food data with Cloudinary image URL and public_id
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url,
      image_public_id: result.public_id,
    });

    await food.save();

    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove image from Cloudinary
        if (food.image_public_id) {
            await cloudinary.uploader.destroy(food.image_public_id);
        }

        // Remove record from DB
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removeFood };
