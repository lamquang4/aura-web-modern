const SavedCard = require("../models/savedCard.model");
const Card = require("../models/card.model");
const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");

// Thêm thiệp lưu
const createSavedCard = async (
  {
    customName,
    customContent,
    fontFamily,
    fontWeight,
    fontStyle,
    fontColor,
    cardId,
  },
  userId,
) => {
  // kiểm tra card có tồn tại không
  const card = await Card.findById(cardId);
  if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);

  const savedCard = await SavedCard.create({
    customName,
    customContent,
    fontFamily,
    fontWeight,
    fontStyle,
    fontColor,
    cardId,
    userId,
  });

  return formatDetailResponse(savedCard, card);
};

// Cập nhật thiệp lưu
const updateSavedCard = async (
  savedCardId,
  {
    customName,
    customContent,
    fontFamily,
    fontWeight,
    fontStyle,
    fontColor,
    cardId,
  },
) => {
  const savedCard = await SavedCard.findById(savedCardId);
  if (!savedCard) throw new AppError(ErrorCode.SAVED_CARD_NOT_FOUND);

  const card = await Card.findById(cardId);
  if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);

  savedCard.customName = customName;
  savedCard.customContent = customContent;
  savedCard.fontFamily = fontFamily;
  savedCard.fontWeight = fontWeight;
  savedCard.fontStyle = fontStyle;
  savedCard.fontColor = fontColor;
  savedCard.cardId = cardId;

  await savedCard.save();
  return formatDetailResponse(savedCard, card);
};

// Lấy thiệp lưu theo id
const getSavedCardById = async (savedCardId) => {
  const savedCard = await SavedCard.findById(savedCardId);
  if (!savedCard) throw new AppError(ErrorCode.SAVED_CARD_NOT_FOUND);

  const card = await Card.findById(savedCard.cardId);
  if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);

  return formatDetailResponse(savedCard, card);
};

// Lấy danh sách thiệp lưu của user
const getSavedCards = async (userId, { page = 1, limit = 6 }) => {
  const skip = (page - 1) * limit;

  const [savedCards, total] = await Promise.all([
    SavedCard.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    SavedCard.countDocuments({ userId }),
  ]);

  // lấy card cho từng savedCard
  const data = await Promise.all(
    savedCards.map(async (savedCard) => {
      const card = await Card.findById(savedCard.cardId);
      if (!card) throw new AppError(ErrorCode.CARD_NOT_FOUND);
      return formatListItemResponse(savedCard, card);
    }),
  );

  return { data, total, totalPages: Math.ceil(total / limit) };
};

// Xóa thiệp lưu
const deleteSavedCard = async (savedCardId) => {
  const savedCard = await SavedCard.findById(savedCardId);
  if (!savedCard) throw new AppError(ErrorCode.SAVED_CARD_NOT_FOUND);
  await savedCard.deleteOne();
};

const formatDetailResponse = (savedCard, card) => ({
  savedCardId: savedCard._id,
  customName: savedCard.customName,
  customContent: savedCard.customContent,
  fontFamily: savedCard.fontFamily,
  fontWeight: savedCard.fontWeight,
  fontStyle: savedCard.fontStyle,
  fontColor: savedCard.fontColor,
  createdAt: savedCard.createdAt,
  updatedAt: savedCard.updatedAt,
  card: {
    cardId: card._id,
    frontImage: card.frontImage,
    backImage: card.backImage,
  },
});

const formatListItemResponse = (savedCard, card) => ({
  savedCardId: savedCard._id,
  customName: savedCard.customName,
  createdAt: savedCard.createdAt,
  card: {
    cardId: card._id,
    frontImage: card.frontImage,
    backImage: card.backImage,
  },
});

module.exports = {
  createSavedCard,
  updateSavedCard,
  getSavedCardById,
  getSavedCards,
  deleteSavedCard,
};
