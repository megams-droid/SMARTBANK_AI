package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;
import java.util.*;

/**
 * Core Java Ransomware Sentinel Engine.
 * Safely monitors decoy honeypot canary tables, rapid batch file modifications,
 * and high-entropy file overwrites without running hazardous code.
 */
public class RansomwareSentinel implements ThreatDetector {

    private static final Set<String> CANARY_TABLES = new HashSet<>(Arrays.asList(
        "canary_ledger_decoy", "honeypot_vault", "canary_credentials_trap"
    ));

    @Override
    public String getDetectorName() {
        return "Ransomware Sentinel & Honeypot Tripwire Engine";
    }

    @Override
    public ThreatResult analyze(SecurityEvent event) {
        String accessedTable = (String) event.getMetadata().getOrDefault("accessedTable", "");
        int modificationRate = ((Number) event.getMetadata().getOrDefault("modificationRatePerMin", 0)).intValue();
        boolean canaryBreached = (boolean) event.getMetadata().getOrDefault("canaryBreached", false);
        double entropyScore = ((Number) event.getMetadata().getOrDefault("entropyScore", 3.2)).doubleValue();

        int score = 0;
        List<Map<String, Object>> signals = new ArrayList<>();
        StringBuilder explanation = new StringBuilder("Ransomware defense evaluation: ");

        // 1. Canary Table Breach
        if (canaryBreached || CANARY_TABLES.contains(accessedTable.toLowerCase())) {
            score += 70;
            signals.add(createSignal("Canary Honeypot Decoy Tripwire Breached", 70,
                "Unauthorized access attempt detected on canary honey-token table '" + accessedTable + "'"));
            explanation.append("Honeypot canary table tripwire triggered (+70). ");
        }

        // 2. High-Frequency File / Record Overwrite Velocity
        if (modificationRate > 50) {
            score += 25;
            signals.add(createSignal("Abnormal Modification Velocity", 25,
                "Detected " + modificationRate + " modifications/min, matching mass ransomware encryption velocity"));
            explanation.append("Mass file modification burst observed (+25). ");
        }

        // 3. High Shannon Entropy (encrypted payload indicator)
        if (entropyScore > 7.5) {
            score += 20;
            signals.add(createSignal("High Shannon Entropy", 20,
                "Data block entropy calculated at " + entropyScore + "/8.0 (indicator of encrypted ciphertext payload)"));
            explanation.append("High entropy ciphertext pattern identified (+20). ");
        }

        score = Math.min(100, Math.max(0, score));

        String riskLevel = "SAFE";
        if (score >= 70) riskLevel = "CRITICAL";
        else if (score >= 40) riskLevel = "HIGH";
        else if (score >= 20) riskLevel = "MEDIUM";

        ThreatResult result = new ThreatResult();
        result.setScore(score);
        result.setRiskLevel(riskLevel);
        result.setThreatType("RANSOMWARE");
        result.setExplanation(explanation.toString().trim());
        result.setMitigationRecommendation(
            score >= 60
                ? "Trigger emergency containment protocol: Freeze active database session, isolate affected client IP, and rollback uncommitted transactions."
                : "Normal baseline database traffic; no active honeypot breaches."
        );
        result.setSignals(signals);
        return result;
    }

    private Map<String, Object> createSignal(String name, int weight, String detail) {
        Map<String, Object> signal = new HashMap<>();
        signal.put("name", name);
        signal.put("weight", weight);
        signal.put("detail", detail);
        return signal;
    }
}
