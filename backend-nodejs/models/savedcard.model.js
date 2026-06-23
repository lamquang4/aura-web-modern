const mongoose = require("mongoose");
const { Schema } = mongoose;

const savedCardSchema = new Schema(
  {
    customName: {
      type: String,
      required: [true, "Tên thiệp không để trống"],
    },
    customContent: {
      type: String,
      required: [true, "Nội dung không để trống"],
    },
    fontFamily: { type: String },
    fontWeight: { type: String },
    fontStyle: { type: String },
    fontColor: { type: String },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "saved_cards",
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.savedCardId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.savedCardId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("SavedCard", savedCardSchema);
