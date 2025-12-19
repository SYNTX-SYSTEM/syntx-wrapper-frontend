"use client";
import React from 'react';
import { COLORS, LocalFormat } from '../types';

interface DeleteModalProps {
  format: LocalFormat | null;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ format, onClose, onDelete }: DeleteModalProps) {
  if (!format) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 20, border: '1px solid rgba(239,68,68,0.5)', maxWidth: 450, width: '100%', textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>💀</div>
        <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color: COLORS.red }}>FORMAT FREIGEBEN?</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: '16px 0 24px' }}>Willst du <strong style={{ color: COLORS.red }}>{format.name}</strong> wirklich löschen?</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ flex: 1, padding: '14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'monospace' }}>ABBRECHEN</button>
          <button onClick={onDelete} className="cyber-btn" style={{ flex: 1, padding: '14px', borderRadius: 10, border: 'none', background: COLORS.red, color: 'white', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 700 }}>💀 FREIGEBEN</button>
        </div>
      </div>
    </div>
  );
}
