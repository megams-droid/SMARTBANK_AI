package com.smartbank.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Logger;

/**
 * JDBC Database Connection Manager.
 * Demonstrates JDBC PreparedStatement connection handling and ACID compliance.
 */
public class DatabaseConnection {

    private static final Logger LOGGER = Logger.getLogger(DatabaseConnection.class.getName());
    private static final String DB_URL = "jdbc:sqlite:database/smartbank_ai.db";

    public static Connection getConnection() throws SQLException {
        try {
            return DriverManager.getConnection(DB_URL);
        } catch (SQLException e) {
            LOGGER.warning("Embedded SQLite driver connection: " + e.getMessage());
            throw e;
        }
    }
}
