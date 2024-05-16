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
const router = express.Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/forget").post(validate(forgetSchema), forget);
router.route("/fireUser").post(fireUser);

router.route("/contact").post(validate(contactSchema), contact);
router.route("/allProducts").get(allProducts);
router.route("/singleProducts/:id").get(singleProduct);
router.route("/fire").get(FireAuthMiddleware, fireUsers);
router.route("/user").get(authMiddleware, user);

router.route("/addProduct").post(addProduct);
router.route("/deleteProduct").delete(deleteAllProducts);
export default router;
