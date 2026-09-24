// Initial Demo Mock Data for SmartBank AI System

export const INITIAL_USER = {
  id: 'USR-8821',
  name: 'Demo Customer',
  email: 'customer@smartbank.ai',
  role: 'CUSTOMER', // CUSTOMER, ADMIN, ANALYST
  phone: '+91 98765 43210',
  accountNumber: 'SB-3091-8842-10',
  securityScore: 94,
  joinedDate: '2025-01-15'
};

export const INITIAL_ACCOUNTS = [
  { id: 'ACC-01', type: 'Savings Account', number: 'SB-3091-8842-10', balance: 50000, status: 'ACTIVE', interest: '4.0% p.a.' },
  { id: 'ACC-02', type: 'Current Account', number: 'CA-9041-7711-05', balance: 25000, status: 'ACTIVE', interest: 'N/A' },
  { id: 'ACC-03', type: 'Fixed Deposit', number: 'FD-1088-3329-88', balance: 100000, status: 'ACTIVE', interest: '7.2% p.a.', maturity: '2027-03-31' }
];

export const INITIAL_FINANCIAL_SUMMARY = {
  monthlyIncome: 50000,
  monthlyExpenses: 31500,
  savings: 18500,
  savingsRate: 37,
  totalBalance: 75000
};

export const INITIAL_BENEFICIARIES = [
  { id: 'BEN-1', name: 'Rahul Sharma', account: 'SB-1122-3344', bank: 'HDFC Bank', addedDate: '2026-08-10', verified: true },
  { id: 'BEN-2', name: 'Priya Verma', account: 'SB-5566-7788', bank: 'ICICI Bank', addedDate: '2026-09-01', verified: true },
  { id: 'BEN-3', name: 'Unknown Recipient (CryptoPay)', account: 'CRYPTO-9900', bank: 'Global Offshore Bank', addedDate: '2026-09-24', verified: false }
];

export const INITIAL_TRANSACTIONS = [
  { id: 'TXN-901', date: '2026-09-24 14:30', merchant: 'Supermarket Groceries', category: 'Food', amount: 1850, type: 'DEBIT', status: 'COMPLETED', riskScore: 5, riskLevel: 'LOW' },
  { id: 'TXN-902', date: '2026-09-23 19:15', merchant: 'Salary Credit - TechCorp', category: 'Income', amount: 50000, type: 'CREDIT', status: 'COMPLETED', riskScore: 0, riskLevel: 'LOW' },
  { id: 'TXN-903', date: '2026-09-22 11:00', merchant: 'Rahul Sharma (Transfer)', category: 'Transfer', amount: 4500, type: 'DEBIT', status: 'COMPLETED', riskScore: 12, riskLevel: 'LOW' },
  { id: 'TXN-904', date: '2026-09-21 16:45', merchant: 'Zomato Food Order', category: 'Food', amount: 620, type: 'DEBIT', status: 'COMPLETED', riskScore: 8, riskLevel: 'LOW' },
  { id: 'TXN-905', date: '2026-09-20 20:10', merchant: 'Amazon India Shopping', category: 'Shopping', amount: 8700, type: 'DEBIT', status: 'COMPLETED', riskScore: 25, riskLevel: 'LOW' },
  { id: 'TXN-906', date: '2026-09-18 09:30', merchant: 'Electricity Bill Payment', category: 'Utilities', amount: 2400, type: 'DEBIT', status: 'COMPLETED', riskScore: 5, riskLevel: 'LOW' }
];

export const INITIAL_BUDGETS = [
  { id: 'BDG-1', category: 'Shopping', limit: 10000, spent: 8700, threshold: 80, warningAlert: true },
  { id: 'BDG-2', category: 'Food & Dining', limit: 8000, spent: 4800, threshold: 80, warningAlert: false },
  { id: 'BDG-3', category: 'Travel & Commute', limit: 6000, spent: 2900, threshold: 80, warningAlert: false },
  { id: 'BDG-4', category: 'Utilities & Bills', limit: 5000, spent: 3400, threshold: 80, warningAlert: false },
  { id: 'BDG-5', category: 'Entertainment', limit: 4000, spent: 1500, threshold: 80, warningAlert: false }
];

export const INITIAL_GOALS = [
  { id: 'G-1', title: 'New Laptop (M3 Pro)', targetAmount: 150000, currentAmount: 95000, targetDate: '2026-12-31', suggestedMonthly: 18333 },
  { id: 'G-2', title: 'Emergency Fund', targetAmount: 200000, currentAmount: 140000, targetDate: '2027-06-30', suggestedMonthly: 6666 },
  { id: 'G-3', title: 'Europe Vacation', targetAmount: 250000, currentAmount: 70000, targetDate: '2027-10-15', suggestedMonthly: 13846 }
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-101',
    timestamp: '2026-09-24 18:30',
    title: 'Budget Approaching Limit',
    category: 'BUDGET',
    severity: 'MEDIUM',
    riskScore: 45,
    message: 'Shopping Budget: ₹10,000 — Used: ₹8,700 (87%). You are approaching your monthly threshold.',
    status: 'ACTIVE',
    recommendation: 'Review remaining non-essential purchases for this month.'
  },
  {
    id: 'ALT-102',
    timestamp: '2026-09-24 16:15',
    title: 'Suspicious Domain Phishing Scan',
    category: 'PHISHING',
    severity: 'HIGH',
    riskScore: 92,
    message: 'Phishing Shield flagged target "smartbank-login.xyz" as High Risk lookalike domain.',
    status: 'ACTIVE',
    recommendation: 'Do NOT input credentials. Block host domain in firewall.'
  }
];

export const INITIAL_INCIDENTS = [
  {
    id: 'INC-2026-001',
    threatType: 'Account Takeover Attempt',
    riskScore: 89,
    severity: 'CRITICAL',
    status: 'UNDER_INVESTIGATION',
    timestamp: '2026-09-24 17:45',
    affectedAccount: 'SB-3091-8842-10',
    timeline: [
      { time: '17:40:02', event: 'Suspicious Login Attempt from new IP (185.220.101.5)', risk: 'MEDIUM' },
      { time: '17:41:15', event: 'New Device Fingerprint registered (Android 14 Chrome)', risk: 'MEDIUM' },
      { time: '17:42:30', event: 'Password Reset Request initiated', risk: 'HIGH' },
      { time: '17:44:00', event: 'Newly added Beneficiary (CryptoPay)', risk: 'HIGH' },
      { time: '17:45:10', event: 'High Value Transfer ₹65,000 requested', risk: 'CRITICAL' }
    ],
    evidence: [
      'IP Geolocation mismatch: Login location Russia/Tor exit node',
      'Transaction amount ₹65,000 is 13x higher than daily average',
      'Unverified recipient added 4 minutes prior to transaction'
    ],
    recommendedAction: 'Freeze affected account session immediately and require mandatory in-branch or video KYC verification.'
  }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 'LOG-701', timestamp: '2026-09-24 18:45:12', user: 'customer@smartbank.ai', action: 'LOGIN_SUCCESS', result: 'ALLOWED', riskLevel: 'LOW', details: 'Web portal login from Chrome 128 / macOS' },
  { id: 'LOG-702', timestamp: '2026-09-24 18:30:05', user: 'customer@smartbank.ai', action: 'BUDGET_WARNING', result: 'ALERTED', riskLevel: 'MEDIUM', details: 'Shopping budget exceeded 80% threshold' },
  { id: 'LOG-703', timestamp: '2026-09-24 16:15:40', user: 'customer@smartbank.ai', action: 'PHISHING_SCAN', result: 'HIGH_RISK', riskLevel: 'HIGH', details: 'Scanned URL smartbank-login.xyz — Risk Score 92/100' },
  { id: 'LOG-704', timestamp: '2026-09-24 14:30:22', user: 'customer@smartbank.ai', action: 'TRANSACTION_CREATED', result: 'ALLOWED', riskLevel: 'LOW', details: 'Debit ₹1,850 at Supermarket Groceries' },
  { id: 'LOG-705', timestamp: '2026-09-24 12:10:00', user: 'system_monitor', action: 'BACKGROUND_SCAN', result: 'HEALTHY', riskLevel: 'LOW', details: 'Scheduled security scan completed — 0 active malware threats' }
];
