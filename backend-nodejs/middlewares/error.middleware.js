const response = require("../utils/response.util");

const errorMiddleware = (err, req, res, next) => {
  console.error(
    `[${new Date().toISOString()}] ${err.status || 500} - ${err.message}`,
  );

  const status = err.status || 500;
  const message = err.message || "Lỗi hệ thống";

  response.error(res, { status, message, path: req.originalUrl });
};

module.exports = errorMiddleware;
