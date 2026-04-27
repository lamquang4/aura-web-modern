package com.aura_card.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
    private String content;

    @NotBlank(message = "Tình trạng không để trống")
    @Pattern(regexp = "ACTIVE|INACTIVE", message = "Tình trạng không hợp lệ")
    private String status;
}