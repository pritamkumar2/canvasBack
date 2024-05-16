import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    regular: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },

  colours: {
    type: [String],
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: String,
  },
  comments: {
    type: [
      {
        user: {
          type: String,
        },
        comment: {
          type: String,
        },
        rating: {
          type: String,
        },
      },
    ],
  },
  size: {
    type: [String],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
