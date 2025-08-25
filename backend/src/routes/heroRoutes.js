import express from "express";
import {
  getHeroSlides,
  getHeroStats,
  getHeroFeatures,
  createHeroSlide,
  createHeroStat,
  createHeroFeature,
} from "../controllers/heroController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/slides", getHeroSlides);
router.get("/stats", getHeroStats);
router.get("/features", getHeroFeatures);

// Protected (admin) routes
router.post("/slides", protect, admin, createHeroSlide);
router.post("/stats", protect, admin, createHeroStat);
router.post("/features", protect, admin, createHeroFeature);

export default router;
