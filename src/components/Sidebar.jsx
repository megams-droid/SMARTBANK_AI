import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  FileSearch, 
  Lock, 
  GitMerge, 
  Radio, 
  UserCog, 
  History, 
  FileSpreadsheet,
  AlertOctagon,
  Code2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, userRole }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Accounts & Transfers', icon: Wallet },
    { id: 'finance', label: 'Budget & Goals', icon: TrendingUp },
    { id: 'ai-advisor', label: 'SmartBank AI Advisor', icon: Sparkles },
    { id: 'threat-lab', label: 'Cyber Threat Lab', icon: Flame, badge: 'DEMO' },
    { id: 'phishing', label: 'AI Phishing Shield', icon: ShieldAlert },
    { id: 'malware', label: 'AI Malware Guard', icon: FileSearch },
    { id: 'ransomware', label: 'Ransomware Sentinel', icon: Lock },
    { id: 'correlation', label: 'Incident Correlation', icon: GitMerge },
    { id: 'security-center', label: 'Security Intelligence', icon: Radio },
    { id: 'alerts-page', label: 'Alert Center', icon: AlertOctagon },
    { id: 'admin', label: 'Analyst & Admin Portal', icon: UserCog },
    { id: 'audit-logs', label: 'Audit Trail Logs', icon: History },
    { id: 'reports', label: 'Financial & Security Reports', icon: FileSpreadsheet },
    { id: 'java-architecture', label: 'Java Architecture & SQL', icon: Code2, badge: 'SPEC' }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--border-color)',
      padding: '1.25rem 0.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
      minHeight: 'calc(100vh - 65px)',
      flexShrink: 0
    }}>
      <div style={{ padding: '0.5rem 0.75rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Navigation Modules
      </div>

      {menuItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.7rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: isActive ? 'var(--accent-light)' : 'transparent',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Icon size={19} color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'} />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="badge badge-high" style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem' }}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Role: <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{userRole}</span>
        </p>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Explainable AI Security Engine v2.4
        </p>
      </div>
    </aside>
  );
}
