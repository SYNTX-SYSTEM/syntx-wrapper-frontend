"use client";
import React from 'react';
import { COLORS, LocalFormat, FullFormatDetail, getFormatColor } from '../types';

interface ViewModalProps {
  format: LocalFormat | null;
  data: FullFormatDetail | null;
  loading: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export default function ViewModal({ format, data, loading, onClose, onEdit }: ViewModalProps) {
  if (!format) return null;
  const color = getFormatColor(format.name);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `1px solid ${color}50`, width: '95%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📋</div>
              <div>
                <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: 3 }}>{format.name}</h3>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Format Detail View</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div className="pulse" style={{ fontSize: 56 }}>📋</div>
              <div style={{ marginTop: 16, color, fontFamily: 'monospace' }}>Lade Details...</div>
            </div>
          )}

          {data && (
            <div>
              {/* DESCRIPTION */}
              {data.description && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>📝 DESCRIPTION</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                      <div style={{ fontSize: 11, color: COLORS.cyan, marginBottom: 8 }}>🇩🇪 DEUTSCH</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{data.description.de || '—'}</div>
                    </div>
                    <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                      <div style={{ fontSize: 11, color: COLORS.orange, marginBottom: 8 }}>🇬🇧 ENGLISH</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{data.description.en || '—'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
                <div style={{ padding: 20, background: `${COLORS.cyan}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.cyan }}>{data.fields?.length || 0}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>FELDER</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.orange}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.orange }}>{data.version || '1.0'}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>VERSION</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.green}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24 }}>{data.languages?.includes('de') ? '🇩🇪' : ''}{data.languages?.includes('en') ? '🇬🇧' : ''}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>SPRACHEN</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.purple}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.purple }}>{data.fields?.reduce((a, f) => a + (f.weight || 0), 0) || 0}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>WEIGHT</div>
                </div>
              </div>

              {/* FELDER */}
              {data.fields && data.fields.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>🎯 FELDER ({data.fields.length})</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {data.fields.map((field, i) => (
                      <div key={i} style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 14, border: `1px solid ${color}30` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: field.description || field.keywords ? 12 : 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 14, color, fontWeight: 700 }}>{i + 1}</div>
                            <div style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color }}>{field.name}</div>
                          </div>
                          <div style={{ padding: '6px 12px', borderRadius: 20, background: `${COLORS.orange}20`, fontSize: 12, fontFamily: 'monospace', color: COLORS.orange }}>
                            Weight: {field.weight || 17}
                          </div>
                        </div>
                        {field.description && <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: field.keywords ? 12 : 0 }}>{field.description}</div>}
                        {field.keywords && field.keywords.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {field.keywords.map((kw, ki) => (
                              <span key={ki} style={{ padding: '4px 10px', borderRadius: 6, background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}30`, fontSize: 11, fontFamily: 'monospace', color: COLORS.cyan }}>{kw}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '16px 28px', borderTop: `1px solid ${color}20`, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onEdit} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>✏️ EDIT</button>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: color, color: '#030b15', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>SCHLIESSEN</button>
        </div>
      </div>
    </div>
  );
}
