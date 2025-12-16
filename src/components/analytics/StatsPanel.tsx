"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import { api, StatsResponse, StreamEvent, TrainingEntry } from '@/lib/api';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '@/components/ui/Pagination';
import SortHeader from '@/components/ui/SortHeader';

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
};

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
    '1_INCOMING': { color: COLORS.cyan, icon: '📥' },
    '2_WRAPPERS_LOADED': { color: COLORS.green, icon: '📦' },
    '3_FIELD_CALIBRATED': { color: COLORS.orange, icon: '⚡' },
    '4_BACKEND_FORWARD': { color: COLORS.magenta, icon: '🚀' },
    '5_RESPONSE': { color: COLORS.green, icon: '✅' },
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 900, maxHeight: '90vh', background: 'linear-gradient(135deg, #0a1a2e, #050b14)', borderRadius: 20, border: '1px solid rgba(0,212,255,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🌊</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.cyan }}>FIELD FLOW DETAIL</h2>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>{requestId}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'white', cursor: 'pointer', fontFamily: 'monospace' }}>✕ CLOSE</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : detail?.stages?.map((stage: any) => {
            const config = STAGE_CONFIG[stage.stage] || { color: COLORS.cyan, icon: '●' };
            return (
              <div key={stage.stage} style={{ marginBottom: 16, padding: 16, background: `${config.color}10`, border: `1px solid ${config.color}30`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{config.icon}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: config.color, fontWeight: 700 }}>{stage.stage}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{new Date(stage.timestamp).toLocaleString('de-DE')}</span>
                </div>
                {stage.prompt && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Prompt:</strong> {stage.prompt}</div>}
                {stage.backend_url && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Backend:</strong> <span style={{ color: COLORS.magenta }}>{stage.backend_url}</span></div>}
                {stage.params && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 11, marginBottom: 8 }}><strong>Params:</strong> <pre style={{ margin: '8px 0 0', color: COLORS.cyan }}>{JSON.stringify(stage.params, null, 2)}</pre></div>}
                {stage.response && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{stage.response}</div>}
                {stage.latency_ms && <div style={{ marginTop: 8, fontSize: 11, color: COLORS.orange }}>⚡ {(stage.latency_ms/1000).toFixed(2)}s</div>}
              </div>
            );
          })}
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
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);
  const [trainingData, setTrainingData] = useState<TrainingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'stream' | 'training'>('stream');

  const fetchData = useCallback(async () => {
    try {
      const [statsData, streamData, training] = await Promise.all([
        api.getStats(),
        api.getStream(200),
        api.getTraining(200),
      ]);
      setStats(statsData);
      setStreamEvents(streamData.events || []);
      setTrainingData(training.entries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Pagination for stream events
  const streamPagination = usePagination(streamEvents, 10, { key: 'timestamp' as keyof StreamEvent, direction: 'desc' });
  
  // Pagination for training data
  const trainingPagination = usePagination(trainingData, 10);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Requests', value: stats?.total_requests || 0, icon: '📡', color: COLORS.cyan },
          { label: 'Success Rate', value: `${stats?.success_rate || 0}%`, icon: '✅', color: COLORS.green },
          { label: 'Avg Latency', value: `${((stats?.average_latency_ms || 0) / 1000).toFixed(1)}s`, icon: '⚡', color: COLORS.orange },
          { label: 'Active Wrappers', value: Object.keys(stats?.wrapper_usage || {}).length, icon: '📦', color: COLORS.magenta },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: 20,
            background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
            border: `1px solid ${stat.color}30`,
            borderRadius: 16,
          }}>
            <span style={{ fontSize: 28 }}>{stat.icon}</span>
            <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, fontFamily: 'monospace', margin: '12px 0 6px' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Section Toggle */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['stream', 'training'] as const).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: `1px solid ${activeSection === section ? COLORS.cyan : 'rgba(255,255,255,0.1)'}`,
              background: activeSection === section ? COLORS.cyan + '20' : 'transparent',
              color: activeSection === section ? COLORS.cyan : 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {section === 'stream' ? '🌊 FIELD STREAM' : '📚 TRAINING DATA'}
          </button>
        ))}
      </div>

      {/* Stream Events Section */}
      {activeSection === 'stream' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🌊</span>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.cyan }}>FIELD STREAM</h3>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{streamEvents.length} events</span>
            </div>
          </div>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr 100px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <SortHeader label="Zeit" sortKey="timestamp" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} />
            <SortHeader label="Stage" sortKey="stage" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} />
            <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>REQUEST ID</div>
            <SortHeader label="Latency" sortKey="latency_ms" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} color={COLORS.orange} />
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {streamPagination.items.map((event, i) => (
              <div
                key={event.request_id + event.stage + i}
                onClick={() => setSelectedRequest(event.request_id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 100px 1fr 100px',
                  gap: 8,
                  padding: '12px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,212,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>
                  {new Date(event.timestamp).toLocaleTimeString('de-DE')}
                </div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: COLORS.green }}>{event.stage}</div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {event.request_id.slice(0, 20)}...
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>
                  {event.latency_ms ? `${(event.latency_ms / 1000).toFixed(1)}s` : '-'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 24px 16px' }}>
            <Pagination
              page={streamPagination.pagination.page}
              totalPages={streamPagination.pagination.totalPages}
              totalItems={streamPagination.pagination.totalItems}
              pageSize={streamPagination.pagination.pageSize}
              onPageChange={streamPagination.setPage}
              onPageSizeChange={streamPagination.setPageSize}
            />
          </div>
        </div>
      )}

      {/* Training Data Section */}
      {activeSection === 'training' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>📚</span>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.magenta }}>TRAINING DATA</h3>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{trainingData.length} entries</span>
            </div>
          </div>

          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <SortHeader label="Wrapper" sortKey="wrapper_chain" currentSort={trainingPagination.sorting as any} onSort={trainingPagination.toggleSort as any} color={COLORS.magenta} />
            <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>RESPONSE</div>
            <SortHeader label="Latency" sortKey="latency_ms" currentSort={trainingPagination.sorting as any} onSort={trainingPagination.toggleSort as any} color={COLORS.orange} />
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {trainingPagination.items.map((entry, i) => (
              <div
                key={entry.request_id + i}
                onClick={() => setSelectedRequest(entry.request_id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 100px',
                  gap: 8,
                  padding: '14px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(217,70,239,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  padding: '4px 8px',
                  borderRadius: 6,
                  background: COLORS.magenta + '20',
                  color: COLORS.magenta,
                  width: 'fit-content',
                }}>
                  {entry.wrapper_chain?.[0]?.replace('syntex_wrapper_', '') || 'unknown'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.response?.slice(0, 100)}...
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>
                  {entry.latency_ms ? `${(entry.latency_ms / 1000).toFixed(1)}s` : '-'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 24px 16px' }}>
            <Pagination
              page={trainingPagination.pagination.page}
              totalPages={trainingPagination.pagination.totalPages}
              totalItems={trainingPagination.pagination.totalItems}
              pageSize={trainingPagination.pagination.pageSize}
              onPageChange={trainingPagination.setPage}
              onPageSizeChange={trainingPagination.setPageSize}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <FlowDetailModal requestId={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </div>
  );
}
