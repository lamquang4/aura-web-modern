package com.aura_card.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.aura_card.backend.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<User> findByFullnameContainingIgnoreCase(String fullname, Pageable pageable);

    Page<User> findByRole(String role, Pageable pageable);

    Page<User> findByStatus(String status, Pageable pageable);

    Page<User> findByRoleAndStatus(String role, String status, Pageable pageable);

    Page<User> findByFullnameContainingIgnoreCaseAndRole(String fullname, String role, Pageable pageable);

    Page<User> findByFullnameContainingIgnoreCaseAndStatus(String fullname, String status, Pageable pageable);

    Page<User> findByFullnameContainingIgnoreCaseAndRoleAndStatus(
            String fullname,
            String role,
            String status,
            Pageable pageable);
}
