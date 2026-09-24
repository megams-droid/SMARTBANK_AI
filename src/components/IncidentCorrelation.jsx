import React from 'react';
import { GitMerge, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IncidentCorrelation({ incidents }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Incident Correlation Pipeline</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Converts individual alerts into unified multi-event security incidents (Major Hackathon Differentiator)
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {incidents.map(inc => (
          <div key={inc.id} className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-critical" style={{ marginBottom: '0.35rem' }}>{inc.severity} SEVERITY</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{inc.threatType} ({inc.id})</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CORRELATED RISK SCORE</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--danger)' }}>{inc.riskScore} / 100</p>
              </div>
            </div>

            {/* Correlated Event Sequence Timeline */}
            <div style={{ margin: '1rem 0' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', uppercase: true, marginBottom: '0.75rem' }}>
                CORRELATED ATTACK TIMELINE:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {inc.timeline.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', minWidth: '60px' }}>{step.time}</span>
                    <ArrowRight size={16} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, flex: 1 }}>{step.event}</span>
                    <span className={`badge ${step.risk === 'CRITICAL' ? 'badge-critical' : step.risk === 'HIGH' ? 'badge-high' : 'badge-medium'}`}>
                      {step.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence List */}
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', uppercase: true, marginBottom: '0.35rem' }}>
                EXPLAINABLE EVIDENCE CONSIDERED:
              </p>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem' }}>
                {inc.evidence.map((ev, i) => <li key={i}>{ev}</li>)}
              </ul>
            </div>

            <div style={{ background: 'var(--accent-light)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>RECOMMENDED DEFENSIVE RESPONSE:</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{inc.recommendedAction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
