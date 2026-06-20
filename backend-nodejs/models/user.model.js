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
  },
);

module.exports = mongoose.model("User", userSchema);
