import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getSignature } from "../controllers/uploadController.js";

const router = express.Router();
router.get("/cloudinary-signature", protect, admin, getSignature);

export default router;
