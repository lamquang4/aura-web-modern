package com.aura_card.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.aura_card.backend.exception.AppException;
import com.aura_card.backend.exception.ErrorCode;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    // Upload hình vào thư mục theo cardId
    public String uploadImage(MultipartFile file, String cardId, String side) {
        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "webcard/" + cardId,
                            "public_id", side,
                            "resource_type", "image"));
            return result.get("secure_url").toString();
        } catch (IOException e) {
            throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
        }
    }

    // Xóa hình
    public void deleteImage(String cardId, String side) {
        try {
            String publicId = "webcard/" + cardId + "/" + side;
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
        }
    }

    // Xóa toàn bộ thư mục khi xóa card
    public void deleteFolder(String cardId) {
        try {
            cloudinary.uploader().destroy("webcard/" + cardId + "/front", ObjectUtils.emptyMap());
            cloudinary.uploader().destroy("webcard/" + cardId + "/back", ObjectUtils.emptyMap());
            cloudinary.api().deleteFolder("webcard/" + cardId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new AppException(ErrorCode.CARD_IMAGE_UPLOAD_FAILED);
        }
    }
}
