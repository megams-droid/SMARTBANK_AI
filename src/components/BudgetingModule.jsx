import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, Plus, CheckCircle2, DollarSign } from 'lucide-react';
import { playAlertSound } from '../services/AudioAlert';

export default function BudgetingModule({ budgets, goals, onAddBudget, onAddGoal, onTriggerAlert }) {
  const [newCategory, setNewCategory] = useState('Education');
  const [newLimit, setNewLimit] = useState('');
  
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDate, setGoalDate] = useState('');

  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (!newLimit) return;
    const limitNum = Number(newLimit);
    onAddBudget({
      id: `BDG-${Math.floor(Math.random()*1000)}`,
      category: newCategory,
      limit: limitNum,
      spent: 0,
      threshold: 80,
      warningAlert: false
    });
    setNewLimit('');
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;
    const targetNum = Number(goalTarget);
    onAddGoal({
      id: `G-${Math.floor(Math.random()*1000)}`,
      title: goalTitle,
      targetAmount: targetNum,
      currentAmount: 0,
      targetDate: goalDate || '2027-12-31',
      suggestedMonthly: Math.round(targetNum / 12)
    });
    setGoalTitle('');
    setGoalTarget('');
    setGoalDate('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Budget Management & Financial Goals</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Set spending limits with automatic threshold alerts & track savings targets
        </p>
      </div>

      {/* Category Budgets Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Category Budgets</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {budgets.map(b => {
            const pct = Math.round((b.spent / b.limit) * 100);
            const isWarning = pct >= b.threshold;
            return (
              <div key={b.id} className="card" style={{ borderLeft: `4px solid ${isWarning ? 'var(--warning)' : 'var(--success)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{b.category}</h4>
                  <span className={`badge ${isWarning ? 'badge-medium' : 'badge-low'}`}>
                    {pct}% Used
                  </span>
                </div>

                <p style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.35rem 0', color: 'var(--text-primary)' }}>
                  ₹{b.spent.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ ₹{b.limit.toLocaleString('en-IN')}</span>
                </p>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '9999px', overflow: 'hidden', margin: '0.5rem 0' }}>
                  <div style={{
                    width: `${Math.min(100, pct)}%`,
                    height: '100%',
                    backgroundColor: isWarning ? 'var(--warning)' : 'var(--success)',
                    borderRadius: '9999px'
                  }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Remaining: ₹{(b.limit - b.spent).toLocaleString('en-IN')}</span>
                  <span>Threshold: {b.threshold}%</span>
                </div>

                {isWarning && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--warning-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--warning-dark, #b45309)', fontWeight: 700 }}>
                    <AlertTriangle size={14} />
                    <span>Warning: Approaching budget limit threshold!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Goals Section */}
      <div style={{ marginTop: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Savings & Financial Goals</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {goals.map(g => {
            const pct = Math.round((g.currentAmount / g.targetAmount) * 100);
            return (
              <div key={g.id} className="card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{g.title}</h4>
                  <span className="badge badge-low">{pct}% Progress</span>
                </div>

                <p style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.35rem 0', color: 'var(--text-primary)' }}>
                  ₹{g.currentAmount.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ ₹{g.targetAmount.toLocaleString('en-IN')}</span>
                </p>

                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '9999px', overflow: 'hidden', margin: '0.5rem 0' }}>
                  <div style={{ width: `${Math.min(100, pct)}%`, height: '100%', backgroundColor: 'var(--accent-primary)', borderRadius: '9999px' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Target Date: {g.targetDate}</span>
                  <span>Rec. Monthly: ₹{g.suggestedMonthly.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
