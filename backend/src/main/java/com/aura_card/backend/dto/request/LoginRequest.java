package com.aura_card.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không để trống")
    private String email;

    @NotBlank(message = "Mật khẩu không để trống")
    private String password;
}
