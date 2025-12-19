"use client";
import React from 'react';
import { COLORS, LocalFormat } from '../types';

interface ScoreModalProps {
  format: LocalFormat | null;
  data: any;
  loading: boolean;
  onClose: () => void;
}

export default function ScoreModal({ format, data, loading, onClose }: ScoreModalProps) {
  if (!format) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 20, border: '1px solid rgba(139,92,246,0.5)', maxWidth: 600, width: '100%' }}>
        <div style={{ padding: 24, borderBottom: '1px solid rgba(139,92,246,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.purple }}>📊 SCORE: {format.name}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          {loading && <div style={{ textAlign: 'center', padding: 40 }}><div className="pulse" style={{ fontSize: 48 }}>📊</div><div style={{ marginTop: 16, color: COLORS.purple }}>Analysiere...</div></div>}
          {data?.error && <div style={{ color: COLORS.red, padding: 20, background: 'rgba(239,68,68,0.1)', borderRadius: 12 }}>❌ {data.error}</div>}
          {data && !data.error && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>OVERALL</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: data.overall >= 80 ? COLORS.green : data.overall >= 50 ? COLORS.orange : COLORS.red }}>{data.overall || 0}</div>
              </div>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>CLARITY</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.cyan }}>{data.semantic_clarity || 0}</div>
              </div>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>I18N</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.magenta }}>{data.i18n_score || 0}</div>
              </div>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>BALANCE</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: data.field_balance === 'EXCELLENT' ? COLORS.green : COLORS.orange }}>{data.field_balance || 'N/A'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
