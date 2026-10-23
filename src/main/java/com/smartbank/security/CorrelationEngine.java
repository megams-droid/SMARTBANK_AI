package com.smartbank.security;

import com.smartbank.model.Incident;
import com.smartbank.model.SecurityEvent;
import java.util.*;

/**
 * Cross-Event Correlation Engine.
 * Correlates disparate low/medium priority events into unified high-confidence
 * Account Takeover (ATO) or multi-stage cyber attack incidents.
 */
public class CorrelationEngine {

    public Incident correlateEvents(String userId, List<SecurityEvent> events) {
        if (events == null || events.isEmpty()) {
            return null;
        }

        // Sort chronologically
        List<SecurityEvent> sorted = new ArrayList<>(events);
        sorted.sort(Comparator.comparing(SecurityEvent::getTimestamp));

        boolean hasFailedLogins = false;
        boolean hasNewDevice = false;
        boolean hasPasswordReset = false;
        boolean hasNewBeneficiary = false;
        boolean hasLargeTransfer = false;

        List<String> timelineSteps = new ArrayList<>();
        int compositeScore = 0;

        for (SecurityEvent evt : sorted) {
            String type = evt.getEventType().toUpperCase();
            if (type.contains("FAILED_LOGIN") || type.contains("BRUTE_FORCE")) {
                hasFailedLogins = true;
                compositeScore += 20;
                timelineSteps.add("Multiple failed authentication attempts detected from unfamiliar IP");
            } else if (type.contains("NEW_DEVICE") || type.contains("DEVICE_CHANGE")) {
                hasNewDevice = true;
                compositeScore += 20;
                timelineSteps.add("Unrecognized mobile/desktop hardware signature enrolled");
            } else if (type.contains("PASSWORD_RESET") || type.contains("CREDENTIAL_UPDATE")) {
                hasPasswordReset = true;
                compositeScore += 25;
                timelineSteps.add("Emergency password reset or 2FA bypass requested");
            } else if (type.contains("NEW_BENEFICIARY") || type.contains("BENEFICIARY_ADDED")) {
                hasNewBeneficiary = true;
                compositeScore += 25;
                timelineSteps.add("Offshore unverified beneficiary added without cooling period");
            } else if (type.contains("LARGE_TRANSFER") || type.contains("DRAIN_TRANSFER")) {
                hasLargeTransfer = true;
                compositeScore += 30;
                timelineSteps.add("Rapid high-value funds transfer initiated within minutes of credential update");
            }
        }

        compositeScore = Math.min(100, compositeScore);

        // ATO Pattern Match: At least 3 correlated kill-chain stages
        if (timelineSteps.size() >= 3 && compositeScore >= 60) {
            Incident incident = new Incident();
            incident.setIncidentId("INC-ATO-" + System.currentTimeMillis() % 10000);
            incident.setUserId(userId);
            incident.setTitle("Coordinated Account Takeover (ATO) Attack Sequence");
            incident.setSeverity(compositeScore >= 80 ? "CRITICAL" : "HIGH");
            incident.setConfidenceScore(compositeScore);
            incident.setStatus("OPEN_INVESTIGATION");
            incident.setTimeline(timelineSteps);
            incident.setRootCauseAnalysis(
                "Cross-event correlation confirmed coordinated multi-step intrusion kill chain: " +
                "Credentials were compromised, followed by device registration and rapid exfiltration transfer."
            );
            incident.setRecommendedAction(
                "Immediate account lockdown: Invalidate all active JWT tokens, freeze outbound wire transfers, and require in-branch biometric verification."
            );
            return incident;
        }

        return null;
    }
}
