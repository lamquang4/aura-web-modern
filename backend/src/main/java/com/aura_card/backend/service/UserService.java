package com.aura_card.backend.service;

import org.springframework.data.domain.Page;

import com.aura_card.backend.dto.request.CreateUserRequest;
import com.aura_card.backend.dto.request.UpdateUserRequest;
import com.aura_card.backend.dto.response.AccountResponse;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.enums.UserRole;
import com.aura_card.backend.enums.UserStatus;

public interface UserService {
    Page<UserResponse> getUsers(int page, int limit, String q, UserRole role, UserStatus status);

    UserResponse getUserById(String userId);

    AccountResponse getAccount(String userId);

    UserResponse createUser(CreateUserRequest request);

    UserResponse updateUser(String userId, UpdateUserRequest request);

    UserResponse updateUserStatus(String userId);

    void deleteUser(String userId);
}
