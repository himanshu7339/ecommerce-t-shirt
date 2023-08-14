const express = require("express");
const { checkout, paymentVerification, getKey } = require("../../controllers/Order/PaymentController");

const router = express.Router();

router.route("/checkout").post(checkout)
router.route("/paymentverification").post(paymentVerification)
router.route("/getkey").get(getKey)


module.exports = router;
