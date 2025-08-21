// src/controllers/productController.js
import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

/**
 * GET /api/products
 * Query params supported:
 *  - page (number)
 *  - limit (number)
 *  - search OR keyword (string) -> text search
 *  - category (string)
 *  - priceRange (string like "100-500")
 *  - priceMin / priceMax (numbers) -> alternative to priceRange
 *  - rating (number) -> minimum rating
 *  - sort (price_asc | price_desc | rating_desc | newest | popular)
 *
 * Response:
 *  { products: [...], page, pages, total }
 */
export const listProducts = asyncHandler(async (req, res) => {
  // Prefer parsedQuery if your server created it; else fallback to req.query
  const q = (req.parsedQuery && Object.keys(req.parsedQuery).length) ? req.parsedQuery : req.query || {};

  // Parse pagination
  const page = Math.max(Number(q.page) || 1, 1);
  const limit = Math.max(Number(q.limit) || 12, 1);
  const skip = (page - 1) * limit;

  // Build filter
  const filter = {};

  // Keyword / text search
  const keyword = q.keyword || q.search || "";
  if (keyword && String(keyword).trim() !== "") {
    // Use $text if index exists; fallback to case-insensitive regex on name
    // Safer: try $text, but if it errors (no index), fallback to regex
    try {
      filter.$text = { $search: String(keyword).trim() };
    } catch (err) {
      // fallback (this catch rarely hits because Mongoose won't throw here normally)
      filter.name = { $regex: String(keyword).trim(), $options: "i" };
    }
  }

  // Category
  if (q.category && String(q.category).trim() !== "") {
    filter.category = String(q.category).trim();
  }

  // Price range (support priceRange string or priceMin/priceMax)
  if (q.priceRange && typeof q.priceRange === "string") {
    const pr = q.priceRange.trim();
    if (pr.includes("-")) {
      const [minStr, maxStr] = pr.split("-").map((s) => s.trim());
      const min = Number(minStr);
      const max = Number(maxStr);
      if (!Number.isNaN(min) || !Number.isNaN(max)) {
        filter.price = {};
        if (!Number.isNaN(min)) filter.price.$gte = min;
        if (!Number.isNaN(max)) filter.price.$lte = max;
      }
    }
  } else {
    // priceMin / priceMax optionally provided
    const min = q.priceMin !== undefined ? Number(q.priceMin) : NaN;
    const max = q.priceMax !== undefined ? Number(q.priceMax) : NaN;
    if (!Number.isNaN(min) || !Number.isNaN(max)) {
      filter.price = {};
      if (!Number.isNaN(min)) filter.price.$gte = min;
      if (!Number.isNaN(max)) filter.price.$lte = max;
    }
  }

  // Rating (minimum)
  if (q.rating !== undefined && q.rating !== null && q.rating !== "") {
    const r = Number(q.rating);
    if (!Number.isNaN(r)) {
      filter.rating = { $gte: r };
    }
  }

  // Sorting
  let sortObj = { createdAt: -1 }; // newest default
  switch (q.sort) {
    case "price_asc":
      sortObj = { price: 1 };
      break;
    case "price_desc":
      sortObj = { price: -1 };
      break;
    case "rating_desc":
      sortObj = { rating: -1 };
      break;
    case "newest":
      sortObj = { createdAt: -1 };
      break;
    case "popular":
      sortObj = { numReviews: -1, rating: -1 };
      break;
    default:
      break;
  }

  try {
    // Count documents (if using $text filter, countDocuments supports it)
    const total = await Product.countDocuments(filter).exec();

    // Query products
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    res.json({
      products,
      page,
      pages: total > 0 ? Math.ceil(total / limit) : 1,
      total,
    });
  } catch (err) {
    // Log full error on server for debugging, return minimal message to client
    console.error("❌ listProducts error:", err);
    res.status(500).json({ error: err.message || "Error fetching products" });
  }
});

export const getProduct = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({ slug }).lean().exec();
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
  if (!updated) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(updated);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id).exec();
  if (!deleted) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ message: "Deleted" });
});
