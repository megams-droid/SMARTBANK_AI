import React, { useState } from 'react';
import { Flame, ShieldAlert, FileSearch, Lock, GitMerge, CheckCircle2, ArrowRight, Play, AlertOctagon } from 'lucide-react';
import { playAlertSound } from '../services/AudioAlert';

export default function ThreatLab({ onTriggerAlert, onAddIncident, onAddAuditLog }) {
  const [activeSimulation, setActiveSimulation] = useState(null);

  const runSimulation = (type) => {
    playAlertSound('critical');

    let simData = null;

    if (type === 'FRAUD') {
      simData = {
        title: 'High-Velocity Transaction Fraud Simulation',
        category: 'FRAUD',
        riskScore: 87,
        severity: 'HIGH',
        detectedEvent: 'Rapid sequential transfers of ₹45,000 + ₹25,000 to new beneficiary within 90 seconds',
        features: ['Velocity Burst: 2 txns in < 2 mins', 'New Beneficiary: Account CRYPTO-9900', 'Unrecognized Device Fingerprint'],
        riskAssessment: 'HIGH RISK (87/100) — Matches rapid fraud exfiltration signature',
        explanation: 'High risk because the transaction is significantly different from customer normal behavior and involves a newly added unverified beneficiary.',
        recommendedResponse: 'Temporarily restrict account transfers and require voice/MFA verification',
        incidentRecorded: 'INC-2026-087'
      };
    } else if (type === 'PHISHING') {
      simData = {
        title: 'AI Phishing Shield Attack Simulation',
        category: 'PHISHING',
        riskScore: 92,
        severity: 'HIGH',
        detectedEvent: 'Scanned spoofed login URL: "https://smartbank-login.xyz/verify-account"',
        features: ['Lookalike Domain: smartbank-login.xyz', 'Suspicious TLD: .xyz', 'Urgency Lingo: "Account Blocked - Verify Now"'],
        riskAssessment: 'CRITICAL PHISHING HAZARD (92/100)',
        explanation: 'High risk because host domain relies on registered lookalike TLD and requests immediate credential input under urgency language.',
        recommendedResponse: 'Block host IP globally in firewall and issue phishing alert to all logged-in users',
        incidentRecorded: 'INC-2026-092'
      };
    } else if (type === 'MALWARE') {
      simData = {
        title: 'AI Malware Guard Double-Extension File Scan',
        category: 'MALWARE',
        riskScore: 88,
        severity: 'HIGH',
        detectedEvent: 'User uploaded attachment filename: "bank_statement.pdf.exe"',
        features: ['Double Extension: .pdf.exe', 'Executable MIME Type mismatch', 'Spear-phishing motif'],
        riskAssessment: 'MALWARE ATTACHMENT HAZARD (88/100)',
        explanation: 'Double extension detected. File purports to be a PDF statement but carries dangerous executable windows extension.',
        recommendedResponse: 'Quarantine file immediately in isolated virtual sandbox without execution',
        incidentRecorded: 'INC-2026-088'
      };
    } else if (type === 'RANSOMWARE') {
      simData = {
        title: 'Safe Ransomware Sentinel Honeypot Decoy Simulation',
        category: 'RANSOMWARE',
        riskScore: 96,
        severity: 'CRITICAL',
        detectedEvent: 'Honeypot Decoy Records: 140 rapid modifications per second on database decoy table',
        features: ['Decoy Access Triggered: table `decoy_customer_vault`', 'Abnormal Modification Velocity', 'Extension change pattern .crypto'],
        riskAssessment: 'CRITICAL RANSOMWARE-LIKE BEHAVIOR (96/100)',
        explanation: 'Decoy honeypot records accessed and rapidly overwritten in automated loop. Safe data layer simulation triggered.',
        recommendedResponse: 'Freeze affected simulated account session, isolate host connection, and alert security operations team',
        incidentRecorded: 'INC-2026-096'
      };
    } else if (type === 'TAKEOVER') {
      simData = {
        title: 'Multi-Event Account Takeover Correlation',
        category: 'CORRELATION',
        riskScore: 94,
        severity: 'CRITICAL',
        detectedEvent: 'Correlated event sequence: Suspicious Login -> New Device -> Password Reset -> New Beneficiary -> Large Transfer',
        features: ['Cross-Event Correlation Engine', '5 Related Security Signals linked to SB-3091-8842-10', 'High anomaly confidence'],
        riskAssessment: 'ACCOUNT TAKEOVER CONFIRMED (94/100)',
        explanation: 'Multiple security alerts across login, device, authentication, and banking layers correlated into a single unified incident.',
        recommendedResponse: 'Lock user credentials, terminate active sessions, and mandate manual analyst review',
        incidentRecorded: 'INC-2026-094'
      };
    }

    setActiveSimulation(simData);

    // Add alert to global state
    onTriggerAlert({
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      title: simData.title,
      category: simData.category,
      severity: simData.severity,
      riskScore: simData.riskScore,
      message: simData.explanation,
      status: 'ACTIVE',
      recommendation: simData.recommendedResponse
    });

    // Add audit log
    onAddAuditLog({
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: 'hackathon_judge@demo.com',
      action: `SIMULATE_${type}`,
      result: 'THREAT_FLAGGED',
      riskLevel: simData.severity,
      details: simData.detectedEvent
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '1.75rem 2rem', borderRadius: 'var(--radius-lg)', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Flame size={28} color="#f97316" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Cyber Threat Simulation Lab</h2>
        </div>
        <p style={{ opacity: 0.9, fontSize: '0.875rem', marginTop: '0.35rem' }}>
          Safe Hackathon Demonstration Environment: Test full <strong>Detect → Analyze → Explain → Alert → Respond → Record</strong> pipeline.
        </p>
      </div>

      {/* 5 Interactive Action Buttons */}
      <div>
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', uppercase: true, marginBottom: '0.75rem' }}>
          CLICK A BUTTON TO TRIGGER SAFE SYNTHETIC CYBER THREAT DEMO:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button onClick={() => runSimulation('FRAUD')} className="btn btn-outline" style={{ padding: '1rem', border: '1px solid var(--warning)', color: 'var(--text-primary)', flexDirection: 'column', gap: '0.4rem' }}>
            <ShieldAlert size={24} color="var(--warning)" />
            <strong style={{ fontSize: '0.9rem' }}>Simulate Fraud</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Velocity & Beneficiary Anomaly</span>
          </button>

          <button onClick={() => runSimulation('PHISHING')} className="btn btn-outline" style={{ padding: '1rem', border: '1px solid var(--accent-primary)', color: 'var(--text-primary)', flexDirection: 'column', gap: '0.4rem' }}>
            <FileSearch size={24} color="var(--accent-primary)" />
            <strong style={{ fontSize: '0.9rem' }}>Simulate Phishing</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AI Phishing Shield Scan</span>
          </button>

          <button onClick={() => runSimulation('MALWARE')} className="btn btn-outline" style={{ padding: '1rem', border: '1px solid var(--danger)', color: 'var(--text-primary)', flexDirection: 'column', gap: '0.4rem' }}>
            <AlertOctagon size={24} color="var(--danger)" />
            <strong style={{ fontSize: '0.9rem' }}>Simulate Malware</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Double Extension Attachment</span>
          </button>

          <button onClick={() => runSimulation('RANSOMWARE')} className="btn btn-outline" style={{ padding: '1rem', border: '1px solid #dc2626', color: 'var(--text-primary)', flexDirection: 'column', gap: '0.4rem' }}>
            <Lock size={24} color="#dc2626" />
            <strong style={{ fontSize: '0.9rem' }}>Simulate Ransomware</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Honeypot Decoy Burst</span>
          </button>

          <button onClick={() => runSimulation('TAKEOVER')} className="btn btn-outline" style={{ padding: '1rem', border: '1px solid #7c3aed', color: 'var(--text-primary)', flexDirection: 'column', gap: '0.4rem' }}>
            <GitMerge size={24} color="#7c3aed" />
            <strong style={{ fontSize: '0.9rem' }}>Account Takeover</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cross-Event Correlation</span>
          </button>
        </div>
      </div>

      {/* Live Pipeline Flow Display */}
      {activeSimulation && (
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--danger)' }}>
              🔥 LIVE DEMO RESULT: {activeSimulation.title}
            </h3>
            <span className="badge badge-critical">
              Score {activeSimulation.riskScore}/100 ({activeSimulation.severity})
            </span>
          </div>

          {/* Step Pipeline Visualization */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            textAlign: 'center'
          }}>
            {['1. THREAT DETECTED', '2. FEATURE EXTRACTION', '3. RISK SCORE', '4. EXPLAINABLE AI', '5. ALERT & RESPOND', '6. RECORD AUDIT'].map((step, idx) => (
              <div key={idx} style={{
                background: 'var(--bg-tertiary)',
                padding: '0.65rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.725rem',
                fontWeight: 700,
                color: 'var(--accent-primary)'
              }}>
                {step}
              </div>
            ))}
          </div>

          {/* Breakdown Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.75rem' }}>DETECTED EVENT:</p>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{activeSimulation.detectedEvent}</p>

              <p style={{ fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.85rem' }}>TRIGGERED SIGNALS:</p>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.2rem' }}>
                {activeSimulation.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>

            <div style={{ background: 'var(--accent-light)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-accent)' }}>
              <p style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '0.75rem' }}>EXPLAINABLE AI REASONING:</p>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{activeSimulation.explanation}</p>

              <p style={{ fontWeight: 800, color: 'var(--success)', fontSize: '0.75rem', marginTop: '0.85rem' }}>RECOMMENDED RESPONSE:</p>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{activeSimulation.recommendedResponse}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
