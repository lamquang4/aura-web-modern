package com.aura_card.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.aura_card.backend.model.User;
import com.aura_card.backend.dto.request.CreateUserRequest;
import com.aura_card.backend.dto.request.UpdateUserRequest;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.dto.response.AccountResponse;
import com.aura_card.backend.mapper.UserMapper;
import com.aura_card.backend.repository.SavedCardRepository;
import com.aura_card.backend.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SavedCardRepository savedCardRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, SavedCardRepository savedCardRepository,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.savedCardRepository = savedCardRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // Lấy danh sách users có phân trang, tìm kiếm, filter
    public Page<UserResponse> getUsers(int page, int limit, String q, String role, String status) {
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

    // Lấy user theo id
    public UserResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toResponse(user);
    }

    // Lấy tài khoản đang đăng nhập
    public AccountResponse getAccount(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return userMapper.toAccountResponse(user);
    }

    // Tạo người dùng
    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        User user = userMapper.toUser(request, passwordEncoder);
        return userMapper.toResponse(userRepository.save(user));
    }

    // Cập nhật người dùng
    public UserResponse updateUser(String userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if ("GOOGLE".equals(user.getProvider())
                && request.getPassword() != null
                && !request.getPassword().isBlank()) {

            throw new AppException(ErrorCode.GOOGLE_ACCOUNT_CANNOT_SET_PASSWORD);
        }

        userMapper.updateUser(user, request, passwordEncoder);
        return userMapper.toResponse(userRepository.save(user));
    }

    // Cập nhật status ACTIVE <-> LOCKED
    public UserResponse updateUserStatus(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if ("ACTIVE".equals(user.getStatus())) {
            user.setStatus("LOCKED");
        } else {
            user.setStatus("ACTIVE");
        }

        return userMapper.toResponse(userRepository.save(user));
    }

    // Xóa người dùng
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if ("CUSTOMER".equals(user.getRole())) {
            boolean hasSavedCard = savedCardRepository.existsByUserId(userId);

            if (hasSavedCard) {
                throw new AppException(ErrorCode.USER_HAS_SAVED_CARD);
            }
        }

        userRepository.deleteById(userId);
    }
}
