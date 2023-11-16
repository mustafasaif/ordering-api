class ApiError extends Error {
  constructor(statusCode, message, error, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const createApiError = (statusCode, message, error) =>
  new ApiError(statusCode, message, error);

module.exports = { ApiError, createApiError };
