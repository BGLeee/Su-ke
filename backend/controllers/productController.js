const Product = require("../models/product");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorHandler");
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

// Get single Product details => /api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
  }
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));

      // res.status(404).json({
      //   success: false,
      //   message: "Product not found",
      // });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// Update Product => /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
  }
  try {
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
  }
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await product.deleteOne({ _id: productId });

    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};
