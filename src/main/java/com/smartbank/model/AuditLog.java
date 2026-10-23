package com.smartbank.model;

import java.time.LocalDateTime;

/**
 * Immutable Cryptographically Hash-Sealed Audit Log Entity matching schema.sql audit_logs table.
 */
public class AuditLog {
    private int id;
    private int userId;
    private String action;
    private String entity;
    private String entityId;
    private String details;
    private String ipAddress;
    private String hashSignature;
    private LocalDateTime timestamp;

    public AuditLog() {
        this.timestamp = LocalDateTime.now();
    }

    public AuditLog(int id, int userId, String action, String entity, String entityId, String details, String ipAddress, String hashSignature) {
        this.id = id;
        this.userId = userId;
        this.action = action;
        this.entity = entity;
        this.entityId = entityId;
        this.details = details;
        this.ipAddress = ipAddress;
        this.hashSignature = hashSignature;
        this.timestamp = LocalDateTime.now();
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getEntity() { return entity; }
    public void setEntity(String entity) { this.entity = entity; }

    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getHashSignature() { return hashSignature; }
    public void setHashSignature(String hashSignature) { this.hashSignature = hashSignature; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
