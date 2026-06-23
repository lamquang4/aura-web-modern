const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const SavedCard = require("../models/savedCard.model");
const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");
const config = require("../config/app.config");

// Lấy danh sách users có phân trang, tìm kiếm, filter
const getUsers = async ({ page = 1, limit = 12, q, role, status }) => {
  const skip = (page - 1) * limit;

  const filter = {};
  if (q) filter.fullname = { $regex: q, $options: "i" };
  if (role) filter.role = role;
  if (status) filter.status = status;

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  return {
    data: users,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

// Lấy user theo id
const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new AppError(ErrorCode.USER_NOT_FOUND);
  return user;
};

// Lấy tài khoản đang đăng nhập
const getAccount = async (userId) => {
  const user = await User.findById(userId).select(
    "_id email fullname role provider",
  );
  if (!user) throw new AppError(ErrorCode.USER_NOT_FOUND);
  return user;
};

// Tạo người dùng
const createUser = async ({ email, fullname, password, role, status }) => {
  const existed = await User.findOne({ email });
  if (existed) throw new AppError(ErrorCode.EMAIL_ALREADY_EXISTS);

  const hashed = await bcrypt.hash(password, config.bcryptSaltRounds);

  const user = await User.create({
    email,
    fullname,
    password: hashed,
    role,
    status,
    provider: "LOCAL",
  });

  const { password: _, ...result } = user.toObject();
  return result;
};

// Cập nhật người dùng
const updateUser = async (userId, { fullname, password, role, status }) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(ErrorCode.USER_NOT_FOUND);

  if (user.provider === "GOOGLE" && password && password.trim()) {
    throw new AppError(ErrorCode.GOOGLE_ACCOUNT_CANNOT_SET_PASSWORD);
  }

  user.fullname = fullname;
  user.role = role;
  user.status = status;

  if (password && password.trim()) {
    user.password = await bcrypt.hash(password, config.bcryptSaltRounds);
  }

  await user.save();

  const { password: _, ...result } = user.toObject();
  return result;
};

// Cập nhật status
const updateUserStatus = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(ErrorCode.USER_NOT_FOUND);

  user.status = user.status === "ACTIVE" ? "LOCKED" : "ACTIVE";
  await user.save();

  const { password: _, ...result } = user.toObject();
  return result;
};

// Xóa người dùng
const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(ErrorCode.USER_NOT_FOUND);

  // nếu là CUSTOMER → kiểm tra có thiệp lưu không
  if (user.role === "CUSTOMER") {
    const hasSavedCard = await SavedCard.exists({ userId });
    if (hasSavedCard) throw new AppError(ErrorCode.USER_HAS_SAVED_CARD);
  }

  await user.deleteOne();
};

module.exports = {
  getUsers,
  getUserById,
  getAccount,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
};
