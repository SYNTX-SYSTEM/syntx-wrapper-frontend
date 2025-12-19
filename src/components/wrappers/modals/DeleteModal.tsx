"use client";
import React, { useState } from 'react';
import { COLORS, Wrapper } from '../types';

interface DeleteModalProps {
  wrapper: Wrapper | null;
  onClose: () => void;
  onDelete: () => Promise<void>;
  deleting: boolean;
}

export default function DeleteModal({ wrapper, onClose, onDelete, deleting }: DeleteModalProps) {
  const [confirmName, setConfirmName] = useState('');

  if (!wrapper) return null;
  const canDelete = confirmName === wrapper.name;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #1a0a0a, #0a0505)', borderRadius: 24, border: '1px solid rgba(239,68,68,0.5)', maxWidth: 500, width: '100%', position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': COLORS.red } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(239,68,68,0.3)', background: 'linear-gradient(135deg, rgba(239,68,68,0.15), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(239,68,68,0.25)', border: '2px solid rgba(239,68,68,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>💀</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color: COLORS.red, letterSpacing: 3 }}>WRAPPER FREIGEBEN</h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>⚠️ UNWIDERRUFLICH!</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: 28 }}>
          <div style={{ padding: 20, borderRadius: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <span style={{ fontFamily: 'monospace', fontSize: 16, color: 'white', fontWeight: 700 }}>{wrapper.name}</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 16 }}>
              <span>{wrapper.size_human}</span>
              {wrapper.is_active && <span style={{ color: COLORS.green }}>🎯 AKTIV</span>}
            </div>
          </div>

          {wrapper.is_active && (
            <div style={{ padding: 16, borderRadius: 12, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.5)', color: COLORS.orange, fontSize: 13, fontFamily: 'monospace', marginBottom: 24 }}>
              ⚠️ WARNUNG: Dies ist das aktive Default-Feld!
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              Tippe "<span style={{ color: COLORS.red, fontWeight: 700 }}>{wrapper.name}</span>" zur Bestätigung
            </label>
            <input 
              value={confirmName} 
              onChange={e => setConfirmName(e.target.value)} 
              placeholder={wrapper.name} 
              style={{ width: '100%', padding: 14, borderRadius: 10, border: `1px solid ${canDelete ? 'rgba(239,68,68,0.8)' : 'rgba(239,68,68,0.3)'}`, background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} 
            />
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(239,68,68,0.2)', display: 'flex', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ flex: 1, padding: '14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={onDelete} disabled={deleting || !canDelete} className="cyber-btn" style={{ flex: 2, padding: '14px', borderRadius: 10, border: 'none', background: canDelete && !deleting ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'rgba(239,68,68,0.3)', color: 'white', fontFamily: 'monospace', fontWeight: 700, cursor: canDelete && !deleting ? 'pointer' : 'not-allowed' }}>
            {deleting ? '⏳ FREIGEBEN...' : '💀 FREIGEBEN'}
          </button>
        </div>
      </div>
    </div>
  );
}
