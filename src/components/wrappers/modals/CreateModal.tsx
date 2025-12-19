"use client";
import React, { useState } from 'react';
import { COLORS } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; content: string; description?: string; author?: string }) => Promise<void>;
  saving: boolean;
}

export default function CreateModal({ isOpen, onClose, onCreate, saving }: CreateModalProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  if (!isOpen) return null;

  const canCreate = name.trim() && content.trim();
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const estimatedSize = new Blob([content]).size;

  const handleCreate = async () => {
    if (!canCreate) return;
    await onCreate({ name: normalizedName, content, description: description || undefined, author: author || undefined });
    setName(''); setContent(''); setDescription(''); setAuthor('');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: '1px solid rgba(16,185,129,0.5)', width: '95%', maxWidth: 1200, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': COLORS.green } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(16,185,129,0.3)', background: 'linear-gradient(135deg, rgba(16,185,129,0.15), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(16,185,129,0.25)', border: '2px solid rgba(16,185,129,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🌟</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color: COLORS.green, letterSpacing: 3 }}>WRAPPER GEBÄREN</h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Manifestiere ein neues Feld mit Live Preview</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT - SPLIT VIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: FORM */}
          <div style={{ padding: 28, borderRight: '1px solid rgba(16,185,129,0.2)', overflow: 'auto' }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>🏷️ WRAPPER NAME *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="z.B. sigma_ultra" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Wird: {normalizedName || 'wrapper_name'}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>👤 AUTOR</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="SYNTX" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📝 BESCHREIBUNG</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Beschreibung..." style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📦 WRAPPER CONTENT *</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="=== SYNTX WRAPPER ===" style={{ width: '100%', minHeight: 300, padding: 14, borderRadius: 10, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical' }} />
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="live-preview" style={{ padding: 28, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>👁️</span>
              <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.magenta }}>LIVE PREVIEW</h4>
              <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: 'rgba(217,70,239,0.2)', color: COLORS.magenta }}>System Prompt</span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: '1px solid rgba(217,70,239,0.3)', padding: 20, fontFamily: 'monospace', fontSize: 13, minHeight: 300 }}>
              {content ? (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{content}</pre>
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 40 }}>
                  Gib Content ein um die Preview zu sehen...
                </div>
              )}
            </div>

            {/* STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              <div style={{ padding: 16, background: 'rgba(0,212,255,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.cyan }}>{content.split('\n').length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>ZEILEN</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.orange }}>{content.length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>ZEICHEN</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(217,70,239,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.magenta }}>{(estimatedSize / 1024).toFixed(1)}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>KB</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            API: POST /resonanz/wrapper
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onClose} className="cyber-btn" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
            <button onClick={handleCreate} disabled={saving || !canCreate} className="cyber-btn" style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: canCreate && !saving ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(16,185,129,0.3)', color: '#030b15', fontFamily: 'monospace', fontWeight: 800, cursor: canCreate && !saving ? 'pointer' : 'not-allowed' }}>
              {saving ? '⏳ GEBÄRT...' : '🌟 GEBÄREN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
