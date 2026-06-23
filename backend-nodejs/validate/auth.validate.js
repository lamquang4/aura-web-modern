const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email không để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("password").notEmpty().withMessage("Mật khẩu không để trống"),
  validate,
];

const validateRegister = [
  body("email")
    .notEmpty()
    .withMessage("Email không để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("fullname").notEmpty().withMessage("Họ tên không để trống"),
  body("password")
    .notEmpty()
    .withMessage("Mật khẩu không để trống")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  validate,
];

const validateOAuth2 = [
  body("accessToken").notEmpty().withMessage("Access token không để trống"),
  body("provider").notEmpty().withMessage("Provider không để trống"),
  validate,
];

module.exports = { validateLogin, validateRegister, validateOAuth2 };
