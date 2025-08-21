import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { toggleWishlist, getWishlist } from "../controllers/wishlistController.js";
const router = express.Router();

router.get("/", protect, getWishlist);
router.post("/:productId", protect, toggleWishlist);

export default router;
