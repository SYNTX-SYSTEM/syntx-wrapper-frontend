"use client";
import React from 'react';
import { COLORS, CreateField } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  saving: boolean;
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  fields: CreateField[];
  setFields: (v: CreateField[]) => void;
}

export default function CreateModal({ isOpen, onClose, onCreate, saving, name, setName, description, setDescription, fields, setFields }: CreateModalProps) {
  if (!isOpen) return null;

  const addField = () => setFields([...fields, { name: '', weight: 17 }]);
  const updateField = (i: number, key: 'name' | 'weight', val: string | number) => {
    setFields(fields.map((f, idx) => idx === i ? { ...f, [key]: val } : f));
  };
  const removeField = (i: number) => {
    if (fields.length > 1) setFields(fields.filter((_, idx) => idx !== i));
  };

  const validFields = fields.filter(f => f.name.trim());
  const canCreate = name.trim() && validFields.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: '1px solid rgba(20,184,166,0.5)', width: '95%', maxWidth: 1100, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(20,184,166,0.3)', background: 'linear-gradient(135deg, rgba(20,184,166,0.15), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(20,184,166,0.25)', border: '2px solid rgba(20,184,166,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>⚡</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color: COLORS.teal, letterSpacing: 3 }}>FORMAT GEBÄREN</h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Quick Create mit Live Preview</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: FORM */}
          <div style={{ padding: 28, borderRight: '1px solid rgba(20,184,166,0.2)', overflow: 'auto' }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>🏷️ FORMAT NAME *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="z.B. sigma_analysis" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(20,184,166,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Wird: {name.toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'format_name'}</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📝 DESCRIPTION</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Beschreibung..." style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, resize: 'vertical', minHeight: 60, outline: 'none' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>🎯 FELDER * ({validFields.length})</label>
                <button onClick={addField} className="cyber-btn" style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: COLORS.teal, color: '#030b15', fontSize: 11, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>+ FELD</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {fields.map((field, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: `${COLORS.teal}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: COLORS.teal, fontWeight: 700 }}>{i + 1}</div>
                    <input type="text" value={field.name} onChange={e => updateField(i, 'name', e.target.value)} placeholder="Feldname..." style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
                    <input type="number" value={field.weight} onChange={e => updateField(i, 'weight', parseInt(e.target.value) || 17)} style={{ width: 60, padding: 12, borderRadius: 8, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: COLORS.orange, fontFamily: 'monospace', fontSize: 13, textAlign: 'center', outline: 'none' }} />
                    {fields.length > 1 && <button onClick={() => removeField(i)} style={{ background: 'none', border: 'none', color: COLORS.red, cursor: 'pointer', fontSize: 16 }}>🗑️</button>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="live-preview" style={{ padding: 28, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>👁️</span>
              <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.magenta }}>LIVE PREVIEW</h4>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: '1px solid rgba(217,70,239,0.3)', padding: 20, fontFamily: 'monospace', fontSize: 13 }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                {'// ═══ FORMAT: '}{(name || 'NEW').toUpperCase().replace(/[^A-Z0-9_]/g, '_')}{' ═══'}
              </div>

              {validFields.length > 0 ? validFields.map((field, i) => (
                <div key={i} className="preview-line" style={{ marginBottom: 16 }}>
                  <div style={{ color: COLORS.cyan, fontWeight: 700, marginBottom: 4 }}>### {field.name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')}:</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', paddingLeft: 16, borderLeft: `2px solid ${COLORS.cyan}30`, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: COLORS.orange }}>AI Output</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>(w:{field.weight})</span>
                  </div>
                </div>
              )) : <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 20 }}>Füge Felder hinzu...</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              <div style={{ padding: 16, background: 'rgba(0,212,255,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.cyan }}>{validFields.length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>FELDER</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.orange }}>{validFields.reduce((a, b) => a + b.weight, 0)}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>WEIGHT</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(217,70,239,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.magenta }}>~{validFields.length * 150}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(20,184,166,0.2)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={onCreate} disabled={saving || !canCreate} className="cyber-btn" style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: canCreate && !saving ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'rgba(20,184,166,0.3)', color: '#030b15', fontFamily: 'monospace', fontWeight: 800, cursor: canCreate && !saving ? 'pointer' : 'not-allowed' }}>
            {saving ? '⏳ GEBÄRT...' : '⚡ GEBÄREN'}
          </button>
        </div>
      </div>
    </div>
  );
}
