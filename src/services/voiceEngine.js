// SmartBank AI Voice Assistant Engine with Speech Synthesis & Speech Recognition

class VoiceEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.speechMuted = false;
    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  speak(text, onEnd = null) {
    if (this.speechMuted || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      
      // Select preferred voice (Google US English or Samantha/Alex/Natural)
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('Karen')) && v.lang.startsWith('en')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      this.isSpeaking = true;
      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis error:", e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  toggleMute() {
    this.speechMuted = !this.speechMuted;
    if (this.speechMuted) this.stopSpeaking();
    return this.speechMuted;
  }

  startListening(onResult, onError, onEnd) {
    if (!this.recognition) {
      onError("Speech Recognition API is not supported in this browser. Please type your command below.");
      return;
    }

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onError(event.error || "Speech recognition error");
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.isListening = false;
      onError("Recognition already active or failed to start.");
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Parse natural language commands for SmartBank AI
  parseCommand(input) {
    const text = input.toLowerCase().trim();

    // 1. Theme control
    if (text.includes('white mode') || text.includes('light mode') || text.includes('white theme') || text.includes('light theme') || text.includes('convert to white') || text.includes('convert to light')) {
      return { action: 'SET_THEME', value: 'light', response: 'Converting theme to White Mode.' };
    }
    if (text.includes('dark mode') || text.includes('dark theme') || text.includes('night mode')) {
      return { action: 'SET_THEME', value: 'dark', response: 'Switching theme to Dark Mode.' };
    }

    // 2. Alert creation & Alert triggers
    if (text.includes('make alert') || text.includes('create alert') || text.includes('trigger alert') || text.includes('test alert')) {
      return { 
        action: 'TRIGGER_CUSTOM_ALERT', 
        title: 'Voice Triggered Alert', 
        message: 'Security Alert: Voice Assistant initiated a manual threat check across all accounts.',
        severity: 'HIGH',
        response: 'Generated security alert! High-risk threat check notification posted.' 
      };
    }
    if (text.includes('show alerts') || text.includes('view alerts') || text.includes('open alerts')) {
      return { action: 'NAVIGATE', tab: 'alerts', response: 'Opening Security Alerts center.' };
    }

    // 3. Cyber Threat Simulations
    if (text.includes('simulate fraud') || text.includes('test fraud') || text.includes('fake fraud')) {
      return { action: 'SIMULATE', type: 'fraud', response: 'Initiating Explainable Fraud Threat Simulation.' };
    }
    if (text.includes('simulate phishing') || text.includes('test phishing') || text.includes('fake phishing')) {
      return { action: 'SIMULATE', type: 'phishing', response: 'Launching AI Phishing Shield attack simulation.' };
    }
    if (text.includes('simulate malware') || text.includes('test malware') || text.includes('file attack')) {
      return { action: 'SIMULATE', type: 'malware', response: 'Simulating malware file upload statement.pdf.exe in safe sandbox.' };
    }
    if (text.includes('simulate ransomware') || text.includes('test ransomware') || text.includes('honeypot')) {
      return { action: 'SIMULATE', type: 'ransomware', response: 'CRITICAL ALERT: Ransomware honeypot decoy record burst activity simulated!' };
    }
    if (text.includes('simulate account takeover') || text.includes('account takeover')) {
      return { action: 'SIMULATE', type: 'takeover', response: 'Simulating multi-step Account Takeover incident sequence.' };
    }

    // 4. Banking queries
    if (text.includes('balance') || text.includes('how much money') || text.includes('total funds')) {
      return { action: 'GET_BALANCE', response: 'Your total balance across all accounts is ₹75,000. Savings: ₹50,000, Current: ₹25,000.' };
    }
    if (text.includes('transfer') || text.includes('send money') || text.includes('pay')) {
      return { action: 'NAVIGATE', tab: 'accounts', response: 'Opening Money Transfer portal. AI Fraud Engine is active.' };
    }
    if (text.includes('budget') || text.includes('spending')) {
      return { action: 'NAVIGATE', tab: 'budget', response: 'Opening Budget Management. Your Shopping budget is at 87% limit warning threshold.' };
    }
    if (text.includes('score') || text.includes('security score')) {
      return { action: 'GET_SECURITY', response: 'Your current SmartBank AI Security Score is 94 out of 100.' };
    }

    // 5. Navigation
    if (text.includes('threat lab') || text.includes('simulation lab')) {
      return { action: 'NAVIGATE', tab: 'threat-lab', response: 'Navigating to Cyber Threat Simulation Lab.' };
    }
    if (text.includes('phishing') || text.includes('url scan')) {
      return { action: 'NAVIGATE', tab: 'phishing', response: 'Opening AI Phishing Shield detector.' };
    }
    if (text.includes('security center') || text.includes('security dashboard')) {
      return { action: 'NAVIGATE', tab: 'security-center', response: 'Opening Security Intelligence Center.' };
    }
    if (text.includes('admin') || text.includes('analyst')) {
      return { action: 'NAVIGATE', tab: 'admin', response: 'Switching to Security Analyst Dashboard.' };
    }

    // Fallback response
    return {
      action: 'GENERAL_QUERY',
      query: text,
      response: `I heard: "${text}". I can help you convert dark mode to white mode, create alerts, check balances, perform AI threat scans, or run ransomware simulations!`
    };
  }
}

export const voiceEngine = new VoiceEngine();
