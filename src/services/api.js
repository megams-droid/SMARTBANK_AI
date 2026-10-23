// SmartBank AI Frontend REST API Client Service

const API_BASE = '/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[SmartBank API] Notice on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Health
  checkHealth: () => request('/health'),

  // User & Auth
  getMe: () => request('/auth/me'),
  login: (role) => request('/auth/login', { method: 'POST', body: JSON.stringify({ role }) }),

  // Accounts
  getAccounts: () => request('/accounts'),
  toggleFreezeAccount: (id) => request(`/accounts/${id}/freeze`, { method: 'POST' }),

  // Beneficiaries
  getBeneficiaries: () => request('/beneficiaries'),
  addBeneficiary: (data) => request('/beneficiaries', { method: 'POST', body: JSON.stringify(data) }),

  // Transactions & Transfer
  getTransactions: () => request('/transactions'),
  transferFunds: (transferData) => request('/transactions/transfer', {
    method: 'POST',
    body: JSON.stringify(transferData)
  }),

  // Budgets & Goals
  getBudgets: () => request('/budgets'),
  getGoals: () => request('/goals'),

  // Cyber Threat Lab Simulation
  simulateAttack: (scenario) => request('/threat-lab/simulate', {
    method: 'POST',
    body: JSON.stringify({ scenario })
  }),

  // Incidents
  getIncidents: () => request('/incidents'),

  // Alerts
  getAlerts: () => request('/alerts'),
  createAlert: (alertData) => request('/alerts', { method: 'POST', body: JSON.stringify(alertData) }),
  resolveAlert: (id) => request(`/alerts/${id}/resolve`, { method: 'PUT' }),

  // Audit Logs
  getAuditLogs: () => request('/audit-logs'),

  // Reports
  getReportsSummary: () => request('/reports/summary')
};
