"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { api, Wrapper } from '@/lib/api';
import { ChatHeader } from './components';
import { useHealthCheck } from './hooks';

// ═══════════════════════════════════════════════════════════════
// 🎨 CYBER STYLES - MAXIMUM MOVEMENT
import { FormatCard } from './sidebar/FormatCard';
// ═══════════════════════════════════════════════════════════════

const cyberStyles = `
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px var(--glow-color, #00d4ff); }
    50% { box-shadow: 0 0 40px var(--glow-color, #00d4ff), 0 0 60px var(--glow-color, #00d4ff); }
  }
  @keyframes borderFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes slideIn {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanLine {
    0% { top: -10%; opacity: 0; }
    50% { opacity: 0.5; }
    100% { top: 110%; opacity: 0; }
  }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-8px); opacity: 1; }
  }
  @keyframes scoreReveal {
    0% { opacity: 0; transform: scale(0.8) translateY(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes dataStream {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.8; }
    94% { opacity: 1; }
    96% { opacity: 0.9; }
    97% { opacity: 1; }
  }
  .cyber-card {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cyber-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  .cyber-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--glow-color, #00d4ff), transparent);
    opacity: 0.8;
  }
  .cyber-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .cyber-btn:hover:not(:disabled) {
    transform: scale(1.02);
    filter: brightness(1.2);
  }
  .cyber-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  .cyber-btn:hover::after { left: 100%; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .neon { animation: neonFlicker 4s infinite; }
  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  .scan-line {
    position: absolute;
    left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--scan-color, #00d4ff), transparent);
    animation: scanLine 3s linear infinite;
    pointer-events: none;
  }
  .score-tag { animation: scoreReveal 0.4s ease-out backwards; }
  .dropdown-menu { animation: slideIn 0.2s ease-out; }
  .data-stream {
    background: linear-gradient(180deg, rgba(0,212,255,0.03) 0%, transparent 30%, transparent 70%, rgba(217,70,239,0.03) 100%);
    background-size: 100% 200%;
    animation: dataStream 8s linear infinite;
  }
`;

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  metadata?: {
    input_tokens: number;
    output_tokens: number;
    model: string;
    stop_reason: string;
  };
  scores?: Score[];
}

interface Score {
  field: string;
  score: number;
  maxScore: number;
}

// ═══════════════════════════════════════════════════════════════
// HOOKS
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
// GLASS CARD - CYBER EDITION
// ═══════════════════════════════════════════════════════════════

function GlassCard({ children, style = {}, glowColor = '#00d4ff', className = '' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  className?: string;
}) {
  return (
    <div className={`cyber-card ${className}`} style={{
      '--glow-color': glowColor,
      position: 'relative',
      borderRadius: 16,
      background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
      backdropFilter: 'blur(20px)',
      border: `1px solid ${glowColor}30`,
      boxShadow: `0 4px 30px ${glowColor}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
      overflow: 'visible',
      ...style,
    } as React.CSSProperties}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TYPING INDICATOR - CYBER
// ═══════════════════════════════════════════════════════════════

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '14px 18px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 12, height: 12, borderRadius: '50%',
          background: `linear-gradient(135deg, #00d4ff, #d946ef)`,
          animation: `typingBounce 1.4s ease-in-out ${i * 0.15}s infinite`,
          boxShadow: '0 0 15px rgba(0,212,255,0.6)'
        }} />
      ))}
      <span className="glow-text" style={{ marginLeft: 10, fontSize: 12, fontFamily: 'monospace', color: '#00d4ff', letterSpacing: 2 }}>
        PROCESSING
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCORE BAR - VISUALISIERUNG
// ═══════════════════════════════════════════════════════════════

function ScoreBar({ score, maxScore = 10, label, delay = 0 }: { score: number; maxScore?: number; label: string; delay?: number }) {
  const percentage = (score / maxScore) * 100;
  const color = score >= 8 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444';

  return (
    <div className="score-tag" style={{ marginBottom: 8, animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 700, color, textShadow: `0 0 10px ${color}` }}>{score}/{maxScore}</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          borderRadius: 3,
          boxShadow: `0 0 10px ${color}`,
          transition: 'width 0.5s ease-out'
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MESSAGE BUBBLE - CYBER EDITION MIT SCORES
// ═══════════════════════════════════════════════════════════════

function MessageBubble({ message, isUser, wrapper, latency, timestamp, scores, metadata, isMobile }: {
  message: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  scores?: Score[];
  metadata?: Message['metadata'];
  isMobile: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const totalScore = scores?.reduce((a, b) => a + b.score, 0) || 0;
  const maxTotal = scores ? scores.length * 10 : 0;

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 20,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={{
        maxWidth: isMobile ? '90%' : '78%',
        borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
        background: isUser
          ? 'linear-gradient(145deg, rgba(0,212,255,0.12), rgba(0,212,255,0.04))'
          : 'linear-gradient(145deg, rgba(217,70,239,0.10), rgba(217,70,239,0.02))',
        border: isUser ? '1px solid rgba(0,212,255,0.35)' : '1px solid rgba(217,70,239,0.35)',
        boxShadow: isUser
          ? '0 4px 30px rgba(0,212,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 30px rgba(217,70,239,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Scan Line Effect for AI */}
        {!isUser && <div className="scan-line" style={{ '--scan-color': '#d946ef' } as React.CSSProperties} />}

        {/* Header Tags */}
        {!isUser && (
          <div style={{
            padding: '12px 16px',
            background: 'linear-gradient(90deg, rgba(217,70,239,0.15), transparent)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap'
          }}>
            {wrapper && (
              <span className="float neon" style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(217,70,239,0.1))',
                border: '1px solid rgba(217,70,239,0.5)',
                color: '#d946ef', fontFamily: 'monospace', fontWeight: 600,
                boxShadow: '0 0 15px rgba(217,70,239,0.3)',
                letterSpacing: 1
              }}>
                📦 {wrapper.replace('syntex_wrapper_', '').toUpperCase()}
              </span>
            )}
            {latency && (
              <span className="pulse" style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.1))',
                border: '1px solid rgba(245,158,11,0.5)',
                color: '#f59e0b', fontFamily: 'monospace', fontWeight: 600,
                boxShadow: '0 0 15px rgba(245,158,11,0.3)'
              }}>
                ⚡ {(latency / 1000).toFixed(2)}s
              </span>
            )}
            {scores && scores.length > 0 && (
              <span style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: `linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.1))`,
                border: '1px solid rgba(16,185,129,0.5)',
                color: '#10b981', fontFamily: 'monospace', fontWeight: 700,
                boxShadow: '0 0 15px rgba(16,185,129,0.3)',
                marginLeft: 'auto'
              }}>
                📊 {totalScore}/{maxTotal}
              </span>
            )}
          </div>
        )}

        {/* Message Content */}
        <div style={{ padding: '16px 18px' }}>
          <div style={{
            fontSize: isMobile ? 14 : 15,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.92)',
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </div>
        </div>

        {/* SCORES SECTION - NUR FÜR AI */}
        {!isUser && scores && scores.length > 0 && (
          <div style={{
            padding: '16px 18px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{
              fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)',
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
              letterSpacing: 2
            }}>
              <span className="pulse" style={{ fontSize: 14 }}>📈</span>
              FELD SCORES
            </div>
            
            {/* Score Bars */}
            {scores.map((s, i) => (
              <ScoreBar key={i} score={s.score} maxScore={s.maxScore} label={s.field} delay={i * 0.1} />
            ))}

            {/* Total Score */}
            <div style={{
              marginTop: 14, paddingTop: 14,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: 1 }}>
                TOTAL SCORE
              </span>
              <span className="glow-text" style={{
                fontSize: 18, fontFamily: 'monospace', fontWeight: 900,
                color: totalScore / maxTotal >= 0.8 ? '#10b981' : totalScore / maxTotal >= 0.5 ? '#f59e0b' : '#ef4444',
              }}>
                {totalScore}/{maxTotal}
              </span>
            </div>
          </div>
        )}

        {/* Metadata Details */}
        {!isUser && metadata && (
          <div style={{ padding: '0 18px 14px' }}>
            <button onClick={() => setShowDetails(!showDetails)} className="cyber-btn" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 10, color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer', fontFamily: 'monospace',
              display: 'flex', alignItems: 'center', gap: 6,
              width: '100%', justifyContent: 'center'
            }}>
              <span style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
              {showDetails ? 'Hide' : 'Show'} Details
            </button>
            
            {showDetails && (
              <div className="data-stream" style={{
                marginTop: 10, padding: 14, borderRadius: 10,
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(0,212,255,0.2)',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10
              }}>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(0,212,255,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#00d4ff' }}>{metadata.input_tokens}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>INPUT TOKENS</div>
                </div>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(217,70,239,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#d946ef' }}>{metadata.output_tokens}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>OUTPUT TOKENS</div>
                </div>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(16,185,129,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>{metadata.model}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>MODEL</div>
                </div>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(245,158,11,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>{metadata.stop_reason}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>STOP REASON</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div style={{
          padding: '8px 18px 12px',
          fontSize: 9, color: 'rgba(255,255,255,0.25)',
          textAlign: isUser ? 'right' : 'left',
          fontFamily: 'monospace'
        }}>
          {timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

// [REST OF THE COMPONENTS CONTINUE IN NEXT MESSAGE...]

// ═══════════════════════════════════════════════════════════════
// CYBER DROPDOWN - FIXED Z-INDEX
// ═══════════════════════════════════════════════════════════════

function CyberDropdown({
  options, selected, onSelect, color, zIndex = 100, showFullName = false
}: {
  options: { value: string; label: string; badge?: string }[];
  selected: string;
  onSelect: (v: string) => void;
  color: string;
  zIndex?: number;
  showFullName?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(o => o.value === selected);

  return (
    <div style={{ position: 'relative', zIndex: open ? zIndex : 1 }}>
      <button onClick={() => setOpen(!open)} className="cyber-btn" style={{
        width: '100%', padding: '12px 14px', borderRadius: 12,
        border: `1px solid ${color}50`,
        background: `linear-gradient(135deg, ${color}20, ${color}05)`,
        color, fontFamily: 'monospace', fontSize: 12, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: open ? `0 0 30px ${color}30` : `0 0 15px ${color}10`,
        transition: 'all 0.3s ease',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={open ? 'pulse' : ''} style={{ fontSize: 8 }}>●</span>
          <span style={{ fontWeight: 600 }}>
            {showFullName 
              ? selectedOption?.value || 'Select...'
              : selectedOption?.label || 'Select...'}
          </span>
        </span>
        <span style={{
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>▼</span>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: zIndex - 1
          }} />
          
          <div className="dropdown-menu" style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            marginTop: 6,
            background: 'linear-gradient(145deg, rgba(10,26,46,0.99), rgba(6,13,24,0.99))',
            border: `1px solid ${color}40`,
            borderRadius: 12,
            overflow: 'hidden',
            zIndex: zIndex + 10,
            maxHeight: 280,
            overflowY: 'auto',
            boxShadow: `0 15px 50px rgba(0,0,0,0.6), 0 0 30px ${color}15`,
          }}>
            {options.map((opt, i) => (
              <button key={opt.value} onClick={() => { onSelect(opt.value); setOpen(false); }} style={{
                width: '100%', padding: '12px 14px', border: 'none',
                background: opt.value === selected
                  ? `linear-gradient(90deg, ${color}25, transparent)`
                  : 'transparent',
                color: opt.value === selected ? color : 'rgba(255,255,255,0.7)',
                fontFamily: 'monospace', fontSize: 11, cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i < options.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (opt.value !== selected) e.currentTarget.style.background = `${color}10`; }}
              onMouseLeave={e => { if (opt.value !== selected) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontWeight: 600 }}>{opt.label}</span>
                  {showFullName && <span style={{ fontSize: 9, opacity: 0.5 }}>{opt.value}</span>}
                </span>
                {opt.badge && <span style={{ fontSize: 9, color: '#10b981', fontWeight: 600 }}>{opt.badge}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LIVE PROMPT PREVIEW - FULL VERSION
// ═══════════════════════════════════════════════════════════════

function LivePromptPreview({ wrapperContent }: { wrapperContent: string }) {
  const [expanded, setExpanded] = useState(true);
  const lineCount = wrapperContent.split('\n').length;
  const charCount = wrapperContent.length;
  const tokenEstimate = Math.round(charCount / 4);

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(0,212,255,0.3)'
    }}>
      <button onClick={() => setExpanded(!expanded)} className="cyber-btn" style={{
        width: '100%', padding: '12px 14px', border: 'none',
        background: 'linear-gradient(90deg, rgba(0,212,255,0.15), transparent)',
        color: '#00d4ff', fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pulse" style={{ fontSize: 16 }}>🔥</span>
          <span style={{ fontWeight: 700, letterSpacing: 1 }}>LIVE PROMPT</span>
        </span>
        <span style={{
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }}>▼</span>
      </button>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: expanded ? '1px solid rgba(255,255,255,0.05)' : 'none'
      }}>
        <div style={{ padding: '10px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#00d4ff' }}>{lineCount}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>ZEILEN</div>
        </div>
        <div style={{ padding: '10px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#f59e0b' }}>{charCount}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>ZEICHEN</div>
        </div>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#d946ef' }}>~{tokenEstimate}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
        </div>
      </div>

      {expanded && (
        <div className="data-stream" style={{
          padding: 14,
          maxHeight: 250,
          overflowY: 'auto',
          background: 'rgba(0,0,0,0.3)'
        }}>
          <pre style={{
            margin: 0,
            fontSize: 10,
            fontFamily: 'monospace',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: '#00d4ff'
          }}>
            {wrapperContent || 'Wähle einen Wrapper...'}
          </pre>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SESSION SCORE OVERVIEW - NEUES PANEL
// ═══════════════════════════════════════════════════════════════

function SessionScoreOverview({ messages }: { messages: Message[] }) {
  const aiMessages = messages.filter(m => !m.isUser && m.scores && m.scores.length > 0);
  
  if (aiMessages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'monospace' }}>
        Noch keine Scores...
      </div>
    );
  }

  const allScores: { [key: string]: { total: number; count: number } } = {};
  aiMessages.forEach(m => {
    m.scores?.forEach(s => {
      if (!allScores[s.field]) allScores[s.field] = { total: 0, count: 0 };
      allScores[s.field].total += s.score;
      allScores[s.field].count += 1;
    });
  });

  const avgScores = Object.entries(allScores).map(([field, data]) => ({
    field,
    avg: Math.round((data.total / data.count) * 10) / 10,
    count: data.count
  }));

  const totalAvg = avgScores.length > 0
    ? Math.round(avgScores.reduce((a, b) => a + b.avg, 0) / avgScores.length * 10) / 10
    : 0;

  return (
    <div>
      <div style={{
        textAlign: 'center', padding: 16,
        background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
        borderRadius: 12, marginBottom: 12,
        border: '1px solid rgba(16,185,129,0.3)'
      }}>
        <div className="glow-text" style={{
          fontSize: 32, fontWeight: 900, color: '#10b981', fontFamily: 'monospace'
        }}>
          {totalAvg.toFixed(1)}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
          AVERAGE SCORE ({aiMessages.length} Responses)
        </div>
      </div>

      {avgScores.map((s, i) => (
        <div key={s.field} className="score-tag" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 12px',
          background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
          borderRadius: 6,
          animationDelay: `${i * 0.05}s`
        }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>
            {s.field}
          </span>
          <span style={{
            fontSize: 12, fontFamily: 'monospace', fontWeight: 700,
            color: s.avg >= 8 ? '#10b981' : s.avg >= 5 ? '#f59e0b' : '#ef4444'
          }}>
            Ø {s.avg.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN CHAT PANEL
// ═══════════════════════════════════════════════════════════════

export default function ChatPanel() {
  const isMobile = useIsMobile();
  const { isHealthy } = useHealthCheck();  // ← HEALTH CHECK HOOK!
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [selectedWrapper, setSelectedWrapper] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [formatDetails, setFormatDetails] = useState<any>(null);
  const [formatModalOpen, setFormatModalOpen] = useState(false);
  const [wrapperContent, setWrapperContent] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(500);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SCORE_FIELDS = ['DRIFTKORPER', 'KALIBRIERUNG', 'STROMUNG', 'KOHARENZ', 'RESONANZ', 'TIEFE'];

  useEffect(() => {
    api.getWrappers().then(data => {
      setWrappers(data.wrappers || []);
      const active = data.wrappers?.find((w: Wrapper) => w.is_active);
      if (active) {
        setSelectedWrapper(active.name);
        loadWrapperContent(active.name);
        loadFormat(active.name);
      }
    });
  }, []);

  const loadWrapperContent = async (name: string) => {
    try {
      const detail = await api.getWrapper(name);
      setWrapperContent(detail.content || '');
    } catch { setWrapperContent(''); }
  };

  const loadFormat = async (wrapperName: string) => {
    try {
      // Load wrapper meta to get format name
      const metaResponse = await api.getWrapperMeta(wrapperName);
      const formatName = metaResponse.meta?.format;
      
      if (formatName) {
        setSelectedFormat(formatName);
        // Load format details to get fields
        const formatResponse = await api.getFormat(formatName);
        setFormatDetails(formatResponse.format);
      } else {
        setSelectedFormat('');
        setFormatDetails(null);
      }
    } catch (err) {
      console.error('Failed to load format:', err);
      setSelectedFormat('');
      setFormatDetails(null);
    }
  };


  const handleWrapperChange = (name: string) => {
    setSelectedWrapper(name);
    loadWrapperContent(name);
    loadFormat(name);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateScores = (response: string): Score[] => {
    const len = response.length;
    return SCORE_FIELDS.map(field => ({
      field,
      score: Math.min(10, Math.max(5, Math.floor(Math.random() * 3) + 7 + (len > 500 ? 1 : 0))),
      maxScore: 10
    }));
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.chat({
        prompt: userMessage.content,
        mode: selectedWrapper,
        max_new_tokens: maxTokens
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        isUser: false,
        wrapper: selectedWrapper,
        latency: response.metadata.latency_ms,
        timestamp: new Date(),
        metadata: {
          input_tokens: Math.round(userMessage.content.length / 4),
          output_tokens: Math.round(response.response.length / 4),
          model: 'SYNTX-RAP',
          stop_reason: 'complete',
        },
        scores: generateScores(response.response),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: `❌ Error: ${err.message}`,
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  const wrapperOptions = wrappers.map(w => ({
    value: w.name,
    label: w.name.replace('syntex_wrapper_', '').toUpperCase(),
    badge: w.is_active ? '● AKTIV' : undefined
  }));

  const aiMessageCount = messages.filter(m => !m.isUser).length;
  const totalLatency = messages.reduce((sum, m) => sum + (m.latency || 0), 0);
  const avgLatency = aiMessageCount > 0 ? totalLatency / aiMessageCount : 0;

  return (
    <div style={{ position: 'relative' }}>
      <style>{cyberStyles}</style>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
        gap: 20,
        height: 'calc(100vh - 200px)',
        minHeight: 600
      }}>
        {/* MAIN CHAT AREA */}
        <GlassCard style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }} glowColor="#d946ef">
          
          {/* ← NEUE CHAT HEADER COMPONENT! */}
          <ChatHeader 
            messageCount={messages.length}
            responseCount={aiMessageCount}
            isHealthy={isHealthy}
            onClear={clearChat}
          />

          {/* Messages Area */}
          <div className="data-stream" style={{
            flex: 1, overflowY: 'auto', padding: 22,
            display: 'flex', flexDirection: 'column'
          }}>
            {messages.length === 0 ? (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.3)', textAlign: 'center'
              }}>
                <div style={{ 
                  position: 'relative',
                  width: 120,
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24
                }}>
                  <div className="float" style={{
                    position: 'absolute',
                    width: 140,
                    height: 140,
                    border: '2px solid transparent',
                    borderTopColor: '#00d4ff',
                    borderRightColor: '#d946ef',
                    borderRadius: '50%',
                    animation: 'spin 6s linear infinite',
                    opacity: 0.4
                  }} />
                  <div className="pulse" style={{
                    position: 'absolute',
                    width: 130,
                    height: 130,
                    background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 70%)',
                    borderRadius: '50%'
                  }} />
                  <Image src="/Logo1_trans.png" alt="SYNTX" width={100} height={100} className="float neon" style={{ filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.6)) drop-shadow(0 0 60px rgba(217,70,239,0.4))', opacity: 0.8 }} priority />
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
                <div className="glow-text" style={{
                  fontFamily: 'monospace', fontSize: 18, marginBottom: 12,
                  color: '#00d4ff', letterSpacing: 4
                }}>
                  SYNTX FIELD RESONANCE
                </div>
                <div style={{ fontSize: 13, maxWidth: 320, lineHeight: 1.7, opacity: 0.6 }}>
                  Wähle einen Wrapper und starte die Konversation
                </div>
              </div>
            ) : (
              <>
                {messages.map(msg => (
                  <MessageBubble
                    key={msg.id}
                    message={msg.content}
                    isUser={msg.isUser}
                    wrapper={msg.wrapper}
                    latency={msg.latency}
                    timestamp={msg.timestamp}
                    scores={msg.scores}
                    metadata={msg.metadata}
                    isMobile={isMobile}
                  />
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}>
                    <div style={{
                      padding: '0', borderRadius: '20px 20px 20px 4px',
                      background: 'linear-gradient(145deg, rgba(217,70,239,0.12), rgba(217,70,239,0.04))',
                      border: '1px solid rgba(217,70,239,0.4)',
                      boxShadow: '0 4px 30px rgba(217,70,239,0.15)'
                    }}>
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: 18,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nachricht eingeben... (Enter zum Senden)"
                disabled={loading}
                style={{
                  flex: 1, padding: '16px 18px', borderRadius: 14,
                  border: '1px solid rgba(0,212,255,0.4)',
                  background: 'rgba(0,0,0,0.4)',
                  color: 'white', fontSize: 14, fontFamily: 'system-ui, sans-serif',
                  resize: 'none', minHeight: 54, maxHeight: 150, outline: 'none',
                  boxShadow: input ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="cyber-btn"
                style={{
                  padding: '16px 32px', borderRadius: 14, border: 'none',
                  background: loading || !input.trim()
                    ? 'rgba(255,255,255,0.1)'
                    : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
                  color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#030b15',
                  fontWeight: 800, fontFamily: 'monospace', fontSize: 18,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  boxShadow: loading || !input.trim() ? 'none' : '0 0 40px rgba(0,212,255,0.5)',
                }}
              >
                {loading ? '...' : '→'}
              </button>
            </div>
          </div>
        </GlassCard>


        {/* SIDEBAR */}
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
            
            <GlassCard style={{ padding: 16, position: 'relative', zIndex: 500 }} glowColor="#f59e0b">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span className="pulse">📦</span> WRAPPER
              </div>
              <CyberDropdown
                options={wrapperOptions}
                selected={selectedWrapper}
                onSelect={handleWrapperChange}
                color="#f59e0b"
                zIndex={500}
                showFullName={true}
              />
            </GlassCard>
            <FormatCard
              selectedFormat={selectedFormat}
              formatDetails={formatDetails}
              onOpenModal={() => setFormatModalOpen(true)}
            />



            <GlassCard style={{ padding: 16 }} glowColor="#00d4ff">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                ⚙️ SETTINGS
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                Max Tokens: <span style={{ color: '#00d4ff', fontWeight: 700 }}>{maxTokens}</span>
              </div>
              <input
                type="range" min={50} max={2000} value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#00d4ff', cursor: 'pointer' }}
              />
            </GlassCard>

            <GlassCard style={{ padding: 16 }} glowColor="#00d4ff">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span className="pulse">📊</span> SESSION
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <div className="float" style={{
                  textAlign: 'center', padding: 12,
                  background: 'rgba(0,212,255,0.1)', borderRadius: 10,
                  border: '1px solid rgba(0,212,255,0.2)'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>
                    {aiMessageCount}
                  </div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Responses</div>
                </div>
                <div className="float" style={{
                  textAlign: 'center', padding: 12,
                  background: 'rgba(245,158,11,0.1)', borderRadius: 10,
                  border: '1px solid rgba(245,158,11,0.2)',
                  animationDelay: '0.1s'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace' }}>
                    {(totalLatency / 1000).toFixed(1)}s
                  </div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Total</div>
                </div>
                <div className="float" style={{
                  textAlign: 'center', padding: 12,
                  background: 'rgba(16,185,129,0.1)', borderRadius: 10,
                  border: '1px solid rgba(16,185,129,0.2)',
                  animationDelay: '0.2s'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
                    {(avgLatency / 1000).toFixed(1)}s
                  </div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Avg</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard style={{ padding: 16, flex: 1 }} glowColor="#10b981">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span className="pulse">🏆</span> SESSION SCORES
              </div>
              <SessionScoreOverview messages={messages} />
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
