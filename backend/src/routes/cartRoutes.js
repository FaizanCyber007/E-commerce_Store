import express from "express";
import asyncHandler from "express-async-handler";

// This route is for server-side persisted carts (optional).
// For now, we return 200 to validate connectivity.
const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
  res.json({ status: "ok" });
}));

export default router;
