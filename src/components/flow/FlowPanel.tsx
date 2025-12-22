"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 SYNTX COLORS & CONFIG
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef', 
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  yellow: '#eab308'
};

const STAGE_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  '1_INCOMING': { color: COLORS.cyan, icon: '📥', label: 'INCOMING' },
  '2_WRAPPERS_LOADED': { color: COLORS.purple, icon: '📦', label: 'WRAPPERS' },
  '3_FIELD_CALIBRATED': { color: COLORS.orange, icon: '⚡', label: 'CALIBRATED' },
  '4_BACKEND_FORWARD': { color: COLORS.magenta, icon: '🚀', label: 'BACKEND' },
  '5_RESPONSE': { color: COLORS.green, icon: '✅', label: 'RESPONSE' },
};

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface Session {
  request_id: string;
  timestamp: string;
  stages: string[];
  prompt: string;
  wrapper: string;
  format: string | null;
  latency_ms: number;
}

interface SessionDetail {
  status: string;
  request_id: string;
  summary: {
    prompt: string;
    wrapper: string;
    format: string | null;
    response_preview: string;
    latency_ms: number;
    timestamp: string;
  };
  field_flow: Array<{
    stage: string;
    timestamp: string;
    request_id: string;
    prompt?: string;
    chain?: string[];
    total_length?: number;
    backend_url?: string;
    model?: string;
    response?: string;
    latency_ms?: number;
  }>;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔮 STAGE TIMELINE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function StageTimeline({ stages, activeStage, onStageClick }: { 
  stages: SessionDetail['field_flow']; 
  activeStage: number;
  onStageClick: (idx: number) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '24px 0' }}>
      {stages.map((stage, idx) => {
        const config = STAGE_CONFIG[stage.stage] || { color: COLORS.cyan, icon: '●', label: stage.stage };
        const isActive = idx === activeStage;
        const isPast = idx < activeStage;
        
        return (
          <React.Fragment key={stage.stage}>
            {/* Stage Node */}
            <div 
              onClick={() => onStageClick(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <div style={{
                width: isActive ? 64 : 48,
                height: isActive ? 64 : 48,
                borderRadius: '50%',
                background: isActive 
                  ? `linear-gradient(135deg, ${config.color}, ${config.color}88)`
                  : isPast 
                    ? `${config.color}40`
                    : 'rgba(255,255,255,0.1)',
                border: `3px solid ${isActive ? config.color : isPast ? config.color + '60' : 'rgba(255,255,255,0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isActive ? 28 : 20,
                boxShadow: isActive ? `0 0 30px ${config.color}60, 0 0 60px ${config.color}30` : 'none',
                transition: 'all 0.3s ease',
              }}>
                {config.icon}
              </div>
              <div style={{
                fontSize: 18,
                fontFamily: 'monospace',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? config.color : 'rgba(255,255,255,0.5)',
                letterSpacing: 1,
              }}>
                {config.label}
              </div>
            </div>
            
            {/* Connector Line */}
            {idx < stages.length - 1 && (
              <div style={{
                flex: 1,
                height: 4,
                background: isPast 
                  ? `linear-gradient(90deg, ${config.color}, ${STAGE_CONFIG[stages[idx + 1]?.stage]?.color || COLORS.cyan})`
                  : 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                margin: '0 8px',
                marginBottom: 24,
                boxShadow: isPast ? `0 0 10px ${config.color}40` : 'none',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📼 SESSION DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════════

function SessionDetailModal({ sessionId, onClose, onReplay }: { 
  sessionId: string; 
  onClose: () => void;
  onReplay: (params: any) => void;
}) {
  const [detail, setDetail] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState(0);
  const [replay, setReplay] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      api.getSession(sessionId),
      api.getSessionReplay(sessionId)
    ]).then(([detailData, replayData]) => {
      setDetail(detailData as SessionDetail);
      setReplay(replayData);
    }).catch(console.error).finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, animation: 'pulse 1s infinite' }}>🌊</div>
          <div style={{ fontFamily: 'monospace', color: COLORS.cyan, marginTop: 16 }}>LADE FIELD FLOW...</div>
        </div>
      </div>
    );
  }

  if (!detail) return null;

  const currentStage = detail.field_flow[activeStage];
  const stageConfig = STAGE_CONFIG[currentStage?.stage] || { color: COLORS.cyan, icon: '●', label: 'UNKNOWN' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 2000, overflow: 'auto' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 32 }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ 
              width: 72, height: 72, borderRadius: 20, 
              background: `linear-gradient(135deg, ${COLORS.cyan}30, ${COLORS.magenta}30)`,
              border: `2px solid ${COLORS.cyan}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 42,
              boxShadow: `0 0 40px ${COLORS.cyan}30`
            }}>🌊</div>
            <div>
              <h1 style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, fontWeight: 900, letterSpacing: 4, background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.magenta})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                FIELD FLOW ANALYSE
              </h1>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: 4 }}>
                {sessionId.slice(0, 8)}...{sessionId.slice(-8)}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={() => onReplay(replay?.replay_params)}
              style={{ 
                padding: '14px 28px', borderRadius: 12, 
                border: `2px solid ${COLORS.green}`,
                background: `linear-gradient(135deg, ${COLORS.green}30, ${COLORS.green}10)`,
                color: COLORS.green, fontFamily: 'monospace', fontSize: 15, fontWeight: 800,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: `0 0 20px ${COLORS.green}30`
              }}
            >
              <span style={{ fontSize: 18 }}>🔄</span> REPLAY
            </button>
            <button 
              onClick={onClose}
              style={{ 
                padding: '14px 28px', borderRadius: 12, 
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 15,
                cursor: 'pointer'
              }}
            >
              ✕ SCHLIESSEN
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.purple}20, ${COLORS.purple}05)`, border: `1px solid ${COLORS.purple}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>WRAPPER</div>
            <div style={{ fontSize: 18, color: COLORS.purple, fontFamily: 'monospace', fontWeight: 800 }}>{detail.summary.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'NONE'}</div>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.magenta}20, ${COLORS.magenta}05)`, border: `1px solid ${COLORS.magenta}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>FORMAT</div>
            <div style={{ fontSize: 18, color: COLORS.magenta, fontFamily: 'monospace', fontWeight: 800 }}>{detail.summary.format?.toUpperCase() || 'KEIN FORMAT'}</div>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.orange}20, ${COLORS.orange}05)`, border: `1px solid ${COLORS.orange}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>LATENCY</div>
            <div style={{ fontSize: 18, color: COLORS.orange, fontFamily: 'monospace', fontWeight: 800 }}>{(detail.summary.latency_ms / 1000).toFixed(2)}s</div>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.cyan}20, ${COLORS.cyan}05)`, border: `1px solid ${COLORS.cyan}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>TIMESTAMP</div>
            <div style={{ fontSize: 18, color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 800 }}>{new Date(detail.summary.timestamp).toLocaleString('de-DE')}</div>
          </div>
        </div>

        {/* STAGE TIMELINE */}
        <div style={{ 
          padding: 32, borderRadius: 20, 
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: 32
        }}>
          <div style={{ fontSize: 18, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 16, letterSpacing: 2 }}>
            🌊 FIELD FLOW TIMELINE
          </div>
          <StageTimeline stages={detail.field_flow} activeStage={activeStage} onStageClick={setActiveStage} />
        </div>

        {/* STAGE DETAIL */}
        <div style={{ 
          padding: 32, borderRadius: 20, 
          background: `linear-gradient(135deg, ${stageConfig.color}15, ${stageConfig.color}05)`,
          border: `2px solid ${stageConfig.color}40`,
          boxShadow: `0 0 40px ${stageConfig.color}20`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: 16,
              background: `${stageConfig.color}30`,
              border: `2px solid ${stageConfig.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28
            }}>
              {stageConfig.icon}
            </div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, color: stageConfig.color, fontWeight: 800, letterSpacing: 2 }}>
                {currentStage?.stage}
              </h2>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                {new Date(currentStage?.timestamp).toLocaleString('de-DE')}
              </div>
            </div>
          </div>

          {/* Stage Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {currentStage?.prompt && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>📥 PROMPT</div>
                <pre style={{ 
                  margin: 0, padding: 20, borderRadius: 12,
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: 18, color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  maxHeight: 300, overflow: 'auto'
                }}>
                  {currentStage.prompt.slice(0, 2000)}{currentStage.prompt.length > 2000 ? '...' : ''}
                </pre>
              </div>
            )}
            {currentStage?.chain && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>📦 WRAPPER CHAIN</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {currentStage.chain.map((w, i) => (
                    <div key={i} style={{ padding: '8px 16px', borderRadius: 8, background: `${COLORS.purple}30`, border: `1px solid ${COLORS.purple}50`, fontSize: 18, color: COLORS.purple, fontFamily: 'monospace' }}>
                      {w.replace('syntex_wrapper_', '')}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentStage?.total_length && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>⚡ CALIBRATED LENGTH</div>
                <div style={{ fontSize: 32, color: COLORS.orange, fontFamily: 'monospace', fontWeight: 900 }}>
                  {currentStage.total_length.toLocaleString()} chars
                </div>
              </div>
            )}
            {currentStage?.backend_url && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>🚀 BACKEND</div>
                <div style={{ padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 18, color: COLORS.magenta, fontFamily: 'monospace' }}>{currentStage.backend_url}</div>
                  <div style={{ fontSize: 18, color: COLORS.cyan, fontFamily: 'monospace', marginTop: 8, fontWeight: 800 }}>Model: {currentStage.model}</div>
                </div>
              </div>
            )}
            {currentStage?.response && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>✅ RESPONSE</div>
                <pre style={{ 
                  margin: 0, padding: 20, borderRadius: 12,
                  background: 'rgba(0,0,0,0.4)',
                  border: `1px solid ${COLORS.green}30`,
                  fontSize: 18, color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  maxHeight: 400, overflow: 'auto'
                }}>
                  {currentStage.response}
                </pre>
                {currentStage.latency_ms && (
                  <div style={{ marginTop: 12, fontSize: 18, color: COLORS.orange, fontFamily: 'monospace' }}>
                    ⚡ {(currentStage.latency_ms / 1000).toFixed(2)}s Latency
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 MAIN FLOW PANEL
// ═══════════════════════════════════════════════════════════════════════════

export default function FlowPanel() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const limit = 20;

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getSessions(limit, page * limit);
      setSessions(data.sessions || []);
      setTotalSessions(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const filteredSessions = sessions.filter(s => 
    !filter || 
    s.wrapper?.toLowerCase().includes(filter.toLowerCase()) ||
    s.prompt?.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(totalSessions / limit);

  const handleReplay = (params: any) => {
    console.log('REPLAY:', params);
    // TODO: Navigate to Chat with prefilled params
    alert('Replay Feature kommt bald - öffnet Chat mit Preset!');
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <div style={{ 
            width: 72, height: 72, borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.cyan}40, ${COLORS.green}20)`,
            border: `2px solid ${COLORS.cyan}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42,
            boxShadow: `0 0 50px ${COLORS.cyan}40`,
            animation: 'pulse 2s infinite'
          }}>🌊</div>
          <h2 style={{ 
            margin: 0, fontFamily: 'monospace', fontSize: 42, fontWeight: 900, letterSpacing: 8,
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.green}, ${COLORS.magenta})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            FIELD FLOW
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 15px ${COLORS.green}`, animation: 'blink 1.5s infinite' }} />
          <span style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.cyan }}>{totalSessions.toLocaleString()} Sessions</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 15, fontFamily: 'monospace', color: COLORS.green }}>5 Stages pro Flow</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 15, fontFamily: 'monospace', color: COLORS.magenta }}>Seite {page + 1}/{totalPages}</span>
        </div>

        {/* SEARCH */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <input 
            type="text" 
            placeholder="🔍 Sessions filtern..." 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
            style={{ 
              padding: '14px 24px', borderRadius: 12, 
              border: `1px solid ${COLORS.cyan}40`, 
              background: 'rgba(0,0,0,0.4)', 
              color: 'white', fontFamily: 'monospace', fontSize: 18, 
              width: 400, outline: 'none' 
            }} 
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div style={{ fontSize: 72, animation: 'pulse 1s infinite' }}>🌊</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.cyan, marginTop: 24 }}>LADE SESSIONS...</div>
        </div>
      )}

      {/* SESSIONS GRID */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredSessions.map((session, index) => (
            <div 
              key={session.request_id}
              onClick={() => setSelectedSession(session.request_id)}
              style={{
                padding: 20,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                animation: `fadeIn 0.3s ease ${index * 0.05}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${COLORS.cyan}50`;
                e.currentTarget.style.boxShadow = `0 0 30px ${COLORS.cyan}20`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Timestamp */}
                <div style={{ minWidth: 100 }}>
                  <div style={{ fontSize: 18, color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 700 }}>
                    {new Date(session.timestamp).toLocaleDateString('de-DE')}
                  </div>
                  <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
                    {new Date(session.timestamp).toLocaleTimeString('de-DE')}
                  </div>
                </div>

                {/* Stages */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {session.stages.map(stage => {
                    const config = STAGE_CONFIG[stage];
                    return (
                      <div 
                        key={stage}
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: `${config?.color}30`,
                          border: `2px solid ${config?.color}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16
                        }}
                        title={stage}
                      >
                        {config?.icon}
                      </div>
                    );
                  })}
                </div>

                {/* Wrapper */}
                <div style={{ 
                  padding: '6px 14px', borderRadius: 8,
                  background: `${COLORS.purple}20`,
                  border: `1px solid ${COLORS.purple}40`,
                  fontSize: 15, color: COLORS.purple, fontFamily: 'monospace', fontWeight: 700
                }}>
                  {session.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'UNKNOWN'}
                </div>

                {/* Prompt Preview */}
                <div style={{ flex: 1, fontSize: 18, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {session.prompt?.slice(0, 80)}...
                </div>

                {/* Latency */}
                <div style={{ 
                  padding: '6px 14px', borderRadius: 8,
                  background: `${COLORS.orange}20`,
                  fontSize: 18, color: COLORS.orange, fontFamily: 'monospace', fontWeight: 700
                }}>
                  ⚡ {(session.latency_ms / 1000).toFixed(1)}s
                </div>

                {/* Arrow */}
                <div style={{ fontSize: 32, color: COLORS.cyan }}>→</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <button 
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              padding: '12px 24px', borderRadius: 10,
              border: `1px solid ${COLORS.cyan}50`,
              background: page === 0 ? 'rgba(255,255,255,0.05)' : `${COLORS.cyan}20`,
              color: page === 0 ? 'rgba(255,255,255,0.3)' : COLORS.cyan,
              fontFamily: 'monospace', cursor: page === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ← ZURÜCK
          </button>
          <div style={{ padding: '12px 24px', fontSize: 18, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>
            {page + 1} / {totalPages}
          </div>
          <button 
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            style={{
              padding: '12px 24px', borderRadius: 10,
              border: `1px solid ${COLORS.cyan}50`,
              background: page >= totalPages - 1 ? 'rgba(255,255,255,0.05)' : `${COLORS.cyan}20`,
              color: page >= totalPages - 1 ? 'rgba(255,255,255,0.3)' : COLORS.cyan,
              fontFamily: 'monospace', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            WEITER →
          </button>
        </div>
      )}

      {/* SESSION DETAIL MODAL */}
      {selectedSession && (
        <SessionDetailModal 
          sessionId={selectedSession} 
          onClose={() => setSelectedSession(null)}
          onReplay={handleReplay}
        />
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
