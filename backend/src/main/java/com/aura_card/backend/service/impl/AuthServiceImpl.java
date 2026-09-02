package com.aura_card.backend.service.impl;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.aura_card.backend.dto.request.LoginRequest;
import com.aura_card.backend.dto.request.OAuth2LoginRequest;
import com.aura_card.backend.dto.request.RegisterRequest;
import com.aura_card.backend.dto.response.LoginResponse;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.enums.AuthProvider;
import com.aura_card.backend.enums.UserRole;
import com.aura_card.backend.enums.UserStatus;
import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.mapper.UserMapper;
import com.aura_card.backend.model.User;
import com.aura_card.backend.repository.UserRepository;
import com.aura_card.backend.security.JwtUtil;
import com.aura_card.backend.service.AuthService;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RestTemplate restTemplate;

    @Override
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        User user = User.builder()
                .email(request.getEmail())
                .fullname(request.getFullname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.CUSTOMER)
                .status(UserStatus.ACTIVE)
                .provider(AuthProvider.LOCAL)
                .build();

        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new AppException(ErrorCode.INVALID_PROVIDER);
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }
        if (user.getStatus() == UserStatus.LOCKED) {
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }

        return createLoginResponse(user);
    }

    @Override
    public LoginResponse loginOAuth2(OAuth2LoginRequest request) {
        OAuth2UserInfo userInfo = getOAuth2UserInfo(request.getProvider(), request.getAccessToken());
        User user = userRepository.findByEmail(userInfo.getEmail()).orElse(null);

        if (user == null) {
            user = User.builder()
                    .email(userInfo.getEmail())
                    .fullname(userInfo.getName())
                    .password(null)
                    .role(UserRole.CUSTOMER)
                    .status(UserStatus.ACTIVE)
                    .provider(request.getProvider())
                    .providerId(userInfo.getId())
                    .build();
            user = userRepository.save(user);
        } else {
            if (user.getProvider() != request.getProvider()) {
                throw new AppException(ErrorCode.INVALID_PROVIDER);
            }
            if (user.getStatus() == UserStatus.LOCKED) {
                throw new AppException(ErrorCode.ACCOUNT_LOCKED);
            }
        }

        return createLoginResponse(user);
    }

    private LoginResponse createLoginResponse(User user) {
        String token = jwtUtil.generateToken(user.getUserId(), user.getRole().name());
        return LoginResponse.builder().token(token).role(user.getRole().name()).build();
    }

    private OAuth2UserInfo getOAuth2UserInfo(AuthProvider provider, String accessToken) {
        if (provider == AuthProvider.GOOGLE) {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    "https://www.googleapis.com/oauth2/v3/userinfo", HttpMethod.GET, entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    });
            Map<String, Object> body = response.getBody();

            return OAuth2UserInfo.builder()
                    .id((String) body.get("sub"))
                    .email((String) body.get("email"))
                    .name((String) body.get("name"))
                    .build();
        }
        throw new AppException(ErrorCode.INVALID_OAUTH2_PROVIDER);
    }

    @Data
    @Builder
    private static class OAuth2UserInfo {
        private String id;
        private String email;
        private String name;
    }
}
