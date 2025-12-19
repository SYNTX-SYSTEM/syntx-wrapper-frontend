"use client";
import React from 'react';
import { COLORS, WrapperDetail, getWrapperColor, formatDate } from '../types';

interface ViewModalProps {
  wrapper: WrapperDetail | null;
  loading: boolean;
  onClose: () => void;
  onEdit: () => void;
  onActivate: () => void;
}

export default function ViewModal({ wrapper, loading, onClose, onEdit, onActivate }: ViewModalProps) {
  if (!wrapper && !loading) return null;
  const color = wrapper ? getWrapperColor(wrapper.name) : COLORS.cyan;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `1px solid ${color}50`, width: '95%', maxWidth: 1000, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': color } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📦</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: 3 }}>{wrapper?.name || 'Loading...'}</h3>
                  {wrapper?.is_active && <span style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', fontSize: 11, color: COLORS.green }}>🎯 AKTIV</span>}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Wrapper Detail View</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div className="pulse" style={{ fontSize: 56 }}>📦</div>
              <div style={{ marginTop: 16, color, fontFamily: 'monospace' }}>Lade Details...</div>
            </div>
          ) : wrapper && (
            <>
              {/* STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
                <div style={{ padding: 20, background: `${COLORS.cyan}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.cyan }}>{wrapper.size_human}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>GRÖSSE</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.orange}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.orange }}>{wrapper.content.split('\n').length}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>ZEILEN</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.green}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.green }}>{formatDate(wrapper.last_modified)}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>MODULATION</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.purple}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24 }}>{wrapper.is_active ? '🎯' : '💤'}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>STATUS</div>
                </div>
              </div>

              {/* CONTENT PREVIEW */}
              <div>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>📝</span> WRAPPER CONTENT
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 16, border: `1px solid ${color}30`, padding: 20, maxHeight: 400, overflow: 'auto' }}>
                  <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{wrapper.content}</pre>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '16px 28px', borderTop: `1px solid ${color}20`, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          {wrapper && !wrapper.is_active && (
            <button onClick={onActivate} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(16,185,129,0.5)', background: 'rgba(16,185,129,0.15)', color: COLORS.green, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>🎯 AKTIVIEREN</button>
          )}
          <button onClick={onEdit} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>✏️ EDIT</button>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: color, color: '#030b15', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>SCHLIESSEN</button>
        </div>
      </div>
    </div>
  );
}
