// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🌊 WRAPPER FORMAT CONTROL - SYNTX ULTRA v6.0 MODULAR 🌊                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { LocalFormat, EditField, CreateField, FullFormatDetail, COLORS, getFormatColor, getDesc } from './types';
import { cyberStyles } from './styles';
import { CreateModal, ViewModal, EditModal, ScoreModal, DeleteModal } from './modals';

export default function FormatPanel() {
  const [formats, setFormats] = useState<LocalFormat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // VIEW MODAL
  const [viewFormat, setViewFormat] = useState<LocalFormat | null>(null);
  const [viewData, setViewData] = useState<FullFormatDetail | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  // SCORE MODAL
  const [scoreFormat, setScoreFormat] = useState<LocalFormat | null>(null);
  const [scoreData, setScoreData] = useState<any>(null);
  const [scoreLoading, setScoreLoading] = useState(false);

  // DELETE MODAL
  const [deleteFormat, setDeleteFormat] = useState<LocalFormat | null>(null);

  // CREATE MODAL
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createDesc, setCreateDesc] = useState('');
  const [createFields, setCreateFields] = useState<CreateField[]>([{ name: '', weight: 17 }]);
  const [createSaving, setCreateSaving] = useState(false);

  // EDIT MODAL
  const [editFormat, setEditFormat] = useState<LocalFormat | null>(null);
  const [editFields, setEditFields] = useState<EditField[]>([]);
  const [editDesc, setEditDesc] = useState('');
  const [editVersion, setEditVersion] = useState('');
  const [editWrapper, setEditWrapper] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');

  // 🔄 FETCH
  const fetchFormats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getFormats();
      setFormats((data.formats || []).map((f: any) => ({
        ...f,
        fields_count: f.fields_count || f.fields?.length || 0,
        language: f.primary_language || f.language || (f.languages?.[0]) || 'de'
      })));
    } catch (err: any) {
      setError(err.message || 'DRIFT beim Laden');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFormats(); }, [fetchFormats]);

  // 👁️ VIEW
  const openView = async (format: LocalFormat) => {
    setViewFormat(format);
    setViewData(null);
    setViewLoading(true);
    try {
      const detail = await api.getFormat(format.name);
      setViewData((detail as any).format || detail);
    } catch (err) {
      console.error('Failed to load:', err);
    } finally {
      setViewLoading(false);
    }
  };

  // 📊 SCORE
  const openScore = async (format: LocalFormat) => {
    setScoreFormat(format);
    setScoreLoading(true);
    setScoreData(null);
    try {
      const data = await api.scoreFormat({ format: format.name });
      setScoreData(data);
    } catch (err: any) {
      setScoreData({ error: err.message });
    } finally {
      setScoreLoading(false);
    }
  };

  // 💀 DELETE
  const handleDelete = async () => {
    if (!deleteFormat) return;
    try {
      await api.deleteFormat(deleteFormat.name);
      setDeleteFormat(null);
      fetchFormats();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  // ⚡ CREATE
  const handleCreate = async () => {
    const validFields = createFields.filter(f => f.name.trim());
    if (!createName.trim() || validFields.length === 0) return;
    setCreateSaving(true);
    try {
      await api.createFormatQuick({
        name: createName.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
        field_names: validFields.map(f => f.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')),
        description_de: createDesc || 'Neues Format',
      });
      setCreateOpen(false);
      setCreateName('');
      setCreateDesc('');
      setCreateFields([{ name: '', weight: 17 }]);
      fetchFormats();
    } catch (err: any) {
      alert('Create failed: ' + err.message);
    } finally {
      setCreateSaving(false);
    }
  };

  // ✏️ EDIT ÖFFNEN
  const openEdit = async (format: LocalFormat) => {
    setEditFormat(format);
    setEditDesc('');
    setEditWrapper(format.wrapper || 'syntex_wrapper_sigma');
    setEditVersion(format.version || '1.0');
    setEditFields([]);
    setNewFieldName('');
    try {
      const detail = await api.getFormat(format.name);
      const full = (detail as any).format || detail;
      const desc = full.description;
      setEditDesc(typeof desc === 'object' ? (desc?.de || desc?.en || '') : (desc || ''));
      setEditFields((full.fields || []).map((f: any) => ({ name: f.name, weight: f.weight || 17, enabled: true })));
      if (full.wrapper) setEditWrapper(full.wrapper);
      if (full.version) setEditVersion(full.version);
    } catch (err) {
      console.error('Failed to load:', err);
    }
  };

  // 💾 EDIT SPEICHERN
  const handleSaveEdit = async () => {
    if (!editFormat) return;
    setEditSaving(true);
    try {
      const enabled = editFields.filter(f => f.enabled);
      await api.updateFormat(editFormat.name, {
        description: { de: editDesc, en: editDesc },
        fields: enabled.map(f => ({
          name: f.name,
          weight: f.weight,
          description: { de: f.name, en: f.name },
          keywords: { de: [f.name], en: [f.name] },
          headers: { de: [f.name.toUpperCase()], en: [f.name.toUpperCase()] }
        })),
        version: editVersion,
      });
      setEditFormat(null);
      fetchFormats();
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    } finally {
      setEditSaving(false);
    }
  };

  const filteredFormats = formats.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof f.description === 'string' && f.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <style>{cyberStyles}</style>

      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <div className="pulse" style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, rgba(20,184,166,0.4), rgba(20,184,166,0.1))', border: '2px solid rgba(20,184,166,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 0 40px rgba(20,184,166,0.4)' }}>📋</div>
          <h2 className="glow-text" style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, fontWeight: 900, letterSpacing: 8, background: 'linear-gradient(135deg, #14b8a6, #00d4ff, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WRAPPER FORMAT CONTROL
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 15px ${COLORS.green}`, animation: 'blink 1.5s infinite' }} />
          <span style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.teal }}>{formats.length} Formate</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          <input type="text" placeholder="🔍 Format suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '14px 24px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.3)', background: 'rgba(0,0,0,0.4)', color: 'white', fontFamily: 'monospace', fontSize: 14, width: 280, outline: 'none' }} />
          <button onClick={() => setCreateOpen(true)} className="cyber-btn" style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#030b15', fontFamily: 'monospace', fontSize: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 0 30px rgba(20,184,166,0.5)' }}>
            <span style={{ fontSize: 18 }}>⚡</span> GEBÄREN
          </button>
        </div>
      </div>

      {/* STATES */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div className="pulse" style={{ fontSize: 72, marginBottom: 24 }}>📋</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16, color: COLORS.teal }}>LADE FORMATE...</div>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: 80, background: 'rgba(239,68,68,0.1)', borderRadius: 20, border: '1px solid rgba(239,68,68,0.3)' }}>
          <div style={{ fontSize: 64 }}>💀</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.red, margin: '16px 0' }}>DRIFT: {error}</div>
          <button onClick={fetchFormats} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: `1px solid ${COLORS.red}`, background: 'transparent', color: COLORS.red, cursor: 'pointer' }}>↻ RETRY</button>
        </div>
      )}

      {!loading && !error && filteredFormats.length === 0 && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div style={{ fontSize: 72, opacity: 0.4 }}>📭</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>KEINE FORMATE</div>
        </div>
      )}

      {/* GRID */}
      {!loading && !error && filteredFormats.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
          {filteredFormats.map((format, index) => {
            const color = getFormatColor(format.name);
            const lang = format.language || 'de';
            return (
              <div key={format.name} className="format-card" style={{ '--card-color': color, animationDelay: `${index * 0.08}s`, background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))', borderRadius: 16, border: `1px solid ${color}40`, overflow: 'hidden' } as React.CSSProperties}>
                <div style={{ padding: '20px 20px 14px', background: `linear-gradient(135deg, ${color}20, transparent)` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="pulse" style={{ width: 50, height: 50, borderRadius: 12, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: `0 0 20px ${color}30` }}>📋</div>
                      <div>
                        <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 2 }}>{format.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{format.fields_count} Felder</span>
                          {format.version && <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 6, background: `${color}20`, color }}>v{format.version}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="float" style={{ padding: '8px 14px', borderRadius: 20, background: `${color}25`, border: `1px solid ${color}50`, fontSize: 12, fontFamily: 'monospace', color, fontWeight: 700 }}>{format.fields_count}</div>
                  </div>
                  {format.description && <p style={{ margin: '14px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{getDesc(format.description)}</p>}
                </div>

                <div style={{ padding: '12px 20px', background: 'rgba(0,0,0,0.4)', borderTop: `1px solid ${color}20`, borderBottom: `1px solid ${color}20`, display: 'flex', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{lang === 'de' ? '🇩🇪' : '🇬🇧'}</span>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.cyan }}>{lang.toUpperCase()}</span>
                  </div>
                  {format.wrapper && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>📦</span>
                      <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>{format.wrapper.replace('syntex_wrapper_', '').toUpperCase()}</span>
                    </div>
                  )}
                </div>

                <div style={{ padding: '16px 20px', display: 'flex', gap: 10 }}>
                  <button onClick={() => openView(format)} className="cyber-btn" style={{ flex: 1, padding: '12px', borderRadius: 10, border: `1px solid ${color}50`, background: `${color}15`, color, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>👁️ VIEW</button>
                  <button onClick={() => openEdit(format)} className="cyber-btn" style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>✏️ EDIT</button>
                  <button onClick={() => openScore(format)} className="cyber-btn" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(139,92,246,0.5)', background: 'rgba(139,92,246,0.15)', color: COLORS.purple, fontSize: 12, cursor: 'pointer' }}>📊</button>
                  <button onClick={() => setDeleteFormat(format)} className="cyber-btn" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.15)', color: COLORS.red, fontSize: 12, cursor: 'pointer' }}>💀</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODALS */}
      <CreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        saving={createSaving}
        name={createName}
        setName={setCreateName}
        description={createDesc}
        setDescription={setCreateDesc}
        fields={createFields}
        setFields={setCreateFields}
      />

      <ViewModal
        format={viewFormat}
        data={viewData}
        loading={viewLoading}
        onClose={() => { setViewFormat(null); setViewData(null); }}
        onEdit={() => { setViewFormat(null); if (viewFormat) openEdit(viewFormat); }}
      />

      <EditModal
        format={editFormat}
        onClose={() => setEditFormat(null)}
        onSave={handleSaveEdit}
        saving={editSaving}
        fields={editFields}
        setFields={setEditFields}
        description={editDesc}
        setDescription={setEditDesc}
        version={editVersion}
        setVersion={setEditVersion}
        wrapper={editWrapper}
        setWrapper={setEditWrapper}
        newFieldName={newFieldName}
        setNewFieldName={setNewFieldName}
      />

      <ScoreModal
        format={scoreFormat}
        data={scoreData}
        loading={scoreLoading}
        onClose={() => { setScoreFormat(null); setScoreData(null); }}
      />

      <DeleteModal
        format={deleteFormat}
        onClose={() => setDeleteFormat(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
