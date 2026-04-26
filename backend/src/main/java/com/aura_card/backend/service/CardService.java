package com.aura_card.backend.service;

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
import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.mapper.CardMapper;
import com.aura_card.backend.model.Card;
import com.aura_card.backend.repository.CardRepository;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;
    private final CloudinaryService cloudinaryService;

    public CardService(CardRepository cardRepository,
            CardMapper cardMapper,
            CloudinaryService cloudinaryService) {
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
        this.cloudinaryService = cloudinaryService;
    }

    // Tạo thiệp
    public CardDetailResponse createCard(CreateCardRequest request,
            MultipartFile frontImage,
            MultipartFile backImage) {

        if (cardRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.CARD_NAME_ALREADY_EXISTS);
        }

        // Save trước để có cardId
        Card card = cardMapper.toCard(request);
        card.setFrontImage("");
        Card saved = cardRepository.save(card);
        String cardId = saved.getCardId();

        // Upload hình mặt trước (bắt buộc)
        saved.setFrontImage(cloudinaryService.uploadImage(frontImage, cardId, "front"));

        // Upload hình mặt sau (không bắt buộc)
        if (backImage != null && !backImage.isEmpty()) {
            saved.setBackImage(cloudinaryService.uploadImage(backImage, cardId, "back"));
        }

        return cardMapper.toDetailResponse(cardRepository.save(saved));
    }

    // Cập nhật thiệp
    public CardDetailResponse updateCard(String cardId,
            UpdateCardRequest request,
            MultipartFile frontImage,
            MultipartFile backImage) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));

        if (!request.getName().equals(card.getName()) && cardRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.CARD_NAME_ALREADY_EXISTS);
        }

        if (frontImage != null && !frontImage.isEmpty()) {
            card.setFrontImage(cloudinaryService.uploadImage(frontImage, cardId, "front"));
        }

        if (backImage != null && !backImage.isEmpty()) {
            card.setBackImage(cloudinaryService.uploadImage(backImage, cardId, "back"));
        }

        cardMapper.updateCard(card, request);
        return cardMapper.toDetailResponse(cardRepository.save(card));
    }

    // Lấy thiệp theo id
    public CardDetailResponse getCardById(String cardId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));
        return cardMapper.toDetailResponse(card);
    }

    // Lấy danh sách thiệp ACTIVE cho user (limit 12, tìm theo tên)
    public Page<CardListItemResponse> getActiveCards(int page, int limit, String q) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());

        Page<Card> cardPage;
        if (q != null && !q.isBlank()) {
            cardPage = cardRepository.findByStatusAndNameContainingIgnoreCase("ACTIVE", q, pageable);
        } else {
            cardPage = cardRepository.findByStatus("ACTIVE", pageable);
        }

        return cardPage.map(cardMapper::toListItemResponse);
    }

    // Lấy tất cả thiệp cho admin (phân trang, q, status)
    public Page<CardListItemResponse> getAllCards(int page, int limit, String q, String status) {
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

    // Cập nhật status ACTIVE <-> INACTIVE
    public CardDetailResponse updateUserStatus(String cardId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new AppException(ErrorCode.CARD_NOT_FOUND));

        if ("ACTIVE".equals(card.getStatus())) {
            card.setStatus("INACTIVE");
        } else {
            card.setStatus("ACTIVE");
        }

        return cardMapper.toDetailResponse(cardRepository.save(card));
    }

    // Xóa thiệp
    public void deleteCard(String cardId) {
        if (!cardRepository.existsById(cardId)) {
            throw new AppException(ErrorCode.CARD_NOT_FOUND);
        }
        cloudinaryService.deleteFolder(cardId);
        cardRepository.deleteById(cardId);
    }
}
