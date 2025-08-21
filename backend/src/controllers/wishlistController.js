import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const toggleWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const user = await User.findById(req.user._id);
  const idx = user.wishlist.findIndex(id => id.toString() === productId);
  if (idx > -1) {
    user.wishlist.splice(idx, 1);
  } else {
    user.wishlist.push(productId);
  }
  await user.save();
  res.json({ wishlist: user.wishlist });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist || []);
});
