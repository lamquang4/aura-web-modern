package com.aura_card.backend.service;

import org.springframework.stereotype.Service;

import com.aura_card.backend.repository.SavedCardRepository;

@Service
public class SavedCardService {
    private final SavedCardRepository savedCardRepository;

    public SavedCardService(SavedCardRepository savedCardRepository) {
        this.savedCardRepository = savedCardRepository;
    }
}
