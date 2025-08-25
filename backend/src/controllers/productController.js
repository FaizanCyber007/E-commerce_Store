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
  const q =
    req.parsedQuery && Object.keys(req.parsedQuery).length
      ? req.parsedQuery
      : req.query || {};

  // Parse pagination
  const page = Math.max(Number(q.page) || 1, 1);
  const limit = Math.max(Number(q.limit) || 12, 1);
  const skip = (page - 1) * limit;

  // Build filter
  const filter = {};

  // Search functionality - search in name, description, and brand
  const search = q.search || q.keyword || "";
  if (search && String(search).trim() !== "") {
    const searchTerm = String(search).trim();
    filter.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { brand: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // Category filter
  if (q.category && String(q.category).trim() !== "") {
    filter.category = { $regex: String(q.category).trim(), $options: "i" };
  }

  // Brand filter
  if (q.brand && String(q.brand).trim() !== "") {
    filter.brand = String(q.brand).trim();
  }

  // Price range filters
  const minPrice = Number(q.minPrice);
  const maxPrice = Number(q.maxPrice);
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filter.price = {};
    if (!isNaN(minPrice) && minPrice >= 0) {
      filter.price.$gte = minPrice;
    }
    if (!isNaN(maxPrice) && maxPrice > 0) {
      filter.price.$lte = maxPrice;
    }
  }

  // Stock filter
  if (q.inStock === "true") {
    filter.countInStock = { $gt: 0 };
  }

  // Sale filter (assuming products on sale have originalPrice > price)
  if (q.onSale === "true") {
    filter.$expr = { $gt: ["$originalPrice", "$price"] };
  }

  // Rating filter (minimum rating)
  if (q.rating !== undefined && q.rating !== null && q.rating !== "") {
    const r = Number(q.rating);
    if (!Number.isNaN(r)) {
      filter.rating = { $gte: r };
    }
  }

  // Sorting
  let sortObj = { createdAt: -1 }; // newest default
  switch (q.sortBy) {
    case "price-asc":
      sortObj = { price: 1 };
      break;
    case "price-desc":
      sortObj = { price: -1 };
      break;
    case "rating":
      sortObj = { rating: -1, numReviews: -1 };
      break;
    case "newest":
      sortObj = { createdAt: -1 };
      break;
    case "popular":
      sortObj = { numReviews: -1, rating: -1 };
      break;
    case "featured":
      sortObj = { featured: -1, rating: -1 };
      break;
    default:
      sortObj = { featured: -1, rating: -1 };
      break;
  }

  try {
    // Count total documents matching filter
    const totalProducts = await Product.countDocuments(filter).exec();

    // Query products with filters, sorting, and pagination
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    res.json({
      products,
      currentPage: page,
      totalPages: totalProducts > 0 ? Math.ceil(totalProducts / limit) : 1,
      totalProducts,
      hasNextPage: page < Math.ceil(totalProducts / limit),
      hasPrevPage: page > 1,
    });
  } catch (err) {
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
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).exec();
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

/**
 * GET /api/products/featured
 * Get featured products
 * Query params: limit (default 8)
 */
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = Math.max(Number(req.query.limit) || 8, 1);

  try {
    // First try to get products marked as featured
    let products = await Product.find({ featured: true })
      .sort({ rating: -1, numReviews: -1 })
      .limit(limit)
      .lean()
      .exec();

    // If not enough featured products, fill with top-rated products
    if (products.length < limit) {
      const remainingLimit = limit - products.length;
      const excludeIds = products.map((p) => p._id);

      const additionalProducts = await Product.find({
        _id: { $nin: excludeIds },
      })
        .sort({ rating: -1, numReviews: -1 })
        .limit(remainingLimit)
        .lean()
        .exec();

      products = [...products, ...additionalProducts];
    }

    res.json(products);
  } catch (err) {
    console.error("❌ getFeaturedProducts error:", err);
    res
      .status(500)
      .json({ error: err.message || "Error fetching featured products" });
  }
});

/**
 * GET /api/products/categories
 * Get all product categories
 */
export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Product.distinct("category").exec();
    res.json({ categories: categories.filter((cat) => cat && cat.trim()) });
  } catch (err) {
    console.error("❌ getCategories error:", err);
    res.status(500).json({ error: err.message || "Error fetching categories" });
  }
});

/**
 * GET /api/products/brands
 * Get all product brands
 */
export const getBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Product.distinct("brand").exec();
    res.json({ brands: brands.filter((brand) => brand && brand.trim()) });
  } catch (err) {
    console.error("❌ getBrands error:", err);
    res.status(500).json({ error: err.message || "Error fetching brands" });
  }
});
