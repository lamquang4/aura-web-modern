const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

const validateCreateUser = [
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
  body("role")
    .notEmpty()
    .withMessage("Role không để trống")
    .matches(/^(CUSTOMER|ADMIN)$/)
    .withMessage("Role không hợp lệ"),
  body("status")
    .notEmpty()
    .withMessage("Tình trạng không để trống")
    .matches(/^(ACTIVE|LOCKED)$/)
    .withMessage("Tình trạng không hợp lệ"),
  validate,
];

const validateUpdateUser = [
  body("fullname").notEmpty().withMessage("Họ tên không để trống"),
  body("role")
    .notEmpty()
    .withMessage("Chức vụ không để trống")
    .matches(/^(CUSTOMER|ADMIN)$/)
    .withMessage("Chức vụ không hợp lệ"),
  body("status")
    .notEmpty()
    .withMessage("Tình trạng không để trống")
    .matches(/^(ACTIVE|LOCKED)$/)
    .withMessage("Tình trạng không hợp lệ"),
  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  validate,
];

module.exports = { validateCreateUser, validateUpdateUser };
