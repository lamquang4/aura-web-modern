package com.aura_card.backend.mapper;

import com.aura_card.backend.dto.request.CreateUserRequest;
import com.aura_card.backend.dto.request.UpdateUserRequest;
import com.aura_card.backend.dto.response.AccountResponse;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.model.User;
import com.aura_card.backend.enums.AuthProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toUser(CreateUserRequest request, PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(request.getEmail())
                .fullname(request.getFullname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .status(request.getStatus())
                .provider(AuthProvider.LOCAL)
                .build();
    }

    public void updateUser(User user, UpdateUserRequest request, PasswordEncoder passwordEncoder) {
        user.setFullname(request.getFullname());
        user.setRole(request.getRole());
        user.setStatus(request.getStatus());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
    }

    public UserResponse toResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullname(user.getFullname())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .provider(user.getProvider().name())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public AccountResponse toAccountResponse(User user) {
        return AccountResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullname(user.getFullname())
                .role(user.getRole().name())
                .provider(user.getProvider().name()) 
                .build();
    }
}
