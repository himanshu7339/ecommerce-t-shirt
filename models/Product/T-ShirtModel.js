const mongoose = require("mongoose");
const T_ShirtSchema = new mongoose.Schema({
  color: {
    type: String,
    require: [true, "color is required"],
  },

  size: {
    type: String,
    required: [true, "size is required"],
  },

  material: {
    type: String,
    required: [true, "Material is required"],
  },

});

module.exports = mongoose.model("T_Shirt",T_ShirtSchema)
