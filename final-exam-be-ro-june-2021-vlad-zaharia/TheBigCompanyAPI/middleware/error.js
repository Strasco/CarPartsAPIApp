const ErrorResponse = require("../utils/errorResponse");
const logger = require("../utils/logger");

//err is what we get from the controller
const errorHandler = (err, req, res, next) => {
  var error = { ...err }; //I use this error variable to more use the err object more easily
  error.message = err.message;
  //Cast Object ID error
  if (err.name === "CastError") {
    const message = `Invalid ID ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value";
    error = new ErrorResponse(message, 400);
  }
  //mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  logger.error(err.name + " " + err.message);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
