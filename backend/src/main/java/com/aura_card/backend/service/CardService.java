package com.aura_card.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.aura_card.backend.dto.request.CreateCardRequest;
import com.aura_card.backend.dto.request.UpdateCardRequest;
import com.aura_card.backend.dto.response.CardDetailResponse;
import com.aura_card.backend.dto.response.CardListItemResponse;
import com.aura_card.backend.enums.CardStatus;

public interface CardService {
    CardDetailResponse createCard(CreateCardRequest request, MultipartFile frontImage, MultipartFile backImage);

    CardDetailResponse updateCard(String cardId, UpdateCardRequest request, MultipartFile frontImage,
            MultipartFile backImage);

    CardDetailResponse getCardById(String cardId);

    Page<CardListItemResponse> getActiveCards(int page, int limit, String q);

    Page<CardListItemResponse> getAllCards(int page, int limit, String q, CardStatus status);

    CardDetailResponse updateCardStatus(String cardId);

    void deleteCard(String cardId);
}
