import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

// @desc Get all categories
// @route GET /api/categories
// @access Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({
    order: 1,
    name: 1,
  });

  // Update product counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const productCount = await Product.countDocuments({
        category: category.slug,
      });
      return {
        ...category.toObject(),
        productCount,
      };
    })
  );

  res.json({
    success: true,
    categories: categoriesWithCounts,
  });
});

// @desc Get single category
// @route GET /api/categories/:slug
// @access Public
export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({
    slug: req.params.slug,
    isActive: true,
  });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const productCount = await Product.countDocuments({
    category: category.slug,
  });

  res.json({
    success: true,
    category: {
      ...category.toObject(),
      productCount,
    },
  });
});

// @desc Get products by category
// @route GET /api/categories/:slug/products
// @access Public
export const getCategoryProducts = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Check if category exists
  const category = await Category.findOne({
    slug,
    isActive: true,
  });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  // Build filter for products
  const filter = { category: slug };

  // Add additional filters if provided
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ];
  }

  if (req.query.brand) {
    filter.brand = req.query.brand;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
  }

  // Sorting
  let sortObj = { createdAt: -1 };
  switch (req.query.sortBy) {
    case "price-asc":
      sortObj = { price: 1 };
      break;
    case "price-desc":
      sortObj = { price: -1 };
      break;
    case "rating":
      sortObj = { rating: -1, numReviews: -1 };
      break;
    case "popular":
      sortObj = { numReviews: -1, rating: -1 };
      break;
    default:
      sortObj = { featured: -1, createdAt: -1 };
  }

  const [products, totalProducts] = await Promise.all([
    Product.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  res.json({
    success: true,
    products,
    category,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});

// ADMIN ROUTES

// @desc Create category
// @route POST /api/categories
// @access Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, image, icon, color } = req.body;

  const existingCategory = await Category.findOne({
    $or: [{ name }, { slug }],
  });

  if (existingCategory) {
    res.status(400);
    throw new Error("Category with this name or slug already exists");
  }

  const category = await Category.create({
    name,
    slug,
    description,
    image,
    icon,
    color,
  });

  res.status(201).json({
    success: true,
    category,
  });
});

// @desc Update category
// @route PUT /api/categories/:id
// @access Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    category: updatedCategory,
  });
});

// @desc Delete category
// @route DELETE /api/categories/:id
// @access Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await Category.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Category deleted successfully",
  });
});
