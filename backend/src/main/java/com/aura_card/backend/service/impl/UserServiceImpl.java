package com.aura_card.backend.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aura_card.backend.dto.request.CreateUserRequest;
import com.aura_card.backend.dto.request.UpdateUserRequest;
import com.aura_card.backend.dto.response.AccountResponse;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.enums.AuthProvider;
import com.aura_card.backend.enums.UserRole;
import com.aura_card.backend.enums.UserStatus;
import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.mapper.UserMapper;
import com.aura_card.backend.model.User;
import com.aura_card.backend.repository.SavedCardRepository;
import com.aura_card.backend.repository.UserRepository;
import com.aura_card.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final SavedCardRepository savedCardRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Page<UserResponse> getUsers(int page, int limit, String q, UserRole role, UserStatus status) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        Page<User> userPage;

        if (q != null && !q.isBlank() && role != null && status != null) {
            userPage = userRepository.findByFullnameContainingIgnoreCaseAndRoleAndStatus(q, role, status, pageable);
        } else if (q != null && !q.isBlank() && role != null) {
            userPage = userRepository.findByFullnameContainingIgnoreCaseAndRole(q, role, pageable);
        } else if (q != null && !q.isBlank() && status != null) {
            userPage = userRepository.findByFullnameContainingIgnoreCaseAndStatus(q, status, pageable);
        } else if (role != null && status != null) {
            userPage = userRepository.findByRoleAndStatus(role, status, pageable);
        } else if (q != null && !q.isBlank()) {
            userPage = userRepository.findByFullnameContainingIgnoreCase(q, pageable);
        } else if (role != null) {
            userPage = userRepository.findByRole(role, pageable);
        } else if (status != null) {
            userPage = userRepository.findByStatus(status, pageable);
        } else {
            userPage = userRepository.findAll(pageable);
        }
        return userPage.map(userMapper::toResponse);
    }

    @Override
    public UserResponse getUserById(String userId) {
        return userMapper.toResponse(findUser(userId));
    }

    @Override
    public AccountResponse getAccount(String userId) {
        return userMapper.toAccountResponse(findUser(userId));
    }

    @Override
    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        User user = userMapper.toUser(request, passwordEncoder);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse updateUser(String userId, UpdateUserRequest request) {
        User user = findUser(userId);
        if (user.getProvider() == AuthProvider.GOOGLE && request.getPassword() != null
                && !request.getPassword().isBlank()) {
            throw new AppException(ErrorCode.GOOGLE_ACCOUNT_CANNOT_SET_PASSWORD);
        }
        userMapper.updateUser(user, request, passwordEncoder);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse updateUserStatus(String userId) {
        User user = findUser(userId);
        user.setStatus(user.getStatus() == UserStatus.ACTIVE ? UserStatus.LOCKED : UserStatus.ACTIVE);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public void deleteUser(String userId) {
        User user = findUser(userId);
        if (user.getRole() == UserRole.CUSTOMER && savedCardRepository.existsByUserId(userId)) {
            throw new AppException(ErrorCode.USER_HAS_SAVED_CARD);
        }
        userRepository.deleteById(userId);
    }

    private User findUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
}
