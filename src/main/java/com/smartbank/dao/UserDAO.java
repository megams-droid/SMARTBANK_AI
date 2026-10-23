package com.smartbank.dao;

import com.smartbank.model.User;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object for User Entity using JDBC PreparedStatements.
 * Guarantees SQL Injection prevention.
 */
public class UserDAO {

    public void insertUser(User user) throws SQLException {
        String sql = "INSERT INTO users (username, email, password_hash, full_name, role, status) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPasswordHash());
            stmt.setString(4, user.getFullName());
            stmt.setString(5, user.getRole());
            stmt.setString(6, user.getStatus());
            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    user.setId(rs.getInt(1));
                }
            }
        }
    }

    public User findByUsername(String username) throws SQLException {
        String sql = "SELECT * FROM users WHERE username = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    User user = new User();
                    user.setId(rs.getInt("id"));
                    user.setUsername(rs.getString("username"));
                    user.setEmail(rs.getString("email"));
                    user.setPasswordHash(rs.getString("password_hash"));
                    user.setFullName(rs.getString("full_name"));
                    user.setRole(rs.getString("role"));
                    user.setStatus(rs.getString("status"));
                    return user;
                }
            }
        }
        return null;
    }
}
