import React from 'react';
import { UserCog, Users, ShieldAlert, Activity, CheckCircle2, Lock } from 'lucide-react';

export default function AdminDashboard({ userRole, setUserRole, alerts, incidents }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Security Analyst & Admin Portal</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Role-Based Access Control (RBAC): Incident Investigation & System Administration
          </p>
        </div>

        <span className="badge badge-low" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          ACTIVE ROLE: {userRole}
        </span>
      </div>

      {/* Admin Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <div className="card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL REGISTERED USERS</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem' }}>1,420</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--success)' }}>+12 new today</p>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACTIVE INCIDENTS</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--danger)' }}>
            {incidents.length}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Under investigation</p>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PENDING ALERTS</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--warning)' }}>
            {alerts.length}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unacknowledged</p>
        </div>
      </div>

      {/* Incident Review List */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Active Security Incident Queue</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {incidents.map(inc => (
            <div key={inc.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>{inc.severity}</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.2rem' }}>{inc.threatType} ({inc.id})</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Account: {inc.affectedAccount} | Timestamp: {inc.timestamp}</p>
              </div>

              <button className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                Review Analyst Case
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
