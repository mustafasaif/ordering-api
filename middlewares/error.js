const { ApiError } = require("../utils/apiError.js");
const httpStatus = require("http-status");

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (error.name === "TokenExpiredError") {
    const statusCode = 401;
    const message = "JWT token expired. Please log in again.";
    error = new ApiError(statusCode, message, false, err.stack);
  }
  if (error.name === "JsonWebTokenError") {
    const statusCode = 401;
    const message = "Invalid token. Please log in again.";
    error = new ApiError(statusCode, message, false, err.stack);
  }
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  const response = {
    statusCode,
    message,
    stack: err.stack,
  };

  res.status(statusCode).send(response);
};

module.exports = { errorConverter, errorHandler };
