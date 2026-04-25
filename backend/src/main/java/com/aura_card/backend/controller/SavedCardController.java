package com.aura_card.backend.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura_card.backend.service.SavedCardService;

@Validated
@RestController
@RequestMapping("/api/savedcards")
public class SavedCardController {
    private final SavedCardService savedCardService;

    public SavedCardController(SavedCardService savedCardService) {
        this.savedCardService = savedCardService;
    }
}
