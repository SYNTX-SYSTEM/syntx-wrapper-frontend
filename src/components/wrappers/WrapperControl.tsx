"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { usePagination } from '@/hooks/usePagination';
import { useFilter } from '@/hooks/useFilter';
import Pagination from '@/components/ui/Pagination';
import SortHeader from '@/components/ui/SortHeader';
import SearchBar from '@/components/ui/SearchBar';

const COLORS = { cyan: '#00d4ff', magenta: '#d946ef', green: '#10b981', orange: '#f59e0b' };

interface Wrapper {
  name: string;
  path: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
}

function WrapperDetailModal({ wrapper, onClose }: { wrapper: Wrapper; onClose: () => void }) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getWrapper(wrapper.name).then(data => setContent(data.content)).catch(console.error).finally(() => setLoading(false));
  }, [wrapper.name]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 800, maxHeight: '90vh', background: 'linear-gradient(135deg, #0a1a2e, #050b14)', borderRadius: 20, border: '1px solid rgba(0,212,255,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>📦</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: wrapper.is_active ? COLORS.green : COLORS.cyan }}>{wrapper.name}</h2>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{wrapper.size_human} • {new Date(wrapper.last_modified).toLocaleString('de-DE')}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'white', cursor: 'pointer', fontFamily: 'monospace' }}>✕ CLOSE</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : (
            <pre style={{ margin: 0, padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 12, fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{content}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WrapperControl() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWrapper, setSelectedWrapper] = useState<Wrapper | null>(null);
  const [activeWrapper, setActiveWrapper] = useState<string | null>(null);

  const fetchWrappers = useCallback(async () => {
    try {
      const data = await api.getWrappers();
      setWrappers(data.wrappers || []);
      setActiveWrapper(data.active_wrapper);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchWrappers(); }, [fetchWrappers]);

  const handleActivate = async (name: string) => {
    try { await api.activateWrapper(name); fetchWrappers(); } catch (e) { console.error(e); }
  };

  const { filteredItems, searchQuery, setSearchQuery, activeFilterCount, clearFilters } = useFilter(wrappers, { searchFields: ['name'] });
  const { items: paginatedWrappers, pagination, sorting, setPage, setPageSize, toggleSort } = usePagination(filteredItems, 10, { key: 'name', direction: 'asc' });

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading Wrappers...</div>;

  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>📦</span>
          <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.orange }}>WRAPPERS</h2>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{wrappers.length} loaded</span>
        </div>
        <div style={{ padding: '6px 12px', background: COLORS.green + '20', border: `1px solid ${COLORS.green}40`, borderRadius: 8, fontSize: 10, fontFamily: 'monospace', color: COLORS.green }}>
          ACTIVE: {activeWrapper?.replace('syntex_wrapper_', '')}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '12px 24px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search wrappers..." color={COLORS.orange} />
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontFamily: 'monospace', fontSize: 10, cursor: 'pointer' }}>✕ Clear</button>
        )}
      </div>

      {/* Table Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 120px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <SortHeader label="Name" sortKey="name" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Size" sortKey="size_bytes" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Modified" sortKey="last_modified" currentSort={sorting as any} onSort={toggleSort as any} />
        <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>ACTIONS</div>
      </div>

      {/* Rows */}
      <div style={{ maxHeight: 500, overflow: 'auto' }}>
        {paginatedWrappers.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>No wrappers found</div>
        ) : paginatedWrappers.map((wrapper) => (
          <div key={wrapper.name} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 120px', gap: 8, padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', background: wrapper.is_active ? 'rgba(16,185,129,0.05)' : 'transparent' }}>
            <div onClick={() => setSelectedWrapper(wrapper)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <span style={{ fontSize: 18 }}>📦</span>
              <div>
                <div style={{ fontSize: 13, fontFamily: 'monospace', color: wrapper.is_active ? COLORS.green : 'white' }}>{wrapper.name.replace('syntex_wrapper_', '')}</div>
                {wrapper.is_active && <span style={{ fontSize: 9, color: COLORS.green, fontFamily: 'monospace' }}>ACTIVE</span>}
              </div>
            </div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center' }}>{wrapper.size_human}</div>
            <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>{new Date(wrapper.last_modified).toLocaleDateString('de-DE')}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {!wrapper.is_active && <button onClick={() => handleActivate(wrapper.name)} style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${COLORS.cyan}40`, background: COLORS.cyan + '10', color: COLORS.cyan, fontSize: 10, fontFamily: 'monospace', cursor: 'pointer' }}>ACTIVATE</button>}
              <button onClick={() => setSelectedWrapper(wrapper)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'monospace', cursor: 'pointer' }}>VIEW</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 24px 16px' }}>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} totalItems={pagination.totalItems} pageSize={pagination.pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
      </div>

      {selectedWrapper && <WrapperDetailModal wrapper={selectedWrapper} onClose={() => setSelectedWrapper(null)} />}
    </div>
  );
}
