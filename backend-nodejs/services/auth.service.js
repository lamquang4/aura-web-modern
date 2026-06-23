const bcrypt = require("bcrypt");
const axios = require("axios");
const User = require("../models/user.model");
const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");
const jwtUtil = require("../utils/jwt.util");
const config = require("../config/app.config");

// Đăng ký thủ công
const register = async ({ fullname, email, password }) => {
  const existed = await User.findOne({ email });
  if (existed) throw new AppError(ErrorCode.EMAIL_ALREADY_EXISTS);

  const hashed = await bcrypt.hash(password, config.bcryptSaltRounds);

  const user = await User.create({
    fullname,
    email,
    password: hashed,
    role: "CUSTOMER",
    status: "ACTIVE",
    provider: "LOCAL",
  });

  const { password: _, ...result } = user.toObject();
  return result;
};

// Đăng nhập thủ công
const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(ErrorCode.USER_NOT_FOUND);

  // kiểm tra provider
  if (user.provider !== "LOCAL") throw new AppError(ErrorCode.INVALID_PROVIDER);

  // kiểm tra password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError(ErrorCode.INVALID_CREDENTIALS);

  // kiểm tra status
  if (user.status === "LOCKED") throw new AppError(ErrorCode.ACCOUNT_LOCKED);

  const token = jwtUtil.generateToken(user._id, user.role);
  return { token, role: user.role };
};

// Đăng nhập Google
const loginOAuth2 = async ({ provider, accessToken }) => {
  const userInfo = await getOAuth2UserInfo(provider, accessToken);

  let user = await User.findOne({ email: userInfo.email });

  if (!user) {
    // chưa có tài khoản thì tạo mới
    user = await User.create({
      fullname: userInfo.name,
      email: userInfo.email,
      password: null,
      role: "CUSTOMER",
      status: "ACTIVE",
      provider: provider.toUpperCase(),
      providerId: userInfo.id,
    });
  } else {
    // đã có tài khoản
    if (user.provider.toUpperCase() !== provider.toUpperCase()) {
      throw new AppError(ErrorCode.INVALID_PROVIDER);
    }

    if (user.status === "LOCKED") throw new AppError(ErrorCode.ACCOUNT_LOCKED);
  }

  const token = jwtUtil.generateToken(user._id, user.role);
  return { token, role: user.role };
};

// Lấy thông tin user từ Google
const getOAuth2UserInfo = async (provider, accessToken) => {
  if (provider.toUpperCase() === "GOOGLE") {
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return { id: data.sub, email: data.email, name: data.name };
  }

  throw new AppError(ErrorCode.INVALID_OAUTH2_PROVIDER);
};

module.exports = { register, login, loginOAuth2 };
