const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Register a user  => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "samples/man-portrait",
      url: "https://res.cloudinary.com/dinhqiven/image/upload/v1730726824/samples/man-portrait.jpg",
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
});
