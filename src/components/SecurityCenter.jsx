import React from 'react';
import { Radio, ShieldCheck, AlertTriangle, Activity, Lock, ShieldAlert } from 'lucide-react';

export default function SecurityCenter({ securityScore, alerts }) {
  const threatStatuses = [
    { category: 'Transaction Fraud', status: 'LOW RISK', level: 'LOW', score: '12/100' },
    { category: 'AI Phishing Shield', status: 'MEDIUM RISK', level: 'MEDIUM', score: '45/100' },
    { category: 'AI Malware Guard', status: 'LOW RISK', level: 'LOW', score: '05/100' },
    { category: 'Ransomware Sentinel', status: 'SAFE / MONITORED', level: 'LOW', score: '00/100' },
    { category: 'Account Takeover Risk', status: 'LOW RISK', level: 'LOW', score: '18/100' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Security Intelligence Center</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Real-time cybersecurity command dashboard & continuous monitoring status
        </p>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>OVERALL SECURITY SCORE</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--success)' }}>
            {securityScore} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>System posture: Optimal Defense</p>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACTIVE THREAT ALERTS</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--warning)' }}>
            {alerts.length}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Requiring analyst attention</p>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ALWAYS-ON MONITOR</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--success)' }}>
            🟢 ONLINE (ScheduledExecutor)
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Background thread active</p>
        </div>
      </div>

      {/* Threat Category Grid */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Security Threat Status matrix</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {threatStatuses.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{item.category}</p>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.35rem', color: item.level === 'MEDIUM' ? 'var(--warning)' : 'var(--success)' }}>
                {item.status}
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Threat Index: {item.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
