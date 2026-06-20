package com.aura_card.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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

    @NotBlank(message = "Role không để trống")
    @Pattern(regexp = "CUSTOMER|ADMIN", message = "Role không hợp lệ")
    private String role;

    @NotBlank(message = "Tình trạng không để trống")
    @Pattern(regexp = "ACTIVE|LOCKED", message = "Tình trạng không hợp lệ")
    private String status;
}
