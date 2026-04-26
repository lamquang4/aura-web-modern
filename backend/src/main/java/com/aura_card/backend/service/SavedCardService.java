package com.aura_card.backend.service;

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

@Service
public class SavedCardService {
    private final SavedCardRepository savedCardRepository;
    private final CardRepository cardRepository;
    private final SavedCardMapper savedCardMapper;

    public SavedCardService(SavedCardRepository savedCardRepository,
            CardRepository cardRepository,
            SavedCardMapper savedCardMapper) {
        this.savedCardRepository = savedCardRepository;
        this.cardRepository = cardRepository;
        this.savedCardMapper = savedCardMapper;
    }

    // Thêm thiệp lưu
    public SavedCardDetailResponse createSavedCard(CreateSavedCardRequest request, String userId) {
        Card card = cardRepository.findById(request.getCardId())
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));

        SavedCard savedCard = savedCardMapper.toSavedCard(request, userId);
        return savedCardMapper.toDetailResponse(savedCardRepository.save(savedCard), card);
    }

    // Cập nhật thiệp lưu
    public SavedCardDetailResponse updateSavedCard(String savedCardId, UpdateSavedCardRequest request) {
        SavedCard savedCard = savedCardRepository.findById(savedCardId)
                .orElseThrow(() -> new AppException(ErrorCode.SAVED_CARD_NOT_FOUND));

        Card card = cardRepository.findById(request.getCardId())
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));

        savedCardMapper.updateSavedCard(savedCard, request);
        return savedCardMapper.toDetailResponse(savedCardRepository.save(savedCard), card);
    }

    // Lấy thiệp lưu theo id
    public SavedCardDetailResponse getSavedCardById(String savedCardId) {
        SavedCard savedCard = savedCardRepository.findById(savedCardId)
                .orElseThrow(() -> new AppException(ErrorCode.SAVED_CARD_NOT_FOUND));

        Card card = cardRepository.findById(savedCard.getCardId())
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));

        return savedCardMapper.toDetailResponse(savedCard, card);
    }

    // Lấy danh sách thiệp lưu của user (phân trang, limit 12)
    public Page<SavedCardListItemResponse> getSavedCards(String userId, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());

        return savedCardRepository.findByUserId(userId, pageable)
                .map(savedCard -> {
                    Card card = cardRepository.findById(savedCard.getCardId())
                            .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));
                    return savedCardMapper.toListItemResponse(savedCard, card);
                });
    }

    // Xóa thiệp lưu theo id
    public void deleteSavedCard(String savedCardId) {
        if (!savedCardRepository.existsById(savedCardId)) {
            throw new AppException(ErrorCode.SAVED_CARD_NOT_FOUND);
        }
        savedCardRepository.deleteById(savedCardId);
    }

}
