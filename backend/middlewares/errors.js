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

    // Remove sensitive info from error
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
