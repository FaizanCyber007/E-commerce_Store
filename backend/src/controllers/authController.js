import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
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
  const token = generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token, // Include token in response
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await user.matchPassword(password);

  if (!passwordMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  try {
    // Generate JWT token without setting cookies for now
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback-secret-change-in-production",
      { expiresIn: "7d" }
    );

    const responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token, // Include token in response for frontend localStorage
    };

    res.json(responseData);
  } catch (tokenError) {
    console.error("Token generation error:", tokenError);
    res.status(500);
    throw new Error("Token generation failed");
  }
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out" });
});

export const profile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
