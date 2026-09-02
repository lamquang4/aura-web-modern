package com.aura_card.backend.service.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.aura_card.backend.service.CloudinaryService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {
    private static final String CLOUDINARY_ROOT = "webcard";

    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile file, String cardId, String side) {
        try {
            return uploadBuffer(file.getBytes(), cardFolder(cardId), side, "image");
        } catch (IOException e) {
            throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
        }
    }

    @Override
    public void deleteImage(String cardId, String side) {
        deleteCloudinaryFile(cardImagePublicId(cardId, side), "image");
    }

    @Override
    public void deleteFolder(String cardId) {
        deleteImage(cardId, "front");
        deleteImage(cardId, "back");

        try {
            cloudinary.api().deleteFolder(cardFolder(cardId), ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
        }
    }

    private String uploadBuffer(byte[] buffer, String folder, String publicId, String resourceType) {
        try {
            Map<?, ?> result = cloudinary.uploader().upload(buffer, ObjectUtils.asMap(
                    "folder", folder,
                    "public_id", publicId,
                    "resource_type", resourceType,
                    "overwrite", true));
            Object secureUrl = result.get("secure_url");
            if (secureUrl == null) {
                throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
            }
            return secureUrl.toString();
        } catch (IOException e) {
            throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
        }
    }

    private void deleteCloudinaryFile(String publicId, String resourceType) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", resourceType));
        } catch (IOException e) {
            throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
        }
    }

    private String cardFolder(String cardId) {
        return CLOUDINARY_ROOT + "/" + cardId;
    }

    private String cardImagePublicId(String cardId, String side) {
        return cardFolder(cardId) + "/" + side;
    }
}
