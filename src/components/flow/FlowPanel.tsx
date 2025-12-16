"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, StreamEvent } from '@/lib/api';

const STAGE_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  '1_INCOMING': { color: '#00d4ff', icon: '📥', label: 'INCOMING' },
  '2_WRAPPERS_LOADED': { color: '#10b981', icon: '📦', label: 'WRAPPERS' },
  '3_FIELD_CALIBRATED': { color: '#f59e0b', icon: '⚡', label: 'CALIBRATED' },
  '4_BACKEND_FORWARD': { color: '#d946ef', icon: '🚀', label: 'BACKEND' },
  '5_RESPONSE': { color: '#10b981', icon: '✅', label: 'RESPONSE' },
};

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
          padding: '14px 18px',
          background: `${color}15`,
          border: `1px solid ${color}40`,
          borderRadius: open ? '12px 12px 0 0' : 12,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, color, fontWeight: 700, letterSpacing: 1 }}>
          {title}
        </span>
        <span style={{ 
          color: 'rgba(255,255,255,0.4)', 
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          fontSize: 12,
        }}>
          ▼
        </span>
      </div>
      {open && (
        <div style={{
          padding: 20,
          background: 'rgba(0,0,0,0.3)',
          border: `1px solid ${color}20`,
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function RequestCard({ requestId, isSelected, onClick }: { 
  requestId: string; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '14px 16px',
        background: isSelected ? 'rgba(0,212,255,0.15)' : 'rgba(0,0,0,0.3)',
        border: isSelected ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.05)',
        borderRadius: 10,
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isSelected ? '0 0 20px rgba(0,212,255,0.2)' : 'none',
      }}
    >
      <div style={{ fontFamily: 'monospace', fontSize: 12, color: isSelected ? '#00d4ff' : 'rgba(255,255,255,0.7)' }}>
        {requestId.slice(0, 8)}...{requestId.slice(-4)}
      </div>
    </div>
  );
}

export default function FlowPanel() {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getStream(50);
      setEvents(data.events || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Get unique request IDs
  const requestIds = [...new Set(events.map(e => e.request_id))];

  // Load detail when request selected
  useEffect(() => {
    if (!selectedRequest) {
      setDetail(null);
      return;
    }
    setDetailLoading(true);
    api.getHistory(selectedRequest)
      .then(setDetail)
      .catch(console.error)
      .finally(() => setDetailLoading(false));
  }, [selectedRequest]);

  const stages = detail?.stages || [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, minHeight: 600 }}>
      {/* Left: Request List */}
      <GlassCard style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
            🌊 REQUESTS
          </h2>
          <button onClick={fetchEvents} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.4)', padding: '4px 10px', borderRadius: 6,
            cursor: 'pointer', fontFamily: 'monospace', fontSize: 10,
          }}>↻</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.4)' }}>Loading...</div>
        ) : requestIds.length > 0 ? (
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {requestIds.map(id => (
              <RequestCard
                key={id}
                requestId={id}
                isSelected={selectedRequest === id}
                onClick={() => setSelectedRequest(id)}
              />
            ))}
          </div>
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', padding: 20 }}>
            Keine Requests
          </div>
        )}
      </GlassCard>

      {/* Right: Detail View */}
      <GlassCard style={{ padding: 24 }} glowColor="#d946ef">
        {!selectedRequest ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: 'rgba(255,255,255,0.3)',
          }}>
            <span style={{ fontSize: 48, marginBottom: 16 }}>🌊</span>
            <span style={{ fontFamily: 'monospace', fontSize: 13 }}>Wähle einen Request</span>
          </div>
        ) : detailLoading ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>Loading...</div>
        ) : detail ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontFamily: 'monospace', color: '#00d4ff', fontSize: 14 }}>
                FIELD FLOW DETAIL
              </h2>
              <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                {selectedRequest}
              </div>
            </div>

            {/* Pipeline Visualization */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 24,
              padding: 20,
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 12,
            }}>
              {Object.entries(STAGE_CONFIG).map(([stage, config], i) => {
                const hasStage = stages.some((s: any) => s.stage === stage);
                return (
                  <React.Fragment key={stage}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      opacity: hasStage ? 1 : 0.3,
                    }}>
                      <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: hasStage ? `${config.color}20` : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${hasStage ? config.color : 'rgba(255,255,255,0.1)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        boxShadow: hasStage ? `0 0 25px ${config.color}50` : 'none',
                        transition: 'all 0.3s ease',
                      }}>
                        {config.icon}
                      </div>
                      <span style={{ 
                        fontSize: 9, 
                        fontFamily: 'monospace', 
                        color: hasStage ? config.color : 'rgba(255,255,255,0.3)',
                        fontWeight: 700,
                      }}>
                        {config.label}
                      </span>
                    </div>
                    {i < 4 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'rgba(255,255,255,0.2)',
                        fontSize: 24,
                        marginTop: -20,
                      }}>
                        →
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Latency Banner */}
            {stages.find((s: any) => s.latency_ms) && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 24,
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))',
                  border: '1px solid rgba(245,158,11,0.4)',
                  borderRadius: 14,
                  padding: '16px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  boxShadow: '0 0 30px rgba(245,158,11,0.15)',
                }}>
                  <span style={{ fontSize: 28 }}>⚡</span>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', letterSpacing: 1 }}>TOTAL LATENCY</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>
                      {(stages.find((s: any) => s.latency_ms)?.latency_ms / 1000).toFixed(2)}s
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage Sections */}
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
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
                    <div style={{ marginBottom: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                      ⏱ {new Date(stage.timestamp).toLocaleString('de-DE')}
                    </div>

                    {stage.stage === '1_INCOMING' && (
                      <>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>PROMPT:</div>
                        <CodeBlock content={stage.prompt || 'N/A'} maxHeight={100} />
                        <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                          Mode: <span style={{ color: '#00d4ff' }}>{stage.mode}</span>
                        </div>
                      </>
                    )}

                    {stage.stage === '2_WRAPPERS_LOADED' && (
                      <>
                        <div style={{ marginBottom: 12, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                          CHAIN: <span style={{ color: '#10b981', fontWeight: 600 }}>{stage.chain?.join(' → ')}</span>
                        </div>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>WRAPPER TEXT:</div>
                        <CodeBlock content={stage.wrapper_text || 'N/A'} maxHeight={300} />
                      </>
                    )}

                    {stage.stage === '3_FIELD_CALIBRATED' && (
                      <>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>CALIBRATED FIELD:</div>
                        <CodeBlock content={stage.calibrated_field || 'N/A'} maxHeight={350} />
                      </>
                    )}

                    {stage.stage === '4_BACKEND_FORWARD' && (
                      <>
                        <div style={{ marginBottom: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                          URL: <span style={{ color: '#d946ef' }}>{stage.backend_url}</span>
                        </div>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>PARAMS:</div>
                        <CodeBlock content={JSON.stringify(stage.params, null, 2)} maxHeight={150} />
                      </>
                    )}

                    {stage.stage === '5_RESPONSE' && (
                      <>
                        <div style={{ marginBottom: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>RESPONSE:</div>
                        <CodeBlock content={stage.response || 'N/A'} maxHeight={200} />
                        <div style={{ marginTop: 12, display: 'flex', gap: 24 }}>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                            Latency: <span style={{ color: '#f59e0b', fontWeight: 700 }}>{stage.latency_ms}ms</span>
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
            </div>
          </>
        ) : null}
      </GlassCard>
    </div>
  );
}
