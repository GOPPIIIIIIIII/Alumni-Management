package com.examly.springapp.service;

import com.examly.springapp.dto.AuthResponse;
import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.dto.RegisterRequest;
import com.examly.springapp.exception.DuplicateAlumniException;
import com.examly.springapp.exception.InvalidNameException;
import com.examly.springapp.exception.InvalidRoleException;
import com.examly.springapp.exception.InvalidPhoneException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public AuthResponse register(RegisterRequest request) {
        validateName(request.getName());
        validatePhone(request.getPhoneNumber());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateAlumniException("This email is already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        User.Role role;
        try {
            role = User.Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidRoleException("Invalid role. Valid roles: ADMIN, ALUMNI, MENTOR, CHAPTER_LEAD, ALUMNI_RELATIONS_OFFICE, GUEST");
        }
        user.setRole(role);
        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name(), user.getName(), user.getId());
        return new AuthResponse(user.getId(), token, user.getRole().name(), user.getName(), user.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials. Please check your email and password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials. Please check your email and password.");
        }

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name(), user.getName(), user.getId());
        return new AuthResponse(user.getId(), token, user.getRole().name(), user.getName(), user.getEmail());
    }

    private void validateName(String name) {
        if (name == null || !name.matches("[a-zA-Z ]{2,100}")) {
            throw new InvalidNameException("Name must not contain numbers or special characters");
        }
    }

    private void validatePhone(String phone) {
        if (phone == null || !phone.matches("\\d{10}")) {
            throw new InvalidPhoneException("Phone Number must be exactly 10 digits long");
        }
    }
}
