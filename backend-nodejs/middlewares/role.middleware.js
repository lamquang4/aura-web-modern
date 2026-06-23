const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(ErrorCode.FORBIDDEN));
    }
    next();
  };
};

module.exports = roleMiddleware;
