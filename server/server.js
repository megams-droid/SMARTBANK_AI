import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5002;

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// In-Memory Database Store matching schema.sql
const db = {
  user: {
    id: 'USR-8821',
    name: 'MEGA SREE MS',
    registerNumber: '711525BCS092',
    institution: 'Kalaignarkarunanidhi Institute of Technology, Coimbatore',
    department: 'Computer Science and Engineering (CSE-C)',
    email: 'megasree.711525bcs092@kit.ac.in',
    role: 'CUSTOMER',
    accountNumber: 'SB-3091-8842-10',
    securityScore: 94,
    joinedDate: '2025-01-15'
  },
  accounts: [
    { id: 'ACC-01', type: 'Savings Account', number: 'SB-3091-8842-10', balance: 50000, status: 'ACTIVE', interest: '4.0% p.a.' },
    { id: 'ACC-02', type: 'Current Account', number: 'CA-9041-7711-05', balance: 25000, status: 'ACTIVE', interest: 'N/A' },
    { id: 'ACC-03', type: 'Fixed Deposit', number: 'FD-1088-3329-88', balance: 100000, status: 'ACTIVE', interest: '7.2% p.a.', maturity: '2027-03-31' }
  ],
  beneficiaries: [
    { id: 'BEN-1', name: 'Rahul Sharma', account: 'SB-1122-3344', bank: 'HDFC Bank', addedDate: '2026-08-10', verified: true },
    { id: 'BEN-2', name: 'Priya Verma', account: 'SB-5566-7788', bank: 'ICICI Bank', addedDate: '2026-09-01', verified: true },
    { id: 'BEN-3', name: 'Unknown Recipient (CryptoPay)', account: 'CRYPTO-9900', bank: 'Global Offshore Bank', addedDate: '2026-09-24', verified: false }
  ],
  transactions: [
    { id: 'TXN-901', date: '2026-09-24 14:30', merchant: 'Supermarket Groceries', category: 'Food', amount: 1850, type: 'DEBIT', status: 'COMPLETED', riskScore: 5, riskLevel: 'LOW' },
    { id: 'TXN-902', date: '2026-09-23 19:15', merchant: 'Salary Credit - TechCorp', category: 'Income', amount: 50000, type: 'CREDIT', status: 'COMPLETED', riskScore: 0, riskLevel: 'LOW' },
    { id: 'TXN-903', date: '2026-09-22 11:00', merchant: 'Rahul Sharma (Transfer)', category: 'Transfer', amount: 4500, type: 'DEBIT', status: 'COMPLETED', riskScore: 12, riskLevel: 'LOW' },
    { id: 'TXN-904', date: '2026-09-21 16:45', merchant: 'Zomato Food Order', category: 'Food', amount: 620, type: 'DEBIT', status: 'COMPLETED', riskScore: 8, riskLevel: 'LOW' },
    { id: 'TXN-905', date: '2026-09-20 20:10', merchant: 'Amazon India Shopping', category: 'Shopping', amount: 8700, type: 'DEBIT', status: 'COMPLETED', riskScore: 25, riskLevel: 'LOW' },
    { id: 'TXN-906', date: '2026-09-18 09:30', merchant: 'Electricity Bill Payment', category: 'Utilities', amount: 2400, type: 'DEBIT', status: 'COMPLETED', riskScore: 5, riskLevel: 'LOW' }
  ],
  budgets: [
    { category: 'Food & Dining', spent: 8450, total: 12000, color: 'var(--accent-primary)' },
    { category: 'Shopping', spent: 9200, total: 10000, color: 'var(--warning)' },
    { category: 'Utilities & Bills', spent: 4800, total: 8000, color: 'var(--success)' },
    { category: 'Entertainment', spent: 3200, total: 5000, color: 'var(--info)' }
  ],
  goals: [
    { id: 'G-1', name: 'Emergency Security Fund', current: 65000, target: 100000, deadline: '2026-12-31' },
    { id: 'G-2', name: 'MacBook Pro M3 Fund', current: 90000, target: 150000, deadline: '2027-02-28' },
    { id: 'G-3', name: 'Annual Insurance Policy', current: 15000, target: 25000, deadline: '2026-11-15' }
  ],
  alerts: [
    {
      id: 'ALT-101',
      timestamp: '2026-09-24 14:32',
      title: 'High Velocity Transfer Spike Alert',
      category: 'VELOCITY_FRAUD',
      severity: 'HIGH',
      riskScore: 78,
      message: 'Multiple outbound transaction attempts detected within 90 seconds exceeding threshold baseline.',
      status: 'ACTIVE',
      recommendation: 'Temporarily restrict high-value transfers and mandate MFA token entry.'
    },
    {
      id: 'ALT-102',
      timestamp: '2026-09-23 03:15',
      title: 'Unfamiliar Device Login Blocked',
      category: 'AUTHENTICATION',
      severity: 'MEDIUM',
      riskScore: 62,
      message: 'Login attempt from IP 185.220.101.5 (Tor Exit Node) using unrecognized device fingerprint.',
      status: 'ACTIVE',
      recommendation: 'Issue instant push confirmation to authorized mobile device.'
    }
  ],
  incidents: [
    {
      id: 'INC-2026-001',
      title: 'Coordinated Account Takeover (ATO) Sequence',
      severity: 'CRITICAL',
      confidenceScore: 92,
      status: 'INVESTIGATING',
      detectedAt: '2026-09-24 04:15:22',
      analystAssigned: 'Cyber Defense SOC Tier-2',
      rootCause: 'Compromised password from external breach database matched against phishing telemetry.',
      timeline: [
        { time: '04:10:12', event: 'Suspicious Login Attempt from IP 185.220.101.5 (Tor Exit Node)' },
        { time: '04:11:45', event: 'Unrecognized Device Fingerprint (Linux/Android 14 Chrome)' },
        { time: '04:12:30', event: 'Account Profile Details & Password Reset Requested' },
        { time: '04:13:50', event: 'New Beneficiary "CryptoPay Offshore" Enrolled' },
        { time: '04:15:10', event: 'High Value Transfer Request of ₹95,000 Initiated' }
      ]
    }
  ],
  auditLogs: [
    { id: 'LOG-5501', timestamp: '2026-09-24 14:35:10', user: 'MEGA SREE MS', action: 'TRANSFER_REQUEST', status: 'SUCCESS', ip: '192.168.1.12', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { id: 'LOG-5502', timestamp: '2026-09-24 14:32:05', user: 'SYSTEM_DAEMON', action: 'THREAT_ALERT_TRIGGERED', status: 'WARNING', ip: '127.0.0.1', hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069' },
    { id: 'LOG-5503', timestamp: '2026-09-24 12:10:44', user: 'MEGA SREE MS', action: 'BENEFICIARY_ADDED', status: 'SUCCESS', ip: '192.168.1.12', hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb' }
  ]
};

// Cryptographic hash helper for audit logs
function generateHash(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data) + Date.now()).digest('hex');
}

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'SmartBank AI Core Backend Server',
    developer: 'MEGA SREE MS (711525BCS092)',
    institution: 'Kalaignarkarunanidhi Institute of Technology, Coimbatore',
    timestamp: new Date().toISOString()
  });
});

// User & Auth
app.get('/api/auth/me', (req, res) => {
  res.json({ success: true, user: db.user });
});

app.post('/api/auth/login', (req, res) => {
  const { role } = req.body;
  if (role) db.user.role = role;
  res.json({ success: true, user: db.user, token: 'mock-jwt-token-smartbank' });
});

// Accounts
app.get('/api/accounts', (req, res) => {
  res.json({ success: true, accounts: db.accounts });
});

app.post('/api/accounts/:id/freeze', (req, res) => {
  const account = db.accounts.find(a => a.id === req.params.id);
  if (account) {
    account.status = account.status === 'FROZEN' ? 'ACTIVE' : 'FROZEN';
    res.json({ success: true, account });
  } else {
    res.status(404).json({ success: false, error: 'Account not found' });
  }
});

// Beneficiaries
app.get('/api/beneficiaries', (req, res) => {
  res.json({ success: true, beneficiaries: db.beneficiaries });
});

app.post('/api/beneficiaries', (req, res) => {
  const { name, account, bank } = req.body;
  const newBen = {
    id: `BEN-${db.beneficiaries.length + 1}`,
    name,
    account,
    bank,
    addedDate: new Date().toISOString().substring(0, 10),
    verified: false
  };
  db.beneficiaries.push(newBen);
  res.json({ success: true, beneficiary: newBen });
});

// Transactions & Atomic Funds Transfer with XAI Fraud Detection
app.get('/api/transactions', (req, res) => {
  res.json({ success: true, transactions: db.transactions });
});

app.post('/api/transactions/transfer', (req, res) => {
  const { fromAccountId, beneficiaryName, amount, isNewBeneficiary, isUnfamiliarDevice } = req.body;
  const numAmount = parseFloat(amount);

  const account = db.accounts.find(a => a.id === fromAccountId) || db.accounts[0];
  if (!account) return res.status(400).json({ success: false, error: 'Source account invalid' });

  if (account.status === 'FROZEN') {
    return res.status(403).json({ success: false, error: 'Account is frozen by security protocol' });
  }

  // Pre-flight Explainable AI Fraud Risk Check
  const signals = [];
  let riskScore = 10;

  if (numAmount > 50000) {
    riskScore += 35;
    signals.push({ name: 'High Value Amount', weight: 35, detail: `Amount ₹${numAmount.toLocaleString('en-IN')} exceeds threshold` });
  } else if (numAmount > 20000) {
    riskScore += 20;
    signals.push({ name: 'Above Average Amount', weight: 20, detail: `Amount ₹${numAmount.toLocaleString('en-IN')} is higher than baseline` });
  }

  if (isNewBeneficiary) {
    riskScore += 30;
    signals.push({ name: 'Newly Added Beneficiary', weight: 30, detail: `Recipient '${beneficiaryName}' added recently` });
  }

  if (isUnfamiliarDevice) {
    riskScore += 20;
    signals.push({ name: 'Unfamiliar Device Fingerprint', weight: 20, detail: 'Hardware signature mismatch' });
  }

  riskScore = Math.min(100, Math.max(0, riskScore));
  const riskLevel = riskScore >= 80 ? 'CRITICAL' : riskScore >= 60 ? 'HIGH' : riskScore >= 35 ? 'MEDIUM' : 'LOW';

  // If Critical/High risk, log security alert
  let alertTriggered = null;
  if (riskScore >= 60) {
    alertTriggered = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      title: `High Risk Transfer Flagged (${riskScore}/100)`,
      category: 'FRAUD_DEFENSE',
      severity: riskLevel,
      riskScore,
      message: `Transfer of ₹${numAmount.toLocaleString('en-IN')} to ${beneficiaryName} flagged by Explainable AI engine.`,
      status: 'ACTIVE',
      recommendation: 'Require mandatory OTP/Biometric confirmation before final clearance.'
    };
    db.alerts.unshift(alertTriggered);
  }

  // Update account balance
  account.balance = Math.max(0, account.balance - numAmount);

  const newTx = {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    merchant: `${beneficiaryName} (Transfer)`,
    category: 'Transfer',
    amount: numAmount,
    type: 'DEBIT',
    status: riskScore >= 80 ? 'FLAG_HIGH_RISK' : 'COMPLETED',
    riskScore,
    riskLevel
  };
  db.transactions.unshift(newTx);

  // Add immutable audit log
  const audit = {
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    user: db.user.name,
    action: 'TRANSFER_FUNDS',
    status: riskScore >= 80 ? 'FLAGGED_HIGH_RISK' : 'SUCCESS',
    ip: '192.168.1.12',
    hash: generateHash(newTx)
  };
  db.auditLogs.unshift(audit);

  res.json({
    success: true,
    transaction: newTx,
    account,
    riskScore,
    riskLevel,
    signals,
    alertTriggered
  });
});

// Budgets & Goals
app.get('/api/budgets', (req, res) => res.json({ success: true, budgets: db.budgets }));
app.get('/api/goals', (req, res) => res.json({ success: true, goals: db.goals }));

// Cyber Threat Lab Synthetic Simulation Triggers
app.post('/api/threat-lab/simulate', (req, res) => {
  const { scenario } = req.body;
  let alert = null;
  let incident = null;

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

  if (scenario === 'FRAUD_BURST') {
    alert = {
      id: `ALT-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: now,
      title: 'SYNTHETIC SIMULATION: High Velocity Transfer Burst',
      category: 'VELOCITY_FRAUD',
      severity: 'CRITICAL',
      riskScore: 88,
      message: 'Rapid burst of 4 outbound transfers detected in 45 seconds to new offshore account.',
      status: 'ACTIVE',
      recommendation: 'Lock outbound transaction queue and mandate user re-authentication.'
    };
    db.alerts.unshift(alert);
  } else if (scenario === 'PHISHING_ATTACK') {
    alert = {
      id: `ALT-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: now,
      title: 'SYNTHETIC SIMULATION: Credential Harvesting Lure Detected',
      category: 'PHISHING_SHIELD',
      severity: 'HIGH',
      riskScore: 82,
      message: 'Detected active lookalike domain smartbank-verify.net attempting credential harvesting.',
      status: 'ACTIVE',
      recommendation: 'Submit domain to anti-phishing registrar blocklist and notify users.'
    };
    db.alerts.unshift(alert);
  } else if (scenario === 'MALWARE_DROP') {
    alert = {
      id: `ALT-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: now,
      title: 'SYNTHETIC SIMULATION: Double-Extension Malware Quarantined',
      category: 'MALWARE_GUARD',
      severity: 'CRITICAL',
      riskScore: 92,
      message: 'Isolated suspicious document bank_statement.pdf.exe containing Windows PE executable header.',
      status: 'ACTIVE',
      recommendation: 'File isolated in sandbox without execution; customer notified.'
    };
    db.alerts.unshift(alert);
  } else if (scenario === 'RANSOMWARE_CANARY') {
    alert = {
      id: `ALT-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: now,
      title: 'SYNTHETIC SIMULATION: Ransomware Honeypot Canary Breached',
      category: 'RANSOMWARE_SENTINEL',
      severity: 'CRITICAL',
      riskScore: 96,
      message: 'Canary decoy table canary_ledger_decoy breached with high Shannon entropy overwrite attempt.',
      status: 'ACTIVE',
      recommendation: 'Emergency protocol: DB session terminated, canary intact, zero user data affected.'
    };
    db.alerts.unshift(alert);
  } else if (scenario === 'ATO_SEQUENCE') {
    incident = {
      id: `INC-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      title: 'SYNTHETIC SIMULATION: Coordinated Account Takeover (ATO) Kill-Chain',
      severity: 'CRITICAL',
      confidenceScore: 95,
      status: 'CONTAINED',
      detectedAt: now,
      analystAssigned: 'SmartBank SOC Automated Defense Engine',
      rootCause: 'Tor Exit Node login -> New hardware enrollment -> Password reset -> High value wire attempt.',
      timeline: [
        { time: '00:00:10', event: 'Unusual IP Login (Tor Network)' },
        { time: '00:00:45', event: 'Unregistered Hardware Signature Enrolled' },
        { time: '00:01:20', event: 'Emergency Password Reset Triggered' },
        { time: '00:02:15', event: 'Exfiltration Beneficiary Added' },
        { time: '00:03:00', event: 'Large Transfer Blocked by Explainable AI Engine' }
      ]
    };
    db.incidents.unshift(incident);
  }

  // Record audit log for simulation
  const audit = {
    id: `LOG-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    user: 'THREAT_LAB_DEMO',
    action: `SIMULATED_${scenario}`,
    status: 'RECORDED',
    ip: '127.0.0.1',
    hash: generateHash({ scenario, now })
  };
  db.auditLogs.unshift(audit);

  res.json({
    success: true,
    scenario,
    alert,
    incident,
    audit
  });
});

// Incidents, Alerts & Audit Logs
app.get('/api/incidents', (req, res) => res.json({ success: true, incidents: db.incidents }));
app.get('/api/alerts', (req, res) => res.json({ success: true, alerts: db.alerts }));

app.post('/api/alerts', (req, res) => {
  const newAlert = {
    id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'ACTIVE',
    ...req.body
  };
  db.alerts.unshift(newAlert);
  res.json({ success: true, alert: newAlert });
});

app.put('/api/alerts/:id/resolve', (req, res) => {
  db.alerts = db.alerts.filter(a => a.id !== req.params.id);
  res.json({ success: true, resolvedId: req.params.id });
});

app.get('/api/audit-logs', (req, res) => res.json({ success: true, auditLogs: db.auditLogs }));

// Executive Reports Summary
app.get('/api/reports/summary', (req, res) => {
  res.json({
    success: true,
    student: {
      name: 'MEGA SREE MS',
      registerNumber: '711525BCS092',
      institution: 'Kalaignarkarunanidhi Institute of Technology, Coimbatore',
      department: 'Computer Science and Engineering (CSE-C)',
      academicYear: '2025-2029'
    },
    metrics: {
      totalAccounts: db.accounts.length,
      totalBalance: db.accounts.reduce((sum, a) => sum + a.balance, 0),
      totalTransactions: db.transactions.length,
      activeAlertsCount: db.alerts.length,
      incidentsCount: db.incidents.length,
      auditLogCount: db.auditLogs.length,
      securityScore: 94
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SmartBank AI REST API Server running at http://localhost:${PORT}`);
  console.log(`🔒 Student: MEGA SREE MS (711525BCS092) - CSE-C`);
});
