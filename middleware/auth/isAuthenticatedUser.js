const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      res.status(200).json({
        success: false,
        message: "Please Login to access this resource",
      })
    );
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);
  next();
};

module.exports = isAuthenticatedUser;
