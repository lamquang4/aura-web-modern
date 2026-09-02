package com.aura_card.backend.dto.request;

import com.aura_card.backend.enums.AuthProvider;
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
public class OAuth2LoginRequest {
    @NotBlank
    private String accessToken;

    @NotNull
    private AuthProvider provider;
}
