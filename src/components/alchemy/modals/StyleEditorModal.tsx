"use client";
import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { COLORS } from '../constants';
import type { Style } from '../types';

interface StyleEditorModalProps {
  style: Style | null;
  onClose: () => void;
  onSave: () => void;
  isNew: boolean;
}

export function StyleEditorModal({ style, onClose, onSave, isNew }: StyleEditorModalProps) {
  const [name, setName] = useState(style?.name || '');
  const [vibe, setVibe] = useState(style?.vibe || '');
  const [description, setDescription] = useState('');
  const [toneInjection, setToneInjection] = useState('');
  const [suffix, setSuffix] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  useEffect(() => {
    if (!isNew && style?.name) {
      api.getStyle(style.name).then((data: any) => {
        if (data.style) { setVibe(data.style.vibe || ''); setDescription(data.style.description || ''); setToneInjection(data.style.tone_injection || ''); setSuffix(data.style.suffix || ''); }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [isNew, style?.name]);

  const handleSave = async () => {
    if (!name.trim() || !vibe.trim()) { setError('Name und Vibe sind erforderlich'); return; }
    setSaving(true); setError('');
    try {
      const styleName = name.toLowerCase().replace(/\s+/g, '_');
      if (isNew) {
        await api.createStyle({ name: styleName, vibe });
        if (description || toneInjection || suffix) {
          const updates: any = {};
          if (description) updates.description = description;
          if (toneInjection) updates.tone_injection = toneInjection;
          if (suffix) updates.suffix = suffix;
          await api.updateStyle(styleName, updates);
        }
      } else {
        await api.updateStyle(style!.name, { vibe, description, tone_injection: toneInjection, suffix } as any);
      }
      onSave(); onClose();
    } catch (e: any) { setError(e.message || 'Fehler'); }
    finally { setSaving(false); }
  };

  if (loading) return <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center', color: COLORS.magenta }}><div style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>⚗️</div><div style={{ marginTop: 16, fontFamily: 'monospace', letterSpacing: 2 }}>LADE STYLE...</div></div></div>;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn 0.3s ease' }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'hidden', borderRadius: 24, background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`, border: `2px solid ${COLORS.magenta}40`, boxShadow: `0 0 80px ${COLORS.magenta}30`, display: 'flex', flexDirection: 'column', animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} onClick={e => e.stopPropagation()}>
        
        <div style={{ padding: '28px 32px 20px', borderBottom: `1px solid ${COLORS.magenta}20` }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 12, animation: 'iconBounce 0.6s ease' }}>{isNew ? '✨' : '✏️'}</div>
            <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.magenta, letterSpacing: 3, textShadow: `0 0 30px ${COLORS.magenta}50` }}>{isNew ? 'NEUER STYLE ERSCHAFFEN' : 'STYLE BEARBEITEN'}</h3>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setActiveTab('basic')} style={{ flex: 1, padding: '12px 20px', borderRadius: 12, background: activeTab === 'basic' ? `linear-gradient(135deg, ${COLORS.magenta}30, ${COLORS.magenta}10)` : 'transparent', border: activeTab === 'basic' ? `2px solid ${COLORS.magenta}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'basic' ? COLORS.magenta : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>📝</span> BASICS</button>
            <button onClick={() => setActiveTab('advanced')} style={{ flex: 1, padding: '12px 20px', borderRadius: 12, background: activeTab === 'advanced' ? `linear-gradient(135deg, ${COLORS.purple}30, ${COLORS.purple}10)` : 'transparent', border: activeTab === 'advanced' ? `2px solid ${COLORS.purple}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'advanced' ? COLORS.purple : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>⚡</span> ADVANCED</button>
          </div>
        </div>

        {error && <div style={{ margin: '16px 32px 0', padding: 14, borderRadius: 12, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}60`, color: COLORS.red, fontSize: 13, textAlign: 'center', animation: 'shake 0.5s ease' }}>{error}</div>}

        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          {activeTab === 'basic' ? (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>NAME {isNew && <span style={{ color: COLORS.red }}>*</span>}</label>
                <input value={name} onChange={e => setName(e.target.value)} disabled={!isNew} placeholder="z.B. formal_business" style={{ width: '100%', padding: 14, borderRadius: 12, background: isNew ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)', border: `1px solid ${isNew ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`, color: isNew ? 'white' : 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>VIBE <span style={{ color: COLORS.red }}>*</span></label>
                <input value={vibe} onChange={e => setVibe(e.target.value)} placeholder="z.B. Der Konferenzraum-Transformer" style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'monospace', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>BESCHREIBUNG</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Ausführliche Beschreibung..." style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'monospace', fontSize: 14, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: COLORS.purple, fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}><span>💉</span> TONE INJECTION</label>
                <textarea value={toneInjection} onChange={e => setToneInjection(e.target.value)} placeholder="Prompt-Text der VOR dem LLM-Request injiziert wird..." style={{ width: '100%', minHeight: 140, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: `1px solid ${COLORS.purple}40`, color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, padding: '8px 12px', background: `${COLORS.purple}10`, borderRadius: 8, border: `1px solid ${COLORS.purple}20` }}>⚡ Pre-LLM: Wird BEVOR der Request ans LLM geht hinzugefügt</div>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: COLORS.cyan, fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}><span>📎</span> SUFFIX</label>
                <textarea value={suffix} onChange={e => setSuffix(e.target.value)} placeholder="Text der am Ende jeder Response angehängt wird..." style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: `1px solid ${COLORS.cyan}40`, color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, padding: '8px 12px', background: `${COLORS.cyan}10`, borderRadius: 8, border: `1px solid ${COLORS.cyan}20` }}>📎 Post-LLM: Wird NACH der Response angehängt</div>
              </div>
            </>
          )}
        </div>

        <div style={{ padding: '20px 32px', borderTop: `1px solid ${COLORS.magenta}20`, display: 'flex', gap: 14 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 16, borderRadius: 14, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.magenta}50, ${COLORS.purple}30)`, border: `2px solid ${COLORS.magenta}`, color: COLORS.magenta, fontFamily: 'monospace', fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: saving ? 'wait' : 'pointer', boxShadow: `0 0 30px ${COLORS.magenta}30` }}>{saving ? '⏳ SPEICHERN...' : isNew ? '✨ ERSCHAFFEN' : '💾 SPEICHERN'}</button>
        </div>
      </div>
    </div>
  );
}
