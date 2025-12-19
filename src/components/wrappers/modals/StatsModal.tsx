"use client";
import React from 'react';
import { COLORS, Wrapper, WrapperStats, getWrapperColor } from '../types';

interface StatsModalProps {
  wrapper: Wrapper | null;
  stats: WrapperStats | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

export default function StatsModal({ wrapper, stats, loading, error, onClose }: StatsModalProps) {
  if (!wrapper) return null;
  const color = getWrapperColor(wrapper.name);

  const StatBox = ({ label, value, unit, icon }: { label: string; value: number | string; unit?: string; icon: string }) => (
    <div style={{ padding: 20, borderRadius: 16, background: `${color}10`, border: `1px solid ${color}30` }}>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{icon} {label}</div>
      <div style={{ fontSize: 28, fontFamily: 'monospace', color, fontWeight: 700 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}{unit && <span style={{ fontSize: 14, opacity: 0.7, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `1px solid ${color}50`, width: '95%', maxWidth: 700, position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': color } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 50, height: 50, borderRadius: 12, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📊</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }}>WRAPPER STATISTIKEN</h3>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT */}
        <div style={{ padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div className="pulse" style={{ fontSize: 48 }}>📊</div>
              <div style={{ marginTop: 16, color, fontFamily: 'monospace' }}>Lade Statistiken...</div>
            </div>
          ) : error || !stats ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48 }}>📭</div>
              <div style={{ fontFamily: 'monospace', fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Keine Statistiken verfügbar</div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Dieses Feld wurde noch nicht verwendet</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                <StatBox label="TOTAL REQUESTS" value={stats.requests} icon="📨" />
                <StatBox label="SUCCESS RATE" value={stats.success_rate.toFixed(1)} unit="%" icon="✅" />
                <StatBox label="AVG LATENCY" value={Math.round(stats.average_latency_ms)} unit="ms" icon="⚡" />
              </div>
              
              <div style={{ padding: 20, borderRadius: 16, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>⏱️ LATENCY DETAILS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MIN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.green }}>{stats.min_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MEDIAN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.cyan }}>{stats.median_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MAX</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.orange }}>{stats.max_latency_ms.toLocaleString()} ms</div></div>
                </div>
              </div>

              <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: stats.success_rate >= 95 ? 'rgba(16,185,129,0.1)' : stats.success_rate >= 80 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${stats.success_rate >= 95 ? COLORS.green : stats.success_rate >= 80 ? COLORS.orange : COLORS.red}30`, textAlign: 'center' }}>
                <span style={{ fontSize: 14, fontFamily: 'monospace', color: stats.success_rate >= 95 ? COLORS.green : stats.success_rate >= 80 ? COLORS.orange : COLORS.red }}>
                  {stats.success_rate >= 95 ? '🔥 EXCELLENT PERFORMANCE' : stats.success_rate >= 80 ? '✅ GOOD PERFORMANCE' : '⚠️ NEEDS ATTENTION'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
