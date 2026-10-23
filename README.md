# SmartBank AI — AI-Powered Smart Banking & Financial Management System

> **"Bank Smarter. Detect Threats. Protect Every Transaction."**

SmartBank AI is an intelligent Core Java banking platform and modern web application that manages personal finances while continuously detecting suspicious financial activity, phishing, malware, and ransomware-like threats through an **Explainable AI-driven security engine**.

---

## 📌 Project Overview
SmartBank AI fuses personal financial management with enterprise-grade cybersecurity threat defense. Rather than keeping banking and cybersecurity isolated, SmartBank AI unifies both under a single intelligence engine that adheres to the **Detect → Analyze → Explain → Alert → Respond → Record** lifecycle.

---

## 🎯 Problem Statement
1. **Financial Complexity:** Users lack proactive, explainable guidance on budget overruns, savings progress, and upcoming recurring bills.
2. **Opaque Security Alerts:** Traditional fraud systems present cryptic warnings ("Transaction Blocked") without explaining *why* a risk score was assigned.
3. **Multi-Vector Cyber Attacks:** Modern financial fraud involves coordinated multi-step attack vectors (credential phishing, double-extension malware, ransomware data exfiltration, and account takeover sequences).

---

## 💡 Key Innovations & Differentiators
1. **Finance + Cybersecurity Unified Platform:** Single pane of glass for accounts, budgeting, and threat defense.
2. **Explainable AI (XAI) Risk Engine:** Transparent weighted rule engine that breaks down every risk calculation into human-understandable evidence.
3. **Cross-Event Correlation Engine:** Links isolated telemetry events (e.g. `Suspicious Login -> New Device -> Password Reset -> New Beneficiary -> Large Transfer`) into a single unified Account Takeover Incident.
4. **Safe Cyber Threat Simulation Lab:** Dedicated environment for hackathon judges to trigger synthetic fraud, phishing, malware, ransomware, and account takeover attacks in real time without executing dangerous code.
5. **Always-On Security Monitor:** Multithreaded background engine (`ScheduledExecutorService`) that continuously evaluates telemetry streams non-blockingly.

---

## 🏗️ System Architecture & Data Flow

### Architecture Diagram
```
┌──────────────────────────────────────────────────────────────────┐
│                   React + Vite Presentation Layer                 │
│         (Light/Dark Mode, Voice Assistant, Cyber Threat Lab)       │
└─────────────────────────────────┬────────────────────────────────┘
                                  │  REST / WebSockets
┌─────────────────────────────────▼────────────────────────────────┐
│                   Core Java Service & Controller Layer           │
│        (AuthService, BankingService, FinanceService, Security)    │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
┌─────────────────────────────────▼────────────────────────────────┐
│               Explainable AI & Threat Detection Engines          │
│   (FraudDetector, PhishingDetector, MalwareGuard, RansomwareSentinel)│
└─────────────────────────────────┬────────────────────────────────┘
                                  │  JDBC / SQL Queries
┌─────────────────────────────────▼────────────────────────────────┐
│              Normalized Relational Database (17 Tables)          │
│       (users, accounts, transactions, fraud_alerts, audit_logs)   │
└──────────────────────────────────────────────────────────────────┘
```

### Threat Detection Flow
```text
  Input Event
       ↓
Feature Extraction (Amount, Velocity, Beneficiary Status, MIME Type, Lookalike Domain)
       ↓
Signal Detection & Scoring
       ↓
Weighted Risk Calculation (0 - 100 Scale)
       ↓
Risk Classification (LOW | MEDIUM | HIGH | CRITICAL)
       ↓
Explainable AI Generator (human readable reasoning breakdown)
       ↓
Automated Safe Response (Restrict Transfer, Quarantine File, Require MFA)
       ↓
Audit Trail Persistence
```

---

## 🗄️ Database ER Schema & Tables
SmartBank AI utilizes a normalized 17-table relational schema located at [`database/schema.sql`](file:///Users/megasree/Downloads/SMARTBANK-AI/database/schema.sql):
- `users`: Core authentication & RBAC roles (`CUSTOMER`, `ANALYST`, `ADMIN`)
- `accounts`: Savings, Current, and Fixed Deposit balances
- `transactions`: Deposits, withdrawals, transfers with risk scores
- `beneficiaries`: Verified and newly added beneficiaries
- `login_history`: IP and device telemetry tracking
- `budgets`: Category spending caps and warning thresholds
- `financial_goals`: Target savings timelines
- `recurring_payments`: Automated recurring expense tracking
- `fraud_alerts`: Risk scores and explanation breakdowns
- `phishing_alerts`: Domain mismatch and urgency language scans
- `malware_alerts`: Double extension and magic byte indicators
- `ransomware_alerts`: Honeypot decoy table burst monitors
- `security_events`: Granular telemetry log stream
- `incidents`: Correlated multi-stage attack timelines
- `notifications`: User notification delivery center
- `audit_logs`: Immutable audit logging trail
- `support_tickets`: Customer support request tracking

---

## 🚀 Quick Start & Run Instructions

### Prerequisites
- Node.js v18+ & npm
- JDK 17+ (for Java Backend compilation)

### Running the Web Application
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open browser at http://localhost:3000/
```

---

## 🔑 Demo Credentials

| Role | Username / Email | Password | Access Level |
|---|---|---|---|
| **Customer** | `customer@smartbank.ai` | `password123` | Full Banking, Finance, & Security Tools |
| **Security Analyst** | `analyst@smartbank.ai` | `analyst123` | Incident Investigation & Alert Management |
| **Admin** | `admin@smartbank.ai` | `admin123` | System Analytics, Account Freeze & Audit Logs |

---

## ⏱️ 5-Minute Hackathon Judge Demo Flow
1. **Step 1 - Login & Overview:** View Total Balance (₹75,000), Security Score (94/100), and Recent Transactions.
2. **Step 2 - SmartBank AI Advisor:** Navigate to AI Advisor tab to view explainable spending insights & recurring payment forecasts.
3. **Step 3 - Cyber Threat Simulation Lab:** Click on the **Cyber Threat Lab** tab. Test:
   - `[Simulate Fraud]`: Triggers 87/100 velocity fraud anomaly.
   - `[Simulate Phishing]`: Scans spoofed login URL `smartbank-login.xyz`.
   - `[Simulate Malware]`: Quarantines double-extension file `statement.pdf.exe`.
   - `[Simulate Ransomware]`: Triggers decoy table honeypot monitoring.
   - `[Simulate Account Takeover]`: Displays correlated 5-stage incident timeline.
4. **Step 4 - Incident Correlation & Security Center:** Switch to Security Intelligence tab to view live overall threat levels.
5. **Step 5 - Java Architecture & SQL Inspector:** View the exact Java OOP interfaces, classes, and database DDL script directly inside the web UI.

---

## 📄 License & Compliance
Built strictly for demonstration in hackathons and educational evaluation. All threat simulations remain completely non-executable and safe.
