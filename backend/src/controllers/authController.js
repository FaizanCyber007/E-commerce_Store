import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password });
  generateToken(res, user._id);
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  generateToken(res, user._id);
  res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out" });
});

export const profile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
