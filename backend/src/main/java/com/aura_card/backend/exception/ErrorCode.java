package com.aura_card.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // System
    INTERNAL_ERROR("Lỗi hệ thống", HttpStatus.INTERNAL_SERVER_ERROR),
    UNCATEGORIZED_EXCEPTION("Lỗi chưa phân loại", HttpStatus.INTERNAL_SERVER_ERROR),

    // Auth
    EMAIL_ALREADY_EXISTS("Email đã tồn tại", HttpStatus.CONFLICT),
    INVALID_CREDENTIALS("Email hoặc mật khẩu không đúng", HttpStatus.UNAUTHORIZED),
    INVALID_PROVIDER("Tài khoản này đăng nhập bằng phương thức khác", HttpStatus.BAD_REQUEST),
    INVALID_OAUTH2_PROVIDER("Provider không hợp lệ", HttpStatus.BAD_REQUEST),
    ACCOUNT_LOCKED("Tài khoản đã bị khóa", HttpStatus.FORBIDDEN),
    UNAUTHORIZED("Chưa đăng nhập", HttpStatus.UNAUTHORIZED),
    FORBIDDEN("Không có quyền thực hiện thao tác này", HttpStatus.FORBIDDEN),

    // User
    USER_NOT_FOUND("Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    GOOGLE_ACCOUNT_CANNOT_SET_PASSWORD("Tài khoản Google không thể đặt mật khẩu", HttpStatus.FORBIDDEN),
    USER_HAS_SAVED_CARD("Người dùng đã có thiệp lưu, không thể xóa", HttpStatus.BAD_REQUEST),

    // Card
    CARD_NOT_FOUND("Thiệp không tồn tại", HttpStatus.NOT_FOUND),
    CARD_NAME_ALREADY_EXISTS("Tên thiệp đã tồn tại", HttpStatus.CONFLICT),
    CARD_IMAGE_UPLOAD_FAILED("Upload hình thất bại", HttpStatus.INTERNAL_SERVER_ERROR),

    // SavedCard
    SAVED_CARD_NOT_FOUND("Thiệp lưu không tồn tại", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus statusCode;

    ErrorCode(String message, HttpStatus statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
