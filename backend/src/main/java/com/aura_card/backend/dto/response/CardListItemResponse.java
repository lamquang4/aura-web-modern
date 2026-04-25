package com.aura_card.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardListItemResponse {
    private String cardId;
    private String name;
    private String frontImage;
    private String backImage;
    private String status;
}
