package com.aura_card.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    String uploadImage(MultipartFile file, String cardId, String side);

    void deleteImage(String cardId, String side);

    void deleteFolder(String cardId);
}
