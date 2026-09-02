package com.aura_card.backend.service;

import com.aura_card.backend.dto.request.LoginRequest;
import com.aura_card.backend.dto.request.OAuth2LoginRequest;
import com.aura_card.backend.dto.request.RegisterRequest;
import com.aura_card.backend.dto.response.LoginResponse;
import com.aura_card.backend.dto.response.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    LoginResponse loginOAuth2(OAuth2LoginRequest request);
}
