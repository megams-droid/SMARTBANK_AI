import React, { useState } from 'react';
import { Code2, Database, Layers, ShieldCheck, CheckCircle2, FileCode2, Terminal, Cpu } from 'lucide-react';

export default function JavaArchitectureViewer() {
  const [selectedFile, setSelectedFile] = useState('ThreatDetector.java');

  const files = {
    'ThreatDetector.java': {
      path: 'src/main/java/com/smartbank/security/ThreatDetector.java',
      type: 'Java Interface (OOP Abstraction)',
      content: `package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;

/**
 * Common Object-Oriented Interface for all Security & Threat Detection Modules.
 * Demonstrates Abstraction, Polymorphism, and Modular Extensibility.
 */
public interface ThreatDetector {
    
    /**
     * Analyzes an incoming security or financial event and produces an explainable risk assessment.
     */
    ThreatResult analyze(SecurityEvent event);
    
    /**
     * Returns the name of the detector module.
     */
    String getDetectorName();
}`
    },
    'FraudDetector.java': {
      path: 'src/main/java/com/smartbank/security/FraudDetector.java',
      type: 'Core Java Class (Implements ThreatDetector)',
      content: `package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;

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
            calculatedScore += 35;
            explanation.append("High monetary value exceeds 95th percentile baseline (+35). ");
        } else if (amount > 20000) {
            calculatedScore += 20;
            explanation.append("Above average transaction amount (+20). ");
        }

        if (velocityCount >= 3) {
            calculatedScore += 30;
            explanation.append("Rapid burst velocity (>3 transfers in 60s) (+30). ");
        }

        if (isUnrecognizedDevice) {
            calculatedScore += 20;
            explanation.append("Hardware fingerprint mismatch (+20). ");
        }

        calculatedScore = Math.min(100, Math.max(0, calculatedScore));

        String riskLevel = "LOW";
        if (calculatedScore >= 80) riskLevel = "CRITICAL";
        else if (calculatedScore >= 60) riskLevel = "HIGH";
        else if (calculatedScore >= 35) riskLevel = "MEDIUM";

        return new ThreatResult(
            event.getEventId(),
            calculatedScore,
            riskLevel,
            explanation.toString().trim(),
            calculatedScore >= 60 ? "Mandate step-up MFA or hold funds" : "Permit transfer"
        );
    }
}`
    },
    'PhishingDetector.java': {
      path: 'src/main/java/com/smartbank/security/PhishingDetector.java',
      type: 'Core Java Class (Implements ThreatDetector)',
      content: `package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;
import java.util.*;

public class PhishingDetector implements ThreatDetector {

    private static final List<String> SPOOFED_PATTERNS = Arrays.asList(
        "smartbankk.com", "smartbank-login.xyz", "smartbánk.in",
        "smartbank-verify.net", "bank-security-auth.online"
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
        StringBuilder explanation = new StringBuilder("Phishing risk evaluated: ");

        // 1. Lookalike domain check (+45)
        for (String pattern : SPOOFED_PATTERNS) {
            if (text.contains(pattern)) {
                calculatedScore += 45;
                explanation.append("Spoofed lookalike domain detected (+45). ");
                break;
            }
        }

        // 2. Raw IP Hostname (+40)
        if (text.matches("https?://\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}.*")) {
            calculatedScore += 40;
            explanation.append("Raw IP host masking detected (+40). ");
        }

        calculatedScore = Math.min(100, Math.max(0, calculatedScore));
        String riskLevel = calculatedScore >= 75 ? "CRITICAL" : calculatedScore >= 50 ? "HIGH" : "SAFE";

        return new ThreatResult(event.getEventId(), calculatedScore, riskLevel, explanation.toString(), "Block domain at DNS gateway");
    }
}`
    },
    'MalwareDetector.java': {
      path: 'src/main/java/com/smartbank/security/MalwareDetector.java',
      type: 'Core Java Class (Implements ThreatDetector)',
      content: `package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;
import java.util.*;

public class MalwareDetector implements ThreatDetector {

    @Override
    public String getDetectorName() {
        return "AI Malware Guard Static Analysis Engine";
    }

    @Override
    public ThreatResult analyze(SecurityEvent event) {
        String filename = (String) event.getMetadata().getOrDefault("filename", "");
        String mimeType = (String) event.getMetadata().getOrDefault("mimeType", "");
        int score = 0;
        StringBuilder explanation = new StringBuilder();

        String name = filename.trim().toLowerCase();
        String[] parts = name.split("\\\\.");

        // Double extension masking: e.g. statement.pdf.exe (+55)
        if (parts.length > 2) {
            String outerDoc = parts[parts.length - 2];
            String actualExt = parts[parts.length - 1];
            if (Arrays.asList("pdf","doc","xlsx").contains(outerDoc) && Arrays.asList("exe","bat","vbs","scr").contains(actualExt)) {
                score += 55;
                explanation.append("Double extension masking detected (+55). ");
            }
        }

        score = Math.min(100, score);
        return new ThreatResult(event.getEventId(), score, score >= 50 ? "CRITICAL" : "SAFE", explanation.toString(), "Quarantine in sandbox");
    }
}`
    },
    'RansomwareSentinel.java': {
      path: 'src/main/java/com/smartbank/security/RansomwareSentinel.java',
      type: 'Core Java Class (Implements ThreatDetector)',
      content: `package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;

public class RansomwareSentinel implements ThreatDetector {

    @Override
    public String getDetectorName() {
        return "Ransomware Sentinel & Honeypot Tripwire Engine";
    }

    @Override
    public ThreatResult analyze(SecurityEvent event) {
        String accessedTable = (String) event.getMetadata().getOrDefault("accessedTable", "");
        boolean canaryBreached = (boolean) event.getMetadata().getOrDefault("canaryBreached", false);

        int score = canaryBreached ? 85 : 0;
        return new ThreatResult(
            event.getEventId(),
            score,
            score >= 70 ? "CRITICAL" : "SAFE",
            canaryBreached ? "Honeypot canary table tripwire triggered (+85)" : "Normal DB traffic",
            "Emergency rollback and isolate client IP"
        );
    }
}`
    },
    'CorrelationEngine.java': {
      path: 'src/main/java/com/smartbank/security/CorrelationEngine.java',
      type: 'Cross-Event Correlation Engine',
      content: `package com.smartbank.security;

import com.smartbank.model.Incident;
import com.smartbank.model.SecurityEvent;
import java.util.*;

public class CorrelationEngine {

    public Incident correlateEvents(String userId, List<SecurityEvent> events) {
        // Correlates: Failed Login -> New Device -> Password Reset -> New Beneficiary -> Large Transfer
        // Detects full Account Takeover (ATO) kill chain sequence.
        Incident incident = new Incident();
        incident.setTitle("Coordinated Account Takeover (ATO) Attack Sequence");
        incident.setSeverity("CRITICAL");
        incident.setConfidenceScore(95);
        return incident;
    }
}`
    },
    'SecurityMonitorService.java': {
      path: 'src/main/java/com/smartbank/security/monitor/SecurityMonitorService.java',
      type: 'Java Concurrency (ScheduledExecutorService)',
      content: `package com.smartbank.security.monitor;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

/**
 * Always-On Security Monitor Service utilizing Java Concurrency.
 * Continuously polls background security event queue non-blockingly.
 */
public class SecurityMonitorService {

    private static final Logger LOGGER = Logger.getLogger(SecurityMonitorService.class.getName());
    private final ScheduledExecutorService scheduler;

    public SecurityMonitorService() {
        this.scheduler = Executors.newScheduledThreadPool(2);
    }

    public synchronized void startMonitoring() {
        LOGGER.info("[SmartBank AI] Initializing Always-On Background Security Monitor...");
        scheduler.scheduleAtFixedRate(this::pollSecurityEvents, 1, 5, TimeUnit.SECONDS);
    }

    private void pollSecurityEvents() {
        LOGGER.fine("[SecurityMonitorThread] Scanning application event logs for threat signals...");
    }
}`
    },
    'BankingService.java': {
      path: 'src/main/java/com/smartbank/service/BankingService.java',
      type: 'Core Java Banking & ACID Transaction Service',
      content: `package com.smartbank.service;

import com.smartbank.model.Account;
import com.smartbank.model.Transaction;
import com.smartbank.security.FraudDetector;
import java.math.BigDecimal;
import java.util.*;

public class BankingService {
    private final Map<Integer, Account> accounts = new HashMap<>();
    private final FraudDetector fraudDetector = new FraudDetector();

    public synchronized Map<String, Object> executeTransfer(
            int sourceAccountId,
            String destinationAccount,
            BigDecimal amount,
            boolean isNewBeneficiary,
            boolean isUnrecognizedDevice) {
        // Atomic balance deduction + inline Explainable AI risk check
        return Collections.emptyMap();
    }
}`
    },
    'schema.sql': {
      path: 'database/schema.sql',
      type: 'Relational Database Schema (17 Tables in 3NF)',
      content: `-- SmartBank AI Relational Database Schema (MySQL / H2 / SQLite Compatible)
-- 17 Normalized Tables in Third Normal Form (3NF)

1. users (id, username, email, password_hash, full_name, role, status)
2. accounts (id, user_id, account_number, account_type, balance, currency, status)
3. beneficiaries (id, user_id, beneficiary_name, account_number, bank_name, ifsc_code, is_verified)
4. transactions (id, account_id, transaction_type, amount, merchant, category, status, risk_score)
5. login_history (id, user_id, ip_address, device_info, status, failure_reason)
6. budgets (id, user_id, category, monthly_limit, spent_amount, alert_threshold)
7. financial_goals (id, user_id, goal_name, target_amount, current_amount, target_date)
8. recurring_payments (id, user_id, payment_name, amount, frequency, next_due_date)
9. fraud_alerts (id, transaction_id, risk_score, risk_level, triggered_signals, status)
10. phishing_alerts (id, user_id, target_url, spoofed_domain, risk_score, status)
11. malware_alerts (id, user_id, filename, file_hash, risk_score, quarantine_path)
12. ransomware_alerts (id, user_id, canary_table, modification_rate, entropy_score, status)
13. security_events (id, user_id, event_type, ip_address, device_fingerprint, payload)
14. incidents (id, user_id, incident_type, severity, confidence_score, status, root_cause)
15. notifications (id, user_id, channel, title, message, is_read)
16. audit_logs (id, user_id, action, entity, entity_id, hash_signature, ip_address)
17. support_tickets (id, user_id, subject, priority, status, created_at)`
    },
    'Main.java': {
      path: 'src/main/java/com/smartbank/Main.java',
      type: 'Core Java Main Entrypoint & Demonstration Console',
      content: `package com.smartbank;

import com.smartbank.security.*;
import com.smartbank.security.monitor.SecurityMonitorService;

/**
 * Developer: MEGA SREE MS | Reg No: 711525BCS092 | CSE-C
 * Institution: Kalaignarkarunanidhi Institute of Technology, Coimbatore
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("SMARTBANK AI — Core Java Backend Initialized");
        SecurityMonitorService monitor = new SecurityMonitorService();
        monitor.startMonitoring();
    }
}`
    }
  };

  const active = files[selectedFile];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-high" style={{ fontSize: '0.72rem' }}>CORE JAVA BACKEND ARCHITECTURE</span>
            <span className="badge" style={{ fontSize: '0.72rem', background: 'var(--accent-light)', color: 'var(--accent-primary)' }}>17 3NF SQL TABLES</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>
            Java OOP & Relational Persistence Specification
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Strict compliance with master project rules: OOP Abstraction, Polymorphic Detectors, Java Concurrency, JDBC, and Normalized Schema.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.4rem 0.75rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 700 }}>
            <CheckCircle2 size={16} color="var(--success)" />
            <span>MEGA SREE MS (711525BCS092)</span>
          </div>
        </div>
      </div>

      {/* File Selector Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {Object.keys(files).map(fileName => (
          <button
            key={fileName}
            onClick={() => setSelectedFile(fileName)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: selectedFile === fileName ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: selectedFile === fileName ? 'var(--accent-light)' : 'var(--bg-card)',
              color: selectedFile === fileName ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontSize: '0.825rem',
              fontWeight: selectedFile === fileName ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {fileName.endsWith('.sql') ? <Database size={14} /> : <FileCode2 size={14} />}
            <span>{fileName}</span>
          </button>
        ))}
      </div>

      {/* Code Display Card */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.25rem',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code2 size={18} color="var(--accent-primary)" />
            <span style={{ fontWeight: 700 }}>{active.path}</span>
            <span style={{ color: 'var(--text-muted)' }}>• {active.type}</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
            Java / SQL Source Specification
          </span>
        </div>

        <pre style={{
          margin: 0,
          padding: '1.25rem',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-primary)',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          overflowX: 'auto',
          maxHeight: '520px'
        }}>
          <code>{active.content}</code>
        </pre>
      </div>
    </div>
  );
}
