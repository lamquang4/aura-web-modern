package com.aura_card.backend.mapper;

import com.aura_card.backend.dto.request.CreateCardRequest;
import com.aura_card.backend.dto.request.UpdateCardRequest;
import com.aura_card.backend.dto.response.CardDetailResponse;
import com.aura_card.backend.dto.response.CardListItemResponse;
import com.aura_card.backend.model.Card;
import org.springframework.stereotype.Component;

@Component
public class CardMapper {

    public Card toCard(CreateCardRequest request) {
        return Card.builder()
                .name(request.getName())
                .frontImage(request.getFrontImage())
                .backImage(request.getBackImage())
                .content(request.getContent())
                .status(request.getStatus())
                .build();
    }

    public void updateCard(Card card, UpdateCardRequest request) {
        card.setName(request.getName());
        card.setFrontImage(request.getFrontImage());
        card.setBackImage(request.getBackImage());
        card.setContent(request.getContent());
        card.setStatus(request.getStatus());
    }

    public CardDetailResponse toDetailResponse(Card card) {
        return CardDetailResponse.builder()
                .cardId(card.getCardId())
                .name(card.getName())
                .frontImage(card.getFrontImage())
                .backImage(card.getBackImage())
                .content(card.getContent())
                .status(card.getStatus())
                .build();
    }

    public CardListItemResponse toListItemResponse(Card card) {
        return CardListItemResponse.builder()
                .cardId(card.getCardId())
                .name(card.getName())
                .frontImage(card.getFrontImage())
                .backImage(card.getBackImage())
                .status(card.getStatus())
                .build();
    }
}
