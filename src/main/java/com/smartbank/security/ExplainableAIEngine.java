package com.smartbank.security;

import com.smartbank.model.ThreatResult;
import java.util.*;

/**
 * Core Java Explainable AI (XAI) Attribution Engine.
 * Converts raw quantitative risk metrics into plain-English human evidence
 * with explicit attribution factors and weighted transparency.
 */
public class ExplainableAIEngine {

    public Map<String, Object> formatExplanation(ThreatResult result) {
        Map<String, Object> xaiPayload = new LinkedHashMap<>();

        xaiPayload.put("riskScore", result.getRiskScore());
        xaiPayload.put("riskLevel", result.getRiskLevel());
        xaiPayload.put("threatType", result.getThreatType());
        xaiPayload.put("whatHappened", result.getExplanation());
        xaiPayload.put("recommendation", result.getRecommendedAction());

        List<String> evidenceLines = new ArrayList<>();
        if (result.getSignals() != null) {
            for (Map<String, Object> sig : result.getSignals()) {
                evidenceLines.add(String.format("• [%s] (Weight: +%s) — %s",
                    sig.get("name"), sig.get("weight"), sig.get("detail")));
            }
        }
        xaiPayload.put("evidenceAttribution", evidenceLines);
        xaiPayload.put("explainabilityIndex", "100% Deterministic Transparent Attribution");

        return xaiPayload;
    }
}
