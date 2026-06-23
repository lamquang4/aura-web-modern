const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  authMiddleware,
  requireAuth,
} = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../validate/user.validate");

router.get(
  "/",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  userController.getUsers,
);

router.get("/me", authMiddleware, requireAuth, userController.getAccount);

router.get(
  "/:userId",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  userController.getUserById,
);

router.post(
  "/",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  validateCreateUser,
  userController.createUser,
);

router.put(
  "/:userId",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  validateUpdateUser,
  userController.updateUser,
);

router.patch(
  "/status/:userId",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  userController.updateUserStatus,
);

router.delete(
  "/:userId",
  authMiddleware,
  requireAuth,
  roleMiddleware("ADMIN"),
  userController.deleteUser,
);

module.exports = router;
