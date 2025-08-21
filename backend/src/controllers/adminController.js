import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  res.json(users);
});

export const listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
  res.json(orders);
});

export const markDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.isDelivered = true;
  order.deliveredAt = new Date();
  await order.save();
  res.json(order);
});
