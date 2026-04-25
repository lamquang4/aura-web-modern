package com.aura_card.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedCardDetailResponse {
    private String savedCardId;
    private String customName;
    private String customContent;
    private String fontFamily;
    private String fontWeight;
    private String fontStyle;
    private String fontColor;
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