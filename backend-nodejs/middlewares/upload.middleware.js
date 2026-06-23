const multer = require("multer");
const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");

const storage = multer.memoryStorage();

// kiểm tra mimetype
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "data") {
    return cb(null, true);
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(ErrorCode.INVALID_IMAGE_TYPE), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadCardImages = upload.fields([
  { name: "frontImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
  { name: "data", maxCount: 1 },
]);

const uploadSingle = (fieldName) => upload.single(fieldName);

const parseJsonFormData = (req, res, next) => {
  let rawData = req.body?.data;

  if (!rawData && req.files?.data?.[0]) {
    rawData = req.files.data[0].buffer.toString("utf-8");
  }

  if (!rawData) return next();

  if (typeof rawData === "string") {
    try {
      const parsed = JSON.parse(rawData);
      if (parsed && typeof parsed === "object") {
        req.body = { ...req.body, ...parsed };
      }
    } catch (error) {
      return next(new AppError(ErrorCode.INVALID_CARD_PAYLOAD));
    }
  } else if (typeof rawData === "object") {
    req.body = { ...req.body, ...rawData };
  }

  delete req.body.data;
  return next();
};

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("MULTER ERROR CODE:", err.code, err.field);
    if (err.code === "LIMIT_FILE_SIZE") {
      return next(new AppError(ErrorCode.FILE_TOO_LARGE));
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return next(new AppError(ErrorCode.INVALID_IMAGE_TYPE));
    }
    return next(new AppError(ErrorCode.CARD_IMAGE_UPLOAD_FAILED));
  }
  next(err);
};

module.exports = {
  uploadSingle,
  uploadCardImages,
  parseJsonFormData,
  handleUploadError,
};
