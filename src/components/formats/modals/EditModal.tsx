"use client";
import React from 'react';
import { COLORS, LocalFormat, EditField, AVAILABLE_WRAPPERS } from '../types';

interface EditModalProps {
  format: LocalFormat | null;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  fields: EditField[];
  setFields: (f: EditField[]) => void;
  description: string;
  setDescription: (v: string) => void;
  version: string;
  setVersion: (v: string) => void;
  wrapper: string;
  setWrapper: (v: string) => void;
  newFieldName: string;
  setNewFieldName: (v: string) => void;
}

export default function EditModal({ format, onClose, onSave, saving, fields, setFields, description, setDescription, version, setVersion, wrapper, setWrapper, newFieldName, setNewFieldName }: EditModalProps) {
  if (!format) return null;

  const addField = () => {
    if (!newFieldName.trim()) return;
    const sanitized = newFieldName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (fields.some(f => f.name === sanitized)) return;
    setFields([...fields, { name: sanitized, weight: 17, enabled: true }]);
    setNewFieldName('');
  };

  const toggleField = (i: number) => setFields(fields.map((f, idx) => idx === i ? { ...f, enabled: !f.enabled } : f));
  const updateWeight = (i: number, w: number) => setFields(fields.map((f, idx) => idx === i ? { ...f, weight: w } : f));
  const removeField = (i: number) => setFields(fields.filter((_, idx) => idx !== i));

  const enabledFields = fields.filter(f => f.enabled);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: '1px solid rgba(0,212,255,0.4)', width: '95%', maxWidth: 1200, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(0,212,255,0.2)', background: 'linear-gradient(135deg, rgba(0,212,255,0.1), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 32 }}>✏️</span>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.cyan }}>FORMAT EDITIEREN</h3>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{format.name}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: EDITOR */}
          <div style={{ padding: 28, borderRight: '1px solid rgba(0,212,255,0.2)', overflow: 'auto' }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📝 DESCRIPTION</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, resize: 'vertical', minHeight: 80, outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>🏷️ VERSION</label>
                <input type="text" value={version} onChange={e => setVersion(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📦 WRAPPER</label>
                <select value={wrapper} onChange={e => setWrapper(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }}>
                  {AVAILABLE_WRAPPERS.map(w => <option key={w} value={w}>{w.replace('syntex_wrapper_', '').toUpperCase()}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 12, display: 'block' }}>🎯 FELDER ({enabledFields.length} aktiv)</label>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', maxHeight: 280, overflow: 'auto' }}>
                {fields.map((field, i) => (
                  <div key={i} className="field-item" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', opacity: field.enabled ? 1 : 0.4 }}>
                    <input type="checkbox" checked={field.enabled} onChange={() => toggleField(i)} style={{ accentColor: COLORS.cyan }} />
                    <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, color: field.enabled ? COLORS.cyan : 'rgba(255,255,255,0.3)' }}>{field.name}</span>
                    <input type="number" value={field.weight} onChange={e => updateWeight(i, parseInt(e.target.value) || 0)} style={{ width: 50, padding: 6, borderRadius: 6, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: COLORS.orange, fontFamily: 'monospace', fontSize: 11, textAlign: 'center' }} />
                    <button onClick={() => removeField(i)} style={{ background: 'none', border: 'none', color: COLORS.red, cursor: 'pointer', fontSize: 16 }}>🗑️</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <input type="text" value={newFieldName} onChange={e => setNewFieldName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addField()} placeholder="Neues Feld..." style={{ flex: 1, padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
                <button onClick={addField} className="cyber-btn" style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: COLORS.teal, color: '#030b15', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>+ ADD</button>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="live-preview" style={{ padding: 28, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>👁️</span>
              <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.magenta }}>LIVE PREVIEW</h4>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: '1px solid rgba(217,70,239,0.3)', padding: 20, fontFamily: 'monospace', fontSize: 13 }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                {'// ═══ FORMAT: '}{format.name.toUpperCase()}{' ═══'}
              </div>

              {enabledFields.length > 0 ? enabledFields.map((field, i) => (
                <div key={i} className="preview-line" style={{ marginBottom: 16 }}>
                  <div style={{ color: COLORS.cyan, fontWeight: 700, marginBottom: 4 }}>### {field.name.toUpperCase()}:</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', paddingLeft: 16, borderLeft: `2px solid ${COLORS.cyan}30`, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: COLORS.orange }}>AI Output</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>(w:{field.weight})</span>
                  </div>
                </div>
              )) : <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 20 }}>Keine Felder aktiv</div>}

              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>
                {'// Wrapper: '}{wrapper.replace('syntex_wrapper_', '').toUpperCase()}{' | v'}{version}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              <div style={{ padding: 16, background: 'rgba(0,212,255,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.cyan }}>{enabledFields.length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>AKTIV</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.orange }}>{enabledFields.reduce((a, b) => a + b.weight, 0)}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>WEIGHT</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(217,70,239,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.magenta }}>~{enabledFields.length * 150}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(0,212,255,0.2)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={onSave} disabled={saving} className="cyber-btn" style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: saving ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00d4ff, #0ea5e9)', color: '#030b15', fontFamily: 'monospace', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? '⏳ SPEICHERT...' : '💾 SPEICHERN'}
          </button>
        </div>
      </div>
    </div>
  );
}
