package com.aura_card.backend.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aura_card.backend.dto.request.CreateCardRequest;
import com.aura_card.backend.dto.request.UpdateCardRequest;
import com.aura_card.backend.dto.response.CardDetailResponse;
import com.aura_card.backend.dto.response.CardListItemResponse;
import com.aura_card.backend.enums.CardStatus;
import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.mapper.CardMapper;
import com.aura_card.backend.model.Card;
import com.aura_card.backend.repository.CardRepository;
import com.aura_card.backend.service.CardService;
import com.aura_card.backend.service.CloudinaryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;
    private final CloudinaryService cloudinaryService;

    @Override
    public CardDetailResponse createCard(CreateCardRequest request, MultipartFile frontImage, MultipartFile backImage) {
        if (cardRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.CARD_NAME_ALREADY_EXISTS);
        }

        validateImage(frontImage, true);
        Card card = cardMapper.toCard(request);
        Card saved = cardRepository.save(card);
        String cardId = saved.getCardId();

        saved.setFrontImage(cloudinaryService.uploadImage(frontImage, cardId, "front"));
        if (backImage != null && !backImage.isEmpty()) {
            validateImage(backImage, false);
            saved.setBackImage(cloudinaryService.uploadImage(backImage, cardId, "back"));
        }
        return cardMapper.toDetailResponse(cardRepository.save(saved));
    }

    @Override
    public CardDetailResponse updateCard(String cardId, UpdateCardRequest request,
            MultipartFile frontImage, MultipartFile backImage) {
        Card card = findCard(cardId);
        if (!request.getName().equals(card.getName()) && cardRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.CARD_NAME_ALREADY_EXISTS);
        }

        if (frontImage != null && !frontImage.isEmpty()) {
            validateImage(frontImage, false);
            cloudinaryService.deleteImage(cardId, "front");
            card.setFrontImage(cloudinaryService.uploadImage(frontImage, cardId, "front"));
        }
        if (backImage != null && !backImage.isEmpty()) {
            validateImage(backImage, false);
            cloudinaryService.deleteImage(cardId, "back");
            card.setBackImage(cloudinaryService.uploadImage(backImage, cardId, "back"));
        }

        cardMapper.updateCard(card, request);
        return cardMapper.toDetailResponse(cardRepository.save(card));
    }

    @Override
    public CardDetailResponse getCardById(String cardId) {
        return cardMapper.toDetailResponse(findCard(cardId));
    }

    @Override
    public Page<CardListItemResponse> getActiveCards(int page, int limit, String q) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        Page<Card> cardPage = q != null && !q.isBlank()
                ? cardRepository.findByStatusAndNameContainingIgnoreCase(CardStatus.ACTIVE, q, pageable)
                : cardRepository.findByStatus(CardStatus.ACTIVE, pageable);
        return cardPage.map(cardMapper::toListItemResponse);
    }

    @Override
    public Page<CardListItemResponse> getAllCards(int page, int limit, String q, CardStatus status) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        Page<Card> cardPage;
        if (q != null && !q.isBlank() && status != null) {
            cardPage = cardRepository.findByNameContainingIgnoreCaseAndStatus(q, status, pageable);
        } else if (q != null && !q.isBlank()) {
            cardPage = cardRepository.findByNameContainingIgnoreCase(q, pageable);
        } else if (status != null) {
            cardPage = cardRepository.findByStatus(status, pageable);
        } else {
            cardPage = cardRepository.findAll(pageable);
        }
        return cardPage.map(cardMapper::toListItemResponse);
    }

    @Override
    public CardDetailResponse updateCardStatus(String cardId) {
        Card card = findCard(cardId);
        card.setStatus(card.getStatus() == CardStatus.ACTIVE ? CardStatus.INACTIVE : CardStatus.ACTIVE);
        return cardMapper.toDetailResponse(cardRepository.save(card));
    }

    @Override
    public void deleteCard(String cardId) {
        if (!cardRepository.existsById(cardId)) {
            throw new AppException(ErrorCode.CARD_NOT_FOUND);
        }
        cloudinaryService.deleteFolder(cardId);
        cardRepository.deleteById(cardId);
    }

    private Card findCard(String cardId) {
        return cardRepository.findById(cardId)
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));
    }

    private void validateImage(MultipartFile file, boolean required) {
        if (required && (file == null || file.isEmpty())) {
            throw new AppException(ErrorCode.FRONT_IMAGE_REQUIRED);
        }
        if (file == null || file.isEmpty()) {
            return;
        }

        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("image/jpeg")
                || contentType.equals("image/png") || contentType.equals("image/webp"))) {
            throw new AppException(ErrorCode.INVALID_IMAGE_TYPE);
        }
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new AppException(ErrorCode.FILE_TOO_LARGE);
        }
    }
}
