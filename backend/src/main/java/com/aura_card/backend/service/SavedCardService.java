package com.aura_card.backend.service;

import org.springframework.data.domain.Page;

import com.aura_card.backend.dto.request.CreateSavedCardRequest;
import com.aura_card.backend.dto.request.UpdateSavedCardRequest;
import com.aura_card.backend.dto.response.SavedCardDetailResponse;
import com.aura_card.backend.dto.response.SavedCardListItemResponse;

public interface SavedCardService {
    SavedCardDetailResponse createSavedCard(CreateSavedCardRequest request, String userId);

    SavedCardDetailResponse updateSavedCard(String savedCardId, UpdateSavedCardRequest request);

    SavedCardDetailResponse getSavedCardById(String savedCardId);

    Page<SavedCardListItemResponse> getSavedCards(String userId, int page, int limit);

    void deleteSavedCard(String savedCardId);
}
