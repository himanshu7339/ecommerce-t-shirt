const Order = require("./orderModel");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "-password");
    res.status(200).json({
        success: true,
        orders: orders,
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to fetch all orders Please try again later.",
      });
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params).populate(
      "user",
      "-password"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
        success: true,
        order: order,
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to fetch order Please try again later.",
      });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {

    const { user, quantity, price, total,status } = req.body;
    const order = new Order(req.body);
    await order.save();
    res.status(200).json({
        success: true,
        order: order,
        message: "Order created successfully",
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "some error occurred",
      });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
