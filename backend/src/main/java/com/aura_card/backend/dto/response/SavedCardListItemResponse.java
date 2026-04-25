package com.aura_card.backend.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedCardListItemResponse {
    private String savedCardId;
    private String customName;
    private LocalDateTime createdAt;
    private CardSummary card;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardSummary {
        private String cardId;
        private String frontImage;
        private String backImage;
    }
}
