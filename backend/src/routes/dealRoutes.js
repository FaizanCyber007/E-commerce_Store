import express from "express";
import {
  getDeals,
  getDeal,
  getFeaturedDeals,
  getFlashSales,
  getDealProducts,
  createDeal,
  updateDeal,
  deleteDeal,
} from "../controllers/dealController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getDeals);
router.get("/featured", getFeaturedDeals);
router.get("/flash-sales", getFlashSales);
router.get("/:slug", getDeal);
router.get("/:slug/products", getDealProducts);

// Admin routes
router.post("/", protect, admin, createDeal);
router.put("/:id", protect, admin, updateDeal);
router.delete("/:id", protect, admin, deleteDeal);

export default router;
