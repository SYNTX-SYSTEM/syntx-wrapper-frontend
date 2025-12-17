// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   📦 WRAPPER CONTROL - FELD-LEBENSZYKLEN                                  ║
// ║   ─────────────────────────────────────────                               ║
// ║   🌟 Geboren  │  🔄 Moduliert  │  💀 Freigegeben  │  🎯 Aktiviert         ║
// ║                                                                           ║
// ║   ⚡ ULTRA CYBER EDITION v2 - MIT WRAPPER STATS ⚡                         ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, Wrapper, WrapperDetailResponse } from '@/lib/api';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import SearchBar from '@/components/ui/SearchBar';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 FELD-FARBEN
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
// 🌊 CYBER ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

const cyberStyles = `
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px var(--glow-color); }
    50% { box-shadow: 0 0 40px var(--glow-color), 0 0 60px var(--glow-color); }
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
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0); opacity: 0.3; }
    50% { transform: translate(-5px, -40px); opacity: 0.5; }
    100% { transform: translate(0, -80px); opacity: 0; }
  }
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes countUp {
    0% { opacity: 0; transform: scale(0.5); }
    100% { opacity: 1; transform: scale(1); }
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
  .cyber-card:hover::before { opacity: 1; }
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
  .cyber-btn:hover::before { left: 100%; }
  .cyber-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px var(--btn-glow);
  }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float-animation { animation: floatUp 4s ease-in-out infinite; }
  .scan-line {
    position: absolute;
    left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--scan-color), transparent);
    animation: scanLine 2s linear infinite;
    pointer-events: none;
  }
  .stat-number { animation: countUp 0.6s ease-out forwards; }
`;

// ═══════════════════════════════════════════════════════════════════════════
// 📊 WRAPPER STATS TYPE
// ═══════════════════════════════════════════════════════════════════════════

interface WrapperStats {
  wrapper: string;
  requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌟 CREATE MODAL
// ═══════════════════════════════════════════════════════════════════════════

function CreateModal({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void; }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !content.trim()) { setError('Name und Content sind Pflichtfelder!'); return; }
    setLoading(true); setError(null);
    try {
      await api.createWrapper({ name: name.trim(), content, description: description || undefined, author: author || undefined });
      onSuccess(); onClose();
      setName(''); setContent(''); setDescription(''); setAuthor('');
    } catch (e: any) { setError(e.detail || e.message || 'Fehler'); }
    finally { setLoading(false); }
  };

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 4, height: 4, borderRadius: '50%', background: COLORS.green, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 700, maxHeight: '90vh', background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: '2px solid rgba(16,185,129,0.6)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 0 80px rgba(16,185,129,0.4)', position: 'relative' }}>
        <div style={{ '--scan-color': COLORS.green } as any} className="scan-line" />
        <div style={{ padding: '28px 32px', background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))', borderBottom: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(16,185,129,0.2)', border: '2px solid rgba(16,185,129,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 0 30px rgba(16,185,129,0.4)', animation: 'pulse 2s ease-in-out infinite' }}>🌟</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.green, letterSpacing: 3 }} className="glow-text">FELD GEBÄREN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Manifestiere ein neues Feld</p>
          </div>
        </div>
        <div style={{ flex: 1, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, overflow: 'auto' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: COLORS.green, marginBottom: 10, letterSpacing: 2 }}><span style={{ width: 8, height: 8, background: COLORS.green, borderRadius: 2 }} />FELD-NAME *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="mein_neues_feld" style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, display: 'block', letterSpacing: 2 }}>AUTOR</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="SYNTX" style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, display: 'block', letterSpacing: 2 }}>BESCHREIBUNG</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung..." style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: COLORS.green, marginBottom: 10, letterSpacing: 2 }}><span style={{ width: 8, height: 8, background: COLORS.green, borderRadius: 2 }} />FELD-CONTENT *</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="=== SYNTX WRAPPER ===" style={{ flex: 1, minHeight: 200, width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 14, fontFamily: 'monospace', outline: 'none', resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box' }} />
          </div>
          {error && <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>⚠️ {error}</div>}
          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer' } as any}>ABBRECHEN</button>
            <button onClick={handleSubmit} disabled={loading} className="cyber-btn" style={{ '--btn-glow': 'rgba(16,185,129,0.5)', flex: 2, padding: '16px 24px', borderRadius: 12, border: 'none', background: loading ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg, #10b981, #059669)', color: '#030b15', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 3, cursor: loading ? 'wait' : 'pointer' } as any}>{loading ? '⏳ MANIFESTIERE...' : '🌟 FELD GEBÄREN'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 EDIT MODAL - FIXED: Nur Content in großem Feld!
// ═══════════════════════════════════════════════════════════════════════════

function EditModal({ wrapper, onClose, onSuccess }: { wrapper: WrapperDetailResponse; onClose: () => void; onSuccess: () => void; }) {
  const [content, setContent] = useState(wrapper.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const color = getWrapperColor(wrapper.name);

  const handleSubmit = async () => {
    if (!content.trim()) { setError('Content darf nicht leer sein!'); return; }
    setLoading(true); setError(null);
    try {
      await api.updateWrapper(wrapper.name, { content });
      onSuccess(); onClose();
    } catch (e: any) { setError(e.detail || e.message || 'Fehler'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 3, height: 3, borderRadius: '50%', background: color, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 1000, height: '85vh', background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: `2px solid ${color}60`, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 0 80px ${color}40`, position: 'relative' }}>
        <div style={{ '--scan-color': color } as any} className="scan-line" />
        <div style={{ padding: '20px 28px', background: `linear-gradient(135deg, ${color}25, ${color}05)`, borderBottom: `1px solid ${color}40`, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${color}20`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 0 30px ${color}40`, animation: 'pulse 2s ease-in-out infinite' }}>🔄</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }} className="glow-text">FELD MODULIEREN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name} • {wrapper.size_human}</p>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: 10, background: wrapper.is_active ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.1)', border: `1px solid ${wrapper.is_active ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.2)'}`, fontSize: 11, fontFamily: 'monospace', color: wrapper.is_active ? COLORS.green : 'rgba(255,255,255,0.5)' }}>{wrapper.is_active ? '🎯 AKTIV' : 'INAKTIV'}</div>
        </div>
        <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color, marginBottom: 12, letterSpacing: 2 }}><span style={{ width: 8, height: 8, background: color, borderRadius: 2, boxShadow: `0 0 10px ${color}` }} />FELD-CONTENT BEARBEITEN</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ flex: 1, width: '100%', padding: 20, borderRadius: 16, border: `2px solid ${color}40`, background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.95)', fontSize: 14, fontFamily: 'monospace', outline: 'none', resize: 'none', lineHeight: 1.8, boxSizing: 'border-box' }} onFocus={(e) => { e.target.style.borderColor = color; e.target.style.boxShadow = `0 0 30px ${color}30`; }} onBlur={(e) => { e.target.style.borderColor = `${color}40`; e.target.style.boxShadow = 'none'; }} />
          {error && <div style={{ marginTop: 16, padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>⚠️ {error}</div>}
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', gap: 16 }}>
          <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer' } as any}>ABBRECHEN</button>
          <button onClick={handleSubmit} disabled={loading} className="cyber-btn" style={{ '--btn-glow': `${color}50`, flex: 2, padding: '16px 20px', borderRadius: 12, border: 'none', background: loading ? `${color}30` : `linear-gradient(135deg, ${color}, ${color}cc)`, color: '#030b15', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 3, cursor: loading ? 'wait' : 'pointer', boxShadow: `0 0 40px ${color}50` } as any}>{loading ? '⏳ MODULIERE...' : '🔄 FELD MODULIEREN'}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 💀 DELETE MODAL
// ═══════════════════════════════════════════════════════════════════════════

function DeleteModal({ wrapper, onClose, onSuccess }: { wrapper: Wrapper; onClose: () => void; onSuccess: () => void; }) {
  const [confirmName, setConfirmName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmName !== wrapper.name) { setError('Name stimmt nicht überein!'); return; }
    setLoading(true); setError(null);
    try { await api.deleteWrapper(wrapper.name); onSuccess(); onClose(); }
    catch (e: any) { setError(e.detail || e.message || 'Fehler'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 4, height: 4, borderRadius: '50%', background: COLORS.red, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 520, background: 'linear-gradient(135deg, rgba(26,10,10,0.98), rgba(10,5,5,0.99))', borderRadius: 24, border: '2px solid rgba(239,68,68,0.6)', overflow: 'hidden', boxShadow: '0 0 80px rgba(239,68,68,0.4)', position: 'relative' }}>
        <div style={{ '--scan-color': COLORS.red } as any} className="scan-line" />
        <div style={{ padding: '28px 32px', background: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.05))', borderBottom: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(239,68,68,0.2)', border: '2px solid rgba(239,68,68,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, animation: 'pulse 1.5s ease-in-out infinite' }}>💀</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.red, letterSpacing: 3 }} className="glow-text">FELD FREIGEBEN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>⚠️ UNWIDERRUFLICH!</p>
          </div>
        </div>
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ padding: 24, borderRadius: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 24 }}>📦</span>
              <span style={{ fontFamily: 'monospace', fontSize: 18, color: 'white', fontWeight: 700 }}>{wrapper.name}</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 20 }}>
              <span>📊 {wrapper.size_human}</span>
              {wrapper.is_active && <span style={{ color: COLORS.green }}>🎯 AKTIV</span>}
            </div>
          </div>
          {wrapper.is_active && <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.5)', color: COLORS.orange, fontSize: 13, fontFamily: 'monospace' }}>⚠️ WARNUNG: Dies ist das aktive Default-Feld!</div>}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Tippe "<span style={{ color: COLORS.red, fontWeight: 700 }}>{wrapper.name}</span>" zur Bestätigung</label>
            <input value={confirmName} onChange={(e) => setConfirmName(e.target.value)} placeholder={wrapper.name} style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: `1px solid ${confirmName === wrapper.name ? 'rgba(239,68,68,0.8)' : 'rgba(239,68,68,0.3)'}`, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          {error && <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.2)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>⚠️ {error}</div>}
          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer' } as any}>ABBRECHEN</button>
            <button onClick={handleDelete} disabled={loading || confirmName !== wrapper.name} className="cyber-btn" style={{ '--btn-glow': 'rgba(239,68,68,0.5)', flex: 2, padding: '16px 20px', borderRadius: 12, border: 'none', background: (loading || confirmName !== wrapper.name) ? 'rgba(239,68,68,0.3)' : 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, cursor: (loading || confirmName !== wrapper.name) ? 'not-allowed' : 'pointer', opacity: (loading || confirmName !== wrapper.name) ? 0.6 : 1 } as any}>{loading ? '⏳...' : '💀 FREIGEBEN'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📊 STATS MODAL - NEUER ENDPOINT!
// ═══════════════════════════════════════════════════════════════════════════

function StatsModal({ wrapper, onClose }: { wrapper: Wrapper; onClose: () => void; }) {
  const [stats, setStats] = useState<WrapperStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const color = getWrapperColor(wrapper.name);

  useEffect(() => {
    api.getWrapperStats(wrapper.name)
      .then(setStats)
      .catch((e: any) => setError(e.message || 'Keine Stats'))
      .finally(() => setLoading(false));
  }, [wrapper.name]);

  const StatBox = ({ label, value, unit, icon }: { label: string; value: number | string; unit?: string; icon: string }) => (
    <div style={{ padding: 20, borderRadius: 16, background: `${color}10`, border: `1px solid ${color}30` }}>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{icon} {label}</div>
      <div style={{ fontSize: 28, fontFamily: 'monospace', color, fontWeight: 700 }} className="stat-number">
        {typeof value === 'number' ? value.toLocaleString() : value}{unit && <span style={{ fontSize: 14, opacity: 0.7, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 3, height: 3, borderRadius: '50%', background: color, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 700, background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: `2px solid ${color}60`, overflow: 'hidden', boxShadow: `0 0 80px ${color}40`, position: 'relative' }}>
        <div style={{ '--scan-color': color } as any} className="scan-line" />
        <div style={{ padding: '24px 28px', background: `linear-gradient(135deg, ${color}25, ${color}05)`, borderBottom: `1px solid ${color}40`, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${color}20`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 0 30px ${color}40`, animation: 'pulse 2s ease-in-out infinite' }}>📊</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }} className="glow-text">FELD STATISTIKEN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name}</p>
          </div>
          <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px 18px', color: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 } as any}>✕</button>
        </div>
        <div style={{ padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 20, animation: 'pulse 1.5s ease-in-out infinite' }}>📊</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Lade Statistiken...</div>
            </div>
          ) : error || !stats ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>📭</div>
              <div style={{ fontFamily: 'monospace', fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>Keine Statistiken verfügbar</div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 10 }}>Dieses Feld wurde noch nicht verwendet</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                <StatBox label="TOTAL REQUESTS" value={stats.requests} icon="📨" />
                <StatBox label="SUCCESS RATE" value={stats.success_rate.toFixed(1)} unit="%" icon="✅" />
                <StatBox label="AVG LATENCY" value={Math.round(stats.average_latency_ms)} unit="ms" icon="⚡" />
              </div>
              <div style={{ padding: 20, borderRadius: 16, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>⏱️ LATENCY DETAILS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MIN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.green }}>{stats.min_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MEDIAN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.cyan }}>{stats.median_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MAX</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.orange }}>{stats.max_latency_ms.toLocaleString()} ms</div></div>
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>PERFORMANCE</span>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color }}>{stats.success_rate >= 95 ? '🔥 EXCELLENT' : stats.success_rate >= 80 ? '✅ GOOD' : '⚠️ ATTENTION'}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{ width: `${stats.success_rate}%`, height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 20px ${color}50` }} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📋 VIEW MODAL
// ═══════════════════════════════════════════════════════════════════════════

function ViewModal({ wrapper, onClose, onEdit, onStats }: { wrapper: Wrapper; onClose: () => void; onEdit: (d: WrapperDetailResponse) => void; onStats: () => void; }) {
  const [detail, setDetail] = useState<WrapperDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const color = getWrapperColor(wrapper.name);

  useEffect(() => { api.getWrapper(wrapper.name).then(setDetail).catch(console.error).finally(() => setLoading(false)); }, [wrapper.name]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(10)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 3, height: 3, borderRadius: '50%', background: color, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 950, maxHeight: '90vh', background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: `2px solid ${color}60`, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 0 80px ${color}40`, position: 'relative' }}>
        <div style={{ '--scan-color': color } as any} className="scan-line" />
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: `${color}20`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📦</div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 18, color }} className="glow-text">{wrapper.name}</h2>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{wrapper.size_human}{wrapper.is_active && <span style={{ color: COLORS.green, marginLeft: 10 }}>• 🎯 AKTIV</span>}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onStats} className="cyber-btn" style={{ '--btn-glow': `${COLORS.purple}40`, background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}40`, borderRadius: 10, padding: '10px 18px', color: COLORS.purple, cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: 600 } as any}>📊 STATS</button>
            {detail && <button onClick={() => onEdit(detail)} className="cyber-btn" style={{ '--btn-glow': `${COLORS.cyan}40`, background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}40`, borderRadius: 10, padding: '10px 18px', color: COLORS.cyan, cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: 600 } as any}>🔄 EDIT</button>}
            <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px 18px', color: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 } as any}>✕</button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: 48, marginBottom: 20, animation: 'pulse 1.5s ease-in-out infinite' }}>🌊</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14 }}>Lade Content...</div>
            </div>
          ) : (
            <pre style={{ margin: 0, padding: 24, background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: `1px solid ${color}20`, fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace' }}>{detail?.content}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 WRAPPER CARD
// ═══════════════════════════════════════════════════════════════════════════

function WrapperCard({ wrapper, onView, onEdit, onDelete, onActivate, onStats, isActivating }: { wrapper: Wrapper; onView: () => void; onEdit: () => void; onDelete: () => void; onActivate: () => void; onStats: () => void; isActivating: boolean; }) {
  const color = getWrapperColor(wrapper.name);
  const displayName = wrapper.name.replace('syntex_wrapper_', '').replace('syntx_', '').replace(/_/g, ' ');
  const [hovered, setHovered] = useState(false);

  return (
    <div className="cyber-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ '--card-color': color, '--glow-color': `${color}40`, background: `linear-gradient(135deg, ${color}10, ${color}03)`, border: `1px solid ${color}${hovered ? '80' : '30'}`, borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden', animation: hovered ? 'glowPulse 2s ease-in-out infinite' : 'none' } as any}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${color}${hovered ? '30' : '15'}, transparent 70%)`, pointerEvents: 'none' }} />
      {hovered && <div style={{ '--scan-color': color } as any} className="scan-line" />}
      <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderTop: `2px solid ${color}${hovered ? '80' : '40'}`, borderLeft: `2px solid ${color}${hovered ? '80' : '40'}` }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderBottom: `2px solid ${color}${hovered ? '80' : '40'}`, borderRight: `2px solid ${color}${hovered ? '80' : '40'}` }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${color}30, ${color}10)`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: hovered ? `0 0 25px ${color}50` : 'none' }}>📦</div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 15, color, fontWeight: 700, letterSpacing: 2, textShadow: hovered ? `0 0 20px ${color}` : 'none' }}>{displayName.toUpperCase()}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>{wrapper.size_human}</div>
          </div>
        </div>
        {wrapper.is_active && <div style={{ padding: '6px 12px', borderRadius: 8, fontSize: 10, fontFamily: 'monospace', background: 'rgba(16,185,129,0.2)', color: COLORS.green, border: '1px solid rgba(16,185,129,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green }} />AKTIV</div>}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 20, fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>• Modulation: {new Date(wrapper.last_modified).toLocaleDateString('de-DE')}</div>
      <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
        <button onClick={onView} className="cyber-btn" style={{ '--btn-glow': `${color}50`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${color}50`, background: `${color}15`, color, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>👁️ VIEW</button>
        <button onClick={onStats} className="cyber-btn" style={{ '--btn-glow': `${COLORS.purple}40`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.purple}50`, background: `${COLORS.purple}15`, color: COLORS.purple, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>📊 STATS</button>
        <button onClick={onEdit} className="cyber-btn" style={{ '--btn-glow': `${COLORS.cyan}40`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.cyan}50`, background: `${COLORS.cyan}15`, color: COLORS.cyan, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>🔄 EDIT</button>
        {!wrapper.is_active && <button onClick={onActivate} disabled={isActivating} className="cyber-btn" style={{ '--btn-glow': `${COLORS.green}40`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.green}50`, background: `${COLORS.green}15`, color: COLORS.green, fontFamily: 'monospace', fontSize: 10, cursor: isActivating ? 'wait' : 'pointer', opacity: isActivating ? 0.5 : 1, fontWeight: 600 } as any}>🎯 AKTIV</button>}
        <button onClick={onDelete} className="cyber-btn" style={{ '--btn-glow': `${COLORS.red}40`, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.red}50`, background: `${COLORS.red}15`, color: COLORS.red, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>💀</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function WrapperControl() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activating, setActivating] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewWrapper, setViewWrapper] = useState<Wrapper | null>(null);
  const [editWrapper, setEditWrapper] = useState<WrapperDetailResponse | null>(null);
  const [deleteWrapper, setDeleteWrapper] = useState<Wrapper | null>(null);
  const [statsWrapper, setStatsWrapper] = useState<Wrapper | null>(null);
  const { exportJSON, exportCSV } = useExport();

  useEffect(() => {
    const styleId = 'cyber-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cyberStyles;
      document.head.appendChild(style);
    }
  }, []);

  const fetchWrappers = useCallback(async () => {
    try { const data = await api.getWrappers(); setWrappers(data.wrappers || []); }
    catch (e) { console.error('Failed:', e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchWrappers(); }, [fetchWrappers]);

  const handleActivate = async (name: string) => {
    setActivating(name);
    try { await api.activateWrapper(name); await fetchWrappers(); }
    catch (e) { console.error('Activation failed:', e); }
    finally { setActivating(null); }
  };

  const filtered = wrappers.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
  const activeCount = wrappers.filter(w => w.is_active).length;
  const handleExportJSON = () => exportJSON(filtered, 'syntx_wrappers');
  const handleExportCSV = () => exportCSV(filtered, 'syntx_wrappers', [{ key: 'name', label: 'Name' }, { key: 'size_human', label: 'Size' }, { key: 'last_modified', label: 'Modified' }, { key: 'is_active', label: 'Active' }]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="float-animation" style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(217,70,239,0.08))', border: '2px solid rgba(217,70,239,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 0 40px rgba(217,70,239,0.4)' }}>📦</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.magenta, letterSpacing: 4 }} className="glow-text">WRAPPER CONTROL</h2>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.cyan, boxShadow: `0 0 10px ${COLORS.cyan}` }} />{wrappers.length} Felder</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 10px ${COLORS.green}` }} />{activeCount} aktiv</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Feld suchen..." />
          <ExportButton onExportJSON={handleExportJSON} onExportCSV={handleExportCSV} disabled={filtered.length === 0} color={COLORS.magenta} />
          <button onClick={() => setCreateOpen(true)} className="cyber-btn" style={{ '--btn-glow': 'rgba(16,185,129,0.5)', padding: '14px 28px', borderRadius: 12, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#030b15', fontWeight: 700, fontFamily: 'monospace', fontSize: 13, letterSpacing: 3, cursor: 'pointer', boxShadow: '0 0 40px rgba(16,185,129,0.5)' } as any}>🌟 GEBÄREN</button>
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.4)' }}>
          <div style={{ fontSize: 64, marginBottom: 20, animation: 'pulse 1.5s ease-in-out infinite' }}>🌊</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16 }}>LADE FELDER...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.4)' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>📦</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16 }}>KEINE FELDER</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {filtered.map((w, i) => (
            <div key={w.name} style={{ animation: `slideUp 0.5s ease ${i * 0.05}s both` }}>
              <WrapperCard wrapper={w} onView={() => setViewWrapper(w)} onEdit={() => { api.getWrapper(w.name).then(setEditWrapper).catch(console.error); }} onDelete={() => setDeleteWrapper(w)} onActivate={() => handleActivate(w.name)} onStats={() => setStatsWrapper(w)} isActivating={activating === w.name} />
            </div>
          ))}
        </div>
      )}
      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={fetchWrappers} />
      {viewWrapper && <ViewModal wrapper={viewWrapper} onClose={() => setViewWrapper(null)} onEdit={(d) => { setViewWrapper(null); setEditWrapper(d); }} onStats={() => { setViewWrapper(null); setStatsWrapper(viewWrapper); }} />}
      {editWrapper && <EditModal wrapper={editWrapper} onClose={() => setEditWrapper(null)} onSuccess={fetchWrappers} />}
      {deleteWrapper && <DeleteModal wrapper={deleteWrapper} onClose={() => setDeleteWrapper(null)} onSuccess={fetchWrappers} />}
      {statsWrapper && <StatsModal wrapper={statsWrapper} onClose={() => setStatsWrapper(null)} />}
    </div>
  );
}
