package com.smartbank.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Bank Account Entity matching schema.sql accounts table.
 */
public class Account {
    private int id;
    private int userId;
    private String accountNumber;
    private String accountType; // SAVINGS, CURRENT, FIXED_DEPOSIT
    private BigDecimal balance;
    private String currency;
    private String status; // ACTIVE, FROZEN, CLOSED
    private LocalDateTime createdAt;

    public Account() {
        this.currency = "INR";
        this.status = "ACTIVE";
        this.balance = BigDecimal.ZERO;
    }

    public Account(int id, int userId, String accountNumber, String accountType, BigDecimal balance) {
        this.id = id;
        this.userId = userId;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.currency = "INR";
        this.status = "ACTIVE";
        this.createdAt = LocalDateTime.now();
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
