package com.smartbank.model;

import java.time.LocalDateTime;

/**
 * Security & Financial Alert Entity matching schema.sql alerts table.
 */
public class Alert {
    private String id;
    private int userId;
    private String title;
    private String category; // FRAUD, PHISHING, MALWARE, RANSOMWARE, BUDGET, VELOCITY
    private String severity; // LOW, MEDIUM, HIGH, CRITICAL
    private int riskScore;
    private String message;
    private String status; // ACTIVE, ACKNOWLEDGED, RESOLVED, DISMISSED
    private String recommendation;
    private LocalDateTime timestamp;

    public Alert() {
        this.status = "ACTIVE";
        this.timestamp = LocalDateTime.now();
    }

    public Alert(String id, String title, String category, String severity, int riskScore, String message, String recommendation) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.severity = severity;
        this.riskScore = riskScore;
        this.message = message;
        this.status = "ACTIVE";
        this.recommendation = recommendation;
        this.timestamp = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
