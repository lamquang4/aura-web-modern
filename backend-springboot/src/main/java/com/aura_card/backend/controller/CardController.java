package com.aura_card.backend.controller;

import com.aura_card.backend.dto.request.CreateCardRequest;
import com.aura_card.backend.dto.request.UpdateCardRequest;
import com.aura_card.backend.dto.response.ApiResponse;
import com.aura_card.backend.dto.response.CardDetailResponse;
import com.aura_card.backend.dto.response.CardListItemResponse;
import com.aura_card.backend.service.CardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

        private final CardService cardService;

        // Lấy danh sách thiệp ACTIVE (limit 12, tìm theo tên)
        @GetMapping("/active")
        public ResponseEntity<ApiResponse<List<CardListItemResponse>>> getActiveCards(
                        @RequestParam(defaultValue = "1") int page,
                        @RequestParam(defaultValue = "12") int limit,
                        @RequestParam(required = false) String q) {

                Page<CardListItemResponse> data = cardService.getActiveCards(page, limit, q);

                return ResponseEntity.ok(ApiResponse.<List<CardListItemResponse>>builder()
                                .message("Lấy danh sách thiệp thành công")
                                .data(data.getContent())
                                .total(data.getTotalElements())
                                .totalPages(data.getTotalPages())
                                .build());
        }

        // Lấy tất cả thiệp
        @GetMapping
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApiResponse<List<CardListItemResponse>>> getAllCards(
                        @RequestParam(defaultValue = "1") int page,
                        @RequestParam(defaultValue = "12") int limit,
                        @RequestParam(required = false) String q,
                        @RequestParam(required = false) String status) {

                Page<CardListItemResponse> data = cardService.getAllCards(page, limit, q, status);

                return ResponseEntity.ok(ApiResponse.<List<CardListItemResponse>>builder()
                                .message("Lấy danh sách thiệp thành công")
                                .data(data.getContent())
                                .total(data.getTotalElements())
                                .totalPages(data.getTotalPages())
                                .build());
        }

        // Lấy thiệp theo id
        @GetMapping("/{cardId}")
        public ResponseEntity<ApiResponse<CardDetailResponse>> getCardById(@PathVariable String cardId) {
                return ResponseEntity.ok(ApiResponse.<CardDetailResponse>builder()
                                .message("Lấy thiệp thành công")
                                .data(cardService.getCardById(cardId))
                                .build());
        }

        // Tạo thiệp
        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApiResponse<CardDetailResponse>> createCard(
                        @RequestPart("data") @Valid CreateCardRequest request,
                        @RequestPart("frontImage") MultipartFile frontImage,
                        @RequestPart(value = "backImage", required = false) MultipartFile backImage) {

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ApiResponse.<CardDetailResponse>builder()
                                                .message("Tạo thiệp thành công")
                                                .data(cardService.createCard(request, frontImage, backImage))
                                                .build());
        }

        // Cập nhật thiệp
        @PutMapping(value = "/{cardId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApiResponse<CardDetailResponse>> updateCard(
                        @PathVariable String cardId,
                        @RequestPart("data") @Valid UpdateCardRequest request,
                        @RequestPart(value = "frontImage", required = false) MultipartFile frontImage,
                        @RequestPart(value = "backImage", required = false) MultipartFile backImage) {

                return ResponseEntity.ok(ApiResponse.<CardDetailResponse>builder()
                                .message("Cập nhật thiệp thành công")
                                .data(cardService.updateCard(cardId, request, frontImage, backImage))
                                .build());
        }

        // Cập nhật status ACTIVE <-> INACTIVE
        @PatchMapping("/status/{cardId}")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApiResponse<CardDetailResponse>> toggleStatus(@PathVariable String cardId) {
                return ResponseEntity.ok(ApiResponse.<CardDetailResponse>builder()
                                .message("Cập nhật tình trạng thành công")
                                .data(cardService.updateUserStatus(cardId))
                                .build());
        }

        // ADMIN - Xóa thiệp
        @DeleteMapping("/{cardId}")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApiResponse<Void>> deleteCard(@PathVariable String cardId) {
                cardService.deleteCard(cardId);
                return ResponseEntity.ok(ApiResponse.<Void>builder()
                                .message("Xóa thiệp thành công")
                                .build());
        }
}
