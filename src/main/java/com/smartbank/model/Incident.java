package com.smartbank.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Unified Security Incident Entity matching schema.sql incidents table.
 */
public class Incident {
    private String incidentId;
    private String userId;
    private String title;
    private String severity; // LOW, MEDIUM, HIGH, CRITICAL
    private int confidenceScore;
    private String status; // OPEN_INVESTIGATION, CONTAINED, RESOLVED, FALSE_POSITIVE
    private List<String> timeline;
    private String rootCauseAnalysis;
    private String recommendedAction;
    private LocalDateTime createdAt;

    public Incident() {
        this.timeline = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
    }

    public String getIncidentId() { return incidentId; }
    public void setIncidentId(String incidentId) { this.incidentId = incidentId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public int getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(int confidenceScore) { this.confidenceScore = confidenceScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<String> getTimeline() { return timeline; }
    public void setTimeline(List<String> timeline) { this.timeline = timeline; }

    public String getRootCauseAnalysis() { return rootCauseAnalysis; }
    public void setRootCauseAnalysis(String rootCauseAnalysis) { this.rootCauseAnalysis = rootCauseAnalysis; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
