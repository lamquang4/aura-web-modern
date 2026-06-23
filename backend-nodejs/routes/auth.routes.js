const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  validateLogin,
  validateRegister,
  validateOAuth2,
} = require("../validate/auth.validate");

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/oauth2", validateOAuth2, authController.loginOAuth2);

module.exports = router;
