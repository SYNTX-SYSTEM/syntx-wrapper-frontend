"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api, StreamEvent } from '@/lib/api';
import { usePagination } from '@/hooks/usePagination';
import { useFilter } from '@/hooks/useFilter';
import Pagination from '@/components/ui/Pagination';
import SortHeader from '@/components/ui/SortHeader';
import FilterBar from '@/components/ui/FilterBar';

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
};

const STAGE_CONFIG: Record<string, { color: string; icon: string }> = {
  '1_INCOMING': { color: COLORS.cyan, icon: '📥' },
  '2_WRAPPERS_LOADED': { color: COLORS.green, icon: '📦' },
  '3_FIELD_CALIBRATED': { color: COLORS.orange, icon: '⚡' },
  '4_BACKEND_FORWARD': { color: COLORS.magenta, icon: '🚀' },
  '5_RESPONSE': { color: COLORS.green, icon: '✅' },
};

interface RequestGroup {
  request_id: string;
  timestamp: Date;
  latency_ms: number;
  wrapper: string;
  stages: string[];
  prompt?: string;
  response?: string;
}

function FlowDetailModal({ requestId, onClose }: { requestId: string; onClose: () => void }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHistory(requestId).then(setDetail).catch(console.error).finally(() => setLoading(false));
  }, [requestId]);

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

export default function FlowPanel() {
  const [allEvents, setAllEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await api.getStream(500);
      setAllEvents(data.events || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Group events by request_id
  const requestGroups = useMemo(() => {
    const grouped: Record<string, RequestGroup> = {};
    allEvents.forEach(event => {
      if (!grouped[event.request_id]) {
        grouped[event.request_id] = {
          request_id: event.request_id,
          timestamp: new Date(event.timestamp),
          latency_ms: 0,
          wrapper: event.wrapper_chain?.[0] || 'unknown',
          stages: [],
        };
      }
      if (!grouped[event.request_id].stages.includes(event.stage)) {
        grouped[event.request_id].stages.push(event.stage);
      }
      if (event.latency_ms) grouped[event.request_id].latency_ms = event.latency_ms;
      if (event.stage === '1_INCOMING' && event.prompt) grouped[event.request_id].prompt = event.prompt;
      if (event.stage === '5_RESPONSE' && event.response) grouped[event.request_id].response = event.response;
    });
    return Object.values(grouped);
  }, [allEvents]);

  // Get unique wrappers for filter
  const wrapperOptions = useMemo(() => {
    const wrappers = [...new Set(requestGroups.map(r => r.wrapper))];
    return [
      { value: 'all', label: 'All Wrappers' },
      ...wrappers.map(w => ({ value: w, label: w.replace('syntex_wrapper_', '') }))
    ];
  }, [requestGroups]);

  // Filter
  const { filteredItems, searchQuery, setSearchQuery, filters, setFilter, clearFilters, activeFilterCount } = useFilter(requestGroups, {
    searchFields: ['prompt', 'response', 'request_id', 'wrapper'],
  });

  // Pagination
  const { items: paginatedRequests, pagination, sorting, setPage, setPageSize, toggleSort } = usePagination(
    filteredItems.filter(r => !filters.wrapper || filters.wrapper === 'all' || r.wrapper === filters.wrapper),
    10,
    { key: 'timestamp', direction: 'desc' }
  );

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Loading Field Flow...</div>;
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🌊</span>
          <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.cyan }}>FIELD FLOW</h2>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{requestGroups.length} Requests</span>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search prompts, responses, IDs..."
        filters={[{ key: 'wrapper', label: 'Wrapper', options: wrapperOptions }]}
        filterValues={filters}
        onFilterChange={setFilter}
        onClear={clearFilters}
        activeCount={activeFilterCount}
        color={COLORS.cyan}
      />

      {/* Table Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 120px 100px 80px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <SortHeader label="Zeit" sortKey="timestamp" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Prompt" sortKey="prompt" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Wrapper" sortKey="wrapper" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Latency" sortKey="latency_ms" currentSort={sorting as any} onSort={toggleSort as any} color={COLORS.orange} />
        <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>STAGES</div>
      </div>

      {/* Rows */}
      <div style={{ maxHeight: 500, overflow: 'auto' }}>
        {paginatedRequests.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
            {activeFilterCount > 0 ? 'No results matching filters' : 'No requests yet'}
          </div>
        ) : paginatedRequests.map((req) => (
          <div
            key={req.request_id}
            onClick={() => setSelectedRequest(req.request_id)}
            style={{ display: 'grid', gridTemplateColumns: '120px 1fr 120px 100px 80px', gap: 8, padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,212,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>{req.timestamp.toLocaleTimeString('de-DE')}</div>
            <div style={{ fontSize: 12, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.prompt || req.request_id.slice(0, 12) + '...'}</div>
            <div style={{ fontSize: 10, fontFamily: 'monospace', padding: '4px 8px', borderRadius: 6, background: COLORS.magenta + '20', color: COLORS.magenta, width: 'fit-content' }}>{req.wrapper.replace('syntex_wrapper_', '')}</div>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: COLORS.orange }}>{req.latency_ms ? `${(req.latency_ms / 1000).toFixed(1)}s` : '-'}</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {req.stages.sort().map(stage => (
                <div key={stage} style={{ width: 8, height: 8, borderRadius: '50%', background: STAGE_CONFIG[stage]?.color || COLORS.cyan }} title={stage} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ padding: '0 24px 16px' }}>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} totalItems={pagination.totalItems} pageSize={pagination.pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
      </div>

      {selectedRequest && <FlowDetailModal requestId={selectedRequest} onClose={() => setSelectedRequest(null)} />}
    </div>
  );
}
