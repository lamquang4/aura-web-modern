package com.aura_card.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

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
@Document(collection = "saved_card")
public class SavedCard {
    @Id
    private String savedCardId;

    @NotBlank(message = "Tên thiệp không để trống")
    private String customName;

    @NotBlank(message = "Nội dung không để trống")
    private String customContent;

    private String fontFamily;

    private String fontWeight;

    private String fontStyle;

    private String fontColor;

    @NotNull
    @Indexed
    private String cardId;

    @NotNull
    @Indexed
    private String userId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
