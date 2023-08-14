const Razorpay = require('razorpay');
process.env.RAZORPAY_KEY
// Razorpay Integrate
 const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
  
},);


module.exports = instance;