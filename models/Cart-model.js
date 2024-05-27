import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export {CartItem,cartItemSchema};
