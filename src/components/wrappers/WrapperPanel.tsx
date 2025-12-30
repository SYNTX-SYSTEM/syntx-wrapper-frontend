// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📦 WRAPPER CONTROL - SYNTX ULTRA v7.0 MIT FORMAT BINDING 📦            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { Wrapper, WrapperDetail, WrapperStats, COLORS, getWrapperColor, formatDate } from './types';
import { cyberStyles } from './styles';
import { CreateModal, ViewModal, EditModal, StatsModal, DeleteModal } from './modals';

export default function WrapperPanel() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [activeWrapper, setActiveWrapper] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // FORMAT INFO für Cards
  const [wrapperFormats, setWrapperFormats] = useState<Record<string, string>>({});

  // MODAL STATES
  const [createOpen, setCreateOpen] = useState(false);
  const [createSaving, setCreateSaving] = useState(false);

  const [viewWrapper, setViewWrapper] = useState<WrapperDetail | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [editWrapper, setEditWrapper] = useState<WrapperDetail | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [statsWrapper, setStatsWrapper] = useState<Wrapper | null>(null);
  const [statsData, setStatsData] = useState<WrapperStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [deleteWrapper, setDeleteWrapper] = useState<Wrapper | null>(null);
  const [deleting, setDeleting] = useState(false);

  // 🔄 FETCH
  const fetchWrappers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getWrappersFull();
      setWrappers((data.wrappers || []).map((w: any) => ({ name: w.name, size_bytes: w.size_bytes, size_human: w.size_human, last_modified: w.last_modified, is_active: w.is_active })));
      setActiveWrapper((data as any).active_wrapper || "");
      
      // ECHTE Format-Bindings aus Backend Meta
      const formatBindings: Record<string, string> = {};
      (data.wrappers || []).forEach((w: any) => {
        formatBindings[w.name] = w.meta?.format?.toUpperCase() || "KEIN FORMAT";
      });
      setWrapperFormats(formatBindings);
    } catch (err: any) {
      setError(err.message || 'DRIFT beim Laden');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWrappers(); }, [fetchWrappers]);

  // 👁️ VIEW
  const openView = async (wrapper: Wrapper) => {
    setViewLoading(true);
    try {
      const detail = await api.getWrapper(wrapper.name);
      setViewWrapper(detail);
    } catch (err) {
      console.error('Failed to load:', err);
    } finally {
      setViewLoading(false);
    }
  };

  // ✏️ EDIT
  const openEdit = async (wrapper: Wrapper) => {
    try {
      const detail = await api.getWrapper(wrapper.name);
      setEditWrapper(detail);
    } catch (err) {
      console.error('Failed to load:', err);
    }
  };

  // 📊 STATS
  const openStats = async (wrapper: Wrapper) => {
    setStatsWrapper(wrapper);
    setStatsLoading(true);
    setStatsError(null);
    setStatsData(null);
    try {
      const data = await api.getWrapperStats(wrapper.name);
      setStatsData(data);
    } catch (err: any) {
      setStatsError(err.message || 'Keine Stats');
    } finally {
      setStatsLoading(false);
    }
  };

  // ⚡ CREATE
  const handleCreate = async (data: { name: string; content: string; description?: string; author?: string }) => {
    setCreateSaving(true);
    try {
      await api.createWrapper(data);
      setCreateOpen(false);
      fetchWrappers();
    } catch (err: any) {
      alert('Create failed: ' + err.message);
    } finally {
      setCreateSaving(false);
    }
  };

  // 🔄 SAVE EDIT
  const handleSaveEdit = async (content: string, formatData?: { format: string; fields: { name: string; weight: number; enabled: boolean }[] }) => {
    if (!editWrapper) return;
    setEditSaving(true);
    try {
      await api.updateWrapper(editWrapper.name, { content });
      if (formatData?.format) {
        await api.bindFormat(editWrapper.name, formatData.format);
      }
      setSuccessMessage(formatData?.format ? "⚡ " + editWrapper.name + " → " + formatData.format : "⚡ " + editWrapper.name + " gespeichert");
      setShowSuccess(true);
      setTimeout(() => { setShowSuccess(false); }, 2000);
      // Formats neu laden ohne Modal zu schließen
      const freshData = await api.getWrappersFull();
      const newFormats: Record<string, string> = {};
      (freshData.wrappers || []).forEach((w: any) => { newFormats[w.name] = w.meta?.format?.toUpperCase() || "KEIN FORMAT"; });
      setWrapperFormats(newFormats);
      setWrappers((freshData.wrappers || []).map((w: any) => ({ name: w.name, size_bytes: w.size_bytes, size_human: w.size_human, last_modified: w.last_modified, is_active: w.is_active })));
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    } finally {
      setEditSaving(false);
    }
  };

  // 🎯 ACTIVATE
  const handleActivate = async (name: string) => {
    try {
      await api.setRuntimeWrapper(name);
      setViewWrapper(null);
      fetchWrappers();
    } catch (err: any) {
      alert('Activate failed: ' + err.message);
    }
  };

  // 💀 DELETE
  const handleDelete = async () => {
    if (!deleteWrapper) return;
    setDeleting(true);
    try {
      await api.deleteWrapper(deleteWrapper.name);
      setDeleteWrapper(null);
      fetchWrappers();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredWrappers = wrappers.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = wrappers.filter(w => w.is_active).length;
  const totalSize = wrappers.reduce((a, b) => a + b.size_bytes, 0);

  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <style>{cyberStyles}</style>

      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <div className="pulse" style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(245,158,11,0.1))', border: '2px solid rgba(245,158,11,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}>📦</div>
          <h2 className="glow-text" style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, fontWeight: 900, letterSpacing: 8, background: 'linear-gradient(135deg, #f59e0b, #00d4ff, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WRAPPER CONTROL
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 15px ${COLORS.green}`, animation: 'blink 1.5s infinite' }} />
          <span style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.orange }}>{wrappers.length} Wrapper</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 13, fontFamily: 'monospace', color: COLORS.green }}>{activeCount} aktiv</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 13, fontFamily: 'monospace', color: COLORS.cyan }}>{(totalSize / 1024).toFixed(1)} KB total</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          <input type="text" placeholder="🔍 Wrapper suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '14px 24px', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(0,0,0,0.4)', color: 'white', fontFamily: 'monospace', fontSize: 14, width: 280, outline: 'none' }} />
          <button onClick={() => setCreateOpen(true)} className="cyber-btn" style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#030b15', fontFamily: 'monospace', fontSize: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 0 30px rgba(245,158,11,0.5)' }}>
            <span style={{ fontSize: 18 }}>🌟</span> GEBÄREN
          </button>
        </div>
      </div>

      {/* STATES */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div className="pulse" style={{ fontSize: 72, marginBottom: 24 }}>📦</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16, color: COLORS.orange }}>LADE WRAPPER...</div>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: 80, background: 'rgba(239,68,68,0.1)', borderRadius: 20, border: '1px solid rgba(239,68,68,0.3)' }}>
          <div style={{ fontSize: 64 }}>💀</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.red, margin: '16px 0' }}>DRIFT: {error}</div>
          <button onClick={fetchWrappers} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: `1px solid ${COLORS.red}`, background: 'transparent', color: COLORS.red, cursor: 'pointer' }}>↻ RETRY</button>
        </div>
      )}

      {!loading && !error && filteredWrappers.length === 0 && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div style={{ fontSize: 72, opacity: 0.4 }}>📭</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>KEINE WRAPPER</div>
        </div>
      )}

      {/* 🔥 GRID - GRÖSSERE CARDS */}
      {!loading && !error && filteredWrappers.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
          {filteredWrappers.map((wrapper, index) => {
            const color = getWrapperColor(wrapper.name);
            const boundFormat = wrapperFormats[wrapper.name] || 'NONE';
            return (
              <div key={wrapper.name} className="wrapper-card" style={{ '--card-color': color, animationDelay: `${index * 0.08}s`, background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))', borderRadius: 20, border: `1px solid ${color}40`, overflow: 'hidden' } as React.CSSProperties}>
                
                {/* HEADER - GRÖSSER */}
                <div style={{ padding: '24px 24px 18px', background: `linear-gradient(135deg, ${color}20, transparent)` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: `0 0 25px ${color}30` }}>📦</div>
                      <div>
                        <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 2 }}>{wrapper.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>{wrapper.size_human}</span>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{wrapper.size_bytes.toLocaleString()} bytes</span>
                        </div>
                      </div>
                    </div>
                    {wrapper.is_active && (
                      <div className="float" style={{ padding: '8px 14px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', fontSize: 11, fontFamily: 'monospace', color: COLORS.green, fontWeight: 700 }}>● AKTIV</div>
                    )}
                  </div>

                  {/* FORMAT BINDING - NEU! */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: 'rgba(217,70,239,0.1)', border: '1px solid rgba(217,70,239,0.3)' }}>
                    <span style={{ fontSize: 16 }}>📋</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 2 }}>GEBUNDENES FORMAT</div>
                      <div style={{ fontSize: 13, color: COLORS.magenta, fontFamily: 'monospace', fontWeight: 700 }}>{boundFormat}</div>
                    </div>
                    <div style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(217,70,239,0.2)', fontSize: 10, color: COLORS.magenta }}>LINKED</div>
                  </div>
                </div>

                {/* META BAR */}
                <div style={{ padding: '14px 24px', background: 'rgba(0,0,0,0.4)', borderTop: `1px solid ${color}20`, borderBottom: `1px solid ${color}20` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>📅</span>
                      <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>Modulation: {formatDate(wrapper.last_modified)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>⚡</span>
                      <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.cyan }}>~{Math.round(wrapper.size_bytes / 4)} tokens</span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS - GRÖSSER */}
                <div style={{ padding: '18px 24px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={() => openView(wrapper)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: `1px solid ${color}50`, background: `${color}15`, color, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>👁️ VIEW</button>
                  <button onClick={() => openStats(wrapper)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: '1px solid rgba(139,92,246,0.5)', background: 'rgba(139,92,246,0.15)', color: COLORS.purple, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>📊 STATS</button>
                  <button onClick={() => openEdit(wrapper)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>✏️ EDIT</button>
                  {!wrapper.is_active && (
                    <button onClick={() => handleActivate(wrapper.name)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: '1px solid rgba(16,185,129,0.5)', background: 'rgba(16,185,129,0.15)', color: COLORS.green, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>🎯 AKTIV</button>
                  )}
                  <button onClick={() => setDeleteWrapper(wrapper)} className="cyber-btn" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.15)', color: COLORS.red, fontSize: 12, cursor: 'pointer' }}>💀</button>
                </div>

                {/* QUICK STATS BAR - NEU! */}
                <div style={{ padding: '12px 24px', background: `linear-gradient(135deg, ${color}10, transparent)`, borderTop: `1px solid ${color}15`, display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.cyan }}>{wrapper.size_bytes > 1500 ? '🔥' : wrapper.size_bytes > 800 ? '✅' : '💡'}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>SIZE</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: wrapper.is_active ? COLORS.green : 'rgba(255,255,255,0.3)' }}>{wrapper.is_active ? '🎯' : '💤'}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>STATUS</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.magenta }}>📋</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>FORMAT</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.orange }}>⚡</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>READY</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODALS */}
      <CreateModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreate} saving={createSaving} />
      <ViewModal wrapper={viewWrapper} loading={viewLoading} onClose={() => setViewWrapper(null)} onEdit={() => { if (viewWrapper) { setViewWrapper(null); openEdit({ name: viewWrapper.name, size_bytes: viewWrapper.size_bytes, size_human: viewWrapper.size_human, last_modified: viewWrapper.last_modified, is_active: viewWrapper.is_active }); }}} onActivate={() => { if (viewWrapper) handleActivate(viewWrapper.name); }} />
      <EditModal wrapper={editWrapper} onClose={() => setEditWrapper(null)} onSave={handleSaveEdit} saving={editSaving} />
      <StatsModal wrapper={statsWrapper} stats={statsData} loading={statsLoading} error={statsError} onClose={() => { setStatsWrapper(null); setStatsData(null); }} />
      <DeleteModal wrapper={deleteWrapper} onClose={() => setDeleteWrapper(null)} onDelete={handleDelete} deleting={deleting} />
      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "linear-gradient(135deg, rgba(16,185,129,0.98), rgba(6,78,59,0.98))", border: "2px solid #10b981", borderRadius: 20, padding: "40px 60px", zIndex: 2000, boxShadow: "0 0 80px rgba(16,185,129,0.6), 0 0 160px rgba(16,185,129,0.3)", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>⚡</div>
          <div style={{ fontFamily: "monospace", fontSize: 24, color: "#fff", fontWeight: 900, letterSpacing: 4, textTransform: "uppercase" }}>MODULIERT</div>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 12 }}>{successMessage}</div>
        </div>
      )}
    </div>
  );
}
