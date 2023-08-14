const express = require("express");
const authorization = require("../../middleware/auth/isAuthenticatedUser");
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../../controllers/Category/CategoryController");
const router = express.Router();
// create product
router.route("/product/createtshirt").post(createCategory);
// Get all products
router.route("/products").get(showAllCategories);
// PUT/UPDATE an existing product and delete product
router
  .route("/product/:_id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(categoryPageDetails);

module.exports = router;
