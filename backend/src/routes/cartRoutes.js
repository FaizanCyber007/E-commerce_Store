import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Get user cart
// @route GET /api/cart
// @access Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("cart.product");

    res.json({
      success: true,
      cart: user.cart || [],
    });
  })
);

// @desc Add item to cart
// @route POST /api/cart
// @access Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { productId, quantity = 1, variant = {} } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (product.countInStock < quantity) {
      res.status(400);
      throw new Error("Insufficient stock");
    }

    const user = await User.findById(req.user._id);

    // Check if item already exists in cart with same variant
    const existingItemIndex = user.cart.findIndex(
      (item) =>
        item.product.toString() === productId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = user.cart[existingItemIndex].quantity + quantity;

      if (product.countInStock < newQuantity) {
        res.status(400);
        throw new Error("Insufficient stock");
      }

      user.cart[existingItemIndex].quantity = newQuantity;
      user.cart[existingItemIndex].price = product.price;
    } else {
      // Add new item
      user.cart.push({
        product: productId,
        quantity,
        price: product.price,
        variant,
      });
    }

    await user.save();

    // Populate and return updated cart
    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product"
    );

    res.status(201).json({
      success: true,
      cart: updatedUser.cart,
    });
  })
);

// @desc Update cart item quantity
// @route PUT /api/cart/:itemId
// @access Private
router.put(
  "/:itemId",
  protect,
  asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    if (quantity < 1) {
      res.status(400);
      throw new Error("Quantity must be at least 1");
    }

    const user = await User.findById(req.user._id);
    const cartItem = user.cart.id(req.params.itemId);

    if (!cartItem) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    const product = await Product.findById(cartItem.product);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (product.countInStock < quantity) {
      res.status(400);
      throw new Error("Insufficient stock");
    }

    cartItem.quantity = quantity;
    cartItem.price = product.price; // Update price in case it changed

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product"
    );

    res.json({
      success: true,
      cart: updatedUser.cart,
    });
  })
);

// @desc Remove item from cart
// @route DELETE /api/cart/:itemId
// @access Private
router.delete(
  "/:itemId",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const cartItem = user.cart.id(req.params.itemId);
    if (!cartItem) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    user.cart.pull({ _id: req.params.itemId });
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product"
    );

    res.json({
      success: true,
      cart: updatedUser.cart,
    });
  })
);

// @desc Clear cart
// @route DELETE /api/cart
// @access Private
router.delete(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: "Cart cleared",
      cart: [],
    });
  })
);

export default router;
