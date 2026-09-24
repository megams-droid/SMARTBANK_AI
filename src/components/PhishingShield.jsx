import React, { useState } from 'react';
import { ShieldAlert, Search, ExternalLink, CheckCircle2, AlertTriangle } from 'lucide-react';
import { evaluatePhishingURL } from '../services/explainableAI';
import { playAlertSound } from '../services/AudioAlert';

export default function PhishingShield({ onTriggerAlert }) {
  const [targetInput, setTargetInput] = useState('smartbank-login.xyz/verify-account');
  const [result, setResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    if (!targetInput.trim()) return;

    const res = evaluatePhishingURL(targetInput);
    setResult(res);

    if (res.classification === 'HIGH RISK' || res.classification === 'SUSPICIOUS') {
      playAlertSound('warning');
      onTriggerAlert({
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: `AI Phishing Shield Detected Risk (${res.phishingRiskScore}/100)`,
        category: 'PHISHING',
        severity: res.classification === 'HIGH RISK' ? 'HIGH' : 'MEDIUM',
        riskScore: res.phishingRiskScore,
        message: res.explanation.whyDetected,
        status: 'ACTIVE',
        recommendation: res.explanation.recommendedAction
      });
    } else {
      playAlertSound('success');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>AI Phishing Shield</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Safe simulated inspection of suspicious banking URLs, domain spoofing, SMS, and email lures
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Input Form */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <ShieldAlert size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Submit Target for Analysis</h3>
          </div>

          <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                URL, SMS, or Email Message Text
              </label>
              <textarea
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                rows="4"
                placeholder="Paste URL or message text here (e.g. smartbank-login.xyz)..."
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem'
                }}
              ></textarea>
            </div>

            <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              * Safe defensive analysis only. SmartBank AI never executes or visits untrusted URLs.
            </p>

            <button type="submit" className="btn btn-primary">
              <Search size={16} />
              <span>Run AI Phishing Inspection</span>
            </button>
          </form>
        </div>

        {/* Results Box */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Inspection Report</h3>

          {result ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: result.classification === 'HIGH RISK' ? 'var(--danger-light)' : result.classification === 'SUSPICIOUS' ? 'var(--warning-light)' : 'var(--success-light)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>PHISHING RISK SCORE</span>
                  <span className={`badge ${result.classification === 'HIGH RISK' ? 'badge-high' : result.classification === 'SUSPICIOUS' ? 'badge-medium' : 'badge-low'}`}>
                    {result.classification}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.25rem' }}>
                  {result.phishingRiskScore} / 100
                </h4>
              </div>

              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', uppercase: true }}>WHY DETECTED:</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {result.explanation.whyDetected}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', uppercase: true }}>EVIDENCE CONSIDERED:</p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', marginTop: '0.2rem' }}>
                  {result.explanation.evidenceConsidered.map((ev, i) => <li key={i}>{ev}</li>)}
                </ul>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>RECOMMENDED DEFENSIVE ACTION:</p>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 600 }}>{result.explanation.recommendedAction}</p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
              <ShieldAlert size={48} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Enter target above to run AI phishing detection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
