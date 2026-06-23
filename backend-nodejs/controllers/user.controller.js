const userService = require("../services/user.service");
const response = require("../utils/response.util");

// Lấy danh sách users
const getUsers = async (req, res, next) => {
  try {
    const { page, limit, q, role, status } = req.query;
    const result = await userService.getUsers({ page, limit, q, role, status });
    response.success(res, {
      message: "Lấy danh sách người dùng thành công",
      data: result.data,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy user theo id
const getUserById = async (req, res, next) => {
  try {
    const data = await userService.getUserById(req.params.userId);
    response.success(res, { message: "Lấy người dùng thành công", data });
  } catch (error) {
    next(error);
  }
};

// Lấy tài khoản đang đăng nhập
const getAccount = async (req, res, next) => {
  try {
    const data = await userService.getAccount(req.user.id);
    response.success(res, { message: "Lấy tài khoản thành công", data });
  } catch (error) {
    next(error);
  }
};

// Tạo người dùng
const createUser = async (req, res, next) => {
  try {
    const data = await userService.createUser(req.body);
    response.success(res, {
      message: "Tạo người dùng thành công",
      data,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật người dùng
const updateUser = async (req, res, next) => {
  try {
    const data = await userService.updateUser(req.params.userId, req.body);
    response.success(res, { message: "Cập nhật người dùng thành công", data });
  } catch (error) {
    next(error);
  }
};

// Cập nhật status
const updateUserStatus = async (req, res, next) => {
  try {
    const data = await userService.updateUserStatus(req.params.userId);
    response.success(res, { message: "Cập nhật tình trạng thành công", data });
  } catch (error) {
    next(error);
  }
};

// Xóa người dùng
const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.userId);
    response.success(res, { message: "Xóa người dùng thành công" });
  } catch (error) {
    next(error);
  }
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
