const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

const validateCreateCard = [
  body("name").notEmpty().withMessage("Tên thiệp không để trống"),
  body("content").notEmpty().withMessage("Nội dung không để trống"),
  body("status")
    .notEmpty()
    .withMessage("Tình trạng không để trống")
    .matches(/^(ACTIVE|INACTIVE)$/)
    .withMessage("Tình trạng không hợp lệ"),
  validate,
];

const validateUpdateCard = [
  body("name").notEmpty().withMessage("Tên card không để trống"),
  body("content").notEmpty().withMessage("Nội dung không để trống"),
  body("status")
    .notEmpty()
    .withMessage("Tình trạng không để trống")
    .matches(/^(ACTIVE|INACTIVE)$/)
    .withMessage("Tình trạng không hợp lệ"),
  validate,
];

module.exports = { validateCreateCard, validateUpdateCard };
