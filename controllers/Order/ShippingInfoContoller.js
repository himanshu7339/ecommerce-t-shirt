const ShippingInfo = require("../../models/Order/ShippingInfoModel")


// create new shippingInfo
exports.createShippingInfoInfo = async (req, res) => {
  try {
    const { recipientName, street, city, state, country, postalCode } = req.body;
    if (
      !recipientName ||
      !street ||
      !city ||
      !state ||
      !country ||
      !postalCode
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const shippingInfo = await ShippingInfo.create({
        recipientName: recipientName,
        street: street,
        city: city,
        state: state,
        country: country,
        postalCode: postalCode,
    });
    res.status(200).json({
      success: true,
      user: shippingInfo,
      message: "ShippingInfo address created successfully",
    });
  } catch (error) {
    // handle errors here
    res.status(500).json({
      success: false,
      message: "some error occurred while creating shippingInfo address",
    });
  }
};

// .......................................................................

// GET all shippingInfo

exports.getAllShippingInfo = async (req, res) => {
  try {
    const shippingInfo = await ShippingInfo.find();
    res.status(200).json({
      success: true,
      shippingInfo: shippingInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occurred while fetch shipping addresses",
    });
  }
};

// ..........................................................................

// GET a specific shippingInfo by ID
exports.getShippingInfoById = async (req, res) => {
  try {
    const shippingInfo = await ShippingInfo.findById(req.params);
    if (!shippingInfo) {
      return res.status(404).json({
        success: false,
        message: "shipping Address not found",
      });
    }
    res.status(200).json({
      success: true,
      shippingInfo: shippingInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occurred while fetch shipping Address",
    });
  }
};

//   ..........................................................................

// PUT/UPDATE an existing shippingInfo

exports.updateShippingInfo = async (req, res) => {
  try {
    const shippingInfo = await ShippingInfo.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    if (!shippingInfo) {
      return res.status(404).json({ message: "shipping Address not found" });
    }
    res.status(200).json({ success: true, shippingInfo: shippingInfo });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "some error occurred while update shipping Address",
    });
  }
};

// ............................................................................

// DELETE a shippingInfo

exports.deleteShippingInfo = async (req, res) => {
  try {
    const shippingInfo = await ShippingInfo.findByIdAndDelete(req.params);
    if (!shippingInfo) {
      return res.status(404).json({ message: "shipping Address not found" });
    }
    res.status(200).json({ message: "shipping Address deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "some error occurred while delete shipping Address",
    });
  }
};
