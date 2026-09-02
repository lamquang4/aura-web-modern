package com.aura_card.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.aura_card.backend.enums.AuthProvider;
import com.aura_card.backend.enums.UserRole;
import com.aura_card.backend.enums.UserStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String userId;

    @NotBlank(message = "Họ tên không để trống")
    private String fullname;

    @Email(message = "Email không hợp lệ")
    @Indexed(unique = true)
    private String email;

    private String password;

    private LocalDate birthDate;

    private Integer gender;

    @NotNull(message = "Chức vụ không để trống")
    private UserRole role; // ADMIN | USER

    @NotNull(message = "Tình trạng không để trống")
    private UserStatus status; // ACTIVE | LOCKED

    @NotNull(message = "Provider không để trống")
    private AuthProvider provider;

    private String providerId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
