import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  CheckCircle2, 
  Bell, 
  PlusCircle, 
  Volume2, 
  Info,
  Flame,
  Lock,
  FileSearch,
  ExternalLink
} from 'lucide-react';
import { playAlertSound } from '../services/AudioAlert';

export function AlertSystem({ 
  alerts, 
  onResolveAlert, 
  onAddAlert,
  activeAlertModal,
  closeAlertModal,
  isCreateAlertOpen,
  closeCreateAlertModal
}) {
  const [customTitle, setCustomTitle] = useState('Suspicious Transaction Velocity Alert');
  const [customCategory, setCustomCategory] = useState('FRAUD');
  const [customSeverity, setCustomSeverity] = useState('HIGH');
  const [customRiskScore, setCustomRiskScore] = useState(87);
  const [customMessage, setCustomMessage] = useState('Unusual transfer of ₹45,000 initiated from unrecognized IP address.');

  const handleCreateCustomAlert = (e) => {
    e.preventDefault();
    const newAlert = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      title: customTitle,
      category: customCategory,
      severity: customSeverity,
      riskScore: Number(customRiskScore),
      message: customMessage,
      status: 'ACTIVE',
      recommendation: customSeverity === 'CRITICAL' ? 'Freeze account session immediately' : 'Require MFA verification before proceeding'
    };

    // Play alert sound tone
    playAlertSound(customSeverity.toLowerCase());

    onAddAlert(newAlert);
    closeCreateAlertModal();
  };

  return (
    <>
      {/* 1. HIGH / CRITICAL RISK THREAT MODAL DIALOG */}
      {activeAlertModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '640px', borderRadius: '20px' }}>
            <div style={{
              background: activeAlertModal.severity === 'CRITICAL' 
                ? 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)' 
                : 'linear-gradient(135deg, #c2410c 0%, #f97316 100%)',
              padding: '1.25rem 1.5rem',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldAlert size={28} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{activeAlertModal.title}</h3>
                    <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>
                      {activeAlertModal.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                    Category: {activeAlertModal.category} | Timestamp: {activeAlertModal.timestamp}
                  </p>
                </div>
              </div>
              <button
                onClick={closeAlertModal}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Risk Score Display */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>EXPLAINABLE AI RISK SCORE</p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 800, color: activeAlertModal.riskScore > 75 ? 'var(--danger)' : 'var(--warning)' }}>
                    {activeAlertModal.riskScore} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DECISION ENGINE</p>
                  <p style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--accent-primary)' }}>Rule-Weighted Explainable AI</p>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', uppercase: true, marginBottom: '0.35rem' }}>
                  ALERT DETAILS & EVIDENCE:
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5, background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--danger)' }}>
                  {activeAlertModal.message}
                </p>
              </div>

              {/* Recommendation */}
              {activeAlertModal.recommendation && (
                <div style={{ backgroundColor: 'var(--accent-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-accent)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
                    💡 RECOMMENDED DEFENSIVE RESPONSE:
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {activeAlertModal.recommendation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    onResolveAlert(activeAlertModal.id);
                    closeAlertModal();
                  }}
                  className="btn btn-success"
                >
                  <CheckCircle2 size={16} />
                  <span>Execute Defensive Action</span>
                </button>
                <button onClick={closeAlertModal} className="btn btn-outline">
                  Dismiss Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAKE AN ALERT MODAL DIALOG */}
      {isCreateAlertOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px', borderRadius: '20px' }}>
            <div style={{
              background: 'var(--warning-light)',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AlertTriangle size={24} color="var(--warning)" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Make Custom Alert</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Generate a security or financial alert with custom risk score</p>
                </div>
              </div>
              <button onClick={closeCreateAlertModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomAlert} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Alert Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="FRAUD">FRAUD</option>
                    <option value="PHISHING">PHISHING</option>
                    <option value="MALWARE">MALWARE</option>
                    <option value="RANSOMWARE">RANSOMWARE</option>
                    <option value="BUDGET">BUDGET</option>
                    <option value="SECURITY">SECURITY</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Severity
                  </label>
                  <select
                    value={customSeverity}
                    onChange={(e) => setCustomSeverity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Risk Score (0 - 100): <strong style={{ color: 'var(--accent-primary)' }}>{customRiskScore}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={customRiskScore}
                  onChange={(e) => setCustomRiskScore(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Alert Message & Evidence
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows="3"
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={closeCreateAlertModal} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Bell size={16} />
                  <span>Generate Alert Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
