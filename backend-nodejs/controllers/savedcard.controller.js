const savedCardService = require("../services/savedCard.service");
const response = require("../utils/response.util");

// Lấy danh sách thiệp lưu
const getSavedCards = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await savedCardService.getSavedCards(req.user.id, {
      page,
      limit,
    });
    response.success(res, {
      message: "Lấy danh sách thiệp lưu thành công",
      data: result.data,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy thiệp lưu theo id
const getSavedCardById = async (req, res, next) => {
  try {
    const data = await savedCardService.getSavedCardById(
      req.params.savedCardId,
    );
    response.success(res, { message: "Lấy thiệp lưu thành công", data });
  } catch (error) {
    next(error);
  }
};

// Thêm thiệp lưu
const createSavedCard = async (req, res, next) => {
  try {
    const data = await savedCardService.createSavedCard(req.body, req.user.id);
    response.success(res, {
      message: "Lưu thiệp thành công",
      data,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật thiệp lưu
const updateSavedCard = async (req, res, next) => {
  try {
    const data = await savedCardService.updateSavedCard(
      req.params.savedCardId,
      req.body,
    );
    response.success(res, { message: "Cập nhật thiệp lưu thành công", data });
  } catch (error) {
    next(error);
  }
};

// Xóa thiệp lưu
const deleteSavedCard = async (req, res, next) => {
  try {
    await savedCardService.deleteSavedCard(req.params.savedCardId);
    response.success(res, { message: "Xóa thiệp lưu thành công" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSavedCards,
  getSavedCardById,
  createSavedCard,
  updateSavedCard,
  deleteSavedCard,
};
