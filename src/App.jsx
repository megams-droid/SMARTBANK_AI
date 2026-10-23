import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VoiceAssistant from './components/VoiceAssistant';
import { AlertSystem } from './components/AlertSystem';
import Dashboard from './components/Dashboard';
import AccountsModule from './components/AccountsModule';
import AIFinanceAdvisor from './components/AIFinanceAdvisor';
import BudgetingModule from './components/BudgetingModule';
import ThreatLab from './components/ThreatLab';
import PhishingShield from './components/PhishingShield';
import MalwareGuard from './components/MalwareGuard';
import RansomwareSentinel from './components/RansomwareSentinel';
import IncidentCorrelation from './components/IncidentCorrelation';
import SecurityCenter from './components/SecurityCenter';
import AdminDashboard from './components/AdminDashboard';
import AuditLogs from './components/AuditLogs';
import ReportsModule from './components/ReportsModule';
import JavaArchitectureViewer from './components/JavaArchitectureViewer';

import { 
  INITIAL_USER, 
  INITIAL_ACCOUNTS, 
  INITIAL_FINANCIAL_SUMMARY, 
  INITIAL_BENEFICIARIES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_BUDGETS, 
  INITIAL_GOALS, 
  INITIAL_ALERTS, 
  INITIAL_INCIDENTS, 
  INITIAL_AUDIT_LOGS 
} from './services/mockData';
import { voiceEngine } from './services/voiceEngine';
import { playAlertSound } from './services/AudioAlert';
import { api } from './services/api';

export default function App() {
  // 1. Theme State (DEFAULT TO LIGHT / WHITE MODE AS REQUESTED BY USER)
  const [theme, setTheme] = useState('light');

  // 2. Navigation Tab State
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('tab');
      if (p) return p;
    }
    return 'dashboard';
  });
  const [userRole, setUserRole] = useState('CUSTOMER'); // CUSTOMER, ANALYST, ADMIN

  // 3. Application Data State
  const [user, setUser] = useState(INITIAL_USER);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [financialSummary, setFinancialSummary] = useState(INITIAL_FINANCIAL_SUMMARY);
  const [beneficiaries, setBeneficiaries] = useState(INITIAL_BENEFICIARIES);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState(INITIAL_BUDGETS);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [securityScore, setSecurityScore] = useState(94);

  // Hydrate data from backend REST API if available
  useEffect(() => {
    api.checkHealth()
      .then(() => Promise.all([
        api.getMe(),
        api.getAccounts(),
        api.getTransactions(),
        api.getBeneficiaries(),
        api.getAlerts(),
        api.getIncidents(),
        api.getAuditLogs()
      ]))
      .then(([userData, accData, txData, benData, alertData, incData, logData]) => {
        if (userData?.user) setUser(userData.user);
        if (accData?.accounts) setAccounts(accData.accounts);
        if (txData?.transactions) setTransactions(txData.transactions);
        if (benData?.beneficiaries) setBeneficiaries(benData.beneficiaries);
        if (alertData?.alerts) setAlerts(alertData.alerts);
        if (incData?.incidents) setIncidents(incData.incidents);
        if (logData?.auditLogs) setAuditLogs(logData.auditLogs);
      })
      .catch((err) => console.log('[SmartBank AI] Standalone client mode active:', err.message));
  }, []);

  // 4. Voice Assistant & Alert Modals State
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(false);
  const [activeAlertModal, setActiveAlertModal] = useState(null);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

  // Apply theme attribute to html tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle Theme Function
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    playAlertSound('info');
  };

  // Add new Alert & check if critical modal needed
  const handleAddAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
    if (newAlert.severity === 'HIGH' || newAlert.severity === 'CRITICAL') {
      setActiveAlertModal(newAlert);
    }
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleAddAuditLog = (log) => {
    setAuditLogs(prev => [log, ...prev]);
  };

  // Voice Command Execution Handler
  const handleExecuteVoiceCommand = (commandData) => {
    const { action, value, tab, title, message, severity, type } = commandData;

    if (action === 'SET_THEME') {
      setTheme(value);
    } else if (action === 'NAVIGATE') {
      setActiveTab(tab);
    } else if (action === 'TRIGGER_CUSTOM_ALERT') {
      handleAddAlert({
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: title || 'Voice Command Security Check Alert',
        category: 'SECURITY',
        severity: severity || 'HIGH',
        riskScore: 85,
        message: message || 'Security Alert generated via Voice Assistant NLP Command.',
        status: 'ACTIVE',
        recommendation: 'Verify active account sessions and review transaction logs.'
      });
    } else if (action === 'SIMULATE') {
      setActiveTab('threat-lab');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Navbar Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        openVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        alertsCount={alerts.length}
        openAlertsModal={() => setActiveTab('alerts-page')}
        openCreateAlertModal={() => setIsCreateAlertOpen(true)}
        userRole={userRole}
        setUserRole={setUserRole}
        isListening={voiceEngine.isListening}
        speechMuted={speechMuted}
        toggleMute={() => setSpeechMuted(voiceEngine.toggleMute())}
      />

      {/* Main Body Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />

        {/* Right Main Content Area */}
        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>
          {activeTab === 'dashboard' && (
            <Dashboard
              user={user}
              accounts={accounts}
              financialSummary={financialSummary}
              transactions={transactions}
              alerts={alerts}
              securityScore={securityScore}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'accounts' && (
            <AccountsModule
              accounts={accounts}
              beneficiaries={beneficiaries}
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onTriggerAlert={handleAddAlert}
            />
          )}

          {activeTab === 'finance' && (
            <BudgetingModule
              budgets={budgets}
              goals={goals}
              onAddBudget={(b) => setBudgets(prev => [...prev, b])}
              onAddGoal={(g) => setGoals(prev => [...prev, g])}
              onTriggerAlert={handleAddAlert}
            />
          )}

          {activeTab === 'ai-advisor' && (
            <AIFinanceAdvisor
              financialSummary={financialSummary}
              budgets={budgets}
              goals={goals}
            />
          )}

          {activeTab === 'threat-lab' && (
            <ThreatLab
              onTriggerAlert={handleAddAlert}
              onAddIncident={(inc) => setIncidents(prev => [inc, ...prev])}
              onAddAuditLog={handleAddAuditLog}
            />
          )}

          {activeTab === 'phishing' && (
            <PhishingShield onTriggerAlert={handleAddAlert} />
          )}

          {activeTab === 'malware' && (
            <MalwareGuard onTriggerAlert={handleAddAlert} />
          )}

          {activeTab === 'ransomware' && (
            <RansomwareSentinel
              onTriggerAlert={handleAddAlert}
              onAddAuditLog={handleAddAuditLog}
            />
          )}

          {activeTab === 'correlation' && (
            <IncidentCorrelation incidents={incidents} />
          )}

          {activeTab === 'security-center' && (
            <SecurityCenter securityScore={securityScore} alerts={alerts} />
          )}

          {activeTab === 'alerts-page' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Active Security & Financial Alert Center</h2>
                <button onClick={() => setIsCreateAlertOpen(true)} className="btn btn-primary">
                  + Make Custom Alert
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {alerts.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No active alerts. System status safe.</p>
                ) : (
                  alerts.map(a => (
                    <div key={a.id} className="card" style={{ borderLeft: `4px solid ${a.severity === 'CRITICAL' || a.severity === 'HIGH' ? 'var(--danger)' : 'var(--warning)'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{a.title} ({a.id})</h4>
                        <span className="badge badge-high">{a.severity}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: '0.5rem 0' }}>{a.message}</p>
                      <button onClick={() => handleResolveAlert(a.id)} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>
                        Acknowledge & Resolve Alert
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <AdminDashboard
              userRole={userRole}
              setUserRole={setUserRole}
              alerts={alerts}
              incidents={incidents}
            />
          )}

          {activeTab === 'audit-logs' && (
            <AuditLogs logs={auditLogs} />
          )}

          {activeTab === 'reports' && (
            <ReportsModule
              financialSummary={financialSummary}
              transactions={transactions}
              alerts={alerts}
              incidents={incidents}
              securityScore={securityScore}
            />
          )}

          {activeTab === 'java-architecture' && (
            <JavaArchitectureViewer />
          )}
        </main>
      </div>

      {/* Interactive AI Voice Assistant Modal */}
      <VoiceAssistant
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        onExecuteCommand={handleExecuteVoiceCommand}
        speechMuted={speechMuted}
        toggleMute={() => setSpeechMuted(voiceEngine.toggleMute())}
        theme={theme}
      />

      {/* Global Alert System Modal & Make Alert Form */}
      <AlertSystem
        alerts={alerts}
        onResolveAlert={handleResolveAlert}
        onAddAlert={handleAddAlert}
        activeAlertModal={activeAlertModal}
        closeAlertModal={() => setActiveAlertModal(null)}
        isCreateAlertOpen={isCreateAlertOpen}
        closeCreateAlertModal={() => setIsCreateAlertOpen(false)}
      />
    </div>
  );
}
