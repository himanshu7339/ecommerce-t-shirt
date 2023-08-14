const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },

  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
    maxLength: 10,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);