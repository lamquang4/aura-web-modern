package com.aura_card.backend.service;

import org.springframework.stereotype.Service;

import com.aura_card.backend.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
