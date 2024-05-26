import express from "express";
import {
  register,
  login,
  forget,
  fireUser,
} from "../controllers/login-register/authantication.js";
import contact from "../controllers/contact/contact.js";
import {
  allProducts,
  singleProduct,
  addProduct,
  deleteAllProducts,
} from "../controllers/allProduct/products.js";
import validate from "../middleware/zodValidatemiddleware.js";
import {
  registerSchema,
  loginSchema,
  forgetSchema,
  contactSchema,
} from "../validators/zod-validation.js";
import { user, fireUsers } from "../controllers/user/user.js";
import {
  authMiddleware,
  FireAuthMiddleware,
} from "../middleware/Auth-middelware.js";
import {
  getCart,
  addCart,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
} from "../controllers/cart/cart.js";

import userOrder from "../controllers/order/orders.js";
import {
  Checkout,
  paymentVerification,
  rzpGetKey,
} from "../controllers/checkout/checkout.js";
const router = express.Router();

// Authentication routes
router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/forget").post(validate(forgetSchema), forget);
router.route("/fireUser").post(fireUser);

// Contact route
router.route("/contact").post(validate(contactSchema), contact);

// Product routes
router.route("/allProducts").get(allProducts);
router.route("/singleProducts/:id").get(singleProduct);

//  user orders routes

router.route("/saveOrder").post(userOrder);
router.route("/checkout").post(Checkout);
router.route("/paymentverification").post(paymentVerification);
router.route("/getkey").get(rzpGetKey);
// Admin route to add product

router.route("/addProduct").post(addProduct); // Admin route to add product
// router.route("/deleteProduct").delete(deleteAllProducts); // Admin route to delete all products

// User routes with authentication middleware
router.route("/fire").get(FireAuthMiddleware, fireUsers);
router.route("/user").get(authMiddleware, user);

// Cart routes
router.route("/addCart/:userId").post(addCart);
router.route("/getCart/:userId").get(getCart);
router.route("/removeCartItem/:userId/:productId").delete(removeCartItem);
router.route("/increasequantity/:userId/:itemId").patch(increaseQuantity);
router.route("/decreasequantity/:userId/:itemId").patch(decreaseQuantity);

export default router;
