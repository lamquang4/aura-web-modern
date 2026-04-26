package com.aura_card.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "cards")
public class Card {
    @Id
    private String cardId;

    @NotBlank(message = "Nội dung không để trống")
    private String content;

    @NotBlank(message = "Nội dung không để trống")
    @Size(max = 200, message = "Nội dung không được vượt quá 200 ký tự")
    private String frontImage;

    private String backImage;

    @NotBlank(message = "Tên thiệp không để trống")
    @Indexed
    private String name;

    @NotNull(message = "Tình trạng không để trống")
    @Indexed
    private String status; // ACTIVE | INACTIVE

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
