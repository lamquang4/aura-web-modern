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
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.cardId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.cardId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Card", cardSchema);
