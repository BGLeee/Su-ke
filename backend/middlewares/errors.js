const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV == "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV == "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((el) => el.message)
        .join(",");
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    //Handling wrong jwt error
    if (err.name === "JsonWebTokenError") {
      const message = "Your token is invalid, please log in again";
      error = new ErrorHandler(message, 401);
    }
    //Handling expired jwt error
    if (err.name === "TokenExpiredError") {
      const message = "Your token is expired, please log in again";
      error = new ErrorHandler(message, 401);
    }

    // Remove sensitive info from error
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
