"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, StatsResponse, StreamEvent } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════
function GlassCard({ children, style = {}, glowColor = '#00d4ff' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}) {
  const [hover, setHover] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.9) 0%, rgba(6,13,24,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hover ? glowColor + '40' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hover ? `0 0 40px ${glowColor}20` : 'none',
        transition: 'all 0.4s ease',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${glowColor}50, transparent)`,
      }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// METRIC BOX
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// WRAPPER USAGE BAR
// ═══════════════════════════════════════════════════════════════
function WrapperUsageBar({ name, count, total }: { name: string; count: number; total: number }) {
  const percent = total > 0 ? (count / total) * 100 : 0;
  const displayName = name.replace('syntex_wrapper_', '').replace(' (fallback)', '').toUpperCase();
  
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
        <div style={{ width: `${percent}%`, height: '100%', background: `linear-gradient(90deg, ${color}, ${color}80)`, borderRadius: 3, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STAGE CONFIG
// ═══════════════════════════════════════════════════════════════
const STAGE_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  '1_INCOMING': { color: '#00d4ff', icon: '📥', label: 'INCOMING' },
  '2_WRAPPERS_LOADED': { color: '#10b981', icon: '📦', label: 'WRAPPERS' },
  '3_FIELD_CALIBRATED': { color: '#f59e0b', icon: '⚡', label: 'CALIBRATED' },
  '4_BACKEND_FORWARD': { color: '#d946ef', icon: '🚀', label: 'BACKEND' },
  '5_RESPONSE': { color: '#10b981', icon: '✅', label: 'RESPONSE' },
};

// ═══════════════════════════════════════════════════════════════
// STREAM EVENT ROW
// ═══════════════════════════════════════════════════════════════
function StreamEventRow({ event, onClick }: { event: StreamEvent; onClick: () => void }) {
  const config = STAGE_CONFIG[event.stage] || { color: '#00d4ff', icon: '●', label: event.stage };
  const time = new Date(event.timestamp).toLocaleTimeString('de-DE');
  
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
        background: 'rgba(0,0,0,0.2)', borderRadius: 10, marginBottom: 6, 
        borderLeft: `3px solid ${config.color}`,
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
      <span style={{ fontSize: 16 }}>{config.icon}</span>
      <span style={{ fontSize: 11, fontFamily: 'monospace', color: config.color, minWidth: 100, fontWeight: 600 }}>
        {config.label}
      </span>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{time}</span>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', flex: 1 }}>
        {event.request_id?.slice(0, 8)}...
      </span>
      {event.latency_ms && (
        <span style={{ 
          fontSize: 11, color: '#f59e0b', fontFamily: 'monospace',
          background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: 4,
        }}>
          {(event.latency_ms / 1000).toFixed(1)}s
        </span>
      )}
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>→</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CODE BLOCK
// ═══════════════════════════════════════════════════════════════
function CodeBlock({ content, maxHeight = 200 }: { content: string; maxHeight?: number }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.5)',
      borderRadius: 8,
      padding: 16,
      maxHeight,
      overflow: 'auto',
      fontFamily: 'monospace',
      fontSize: 12,
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.8)',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      {content}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXPANDABLE SECTION
// ═══════════════════════════════════════════════════════════════
function ExpandableSection({ title, icon, color, children, defaultOpen = false }: {
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          background: `${color}10`,
          border: `1px solid ${color}30`,
          borderRadius: open ? '10px 10px 0 0' : 10,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 12, color, fontWeight: 600, letterSpacing: 1 }}>
          {title}
        </span>
        <span style={{ 
          color: 'rgba(255,255,255,0.4)', 
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}>
          ▼
        </span>
      </div>
      {open && (
        <div style={{
          padding: 16,
          background: 'rgba(0,0,0,0.2)',
          border: `1px solid ${color}20`,
          borderTop: 'none',
          borderRadius: '0 0 10px 10px',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLOW DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
function FlowDetailModal({ requestId, onClose }: { requestId: string; onClose: () => void }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHistory(requestId)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [requestId]);

  const stages = data?.stages || [];

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
        maxWidth: 900,
        maxHeight: '90vh',
        background: 'linear-gradient(135deg, #0a1a2e 0%, #050b14 100%)',
        borderRadius: 20,
        border: '1px solid rgba(0,212,255,0.3)',
        boxShadow: '0 0 80px rgba(0,212,255,0.2), 0 0 160px rgba(0,212,255,0.1)',
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
          background: 'rgba(0,212,255,0.05)',
        }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', color: '#00d4ff', fontSize: 16 }}>
              🌊 FIELD FLOW DETAIL
            </h2>
            <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              REQUEST: {requestId}
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              padding: '8px 16px',
              color: 'white',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: 12,
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Pipeline Visualization */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          flexWrap: 'wrap',
        }}>
          {Object.entries(STAGE_CONFIG).map(([stage, config], i) => {
            const hasStage = stages.some((s: any) => s.stage === stage);
            return (
              <React.Fragment key={stage}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  opacity: hasStage ? 1 : 0.3,
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: hasStage ? `${config.color}20` : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${hasStage ? config.color : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    boxShadow: hasStage ? `0 0 20px ${config.color}40` : 'none',
                  }}>
                    {config.icon}
                  </div>
                  <span style={{ 
                    fontSize: 9, 
                    fontFamily: 'monospace', 
                    color: hasStage ? config.color : 'rgba(255,255,255,0.3)',
                    fontWeight: 600,
                  }}>
                    {config.label}
                  </span>
                </div>
                {i < 4 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(255,255,255,0.2)',
                    fontSize: 20,
                    marginTop: -15,
                  }}>
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>
              Loading...
            </div>
          ) : (
            <>
              {/* Latency Banner */}
              {stages.find((s: any) => s.latency_ms) && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.1))',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: 12,
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                    <span style={{ fontSize: 20 }}>⚡</span>
                    <div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>TOTAL LATENCY</div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>
                        {(stages.find((s: any) => s.latency_ms)?.latency_ms / 1000).toFixed(2)}s
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage Sections */}
              {stages.map((stage: any) => {
                const config = STAGE_CONFIG[stage.stage] || { color: '#00d4ff', icon: '●', label: stage.stage };
                
                return (
                  <ExpandableSection
                    key={stage.stage}
                    title={config.label}
                    icon={config.icon}
                    color={config.color}
                    defaultOpen={stage.stage === '1_INCOMING' || stage.stage === '5_RESPONSE'}
                  >
                    {/* Timestamp */}
                    <div style={{ marginBottom: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                      ⏱ {new Date(stage.timestamp).toLocaleString('de-DE')}
                    </div>

                    {/* Stage-specific content */}
                    {stage.stage === '1_INCOMING' && (
                      <>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>PROMPT:</div>
                        <CodeBlock content={stage.prompt || 'N/A'} maxHeight={100} />
                        <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                            Mode: <span style={{ color: '#00d4ff' }}>{stage.mode}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {stage.stage === '2_WRAPPERS_LOADED' && (
                      <>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                          WRAPPER CHAIN: <span style={{ color: '#10b981' }}>{stage.chain?.join(' → ')}</span>
                        </div>
                        <div style={{ marginTop: 12, marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>WRAPPER TEXT:</div>
                        <CodeBlock content={stage.wrapper_text || 'N/A'} maxHeight={250} />
                      </>
                    )}

                    {stage.stage === '3_FIELD_CALIBRATED' && (
                      <>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>CALIBRATED FIELD (Wrapper + Prompt):</div>
                        <CodeBlock content={stage.calibrated_field || 'N/A'} maxHeight={300} />
                      </>
                    )}

                    {stage.stage === '4_BACKEND_FORWARD' && (
                      <>
                        <div style={{ marginBottom: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                          Backend: <span style={{ color: '#d946ef' }}>{stage.backend_url}</span>
                        </div>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>PARAMS:</div>
                        <CodeBlock content={JSON.stringify(stage.params, null, 2)} maxHeight={150} />
                      </>
                    )}

                    {stage.stage === '5_RESPONSE' && (
                      <>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>RESPONSE:</div>
                        <CodeBlock content={stage.response || 'N/A'} maxHeight={200} />
                        <div style={{ marginTop: 12, display: 'flex', gap: 20 }}>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                            Latency: <span style={{ color: '#f59e0b', fontWeight: 600 }}>{stage.latency_ms}ms</span>
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                            Wrappers: <span style={{ color: '#10b981' }}>{stage.wrapper_chain?.join(', ')}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </ExpandableSection>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function StatsPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, streamData] = await Promise.all([
        api.getStats(),
        api.getStream(20),
      ]);
      setStats(statsData);
      setEvents(streamData.events || []);
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
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

          <div style={{ marginTop: 24 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
              🌊 FIELD FLOW STREAM 
              <span style={{ marginLeft: 8, fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Klicken für Details</span>
            </h3>
            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              {events.length > 0 ? (
                events.map((event, i) => (
                  <StreamEventRow 
                    key={`${event.request_id}-${event.stage}-${i}`} 
                    event={event} 
                    onClick={() => setSelectedRequest(event.request_id)}
                  />
                ))
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center', padding: 20 }}>Noch keine Events</div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selectedRequest && (
        <FlowDetailModal 
          requestId={selectedRequest} 
          onClose={() => setSelectedRequest(null)} 
        />
      )}
    </GlassCard>
  );
}
