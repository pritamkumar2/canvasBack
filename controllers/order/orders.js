import Order from "../../models/order-model.js"; // Ensure this path is correct based on your project structure

const userOrder = async (req, res) => {
  const { userId, items, shippingDetails, totalAmount, paymentStatus } =
    req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      shippingDetails,
      totalAmount,
      paymentStatus,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default userOrder;
