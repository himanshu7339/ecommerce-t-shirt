const express = require("express");
const authorization = require("../../middleware/auth/isAuthenticatedUser");
const { createTshirtProduct,getAllProducts, updateProduct, deleteProduct, getProductById, } = require("../../controllers/Product/ProductController");
const router = express.Router();
// create product
router.route("/product/createtshirt").post(createTshirtProduct);
// Get all products
router.route("/products").get(getAllProducts);
// PUT/UPDATE an existing product and delete product
router.route("/product/:_id").put(updateProduct).delete(deleteProduct).get(getProductById);


module.exports = router;
