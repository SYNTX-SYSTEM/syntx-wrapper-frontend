// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   📦 WRAPPER CONTROL - FELD-LEBENSZYKLEN                                  ║
// ║   ─────────────────────────────────────────                               ║
// ║   🌟 Geboren  │  🔄 Moduliert  │  💀 Freigegeben  │  🎯 Aktiviert         ║
// ║                                                                           ║
// ║   ⚡ ULTRA CYBER EDITION - MAXIMUM RESONANZ ⚡                             ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, Wrapper, WrapperDetailResponse } from '@/lib/api';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import SearchBar from '@/components/ui/SearchBar';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 FELD-FARBEN - Kohärenz durch Farbe
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef', 
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
};

const getWrapperColor = (name: string): string => {
  if (name.includes('human')) return COLORS.green;
  if (name.includes('sigma')) return COLORS.orange;
  if (name.includes('deepsweep')) return COLORS.magenta;
  if (name.includes('true_raw')) return COLORS.red;
  if (name.includes('universal')) return COLORS.purple;
  return COLORS.cyan;
};

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 CYBER ANIMATIONS - Inline Keyframes
// ═══════════════════════════════════════════════════════════════════════════

const cyberStyles = `
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px var(--glow-color), inset 0 0 20px transparent; }
    50% { box-shadow: 0 0 40px var(--glow-color), 0 0 60px var(--glow-color), inset 0 0 30px var(--glow-color); }
  }
  
  @keyframes borderFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes scanLine {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  
  @keyframes dataFlow {
    0% { transform: translateY(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px); opacity: 0; }
  }
  
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
  }
  
  @keyframes rotateGlow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
    25% { transform: translate(10px, -20px) rotate(90deg); opacity: 0.8; }
    50% { transform: translate(-5px, -40px) rotate(180deg); opacity: 0.5; }
    75% { transform: translate(15px, -60px) rotate(270deg); opacity: 0.8; }
    100% { transform: translate(0, -80px) rotate(360deg); opacity: 0; }
  }

  .cyber-card {
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .cyber-card:hover {
    transform: translateY(-8px) scale(1.02);
    z-index: 10;
  }
  
  .cyber-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(45deg, var(--card-color), transparent, var(--card-color));
    background-size: 200% 200%;
    animation: borderFlow 3s ease infinite;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .cyber-card:hover::before {
    opacity: 1;
  }
  
  .cyber-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .cyber-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
  }
  
  .cyber-btn:hover::before {
    left: 100%;
  }
  
  .cyber-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px var(--btn-glow);
  }
  
  .glow-text {
    animation: textGlow 2s ease-in-out infinite;
  }
  
  .float-animation {
    animation: floatUp 4s ease-in-out infinite;
  }
  
  .scan-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--scan-color), transparent);
    animation: scanLine 2s linear infinite;
    pointer-events: none;
  }
`;

// ═══════════════════════════════════════════════════════════════════════════
// 🌟 CREATE MODAL - Feld gebären
// ═══════════════════════════════════════════════════════════════════════════

function CreateModal({ open, onClose, onSuccess }: { 
  open: boolean; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !content.trim()) {
      setError('Name und Content sind Pflichtfelder!');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.createWrapper({
        name: name.trim(),
        content: content,
        description: description || undefined,
        author: author || undefined,
      });
      onSuccess();
      onClose();
      setName(''); setContent(''); setDescription(''); setAuthor('');
    } catch (e: any) {
      setError(e.detail || e.message || 'Fehler beim Gebären');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Animated Background Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: COLORS.green,
            animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>
      
      <div style={{ 
        width: '100%', maxWidth: 700, 
        background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', 
        borderRadius: 24, 
        border: '2px solid rgba(16,185,129,0.6)', 
        overflow: 'hidden', 
        boxShadow: '0 0 80px rgba(16,185,129,0.4), inset 0 0 60px rgba(16,185,129,0.05)',
        position: 'relative',
      }}>
        {/* Scan Line Effect */}
        <div style={{ '--scan-color': COLORS.green } as any} className="scan-line" />
        
        {/* Header */}
        <div style={{ 
          padding: '28px 32px', 
          background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))', 
          borderBottom: '1px solid rgba(16,185,129,0.4)', 
          display: 'flex', alignItems: 'center', gap: 20,
          position: 'relative',
        }}>
          <div style={{ 
            width: 60, height: 60, borderRadius: 16, 
            background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))', 
            border: '2px solid rgba(16,185,129,0.6)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: 28,
            boxShadow: '0 0 30px rgba(16,185,129,0.4)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>🌟</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.green, letterSpacing: 3 }} className="glow-text">FELD GEBÄREN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Manifestiere ein neues Feld im SYNTX-System</p>
          </div>
          
          {/* Corner Decorations */}
          <div style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderTop: `2px solid ${COLORS.green}`, borderRight: `2px solid ${COLORS.green}`, opacity: 0.5 }} />
        </div>

        {/* Form */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: COLORS.green, marginBottom: 10, letterSpacing: 2 }}>
              <span style={{ width: 8, height: 8, background: COLORS.green, borderRadius: 2, boxShadow: `0 0 10px ${COLORS.green}` }} />
              FELD-NAME *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="mein_neues_feld"
              style={{ 
                width: '100%', padding: '16px 20px', borderRadius: 12, 
                border: '1px solid rgba(16,185,129,0.4)', 
                background: 'rgba(0,0,0,0.5)', color: 'white', 
                fontSize: 15, fontFamily: 'monospace', outline: 'none', 
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.green;
                e.target.style.boxShadow = `0 0 20px rgba(16,185,129,0.3)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(16,185,129,0.4)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: 2 }}>
                <span style={{ width: 6, height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                AUTOR
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="SYNTX System"
                style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: 2 }}>
                <span style={{ width: 6, height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                BESCHREIBUNG
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kurze Beschreibung..."
                style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: COLORS.green, marginBottom: 10, letterSpacing: 2 }}>
              <span style={{ width: 8, height: 8, background: COLORS.green, borderRadius: 2, boxShadow: `0 0 10px ${COLORS.green}` }} />
              FELD-CONTENT *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="=== SYNTX WRAPPER ===&#10;&#10;Hier kommt dein Wrapper-Content..."
              rows={10}
              style={{ 
                width: '100%', padding: '16px 20px', borderRadius: 12, 
                border: '1px solid rgba(16,185,129,0.4)', 
                background: 'rgba(0,0,0,0.5)', color: 'white', 
                fontSize: 14, fontFamily: 'monospace', outline: 'none', 
                resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box' 
              }}
            />
          </div>

          {error && (
            <div style={{ 
              padding: '14px 18px', borderRadius: 12, 
              background: 'rgba(239,68,68,0.15)', 
              border: '1px solid rgba(239,68,68,0.5)', 
              color: COLORS.red, fontSize: 13, fontFamily: 'monospace',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>⚠️</span> {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <button 
              onClick={onClose} 
              className="cyber-btn"
              style={{ 
                '--btn-glow': 'rgba(255,255,255,0.2)',
                flex: 1, padding: '16px 24px', borderRadius: 12, 
                border: '1px solid rgba(255,255,255,0.2)', 
                background: 'transparent', color: 'rgba(255,255,255,0.6)', 
                fontFamily: 'monospace', fontSize: 13, cursor: 'pointer',
              } as any}
            >
              ABBRECHEN
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="cyber-btn"
              style={{ 
                '--btn-glow': 'rgba(16,185,129,0.5)',
                flex: 2, padding: '16px 24px', borderRadius: 12, 
                border: 'none', 
                background: loading ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg, #10b981, #059669)', 
                color: '#030b15', fontFamily: 'monospace', fontSize: 13, 
                fontWeight: 700, letterSpacing: 3, 
                cursor: loading ? 'wait' : 'pointer', 
                boxShadow: '0 0 40px rgba(16,185,129,0.5)',
              } as any}
            >
              {loading ? '⏳ MANIFESTIERE...' : '🌟 FELD GEBÄREN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 EDIT MODAL - Feld modulieren
// ═══════════════════════════════════════════════════════════════════════════

function EditModal({ wrapper, onClose, onSuccess }: { 
  wrapper: WrapperDetailResponse; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [content, setContent] = useState(wrapper.content);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.updateWrapper(wrapper.name, {
        content: content,
        description: description || undefined,
      });
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.detail || e.message || 'Fehler beim Modulieren');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: COLORS.cyan,
            animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>
      
      <div style={{ 
        width: '100%', maxWidth: 850, maxHeight: '90vh', 
        background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', 
        borderRadius: 24, 
        border: '2px solid rgba(0,212,255,0.6)', 
        overflow: 'hidden', 
        display: 'flex', flexDirection: 'column', 
        boxShadow: '0 0 80px rgba(0,212,255,0.4), inset 0 0 60px rgba(0,212,255,0.05)',
        position: 'relative',
      }}>
        {/* Scan Line */}
        <div style={{ '--scan-color': COLORS.cyan } as any} className="scan-line" />
        
        {/* Header */}
        <div style={{ 
          padding: '24px 28px', 
          background: 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(0,212,255,0.05))', 
          borderBottom: '1px solid rgba(0,212,255,0.4)', 
          display: 'flex', alignItems: 'center', gap: 16,
          position: 'relative',
        }}>
          <div style={{ 
            width: 56, height: 56, borderRadius: 14, 
            background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))', 
            border: '2px solid rgba(0,212,255,0.6)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: 26,
            boxShadow: '0 0 30px rgba(0,212,255,0.4)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>🔄</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color: COLORS.cyan, letterSpacing: 3 }} className="glow-text">FELD MODULIEREN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name} • {wrapper.size_human}</p>
          </div>
          <div style={{ 
            padding: '8px 16px', borderRadius: 10, 
            background: wrapper.is_active ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.1)', 
            border: `1px solid ${wrapper.is_active ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.2)'}`, 
            fontSize: 11, fontFamily: 'monospace', 
            color: wrapper.is_active ? COLORS.green : 'rgba(255,255,255,0.5)',
            boxShadow: wrapper.is_active ? `0 0 20px rgba(16,185,129,0.3)` : 'none',
          }}>
            {wrapper.is_active ? '🎯 AKTIV' : 'INAKTIV'}
          </div>
          
          {/* Corner Decoration */}
          <div style={{ position: 'absolute', top: 10, right: 10, width: 25, height: 25, borderTop: `2px solid ${COLORS.cyan}`, borderRight: `2px solid ${COLORS.cyan}`, opacity: 0.5 }} />
        </div>

        {/* Form */}
        <div style={{ flex: 1, padding: 28, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: 2 }}>
              <span style={{ width: 6, height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
              MODULATIONS-NOTIZ (optional)
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Was wurde geändert..."
              style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 14, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: COLORS.cyan, marginBottom: 10, letterSpacing: 2 }}>
              <span style={{ width: 8, height: 8, background: COLORS.cyan, borderRadius: 2, boxShadow: `0 0 10px ${COLORS.cyan}` }} />
              FELD-CONTENT
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ 
                flex: 1, minHeight: 280, width: '100%', padding: '16px 18px', 
                borderRadius: 12, border: '1px solid rgba(0,212,255,0.4)', 
                background: 'rgba(0,0,0,0.5)', color: 'white', 
                fontSize: 13, fontFamily: 'monospace', outline: 'none', 
                resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box' 
              }}
            />
          </div>

          {error && (
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', gap: 16 }}>
          <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '14px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 12, cursor: 'pointer' } as any}>ABBRECHEN</button>
          <button onClick={handleSubmit} disabled={loading} className="cyber-btn" style={{ '--btn-glow': 'rgba(0,212,255,0.5)', flex: 2, padding: '14px 20px', borderRadius: 12, border: 'none', background: loading ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00d4ff, #00a8cc)', color: '#030b15', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, letterSpacing: 3, cursor: loading ? 'wait' : 'pointer', boxShadow: '0 0 40px rgba(0,212,255,0.5)' } as any}>
            {loading ? '⏳ MODULIERE...' : '🔄 FELD MODULIEREN'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 💀 DELETE MODAL - Feld freigeben
// ═══════════════════════════════════════════════════════════════════════════

function DeleteModal({ wrapper, onClose, onSuccess }: { 
  wrapper: Wrapper; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [confirmName, setConfirmName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmName !== wrapper.name) {
      setError('Name stimmt nicht überein!');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.deleteWrapper(wrapper.name);
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.detail || e.message || 'Fehler beim Freigeben');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Red Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: COLORS.red,
            animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>
      
      <div style={{ 
        width: '100%', maxWidth: 520, 
        background: 'linear-gradient(135deg, rgba(26,10,10,0.98), rgba(10,5,5,0.99))', 
        borderRadius: 24, 
        border: '2px solid rgba(239,68,68,0.6)', 
        overflow: 'hidden', 
        boxShadow: '0 0 80px rgba(239,68,68,0.4), inset 0 0 60px rgba(239,68,68,0.05)',
        position: 'relative',
      }}>
        {/* Scan Line */}
        <div style={{ '--scan-color': COLORS.red } as any} className="scan-line" />
        
        {/* Header */}
        <div style={{ 
          padding: '28px 32px', 
          background: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.05))', 
          borderBottom: '1px solid rgba(239,68,68,0.4)', 
          display: 'flex', alignItems: 'center', gap: 20,
        }}>
          <div style={{ 
            width: 60, height: 60, borderRadius: 16, 
            background: 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.1))', 
            border: '2px solid rgba(239,68,68,0.6)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: 28,
            boxShadow: '0 0 30px rgba(239,68,68,0.4)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>💀</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.red, letterSpacing: 3 }} className="glow-text">FELD FREIGEBEN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>⚠️ UNWIDERRUFLICHE AKTION!</p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ 
            padding: 24, borderRadius: 16, 
            background: 'rgba(239,68,68,0.1)', 
            border: '1px solid rgba(239,68,68,0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 24 }}>📦</span>
              <span style={{ fontFamily: 'monospace', fontSize: 18, color: 'white', fontWeight: 700 }}>{wrapper.name}</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 20 }}>
              <span>📊 {wrapper.size_human}</span>
              <span>📅 {new Date(wrapper.last_modified).toLocaleDateString('de-DE')}</span>
              {wrapper.is_active && <span style={{ color: COLORS.green }}>🎯 AKTIV</span>}
            </div>
          </div>

          {wrapper.is_active && (
            <div style={{ 
              padding: '16px 20px', borderRadius: 12, 
              background: 'rgba(245,158,11,0.15)', 
              border: '1px solid rgba(245,158,11,0.5)', 
              color: COLORS.orange, fontSize: 13, fontFamily: 'monospace',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <span>WARNUNG: Dies ist das aktive Default-Feld!</span>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: 2 }}>
              Tippe "<span style={{ color: COLORS.red, fontWeight: 700 }}>{wrapper.name}</span>" zur Bestätigung
            </label>
            <input
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={wrapper.name}
              style={{ 
                width: '100%', padding: '16px 20px', borderRadius: 12, 
                border: `1px solid ${confirmName === wrapper.name ? 'rgba(239,68,68,0.8)' : 'rgba(239,68,68,0.3)'}`, 
                background: 'rgba(0,0,0,0.5)', color: 'white', 
                fontSize: 15, fontFamily: 'monospace', outline: 'none', 
                boxSizing: 'border-box',
                boxShadow: confirmName === wrapper.name ? '0 0 20px rgba(239,68,68,0.3)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </div>

          {error && (
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.6)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer' } as any}>ABBRECHEN</button>
            <button 
              onClick={handleDelete} 
              disabled={loading || confirmName !== wrapper.name} 
              className="cyber-btn"
              style={{ 
                '--btn-glow': 'rgba(239,68,68,0.5)',
                flex: 2, padding: '16px 20px', borderRadius: 12, 
                border: 'none', 
                background: (loading || confirmName !== wrapper.name) ? 'rgba(239,68,68,0.3)' : 'linear-gradient(135deg, #ef4444, #dc2626)', 
                color: 'white', fontFamily: 'monospace', fontSize: 13, 
                fontWeight: 700, letterSpacing: 2, 
                cursor: (loading || confirmName !== wrapper.name) ? 'not-allowed' : 'pointer', 
                boxShadow: (loading || confirmName !== wrapper.name) ? 'none' : '0 0 40px rgba(239,68,68,0.5)',
                opacity: (loading || confirmName !== wrapper.name) ? 0.6 : 1,
              } as any}
            >
              {loading ? '⏳ FREIGEBE...' : '💀 UNWIDERRUFLICH FREIGEBEN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 WRAPPER CARD - Einzelnes Feld visualisieren (ULTRA CYBER)
// ═══════════════════════════════════════════════════════════════════════════

function WrapperCard({ wrapper, onView, onEdit, onDelete, onActivate, isActivating }: {
  wrapper: Wrapper;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onActivate: () => void;
  isActivating: boolean;
}) {
  const color = getWrapperColor(wrapper.name);
  const displayName = wrapper.name.replace('syntex_wrapper_', '').replace('syntx_', '').replace('_', ' ');
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="cyber-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        '--card-color': color,
        '--glow-color': `${color}40`,
        background: `linear-gradient(135deg, ${color}10, ${color}03)`,
        border: `1px solid ${color}${hovered ? '80' : '30'}`,
        borderRadius: 20,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        animation: hovered ? 'glowPulse 2s ease-in-out infinite' : 'none',
      } as any}
    >
      {/* Glow Orb */}
      <div style={{
        position: 'absolute',
        top: -60, right: -60,
        width: 140, height: 140,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}${hovered ? '30' : '15'}, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'all 0.5s ease',
      }} />
      
      {/* Scan Line on Hover */}
      {hovered && <div style={{ '--scan-color': color } as any} className="scan-line" />}
      
      {/* Data Flow Particles */}
      {hovered && (
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              bottom: 0,
              left: `${i * 20 - 20}px`,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 10px ${color}`,
              animation: `dataFlow 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
        </div>
      )}
      
      {/* Corner Decorations */}
      <div style={{ 
        position: 'absolute', top: 8, left: 8, 
        width: 16, height: 16, 
        borderTop: `2px solid ${color}${hovered ? '80' : '40'}`, 
        borderLeft: `2px solid ${color}${hovered ? '80' : '40'}`,
        transition: 'all 0.3s ease',
      }} />
      <div style={{ 
        position: 'absolute', bottom: 8, right: 8, 
        width: 16, height: 16, 
        borderBottom: `2px solid ${color}${hovered ? '80' : '40'}`, 
        borderRight: `2px solid ${color}${hovered ? '80' : '40'}`,
        transition: 'all 0.3s ease',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
            border: `2px solid ${color}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
            boxShadow: hovered ? `0 0 25px ${color}50` : 'none',
            transition: 'all 0.3s ease',
          }}>📦</div>
          <div>
            <div style={{ 
              fontFamily: 'monospace', fontSize: 15, color, fontWeight: 700, letterSpacing: 2,
              textShadow: hovered ? `0 0 20px ${color}` : 'none',
              transition: 'all 0.3s ease',
            }}>
              {displayName.toUpperCase()}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>
              {wrapper.size_human}
            </div>
          </div>
        </div>
        {wrapper.is_active && (
          <div style={{
            padding: '6px 12px', borderRadius: 8, fontSize: 10, fontFamily: 'monospace',
            background: 'rgba(16,185,129,0.2)', color: COLORS.green, 
            border: '1px solid rgba(16,185,129,0.5)',
            boxShadow: '0 0 15px rgba(16,185,129,0.3)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}` }} />
            AKTIV
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ 
        fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 20, fontFamily: 'monospace',
        display: 'flex', alignItems: 'center', gap: 8,
        position: 'relative', zIndex: 1,
      }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, opacity: 0.5 }} />
        Letzte Modulation: {new Date(wrapper.last_modified).toLocaleDateString('de-DE')}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 1 }}>
        <button onClick={onView} className="cyber-btn" style={{
          '--btn-glow': `${color}50`,
          flex: 1, padding: '12px 14px', borderRadius: 10,
          border: `1px solid ${color}50`, background: `${color}15`, color,
          fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontWeight: 600,
        } as any}>👁️ VIEW</button>
        <button onClick={onEdit} className="cyber-btn" style={{
          '--btn-glow': 'rgba(0,212,255,0.4)',
          flex: 1, padding: '12px 14px', borderRadius: 10,
          border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan,
          fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontWeight: 600,
        } as any}>🔄 EDIT</button>
        {!wrapper.is_active && (
          <button onClick={onActivate} disabled={isActivating} className="cyber-btn" style={{
            '--btn-glow': 'rgba(16,185,129,0.4)',
            flex: 1, padding: '12px 14px', borderRadius: 10,
            border: '1px solid rgba(16,185,129,0.5)', background: 'rgba(16,185,129,0.15)', color: COLORS.green,
            fontFamily: 'monospace', fontSize: 11, cursor: isActivating ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            opacity: isActivating ? 0.5 : 1,
            fontWeight: 600,
          } as any}>🎯 AKTIV</button>
        )}
        <button onClick={onDelete} className="cyber-btn" style={{
          '--btn-glow': 'rgba(239,68,68,0.4)',
          padding: '12px 14px', borderRadius: 10,
          border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.15)', color: COLORS.red,
          fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
          fontWeight: 600,
        } as any}>💀</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📋 VIEW MODAL - Feld Content anzeigen
// ═══════════════════════════════════════════════════════════════════════════

function ViewModal({ wrapper, onClose, onEdit }: { 
  wrapper: Wrapper; 
  onClose: () => void;
  onEdit: (detail: WrapperDetailResponse) => void;
}) {
  const [detail, setDetail] = useState<WrapperDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const color = getWrapperColor(wrapper.name);

  useEffect(() => {
    api.getWrapper(wrapper.name)
      .then(setDetail)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [wrapper.name]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: color,
            animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>
      
      <div style={{ 
        width: '100%', maxWidth: 950, maxHeight: '90vh', 
        background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', 
        borderRadius: 24, 
        border: `2px solid ${color}60`, 
        overflow: 'hidden', 
        display: 'flex', flexDirection: 'column', 
        boxShadow: `0 0 80px ${color}40, inset 0 0 60px ${color}05`,
        position: 'relative',
      }}>
        {/* Scan Line */}
        <div style={{ '--scan-color': color } as any} className="scan-line" />
        
        {/* Header */}
        <div style={{ 
          padding: '20px 28px', 
          borderBottom: '1px solid rgba(255,255,255,0.1)', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          background: 'rgba(0,0,0,0.4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 12,
              background: `${color}20`,
              border: `2px solid ${color}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
              boxShadow: `0 0 20px ${color}30`,
            }}>📦</div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 18, color }} className="glow-text">{wrapper.name}</h2>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                {wrapper.size_human} • {new Date(wrapper.last_modified).toLocaleString('de-DE')}
                {wrapper.is_active && <span style={{ color: COLORS.green, marginLeft: 10 }}>• 🎯 AKTIV</span>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {detail && (
              <button onClick={() => onEdit(detail)} className="cyber-btn" style={{
                '--btn-glow': 'rgba(0,212,255,0.4)',
                background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.4)',
                borderRadius: 10, padding: '10px 18px', color: COLORS.cyan, cursor: 'pointer', 
                fontFamily: 'monospace', fontSize: 12, fontWeight: 600,
              } as any}>🔄 EDIT</button>
            )}
            <button onClick={onClose} className="cyber-btn" style={{
              '--btn-glow': 'rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 10, padding: '10px 18px', color: 'white', cursor: 'pointer', 
              fontFamily: 'monospace', fontSize: 12,
            } as any}>✕ CLOSE</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ 
                fontSize: 48, marginBottom: 20,
                animation: 'pulse 1.5s ease-in-out infinite',
              }}>🌊</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14 }}>Lade Feld-Content...</div>
            </div>
          ) : (
            <pre style={{
              margin: 0, padding: 24, 
              background: 'rgba(0,0,0,0.5)', 
              borderRadius: 16,
              border: `1px solid ${color}20`,
              fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.9)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace',
            }}>{detail?.content}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 MAIN COMPONENT - WrapperControl (ULTRA CYBER)
// ═══════════════════════════════════════════════════════════════════════════

export default function WrapperControl() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activating, setActivating] = useState<string | null>(null);
  
  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [viewWrapper, setViewWrapper] = useState<Wrapper | null>(null);
  const [editWrapper, setEditWrapper] = useState<WrapperDetailResponse | null>(null);
  const [deleteWrapper, setDeleteWrapper] = useState<Wrapper | null>(null);

  const { exportJSON, exportCSV } = useExport();

  // Inject Styles
  useEffect(() => {
    const styleId = 'cyber-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cyberStyles;
      document.head.appendChild(style);
    }
  }, []);

  // Fetch Wrappers
  const fetchWrappers = useCallback(async () => {
    try {
      const data = await api.getWrappers();
      setWrappers(data.wrappers || []);
    } catch (e) {
      console.error('Failed to fetch wrappers:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWrappers();
  }, [fetchWrappers]);

  // Activate Wrapper
  const handleActivate = async (name: string) => {
    setActivating(name);
    try {
      await api.activateWrapper(name);
      await fetchWrappers();
    } catch (e) {
      console.error('Activation failed:', e);
    } finally {
      setActivating(null);
    }
  };

  // Filter
  const filtered = wrappers.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = wrappers.filter(w => w.is_active).length;

  // Export
  const handleExportJSON = () => exportJSON(filtered, 'syntx_wrappers');
  const handleExportCSV = () => exportCSV(filtered, 'syntx_wrappers', [
    { key: 'name', label: 'Name' },
    { key: 'size_human', label: 'Size' },
    { key: 'last_modified', label: 'Last Modified' },
    { key: 'is_active', label: 'Active' },
  ]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 32, flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="float-animation" style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(217,70,239,0.08))',
            border: '2px solid rgba(217,70,239,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
            boxShadow: '0 0 40px rgba(217,70,239,0.4)',
          }}>📦</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.magenta, letterSpacing: 4 }} className="glow-text">WRAPPER CONTROL</h2>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.cyan, boxShadow: `0 0 10px ${COLORS.cyan}` }} />
                {wrappers.length} Felder
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 10px ${COLORS.green}` }} />
                {activeCount} aktiv
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Feld suchen..." />
          <ExportButton onExportJSON={handleExportJSON} onExportCSV={handleExportCSV} disabled={filtered.length === 0} color={COLORS.magenta} />
          <button onClick={() => setCreateOpen(true)} className="cyber-btn" style={{
            '--btn-glow': 'rgba(16,185,129,0.5)',
            padding: '14px 28px', borderRadius: 12,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none', color: '#030b15', fontWeight: 700,
            fontFamily: 'monospace', fontSize: 13, letterSpacing: 3,
            cursor: 'pointer', boxShadow: '0 0 40px rgba(16,185,129,0.5)',
            display: 'flex', alignItems: 'center', gap: 10,
          } as any}>
            🌟 GEBÄREN
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.4)' }}>
          <div style={{ fontSize: 64, marginBottom: 20, animation: 'pulse 1.5s ease-in-out infinite' }}>🌊</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16, letterSpacing: 2 }}>LADE FELDER...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.4)' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>📦</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16, letterSpacing: 2 }}>KEINE FELDER GEFUNDEN</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {filtered.map((w, i) => (
            <div key={w.name} style={{ animation: `slideUp 0.5s ease ${i * 0.05}s both` }}>
              <WrapperCard
                wrapper={w}
                onView={() => setViewWrapper(w)}
                onEdit={() => { api.getWrapper(w.name).then(setEditWrapper).catch(console.error); }}
                onDelete={() => setDeleteWrapper(w)}
                onActivate={() => handleActivate(w.name)}
                isActivating={activating === w.name}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={fetchWrappers} />
      {viewWrapper && <ViewModal wrapper={viewWrapper} onClose={() => setViewWrapper(null)} onEdit={(detail) => { setViewWrapper(null); setEditWrapper(detail); }} />}
      {editWrapper && <EditModal wrapper={editWrapper} onClose={() => setEditWrapper(null)} onSuccess={fetchWrappers} />}
      {deleteWrapper && <DeleteModal wrapper={deleteWrapper} onClose={() => setDeleteWrapper(null)} onSuccess={fetchWrappers} />}
    </div>
  );
}
