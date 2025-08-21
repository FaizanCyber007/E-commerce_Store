import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCheckoutSession,
  handleWebhook,
  getStripeConfig,
} from "../controllers/stripeController.js";

const router = express.Router();

// Public routes
router.get("/config", getStripeConfig);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);

// Protected routes
router.post("/checkout", protect, createCheckoutSession);

export default router;
