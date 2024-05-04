import Product from "../../models/products-model.js";

const lowToHigh = (req, res) => {
  try {
    const sortedProducts = Product.find().sort({ "price.regular": 1 });
    res.json(sortedProducts);
  } catch (err) {
    console.error("error from product page filter low to high", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const highToLow = (req, res) => {
  try {
    const sortedProducts = Product.find().sort({ "price.regular": -1 });
    res.json(sortedProducts);
  } catch (err) {
    console.error("error from product page filter high to low", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const bestRating = (req, res) => {
  try {
    const sortedProducts = Product.find().sort({ rating: -1 });
    res.json(sortedProducts);
  } catch (err) {
    console.error("error from product page filter best rating", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const mostPopular = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithPopularity = products.map((product) => {
      const totalComments = product.comments.length;
      const averageRating = product.rating;
      const popularityScore = totalComments * 0.7 + averageRating * 0.3; // Adjust weights as needed
      return {
        ...product.toObject(),
        popularityScore,
      };
    });

    const sortedProducts = productsWithPopularity.sort(
      (a, b) => b.popularityScore - a.popularityScore
    );

    res.json(sortedProducts);
  } catch (err) {
    console.error("error from product page filter most popular", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { lowToHigh, highToLow, bestRating, mostPopular };
