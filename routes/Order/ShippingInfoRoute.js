const express = require("express");
const authorization = require("../../middleware/auth/isAuthenticatedUser");
const { createShippingInfoInfo, getAllShippingInfo, updateShippingInfo, deleteShippingInfo, getShippingInfoById } = require("../../controllers/Order/ShippingInfoContoller");
const router = express.Router();
// create Shipping
router.route("/shipping/create").post(createShippingInfoInfo);
// Get all Shippings
router.route("/shippings").get(getAllShippingInfo);
// PUT/UPDATE an existing Shipping and delete Shipping
router.route("/shipping/:_id").put(updateShippingInfo).delete(deleteShippingInfo).get(getShippingInfoById);


module.exports = router;
