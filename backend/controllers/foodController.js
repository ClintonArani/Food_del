import foodModel from "../models/foodModel.js";

// Add food item
const addFood = async (req, res) => {
    // Check if the file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

//all food list
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item
import fs from 'fs/promises';

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        await fs.unlink(`uploads/${food.image}`);
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};


export { addFood,listFood,removeFood };
