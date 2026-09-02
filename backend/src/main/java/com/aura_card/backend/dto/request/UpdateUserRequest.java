package com.aura_card.backend.dto.request;

import com.aura_card.backend.enums.UserRole;
import com.aura_card.backend.enums.UserStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Chức vụ không để trống")
    private UserRole role;

    @NotNull(message = "Tình trạng không để trống")
    private UserStatus status;
}
