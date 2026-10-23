package com.smartbank.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Bank Transaction Entity matching schema.sql transactions table.
 */
public class Transaction {
    private int id;
    private int accountId;
    private String transactionType; // DEPOSIT, WITHDRAWAL, TRANSFER, PAYMENT
    private BigDecimal amount;
    private String merchant;
    private String category;
    private String recipientAccount;
    private String status; // COMPLETED, PENDING, REJECTED, FLAG_HIGH_RISK
    private int riskScore;
    private String deviceFingerprint;
    private String ipAddress;
    private LocalDateTime createdAt;

    public Transaction() {
        this.status = "COMPLETED";
        this.createdAt = LocalDateTime.now();
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getAccountId() { return accountId; }
    public void setAccountId(int accountId) { this.accountId = accountId; }

    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getRecipientAccount() { return recipientAccount; }
    public void setRecipientAccount(String recipientAccount) { this.recipientAccount = recipientAccount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getDeviceFingerprint() { return deviceFingerprint; }
    public void setDeviceFingerprint(String deviceFingerprint) { this.deviceFingerprint = deviceFingerprint; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
