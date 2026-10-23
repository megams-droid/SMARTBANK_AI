package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;
import java.util.*;

/**
 * Core Java Phishing Detection Engine.
 * Analyzes URLs, domain names, lookalikes, raw IP hosts, and urgency lingo.
 */
public class PhishingDetector implements ThreatDetector {

    private static final Set<String> SUSPICIOUS_TLDS = new HashSet<>(Arrays.asList(
        ".xyz", ".top", ".online", ".cc", ".tk", ".club", ".buzz", ".work"
    ));

    private static final List<String> SPOOFED_PATTERNS = Arrays.asList(
        "smartbankk.com", "smartbank-login.xyz", "smartbánk.in",
        "smartbank-verify.net", "bank-security-auth.online", "secure-smartbank-update.com"
    );

    private static final List<String> URGENT_KEYWORDS = Arrays.asList(
        "verify", "secure-bank", "login-update", "account-blocked",
        "kyc-update", "urgent-action", "otp-confirm", "suspend"
    );

    @Override
    public String getDetectorName() {
        return "AI Phishing Shield Engine";
    }

    @Override
    public ThreatResult analyze(SecurityEvent event) {
        String targetUrl = (String) event.getMetadata().getOrDefault("targetUrl", "");
        String text = targetUrl.trim().toLowerCase();

        int calculatedScore = 5;
        List<Map<String, Object>> signals = new ArrayList<>();
        StringBuilder explanation = new StringBuilder("Phishing risk evaluated: ");

        // 1. Lookalike domain check
        for (String pattern : SPOOFED_PATTERNS) {
            if (text.contains(pattern)) {
                calculatedScore += 45;
                signals.add(createSignal("Impersonation & Lookalike Domain", 45,
                    "Domain pattern matches known spoofing signature targeted at SmartBank AI"));
                explanation.append("Spoofed lookalike domain detected (+45). ");
                break;
            }
        }

        // 2. Raw IP hostname
        if (text.matches("https?://\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}.*")) {
            calculatedScore += 40;
            signals.add(createSignal("Raw IP Hostname", 40,
                "URL uses direct IP address instead of verified domain name"));
            explanation.append("Raw IP host masking detected (+40). ");
        }

        // 3. Suspicious TLD
        for (String tld : SUSPICIOUS_TLDS) {
            if (text.endsWith(tld) || text.contains(tld + "/")) {
                calculatedScore += 25;
                signals.add(createSignal("Suspicious TLD Extension", 25,
                    "High spam & abuse reputation top-level domain: " + tld));
                explanation.append("Suspicious TLD detected (" + tld + ", +25). ");
                break;
            }
        }

        // 4. Urgency and lure keywords
        List<String> foundKeywords = new ArrayList<>();
        for (String kw : URGENT_KEYWORDS) {
            if (text.contains(kw)) {
                foundKeywords.add(kw);
            }
        }
        if (!foundKeywords.isEmpty()) {
            calculatedScore += 25;
            signals.add(createSignal("Social Engineering Keywords", 25,
                "Trigger lures identified: " + String.join(", ", foundKeywords)));
            explanation.append("Urgency trigger words identified (+25). ");
        }

        // 5. Excessive subdomains or obfuscation
        if (text.contains("@") || text.split("\\.").length > 4) {
            calculatedScore += 15;
            signals.add(createSignal("Excessive Subdomains / URL Obfuscation", 15,
                "Nested subdomain structure attempts to obscure root target"));
            explanation.append("Subdomain obfuscation detected (+15). ");
        }

        calculatedScore = Math.min(100, Math.max(0, calculatedScore));

        String riskLevel = "SAFE";
        if (calculatedScore >= 75) riskLevel = "CRITICAL";
        else if (calculatedScore >= 50) riskLevel = "HIGH";
        else if (calculatedScore >= 25) riskLevel = "MEDIUM";

        ThreatResult result = new ThreatResult();
        result.setScore(calculatedScore);
        result.setRiskLevel(riskLevel);
        result.setThreatType("PHISHING");
        result.setExplanation(explanation.toString().trim());
        result.setMitigationRecommendation(
            calculatedScore >= 50
                ? "Block destination URL at DNS gateway and notify user with anti-phishing advisory."
                : "Safe target destination; allow normal user access."
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
