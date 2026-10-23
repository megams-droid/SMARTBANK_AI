package com.smartbank.model;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Encapsulates security and banking payload events for threat analysis.
 */
public class SecurityEvent {
    private String eventId;
    private String eventType; // FRAUD, PHISHING, MALWARE, RANSOMWARE, LOGIN
    private String userId;
    private LocalDateTime timestamp;
    private Map<String, Object> metadata;

    public SecurityEvent() {
        this.timestamp = LocalDateTime.now();
        this.metadata = new HashMap<>();
    }

    public SecurityEvent(String eventId, String eventType, String userId) {
        this.eventId = eventId;
        this.eventType = eventType;
        this.userId = userId;
        this.timestamp = LocalDateTime.now();
        this.metadata = new HashMap<>();
    }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public void setTimestamp(String timestampStr) { this.timestamp = LocalDateTime.now(); }

    public Map<String, Object> getMetadata() { return metadata; }
    public void setMetadata(Map<String, Object> metadata) { this.metadata = metadata; }

    public void addMetadata(String key, Object value) {
        this.metadata.put(key, value);
    }
}
