"use client";

import React, { useState, useEffect, useRef } from 'react';
import { api, Wrapper } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// MOBILE DETECTION HOOK
// ═══════════════════════════════════════════════════════════════
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  return isMobile;
}

// ═══════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════
function GlassCard({ children, style = {}, glowColor = '#00d4ff' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'visible',
      ...style,
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${glowColor}50, transparent)`,
      }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TYPING INDICATOR
// ═══════════════════════════════════════════════════════════════
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '12px 16px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d4ff', animation: `typingBounce 1.4s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      <style>{`@keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-8px); opacity: 1; } }`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MESSAGE BUBBLE (RESPONSIVE)
// ═══════════════════════════════════════════════════════════════
function MessageBubble({ message, isUser, wrapper, latency, timestamp, isMobile }: {
  message: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  isMobile: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: isMobile ? 12 : 16,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.3s ease',
      padding: isMobile ? '0 4px' : 0,
    }}>
      <div style={{
        maxWidth: isMobile ? '88%' : '75%',
        padding: isMobile ? '12px 14px' : '14px 18px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser 
          ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.1))'
          : 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))',
        border: isUser ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(217,70,239,0.3)',
        boxShadow: isUser ? '0 0 20px rgba(0,212,255,0.15)' : '0 0 20px rgba(217,70,239,0.15)',
      }}>
        {!isUser && wrapper && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8,
            padding: '3px 8px', background: 'rgba(0,0,0,0.3)', borderRadius: 6,
            fontSize: isMobile ? 9 : 10, fontFamily: 'monospace', color: '#d946ef', letterSpacing: 1,
          }}>
            <span>📦</span>{wrapper.replace('syntex_wrapper_', '').toUpperCase()}
          </div>
        )}
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: isMobile ? 13 : 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {message}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: isMobile ? 9 : 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', flexWrap: 'wrap' }}>
          <span>{timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
          {latency && <span style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '2px 6px', borderRadius: 4 }}>⚡ {(latency / 1000).toFixed(1)}s</span>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WRAPPER SELECTOR (RESPONSIVE)
// ═══════════════════════════════════════════════════════════════
function WrapperSelector({ wrappers, selected, onSelect, isMobile }: {
  wrappers: Wrapper[];
  selected: string;
  onSelect: (name: string) => void;
  isMobile: boolean;
}) {
  const [open, setOpen] = useState(false);
  const getColor = (name: string) => {
    if (name.includes('human')) return '#10b981';
    if (name.includes('sigma')) return '#f59e0b';
    if (name.includes('deepsweep')) return '#d946ef';
    if (name.includes('true_raw')) return '#ef4444';
    return '#00d4ff';
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: isMobile ? '12px 14px' : '10px 16px',
        background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, cursor: 'pointer',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: getColor(selected), boxShadow: `0 0 10px ${getColor(selected)}` }} />
        <span style={{ fontFamily: 'monospace', fontSize: isMobile ? 11 : 12, color: getColor(selected), fontWeight: 600, flex: 1 }}>
          {selected.replace('syntex_wrapper_', '').toUpperCase()}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 250 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute',
            top: '100%', left: 0, right: 0, marginTop: 4,
            background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(6,13,24,0.98))',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
            overflow: 'hidden', zIndex: 300, maxHeight: isMobile ? 250 : 300, overflowY: 'auto',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}>
            {wrappers.map(w => (
              <div key={w.name} onClick={() => { onSelect(w.name); setOpen(false); }} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: isMobile ? '14px 14px' : '12px 16px', cursor: 'pointer',
                background: w.name === selected ? 'rgba(0,212,255,0.1)' : 'transparent',
                borderLeft: w.name === selected ? '3px solid #00d4ff' : '3px solid transparent',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: getColor(w.name) }} />
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: w.name === selected ? '#00d4ff' : 'rgba(255,255,255,0.7)', flex: 1 }}>
                  {w.name.replace('syntex_wrapper_', '').toUpperCase()}
                </span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{w.size_human}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MOBILE SETTINGS DRAWER
// ═══════════════════════════════════════════════════════════════
function MobileDrawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 500, backdropFilter: 'blur(4px)' }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 501,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(6,13,24,0.99))',
        borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.1)',
        borderBottom: 'none',
        padding: '8px 0 24px',
        maxHeight: '70vh', overflowY: 'auto',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 2, margin: '0 auto 16px' }} />
        {children}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// MOBILE STATS BAR
// ═══════════════════════════════════════════════════════════════
function MobileStatsBar({ messages, onOpenSettings }: { messages: Message[]; onOpenSettings: () => void }) {
  const responses = messages.filter(m => !m.isUser).length;
  const avgLatency = messages.filter(m => m.latency).length > 0 
    ? (messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / messages.filter(m => m.latency).length / 1000).toFixed(1)
    : '0';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
      background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>💬</span>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#00d4ff' }}>{responses}</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>|</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>⚡</span>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#f59e0b' }}>{avgLatency}s</span>
      </div>
      <button onClick={onOpenSettings} style={{
        background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
        borderRadius: 8, padding: '6px 12px', color: '#00d4ff',
        fontFamily: 'monospace', fontSize: 10, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        ⚙️ Settings
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN CHAT PANEL
// ═══════════════════════════════════════════════════════════════
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  requestId?: string;
}

export default function ChatPanel() {
  const isMobile = useIsMobile();
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [selectedWrapper, setSelectedWrapper] = useState<string>('syntex_wrapper_sigma');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(500);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    api.getWrappers().then(data => {
      setWrappers(data.wrappers);
      const active = data.wrappers.find(w => w.is_active);
      if (active) setSelectedWrapper(active.name);
    });
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { id: Date.now().toString(), content: input.trim(), isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await api.chat({ prompt: userMessage.content, mode: selectedWrapper, max_new_tokens: maxTokens });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(), content: response.response, isUser: false,
        wrapper: selectedWrapper, latency: response.metadata.latency_ms, timestamp: new Date(), requestId: response.metadata.request_id,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), content: `Error: ${err.message}`, isUser: false, timestamp: new Date() }]);
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const clearChat = () => setMessages([]);

  // ═══════════════════════════════════════════════════════════════
  // MOBILE LAYOUT
  // ═══════════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', minHeight: 400 }}>
        <GlassCard style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 12 }} glowColor="#d946ef">
          {/* Mobile Header */}
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>💬</span>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 12, color: '#00d4ff' }}>SYNTX CHAT</h2>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={clearChat} style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8, padding: '6px 10px', color: '#ef4444', fontFamily: 'monospace', fontSize: 10, cursor: 'pointer',
              }}>🗑️</button>
            </div>
          </div>

          {/* Mobile Stats Bar */}
          <MobileStatsBar messages={messages} onOpenSettings={() => setDrawerOpen(true)} />

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px', display: 'flex', flexDirection: 'column' }}>
            {messages.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>🌊</div>
                <div style={{ fontFamily: 'monospace', fontSize: 12, marginBottom: 6 }}>SYNTX FIELD RESONANCE</div>
                <div style={{ fontSize: 11, maxWidth: 250 }}>Tippe auf Settings um einen Wrapper zu wählen</div>
              </div>
            ) : (
              <>
                {messages.map(msg => (
                  <MessageBubble key={msg.id} message={msg.content} isUser={msg.isUser} wrapper={msg.wrapper} latency={msg.latency} timestamp={msg.timestamp} isMobile={true} />
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                    <div style={{ padding: '12px 14px', borderRadius: '18px 18px 18px 4px', background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))', border: '1px solid rgba(217,70,239,0.3)' }}>
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mobile Input */}
          <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nachricht..."
                disabled={loading}
                style={{
                  flex: 1, padding: '12px 14px', borderRadius: 20,
                  border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,0,0,0.4)',
                  color: 'white', fontSize: 15, fontFamily: 'system-ui, sans-serif',
                  resize: 'none', minHeight: 44, maxHeight: 100, outline: 'none',
                }}
                rows={1}
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
                width: 48, height: 48, borderRadius: '50%', border: 'none',
                background: loading || !input.trim() ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
                color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#030b15',
                fontWeight: 700, fontSize: 18, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: loading || !input.trim() ? 'none' : '0 0 20px rgba(0,212,255,0.4)',
              }}>
                {loading ? '...' : '→'}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Mobile Settings Drawer */}
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div style={{ padding: '0 20px' }}>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 12, letterSpacing: 1 }}>📦 WRAPPER</div>
            <WrapperSelector wrappers={wrappers} selected={selectedWrapper} onSelect={(w) => { setSelectedWrapper(w); }} isMobile={true} />
            
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', margin: '24px 0 12px', letterSpacing: 1 }}>⚙️ MAX TOKENS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="range" min={50} max={2000} value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))} style={{ flex: 1, accentColor: '#00d4ff' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#00d4ff', minWidth: 50 }}>{maxTokens}</span>
            </div>

            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', margin: '24px 0 12px', letterSpacing: 1 }}>📊 SESSION STATS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#00d4ff', fontFamily: 'monospace' }}>{messages.filter(m => !m.isUser).length}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Responses</div>
              </div>
              <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>
                  {(messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / 1000).toFixed(1)}s
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Total</div>
              </div>
              <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>
                  {messages.filter(m => m.latency).length > 0 ? (messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / messages.filter(m => m.latency).length / 1000).toFixed(1) : '0'}s
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Avg</div>
              </div>
            </div>

            <button onClick={clearChat} style={{
              width: '100%', marginTop: 24, padding: '14px 20px', borderRadius: 12,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444', fontFamily: 'monospace', fontSize: 12, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>🗑️ Chat löschen</button>
          </div>
        </MobileDrawer>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // DESKTOP LAYOUT
  // ═══════════════════════════════════════════════════════════════
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, height: 'calc(100vh - 200px)', minHeight: 600 }}>
      {/* Main Chat Area */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }} glowColor="#d946ef">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>💬</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: '#00d4ff' }}>SYNTX CHAT</h2>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{messages.length} Nachrichten</div>
            </div>
          </div>
          <button onClick={clearChat} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '8px 14px', color: '#ef4444', cursor: 'pointer', fontFamily: 'monospace', fontSize: 11 }}>🗑️ Clear</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column' }}>
          {messages.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.5 }}>🌊</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14, marginBottom: 8 }}>SYNTX FIELD RESONANCE</div>
              <div style={{ fontSize: 12, maxWidth: 300 }}>Wähle einen Wrapper und starte die Konversation</div>
            </div>
          ) : (
            <>
              {messages.map(msg => (
                <MessageBubble key={msg.id} message={msg.content} isUser={msg.isUser} wrapper={msg.wrapper} latency={msg.latency} timestamp={msg.timestamp} isMobile={false} />
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
                  <div style={{ padding: '14px 18px', borderRadius: '18px 18px 18px 4px', background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))', border: '1px solid rgba(217,70,239,0.3)' }}>
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht eingeben... (Enter zum Senden)"
              disabled={loading}
              style={{ flex: 1, padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 14, fontFamily: 'system-ui, sans-serif', resize: 'none', minHeight: 50, maxHeight: 150, outline: 'none', boxShadow: input ? '0 0 20px rgba(0,212,255,0.2)' : 'none' }}
              rows={1}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
              padding: '14px 24px', borderRadius: 12, border: 'none',
              background: loading || !input.trim() ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
              color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#030b15',
              fontWeight: 700, fontFamily: 'monospace', fontSize: 14,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              boxShadow: loading || !input.trim() ? 'none' : '0 0 30px rgba(0,212,255,0.4)',
            }}>
              {loading ? '...' : '→'}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ padding: 16, overflow: 'visible', position: 'relative', zIndex: 200 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>📦 WRAPPER</div>
          <WrapperSelector wrappers={wrappers} selected={selectedWrapper} onSelect={setSelectedWrapper} isMobile={false} />
        </GlassCard>

        <GlassCard style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>⚙️ SETTINGS</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Max Tokens: <span style={{ color: '#00d4ff' }}>{maxTokens}</span></div>
            <input type="range" min={50} max={2000} value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#00d4ff' }} />
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 16, flex: 1 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>📊 SESSION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#00d4ff', fontFamily: 'monospace' }}>{messages.filter(m => !m.isUser).length}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Responses</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>{(messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / 1000).toFixed(1)}s</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Total Time</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>
                {messages.filter(m => m.latency).length > 0 ? (messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / messages.filter(m => m.latency).length / 1000).toFixed(1) : '0'}s
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Avg Latency</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
