package com.aura_card.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura_card.backend.dto.request.LoginRequest;
import com.aura_card.backend.dto.request.OAuth2LoginRequest;
import com.aura_card.backend.dto.request.RegisterRequest;
import com.aura_card.backend.dto.response.LoginResponse;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.service.AuthService;
import com.aura_card.backend.dto.response.ApiResponse;

import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Đăng ký
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<UserResponse>builder()
                        .message("Đăng ký thành công")
                        .data(authService.register(request))
                        .build());
    }

    // Đăng nhập thủ công
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.<LoginResponse>builder()
                .message("Đăng nhập thành công")
                .data(authService.login(request))
                .build());
    }

    // Đăng nhập Google / Facebook
    @PostMapping("/oauth2")
    public ResponseEntity<ApiResponse<LoginResponse>> loginOAuth2(@RequestBody @Valid OAuth2LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.<LoginResponse>builder()
                .message("Đăng nhập thành công")
                .data(authService.loginOAuth2(request))
                .build());
    }
}
