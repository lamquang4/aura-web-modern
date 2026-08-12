package com.aura_card.backend.controller;

import com.aura_card.backend.dto.request.CreateUserRequest;
import com.aura_card.backend.dto.request.UpdateUserRequest;
import com.aura_card.backend.dto.response.AccountResponse;
import com.aura_card.backend.dto.response.ApiResponse;
import com.aura_card.backend.dto.response.UserResponse;
import com.aura_card.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Lấy danh sách users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status) {

        Page<UserResponse> data = userService.getUsers(page, limit, q, role, status);

        return ResponseEntity.ok(ApiResponse.<List<UserResponse>>builder()
                .message("Lấy danh sách người dùng thành công")
                .data(data.getContent())
                .total(data.getTotalElements())
                .totalPages(data.getTotalPages())
                .build());
    }

    // Lấy user theo id
    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Lấy người dùng thành công")
                .data(userService.getUserById(userId))
                .build());
    }

    // Lấy tài khoản đang đăng nhập
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccount(
            @AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(ApiResponse.<AccountResponse>builder()
                .message("Lấy tài khoản thành công")
                .data(userService.getAccount(userId))
                .build());
    }

    // Tạo người dùng
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@RequestBody @Valid CreateUserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<UserResponse>builder()
                        .message("Tạo người dùng thành công")
                        .data(userService.createUser(request))
                        .build());
    }

    // Cập nhật người dùng
    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable String userId,
            @RequestBody @Valid UpdateUserRequest request) {
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Cập nhật người dùng thành công")
                .data(userService.updateUser(userId, request))
                .build());
    }

    // Cập nhật status ACTIVE <-> LOCKED
    @PatchMapping("/status/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> UpdateUserStatus(@PathVariable String userId) {
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Cập nhật tình trạng thành công")
                .data(userService.updateUserStatus(userId))
                .build());
    }

    // Xóa người dùng
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa người dùng thành công")
                .build());
    }
}
