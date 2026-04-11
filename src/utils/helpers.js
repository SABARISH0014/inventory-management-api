const successResponse = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

module.exports = {
  successResponse,
  errorResponse,
  asyncHandler,
  generateId
};