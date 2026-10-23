package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;

/**
 * Fraud Detection Engine implementing Core Java OOP ThreatDetector interface.
 * Evaluates transaction velocity, new beneficiary status, time anomalies, and amount spikes.
 */
public class FraudDetector implements ThreatDetector {

    @Override
    public String getDetectorName() {
        return "Transaction Fraud Detector Engine";
    }

    @Override
    public ThreatResult analyze(SecurityEvent event) {
        double amount = (double) event.getMetadata().getOrDefault("amount", 0.0);
        boolean isNewBeneficiary = (boolean) event.getMetadata().getOrDefault("isNewBeneficiary", false);
        int velocityCount = (int) event.getMetadata().getOrDefault("velocityCount", 1);
        boolean isUnrecognizedDevice = (boolean) event.getMetadata().getOrDefault("isUnrecognizedDevice", false);

        int calculatedScore = 0;
        StringBuilder explanation = new StringBuilder("Transaction risk evaluated: ");

        if (isNewBeneficiary) {
            calculatedScore += 35;
            explanation.append("Recipient is newly added unverified beneficiary (+35). ");
        }
        if (amount > 50000) {
            calculatedScore += 30;
            explanation.append("Transaction amount exceeds high-value threshold ₹50,000 (+30). ");
        }
        if (velocityCount > 2) {
            calculatedScore += 25;
            explanation.append("High transaction velocity detected: ").append(velocityCount).append(" transfers in 2 mins (+25). ");
        }
        if (isUnrecognizedDevice) {
            calculatedScore += 20;
            explanation.append("Initiated from unrecognized device hardware fingerprint (+20). ");
        }

        int finalScore = Math.min(100, calculatedScore);
        String level = finalScore >= 80 ? "HIGH" : (finalScore >= 50 ? "MEDIUM" : "LOW");
        String action = finalScore >= 80 ? "Temporarily restrict transaction and mandate MFA / Voice Verification" 
                                         : "Process with standard transaction notification";

        ThreatResult result = new ThreatResult(event.getEventId(), finalScore, level, explanation.toString().trim(), action);
        if (isNewBeneficiary) result.addSignal("NEW_BENEFICIARY_TRANSFER");
        if (amount > 50000) result.addSignal("HIGH_VALUE_SPIKE");
        if (velocityCount > 2) result.addSignal("VELOCITY_BURST");
        
        return result;
    }
}
