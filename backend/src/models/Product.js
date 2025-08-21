// src/models/Product.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    brand: { type: String },
    category: { type: String, index: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    specs: { type: Map, of: String },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

// Create a text index for name & description to support $text search.
// The index creation is idempotent — if it exists, Mongo ignores it.
productSchema.index({ name: "text", description: "text", brand: "text", category: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
