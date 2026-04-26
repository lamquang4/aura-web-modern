package com.aura_card.backend.controller;

import com.aura_card.backend.dto.request.CreateSavedCardRequest;
import com.aura_card.backend.dto.request.UpdateSavedCardRequest;
import com.aura_card.backend.dto.response.ApiResponse;
import com.aura_card.backend.dto.response.SavedCardDetailResponse;
import com.aura_card.backend.dto.response.SavedCardListItemResponse;
import com.aura_card.backend.service.SavedCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-cards")
@RequiredArgsConstructor
public class SavedCardController {

    private final SavedCardService savedCardService;

    // Lấy danh sách thiệp lưu của user
    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<List<SavedCardListItemResponse>>> getSavedCards(
            @AuthenticationPrincipal String userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int limit) {

        Page<SavedCardListItemResponse> data = savedCardService.getSavedCards(userId, page, limit);

        return ResponseEntity.ok(ApiResponse.<List<SavedCardListItemResponse>>builder()
                .message("Lấy danh sách thiệp lưu thành công")
                .data(data.getContent())
                .total(data.getTotalElements())
                .totalPages(data.getTotalPages())
                .build());
    }

    // Lấy thiệp lưu theo id
    @GetMapping("/{savedCardId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<SavedCardDetailResponse>> getSavedCardById(
            @PathVariable String savedCardId) {

        return ResponseEntity.ok(ApiResponse.<SavedCardDetailResponse>builder()
                .message("Lấy thiệp lưu thành công")
                .data(savedCardService.getSavedCardById(savedCardId))
                .build());
    }

    // Thêm thiệp lưu
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<SavedCardDetailResponse>> createSavedCard(
            @AuthenticationPrincipal String userId,
            @RequestBody @Valid CreateSavedCardRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<SavedCardDetailResponse>builder()
                        .message("Lưu thiệp thành công")
                        .data(savedCardService.createSavedCard(request, userId))
                        .build());
    }

    // Cập nhật thiệp lưu
    @PutMapping("/{savedCardId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<SavedCardDetailResponse>> updateSavedCard(
            @PathVariable String savedCardId,
            @RequestBody @Valid UpdateSavedCardRequest request) {

        return ResponseEntity.ok(ApiResponse.<SavedCardDetailResponse>builder()
                .message("Cập nhật thiệp lưu thành công")
                .data(savedCardService.updateSavedCard(savedCardId, request))
                .build());
    }

    // Xóa thiệp lưu
    @DeleteMapping("/{savedCardId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<Void>> deleteSavedCard(@PathVariable String savedCardId) {
        savedCardService.deleteSavedCard(savedCardId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa thiệp lưu thành công")
                .build());
    }
}
