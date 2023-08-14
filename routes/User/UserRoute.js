const express = require('express');
const { getAllUsers, getSingleUser, updateUserDetails, deleteUser, userlogin, registerUser, logoutUser,  } = require('../../controllers/User/UserController');
const authorization = require('../../middleware/auth/isAuthenticatedUser');
const router = express.Router();

router.route("/user/register").post(registerUser)
router.route("/user/login").post(userlogin)
router.route("/user/logout").get(logoutUser)
router.route("/users").get(getAllUsers)
router.route("/user/:_id").get(getSingleUser).put(updateUserDetails).delete(deleteUser)


module.exports = router;