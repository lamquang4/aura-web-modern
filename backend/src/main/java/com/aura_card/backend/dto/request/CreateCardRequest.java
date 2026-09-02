package com.aura_card.backend.dto.request;

import com.aura_card.backend.constant.LimitConstants;
import com.aura_card.backend.enums.CardStatus;
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
public class CreateCardRequest {
    @NotBlank(message = "Tên thiệp không để trống")
    private String name;

    @NotBlank(message = "Nội dung không để trống")
    @Size(max = LimitConstants.MAX_CONTENT_LENGTH, message = "Nội dung không được vượt quá 200 ký tự")
    private String content;

    @NotNull(message = "Tình trạng không để trống")
    private CardStatus status;
}