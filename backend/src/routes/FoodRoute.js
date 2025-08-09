import express from 'express';
import { addFood, editFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Use memoryStorage so files are stored in RAM buffer, not on disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.put("/edit", upload.single("image"), editFood)

export default foodRouter;
