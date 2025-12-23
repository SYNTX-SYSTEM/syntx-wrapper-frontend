"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import type { Style as APIStyle, AlchemyPreviewResponse } from '@/lib/api';

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ⚗️ ALCHEMY LAB - DAS GRIMOIRE DER WORT-TRANSMUTATION                   ║
// ║   ═══════════════════════════════════════════════════════════════════════ ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 RESONANZ-FARBEN
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  yellow: '#eab308',
  gold: '#fbbf24',
  dark: '#0a1628',
  darker: '#030b15'
};

const STYLE_COLORS: Record<string, string> = {
  berlin_slang: COLORS.orange,
  zynisch: COLORS.red,
  wissenschaftlich: COLORS.cyan,
  poetisch: COLORS.magenta
};

const STYLE_ICONS: Record<string, string> = {
  berlin_slang: '🍺',
  zynisch: '🙄',
  wissenschaftlich: '🔬',
  poetisch: '🌸'
};

const STYLE_VIBES: Record<string, string> = {
  berlin_slang: 'Späti-Philosophie um 3 Uhr nachts',
  zynisch: 'Der Augenroll-Transformer',
  wissenschaftlich: 'Der Laborkittel des Outputs',
  poetisch: 'Der Wortwebstuhl der Seele'
};

// ═══════════════════════════════════════════════════════════════════════════
// 🔮 INTERFACES - FELD-STRUKTUREN
// ═══════════════════════════════════════════════════════════════════════════

interface Style {
  name: string;
  vibe: string;
  description?: string;
  word_alchemy_count: number;
  forbidden_words: string[];
  has_suffix: boolean;
  has_tone_injection: boolean;
  word_alchemy?: Record<string, string>;
}

interface AlchemyResult {
  original: string;
  transformed: string;
  style: string;
  transformations: Array<{
    original: string;
    replacement: string;
    start_pos: number;
    end_pos: number;
    type: string;
  }>;
  stats: {
    total_transformations: number;
    alchemy_count: number;
    forbidden_count: number;
  };
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎴 STYLE CARD - RESONANZ-KARTE
// ═══════════════════════════════════════════════════════════════════════════

function StyleCard({ 
  style, 
  isSelected, 
  onSelect,
  onEdit,
  onGrimoire,
  onDelete 
}: { 
  style: Style; 
  isSelected: boolean; 
  onSelect: () => void;
  onEdit: () => void;
  onGrimoire: () => void;
  onDelete: () => void;
}) {
  const color = STYLE_COLORS[style.name] || COLORS.purple;
  const icon = STYLE_ICONS[style.name] || '⚗️';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 20,
        borderRadius: 16,
        background: isSelected 
          ? `linear-gradient(135deg, ${color}25, ${color}08)`
          : `linear-gradient(135deg, ${COLORS.dark}ee, ${COLORS.darker}f5)`,
        border: isSelected ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isSelected 
          ? `0 0 50px ${color}40, inset 0 0 30px ${color}10`
          : isHovered 
            ? `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${color}20`
            : '0 4px 16px rgba(0,0,0,0.2)',
        transform: isSelected 
          ? 'scale(1.02) translateY(-4px)' 
          : isHovered 
            ? 'scale(1.01) translateY(-2px)' 
            : 'scale(1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Border Glow */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          inset: -2,
          background: `linear-gradient(45deg, ${color}, transparent, ${color})`,
          borderRadius: 18,
          opacity: 0.3,
          animation: 'rotateBorder 3s linear infinite',
          zIndex: 0
        }} />
      )}

      {/* Action Buttons */}
      <div style={{ 
        position: 'absolute', 
        top: 10, 
        right: 10, 
        display: 'flex', 
        gap: 6,
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.3s ease',
        zIndex: 20
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${COLORS.cyan}20`,
            border: `1px solid ${COLORS.cyan}50`,
            color: COLORS.cyan,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title="Style bearbeiten"
        >✏️</button>
        <button
          onClick={(e) => { e.stopPropagation(); onGrimoire(); }}
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${COLORS.gold}20`,
            border: `1px solid ${COLORS.gold}50`,
            color: COLORS.gold,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title="Grimoire öffnen"
        >📖</button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${COLORS.red}20`,
            border: `1px solid ${COLORS.red}50`,
            color: COLORS.red,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title="Style löschen"
        >🗑️</button>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
            border: `2px solid ${color}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26,
            boxShadow: `0 0 20px ${color}30`,
            animation: isSelected ? 'iconPulse 2s ease-in-out infinite' : 'none'
          }}>{icon}</div>
          <div>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: 17, 
              fontWeight: 800, 
              color: color,
              letterSpacing: 2,
              textTransform: 'uppercase',
              textShadow: isSelected ? `0 0 20px ${color}80` : 'none'
            }}>
              {style.name.replace(/_/g, ' ')}
            </div>
            <div style={{ 
              fontSize: 12, 
              color: 'rgba(255,255,255,0.5)', 
              fontStyle: 'italic',
              marginTop: 2
            }}>
              "{style.vibe || STYLE_VIBES[style.name] || 'Custom Style'}"
            </div>
          </div>
        </div>

        {/* Stats Badges */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{
            padding: '6px 12px', borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.gold}25, ${COLORS.gold}10)`,
            border: `1px solid ${COLORS.gold}40`,
            fontSize: 11, 
            color: COLORS.gold, 
            fontFamily: 'monospace',
            fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <span>⚗️</span> {style.word_alchemy_count} Transmutationen
          </span>
          {style.forbidden_words?.length > 0 && (
            <span style={{
              padding: '6px 12px', borderRadius: 20,
              background: `linear-gradient(135deg, ${COLORS.red}25, ${COLORS.red}10)`,
              border: `1px solid ${COLORS.red}40`,
              fontSize: 11, 
              color: COLORS.red, 
              fontFamily: 'monospace',
              fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span>🚫</span> {style.forbidden_words.length} Verboten
            </span>
          )}
          {style.has_tone_injection && (
            <span style={{
              padding: '6px 12px', borderRadius: 20,
              background: `linear-gradient(135deg, ${COLORS.purple}25, ${COLORS.purple}10)`,
              border: `1px solid ${COLORS.purple}40`,
              fontSize: 11, 
              color: COLORS.purple, 
              fontFamily: 'monospace',
              fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span>💉</span> Tone
            </span>
          )}
        </div>

        {/* Forbidden Words Preview */}
        {style.forbidden_words?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {style.forbidden_words.slice(0, 5).map(word => (
              <span key={word} style={{
                padding: '3px 8px', borderRadius: 6,
                background: `${COLORS.red}15`,
                fontSize: 10, 
                color: COLORS.red,
                textDecoration: 'line-through',
                opacity: 0.8
              }}>{word}</span>
            ))}
            {style.forbidden_words.length > 5 && (
              <span style={{
                padding: '3px 8px', borderRadius: 6,
                background: `${COLORS.red}15`,
                fontSize: 10, 
                color: COLORS.red
              }}>+{style.forbidden_words.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════
// ✨ STYLE EDITOR MODAL - ERWEITERT MIT ALLEN FELDERN
// ═══════════════════════════════════════════════════════════════════════════

function StyleEditorModal({ 
  style, 
  onClose, 
  onSave,
  isNew 
}: { 
  style: Style | null; 
  onClose: () => void; 
  onSave: () => void;
  isNew: boolean;
}) {
  const [name, setName] = useState(style?.name || '');
  const [vibe, setVibe] = useState(style?.vibe || '');
  const [description, setDescription] = useState('');
  const [toneInjection, setToneInjection] = useState('');
  const [suffix, setSuffix] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  // Load full style details when editing
  useEffect(() => {
    if (!isNew && style?.name) {
      api.getStyle(style.name).then((data: any) => {
        if (data.style) {
          setVibe(data.style.vibe || '');
          setDescription(data.style.description || '');
          setToneInjection(data.style.tone_injection || '');
          setSuffix(data.style.suffix || '');
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [isNew, style?.name]);

  const handleSave = async () => {
    if (!name.trim() || !vibe.trim()) {
      setError('Name und Vibe sind erforderlich');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (isNew) {
        await api.createStyle({
          name: name.toLowerCase().replace(/\s+/g, '_'),
          vibe
        });
        if (description || toneInjection || suffix) {
          const updates: any = {};
          if (description) updates.description = description;
          if (toneInjection) updates.tone_injection = toneInjection;
          if (suffix) updates.suffix = suffix;
          await api.updateStyle(name.toLowerCase().replace(/\s+/g, '_'), updates);
        }
      } else {
        const updates: any = {};
        if (vibe) updates.vibe = vibe;
        if (description !== undefined) updates.description = description;
        if (toneInjection !== undefined) updates.tone_injection = toneInjection;
        if (suffix !== undefined) updates.suffix = suffix;
        await api.updateStyle(style!.name, updates);
      }
      onSave();
      onClose();
    } catch (e: any) {
      setError(e.message || 'Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: COLORS.magenta }}>
          <div style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>⚗️</div>
          <div style={{ marginTop: 16, fontFamily: 'monospace', letterSpacing: 2 }}>LADE STYLE...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      animation: 'fadeIn 0.3s ease'
    }} onClick={onClose}>
      <div style={{
        width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'hidden',
        borderRadius: 24,
        background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`,
        border: `2px solid ${COLORS.magenta}40`,
        boxShadow: `0 0 80px ${COLORS.magenta}30, 0 25px 50px rgba(0,0,0,0.5)`,
        display: 'flex', flexDirection: 'column',
        animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ padding: '28px 32px 20px', borderBottom: `1px solid ${COLORS.magenta}20` }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 12, animation: 'iconBounce 0.6s ease' }}>
              {isNew ? '✨' : '✏️'}
            </div>
            <h3 style={{ 
              margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.magenta,
              letterSpacing: 3, textShadow: `0 0 30px ${COLORS.magenta}50`
            }}>
              {isNew ? 'NEUER STYLE ERSCHAFFEN' : 'STYLE BEARBEITEN'}
            </h3>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setActiveTab('basic')} style={{
              flex: 1, padding: '12px 20px', borderRadius: 12,
              background: activeTab === 'basic' ? `linear-gradient(135deg, ${COLORS.magenta}30, ${COLORS.magenta}10)` : 'transparent',
              border: activeTab === 'basic' ? `2px solid ${COLORS.magenta}` : '1px solid rgba(255,255,255,0.1)',
              color: activeTab === 'basic' ? COLORS.magenta : 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s ease'
            }}><span>📝</span> BASICS</button>
            <button onClick={() => setActiveTab('advanced')} style={{
              flex: 1, padding: '12px 20px', borderRadius: 12,
              background: activeTab === 'advanced' ? `linear-gradient(135deg, ${COLORS.purple}30, ${COLORS.purple}10)` : 'transparent',
              border: activeTab === 'advanced' ? `2px solid ${COLORS.purple}` : '1px solid rgba(255,255,255,0.1)',
              color: activeTab === 'advanced' ? COLORS.purple : 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s ease'
            }}><span>⚡</span> ADVANCED</button>
          </div>
        </div>

        {error && (
          <div style={{ 
            margin: '16px 32px 0', padding: 14, borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`,
            border: `1px solid ${COLORS.red}60`, color: COLORS.red, fontSize: 13, textAlign: 'center',
            animation: 'shake 0.5s ease'
          }}>{error}</div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          {activeTab === 'basic' ? (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>
                  NAME {isNew && <span style={{ color: COLORS.red }}>*</span>}
                </label>
                <input value={name} onChange={e => setName(e.target.value)} disabled={!isNew} placeholder="z.B. formal_business"
                  style={{ width: '100%', padding: 14, borderRadius: 12, background: isNew ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                    border: `1px solid ${isNew ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
                    color: isNew ? 'white' : 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {!isNew && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Name kann nicht geändert werden</div>}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>
                  VIBE <span style={{ color: COLORS.red }}>*</span>
                </label>
                <input value={vibe} onChange={e => setVibe(e.target.value)} placeholder="z.B. Der Konferenzraum-Transformer"
                  style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', fontFamily: 'monospace', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Kurze, knackige Beschreibung</div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>BESCHREIBUNG</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Ausführliche Beschreibung..."
                  style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', fontFamily: 'monospace', fontSize: 14, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: COLORS.purple, fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>
                  <span>💉</span> TONE INJECTION
                </label>
                <textarea value={toneInjection} onChange={e => setToneInjection(e.target.value)}
                  placeholder="Prompt-Text der VOR dem LLM-Request injiziert wird..."
                  style={{ width: '100%', minHeight: 140, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: `1px solid ${COLORS.purple}40`,
                    color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, padding: '8px 12px', background: `${COLORS.purple}10`, borderRadius: 8, border: `1px solid ${COLORS.purple}20` }}>
                  ⚡ Pre-LLM: Wird BEVOR der Request ans LLM geht hinzugefügt
                </div>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: COLORS.cyan, fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>
                  <span>📎</span> SUFFIX
                </label>
                <textarea value={suffix} onChange={e => setSuffix(e.target.value)}
                  placeholder="Text der am Ende jeder Response angehängt wird..."
                  style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: `1px solid ${COLORS.cyan}40`,
                    color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, padding: '8px 12px', background: `${COLORS.cyan}10`, borderRadius: 8, border: `1px solid ${COLORS.cyan}20` }}>
                  📎 Post-LLM: Wird NACH der Response angehängt
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 32px', borderTop: `1px solid ${COLORS.magenta}20`, display: 'flex', gap: 14 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 16, borderRadius: 14, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 14, fontWeight: 700, cursor: 'pointer'
          }}>ABBRECHEN</button>
          <button onClick={handleSave} disabled={saving} style={{
            flex: 1, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.magenta}50, ${COLORS.purple}30)`,
            border: `2px solid ${COLORS.magenta}`, color: COLORS.magenta, fontFamily: 'monospace', fontSize: 14, fontWeight: 800,
            letterSpacing: 2, cursor: saving ? 'wait' : 'pointer', boxShadow: `0 0 30px ${COLORS.magenta}30`
          }}>{saving ? '⏳ SPEICHERN...' : isNew ? '✨ ERSCHAFFEN' : '💾 SPEICHERN'}</button>
        </div>
      </div>
    </div>
  );
}

// 📖 GRIMOIRE MODAL - TRANSMUTATIONEN & FORBIDDEN WORDS
// ═══════════════════════════════════════════════════════════════════════════

function GrimoireModal({ 
  style, 
  onClose, 
  onSave 
}: { 
  style: Style; 
  onClose: () => void;
  onSave: () => void;
}) {
  const [wordAlchemy, setWordAlchemy] = useState<Record<string, string>>({});
  const [forbiddenWords, setForbiddenWords] = useState<string[]>(style.forbidden_words || []);
  const [newOriginal, setNewOriginal] = useState('');
  const [newReplacement, setNewReplacement] = useState('');
  const [newForbidden, setNewForbidden] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'alchemy' | 'forbidden'>('alchemy');

  const color = STYLE_COLORS[style.name] || COLORS.purple;
  const icon = STYLE_ICONS[style.name] || '⚗️';

  // Load full style details
  useEffect(() => {
    api.getStyle(style.name).then((data: any) => {
      if (data.style?.word_alchemy) {
        setWordAlchemy(data.style.word_alchemy);
      }
      if (data.style?.forbidden_words) {
        setForbiddenWords(data.style.forbidden_words);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [style.name]);

  const handleAddAlchemy = async () => {
    if (!newOriginal.trim() || !newReplacement.trim()) return;
    
    setSaving(true);
    setError('');
    try {
      await api.addAlchemy(style.name, { 
        original: newOriginal.trim(), 
        replacement: newReplacement.trim() 
      });
      setWordAlchemy(prev => ({ ...prev, [newOriginal.trim()]: newReplacement.trim() }));
      setNewOriginal('');
      setNewReplacement('');
    } catch (e: any) {
      setError(e.message || 'Fehler beim Hinzufügen');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAlchemy = async (word: string) => {
    setSaving(true);
    try {
      await api.deleteAlchemy(style.name, word);
      setWordAlchemy(prev => {
        const next = { ...prev };
        delete next[word];
        return next;
      });
    } catch (e: any) {
      setError(e.message || 'Fehler beim Löschen');
    } finally {
      setSaving(false);
    }
  };

  const handleAddForbidden = async () => {
    if (!newForbidden.trim()) return;
    
    setSaving(true);
    setError('');
    try {
      await api.addForbiddenWord(style.name, newForbidden.trim());
      setForbiddenWords(prev => [...prev, newForbidden.trim()]);
      setNewForbidden('');
    } catch (e: any) {
      setError(e.message || 'Fehler beim Hinzufügen');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.9)',
      backdropFilter: 'blur(15px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      animation: 'fadeIn 0.3s ease'
    }} onClick={onClose}>
      <div style={{
        width: '100%', maxWidth: 750, maxHeight: '90vh', overflow: 'hidden',
        borderRadius: 28,
        background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`,
        border: `2px solid ${color}40`,
        boxShadow: `0 0 100px ${color}30, 0 30px 60px rgba(0,0,0,0.6)`,
        display: 'flex', flexDirection: 'column',
        animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ 
          padding: '28px 32px 20px',
          borderBottom: `1px solid ${color}30`,
          background: `linear-gradient(180deg, ${color}15, transparent)`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: `linear-gradient(135deg, ${color}40, ${color}15)`,
              border: `2px solid ${color}60`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32,
              boxShadow: `0 0 40px ${color}40`,
              animation: 'iconPulse 2s ease-in-out infinite'
            }}>{icon}</div>
            <div>
              <h3 style={{ 
                margin: 0, 
                fontFamily: 'monospace', 
                fontSize: 26, 
                color: color,
                letterSpacing: 3,
                textShadow: `0 0 30px ${color}60`
              }}>
                {style.name.toUpperCase().replace(/_/g, ' ')} GRIMOIRE
              </h3>
              <div style={{ 
                color: 'rgba(255,255,255,0.5)', 
                fontStyle: 'italic',
                marginTop: 4 
              }}>
                "{style.vibe || STYLE_VIBES[style.name] || 'Custom Style'}"
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button
              onClick={() => setActiveTab('alchemy')}
              style={{
                padding: '12px 24px', borderRadius: 12,
                background: activeTab === 'alchemy' 
                  ? `linear-gradient(135deg, ${COLORS.gold}30, ${COLORS.gold}10)` 
                  : 'transparent',
                border: activeTab === 'alchemy' 
                  ? `2px solid ${COLORS.gold}` 
                  : '1px solid rgba(255,255,255,0.1)',
                color: activeTab === 'alchemy' ? COLORS.gold : 'rgba(255,255,255,0.5)',
                fontFamily: 'monospace', 
                fontSize: 13, 
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.3s ease'
              }}
            >
              <span>⚗️</span> TRANSMUTATIONEN ({Object.keys(wordAlchemy).length})
            </button>
            <button
              onClick={() => setActiveTab('forbidden')}
              style={{
                padding: '12px 24px', borderRadius: 12,
                background: activeTab === 'forbidden' 
                  ? `linear-gradient(135deg, ${COLORS.red}30, ${COLORS.red}10)` 
                  : 'transparent',
                border: activeTab === 'forbidden' 
                  ? `2px solid ${COLORS.red}` 
                  : '1px solid rgba(255,255,255,0.1)',
                color: activeTab === 'forbidden' ? COLORS.red : 'rgba(255,255,255,0.5)',
                fontFamily: 'monospace', 
                fontSize: 13, 
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.3s ease'
              }}
            >
              <span>🚫</span> FORBIDDEN ({forbiddenWords.length})
            </button>
          </div>
        </div>

        {error && (
          <div style={{ 
            margin: '16px 32px 0',
            padding: 14, borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`,
            border: `1px solid ${COLORS.red}60`,
            color: COLORS.red, 
            fontSize: 13,
            textAlign: 'center',
            animation: 'shake 0.5s ease'
          }}>{error}</div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.5)' }}>
              <div style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>⚗️</div>
              <div style={{ marginTop: 16, fontFamily: 'monospace' }}>LADE GRIMOIRE...</div>
            </div>
          ) : activeTab === 'alchemy' ? (
            <>
              {/* Alchemy List */}
              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: 10, 
                marginBottom: 24, maxHeight: 300, overflow: 'auto' 
              }}>
                {Object.entries(wordAlchemy).map(([orig, repl], idx) => (
                  <div key={orig} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px', borderRadius: 14,
                    background: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))`,
                    border: '1px solid rgba(255,255,255,0.08)',
                    animation: `slideInLeft 0.3s ease ${idx * 0.05}s both`
                  }}>
                    <span style={{ 
                      color: COLORS.red, 
                      textDecoration: 'line-through', 
                      flex: 1,
                      fontFamily: 'monospace',
                      fontSize: 14
                    }}>{orig}</span>
                    <span style={{ 
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 18
                    }}>→</span>
                    <span style={{ 
                      color: COLORS.green, 
                      flex: 1,
                      fontFamily: 'monospace',
                      fontSize: 14
                    }}>{repl}</span>
                    <button
                      onClick={() => handleDeleteAlchemy(orig)}
                      disabled={saving}
                      style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: `${COLORS.red}15`,
                        border: `1px solid ${COLORS.red}40`,
                        color: COLORS.red,
                        cursor: 'pointer',
                        fontSize: 14,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >✕</button>
                  </div>
                ))}
                {Object.keys(wordAlchemy).length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: 40, 
                    color: 'rgba(255,255,255,0.3)',
                    fontStyle: 'italic'
                  }}>
                    Keine Transmutationen definiert
                  </div>
                )}
              </div>

              {/* Add New Alchemy */}
              <div style={{ 
                display: 'flex', gap: 12, 
                padding: 20, 
                borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.gold}10, ${COLORS.gold}05)`,
                border: `1px solid ${COLORS.gold}30`
              }}>
                <input
                  value={newOriginal}
                  onChange={e => setNewOriginal(e.target.value)}
                  placeholder="Original..."
                  style={{
                    flex: 1, padding: 14, borderRadius: 10,
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontFamily: 'monospace', fontSize: 14,
                    outline: 'none'
                  }}
                />
                <span style={{ 
                  color: COLORS.gold, 
                  alignSelf: 'center',
                  fontSize: 20
                }}>→</span>
                <input
                  value={newReplacement}
                  onChange={e => setNewReplacement(e.target.value)}
                  placeholder="Ersetzung..."
                  style={{
                    flex: 1, padding: 14, borderRadius: 10,
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontFamily: 'monospace', fontSize: 14,
                    outline: 'none'
                  }}
                  onKeyPress={e => e.key === 'Enter' && handleAddAlchemy()}
                />
                <button
                  onClick={handleAddAlchemy}
                  disabled={saving || !newOriginal.trim() || !newReplacement.trim()}
                  style={{
                    padding: '14px 24px', borderRadius: 10,
                    background: `linear-gradient(135deg, ${COLORS.gold}40, ${COLORS.gold}20)`,
                    border: `2px solid ${COLORS.gold}`,
                    color: COLORS.gold,
                    fontFamily: 'monospace', 
                    fontSize: 13, 
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >⚗️ ADD</button>
              </div>
            </>
          ) : (
            <>
              {/* Forbidden List */}
              <div style={{ 
                display: 'flex', gap: 10, flexWrap: 'wrap', 
                marginBottom: 24 
              }}>
                {forbiddenWords.map((word, idx) => (
                  <span key={word} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px', borderRadius: 20,
                    background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`,
                    border: `1px solid ${COLORS.red}50`,
                    animation: `slideInLeft 0.3s ease ${idx * 0.05}s both`
                  }}>
                    <span style={{ 
                      color: COLORS.red, 
                      textDecoration: 'line-through',
                      fontFamily: 'monospace',
                      fontSize: 13
                    }}>{word}</span>
                  </span>
                ))}
                {forbiddenWords.length === 0 && (
                  <div style={{ 
                    width: '100%',
                    textAlign: 'center', 
                    padding: 40, 
                    color: 'rgba(255,255,255,0.3)',
                    fontStyle: 'italic'
                  }}>
                    Keine verbotenen Wörter
                  </div>
                )}
              </div>

              {/* Add New Forbidden */}
              <div style={{ 
                display: 'flex', gap: 12, 
                padding: 20, 
                borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.red}10, ${COLORS.red}05)`,
                border: `1px solid ${COLORS.red}30`
              }}>
                <input
                  value={newForbidden}
                  onChange={e => setNewForbidden(e.target.value)}
                  placeholder="Verbotenes Wort hinzufügen..."
                  style={{
                    flex: 1, padding: 14, borderRadius: 10,
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontFamily: 'monospace', fontSize: 14,
                    outline: 'none'
                  }}
                  onKeyPress={e => e.key === 'Enter' && handleAddForbidden()}
                />
                <button
                  onClick={handleAddForbidden}
                  disabled={saving || !newForbidden.trim()}
                  style={{
                    padding: '14px 24px', borderRadius: 10,
                    background: `linear-gradient(135deg, ${COLORS.red}40, ${COLORS.red}20)`,
                    border: `2px solid ${COLORS.red}`,
                    color: COLORS.red,
                    fontFamily: 'monospace', 
                    fontSize: 13, 
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >🚫 BAN</button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '20px 32px',
          borderTop: `1px solid ${color}20`,
          display: 'flex', justifyContent: 'flex-end'
        }}>
          <button
            onClick={() => { onSave(); onClose(); }}
            style={{
              padding: '14px 32px', borderRadius: 14,
              background: `linear-gradient(135deg, ${color}40, ${color}20)`,
              border: `2px solid ${color}`,
              color: color,
              fontFamily: 'monospace', 
              fontSize: 14, 
              fontWeight: 800,
              letterSpacing: 2,
              cursor: 'pointer',
              boxShadow: `0 0 30px ${color}30`,
              transition: 'all 0.3s ease'
            }}
          >✓ GRIMOIRE SCHLIESSEN</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🗑️ DELETE CONFIRMATION MODAL
// ═══════════════════════════════════════════════════════════════════════════

function DeleteModal({ 
  styleName, 
  onClose, 
  onConfirm 
}: { 
  styleName: string; 
  onClose: () => void; 
  onConfirm: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.deleteStyle(styleName);
      onConfirm();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.3s ease'
    }} onClick={onClose}>
      <div style={{
        width: 420, padding: 36, borderRadius: 24,
        background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`,
        border: `2px solid ${COLORS.red}40`,
        boxShadow: `0 0 80px ${COLORS.red}30, 0 25px 50px rgba(0,0,0,0.5)`,
        textAlign: 'center',
        animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }} onClick={e => e.stopPropagation()}>
        
        <div style={{ 
          fontSize: 56, 
          marginBottom: 20,
          animation: 'shake 0.5s ease'
        }}>🗑️</div>
        
        <h3 style={{ 
          margin: '0 0 16px 0', 
          fontFamily: 'monospace', 
          fontSize: 22, 
          color: COLORS.red,
          letterSpacing: 2
        }}>
          STYLE AUSLÖSCHEN?
        </h3>
        
        <p style={{ 
          color: 'rgba(255,255,255,0.6)', 
          marginBottom: 28,
          lineHeight: 1.6 
        }}>
          Bist du sicher, dass du <strong style={{ color: COLORS.red }}>{styleName}</strong> unwiderruflich löschen möchtest?
        </p>

        <div style={{ display: 'flex', gap: 14 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: 16, borderRadius: 14,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'monospace', 
              fontSize: 14, 
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >ABBRECHEN</button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              flex: 1, padding: 16, borderRadius: 14,
              background: `linear-gradient(135deg, ${COLORS.red}50, ${COLORS.red}30)`,
              border: `2px solid ${COLORS.red}`,
              color: 'white',
              fontFamily: 'monospace', 
              fontSize: 14, 
              fontWeight: 800,
              letterSpacing: 2,
              cursor: deleting ? 'wait' : 'pointer',
              boxShadow: `0 0 30px ${COLORS.red}30`,
              transition: 'all 0.3s ease'
            }}
          >{deleting ? '⏳ LÖSCHE...' : '🗑️ AUSLÖSCHEN'}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚗️ MAIN ALCHEMY PANEL
// ═══════════════════════════════════════════════════════════════════════════

export default function AlchemyPanel() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('berlin_slang');
  const [inputText, setInputText] = useState('Das ist ein krass geiler Test für die Wort-Transmutation!');
  const [result, setResult] = useState<AlchemyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [transforming, setTransforming] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Modal States
  const [showStyleEditor, setShowStyleEditor] = useState(false);
  const [editingStyle, setEditingStyle] = useState<Style | null>(null);
  const [isNewStyle, setIsNewStyle] = useState(false);
  const [showGrimoire, setShowGrimoire] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [styleToDelete, setStyleToDelete] = useState('');

  // Load styles
  const loadStyles = useCallback(() => {
    api.getStyles().then((data: any) => {
      setStyles(data.styles || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadStyles();
  }, [loadStyles]);

  // Transform handler with sick effects
  const handleTransform = async () => {
    if (!inputText.trim() || !selectedStyle) return;
    
    setTransforming(true);
    setIsShaking(true);
    setGlowIntensity(100);
    
    // Create particles explosion
    const currentColor = STYLE_COLORS[selectedStyle] || COLORS.purple;
    const newParticles: Particle[] = Array.from({length: 30}, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50 + (Math.random() - 0.5) * 20,
      color: i % 2 === 0 ? currentColor : COLORS.gold,
      size: 4 + Math.random() * 8,
      velocity: {
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15
      }
    }));
    setParticles(newParticles);
    
    setTimeout(() => setIsShaking(false), 600);
    setTimeout(() => setGlowIntensity(0), 1200);
    setTimeout(() => setParticles([]), 2000);

    try {
      const data = await api.alchemyPreview({ text: inputText, style: selectedStyle });
      setShowResult(false);
      setTimeout(() => {
        setResult(data as unknown as AlchemyResult);
        setShowResult(true);
      }, 400);
    } catch (e) {
      console.error(e);
    } finally {
      setTransforming(false);
    }
  };

  const currentColor = STYLE_COLORS[selectedStyle] || COLORS.purple;
  const currentStyle = styles.find(s => s.name === selectedStyle);

  // Loading State
  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: 120,
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          fontSize: 80, 
          animation: 'spin 2s linear infinite',
          filter: `drop-shadow(0 0 30px ${COLORS.magenta})`
        }}>⚗️</div>
        <div style={{ 
          fontFamily: 'monospace', 
          fontSize: 20, 
          color: COLORS.magenta, 
          marginTop: 28,
          letterSpacing: 4,
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          ÖFFNE DAS GRIMOIRE...
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Particle System */}
      {particles.length > 0 && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 9999,
          overflow: 'hidden'
        }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animation: 'particleFly 1.5s ease-out forwards',
              '--tx': `${p.velocity.x * 20}px`,
              '--ty': `${p.velocity.y * 20}px`
            } as React.CSSProperties} />
          ))}
        </div>
      )}

      {/* 🔥 EPIC HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300, height: 300,
          background: `radial-gradient(circle, ${COLORS.magenta}20, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 24, 
          marginBottom: 16,
          position: 'relative'
        }}>
          <div style={{ 
            width: 90, height: 90, borderRadius: 28,
            background: `linear-gradient(135deg, ${COLORS.magenta}50, ${COLORS.gold}30)`,
            border: `3px solid ${COLORS.magenta}80`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48,
            boxShadow: `0 0 80px ${COLORS.magenta}50, inset 0 0 30px ${COLORS.magenta}30`,
            animation: 'iconFloat 3s ease-in-out infinite'
          }}>⚗️</div>
          <div>
            <h2 style={{ 
              margin: 0, 
              fontFamily: 'monospace', 
              fontSize: 48, 
              fontWeight: 900, 
              letterSpacing: 10,
              background: `linear-gradient(135deg, ${COLORS.magenta}, ${COLORS.gold}, ${COLORS.cyan})`,
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: `drop-shadow(0 0 30px ${COLORS.magenta}50)`
            }}>
              ALCHEMY LAB
            </h2>
            <div style={{ 
              fontSize: 14, 
              color: 'rgba(255,255,255,0.5)', 
              letterSpacing: 4,
              marginTop: 4
            }}>
              DAS GRIMOIRE DER WORT-TRANSMUTATION
            </div>
          </div>
        </div>
      </div>

      {/* STYLE GRID HEADER */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 20 
      }}>
        <div style={{ 
          fontSize: 14, 
          fontFamily: 'monospace', 
          color: COLORS.gold, 
          letterSpacing: 3,
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{ fontSize: 18 }}>🎨</span> 
          STYLES ({styles.length})
        </div>
        <button
          onClick={() => {
            setEditingStyle(null);
            setIsNewStyle(true);
            setShowStyleEditor(true);
          }}
          style={{
            padding: '12px 24px', borderRadius: 14,
            background: `linear-gradient(135deg, ${COLORS.green}30, ${COLORS.green}10)`,
            border: `2px solid ${COLORS.green}`,
            color: COLORS.green,
            fontFamily: 'monospace', 
            fontSize: 13, 
            fontWeight: 800,
            letterSpacing: 2,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: `0 0 30px ${COLORS.green}20`,
            transition: 'all 0.3s ease'
          }}
        >
          <span>✨</span> NEUER STYLE
        </button>
      </div>

      {/* STYLE GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
        marginBottom: 40
      }}>
        {styles.map((style, idx) => (
          <div key={style.name} style={{ animation: `slideInUp 0.4s ease ${idx * 0.1}s both` }}>
            <StyleCard 
              style={style}
              isSelected={selectedStyle === style.name}
              onSelect={() => setSelectedStyle(style.name)}
              onEdit={() => {
                setEditingStyle(style);
                setIsNewStyle(false);
                setShowStyleEditor(true);
              }}
              onGrimoire={() => {
                setEditingStyle(style);
                setShowGrimoire(true);
              }}
              onDelete={() => {
                setStyleToDelete(style.name);
                setShowDeleteModal(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* 🧪 TRANSMUTATION ZONE */}
      <div style={{ 
        padding: 32, 
        borderRadius: 24,
        background: `linear-gradient(135deg, ${COLORS.dark}f0, ${COLORS.darker}f8)`,
        border: `2px solid ${currentColor}40`,
        boxShadow: glowIntensity > 0 
          ? `0 0 ${80 + glowIntensity}px ${currentColor}60, inset 0 0 60px ${currentColor}10`
          : `0 0 50px ${currentColor}25`,
        transition: 'box-shadow 0.4s ease',
        animation: isShaking ? 'shake 0.6s ease' : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 20% 80%, ${currentColor}10, transparent 50%),
                       radial-gradient(circle at 80% 20%, ${COLORS.gold}10, transparent 50%)`,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            fontSize: 15, 
            fontFamily: 'monospace', 
            color: currentColor, 
            marginBottom: 20, 
            letterSpacing: 3,
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <span style={{ fontSize: 20 }}>🧪</span>
            TRANSMUTATION ZONE
            {currentStyle && (
              <span style={{
                padding: '6px 14px',
                background: `${currentColor}20`,
                border: `1px solid ${currentColor}50`,
                borderRadius: 20,
                fontSize: 12
              }}>
                {STYLE_ICONS[selectedStyle] || '⚗️'} {selectedStyle.toUpperCase().replace(/_/g, ' ')}
              </span>
            )}
          </div>
          
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Gib deinen Text ein und beobachte die Transmutation..."
            style={{
              width: '100%',
              minHeight: 120,
              padding: 20,
              borderRadius: 16,
              border: `1px solid ${currentColor}30`,
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: 15,
              lineHeight: 1.7,
              resize: 'vertical',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />

          <button
            onClick={handleTransform}
            disabled={transforming || !inputText.trim()}
            style={{
              width: '100%',
              marginTop: 20,
              padding: 20,
              borderRadius: 16,
              border: `2px solid ${currentColor}`,
              background: `linear-gradient(135deg, ${currentColor}40, ${currentColor}15)`,
              color: currentColor,
              fontFamily: 'monospace',
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 4,
              cursor: transforming ? 'wait' : 'pointer',
              boxShadow: `0 0 40px ${currentColor}30`,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12
            }}
          >
            {transforming ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite' }}>⚗️</span>
                TRANSMUTIERE...
              </>
            ) : (
              <>
                <span>⚗️</span>
                TRANSMUTIEREN
              </>
            )}
          </button>

          {/* RESULT */}
          {result && showResult && (
            <div style={{ 
              marginTop: 28,
              padding: 24,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${currentColor}15, ${currentColor}05)`,
              border: `1px solid ${currentColor}40`,
              animation: 'slideInUp 0.5s ease'
            }}>
              <div style={{ 
                fontSize: 12, 
                color: 'rgba(255,255,255,0.5)', 
                marginBottom: 12,
                fontFamily: 'monospace',
                letterSpacing: 2
              }}>TRANSMUTATION COMPLETE:</div>
              <div style={{ 
                fontSize: 16, 
                color: 'white', 
                fontFamily: 'monospace',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                padding: 16,
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 12
              }}>
                {result.transformed}
              </div>

              {/* Stats */}
              <div style={{ 
                display: 'flex', 
                gap: 16, 
                marginTop: 20, 
                flexWrap: 'wrap' 
              }}>
                <div style={{ 
                  padding: '12px 20px', 
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${COLORS.gold}20, ${COLORS.gold}08)`, 
                  border: `1px solid ${COLORS.gold}50`
                }}>
                  <div style={{ fontSize: 24, color: COLORS.gold, fontWeight: 900 }}>
                    {result.stats?.alchemy_count || result.transformations?.filter(t => t.type === 'alchemy').length || 0}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Transmutationen</div>
                </div>
                <div style={{ 
                  padding: '12px 20px', 
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${COLORS.cyan}20, ${COLORS.cyan}08)`, 
                  border: `1px solid ${COLORS.cyan}50`
                }}>
                  <div style={{ fontSize: 24, color: COLORS.cyan, fontWeight: 900 }}>
                    {result.original.length} → {result.transformed.length}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Zeichen</div>
                </div>
                {(result.stats?.forbidden_count || 0) > 0 && (
                  <div style={{ 
                    padding: '12px 20px', 
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}08)`, 
                    border: `1px solid ${COLORS.red}50`
                  }}>
                    <div style={{ fontSize: 24, color: COLORS.red, fontWeight: 900 }}>
                      {result.stats?.forbidden_count || 0}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Entfernt</div>
                  </div>
                )}
              </div>

              {/* Transformation Details */}
              {result.transformations && result.transformations.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ 
                    fontSize: 12, 
                    color: 'rgba(255,255,255,0.5)', 
                    marginBottom: 12,
                    fontFamily: 'monospace',
                    letterSpacing: 2
                  }}>
                    TRANSFORMATIONEN:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.transformations.map((t, i) => (
                      <div key={i} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 10,
                        fontSize: 13,
                        fontFamily: 'monospace',
                        padding: '8px 12px',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: 8,
                        animation: `slideInLeft 0.3s ease ${i * 0.05}s both`
                      }}>
                        <span style={{ color: COLORS.red, textDecoration: 'line-through' }}>{t.original}</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>→</span>
                        <span style={{ color: COLORS.green }}>{t.replacement}</span>
                        <span style={{
                          marginLeft: 'auto',
                          padding: '3px 8px', 
                          borderRadius: 6,
                          background: t.type === 'forbidden' ? `${COLORS.red}25` : `${COLORS.gold}25`,
                          color: t.type === 'forbidden' ? COLORS.red : COLORS.gold,
                          fontSize: 10,
                          fontWeight: 700
                        }}>{t.type.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showStyleEditor && (
        <StyleEditorModal
          style={editingStyle}
          isNew={isNewStyle}
          onClose={() => setShowStyleEditor(false)}
          onSave={loadStyles}
        />
      )}

      {showGrimoire && editingStyle && (
        <GrimoireModal
          style={editingStyle}
          onClose={() => setShowGrimoire(false)}
          onSave={loadStyles}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          styleName={styleToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            loadStyles();
            if (selectedStyle === styleToDelete && styles.length > 1) {
              setSelectedStyle(styles.find(s => s.name !== styleToDelete)?.name || '');
            }
          }}
        />
      )}

      {/* 🎨 ANIMATIONS */}
      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes modalSlideIn { 
          from { opacity: 0; transform: scale(0.9) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        @keyframes slideInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-20px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes pulse { 
          0%, 100% { opacity: 1; } 
          50% { opacity: 0.6; } 
        }
        @keyframes iconPulse { 
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px currentColor; } 
          50% { transform: scale(1.05); box-shadow: 0 0 40px currentColor; } 
        }
        @keyframes iconFloat { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        @keyframes iconBounce { 
          0% { transform: scale(0) rotate(-180deg); } 
          50% { transform: scale(1.2) rotate(10deg); } 
          100% { transform: scale(1) rotate(0); } 
        }
        @keyframes shake { 
          0%, 100% { transform: translateX(0) rotate(0); } 
          10% { transform: translateX(-8px) rotate(-1deg); } 
          20% { transform: translateX(8px) rotate(1deg); } 
          30% { transform: translateX(-6px) rotate(-1deg); } 
          40% { transform: translateX(6px) rotate(1deg); } 
          50% { transform: translateX(-4px) rotate(0); } 
          60% { transform: translateX(4px) rotate(0); } 
          70% { transform: translateX(-2px) rotate(0); } 
          80% { transform: translateX(2px) rotate(0); } 
          90% { transform: translateX(-1px) rotate(0); } 
        }
        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes particleFly { 
          0% { opacity: 1; transform: translate(0, 0) scale(1); } 
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); } 
        }
        @keyframes rotateBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

































































