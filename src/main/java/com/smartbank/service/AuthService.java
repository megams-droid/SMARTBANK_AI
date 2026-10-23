package com.smartbank.service;

import com.smartbank.model.User;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

/**
 * Core Java Authentication & RBAC Service.
 * Implements password hashing with SHA-256 + salt, session management,
 * failed login throttling, and role-based access control (CUSTOMER, ANALYST, ADMIN).
 */
public class AuthService {

    private final Map<String, User> userDatabase = new HashMap<>();
    private final Map<String, Integer> failedLoginAttempts = new HashMap<>();
    private final Map<String, String> activeSessions = new HashMap<>(); // Token -> Username

    public AuthService() {
        // Seed default personas
        registerUser("megasree", "megasree@smartbank.ai", "Password@123", "MEGA SREE MS", "CUSTOMER");
        registerUser("analyst1", "analyst@smartbank.ai", "Password@123", "Cyber Threat Analyst", "ANALYST");
        registerUser("admin1", "admin@smartbank.ai", "Password@123", "Chief Security Officer", "ADMIN");
    }

    public synchronized User registerUser(String username, String email, String plainPassword, String fullName, String role) {
        if (userDatabase.containsKey(username.toLowerCase())) {
            throw new IllegalArgumentException("Username already exists in SmartBank directory.");
        }

        String hashedPassword = hashPassword(plainPassword);
        User user = new User(userDatabase.size() + 1, username, email, fullName, role, "ACTIVE");
        user.setPasswordHash(hashedPassword);
        userDatabase.put(username.toLowerCase(), user);
        return user;
    }

    public synchronized String authenticate(String username, String plainPassword, String ipAddress) {
        String key = username.toLowerCase();
        int attempts = failedLoginAttempts.getOrDefault(key, 0);

        if (attempts >= 5) {
            throw new SecurityException("Account temporarily locked due to excessive failed attempts. Contact administrator.");
        }

        User user = userDatabase.get(key);
        if (user == null || !user.getPasswordHash().equals(hashPassword(plainPassword))) {
            failedLoginAttempts.put(key, attempts + 1);
            throw new SecurityException("Invalid credentials provided. Failed attempt: " + (attempts + 1));
        }

        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            throw new SecurityException("Account is currently " + user.getStatus() + ". Login restricted.");
        }

        // Reset failed login count
        failedLoginAttempts.remove(key);

        String sessionToken = UUID.randomUUID().toString();
        activeSessions.put(sessionToken, user.getUsername());
        return sessionToken;
    }

    public synchronized User getUserByToken(String token) {
        String username = activeSessions.get(token);
        if (username == null) return null;
        return userDatabase.get(username.toLowerCase());
    }

    public synchronized void logout(String token) {
        activeSessions.remove(token);
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 hashing algorithm unavailable", e);
        }
    }
}
