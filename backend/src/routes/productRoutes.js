// src/routes/productRoutes.js
import express from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getCategories,
  getBrands,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // optional auth middlewares

const router = express.Router();

// Public routes
router.get("/", listProducts);
router.get("/featured", getFeaturedProducts);
router.get("/categories", getCategories);
router.get("/brands", getBrands);
router.get("/:slug", getProduct);

// Protected (admin) - optional; leave as-is if your auth middleware exists
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
