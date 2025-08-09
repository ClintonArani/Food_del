import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import foodModel from "../models/foodModel.js";

// Reusable Cloudinary upload function
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

// Add food
const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is required" });
  }

  try {
    const result = await uploadFromBuffer(req.file.buffer);

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

// Remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    if (food.image_public_id) {
      await cloudinary.uploader.destroy(food.image_public_id);
    }

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing food item" });
  }
};

// Edit food
const editFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    let updatedData = {
      name: req.body.name || food.name,
      description: req.body.description || food.description,
      price: req.body.price || food.price,
      category: req.body.category || food.category,
    };

    if (req.file) {
      if (food.image_public_id) {
        await cloudinary.uploader.destroy(food.image_public_id);
      }
      const result = await uploadFromBuffer(req.file.buffer);
      updatedData.image = result.secure_url;
      updatedData.image_public_id = result.public_id;
    }

    await foodModel.findByIdAndUpdate(req.body.id, updatedData, { new: true });

    res.json({ success: true, message: "Food Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating food item" });
  }
};

export { addFood, listFood, removeFood, editFood };
