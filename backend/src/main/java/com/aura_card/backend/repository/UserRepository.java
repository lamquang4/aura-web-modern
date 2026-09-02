package com.aura_card.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.aura_card.backend.model.User;
import com.aura_card.backend.enums.UserRole;
import com.aura_card.backend.enums.UserStatus;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<User> findByFullnameContainingIgnoreCase(String fullname, Pageable pageable);

    Page<User> findByRole(UserRole role, Pageable pageable);

    Page<User> findByStatus(UserStatus status, Pageable pageable);

    Page<User> findByRoleAndStatus(UserRole role, UserStatus status, Pageable pageable);

    Page<User> findByFullnameContainingIgnoreCaseAndRole(String fullname, UserRole role, Pageable pageable);

    Page<User> findByFullnameContainingIgnoreCaseAndStatus(String fullname, UserStatus status, Pageable pageable);

    Page<User> findByFullnameContainingIgnoreCaseAndRoleAndStatus(
            String fullname,
            UserRole role,
            UserStatus status,
            Pageable pageable);
}
