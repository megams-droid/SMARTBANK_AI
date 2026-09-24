import React from 'react';
import { 
  ShieldCheck, 
  Sun, 
  Moon, 
  Mic, 
  Bell, 
  PlusCircle, 
  UserCheck, 
  Cpu, 
  Flame,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  openVoiceAssistant, 
  alertsCount, 
  openAlertsModal, 
  openCreateAlertModal,
  userRole,
  setUserRole,
  isListening,
  speechMuted,
  toggleMute
}) {
  return (
    <header className="navbar-header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.875rem 1.75rem',
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Brand Logo & Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
        }}>
          <ShieldCheck size={26} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              SmartBank <span style={{ color: 'var(--accent-primary)' }}>AI</span>
            </h1>
            <span className="badge badge-low" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
              PROTOTYPE
            </span>
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Bank Smarter. Detect Threats. Protect Every Transaction.
          </p>
        </div>
      </div>

      {/* Center Actions: Voice AI & Alert Creator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Voice AI Assistant Button */}
        <button
          onClick={openVoiceAssistant}
          className={`btn ${isListening ? 'listening-pulse' : ''}`}
          style={{
            background: isListening ? '#ef4444' : 'var(--accent-light)',
            color: isListening ? '#ffffff' : 'var(--accent-primary)',
            border: '1px solid var(--border-accent)',
            padding: '0.55rem 1.1rem',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}
          title="Open AI Voice Assistant"
        >
          <Mic size={18} className={isListening ? 'animate-bounce' : ''} />
          <span>{isListening ? 'Listening...' : 'AI Voice Assistant'}</span>
          <span style={{
            fontSize: '0.65rem',
            background: isListening ? 'rgba(255,255,255,0.3)' : 'var(--accent-primary)',
            color: '#ffffff',
            padding: '0.1rem 0.4rem',
            borderRadius: '6px',
            marginLeft: '0.2rem'
          }}>
            VOICE AI
          </span>
        </button>

        {/* Audio Speech Mute Toggle */}
        <button
          onClick={toggleMute}
          className="btn btn-outline"
          style={{ padding: '0.55rem', borderRadius: '50%' }}
          title={speechMuted ? "Unmute Assistant Voice" : "Mute Assistant Voice"}
        >
          {speechMuted ? <VolumeX size={18} color="var(--danger)" /> : <Volume2 size={18} color="var(--success)" />}
        </button>

        {/* Make an Alert Button */}
        <button
          onClick={openCreateAlertModal}
          className="btn btn-secondary"
          style={{
            padding: '0.55rem 0.95rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            borderColor: 'var(--warning)',
            color: 'var(--warning-dark, #b45309)',
            backgroundColor: 'var(--warning-light)'
          }}
          title="Trigger a custom alert"
        >
          <PlusCircle size={17} />
          <span>Make Alert</span>
        </button>
      </div>

      {/* Right Controls: Theme Switcher, Alerts Bell & Role Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* White / Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-outline"
          style={{
            padding: '0.55rem 0.95rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            fontSize: '0.825rem',
            backgroundColor: theme === 'light' ? '#ffffff' : 'var(--bg-tertiary)',
            boxShadow: 'var(--shadow-sm)'
          }}
          title={`Currently in ${theme.toUpperCase()} MODE. Click to switch.`}
        >
          {theme === 'light' ? (
            <>
              <Sun size={18} color="#f59e0b" />
              <span>White Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} color="#60a5fa" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* Active Alerts Bell Indicator */}
        <button
          onClick={openAlertsModal}
          className="btn btn-outline"
          style={{
            position: 'relative',
            padding: '0.55rem',
            borderRadius: '50%'
          }}
          title="View Active Security & Financial Alerts"
        >
          <Bell size={19} color="var(--text-primary)" />
          {alertsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              backgroundColor: 'var(--danger)',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 2px var(--bg-card)'
            }}>
              {alertsCount}
            </span>
          )}
        </button>

        {/* Role Switcher (Customer / Security Analyst / Admin) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
          <UserCheck size={16} color="var(--accent-primary)" />
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="CUSTOMER">Customer View</option>
            <option value="ANALYST">Security Analyst</option>
            <option value="ADMIN">System Admin</option>
          </select>
        </div>
      </div>
    </header>
  );
}
