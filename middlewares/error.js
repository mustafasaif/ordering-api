const { ApiError } = require("../utils/apiError.js");
const httpStatus = require("http-status");

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (error.name === "SequelizeDatabaseError" && error.parent) {
    if (error.parent.code === "ER_TRUNCATED_WRONG_VALUE") {
      const statusCode = 400;
      const message = "Incorrect datatype provided";
      error = new ApiError(statusCode, message, false, err.stack);
    }
  }
  if (error.name === "TokenExpiredError") {
    const statusCode = 401;
    const message = "Your session has expired. Please log in again.";
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
    success: false,
    statusCode,
    message,
    stack: err.stack,
  };

  res.status(statusCode).send(response);
};

module.exports = { errorConverter, errorHandler };
