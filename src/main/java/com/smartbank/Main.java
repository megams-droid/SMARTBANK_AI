package com.smartbank;

import com.smartbank.security.*;
import com.smartbank.security.monitor.SecurityMonitorService;
import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;
import java.util.logging.Logger;

/**
 * SmartBank AI — Core Java Entry Point & Demonstration Console.
 * Demonstrates: Detect -> Analyze -> Explain -> Alert -> Respond -> Record
 *
 * Student: MEGA SREE MS (711525BCS092)
 * Institution: Kalaignarkarunanidhi Institute of Technology, Coimbatore
 */
public class Main {

    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("           SMARTBANK AI — AI-POWERED SMART BANKING PLATFORM                     ");
        System.out.println("   Developer: MEGA SREE MS | Reg No: 711525BCS092 | CSE-C | KIT Coimbatore      ");
        System.out.println("================================================================================");
        System.out.println("Lifecycle: DETECT -> ANALYZE -> EXPLAIN -> ALERT -> RESPOND -> RECORD\n");

        // 1. Initialize Multithreaded Background Monitor Daemon
        SecurityMonitorService monitor = new SecurityMonitorService();
        monitor.startMonitoring();

        // 2. Instantiate Polymorphic Threat Detectors
        ThreatDetector fraudDetector = new FraudDetector();
        ThreatDetector phishingDetector = new PhishingDetector();
        ThreatDetector malwareDetector = new MalwareDetector();
        ThreatDetector ransomwareSentinel = new RansomwareSentinel();

        // 3. Run Simulated Fraud Analysis
        System.out.println(">>> [1/4] EXPLAINABLE AI FRAUD DETECTION DEMO:");
        SecurityEvent fraudEvent = new SecurityEvent("EVT-TXN-01", "TRANSACTION", "USR-8821");
        fraudEvent.addMetadata("amount", 75000.0);
        fraudEvent.addMetadata("isNewBeneficiary", true);
        fraudEvent.addMetadata("isUnrecognizedDevice", true);
        ThreatResult fraudResult = fraudDetector.analyze(fraudEvent);
        printThreatResult(fraudResult);

        // 4. Run Simulated Phishing Scan
        System.out.println(">>> [2/4] AI PHISHING SHIELD DEMO:");
        SecurityEvent phishEvent = new SecurityEvent("EVT-URL-01", "PHISHING_SCAN", "USR-8821");
        phishEvent.addMetadata("targetUrl", "http://192.168.1.105/smartbank-verify.net/urgent-action.php");
        ThreatResult phishResult = phishingDetector.analyze(phishEvent);
        printThreatResult(phishResult);

        // 5. Run Simulated Malware Scan
        System.out.println(">>> [3/4] AI MALWARE GUARD STATIC ANALYSIS DEMO:");
        SecurityEvent malwareEvent = new SecurityEvent("EVT-FILE-01", "MALWARE_SCAN", "USR-8821");
        malwareEvent.addMetadata("filename", "bank_statement_urgent.pdf.exe");
        malwareEvent.addMetadata("mimeType", "application/x-dosexec");
        malwareEvent.addMetadata("fileSize", 204850);
        ThreatResult malwareResult = malwareDetector.analyze(malwareEvent);
        printThreatResult(malwareResult);

        // 6. Run Simulated Ransomware Tripwire
        System.out.println(">>> [4/4] RANSOMWARE SENTINEL CANARY HONEYPOT DEMO:");
        SecurityEvent canaryEvent = new SecurityEvent("EVT-HONEYPOT-01", "CANARY_BREACH", "USR-8821");
        canaryEvent.addMetadata("accessedTable", "canary_ledger_decoy");
        canaryEvent.addMetadata("canaryBreached", true);
        canaryEvent.addMetadata("modificationRatePerMin", 120);
        canaryEvent.addMetadata("entropyScore", 7.85);
        ThreatResult ransomwareResult = ransomwareSentinel.analyze(canaryEvent);
        printThreatResult(ransomwareResult);

        // Clean shutdown
        monitor.stopMonitoring();
        System.out.println("\nAll Core Java Security & XAI engines verified successfully.");
    }

    private static void printThreatResult(ThreatResult result) {
        System.out.println(" • Engine: " + result.getThreatType());
        System.out.println(" • Calculated Risk Score: " + result.getRiskScore() + "/100 (" + result.getRiskLevel() + ")");
        System.out.println(" • XAI Explanation: " + result.getExplanation());
        System.out.println(" • Mitigation Action: " + result.getRecommendedAction() + "\n");
    }
}
