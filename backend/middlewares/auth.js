// Checks if user is authenticated or not

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode.id);
  next();
});

// Handle users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user);

      return next(
        new ErrorHandler(
          `Role (${roles}) is required to access this resource`,
          403
        )
      );
    }
    next();
  };
};
