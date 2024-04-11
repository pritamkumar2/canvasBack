import Product from "../../models/products-model.js";
const allProducts = async (req, res) => {
  try {
    const productData = await Product.find();

    if (!productData) {
      return res
        .status(400)
        .json({ message: "error is there in controllers products" });
    }

    res.status(200).json({ message: "here all product", data: productData });
  } catch (err) {
    console.error("Error from controllers product ", err);
    res.status(500).send("Internal Server Error");
  }
};

export default allProducts;
