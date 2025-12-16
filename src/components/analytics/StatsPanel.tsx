"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, StatsResponse, StreamEvent, TrainingEntry } from '@/lib/api';

function GlassCard({ children, style = {}, glowColor = '#00d4ff' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9) 0%, rgba(6,13,24,0.95) 100%)',
      backdropFilter: 'blur(20px)',
      border: `1px solid rgba(255,255,255,0.08)`,
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${glowColor}50, transparent)`,
      }} />
      {children}
    </div>
  );
}

function MetricBox({ label, value, unit, color = '#00d4ff' }: {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}) {
  return (
    <div style={{
      padding: 20,
      background: 'rgba(0,0,0,0.3)',
      borderRadius: 12,
      border: `1px solid ${color}20`,
      textAlign: 'center',
      minWidth: 140,
    }}>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: 1, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color, fontFamily: 'monospace' }}>
        {value}
        {unit && <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );
}

function WrapperUsageBar({ name, count, total }: { name: string; count: number; total: number }) {
  const percent = total > 0 ? (count / total) * 100 : 0;
  const displayName = name.replace('syntex_wrapper_', '').toUpperCase();
  
  let color = '#00d4ff';
  if (name.includes('human')) color = '#10b981';
  else if (name.includes('sigma')) color = '#f59e0b';
  else if (name.includes('deepsweep')) color = '#d946ef';
  
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{displayName}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 12, color }}>{count} ({percent.toFixed(0)}%)</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: `linear-gradient(90deg, ${color}, ${color}80)`, borderRadius: 3 }} />
      </div>
    </div>
  );
}

function StreamEventRow({ event, onClick }: { event: StreamEvent; onClick: () => void }) {
  const stageColors: Record<string, string> = {
    '1_INCOMING': '#00d4ff',
    '2_WRAPPERS_LOADED': '#10b981',
    '3_FIELD_CALIBRATED': '#f59e0b',
    '4_BACKEND_FORWARD': '#d946ef',
    '5_RESPONSE': '#10b981',
  };
  const color = stageColors[event.stage] || '#00d4ff';
  const time = new Date(event.timestamp).toLocaleTimeString('de-DE');
  
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
      background: 'rgba(0,0,0,0.2)', borderRadius: 8, marginBottom: 6, borderLeft: `3px solid ${color}`,
      cursor: 'pointer', transition: 'all 0.2s ease',
    }}
    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
    >
      <span style={{ fontSize: 10, fontFamily: 'monospace', color, minWidth: 100 }}>{event.stage}</span>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{time}</span>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', flex: 1 }}>
        {event.request_id?.slice(0, 8)}...
      </span>
      {event.latency_ms && <span style={{ fontSize: 11, color: '#f59e0b', fontFamily: 'monospace' }}>{event.latency_ms}ms</span>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TRAINING ROW - NEU!
// ═══════════════════════════════════════════════════════════════
function TrainingRow({ entry, onClick }: { entry: TrainingEntry; onClick: () => void }) {
  const getWrapperColor = (chain: string[]) => {
    const name = chain[0] || '';
    if (name.includes('human')) return '#10b981';
    if (name.includes('sigma')) return '#f59e0b';
    if (name.includes('deepsweep')) return '#d946ef';
    if (name.includes('true_raw')) return '#ef4444';
    return '#00d4ff';
  };
  
  const color = getWrapperColor(entry.wrapper_chain);
  const time = new Date(entry.timestamp).toLocaleString('de-DE');
  
  return (
    <div 
      onClick={onClick}
      style={{
        padding: 16,
        background: 'rgba(0,0,0,0.2)',
        borderRadius: 12,
        marginBottom: 8,
        border: `1px solid ${entry.success ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <span style={{
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 9,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: color,
          background: `${color}15`,
          border: `1px solid ${color}30`,
        }}>
          {entry.wrapper_chain[0]?.replace('syntex_wrapper_', '').toUpperCase() || 'DEFAULT'}
        </span>
        <span style={{
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 9,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: entry.success ? '#10b981' : '#ef4444',
          background: entry.success ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
        }}>
          {entry.success ? '✓ SUCCESS' : '✕ FAILED'}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
          {time}
        </span>
      </div>

      {/* Prompt Preview */}
      <div style={{
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 8,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        💬 {entry.prompt}
      </div>

      {/* Response Preview */}
      <div style={{
        fontSize: 11,
        color: 'rgba(255,255,255,0.4)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingLeft: 20,
      }}>
        → {entry.response?.slice(0, 100)}...
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
        <span style={{ fontSize: 10, color: '#f59e0b', fontFamily: 'monospace' }}>
          ⚡ {(entry.latency_ms / 1000).toFixed(1)}s
        </span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
          ID: {entry.request_id.slice(0, 8)}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TRAINING DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
function TrainingDetailModal({ entry, onClose }: { entry: TrainingEntry; onClose: () => void }) {
  const getWrapperColor = (chain: string[]) => {
    const name = chain[0] || '';
    if (name.includes('human')) return '#10b981';
    if (name.includes('sigma')) return '#f59e0b';
    if (name.includes('deepsweep')) return '#d946ef';
    return '#00d4ff';
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 800,
        maxHeight: '85vh',
        background: 'linear-gradient(135deg, #0a1a2e, #050b14)',
        borderRadius: 20,
        border: '1px solid rgba(0,212,255,0.3)',
        boxShadow: '0 0 60px rgba(0,212,255,0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>📚</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: '#00d4ff' }}>TRAINING ENTRY</h2>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>
                {entry.request_id}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            padding: '8px 16px',
            color: 'white',
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}>
            ✕ CLOSE
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {/* Meta Info */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{
              padding: '12px 16px',
              background: `${getWrapperColor(entry.wrapper_chain)}15`,
              border: `1px solid ${getWrapperColor(entry.wrapper_chain)}30`,
              borderRadius: 10,
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>WRAPPER</div>
              <div style={{ fontFamily: 'monospace', color: getWrapperColor(entry.wrapper_chain), fontWeight: 600 }}>
                {entry.wrapper_chain.join(' → ')}
              </div>
            </div>
            <div style={{
              padding: '12px 16px',
              background: entry.success ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              border: `1px solid ${entry.success ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
              borderRadius: 10,
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>STATUS</div>
              <div style={{ fontFamily: 'monospace', color: entry.success ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {entry.success ? '✓ SUCCESS' : '✕ FAILED'}
              </div>
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 10,
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>LATENCY</div>
              <div style={{ fontFamily: 'monospace', color: '#f59e0b', fontWeight: 600 }}>
                {(entry.latency_ms / 1000).toFixed(2)}s
              </div>
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: 10,
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>TIMESTAMP</div>
              <div style={{ fontFamily: 'monospace', color: '#00d4ff', fontWeight: 600, fontSize: 12 }}>
                {new Date(entry.timestamp).toLocaleString('de-DE')}
              </div>
            </div>
          </div>

          {/* Prompt */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', marginBottom: 8, letterSpacing: 1 }}>
              💬 PROMPT
            </div>
            <div style={{
              padding: 16,
              background: 'rgba(0,212,255,0.05)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 10,
              fontFamily: 'system-ui',
              fontSize: 14,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
            }}>
              {entry.prompt}
            </div>
          </div>

          {/* Response */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', marginBottom: 8, letterSpacing: 1 }}>
              🤖 RESPONSE
            </div>
            <div style={{
              padding: 16,
              background: 'rgba(217,70,239,0.05)',
              border: '1px solid rgba(217,70,239,0.2)',
              borderRadius: 10,
              fontFamily: 'system-ui',
              fontSize: 14,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              maxHeight: 300,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}>
              {entry.response}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// FLOW DETAIL MODAL  
// ═══════════════════════════════════════════════════════════════
function FlowDetailModal({ requestId, onClose }: { requestId: string; onClose: () => void }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHistory(requestId).then(setDetail).catch(console.error).finally(() => setLoading(false));
  }, [requestId]);

  const STAGE_CONFIG: Record<string, { color: string; icon: string }> = {
    '1_INCOMING': { color: '#00d4ff', icon: '📥' },
    '2_WRAPPERS_LOADED': { color: '#10b981', icon: '📦' },
    '3_FIELD_CALIBRATED': { color: '#f59e0b', icon: '⚡' },
    '4_BACKEND_FORWARD': { color: '#d946ef', icon: '🚀' },
    '5_RESPONSE': { color: '#10b981', icon: '✅' },
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 900, maxHeight: '90vh', background: 'linear-gradient(135deg, #0a1a2e, #050b14)', borderRadius: 20, border: '1px solid rgba(0,212,255,0.3)', boxShadow: '0 0 60px rgba(0,212,255,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🌊</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: '#00d4ff' }}>FIELD FLOW DETAIL</h2>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>{requestId}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'white', cursor: 'pointer', fontFamily: 'monospace' }}>✕ CLOSE</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : detail?.stages?.map((stage: any) => {
            const config = STAGE_CONFIG[stage.stage] || { color: '#00d4ff', icon: '●' };
            return (
              <div key={stage.stage} style={{ marginBottom: 16, padding: 16, background: `${config.color}10`, border: `1px solid ${config.color}30`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{config.icon}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: config.color, fontWeight: 700 }}>{stage.stage}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{new Date(stage.timestamp).toLocaleString('de-DE')}</span>
                </div>
                {stage.prompt && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}><strong>Prompt:</strong> {stage.prompt}</div>}
                {stage.wrapper_text && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 11, color: 'rgba(255,255,255,0.7)', maxHeight: 150, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{stage.wrapper_text}</div>}
                {stage.calibrated_field && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 11, color: 'rgba(255,255,255,0.7)', maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{stage.calibrated_field}</div>}
                {stage.backend_url && <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 8 }}><strong>Backend:</strong> <span style={{ color: "#d946ef" }}>{stage.backend_url}</span></div>}
                {stage.params && <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8, fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}><strong>Params:</strong> <pre style={{ margin: "8px 0 0", color: "#00d4ff" }}>{JSON.stringify(stage.params, null, 2)}</pre></div>}
                {stage.response && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.8)', maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{stage.response}</div>}
                {stage.latency_ms && <div style={{ marginTop: 8, fontSize: 11, color: '#f59e0b' }}>⚡ {(stage.latency_ms/1000).toFixed(2)}s</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function StatsPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [training, setTraining] = useState<TrainingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'stream' | 'training'>('stream');
  const [selectedTraining, setSelectedTraining] = useState<TrainingEntry | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, streamData, trainingData] = await Promise.all([
        api.getStats(),
        api.getStream(20),
        api.getTraining(20),
      ]);
      setStats(statsData);
      setEvents(streamData.events || []);
      setTraining(trainingData.entries || []);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const wrapperUsageTotal = stats ? Object.values(stats.wrapper_usage).reduce((a, b) => a + b, 0) : 0;

  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 14, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>📊 ANALYTICS</h2>
        <button onClick={fetchData} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontFamily: 'monospace', fontSize: 11 }}>↻ Refresh</button>
      </div>

      {error && <div style={{ padding: 12, borderRadius: 8, marginBottom: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 13 }}>Error: {error}</div>}

      {loading && !stats ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.4)' }}>Loading...</div>
      ) : stats && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 24 }}>
            <MetricBox label="TOTAL REQUESTS" value={stats.total_requests} color="#00d4ff" />
            <MetricBox label="SUCCESS RATE" value={stats.success_rate} unit="%" color={stats.success_rate >= 90 ? '#10b981' : stats.success_rate >= 70 ? '#f59e0b' : '#ef4444'} />
            <MetricBox label="AVG LATENCY" value={(stats.average_latency_ms / 1000).toFixed(1)} unit="s" color="#f59e0b" />
            <MetricBox label="MEDIAN" value={(stats.median_latency_ms / 1000).toFixed(1)} unit="s" color="#d946ef" />
            <MetricBox label="MIN" value={(stats.min_latency_ms / 1000).toFixed(1)} unit="s" color="#10b981" />
            <MetricBox label="MAX" value={(stats.max_latency_ms / 1000).toFixed(1)} unit="s" color="#ef4444" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <h3 style={{ margin: '0 0 16px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>WRAPPER USAGE</h3>
              {Object.keys(stats.wrapper_usage).length > 0 ? (
                Object.entries(stats.wrapper_usage).map(([name, count]) => (
                  <WrapperUsageBar key={name} name={name} count={count} total={wrapperUsageTotal} />
                ))
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Noch keine Daten</div>
              )}
            </div>
            <div>
              <h3 style={{ margin: '0 0 16px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>LETZTE 24H</h3>
              <div style={{ display: 'flex', gap: 16 }}>
                <MetricBox label="REQUESTS" value={stats.recent_24h.requests} color="#00d4ff" />
                <MetricBox label="AVG LATENCY" value={(stats.recent_24h.average_latency_ms / 1000).toFixed(1)} unit="s" color="#f59e0b" />
              </div>
            </div>
          </div>

          {/* Section Toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { id: 'stream', label: '🌊 FIELD FLOW', count: events.length },
              { id: 'training', label: '📚 TRAINING DATA', count: training.length },
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: activeSection === section.id ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  background: activeSection === section.id ? 'rgba(0,212,255,0.1)' : 'transparent',
                  color: activeSection === section.id ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'monospace',
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {section.label} <span style={{ opacity: 0.5 }}>({section.count})</span>
              </button>
            ))}
          </div>

          {/* Stream Section */}
          {activeSection === 'stream' && (
            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              {events.length > 0 ? (
                events.map((event, i) => (
                  <StreamEventRow key={`${event.request_id}-${event.stage}-${i}`} event={event} onClick={() => setSelectedRequest(event.request_id)} />
                ))
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center', padding: 20 }}>Noch keine Events</div>
              )}
            </div>
          )}

          {/* Training Section */}
          {activeSection === 'training' && (
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {training.length > 0 ? (
                training.map(entry => (
                  <TrainingRow 
                    key={entry.request_id} 
                    entry={entry} 
                    onClick={() => setSelectedTraining(entry)} 
                  />
                ))
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center', padding: 20 }}>Noch keine Training Daten</div>
              )}
            </div>
          )}
        </>
      )}

      {/* Training Detail Modal */}
      {selectedTraining && (
        <TrainingDetailModal entry={selectedTraining} onClose={() => setSelectedTraining(null)} />
      )}

      {/* Flow Detail Modal */}
      {selectedRequest && (
        <FlowDetailModal requestId={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </GlassCard>
  );
}

