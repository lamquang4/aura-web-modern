package com.aura_card.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

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

    @NotBlank(message = "Chức vụ không để trống")
    private String role; // ADMIN | USER

    @NotNull(message = "Tình trạng không để trống")
    private String status; // ACTIVE | LOCKED

    @NotBlank
    private String provider;

    private String providerId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
