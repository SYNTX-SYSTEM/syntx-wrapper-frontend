"use client";
import React, { useState } from 'react';
import { api } from '@/lib/api';
import { COLORS } from '../constants';

interface DeleteModalProps {
  styleName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ styleName, onClose, onConfirm }: DeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try { await api.deleteStyle(styleName); onConfirm(); onClose(); }
    catch (e) { console.error(e); }
    finally { setDeleting(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }} onClick={onClose}>
      <div style={{ width: 420, padding: 36, borderRadius: 24, background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`, border: `2px solid ${COLORS.red}40`, boxShadow: `0 0 80px ${COLORS.red}30`, textAlign: 'center', animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 56, marginBottom: 20, animation: 'shake 0.5s ease' }}>🗑️</div>
        <h3 style={{ margin: '0 0 16px 0', fontFamily: 'monospace', fontSize: 22, color: COLORS.red, letterSpacing: 2 }}>STYLE AUSLÖSCHEN?</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.6 }}>Bist du sicher, dass du <strong style={{ color: COLORS.red }}>{styleName}</strong> unwiderruflich löschen möchtest?</p>
        <div style={{ display: 'flex', gap: 14 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 16, borderRadius: 14, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={handleDelete} disabled={deleting} style={{ flex: 1, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.red}50, ${COLORS.red}30)`, border: `2px solid ${COLORS.red}`, color: 'white', fontFamily: 'monospace', fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: deleting ? 'wait' : 'pointer', boxShadow: `0 0 30px ${COLORS.red}30` }}>{deleting ? '⏳ LÖSCHE...' : '🗑️ AUSLÖSCHEN'}</button>
        </div>
      </div>
    </div>
  );
}
