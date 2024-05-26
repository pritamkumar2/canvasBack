import crypto from "crypto";
import { instance } from "../../app.js";

export const Checkout = (req, res) => {
  const { totalAmount } = req.body;
  console.log("Received totalAmount from frontend:", totalAmount);

  if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid total amount" });
  }

  const options = {
    amount: Math.round(totalAmount), // round to the nearest integer to avoid floating point issues
    currency: "INR",
  };

  instance.orders.create(options, (err, order) => {
    if (err) {
      console.error("Error creating order:", err);
      return res.status(500).json({
        success: false,
        message: "Order creation failed",
        error: err.message,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Order created successfully", order });
  });
};

export const paymentVerification = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log("Received data for verification:", req.body);

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment verification data" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_APISECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res
      .status(200)
      .json({ success: true, message: "Payment verification successful" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid payment signature" });
  }
};

export const rzpGetKey = (req, res) => {
  res.status(200).send({ success: true, key: process.env.RZP_APIKEY });
};
