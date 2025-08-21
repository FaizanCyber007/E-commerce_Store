import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const getSignature = asyncHandler(async (req, res) => {
  // Option 1: direct unsigned preset (simplest) – but we'll return cloud name for FE
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  });
});
