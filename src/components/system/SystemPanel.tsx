"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, Wrapper } from '@/lib/api';

function CyberGrid() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.04 }}>
        <defs>
          <pattern id="sysGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sysGrid)" />
      </svg>
      <style>{`
        @keyframes statusPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(0.9); } }
        @keyframes statusRing { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.3); opacity: 0; } }
      `}</style>
    </div>
  );
}

function StatusIndicator({ status, size = 12 }: { status: 'online' | 'offline' | 'warning'; size?: number }) {
  const colors = { online: '#10b981', offline: '#ef4444', warning: '#f59e0b' };
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: colors[status], animation: status === 'online' ? 'statusPulse 2s ease-in-out infinite' : 'none' }} />
      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${colors[status]}`, opacity: 0.3, animation: status === 'online' ? 'statusRing 2s ease-in-out infinite' : 'none' }} />
    </div>
  );
}

function GlassPanel({ children, title, icon, status, glowColor = '#00d4ff' }: { children: React.ReactNode; title: string; icon: string; status?: 'online' | 'offline' | 'warning'; glowColor?: string; }) {
  return (
    <div style={{ position: 'relative', borderRadius: 20, background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }} />
      <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.2)' }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <h3 style={{ margin: 0, flex: 1, fontFamily: 'monospace', fontSize: 14, color: glowColor, letterSpacing: 2 }}>{title}</h3>
        {status && <StatusIndicator status={status} />}
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function MetricRow({ label, value, color = '#00d4ff', icon }: { label: string; value: string | number; color?: string; icon?: string; }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'rgba(0,0,0,0.2)', borderRadius: 12, marginBottom: 8, border: `1px solid ${color}15` }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>{label}</span>
      <span style={{ fontFamily: 'monospace', fontSize: 14, color, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function WrapperStatsCard({ wrapper, isDefault, onSetDefault }: { wrapper: Wrapper; isDefault: boolean; onSetDefault: () => void; }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getWrapperStats(wrapper.name).then(setStats).catch(console.error).finally(() => setLoading(false));
  }, [wrapper.name]);

  const displayName = wrapper.name.replace('syntex_wrapper_', '').toUpperCase();
  
  const getColor = () => {
    if (wrapper.name.includes('human')) return '#10b981';
    if (wrapper.name.includes('sigma')) return '#f59e0b';
    if (wrapper.name.includes('deepsweep')) return '#d946ef';
    if (wrapper.name.includes('true_raw')) return '#ef4444';
    return '#00d4ff';
  };
  
  const color = getColor();
  const isHighLatency = stats?.average_latency_ms > 5000;
  
  return (
    <div style={{
      background: isHighLatency ? 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.1))' : `linear-gradient(135deg, ${color}08, ${color}03)`,
      border: isHighLatency ? '2px solid rgba(239,68,68,0.7)' : `1px solid ${color}30`,
      borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden',
      boxShadow: isHighLatency ? '0 0 25px rgba(239,68,68,0.4)' : 'none',
    }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${color}20, transparent)` }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: wrapper.is_active ? color : 'rgba(255,255,255,0.2)', boxShadow: wrapper.is_active ? `0 0 12px ${color}` : 'none' }} />
        <span style={{ fontFamily: 'monospace', fontSize: 14, color, fontWeight: 700, letterSpacing: 1 }}>{displayName}</span>
        {isDefault && <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 9, fontFamily: 'monospace', background: 'rgba(0,212,255,0.2)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)' }}>DEFAULT</span>}
        {wrapper.is_active && <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 9, fontFamily: 'monospace', background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>ACTIVE</span>}
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', padding: 20 }}>Loading...</div>
      ) : stats ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ textAlign: 'center', padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color, fontFamily: 'monospace' }}>{stats.requests || 0}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: 4 }}>REQUESTS</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: isHighLatency ? 'rgba(239,68,68,0.15)' : 'rgba(0,0,0,0.2)', borderRadius: 10, border: isHighLatency ? '1px solid rgba(239,68,68,0.4)' : '1px solid transparent' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: isHighLatency ? '#ef4444' : '#f59e0b', fontFamily: 'monospace' }}>
              {stats.average_latency_ms ? (stats.average_latency_ms / 1000).toFixed(1) : '0'}s
              {isHighLatency && <span style={{ fontSize: 12, marginLeft: 4 }}>⚠️</span>}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: 4 }}>AVG LATENCY</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>{stats.success_rate && stats.success_rate !== 100 ? `${stats.success_rate}%` : '✓'}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: 4 }}>SUCCESS</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#d946ef', fontFamily: 'monospace' }}>{wrapper.size_human || '?'}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: 4 }}>SIZE</div>
          </div>
        </div>
      ) : (
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center' }}>No stats</div>
      )}

      {!isDefault && (
        <button onClick={onSetDefault} style={{ marginTop: 16, width: '100%', padding: '10px 16px', borderRadius: 10, border: `1px solid ${color}40`, background: `${color}10`, color: color, fontFamily: 'monospace', fontSize: 11, cursor: 'pointer' }}>SET AS DEFAULT</button>
      )}
    </div>
  );
}

export default function SystemPanel() {
  const [health, setHealth] = useState<any>(null);
  const [sysConfig, setSysConfig] = useState<any>(null);
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [healthData, configData, wrapperData] = await Promise.all([api.getHealth(), api.getConfig(), api.getWrappers()]);
      setHealth(healthData);
      setSysConfig(configData);
      setWrappers(wrapperData.wrappers || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); const interval = setInterval(fetchData, 15000); return () => clearInterval(interval); }, [fetchData]);

  const handleSetDefault = async (name: string) => { try { await api.setConfig(name); await fetchData(); } catch (e) { console.error(e); } };

  const systemStatus = health?.status === 'healthy' ? 'online' : health ? 'warning' : 'offline';

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <CyberGrid />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassPanel title="SYSTEM HEALTH" icon="💚" status={systemStatus} glowColor="#10b981">
            {loading ? <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : health ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, background: systemStatus === 'online' ? 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.05))' : 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05))', borderRadius: 16, marginBottom: 20 }}>
                  <StatusIndicator status={systemStatus} size={24} />
                  <span style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 700, color: systemStatus === 'online' ? '#10b981' : '#ef4444', letterSpacing: 3 }}>{health.status?.toUpperCase() || 'UNKNOWN'}</span>
                </div>
                <MetricRow label="VERSION" value={health.version || 'N/A'} icon="📦" color="#00d4ff" />
                <MetricRow label="UPTIME" value={health.uptime || 'N/A'} icon="⏱️" color="#d946ef" />
                <MetricRow label="BACKEND" value={health.backend || 'Ollama'} icon="🔗" color="#10b981" />
              </>
            ) : <div style={{ textAlign: 'center', padding: 20, color: '#ef4444' }}>Failed to load</div>}
          </GlassPanel>

          <GlassPanel title="CONFIGURATION" icon="⚙️" glowColor="#f59e0b">
            {loading ? <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : (
              <>
                <MetricRow label="DEFAULT WRAPPER" value={sysConfig?.active_wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'NONE'} icon="📦" color="#f59e0b" />
                <MetricRow label="TOTAL WRAPPERS" value={wrappers.length} icon="📚" color="#d946ef" />
                <MetricRow label="ACTIVE WRAPPER" value={wrappers.find(w => w.is_active)?.name.replace('syntex_wrapper_', '').toUpperCase() || 'NONE'} icon="✅" color="#10b981" />
                <MetricRow label="API BASE" value="dev.syntx-system.com" icon="🌐" color="#00d4ff" />
                <button onClick={fetchData} style={{ marginTop: 16, width: '100%', padding: '12px 20px', borderRadius: 12, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.1)', color: '#00d4ff', fontFamily: 'monospace', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>↻ REFRESH</button>
              </>
            )}
          </GlassPanel>
        </div>

        <GlassPanel title="WRAPPER STATISTICS" icon="📊" glowColor="#d946ef">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {wrappers.map(wrapper => (
              <WrapperStatsCard key={wrapper.name} wrapper={wrapper} isDefault={sysConfig?.active_wrapper === wrapper.name} onSetDefault={() => handleSetDefault(wrapper.name)} />
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
