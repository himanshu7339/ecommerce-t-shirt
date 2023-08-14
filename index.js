const express = require("express");
const cors = require("cors");
const mongodb = require("./config/mongodb");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 6000;
const mongoUrl = process.env.MONGODB_URL;

// For parsing application/json
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors())

//Import routes
const user = require("./routes/User/UserRoute");
const product = require("./routes/Product/ProductRoute");
const shipping = require("./routes/Order/ShippingInfoRoute")
const payment = require("./routes/Order/PaymentRoute")

// Connect MongoDb
mongodb(mongoUrl);

//application routes
app.use("/api/v1",user)
app.use("/api/v1",product)
app.use("/api/v1",shipping)
app.use("/api/v1",payment)


app.listen(port, () => {
  console.log(`Node js App http://localhost:${port}`);
});
