package com.aura_card.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aura_card.backend.model.Card;
import com.aura_card.backend.enums.CardStatus;

@Repository
public interface CardRepository extends MongoRepository<Card, String> {
    Page<Card> findByStatus(CardStatus status, Pageable pageable);

    Page<Card> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Card> findByStatusAndNameContainingIgnoreCase(CardStatus status, String name, Pageable pageable);

    Page<Card> findByNameContainingIgnoreCaseAndStatus(String name, CardStatus status, Pageable pageable);

    boolean existsByName(String name);
}
