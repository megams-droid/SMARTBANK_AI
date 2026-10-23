import React from 'react';
import { FileSpreadsheet, Printer, Download, ShieldCheck, TrendingUp } from 'lucide-react';

export default function ReportsModule({ financialSummary, transactions, alerts, incidents, securityScore }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Financial & Security Report Generator</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Generate executive compliance summaries, financial audit reports, and cybersecurity incident logs
          </p>
        </div>

        <button onClick={handlePrint} className="btn btn-primary">
          <Printer size={16} />
          <span>Print / Export PDF Report</span>
        </button>
      </div>

      {/* Report Document Preview */}
      <div className="card" style={{ padding: '2.5rem', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1' }}>
        {/* Report Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #2563eb', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb' }}>SmartBank AI — Official Audit Report</h1>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Generated on: {new Date().toLocaleDateString()} | System Engine: Explainable AI v2.4</p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#334155', fontWeight: 600 }}>
              <span>Developer: <strong>MEGA SREE MS</strong> (Reg No: <strong>711525BCS092</strong>)</span><br />
              <span>Dept: <strong>CSE-C</strong> | <strong>Kalaignarkarunanidhi Institute of Technology, Coimbatore</strong> (2025–2029)</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>SECURITY SCORE</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>{securityScore} / 100</p>
            <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontWeight: 700 }}>
              VERIFIED SECURE
            </span>
          </div>
        </div>

        {/* Section 1: Financial Summary */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
            1. Executive Financial Summary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>TOTAL BALANCE</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹{financialSummary.totalBalance.toLocaleString('en-IN')}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>MONTHLY INCOME</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>₹{financialSummary.monthlyIncome.toLocaleString('en-IN')}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>MONTHLY EXPENSES</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>₹{financialSummary.monthlyExpenses.toLocaleString('en-IN')}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>NET SAVINGS</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹{financialSummary.savings.toLocaleString('en-IN')} (37%)</p>
            </div>
          </div>
        </div>

        {/* Section 2: Security & Threat Report */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
            2. Cybersecurity Threat & Incident Log
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.5rem' }}>
            Active Threat Alerts Flagged: <strong>{alerts.length}</strong> | Correlated Incidents: <strong>{incidents.length}</strong>
          </p>
          <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {alerts.map(a => (
              <li key={a.id}>
                <strong>[{a.category}] {a.title}</strong> (Score {a.riskScore}/100) — {a.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
