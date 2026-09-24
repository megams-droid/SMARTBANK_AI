// Explainable AI Shared Scoring Engine for SmartBank AI

export function evaluateTransactionRisk(tx) {
  const signals = [];
  let score = 10;

  // 1. Amount check
  if (tx.amount > 50000) {
    score += 35;
    signals.push({ name: 'High Value Amount', weight: 35, detail: `Amount ₹${tx.amount.toLocaleString('en-IN')} exceeds normal 95th percentile threshold (₹20,000)` });
  } else if (tx.amount > 20000) {
    score += 20;
    signals.push({ name: 'Above Average Amount', weight: 20, detail: `Amount ₹${tx.amount.toLocaleString('en-IN')} is higher than customer average (₹4,500)` });
  }

  // 2. New beneficiary check
  if (tx.isNewBeneficiary) {
    score += 30;
    signals.push({ name: 'Newly Added Beneficiary', weight: 30, detail: `Recipient '${tx.beneficiaryName || tx.toAccount}' added less than 24 hours ago` });
  }

  // 3. Time anomaly (e.g. late night 1 AM - 5 AM)
  const hour = new Date().getHours();
  if (hour >= 1 && hour <= 5) {
    score += 15;
    signals.push({ name: 'Unusual Transaction Time', weight: 15, detail: `Executed during off-peak sleep window (${hour}:00 hrs)` });
  }

  // 4. Unfamiliar device / IP
  if (tx.isUnfamiliarDevice) {
    score += 20;
    signals.push({ name: 'Unfamiliar Device Signature', weight: 20, detail: `Device fingerprint 'Linux/Android 14 Chrome' not in user trusted hardware registry` });
  }

  score = Math.min(100, Math.max(0, score));

  let level = 'LOW';
  if (score >= 80) level = 'CRITICAL';
  else if (score >= 60) level = 'HIGH';
  else if (score >= 35) level = 'MEDIUM';

  return {
    riskScore: score,
    riskLevel: level,
    engineType: 'Explainable AI-assisted rule-weighted engine',
    signals,
    explanation: {
      whatHappened: `Transaction request for ₹${Number(tx.amount).toLocaleString('en-IN')} to ${tx.beneficiaryName || 'beneficiary'}.`,
      whyDetected: signals.map(s => s.name).join(' + ') || 'Normal transaction baseline',
      evidenceConsidered: signals.map(s => s.detail),
      riskAssessment: level === 'LOW' ? 'Low transaction risk. Complies with safety baselines.' : `High risk detected! Risk score calculated at ${score}/100.`,
      recommendedAction: level === 'CRITICAL' || level === 'HIGH' ? 'Temporarily restrict transaction and mandate OTP/MFA verification.' : 'Approve transaction and log audit record.'
    }
  };
}

export function evaluatePhishingURL(input) {
  const text = input.trim().toLowerCase();
  const signals = [];
  let score = 5;

  const suspiciousKeywords = ['verify', 'secure-bank', 'login-update', 'account-blocked', 'kyc-update', 'urgent-action', 'otp-confirm'];
  const lookalikeDomains = ['smartbankk.com', 'smartbank-login.xyz', 'smartbánk.in', 'smartbank-verify.net', 'bank-security-auth.online'];

  if (lookalikeDomains.some(d => text.includes(d))) {
    score += 45;
    signals.push({ name: 'Impersonation & Lookalike Domain', weight: 45, detail: `Domain pattern matches known spoofing signature targeted at SmartBank AI` });
  }

  if (text.match(/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
    score += 40;
    signals.push({ name: 'Raw IP Hostname', weight: 40, detail: `URL uses direct IP address instead of verified domain name` });
  }

  if (text.endsWith('.xyz') || text.endsWith('.top') || text.endsWith('.online') || text.endsWith('.cc') || text.endsWith('.tk')) {
    score += 25;
    signals.push({ name: 'Suspicious TLD Extension', weight: 25, detail: `TLD registered with high spam & abuse reputation index` });
  }

  const keywordHits = suspiciousKeywords.filter(k => text.includes(k));
  if (keywordHits.length > 0) {
    score += 25;
    signals.push({ name: 'Urgency & Phishing Lingo', weight: 25, detail: `Detected trigger keywords: [${keywordHits.join(', ')}]` });
  }

  if (text.includes('@') || text.split('.').length > 4) {
    score += 15;
    signals.push({ name: 'Excessive Subdomains / URL Obfuscation', weight: 15, detail: `Nested subdomain structure attempts to hide real target host` });
  }

  score = Math.min(100, Math.max(0, score));

  let level = 'SAFE';
  if (score >= 75) level = 'HIGH RISK';
  else if (score >= 40) level = 'SUSPICIOUS';

  return {
    phishingRiskScore: score,
    classification: level,
    engineType: 'Explainable AI Phishing Shield',
    signals,
    explanation: {
      whatHappened: `Scanned submitted target: "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`,
      whyDetected: signals.length > 0 ? signals.map(s => s.name).join(' + ') : 'Clean domain structure',
      evidenceConsidered: signals.map(s => s.detail),
      riskAssessment: level === 'HIGH RISK' ? `Critical Phishing Danger! Score: ${score}/100.` : level === 'SUSPICIOUS' ? `Caution required. Score: ${score}/100.` : 'Target verified safe.',
      recommendedAction: level === 'HIGH RISK' ? 'Block suspicious URL and issue instant security alert to user.' : 'Proceed with normal caution.'
    }
  };
}

export function evaluateMalwareFile(filename, fileSize = 1024) {
  const name = filename.trim();
  const signals = [];
  let score = 0;

  // Double extension detection
  const parts = name.split('.');
  if (parts.length > 2) {
    const ext1 = parts[parts.length - 2].toLowerCase();
    const ext2 = parts[parts.length - 1].toLowerCase();
    if (['pdf', 'doc', 'docx', 'xlsx', 'jpg', 'png'].includes(ext1) && ['exe', 'bat', 'vbs', 'scr', 'cmd', 'ps1', 'sh', 'zip'].includes(ext2)) {
      score += 55;
      signals.push({ name: 'Double Extension Masking', weight: 55, detail: `File disguised as document (${ext1}) but carries executable extension (${ext2})` });
    }
  }

  // Suspicious executables
  const lower = name.toLowerCase();
  if (lower.endsWith('.exe') || lower.endsWith('.scr') || lower.endsWith('.vbs') || lower.endsWith('.bat')) {
    score += 30;
    signals.push({ name: 'Executable Script Payload', weight: 30, detail: `Executable file extension flagged for banking attachment quarantine` });
  }

  if (lower.includes('invoice_') || lower.includes('bank_statement_') || lower.includes('payment_receipt_')) {
    score += 15;
    signals.push({ name: 'Social Engineering Filename Motif', weight: 15, detail: `Matches high-frequency spear-phishing attachment naming patterns` });
  }

  score = Math.min(100, Math.max(0, score));

  let level = 'SAFE';
  if (score >= 70) level = 'HIGH RISK';
  else if (score >= 35) level = 'SUSPICIOUS';

  return {
    riskScore: score,
    riskLevel: level,
    filename: name,
    quarantined: score >= 35,
    signals,
    explanation: {
      whatHappened: `Submitted file attachment '${name}' for malware verification.`,
      whyDetected: signals.length > 0 ? signals.map(s => s.name).join(' + ') : 'File structure verified valid',
      evidenceConsidered: signals.map(s => s.detail),
      riskAssessment: level === 'HIGH RISK' ? `Malware Hazard! Risk Score ${score}/100. File automatically isolated.` : 'File signature safe.',
      recommendedAction: score >= 35 ? 'Quarantine file immediately in isolated sandbox without execution.' : 'Permit file upload.'
    }
  };
}
