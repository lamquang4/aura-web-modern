const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card.controller");
const {
  authMiddleware,
  requireAuth,
} = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validateCreateCard,
  validateUpdateCard,
} = require("../validate/card.validate");
const {
  uploadCardImages,
  parseJsonFormData,
  handleUploadError,
} = require("../middlewares/upload.middleware");

router.get("/active", cardController.getActiveCards);
router.get("/:cardId", cardController.getCardById);

router.get(
  "/",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  cardController.getAllCards,
);

router.post(
  "/",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  uploadCardImages,
  parseJsonFormData,
  handleUploadError,
  validateCreateCard,
  cardController.createCard,
);

router.put(
  "/:cardId",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  uploadCardImages,
  parseJsonFormData,
  handleUploadError,
  validateUpdateCard,
  cardController.updateCard,
);

router.patch(
  "/status/:cardId",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  cardController.updateCardStatus,
);

router.delete(
  "/:cardId",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  cardController.deleteCard,
);

module.exports = router;
