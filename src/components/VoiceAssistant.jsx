import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  X, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Sun, 
  Moon, 
  AlertTriangle, 
  Flame, 
  ShieldAlert,
  Wallet,
  CheckCircle2
} from 'lucide-react';
import { voiceEngine } from '../services/voiceEngine';
import { playAlertSound } from '../services/AudioAlert';

export default function VoiceAssistant({ 
  isOpen, 
  onClose, 
  onExecuteCommand, 
  speechMuted, 
  toggleMute,
  theme
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputQuery, setInputQuery] = useState('');
  const [lastResponse, setLastResponse] = useState(
    "Hello! I am SmartBank Voice AI. How can I assist your banking or security operations today?"
  );
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: "Hello! I am SmartBank Voice AI. How can I assist your banking or security operations today?" }
  ]);

  useEffect(() => {
    if (isOpen) {
      voiceEngine.speak("SmartBank Voice Assistant ready. Speak a command or pick a quick action.");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setIsListening(true);
    playAlertSound('info');
    voiceEngine.startListening(
      (text) => {
        setTranscript(text);
        processUserQuery(text);
      },
      (error) => {
        setIsListening(false);
        const errMsg = typeof error === 'string' ? error : "Could not hear audio clearly. Please try typing.";
        setLastResponse(errMsg);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleStopListening = () => {
    voiceEngine.stopListening();
    setIsListening(false);
  };

  const processUserQuery = (queryText) => {
    if (!queryText.trim()) return;

    // Add user message to history
    setChatHistory(prev => [...prev, { sender: 'user', text: queryText }]);

    // Parse command
    const parsed = voiceEngine.parseCommand(queryText);

    // AI speech reply
    setLastResponse(parsed.response);
    setChatHistory(prev => [...prev, { sender: 'ai', text: parsed.response }]);
    
    // Audio chime & speech
    playAlertSound('success');
    voiceEngine.speak(parsed.response);

    // Execute callback
    if (onExecuteCommand) {
      onExecuteCommand(parsed);
    }
  };

  const handleSubmitText = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const q = inputQuery;
    setInputQuery('');
    processUserQuery(q);
  };

  const quickCommands = [
    { label: 'Convert to White Mode', query: 'Convert to White Mode', icon: Sun },
    { label: 'Switch to Dark Mode', query: 'Switch to Dark Mode', icon: Moon },
    { label: 'Make an Alert', query: 'Make an alert for suspicious transaction', icon: AlertTriangle },
    { label: 'Check Balance', query: 'What is my total account balance?', icon: Wallet },
    { label: 'Simulate Ransomware', query: 'Simulate Ransomware Attack', icon: Flame },
    { label: 'Scan Phishing URL', query: 'Scan phishing URL smartbank-login.xyz', icon: ShieldAlert },
    { label: 'Simulate Malware', query: 'Simulate malware file upload', icon: Sparkles }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '580px', borderRadius: '24px', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          background: 'var(--accent-gradient)',
          padding: '1.25rem 1.5rem',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>SmartBank Voice AI</h3>
              <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Interactive Speech & NLP Operations Assistant</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggleMute}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                padding: '0.4rem',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              title={speechMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {speechMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                padding: '0.4rem',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Visualizer & Mic Pulse */}
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          padding: '1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`btn ${isListening ? 'listening-pulse' : ''}`}
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                background: isListening ? '#ef4444' : 'var(--accent-gradient)',
                color: '#ffffff',
                boxShadow: isListening ? '0 0 25px rgba(239, 68, 68, 0.6)' : '0 8px 25px rgba(37, 99, 235, 0.4)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isListening ? <MicOff size={32} /> : <Mic size={32} />}
            </button>
          </div>

          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {isListening ? "Listening... Speak your command now" : "Click Microphone to Talk"}
            </p>
            {transcript && (
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                "{transcript}"
              </p>
            )}
          </div>
        </div>

        {/* Quick Voice Command Chips */}
        <div style={{ padding: '1rem 1.25rem 0.5rem' }}>
          <p style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', uppercase: true, marginBottom: '0.5rem' }}>
            Try Voice Commands:
          </p>
          <div style={{ display: 'flex', wrap: 'wrap', gap: '0.4rem', flexWrap: 'wrap' }}>
            {quickCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={idx}
                  onClick={() => processUserQuery(cmd.query)}
                  className="btn btn-outline"
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    borderRadius: '9999px',
                    borderColor: 'var(--border-color)',
                    background: 'var(--bg-card)'
                  }}
                >
                  <Icon size={13} color="var(--accent-primary)" />
                  <span>{cmd.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat History Box */}
        <div style={{
          padding: '1rem 1.25rem',
          maxHeight: '220px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {chatHistory.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '85%',
                padding: '0.65rem 0.95rem',
                borderRadius: '14px',
                fontSize: '0.85rem',
                lineHeight: 1.4,
                backgroundColor: item.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: item.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                border: item.sender === 'user' ? 'none' : '1px solid var(--border-color)'
              }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form for Text Fallback */}
        <form onSubmit={handleSubmitText} style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-card)'
        }}>
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type a voice command (e.g. 'Convert to White Mode')..."
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
