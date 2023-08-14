const mongoose = require("mongoose");
const T_Shirt = require("./T-ShirtModel");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },
  discountPrice: {
    type: Number,
    required: [true, "Discount price is required"],
    maxLength: 3,
  },
  regularPrice : {
    type: Number,
    required: [true, "Regular price is required"],
    maxLength: 3,
  },

  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },


  createdAt: {
    type: Date,
    default: Date.now,
  },
  updated_at: { type: Date, default: Date.now },
});

const Product = T_Shirt.discriminator("Product", productSchema);
module.exports = { Product };
