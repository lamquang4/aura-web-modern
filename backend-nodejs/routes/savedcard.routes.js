const express = require("express");
const router = express.Router();
const savedCardController = require("../controllers/savedCard.controller");
const {
  authMiddleware,
  requireAuth,
} = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validateCreateSavedCard,
  validateUpdateSavedCard,
} = require("../validate/savedCard.validate");

router.get(
  "/",
  authMiddleware,
  requireAuth,
  roleMiddleware("CUSTOMER"),
  savedCardController.getSavedCards,
);

router.get(
  "/:savedCardId",
  authMiddleware,
  requireAuth,
  roleMiddleware("CUSTOMER"),
  savedCardController.getSavedCardById,
);

router.post(
  "/",
  authMiddleware,
  requireAuth,
  roleMiddleware("CUSTOMER"),
  validateCreateSavedCard,
  savedCardController.createSavedCard,
);

router.put(
  "/:savedCardId",
  authMiddleware,
  requireAuth,
  roleMiddleware("CUSTOMER"),
  validateUpdateSavedCard,
  savedCardController.updateSavedCard,
);

router.delete(
  "/:savedCardId",
  authMiddleware,
  requireAuth,
  roleMiddleware("CUSTOMER"),
  savedCardController.deleteSavedCard,
);

module.exports = router;
