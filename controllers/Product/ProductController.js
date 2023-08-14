const {Product} = require("../../models/Product/ProductModel")

// create new product
exports.createTshirtProduct = async (req, res) => {
  try {
    const { name, description, regularPrice,discountPrice, image, color, size, material,stock } = req.body;
    if (
      !name ||
      !description ||
      !regularPrice ||
      !discountPrice||
      !stock||
      !image ||
      !color ||
      !size ||
      !material
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const product = await Product.create({
      name: name,
      description: description,
      regularPrice: regularPrice,
      discountPrice: discountPrice,
      stock: stock,
      image: image,
      color: color,
      size: size,
      material: material,
    });
    res.status(200).json({
      success: true,
      product,
      message: "product created successfully",
    });
  } catch (error) {
    // handle errors here
    res.status(500).json({
      success: false,
      message: "some error occurred while creating product",
    });
  }
};

// .......................................................................

// GET all products

exports.getAllProducts = async (req, res) => {
  try {
    let page = Number(req.query.page)||1
    let limit = Number(req.query.limit) || 3
    let skip = (page -1 ) * limit
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occurred while fetch products",
    });
  }
};

// ..........................................................................

// GET a specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
     product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occurred while fetch product",
    });
  }
};

//   ..........................................................................

// PUT/UPDATE an existing product

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ success: true, product: product });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "some error occurred while update product",
    });
  }
};

// ............................................................................

// DELETE a product

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "some error occurred while delete product",
    });
  }
};
