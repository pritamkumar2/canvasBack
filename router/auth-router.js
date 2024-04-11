import express from "express";
import {
  register,
  login,
  forget,
} from "../controllers/login-register/authantication.js";
import contact from "../controllers/contact/contact.js";
import allProducts from "../controllers/allProduct/products.js";
import validate from "../middleware/zodValidatemiddleware.js";
import {
  registerSchema,
  loginSchema,
  forgetSchema,
  contactSchema,
} from "../validators/zod-validation.js";

const router = express.Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/forget").post(validate(forgetSchema), forget);
router.route("/contact").post(validate(contactSchema), contact);
router.route("/allProducts").get(allProducts);
export default router;
