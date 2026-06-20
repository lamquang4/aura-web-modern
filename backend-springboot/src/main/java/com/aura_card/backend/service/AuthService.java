package com.aura_card.backend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.aura_card.backend.dto.request.LoginRequest;
import com.aura_card.backend.dto.request.OAuth2LoginRequest;
import com.aura_card.backend.dto.request.RegisterRequest;
import com.aura_card.backend.dto.response.LoginResponse;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.mapper.UserMapper;
import com.aura_card.backend.model.User;
import com.aura_card.backend.repository.UserRepository;
import com.aura_card.backend.security.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;

import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Đăng ký thủ công
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        User user = User.builder()
                .email(request.getEmail())
                .fullname(request.getFullname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("CUSTOMER")
                .status("ACTIVE")
                .provider("LOCAL")
                .build();

        return userMapper.toResponse(userRepository.save(user));
    }

    // Đăng nhập thủ công
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Kiểm tra provider
        if (!"LOCAL".equals(user.getProvider())) {
            throw new AppException(ErrorCode.INVALID_PROVIDER);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        if ("LOCKED".equals(user.getStatus())) {
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }

        String token = jwtUtil.generateToken(user.getUserId(), user.getRole());
        return LoginResponse.builder()
                .token(token)
                .role(user.getRole())
                .build();
    }

    // Đăng nhập Google
    public LoginResponse loginOAuth2(OAuth2LoginRequest request) {
        // Lấy thông tin user từ provider
        OAuth2UserInfo userInfo = getOAuth2UserInfo(request.getProvider(), request.getAccessToken());

        // Tìm user theo email
        User user = userRepository.findByEmail(userInfo.getEmail())
                .orElse(null);

        if (user == null) {
            // Chưa có tài khoản → tạo mới
            user = User.builder()
                    .email(userInfo.getEmail())
                    .fullname(userInfo.getName())
                    .password(null)
                    .role("CUSTOMER")
                    .status("ACTIVE")
                    .provider(request.getProvider().toUpperCase())
                    .providerId(userInfo.getId())
                    .build();
            user = userRepository.save(user);
        } else {
            // Đã có tài khoản → kiểm tra provider
            if (!user.getProvider().equalsIgnoreCase(request.getProvider())) {
                throw new AppException(ErrorCode.INVALID_PROVIDER);
            }

            // Kiểm tra status
            if ("LOCKED".equals(user.getStatus())) {
                throw new AppException(ErrorCode.ACCOUNT_LOCKED);
            }
        }

        String token = jwtUtil.generateToken(user.getUserId(), user.getRole());
        return LoginResponse.builder()
                .token(token)
                .role(user.getRole())
                .build();
    }

    private OAuth2UserInfo getOAuth2UserInfo(String provider, String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        if ("GOOGLE".equalsIgnoreCase(provider)) {
            String url = "https://www.googleapis.com/oauth2/v3/userinfo";
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            Map<?, ?> body = response.getBody();

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
