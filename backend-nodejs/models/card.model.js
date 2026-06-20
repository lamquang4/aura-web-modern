const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Nội dung không để trống"],
      maxlength: [200, "Nội dung không được vượt quá 200 ký tự"],
    },
    frontImage: {
      type: String,
      required: [true, "Hình mặt trước không để trống"],
    },
    backImage: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Tên thiệp không để trống"],
      index: true,
    },
    status: {
      type: String, // ACTIVE | INACTIVE
      required: [true, "Tình trạng không để trống"],
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "cards",
  },
);

module.exports = mongoose.model("Card", cardSchema);
