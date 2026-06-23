const authService = require("../services/auth.service");
const response = require("../utils/response.util");

// Đăng ký
const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    response.success(res, { message: "Đăng ký thành công", data, status: 201 });
  } catch (error) {
    next(error);
  }
};

// Đăng nhập thủ công
const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    response.success(res, { message: "Đăng nhập thành công", data });
  } catch (error) {
    next(error);
  }
};

// Đăng nhập Google
const loginOAuth2 = async (req, res, next) => {
  try {
    const data = await authService.loginOAuth2(req.body);
    response.success(res, { message: "Đăng nhập thành công", data });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, loginOAuth2 };
