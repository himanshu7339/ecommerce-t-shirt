const express = require("express");
const authorization = require("../../middleware/auth/isAuthenticatedUser");
const { createOrder, getAllOrders, updateOrder, deleteOrder } = require("../../controllers/Order/OrderController");
const { getProductById } = require("../../controllers/Product/ProductController");
const router = express.Router();
// create product
router.route("/product/create").post(createOrder);
// Get all products
router.route("/products").get(getAllOrders);
// PUT/UPDATE an existing product and delete product
router.route("/product/:_id").put(updateOrder).delete(deleteOrder).get(getProductById);


module.exports = router;
