import crypto from "crypto";
import { instance } from "../../app.js";
import Order from "../../models/order-model.js";
import mongoose from "mongoose";
// export const Checkout = (req, res) => {
//   const { totalAmount } = req.body;
//   console.log("Received totalAmount from frontend:", req.body);

//   if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid total amount" });
//   }

//   const options = {
//     amount: Math.round(totalAmount), // round to the nearest integer to avoid floating point issues
//     currency: "INR",
//   };

//   instance.orders.create(options, (err, order) => {
//     if (err) {
//       console.error("Error creating order:", err);
//       return res.status(500).json({
//         success: false,
//         message: "Order creation failed",
//         error: err.message,
//       });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Order created successfully", order });
//   });
// };

// export const paymentVerification = (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   console.log("Received data for verification:", req.body);

//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid payment verification data" });
//   }

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RZP_APISECRET)
//     .update(body.toString())
//     .digest("hex");

//   if (expectedSignature === razorpay_signature) {
//     res
//       .status(200)
//       .json({ success: true, message: "Payment verification successful" });
//   } else {
//     res
//       .status(400)
//       .json({ success: false, message: "Invalid payment signature" });
//   }
// };

// export const rzpGetKey = (req, res) => {
//   res.status(200).send({ success: true, key: process.env.RZP_APIKEY });
// };export const Checkout = async (req, res) => {
// import crypto from "crypto";
// import mongoose from "mongoose";
// import { instance } from "../../app.js";
// import Order from "../models/order-model.js";

export const Checkout = async (req, res) => {
  const { totalAmount, orderData } = req.body;
  console.log("Received totalAmount from frontend:", req.body);

  if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid total amount" });
  }

  const options = {
    amount: Math.round(totalAmount), // round to the nearest integer to avoid floating point issues
    currency: "INR",
  };

  try {
    const razorpayOrder = await instance.orders.create(options);
    console.log("Razorpay order created:", razorpayOrder.id);

    // Validate and convert userId
    let userId;
    try {
      userId = orderData.userId;
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid userId format" });
    }

    // Ensure shippingDetails.phone is provided
    if (!orderData.shippingDetails.phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number in shipping details is required",
      });
    }

    // Save the order data to MongoDB with payment status as "Pending"
    const newOrder = new Order({
      userId: userId,
      items: orderData.items,
      shippingDetails: orderData.shippingDetails,
      totalAmount: orderData.totalAmount,
      paymentStatus: "Pending",
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: razorpayOrder,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message,
    });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log("Received data for verification:", req.body);

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid payment verification data" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_APISECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      // Find the order in MongoDB and update its payment status to "Completed"
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      order.paymentStatus = "Completed";
      await order.save();

      res.status(200).json({ success: true, message: "Payment verification successful" });
    } catch (err) {
      console.error("Error updating order:", err);
      res.status(500).json({
        success: false,
        message: "Error updating order",
        error: err.message,
      });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid payment signature" });
  }
};

export const rzpGetKey = (req, res) => {
  res.status(200).send({ success: true, key: process.env.RZP_APIKEY });
};
