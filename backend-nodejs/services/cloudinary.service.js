const cloudinary = require("../config/cloudinary.config");
const AppError = require("../utils/app.error");
const ErrorCode = require("../utils/error.code");

// Upload hình vào thư mục
const uploadImage = (fileBuffer, cardId, side) => {
  return new Promise((resolve, reject) => {
   const stream =  cloudinary.uploader.upload_stream(
      {
        folder: `webcard/${cardId}`, 
        public_id: side, 
        resource_type: "image",
      },
      (error, result) => {
        if (error)
          return reject(new AppError(ErrorCode.CARD_IMAGE_UPLOAD_FAILED));
        resolve(result.secure_url);
      },
    );
    stream.end(fileBuffer);
  });
};

// Xóa hình
const deleteImage = async (cardId, side) => {
  try {
    const publicId = `webcard/${cardId}/${side}`; 
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new AppError(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
  }
};

// Xóa toàn bộ thư mục khi xóa card
const deleteFolder = async (cardId) => {
  try {
    await cloudinary.uploader.destroy(`webcard/${cardId}/front`);
    await cloudinary.uploader.destroy(`webcard/${cardId}/back`);

    await cloudinary.api.delete_folder(`webcard/${cardId}`);
  } catch (error) {
    throw new AppError(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
  }
};

module.exports = { uploadImage, deleteImage, deleteFolder };
