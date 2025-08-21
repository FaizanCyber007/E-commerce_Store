import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user._id });
  res.status(201).json(order);
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) { res.status(404); throw new Error("Order not found"); }
  res.json(order);
});

export const markPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentResult = { id: "DUMMY", status: "COMPLETED" };
  await order.save();
  res.json(order);
});
