const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

const validateCreateSavedCard = [
  body("customName").notEmpty().withMessage("Tên thiệp không để trống"),
  body("customContent").notEmpty().withMessage("Nội dung không để trống"),
  body("fontFamily").notEmpty().withMessage("Font family không để trống"),
  body("fontWeight").notEmpty().withMessage("Font weight không để trống"),
  body("fontStyle").notEmpty().withMessage("Font style không để trống"),
  body("fontColor").notEmpty().withMessage("Font color không để trống"),
  body("cardId").notEmpty().withMessage("ID thiệp không để trống"),
  validate,
];

const validateUpdateSavedCard = [
  body("customName").notEmpty().withMessage("Tên thiệp không để trống"),
  body("customContent").notEmpty().withMessage("Nội dung không để trống"),
  body("fontFamily").notEmpty().withMessage("Font family không để trống"),
  body("fontWeight").notEmpty().withMessage("Font weight không để trống"),
  body("fontStyle").notEmpty().withMessage("Font style không để trống"),
  body("fontColor").notEmpty().withMessage("Font color không để trống"),
  body("cardId").notEmpty().withMessage("ID thiệp không để trống"),
  validate,
];

module.exports = { validateCreateSavedCard, validateUpdateSavedCard };
