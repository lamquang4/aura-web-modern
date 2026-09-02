package com.aura_card.backend.dto.request;

import com.aura_card.backend.enums.UserRole;
import com.aura_card.backend.enums.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {
    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không để trống")
    private String email;

    @NotBlank(message = "Họ tên không để trống")
    private String fullname;

    @NotBlank(message = "Mật khẩu không để trống")
    @Size(min = 6, message = "Mật khẩu tối thiểu 6 ký tự")
    private String password;

    @NotNull(message = "Role không để trống")
    private UserRole role;

    @NotNull(message = "Tình trạng không để trống")
    private UserStatus status;
}
