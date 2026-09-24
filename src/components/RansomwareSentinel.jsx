import React, { useState } from 'react';
import { Lock, ShieldAlert, Radio, CheckCircle2, Flame, Play } from 'lucide-react';
import { playAlertSound } from '../services/AudioAlert';

export default function RansomwareSentinel({ onTriggerAlert, onAddAuditLog }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState([
    { time: '18:45:00', event: 'Honeypot Decoy Table `decoy_customer_vault` initialized', status: 'ARMED' },
    { time: '18:50:00', event: 'Always-On Security Monitor observing database write velocity', status: 'MONITORING' }
  ]);

  const triggerRansomwareSim = () => {
    setIsSimulating(true);
    playAlertSound('critical');

    const now = new Date().toLocaleTimeString();
    const newLogs = [
      ...logs,
      { time: now, event: 'ALERT: Rapid modification burst (140 writes/sec) on decoy table', status: 'WARNING' },
      { time: now, event: 'CRITICAL: Extension change pattern `.crypto` detected on 12 decoy files', status: 'CRITICAL' },
      { time: now, event: 'AUTOMATED DEFENSE: Isolated session & restricted account permissions', status: 'PROTECTED' }
    ];
    setLogs(newLogs);

    onTriggerAlert({
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      title: 'Ransomware Sentinel Honeypot Decoy Burst (96/100)',
      category: 'RANSOMWARE',
      severity: 'CRITICAL',
      riskScore: 96,
      message: 'Ransomware Sentinel detected automated write velocity burst on honeypot decoy records. Safe data-layer simulation triggered.',
      status: 'ACTIVE',
      recommendation: 'Freeze affected simulated account/session immediately and notify security analyst.'
    });

    onAddAuditLog({
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: 'ransomware_sentinel_monitor',
      action: 'RANSOMWARE_DEC_BURST',
      result: 'SESSION_RESTRICTED',
      riskLevel: 'CRITICAL',
      details: '140 decoy writes/sec flagged on honeypot table `decoy_customer_vault`'
    });

    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Ransomware Sentinel (Honeypot Simulation)</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Safe application & data-layer honeypot decoy record monitor. Detects rapid encryption-like modifications without executing real ransomware.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Controls */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Lock size={20} color="var(--danger)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Decoy Monitor Status</h3>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>HONEYPOT DECOY RECORD VAULT</span>
              <span className="badge badge-low">ARMED & ACTIVE</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Monitoring table: <code>decoy_customer_vault</code> (1,000 synthetic financial records)
            </p>
          </div>

          <button
            onClick={triggerRansomwareSim}
            disabled={isSimulating}
            className="btn btn-danger"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <Flame size={18} />
            <span>{isSimulating ? 'Simulating Honeypot Burst...' : 'Trigger Safe Ransomware Honeypot Simulation'}</span>
          </button>
        </div>

        {/* Live Event Monitor Log */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Sentinel Activity Log</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '300px', overflowY: 'auto' }}>
            {logs.map((item, idx) => (
              <div key={idx} style={{ padding: '0.65rem', borderRadius: 'var(--radius-sm)', background: item.status === 'CRITICAL' ? 'var(--danger-light)' : 'var(--bg-primary)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>[{item.time}]</span>{' '}
                <span style={{ fontWeight: 600, color: item.status === 'CRITICAL' ? 'var(--danger)' : 'var(--text-primary)' }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
