package com.smartbank.model;

import java.time.LocalDateTime;

/**
 * Beneficiary Entity matching schema.sql beneficiaries table.
 */
public class Beneficiary {
    private int id;
    private int userId;
    private String beneficiaryName;
    private String accountNumber;
    private String bankName;
    private String ifscCode;
    private boolean isVerified;
    private LocalDateTime createdAt;

    public Beneficiary() {
        this.createdAt = LocalDateTime.now();
    }

    public Beneficiary(int id, int userId, String beneficiaryName, String accountNumber, String bankName, String ifscCode, boolean isVerified) {
        this.id = id;
        this.userId = userId;
        this.beneficiaryName = beneficiaryName;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.ifscCode = ifscCode;
        this.isVerified = isVerified;
        this.createdAt = LocalDateTime.now();
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getBeneficiaryName() { return beneficiaryName; }
    public void setBeneficiaryName(String beneficiaryName) { this.beneficiaryName = beneficiaryName; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
