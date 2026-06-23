const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Họ tên không để trống"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },
    password: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: Number,
    },
    role: {
      type: String, // ADMIN | USER
      required: [true, "Chức vụ không để trống"],
    },
    status: {
      type: String, // ACTIVE | LOCKED
      required: [true, "Tình trạng không để trống"],
    },
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "users",
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.userId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.userId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("User", userSchema);
