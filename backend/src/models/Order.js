import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    qty: Number,
    image: String,
    price: Number
  }],
  shippingAddress: {
    fullName: String,
    email: String,
    phone: String,
    address: String
  },
  paymentMethod: { type: String, enum: ["Card", "COD"], default: "COD" },
  paymentResult: {
    id: String, status: String, update_time: String, email_address: String
  },
  itemsPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
