import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // FontAwesome icon name
      required: true,
    },
    color: {
      type: String, // Gradient colors
      required: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for getting products count
categorySchema.virtual("actualProductCount", {
  ref: "Product",
  localField: "slug",
  foreignField: "category",
  count: true,
});

export default mongoose.model("Category", categorySchema);
