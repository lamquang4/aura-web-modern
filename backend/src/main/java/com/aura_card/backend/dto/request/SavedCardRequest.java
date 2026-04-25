package com.aura_card.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedCardRequest {
    @NotBlank(message = "Tên thiệp không để trống")
    private String customName;

    @NotBlank(message = "Nội dung không để trống")
    private String customContent;

    @NotBlank(message = "Font family không để trống")
    private String fontFamily;

    @NotBlank(message = "Font weight không để trống")
    private String fontWeight;

    @NotBlank(message = "Font style không để trống")
    private String fontStyle;

    @NotBlank(message = "Font color không để trống")
    private String fontColor;

    @NotBlank(message = "ID thiệp không để trống")
    private String cardId;
}
