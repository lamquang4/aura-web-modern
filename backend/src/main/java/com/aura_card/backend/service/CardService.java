package com.aura_card.backend.service;

import org.springframework.stereotype.Service;

import com.aura_card.backend.repository.CardRepository;

@Service
public class CardService {
    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
}
