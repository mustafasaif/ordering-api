const { ApiError } = require("../utils/apiError.js");
const httpStatus = require("http-status");

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (error.name === "SequelizeDatabaseError" && error.parent) {
    if (error.parent.code === "ER_TRUNCATED_WRONG_VALUE") {
      const statusCode = 400;
      const message = "Post Operation failed";
      const error = "Incorrect datatype provided";
      error = new ApiError(statusCode, message, error, false, err.stack);
    }
  }
  if (error.name === "SequelizeUniqueConstraintError" && error.parent) {
    if (error.parent.code === "ER_DUP_ENTRY") {
      const keyName = Object.keys(error.fields)[0];
      const statusCode = 409;
      const message = "Post Operation failed";
      const error = `This ${keyName} already exists. Please try a different ${keyName}`;
      error = new ApiError(statusCode, message, error, false, err.stack);
    }
  }
  if (error.name === "TokenExpiredError") {
    const statusCode = 401;
    const message = "Operation failed";
    const error = "Your session has expired. Please log in again.";
    error = new ApiError(statusCode, message, error, false, err.stack);
  }
  if (error.name === "JsonWebTokenError") {
    const statusCode = 401;
    const message = "Post Operation failed";
    const error = "Invalid token. Please log in again.";
    error = new ApiError(statusCode, message, error, false, err.stack);
  }
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    const error = error.error || "";
    error = new ApiError(statusCode, message, error, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const { statusCode, message, error } = err;

  const response = {
    success: false,
    statusCode,
    message,
    error,
    stack: err.stack,
  };

  res.status(statusCode).send(response);
};

module.exports = { errorConverter, errorHandler };
