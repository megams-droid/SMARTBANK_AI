import React, { useState } from 'react';
import { Wallet, Send, ShieldAlert, CheckCircle2, AlertTriangle, Plus, ArrowUpRight } from 'lucide-react';
import { evaluateTransactionRisk } from '../services/explainableAI';
import { playAlertSound } from '../services/AudioAlert';
import { api } from '../services/api';

export default function AccountsModule({ 
  accounts, 
  beneficiaries, 
  transactions, 
  onAddTransaction,
  onTriggerAlert
}) {
  const [recipient, setRecipient] = useState(beneficiaries[0]?.name || '');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Transfer');
  const [isNewBeneficiary, setIsNewBeneficiary] = useState(false);
  const [isUnfamiliarDevice, setIsUnfamiliarDevice] = useState(false);
  const [evalResult, setEvalResult] = useState(null);

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const txData = {
      amount: Number(amount),
      beneficiaryName: recipient,
      isNewBeneficiary,
      isUnfamiliarDevice
    };

    const evaluation = evaluateTransactionRisk(txData);
    setEvalResult(evaluation);

    // Play audio tone based on risk
    if (evaluation.riskLevel === 'CRITICAL' || evaluation.riskLevel === 'HIGH') {
      playAlertSound('critical');
      onTriggerAlert({
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: `Suspicious Transfer Risk Detected (${evaluation.riskScore}/100)`,
        category: 'FRAUD',
        severity: evaluation.riskLevel,
        riskScore: evaluation.riskScore,
        message: `Fraud Engine flagged transaction of ₹${Number(amount).toLocaleString('en-IN')} to '${recipient}'. Signals: ${evaluation.explanation.whyDetected}`,
        status: 'ACTIVE',
        recommendation: evaluation.explanation.recommendedAction
      });
    } else {
      playAlertSound('success');
    }

    // Add transaction to history
    onAddTransaction({
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      merchant: `${recipient} (Transfer)`,
      category: category,
      amount: Number(amount),
      type: 'DEBIT',
      status: evaluation.riskScore > 60 ? 'RESTRICTED_OTP' : 'COMPLETED',
      riskScore: evaluation.riskScore,
      riskLevel: evaluation.riskLevel
    });

    // Sync with backend API
    api.transferFunds({
      fromAccountId: accounts[0]?.id || 'ACC-01',
      beneficiaryName: recipient,
      amount: Number(amount),
      isNewBeneficiary,
      isUnfamiliarDevice
    }).catch(() => {});

    setAmount('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Accounts & Money Transfer</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Manage simulated bank accounts & execute transfers protected by Explainable AI Fraud Shield
          </p>
        </div>
      </div>

      {/* Account Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {accounts.map(acc => (
          <div key={acc.id} className="card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-low" style={{ fontSize: '0.7rem' }}>{acc.type}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)' }}>{acc.status}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Account Number: {acc.number}</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.5rem 0', color: 'var(--text-primary)' }}>
              ₹{acc.balance.toLocaleString('en-IN')}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Interest Rate: {acc.interest} {acc.maturity ? `| Maturity: ${acc.maturity}` : ''}
            </p>
          </div>
        ))}
      </div>

      {/* Transfer Form & AI Fraud Evaluation Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Transfer Form */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Send size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Execute Money Transfer</h3>
          </div>

          <form onSubmit={handleTransferSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Select Recipient / Beneficiary
              </label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
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
                {beneficiaries.map(b => (
                  <option key={b.id} value={b.name}>{b.name} ({b.bank} - {b.account})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Amount (INR ₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter transfer amount e.g. 5000"
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

            {/* Test Simulation Controls */}
            <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                🧪 FRAUD DETECTOR TEST CONTROLS:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isNewBeneficiary}
                    onChange={(e) => setIsNewBeneficiary(e.target.checked)}
                  />
                  <span>Simulate Newly Added Beneficiary (&lt;24h)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isUnfamiliarDevice}
                    onChange={(e) => setIsUnfamiliarDevice(e.target.checked)}
                  />
                  <span>Simulate Unfamiliar Device / IP Fingerprint</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Send size={16} />
              <span>Verify & Send Money</span>
            </button>
          </form>
        </div>

        {/* Explainable AI Risk Assessment Box */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <ShieldAlert size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Real-time Explainable AI Fraud Check</h3>
          </div>

          {evalResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: evalResult.riskScore > 60 ? 'var(--danger-light)' : 'var(--success-light)',
                border: `1px solid ${evalResult.riskScore > 60 ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>RISK SCORE RESULT</span>
                  <span className={`badge ${evalResult.riskScore > 60 ? 'badge-high' : 'badge-low'}`}>
                    {evalResult.riskLevel}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.25rem', color: evalResult.riskScore > 60 ? 'var(--danger)' : 'var(--success)' }}>
                  {evalResult.riskScore} / 100
                </h4>
              </div>

              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', uppercase: true, marginBottom: '0.35rem' }}>
                  SIGNALS ANALYZED:
                </p>
                {evalResult.signals.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                    ✓ All transaction signals match normal baseline. No suspicious anomalies detected.
                  </p>
                ) : (
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {evalResult.signals.map((sig, idx) => (
                      <li key={idx} style={{ color: 'var(--text-primary)' }}>
                        <strong>{sig.name} (+{sig.weight} risk)</strong>: {sig.detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-primary)' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.2rem' }}>
                  EXPLAINABLE RECOMMENDATION:
                </p>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {evalResult.explanation.recommendedAction}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
              <ShieldAlert size={48} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No transaction evaluated yet.</p>
              <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Enter a transfer amount on the left to observe real-time explainable fraud scoring.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
