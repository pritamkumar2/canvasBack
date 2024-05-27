import mongoose from "mongoose";
import { cartItemSchema } from "./cart-model.js";
import { string } from "zod";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Assuming user IDs are stored as ObjectIds
      ref: "User",
      required: true,
    },
    items: [
      {
        type: cartItemSchema,
        required: true,
      },
    ],
    shippingDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: String, required: true },
      phone: { type: String, required: true },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
