"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { api, Wrapper, WrapperListResponse, WrapperDetailResponse } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// GLASS CARD (gleicher Style wie Dashboard)
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
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${glowColor}50, transparent)`,
      }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FREQUENCY BADGE
// ═══════════════════════════════════════════════════════════════
function FrequencyBadge({ name }: { name: string }) {
  const lower = name.toLowerCase();
  let freq = { label: 'CUSTOM', color: '#00d4ff', bg: 'rgba(0,212,255,0.15)' };
  
  if (lower.includes('human')) {
    freq = { label: 'LOW', color: '#10b981', bg: 'rgba(16,185,129,0.15)' };
  } else if (lower.includes('sigma')) {
    freq = { label: 'MEDIUM', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' };
  } else if (lower.includes('deepsweep')) {
    freq = { label: 'HIGH', color: '#d946ef', bg: 'rgba(217,70,239,0.15)' };
  } else if (lower.includes('true_raw')) {
    freq = { label: 'RAW', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' };
  }
  
  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: 6,
      fontSize: 10,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: 1,
      color: freq.color,
      background: freq.bg,
      border: `1px solid ${freq.color}30`,
    }}>
      {freq.label}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// WRAPPER ROW
// ═══════════════════════════════════════════════════════════════
function WrapperRow({ 
  wrapper, 
  onActivate, 
  onSelect,
  activating 
}: { 
  wrapper: Wrapper; 
  onActivate: () => void;
  onSelect: () => void;
  activating: boolean;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        background: wrapper.is_active 
          ? 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0.05) 100%)' 
          : 'rgba(0,0,0,0.2)',
        border: wrapper.is_active 
          ? '1px solid rgba(0,212,255,0.4)' 
          : '1px solid rgba(255,255,255,0.05)',
        borderRadius: 12,
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: wrapper.is_active ? '0 0 30px rgba(0,212,255,0.15)' : 'none',
      }}
    >
      {/* Active Indicator */}
      <div style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: wrapper.is_active ? '#00d4ff' : 'rgba(255,255,255,0.1)',
        boxShadow: wrapper.is_active ? '0 0 12px #00d4ff' : 'none',
        transition: 'all 0.3s ease',
      }} />
      
      {/* Frequency Badge */}
      <FrequencyBadge name={wrapper.name} />
      
      {/* Name */}
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontFamily: 'monospace', 
          fontSize: 14, 
          color: wrapper.is_active ? '#00d4ff' : 'rgba(255,255,255,0.8)',
          fontWeight: wrapper.is_active ? 600 : 400,
        }}>
          {wrapper.name.replace('syntex_wrapper_', '').toUpperCase()}
        </div>
        <div style={{ 
          fontSize: 11, 
          color: 'rgba(255,255,255,0.4)',
          marginTop: 2,
        }}>
          {wrapper.size_human} • {new Date(wrapper.last_modified).toLocaleDateString('de-DE')}
        </div>
      </div>
      
      {/* Active Badge or Activate Button */}
      {wrapper.is_active ? (
        <span style={{
          padding: '6px 12px',
          borderRadius: 8,
          fontSize: 10,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: '#10b981',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <div style={{ 
            width: 6, 
            height: 6, 
            borderRadius: '50%', 
            background: '#10b981',
            animation: 'pulse 2s infinite',
          }} />
          AKTIV
        </span>
      ) : (
        <button
          onClick={(e) => { e.stopPropagation(); onActivate(); }}
          disabled={activating}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(0,212,255,0.3)',
            background: 'rgba(0,212,255,0.1)',
            color: '#00d4ff',
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 600,
            cursor: activating ? 'not-allowed' : 'pointer',
            opacity: activating ? 0.5 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          {activating ? '...' : 'AKTIVIEREN'}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WRAPPER DETAIL PANEL
// ═══════════════════════════════════════════════════════════════
function WrapperDetail({ wrapperName, onClose }: { wrapperName: string; onClose: () => void }) {
  const [detail, setDetail] = useState<WrapperDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getWrapper(wrapperName)
      .then(setDetail)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [wrapperName]);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#ef4444' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontFamily: 'monospace', color: '#00d4ff' }}>
          {detail?.name.replace('syntex_wrapper_', '').toUpperCase()}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 20,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Size: <span style={{ color: '#00d4ff' }}>{detail?.size} bytes</span>
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Modified: <span style={{ color: '#00d4ff' }}>{detail?.last_modified}</span>
        </span>
        {detail?.is_active && (
          <span style={{ 
            fontSize: 12, 
            color: '#10b981',
            background: 'rgba(16,185,129,0.1)',
            padding: '2px 8px',
            borderRadius: 4,
          }}>
            ● ACTIVE
          </span>
        )}
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: 8,
        padding: 16,
        maxHeight: 300,
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        whiteSpace: 'pre-wrap',
        lineHeight: 1.6,
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        {detail?.content}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FILE UPLOAD DROP ZONE
// ═══════════════════════════════════════════════════════════════
function UploadDropZone({ onUpload, uploading }: { 
  onUpload: (file: File, name?: string, frequency?: string) => void; 
  uploading: boolean;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState('');
  const [frequency, setFrequency] = useState('MEDIUM');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.txt')) {
      setFile(droppedFile);
      setCustomName(droppedFile.name.replace('.txt', ''));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setCustomName(selectedFile.name.replace('.txt', ''));
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file, customName, frequency);
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h4 style={{ 
        margin: '0 0 16px', 
        fontSize: 12, 
        fontFamily: 'monospace', 
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 1,
      }}>
        📤 NEUER WRAPPER HOCHLADEN
      </h4>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#00d4ff' : 'rgba(255,255,255,0.2)'}`,
          borderRadius: 12,
          padding: 32,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? 'rgba(0,212,255,0.05)' : 'rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          marginBottom: 16,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        {file ? (
          <div>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
            <div style={{ color: '#00d4ff', fontFamily: 'monospace' }}>{file.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4 }}>
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
            <div style={{ color: 'rgba(255,255,255,0.6)' }}>
              Drag & Drop .txt Datei hier
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>
              oder klicken zum Auswählen
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      {file && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ 
              display: 'block', 
              fontSize: 11, 
              color: 'rgba(255,255,255,0.4)', 
              marginBottom: 6,
              fontFamily: 'monospace',
            }}>
              WRAPPER NAME
            </label>
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>
          <div style={{ minWidth: 150 }}>
            <label style={{ 
              display: 'block', 
              fontSize: 11, 
              color: 'rgba(255,255,255,0.4)', 
              marginBottom: 6,
              fontFamily: 'monospace',
            }}>
              FREQUENZ
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 14,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="RAW">RAW</option>
            </select>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading || !customName}
          style={{
            width: '100%',
            padding: '16px 32px',
            borderRadius: 12,
            border: 'none',
            background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
            color: '#030b15',
            fontSize: 14,
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading || !customName ? 0.5 : 1,
            boxShadow: '0 0 30px rgba(0,212,255,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          {uploading ? 'UPLOADING...' : '⚡ HOCHLADEN'}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN WRAPPER CONTROL COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function WrapperControl() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activating, setActivating] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedWrapper, setSelectedWrapper] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch wrappers
  const fetchWrappers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getWrappers();
      setWrappers(data.wrappers);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWrappers();
  }, [fetchWrappers]);

  // Activate wrapper
  const handleActivate = async (name: string) => {
    try {
      setActivating(name);
      await api.activateWrapper(name);
      setMessage({ type: 'success', text: `${name} aktiviert!` });
      await fetchWrappers();
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setActivating(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Upload wrapper
  const handleUpload = async (file: File, name?: string, frequency?: string) => {
    try {
      setUploading(true);
      if (name) {
        await api.uploadWrapperMeta(file, { name, frequency });
      } else {
        await api.uploadWrapper(file);
      }
      setMessage({ type: 'success', text: 'Wrapper hochgeladen!' });
      await fetchWrappers();
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const activeWrapper = wrappers.find(w => w.is_active);

  return (
    <GlassCard style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24 
      }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: 14, 
          fontFamily: 'monospace', 
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ fontSize: 18 }}>📦</span>
          WRAPPER CONTROL
        </h2>
        <button
          onClick={fetchWrappers}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.4)',
            padding: '6px 12px',
            borderRadius: 6,
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: 11,
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {/* Active Wrapper Indicator */}
      {activeWrapper && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 12,
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: 10,
          marginBottom: 20,
        }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#00d4ff',
            boxShadow: '0 0 12px #00d4ff',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Aktiver Wrapper:</span>
          <span style={{ fontFamily: 'monospace', color: '#00d4ff', fontWeight: 600 }}>
            {activeWrapper.name.replace('syntex_wrapper_', '').toUpperCase()}
          </span>
        </div>
      )}

      {/* Message */}
      {message && (
        <div style={{
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: message.type === 'success' ? '#10b981' : '#ef4444',
          fontSize: 13,
          fontFamily: 'monospace',
        }}>
          {message.type === 'success' ? '✓' : '✕'} {message.text}
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          color: '#ef4444',
          fontSize: 13,
        }}>
          Error: {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.4)' }}>
          Loading wrappers...
        </div>
      ) : (
        <>
          {/* Wrapper List */}
          <div style={{ marginBottom: 24 }}>
            {wrappers.map((wrapper) => (
              <WrapperRow
                key={wrapper.name}
                wrapper={wrapper}
                onActivate={() => handleActivate(wrapper.name)}
                onSelect={() => setSelectedWrapper(wrapper.name)}
                activating={activating === wrapper.name}
              />
            ))}
          </div>

          {/* Wrapper Detail Panel */}
          {selectedWrapper && (
            <GlassCard style={{ marginBottom: 24 }} glowColor="#d946ef">
              <WrapperDetail 
                wrapperName={selectedWrapper} 
                onClose={() => setSelectedWrapper(null)} 
              />
            </GlassCard>
          )}

          {/* Upload Section */}
          <UploadDropZone onUpload={handleUpload} uploading={uploading} />
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </GlassCard>
  );
}
