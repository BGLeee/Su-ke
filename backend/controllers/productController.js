const Product = require("../models/product");

// Create new product => /api/v1/product/new
try {
  exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  };
} catch (error) {
  console.error("Error creating product:", error);
  res.status(500).json({
    success: false,
    message: "Failed to create product",
    error: error.message,
  });
}

//Get all Products => /api/v1/products

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};
