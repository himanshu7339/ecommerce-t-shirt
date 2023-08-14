const User = require("../../models/User/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
// Create a new user

exports.registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, password, email } = req.body;
    if (!name || !phoneNumber || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Your email address is already in use",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
    });
    res.status(200).json({
      success: true,
      user: user,
      message: "User created successfully",
    });
  } catch (error) {
    // handle errors here
    console.error(error);
    res.status(500).json({
      success: false,
      message: "some error occurred",
    });
  }
};

// .................................................................

//login user

exports.userlogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(409).json({
        success: false,
        message: "All fields are required",
      });
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ email, password }, jwtSecretKey);
    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while login Please try again later.",
    });
  }
};


// ........................................................................

//logout user

exports.logoutUser = async (req, res) => {
  try {

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    // handle errors here
    res.status(500).json({
      success: false,
      message: "face some error while logging out",
    });
  }
};

// ........................................................................



//Get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    // handle errors here
    res.status(500).json({
      success: false,
      message: "Failed to fetch all users Please try again later.",
    });
  }
};

// ...................................................................

// Get single user details

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user Please try again later.",
    });
  }
};

// .......................................................................

// Update user details

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.params;
    const updateUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updateUser)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    res.status(200).json({
      success: true,
      updateUser: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details Please try again later.",
    });
  }
};

// ...........................................................................

// Delete a user

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Couldn't delete user Please try again later.",
    });
  }
};
