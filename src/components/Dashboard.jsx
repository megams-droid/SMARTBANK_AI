import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertTriangle,
  Flame,
  ChevronRight
} from 'lucide-react';

export default function Dashboard({ 
  user, 
  accounts, 
  financialSummary, 
  transactions, 
  alerts, 
  securityScore, 
  setActiveTab,
  onRunSimulation
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'var(--accent-gradient)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem 2rem',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', marginBottom: '0.5rem' }}>
            SmartBank AI Protection Active
          </span>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800 }}>Welcome back, {user.name}!</h2>
          <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Account: {user.accountNumber} | AI Threat Defense & Financial Advisor active
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => setActiveTab('threat-lab')}
            className="btn"
            style={{ background: '#ffffff', color: 'var(--accent-primary)', fontWeight: 700 }}
          >
            <Flame size={18} color="var(--danger)" />
            <span>Threat Simulation Lab</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Total Balance */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL BALANCE</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
              <Wallet size={20} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            ₹{financialSummary.totalBalance.toLocaleString('en-IN')}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, marginTop: '0.25rem' }}>
            +4.2% interest accrual rate
          </p>
        </div>

        {/* Monthly Income */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>MONTHLY INCOME</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            ₹{financialSummary.monthlyIncome.toLocaleString('en-IN')}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Verified regular salary credit
          </p>
        </div>

        {/* Monthly Expenses */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>MONTHLY EXPENSES</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--danger-light)', color: 'var(--danger)' }}>
              <TrendingDown size={20} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            ₹{financialSummary.monthlyExpenses.toLocaleString('en-IN')}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 600, marginTop: '0.25rem' }}>
            Shopping budget at 87% limit
          </p>
        </div>

        {/* Net Savings */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>SAVINGS (37%)</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--info-light)', color: 'var(--info)' }}>
              <PiggyBank size={20} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            ₹{financialSummary.savings.toLocaleString('en-IN')}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, marginTop: '0.25rem' }}>
            Target laptop goal on track
          </p>
        </div>

        {/* Security Score */}
        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>SECURITY SCORE</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)' }}>
              <ShieldCheck size={20} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--success)' }}>
            {securityScore} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Status: OPTIMAL DEFENSE
          </p>
        </div>
      </div>

      {/* Main Grid: Spending Analytics & Smart AI Insight */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Spending Breakdown Chart Container */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Monthly Spending Breakdown</h3>
            <button onClick={() => setActiveTab('finance')} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>
              View Analytics Details
            </button>
          </div>

          {/* Dynamic SVG / CSS Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { category: 'Shopping', spent: 8700, limit: 10000, color: '#f59e0b' },
              { category: 'Food & Dining', spent: 4800, limit: 8000, color: '#3b82f6' },
              { category: 'Utilities & Bills', spent: 3400, limit: 5000, color: '#10b981' },
              { category: 'Travel & Commute', spent: 2900, limit: 6000, color: '#8b5cf6' },
              { category: 'Entertainment', spent: 1500, limit: 4000, color: '#ec4899' }
            ].map((item, idx) => {
              const pct = Math.min(100, Math.round((item.spent / item.limit) * 100));
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    <span>{item.category}</span>
                    <span>₹{item.spent.toLocaleString('en-IN')} / ₹{item.limit.toLocaleString('en-IN')} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      backgroundColor: item.color,
                      borderRadius: '9999px',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explainable AI Advisor Card */}
        <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sparkles size={22} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>SmartBank AI Insight</h3>
          </div>

          <div style={{ background: 'var(--accent-light)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
              💡 Explainable Budget Forecast
            </p>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              Shopping category spending increased by 22% this week (₹8,700 spent of ₹10,000 budget). 
              Our predictive engine estimates a budget overrun of ₹1,400 by end-of-month if unmanaged.
            </p>
            <div style={{ marginTop: '0.75rem', fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              * Labeled as: <strong style={{ color: 'var(--accent-primary)' }}>Estimated / Predicted Model</strong>
            </div>
          </div>

          <button onClick={() => setActiveTab('ai-advisor')} className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>
            <span>Ask SmartBank AI Advisor</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Activity & Risk Engine Status</h3>
          <button onClick={() => setActiveTab('accounts')} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>
            View All Transactions
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Date & Time</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Merchant / Recipient</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Category</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Amount</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>AI Risk Score</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map(tx => (
              <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{tx.date}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{tx.merchant}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span className="badge badge-low" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {tx.category}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: tx.type === 'CREDIT' ? 'var(--success)' : 'var(--text-primary)' }}>
                  {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span className={`badge ${tx.riskScore > 60 ? 'badge-high' : tx.riskScore > 30 ? 'badge-medium' : 'badge-low'}`}>
                    {tx.riskScore}/100 ({tx.riskLevel})
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--success)', fontWeight: 600 }}>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
