package com.aura_card.backend.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.aura_card.backend.dto.request.CreateSavedCardRequest;
import com.aura_card.backend.dto.request.UpdateSavedCardRequest;
import com.aura_card.backend.dto.response.SavedCardDetailResponse;
import com.aura_card.backend.dto.response.SavedCardListItemResponse;
import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.mapper.SavedCardMapper;
import com.aura_card.backend.model.Card;
import com.aura_card.backend.model.SavedCard;
import com.aura_card.backend.repository.CardRepository;
import com.aura_card.backend.repository.SavedCardRepository;
import com.aura_card.backend.service.SavedCardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SavedCardServiceImpl implements SavedCardService {
    private final SavedCardRepository savedCardRepository;
    private final CardRepository cardRepository;
    private final SavedCardMapper savedCardMapper;

    @Override
    public SavedCardDetailResponse createSavedCard(CreateSavedCardRequest request, String userId) {
        Card card = findCard(request.getCardId());
        SavedCard savedCard = savedCardMapper.toSavedCard(request, userId);
        return savedCardMapper.toDetailResponse(savedCardRepository.save(savedCard), card);
    }

    @Override
    public SavedCardDetailResponse updateSavedCard(String savedCardId, UpdateSavedCardRequest request) {
        SavedCard savedCard = findSavedCard(savedCardId);
        Card card = findCard(request.getCardId());
        savedCardMapper.updateSavedCard(savedCard, request);
        return savedCardMapper.toDetailResponse(savedCardRepository.save(savedCard), card);
    }

    @Override
    public SavedCardDetailResponse getSavedCardById(String savedCardId) {
        SavedCard savedCard = findSavedCard(savedCardId);
        return savedCardMapper.toDetailResponse(savedCard, findCard(savedCard.getCardId()));
    }

    @Override
    public Page<SavedCardListItemResponse> getSavedCards(String userId, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        return savedCardRepository.findByUserId(userId, pageable)
                .map(savedCard -> savedCardMapper.toListItemResponse(savedCard, findCard(savedCard.getCardId())));
    }

    @Override
    public void deleteSavedCard(String savedCardId) {
        if (!savedCardRepository.existsById(savedCardId)) {
            throw new AppException(ErrorCode.SAVED_CARD_NOT_FOUND);
        }
        savedCardRepository.deleteById(savedCardId);
    }

    private Card findCard(String cardId) {
        return cardRepository.findById(cardId)
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));
    }

    private SavedCard findSavedCard(String savedCardId) {
        return savedCardRepository.findById(savedCardId)
                .orElseThrow(() -> new AppException(ErrorCode.SAVED_CARD_NOT_FOUND));
    }
}
