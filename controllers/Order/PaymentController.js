const instance = require("../../utils/RazorpayInstance");
const crypto = require("crypto");

// function for checkout razorpay
exports.checkout = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    //console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// payment verification method
exports.paymentVerification = async (req, res) => {
  
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    console.log("sig received" , razorpay_signature);
    console.log("sig generated" , expectedSignature)

    const isAuthenticated =  expectedSignature === razorpay_signature
  if (isAuthenticated) {

    // Save inside data base

    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
  }else{
    res.status(409).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

// function for key

exports.getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY });
};
