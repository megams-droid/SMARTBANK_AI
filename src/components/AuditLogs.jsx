import React from 'react';
import { History, Search, Download } from 'lucide-react';

export default function AuditLogs({ logs }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Application Audit Trail Logs</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Immutable security event ledger recording all user actions, threat scans, and authentication history
          </p>
        </div>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Log ID</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Timestamp</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>User Identity</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Action Event</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Result</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Risk Level</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{log.id}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.timestamp}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{log.user}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>{log.action}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span className="badge badge-low" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {log.result}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span className={`badge ${log.riskLevel === 'CRITICAL' || log.riskLevel === 'HIGH' ? 'badge-high' : log.riskLevel === 'MEDIUM' ? 'badge-medium' : 'badge-low'}`}>
                    {log.riskLevel}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
