import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    ARCJECT_ENV:process.env.ARCJECT_ENV,
    ARCJECT_KEY:process.env.ARCJECT_KEY,
    MONGO_URI:process.env.MONGO_URI,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
}