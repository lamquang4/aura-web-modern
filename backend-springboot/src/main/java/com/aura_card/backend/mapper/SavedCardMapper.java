package com.aura_card.backend.mapper;

import com.aura_card.backend.dto.request.CreateSavedCardRequest;
import com.aura_card.backend.dto.request.UpdateSavedCardRequest;
import com.aura_card.backend.dto.response.SavedCardDetailResponse;
import com.aura_card.backend.dto.response.SavedCardListItemResponse;
import com.aura_card.backend.model.Card;
import com.aura_card.backend.model.SavedCard;
import org.springframework.stereotype.Component;

@Component
public class SavedCardMapper {

    public SavedCard toSavedCard(CreateSavedCardRequest request, String userId) {
        return SavedCard.builder()
                .customName(request.getCustomName())
                .customContent(request.getCustomContent())
                .fontFamily(request.getFontFamily())
                .fontWeight(request.getFontWeight())
                .fontStyle(request.getFontStyle())
                .fontColor(request.getFontColor())
                .cardId(request.getCardId())
                .userId(userId)
                .build();
    }

    public void updateSavedCard(SavedCard savedCard, UpdateSavedCardRequest request) {
        savedCard.setCustomName(request.getCustomName());
        savedCard.setCustomContent(request.getCustomContent());
        savedCard.setFontFamily(request.getFontFamily());
        savedCard.setFontWeight(request.getFontWeight());
        savedCard.setFontStyle(request.getFontStyle());
        savedCard.setFontColor(request.getFontColor());
        savedCard.setCardId(request.getCardId());
    }

    public SavedCardDetailResponse toDetailResponse(SavedCard savedCard, Card card) {
        return SavedCardDetailResponse.builder()
                .savedCardId(savedCard.getSavedCardId())
                .customName(savedCard.getCustomName())
                .customContent(savedCard.getCustomContent())
                .fontFamily(savedCard.getFontFamily())
                .fontWeight(savedCard.getFontWeight())
                .fontStyle(savedCard.getFontStyle())
                .fontColor(savedCard.getFontColor())
                .card(SavedCardDetailResponse.CardSummary.builder()
                        .cardId(card.getCardId())
                        .frontImage(card.getFrontImage())
                        .backImage(card.getBackImage())
                        .build())
                .build();
    }

    public SavedCardListItemResponse toListItemResponse(SavedCard savedCard, Card card) {
        return SavedCardListItemResponse.builder()
                .savedCardId(savedCard.getSavedCardId())
                .customName(savedCard.getCustomName())
                .createdAt(savedCard.getCreatedAt())
                .card(SavedCardListItemResponse.CardSummary.builder()
                        .cardId(card.getCardId())
                        .frontImage(card.getFrontImage())
                        .backImage(card.getBackImage())
                        .build())
                .build();
    }
}
