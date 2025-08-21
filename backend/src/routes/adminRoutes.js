import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { listUsers, listOrders, markDelivered } from "../controllers/adminController.js";

const router = express.Router();
router.get("/users", protect, admin, listUsers);
router.get("/orders", protect, admin, listOrders);
router.put("/orders/:id/deliver", protect, admin, markDelivered);

export default router;
