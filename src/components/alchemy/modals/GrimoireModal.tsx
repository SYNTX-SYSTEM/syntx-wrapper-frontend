"use client";
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📖 GRIMOIRE MODAL - Das Zauberbuch der Wort-Transmutation               ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { COLORS, STYLE_COLORS, STYLE_ICONS, STYLE_VIBES } from '../constants';
import type { Style } from '../types';

interface GrimoireModalProps {
  style: Style;
  onClose: () => void;
  onSave: () => void;
}

export function GrimoireModal({ style, onClose, onSave }: GrimoireModalProps) {
  // ═══════════════════════════════════════════════════════════════════════════
  // 🌊 FELD-STATE - Eine Quelle der Wahrheit
  // ═══════════════════════════════════════════════════════════════════════════
  const [wordAlchemy, setWordAlchemy] = useState<Record<string, string>>({});
  const [forbiddenWords, setForbiddenWords] = useState<string[]>([]);
  const [newOriginal, setNewOriginal] = useState('');
  const [newReplacement, setNewReplacement] = useState('');
  const [newForbidden, setNewForbidden] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'alchemy' | 'forbidden'>('alchemy');

  const color = STYLE_COLORS[style.name] || COLORS.purple;
  const icon = STYLE_ICONS[style.name] || '⚗️';

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔄 REFRESH - Immer frisch vom Server, keine lokale Manipulation
  // ═══════════════════════════════════════════════════════════════════════════
  const refreshData = useCallback(async () => {
    try {
      const data = await api.getStyle(style.name);
      if (data.style) {
        setWordAlchemy(data.style.word_alchemy || {});
        setForbiddenWords(data.style.forbidden_words || []);
      }
    } catch (e) {
      console.error('Refresh failed:', e);
    }
  }, [style.name]);

  useEffect(() => {
    refreshData().then(() => setLoading(false));
  }, [refreshData]);

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚗️ ALCHEMY HANDLERS - Transmutationen
  // ═══════════════════════════════════════════════════════════════════════════
  const handleAddAlchemy = async () => {
    if (!newOriginal.trim() || !newReplacement.trim()) return;
    setSaving(true); setError('');
    try {
      await api.addAlchemy(style.name, { original: newOriginal.trim(), replacement: newReplacement.trim() });
      await refreshData();
      setNewOriginal(''); 
      setNewReplacement('');
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Hinzufügen'); 
    } finally { 
      setSaving(false); 
    }
  };

  const handleDeleteAlchemy = async (word: string) => {
    setSaving(true); setError('');
    try {
      await api.deleteAlchemy(style.name, word);
      await refreshData();
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Löschen'); 
    } finally { 
      setSaving(false); 
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 🚫 FORBIDDEN HANDLERS - Verbotene Wörter
  // ═══════════════════════════════════════════════════════════════════════════
  const handleAddForbidden = async () => {
    if (!newForbidden.trim()) return;
    setSaving(true); setError('');
    try {
      await api.addForbiddenWord(style.name, newForbidden.trim());
      await refreshData();
      setNewForbidden('');
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Verbannen'); 
    } finally { 
      setSaving(false); 
    }
  };

  const handleDeleteForbidden = async (word: string) => {
    setSaving(true); setError('');
    try {
      await api.deleteForbiddenWord(style.name, word);
      await refreshData();
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Entbannen'); 
    } finally { 
      setSaving(false); 
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎨 RENDER - Das Grimoire
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div 
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn 0.3s ease' }} 
      onClick={onClose}
    >
      <div 
        style={{ width: '100%', maxWidth: 750, maxHeight: '90vh', overflow: 'hidden', borderRadius: 28, background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`, border: `2px solid ${color}40`, boxShadow: `0 0 100px ${color}30`, display: 'flex', flexDirection: 'column', animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={{ padding: '28px 32px 20px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(180deg, ${color}15, transparent)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg, ${color}40, ${color}15)`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: `0 0 40px ${color}40`, animation: 'iconPulse 2s ease-in-out infinite' }}>
              {icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, color: color, letterSpacing: 3, textShadow: `0 0 30px ${color}60` }}>
                {style.name.toUpperCase().replace(/_/g, ' ')} GRIMOIRE
              </h3>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginTop: 4 }}>
                "{style.vibe || STYLE_VIBES[style.name] || 'Custom Style'}"
              </div>
            </div>
          </div>
          
          {/* TABS */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button 
              onClick={() => setActiveTab('alchemy')} 
              style={{ padding: '12px 24px', borderRadius: 12, background: activeTab === 'alchemy' ? `linear-gradient(135deg, ${COLORS.gold}30, ${COLORS.gold}10)` : 'transparent', border: activeTab === 'alchemy' ? `2px solid ${COLORS.gold}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'alchemy' ? COLORS.gold : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>⚗️</span> TRANSMUTATIONEN ({Object.keys(wordAlchemy).length})
            </button>
            <button 
              onClick={() => setActiveTab('forbidden')} 
              style={{ padding: '12px 24px', borderRadius: 12, background: activeTab === 'forbidden' ? `linear-gradient(135deg, ${COLORS.red}30, ${COLORS.red}10)` : 'transparent', border: activeTab === 'forbidden' ? `2px solid ${COLORS.red}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'forbidden' ? COLORS.red : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>🚫</span> FORBIDDEN ({forbiddenWords.length})
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div style={{ margin: '16px 32px 0', padding: 14, borderRadius: 12, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}60`, color: COLORS.red, fontSize: 13, textAlign: 'center', animation: 'shake 0.5s ease' }}>
            {error}
          </div>
        )}

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.5)' }}>
              <div style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>⚗️</div>
              <div style={{ marginTop: 16, fontFamily: 'monospace' }}>LADE GRIMOIRE...</div>
            </div>
          ) : activeTab === 'alchemy' ? (
            <>
              {/* ALCHEMY LIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, maxHeight: 300, overflow: 'auto' }}>
                {Object.entries(wordAlchemy).map(([orig, repl], idx) => (
                  <div key={orig} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))', border: '1px solid rgba(255,255,255,0.08)', animation: `slideInLeft 0.3s ease ${idx * 0.05}s both` }}>
                    <span style={{ color: COLORS.red, textDecoration: 'line-through', flex: 1, fontFamily: 'monospace', fontSize: 14 }}>{orig}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>→</span>
                    <span style={{ color: COLORS.green, flex: 1, fontFamily: 'monospace', fontSize: 14 }}>{repl}</span>
                    <button onClick={() => handleDeleteAlchemy(orig)} disabled={saving} style={{ width: 34, height: 34, borderRadius: 10, background: `${COLORS.red}15`, border: `1px solid ${COLORS.red}40`, color: COLORS.red, cursor: saving ? 'wait' : 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: saving ? 0.5 : 1 }}>✕</button>
                  </div>
                ))}
                {Object.keys(wordAlchemy).length === 0 && (
                  <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Keine Transmutationen definiert</div>
                )}
              </div>
              
              {/* ALCHEMY ADD */}
              <div style={{ display: 'flex', gap: 12, padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.gold}10, ${COLORS.gold}05)`, border: `1px solid ${COLORS.gold}30` }}>
                <input value={newOriginal} onChange={e => setNewOriginal(e.target.value)} placeholder="Original..." style={{ flex: 1, padding: 14, borderRadius: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
                <span style={{ color: COLORS.gold, alignSelf: 'center', fontSize: 20 }}>→</span>
                <input value={newReplacement} onChange={e => setNewReplacement(e.target.value)} placeholder="Ersetzung..." style={{ flex: 1, padding: 14, borderRadius: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} onKeyDown={e => e.key === 'Enter' && handleAddAlchemy()} />
                <button onClick={handleAddAlchemy} disabled={saving || !newOriginal.trim() || !newReplacement.trim()} style={{ padding: '14px 24px', borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.gold}40, ${COLORS.gold}20)`, border: `2px solid ${COLORS.gold}`, color: COLORS.gold, fontFamily: 'monospace', fontSize: 13, fontWeight: 800, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.5 : 1 }}>⚗️ ADD</button>
              </div>
            </>
          ) : (
            <>
              {/* FORBIDDEN LIST */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                {forbiddenWords.map((word, idx) => (
                  <span key={word} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}50`, animation: `slideInLeft 0.3s ease ${idx * 0.05}s both` }}>
                    <span style={{ color: COLORS.red, textDecoration: 'line-through', fontFamily: 'monospace', fontSize: 13 }}>{word}</span>
                    <button onClick={() => handleDeleteForbidden(word)} disabled={saving} style={{ width: 24, height: 24, borderRadius: 12, background: 'transparent', border: 'none', color: COLORS.red, cursor: saving ? 'wait' : 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: saving ? 0.5 : 0.7 }}>✕</button>
                  </span>
                ))}
                {forbiddenWords.length === 0 && (
                  <div style={{ width: '100%', textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Keine verbotenen Wörter</div>
                )}
              </div>
              
              {/* FORBIDDEN ADD */}
              <div style={{ display: 'flex', gap: 12, padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.red}10, ${COLORS.red}05)`, border: `1px solid ${COLORS.red}30` }}>
                <input value={newForbidden} onChange={e => setNewForbidden(e.target.value)} placeholder="Verbotenes Wort hinzufügen..." style={{ flex: 1, padding: 14, borderRadius: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} onKeyDown={e => e.key === 'Enter' && handleAddForbidden()} />
                <button onClick={handleAddForbidden} disabled={saving || !newForbidden.trim()} style={{ padding: '14px 24px', borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.red}40, ${COLORS.red}20)`, border: `2px solid ${COLORS.red}`, color: COLORS.red, fontFamily: 'monospace', fontSize: 13, fontWeight: 800, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.5 : 1 }}>🚫 BAN</button>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 32px', borderTop: `1px solid ${color}20`, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => { onSave(); onClose(); }} style={{ padding: '14px 32px', borderRadius: 14, background: `linear-gradient(135deg, ${color}40, ${color}20)`, border: `2px solid ${color}`, color: color, fontFamily: 'monospace', fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: 'pointer', boxShadow: `0 0 30px ${color}30` }}>
            ✓ GRIMOIRE SCHLIESSEN
          </button>
        </div>
      </div>
    </div>
  );
}
