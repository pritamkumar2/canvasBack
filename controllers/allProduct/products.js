import Product from "../../models/products-model.js";

const allProducts = async (req, res) => {
  try {
    const productData = await Product.find();
    console.log(
      "i am productct data ////////////////////////////",
      productData
    );
    if (!productData) {
      return res
        .status(400)
        .json({ message: "error is there in controllers products" });
    }

    res.status(200).json({ data: productData });
  } catch (err) {
    console.error("Error from controllers product ", err);
    res.status(500).send("Internal Server Error");
  }
};

const singleProduct = async (req, res) => {
  try {
    const singleProduct = await Product.findOne({
      _id: req.params.id,
    });

    console.log("i am the single", singleProduct);
    if (!singleProduct) {
      return res
        .status(400)
        .json({ message: "error is there in controllers singleProduct" });
    }

    res.status(200).json({ data: singleProduct });

    console.log(singleProduct);
  } catch (error) {
    console.error("error from backend single products", error);
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPercent,
      imageUrl,
      additionalImage,
      colours,
      category,
      tags,
      isFeatured,
      rating,
      comments,
      size,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !discountPercent ||
      !imageUrl ||
      !category ||
      !tags ||
      !size
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discountPercent,
      imageUrl,
      colours,
      category,
      tags,
      isFeatured,
      rating,
      comments,
      size,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("error from controllers addProduct", error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// filters of product page

export { allProducts, singleProduct, addProduct, deleteAllProducts };
