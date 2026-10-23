package com.smartbank.service;

import com.smartbank.model.Account;
import com.smartbank.model.Transaction;
import com.smartbank.security.FraudDetector;
import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Core Java Banking Service.
 * Manages accounts, balances, and atomic financial transfers with
 * inline Explainable AI fraud and risk inspection.
 */
public class BankingService {

    private final Map<Integer, Account> accounts = new HashMap<>();
    private final List<Transaction> transactionLedger = new ArrayList<>();
    private final FraudDetector fraudDetector = new FraudDetector();

    public BankingService() {
        // Seed default accounts
        accounts.put(1, new Account(1, 1, "SB-3091-8842-10", "SAVINGS", new BigDecimal("50000.00")));
        accounts.put(2, new Account(2, 1, "CA-9041-7711-05", "CURRENT", new BigDecimal("25000.00")));
        accounts.put(3, new Account(3, 1, "FD-1088-3329-88", "FIXED_DEPOSIT", new BigDecimal("100000.00")));
    }

    public synchronized Account getAccountById(int accountId) {
        return accounts.get(accountId);
    }

    public synchronized List<Account> getAllAccounts() {
        return new ArrayList<>(accounts.values());
    }

    public synchronized List<Transaction> getTransactions() {
        return new ArrayList<>(transactionLedger);
    }

    /**
     * Executes atomic funds transfer with Explainable AI pre-flight risk checks.
     */
    public synchronized Map<String, Object> executeTransfer(
            int sourceAccountId,
            String destinationAccount,
            BigDecimal amount,
            boolean isNewBeneficiary,
            boolean isUnrecognizedDevice) {

        Account source = accounts.get(sourceAccountId);
        if (source == null) {
            throw new IllegalArgumentException("Source account does not exist.");
        }

        if ("FROZEN".equalsIgnoreCase(source.getStatus())) {
            throw new IllegalStateException("Source account is frozen due to active security protocol.");
        }

        if (source.getBalance().compareTo(amount) < 0) {
            throw new IllegalStateException("Insufficient funds in source account.");
        }

        // Inline Pre-flight Threat Evaluation
        SecurityEvent event = new SecurityEvent();
        event.setEventType("TRANSFER_REQUEST");
        event.setTimestamp(LocalDateTime.now().toString());
        event.addMetadata("amount", amount.doubleValue());
        event.addMetadata("isNewBeneficiary", isNewBeneficiary);
        event.addMetadata("isUnrecognizedDevice", isUnrecognizedDevice);
        event.addMetadata("velocityCount", 1);

        ThreatResult riskResult = fraudDetector.analyze(event);

        if (riskResult.getRiskScore() >= 80) {
            // High Risk -> Reject transfer or flag
            Transaction blockedTx = new Transaction();
            blockedTx.setId(transactionLedger.size() + 1);
            blockedTx.setAccountId(sourceAccountId);
            blockedTx.setTransactionType("TRANSFER");
            blockedTx.setAmount(amount);
            blockedTx.setRecipientAccount(destinationAccount);
            blockedTx.setStatus("REJECTED_HIGH_RISK");
            blockedTx.setRiskScore(riskResult.getRiskScore());
            transactionLedger.add(0, blockedTx);

            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Transfer blocked by SmartBank AI Fraud Engine.");
            response.put("threatResult", riskResult);
            return response;
        }

        // Atomic Balance Update
        source.setBalance(source.getBalance().subtract(amount));

        Transaction successTx = new Transaction();
        successTx.setId(transactionLedger.size() + 1);
        successTx.setAccountId(sourceAccountId);
        successTx.setTransactionType("TRANSFER");
        successTx.setAmount(amount);
        successTx.setRecipientAccount(destinationAccount);
        successTx.setStatus("COMPLETED");
        successTx.setRiskScore(riskResult.getRiskScore());
        transactionLedger.add(0, successTx);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Funds transferred successfully.");
        response.put("transaction", successTx);
        response.put("remainingBalance", source.getBalance());
        response.put("threatResult", riskResult);
        return response;
    }

    public synchronized void setAccountStatus(int accountId, String status) {
        Account acc = accounts.get(accountId);
        if (acc != null) {
            acc.setStatus(status);
        }
    }
}
