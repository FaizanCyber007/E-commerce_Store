import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addReview } from "../controllers/reviewController.js";

const router = express.Router();
router.post("/:slug", protect, addReview);

export default router;
