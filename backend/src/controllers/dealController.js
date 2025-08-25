import asyncHandler from "express-async-handler";
import Deal from "../models/Deal.js";
import Product from "../models/Product.js";

// @desc Get all active deals
// @route GET /api/deals
// @access Public
export const getDeals = asyncHandler(async (req, res) => {
  const deals = await Deal.find({
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  })
    .populate(
      "products",
      "name slug image price originalPrice rating numReviews"
    )
    .sort({ featured: -1, order: 1, createdAt: -1 });

  // Add computed fields
  const dealsWithTimeRemaining = deals.map((deal) => ({
    ...deal.toObject(),
    timeRemaining: deal.timeRemaining,
    isCurrentlyActive: deal.isCurrentlyActive,
  }));

  res.json({
    success: true,
    deals: dealsWithTimeRemaining,
  });
});

// @desc Get single deal
// @route GET /api/deals/:slug
// @access Public
export const getDeal = asyncHandler(async (req, res) => {
  const deal = await Deal.findOne({
    slug: req.params.slug,
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  }).populate(
    "products",
    "name slug image price originalPrice rating numReviews brand description countInStock"
  );

  if (!deal) {
    res.status(404);
    throw new Error("Deal not found or expired");
  }

  res.json({
    success: true,
    deal: {
      ...deal.toObject(),
      timeRemaining: deal.timeRemaining,
      isCurrentlyActive: deal.isCurrentlyActive,
    },
  });
});

// @desc Get featured deals
// @route GET /api/deals/featured
// @access Public
export const getFeaturedDeals = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 6;

  const deals = await Deal.find({
    isActive: true,
    featured: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  })
    .populate(
      "products",
      "name slug image price originalPrice rating numReviews"
    )
    .sort({ order: 1, createdAt: -1 })
    .limit(limit);

  const dealsWithTimeRemaining = deals.map((deal) => ({
    ...deal.toObject(),
    timeRemaining: deal.timeRemaining,
    isCurrentlyActive: deal.isCurrentlyActive,
  }));

  res.json({
    success: true,
    deals: dealsWithTimeRemaining,
  });
});

// @desc Get flash sales (ending soon)
// @route GET /api/deals/flash-sales
// @access Public
export const getFlashSales = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const deals = await Deal.find({
    isActive: true,
    type: "flash_sale",
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date(), $lte: oneDayFromNow },
  })
    .populate(
      "products",
      "name slug image price originalPrice rating numReviews"
    )
    .sort({ endDate: 1 })
    .limit(limit);

  const dealsWithTimeRemaining = deals.map((deal) => ({
    ...deal.toObject(),
    timeRemaining: deal.timeRemaining,
    isCurrentlyActive: deal.isCurrentlyActive,
  }));

  res.json({
    success: true,
    deals: dealsWithTimeRemaining,
  });
});

// @desc Get deal products with filters
// @route GET /api/deals/:slug/products
// @access Public
export const getDealProducts = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const deal = await Deal.findOne({
    slug,
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  });

  if (!deal) {
    res.status(404);
    throw new Error("Deal not found or expired");
  }

  let filter = {};

  // If deal has specific products, filter by those
  if (deal.products && deal.products.length > 0) {
    filter._id = { $in: deal.products };
  } else if (deal.categories && deal.categories.length > 0) {
    // If deal has categories, filter by those
    filter.category = { $in: deal.categories };
  }

  // Apply deal discount logic
  if (deal.discountType === "percentage") {
    filter.price = { $gte: deal.originalPrice };
  }

  // Add additional filters
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ];
  }

  if (req.query.brand) {
    filter.brand = req.query.brand;
  }

  // Sorting
  let sortObj = { featured: -1, createdAt: -1 };
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
  }

  const [products, totalProducts] = await Promise.all([
    Product.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  // Apply deal pricing
  const productsWithDealPricing = products.map((product) => {
    let salePrice = product.price;

    if (deal.discountType === "percentage") {
      salePrice = product.price * (1 - deal.discountValue / 100);
    } else if (deal.discountType === "fixed_amount") {
      salePrice = Math.max(0, product.price - deal.discountValue);
    }

    return {
      ...product,
      originalPrice: product.price,
      salePrice: Math.round(salePrice * 100) / 100,
      dealDiscount: deal.discountValue,
      dealType: deal.discountType,
    };
  });

  const totalPages = Math.ceil(totalProducts / limit);

  res.json({
    success: true,
    products: productsWithDealPricing,
    deal: {
      ...deal.toObject(),
      timeRemaining: deal.timeRemaining,
      isCurrentlyActive: deal.isCurrentlyActive,
    },
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

// @desc Create deal
// @route POST /api/deals
// @access Private/Admin
export const createDeal = asyncHandler(async (req, res) => {
  const deal = await Deal.create(req.body);

  res.status(201).json({
    success: true,
    deal,
  });
});

// @desc Update deal
// @route PUT /api/deals/:id
// @access Private/Admin
export const updateDeal = asyncHandler(async (req, res) => {
  const deal = await Deal.findById(req.params.id);

  if (!deal) {
    res.status(404);
    throw new Error("Deal not found");
  }

  const updatedDeal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    deal: updatedDeal,
  });
});

// @desc Delete deal
// @route DELETE /api/deals/:id
// @access Private/Admin
export const deleteDeal = asyncHandler(async (req, res) => {
  const deal = await Deal.findById(req.params.id);

  if (!deal) {
    res.status(404);
    throw new Error("Deal not found");
  }

  await Deal.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Deal deleted successfully",
  });
});
