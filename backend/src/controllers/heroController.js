import asyncHandler from "express-async-handler";
import { HeroSlide, HeroStat, HeroFeature } from "../models/Hero.js";

/**
 * GET /api/hero/slides
 * Get all hero slides
 */
export const getHeroSlides = asyncHandler(async (req, res) => {
  try {
    const slides = await HeroSlide.find({ active: true })
      .sort({ order: 1, createdAt: 1 })
      .lean()
      .exec();

    res.json({ slides });
  } catch (err) {
    console.error("❌ getHeroSlides error:", err);
    res
      .status(500)
      .json({ error: err.message || "Error fetching hero slides" });
  }
});

/**
 * GET /api/hero/stats
 * Get all hero stats
 */
export const getHeroStats = asyncHandler(async (req, res) => {
  try {
    const stats = await HeroStat.find({ active: true })
      .sort({ order: 1, createdAt: 1 })
      .lean()
      .exec();

    res.json({ stats });
  } catch (err) {
    console.error("❌ getHeroStats error:", err);
    res.status(500).json({ error: err.message || "Error fetching hero stats" });
  }
});

/**
 * GET /api/hero/features
 * Get all hero features
 */
export const getHeroFeatures = asyncHandler(async (req, res) => {
  try {
    const features = await HeroFeature.find({ active: true })
      .sort({ order: 1, createdAt: 1 })
      .lean()
      .exec();

    res.json({ features });
  } catch (err) {
    console.error("❌ getHeroFeatures error:", err);
    res
      .status(500)
      .json({ error: err.message || "Error fetching hero features" });
  }
});

/**
 * POST /api/hero/slides
 * Create a new hero slide (admin only)
 */
export const createHeroSlide = asyncHandler(async (req, res) => {
  try {
    const slide = await HeroSlide.create(req.body);
    res.status(201).json(slide);
  } catch (err) {
    console.error("❌ createHeroSlide error:", err);
    res.status(500).json({ error: err.message || "Error creating hero slide" });
  }
});

/**
 * POST /api/hero/stats
 * Create a new hero stat (admin only)
 */
export const createHeroStat = asyncHandler(async (req, res) => {
  try {
    const stat = await HeroStat.create(req.body);
    res.status(201).json(stat);
  } catch (err) {
    console.error("❌ createHeroStat error:", err);
    res.status(500).json({ error: err.message || "Error creating hero stat" });
  }
});

/**
 * POST /api/hero/features
 * Create a new hero feature (admin only)
 */
export const createHeroFeature = asyncHandler(async (req, res) => {
  try {
    const feature = await HeroFeature.create(req.body);
    res.status(201).json(feature);
  } catch (err) {
    console.error("❌ createHeroFeature error:", err);
    res
      .status(500)
      .json({ error: err.message || "Error creating hero feature" });
  }
});
