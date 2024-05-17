import CartItem from "../../models/cart-model.js";

// Get all cart items for a user
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await CartItem.find({ userId }).populate("product");
    if (!cartItems.length) {
      return res.status(404).json({ message: "No items found in cart" });
    }
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};

// Add an item to the cart
const addCart = async (req, res) => {
  const { userId } = req.params;
  const { id, name, image, amount, size, colour, product, quantity } = req.body;

  // Validate required fields
  if (
    !userId ||
    !id ||
    !name ||
    !image ||
    !amount ||
    !size ||
    !product ||
    !quantity
  ) {
    return res.status(400).json({ message: "Please fill all fields properly" });
  }

  const newCartItem = new CartItem({
    userId,
    id,
    name,
    image,
    amount,
    size,
    colour,
    product,
    quantity,
  });

  try {
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Remove an item from the cart
const removeCartItem = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const deletedCartItem = await CartItem.findOneAndDelete({
      userId,
      _id: itemId,
    });
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    res
      .status(200)
      .json({ message: "Item removed from cart", deletedCartItem });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

// Increase quantity of a cart item
const increaseQuantity = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const updatedCartItem = await CartItem.findOneAndUpdate(
      { userId, _id: itemId },
      { $inc: { quantity: 1 } },
      { new: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    res.status(200).json({ message: "Item quantity increased", updatedCartItem });
  } catch (error) {
    res.status(500).json({ message: "Error increasing item quantity", error });
  }
};

// Decrease quantity of a cart item
const decreaseQuantity = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const cartItem = await CartItem.findOne({ userId, _id: itemId });
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (cartItem.quantity === 1) {
      return res.status(400).json({ message: "Quantity cannot be less than 1" });
    }
    cartItem.quantity -= 1;
    await cartItem.save();
    res.status(200).json({ message: "Item quantity decreased", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error decreasing item quantity", error });
  }
};

export { getCart, addCart, removeCartItem, increaseQuantity, decreaseQuantity };
