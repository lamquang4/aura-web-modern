package com.aura_card.backend.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserRequest {
    @NotBlank(message = "Họ tên không để trống")
    private String fullname;

    private String password; // mật khẩu mới

    @NotBlank(message = "Chức vụ không để trống")
    @Pattern(regexp = "CUSTOMER|ADMIN", message = "Chức vụ không hợp lệ")
    private String role;

    @NotBlank(message = "Tình trạng không để trống")
    @Pattern(regexp = "ACTIVE|LOCKED", message = "Tình trạng không hợp lệ")
    private String status;
}
