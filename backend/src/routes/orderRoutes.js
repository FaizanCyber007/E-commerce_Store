import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, myOrders, getOrder, markPaid } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/mine", protect, myOrders);
router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, markPaid);

export default router;
