const cardService = require("../services/card.service");
const response = require("../utils/response.util");

// Lấy danh sách thiệp ACTIVE
const getActiveCards = async (req, res, next) => {
  try {
    const { page, limit, q } = req.query;
    const result = await cardService.getActiveCards({ page, limit, q });
    response.success(res, {
      message: "Lấy danh sách thiệp thành công",
      data: result.data,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy tất cả thiệp
const getAllCards = async (req, res, next) => {
  try {
    const { page, limit, q, status } = req.query;
    const result = await cardService.getAllCards({ page, limit, q, status });
    response.success(res, {
      message: "Lấy danh sách thiệp thành công",
      data: result.data,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy thiệp theo id
const getCardById = async (req, res, next) => {
  try {
    const data = await cardService.getCardById(req.params.cardId);
    response.success(res, { message: "Lấy thiệp thành công", data });
  } catch (error) {
    next(error);
  }
};

// Tạo thiệp
const createCard = async (req, res, next) => {
  try {
    const data = await cardService.createCard(req.body, req.files);
    response.success(res, {
      message: "Tạo thiệp thành công",
      data,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật thiệp
const updateCard = async (req, res, next) => {
  try {
    const data = await cardService.updateCard(
      req.params.cardId,
      req.body,
      req.files,
    );
    response.success(res, { message: "Cập nhật thiệp thành công", data });
  } catch (error) {
    next(error);
  }
};

// Cập nhật status ACTIVE <-> INACTIVE
const updateCardStatus = async (req, res, next) => {
  try {
    const data = await cardService.updateCardStatus(req.params.cardId);
    response.success(res, { message: "Cập nhật tình trạng thành công", data });
  } catch (error) {
    next(error);
  }
};

// Xóa thiệp
const deleteCard = async (req, res, next) => {
  try {
    await cardService.deleteCard(req.params.cardId);
    response.success(res, { message: "Xóa thiệp thành công" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActiveCards,
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  updateCardStatus,
  deleteCard,
};
