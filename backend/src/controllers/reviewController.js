import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) { res.status(404); throw new Error("Product not found"); }

  const already = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (already) { res.status(400); throw new Error("Product already reviewed"); }

  const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: "Review added" });
});
