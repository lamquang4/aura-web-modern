const multer = require("multer");
const response = require("../utils/response.util");
const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");

const errorMiddleware = (err, req, res, next) => {
  // Multer errors
  if (err instanceof multer.MulterError) {
    let ec = ErrorCode.CARD_IMAGE_UPLOAD_FAILED;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        ec = ErrorCode.FILE_TOO_LARGE;
        break;

      case "LIMIT_UNEXPECTED_FILE":
        ec = ErrorCode.INVALID_IMAGE_TYPE;
        break;
    }

    return response.error(res, {
      status: ec.status,
      message: ec.message,
      path: req.originalUrl,
    });
  }

  // Lỗi app
  if (err instanceof AppError) {
    const status = err.status || 500;
    const message = err.message || "Lỗi hệ thống";
    return response.error(res, { status, message, path: req.originalUrl });
  }

  const status = err.status || 500;
  const message = err.message || "Lỗi hệ thống";

  response.error(res, { status, message, path: req.originalUrl });
};

module.exports = errorMiddleware;
