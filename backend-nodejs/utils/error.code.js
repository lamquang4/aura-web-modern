const ErrorCode = {
  // System
  INTERNAL_ERROR: { status: 500, message: "Lỗi hệ thống" },
  UNCATEGORIZED_EXCEPTION: { status: 500, message: "Lỗi chưa phân loại" },

  // Auth
  EMAIL_ALREADY_EXISTS: { status: 409, message: "Email đã tồn tại" },
  INVALID_CREDENTIALS: {
    status: 401,
    message: "Email hoặc mật khẩu không đúng",
  },
  INVALID_PROVIDER: { status: 400, message: "Email này đã có tài khoản" },
  INVALID_OAUTH2_PROVIDER: { status: 400, message: "Provider không hợp lệ" },
  ACCOUNT_LOCKED: { status: 403, message: "Tài khoản đã bị khóa" },
  UNAUTHORIZED: { status: 401, message: "Chưa đăng nhập" },
  FORBIDDEN: { status: 403, message: "Không có quyền thực hiện thao tác này" },

  // User
  USER_NOT_FOUND: { status: 404, message: "Người dùng không tồn tại" },
  GOOGLE_ACCOUNT_CANNOT_SET_PASSWORD: {
    status: 403,
    message: "Tài khoản Google không thể đặt mật khẩu",
  },
  USER_HAS_SAVED_CARD: {
    status: 400,
    message: "Người dùng đã có thiệp lưu, không thể xóa",
  },

  // Card
  CARD_NOT_FOUND: { status: 404, message: "Thiệp không tồn tại" },
  CARD_NAME_ALREADY_EXISTS: { status: 409, message: "Tên thiệp đã tồn tại" },
  CARD_IMAGE_UPLOAD_FAILED: { status: 500, message: "Upload hình thất bại" },
  INVALID_CARD_PAYLOAD: { status: 400, message: "Dữ liệu thiệp không hợp lệ" },

  // SavedCard
  SAVED_CARD_NOT_FOUND: { status: 404, message: "Thiệp lưu không tồn tại" },

  // File
  FRONT_IMAGE_REQUIRED: {
    status: 400,
    message: "Hình mặt trước không để trống",
  },
  INVALID_IMAGE_TYPE: {
    status: 400,
    message: "Định dạng ảnh không hợp lệ (chỉ jpg, png, webp)",
  },
  FILE_TOO_LARGE: { status: 400, message: "Kích thước ảnh tối đa 2MB" },
};

module.exports = ErrorCode;
