package com.aura_card.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aura_card.backend.model.SavedCard;

@Repository
public interface SavedCardRepository extends MongoRepository<SavedCard, String> {

}
