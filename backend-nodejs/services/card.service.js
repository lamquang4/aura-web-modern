const Card = require("../models/card.model");
const SavedCard = require("../models/savedCard.model");
const cloudinaryService = require("./cloudinary.service");
const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");
const mongoose = require("mongoose");

const createCard = async ({ name, content, status }, files) => {
  const existed = await Card.findOne({ name });
  if (existed) throw new AppError(ErrorCode.CARD_NAME_ALREADY_EXISTS);

  const frontFile = files?.frontImage?.[0];
  const backFile = files?.backImage?.[0];

  if (!frontFile) throw new AppError(ErrorCode.FRONT_IMAGE_REQUIRED);

  const cardId = new mongoose.Types.ObjectId();

  const frontImage = await cloudinaryService.uploadImage(
    frontFile.buffer,
    cardId.toString(),
    "front",
  );

  let backImage;
  if (backFile) {
    backImage = await cloudinaryService.uploadImage(
      backFile.buffer,
      cardId.toString(),
      "back",
    );
  }

  const card = await Card.create({
    _id: cardId,
    name,
    content,
    status,
    frontImage,
    backImage,
  });

  return card;
};

const updateCard = async (cardId, { name, content, status }, files) => {
  const card = await Card.findById(cardId);
  if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);

  if (name !== card.name) {
    const existed = await Card.findOne({ name });
    if (existed) throw new AppError(ErrorCode.CARD_NAME_ALREADY_EXISTS);
  }

  const frontFile = files?.frontImage?.[0];
  const backFile = files?.backImage?.[0];

  if (frontFile) {
    await cloudinaryService.deleteImage(cardId, "front");
    card.frontImage = await cloudinaryService.uploadImage(
      frontFile.buffer,
      cardId,
      "front",
    );
  }

  if (backFile) {
    await cloudinaryService.deleteImage(cardId, "back");
    card.backImage = await cloudinaryService.uploadImage(
      backFile.buffer,
      cardId,
      "back",
    );
  }

  card.name = name;
  card.content = content;
  card.status = status;

  await card.save();
  return card;
};

// Lấy thiệp theo id
const getCardById = async (cardId) => {
  const card = await Card.findById(cardId);
  if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);
  return card;
};

// Lấy danh sách thiệp
const getActiveCards = async ({ page = 1, limit = 12, q }) => {
  const skip = (page - 1) * limit;

  const filter = { status: "ACTIVE" };
  if (q) filter.name = { $regex: q, $options: "i" };

  const [data, total] = await Promise.all([
    Card.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Card.countDocuments(filter),
  ]);

  return { data, total, totalPages: Math.ceil(total / limit) };
};

// Lấy tất cả thiệp
const getAllCards = async ({ page = 1, limit = 12, q, status }) => {
  const skip = (page - 1) * limit;

  const filter = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (status) filter.status = status;

  const [data, total] = await Promise.all([
    Card.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Card.countDocuments(filter),
  ]);

  return { data, total, totalPages: Math.ceil(total / limit) };
};

// Cập nhật status ACTIVE <-> INACTIVE
const updateCardStatus = async (cardId) => {
  const card = await Card.findById(cardId);
  if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);

  card.status = card.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  await card.save();
  return card;
};

// Xóa thiệp
const deleteCard = async (cardId) => {
  const card = await Card.findById(cardId);
  if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);

  await cloudinaryService.deleteFolder(cardId);
  await card.deleteOne();
};

module.exports = {
  createCard,
  updateCard,
  getCardById,
  getActiveCards,
  getAllCards,
  updateCardStatus,
  deleteCard,
};
