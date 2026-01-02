"use client";
import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { COLORS, WrapperDetail, getWrapperColor } from '../types';

interface FormatOption {
  [key: string]: any;
  name: string;
  fields_count: number;
  description?: string;
}

interface FormatField {
  name: string;
  weight: number;
  enabled: boolean;
}

interface EditModalProps {
  wrapper: WrapperDetail | null;
  onClose: () => void;
  onSave: (content: string, formatData?: { format: string; fields: { name: string; weight: number; enabled: boolean }[] }) => Promise<void>;
  saving: boolean;
}

export default function EditModal({ wrapper, onClose, onSave, saving }: EditModalProps) {
  const [content, setContent] = useState('');
  
  // FORMAT INTEGRATION
  const [formats, setFormats] = useState<FormatOption[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [originalFormat, setOriginalFormat] = useState<string>('');
  const [formatFields, setFormatFields] = useState<FormatField[]>([]);
  const [originalFormatFields, setOriginalFormatFields] = useState<FormatField[]>([]);
  const [loadingFormats, setLoadingFormats] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // VIEW MODE
  const [previewMode, setPreviewMode] = useState<'wrapper' | 'format' | 'combined'>('combined');
  
  useEffect(() => {
    if (wrapper) {
      setContent(wrapper.content);
      loadFormats();
    }
  }, [wrapper]);

  const loadFormats = async () => {
    setLoadingFormats(true);
    try {
      const data = await api.getFormats();
      setFormats((data.formats || []).map((f: any) => ({ name: f.name, fields_count: f.fields_count || f.fields?.length || 0, description: f.description })));
      
      // Use wrapper's bound format if available, otherwise use first format
      const boundFormat = wrapper?.meta?.format || wrapper?.format_binding || '';
      const initialFormat = boundFormat || (data.formats?.length > 0 ? data.formats[0].name : '');
      
      if (initialFormat) {
        setSelectedFormat(initialFormat);
        setOriginalFormat(initialFormat);
        await loadFormatFields(initialFormat);
        // Jetzt originalFormatFields setzen (nur einmal beim Init)
        const initDetail = await api.getFormat(initialFormat);
        const initFormat = (initDetail as any).format || initDetail;
        const initFields = (initFormat.fields || []).map((f: any) => ({ name: f.name, weight: f.weight || 17, enabled: true }));
        setOriginalFormatFields(initFields);
      }
    } catch (err) {
      console.error('Failed to load formats:', err);
    } finally {
      setLoadingFormats(false);
    }
  };

  const loadFormatFields = async (formatName: string) => {
    try {
      const detail = await api.getFormat(formatName);
      const format = (detail as any).format || detail;
      const fields = (format.fields || []).map((f: any) => ({
        name: f.name,
        weight: f.weight || 17,
        enabled: true
      }));
      setFormatFields(fields);
      // originalFormatFields wird nur beim ersten Load gesetzt, nicht bei Format-Wechsel
    } catch (err) {
      console.error('Failed to load format:', err);
      setFormatFields([]);
    }
  };

  const handleFormatChange = async (formatName: string) => {
    setSelectedFormat(formatName);
    await loadFormatFields(formatName);
  };

  const toggleField = (index: number) => {
    setFormatFields(formatFields.map((f, i) => 
      i === index ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const updateWeight = (index: number, weight: number) => {
    setFormatFields(formatFields.map((f, i) => 
      i === index ? { ...f, weight } : f
    ));
  };

  if (!wrapper) return null;
  const color = getWrapperColor(wrapper.name);
  const estimatedSize = new Blob([content]).size;
  const formatChanged = selectedFormat !== originalFormat;
  const formatFieldsChanged = JSON.stringify(formatFields) !== JSON.stringify(originalFormatFields);
  const hasChanges = content !== wrapper.content || formatFieldsChanged || formatChanged;
  console.log("DEBUG:", { selectedFormat, originalFormat, formatChanged, formatFieldsChanged, hasChanges });
  const enabledFields = formatFields.filter(f => f.enabled);

  // 🔥 GENERATE COMBINED PROMPT PREVIEW
  const generateFormatInjection = () => {
    if (enabledFields.length === 0) return '';
    
    let injection = '\n\n// ═══════════════════════════════════════════════════════════════\n';
    injection += `// 📋 FORMAT INJECTION: ${selectedFormat.toUpperCase()}\n`;
    injection += '// ═══════════════════════════════════════════════════════════════\n\n';
    injection += 'WICHTIG: Deine Antwort MUSS EXAKT in diesem Format sein:\n\n';
    
    enabledFields.forEach(field => {
      injection += `### ${field.name.toUpperCase()}:\n`;
      injection += `[Deine Analyse zu ${field.name}... (Weight: ${field.weight})]\n\n`;
    });
    
    return injection;
  };

  const getCombinedPrompt = () => {
    return content + generateFormatInjection();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `2px solid ${color}50`, width: '98%', maxWidth: 1400, height: '95vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: `0 0 60px ${color}30` }}>
        <div className="scan-line" style={{ '--scan-color': color } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="pulse" style={{ width: 46, height: 46, borderRadius: 12, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔄</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }}>WRAPPER MODULIEREN</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name}</span>
                {wrapper.is_active && <span style={{ padding: '2px 8px', borderRadius: 10, background: 'rgba(16,185,129,0.2)', fontSize: 9, color: COLORS.green }}>🎯 AKTIV</span>}
                {hasChanges && <span style={{ padding: '2px 8px', borderRadius: 10, background: 'rgba(245,158,11,0.2)', fontSize: 9, color: COLORS.orange }}>● GEÄNDERT</span>}
              </div>
            </div>
          </div>
          
          {/* PREVIEW MODE TOGGLE */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 4 }}>
            {(['wrapper', 'format', 'combined'] as const).map(mode => (
              <button key={mode} onClick={() => setPreviewMode(mode)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: previewMode === mode ? color : 'transparent', color: previewMode === mode ? '#030b15' : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 10, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>
                {mode === 'wrapper' ? '📦 Wrapper' : mode === 'format' ? '📋 Format' : '🔥 Combined'}
              </button>
            ))}
          </div>
          
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT - 3 COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: WRAPPER EDITOR */}
          <div style={{ padding: 20, borderRight: `1px solid ${color}20`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, background: color, borderRadius: 2 }} />
                📦 WRAPPER CONTENT
              </label>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{content.split('\n').length} Zeilen</span>
            </div>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              style={{ flex: 1, width: '100%', padding: 14, borderRadius: 12, border: `1px solid ${color}30`, background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.9)', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.6, outline: 'none', resize: 'none' }} 
            />
          </div>

          {/* MIDDLE: FORMAT CONTROLS */}
          <div style={{ padding: 20, borderRight: `1px solid ${color}20`, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
            <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, background: COLORS.magenta, borderRadius: 2 }} />
              📋 FORMAT INJECTION
            </label>
            {/* FORMAT SELECTOR - CYBER DROPDOWN */}
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <div 
                onClick={() => !loadingFormats && setDropdownOpen(!dropdownOpen)}
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  borderRadius: 12, 
                  border: '1px solid rgba(217,70,239,0.4)', 
                  background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(0,0,0,0.4))',
                  color: selectedFormat ? COLORS.magenta : 'rgba(255,255,255,0.5)', 
                  fontFamily: 'monospace', 
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: loadingFormats ? 'wait' : 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: dropdownOpen ? '0 0 20px rgba(217,70,239,0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{selectedFormat ? selectedFormat.toUpperCase() : '📋 Format wählen...'}</span>
                <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: 4,
                  background: 'linear-gradient(145deg, rgba(10,26,46,0.98), rgba(6,13,24,0.98))',
                  border: '1px solid rgba(217,70,239,0.4)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  zIndex: 100,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(217,70,239,0.2)',
                  maxHeight: 250,
                  overflowY: 'auto'
                }}>
                  <div 
                    onClick={() => { handleFormatChange(''); setDropdownOpen(false); }}
                    style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 12, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,70,239,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    ❌ Kein Format
                  </div>
                  {formats.map(f => (
                    <div 
                      key={f.name}
                      onClick={() => { handleFormatChange(f.name); setDropdownOpen(false); }}
                      style={{ 
                        padding: '12px 16px', 
                        cursor: 'pointer', 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        background: selectedFormat === f.name ? 'rgba(217,70,239,0.2)' : 'transparent',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,70,239,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.background = selectedFormat === f.name ? 'rgba(217,70,239,0.2)' : 'transparent'}
                    >
                      <span style={{ color: COLORS.magenta, fontFamily: 'monospace', fontSize: 12, fontWeight: 700 }}>{f.name.toUpperCase()}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{f.fields_count} Felder</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                🎯 FELDER ({enabledFields.length}/{formatFields.length} aktiv)
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {formatFields.map((field, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: field.enabled ? 'rgba(217,70,239,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${field.enabled ? 'rgba(217,70,239,0.3)' : 'rgba(255,255,255,0.05)'}`, opacity: field.enabled ? 1 : 0.5 }}>
                    <input 
                      type="checkbox" 
                      checked={field.enabled} 
                      onChange={() => toggleField(i)} 
                      style={{ accentColor: COLORS.magenta, cursor: 'pointer' }} 
                    />
                    <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 10, color: field.enabled ? COLORS.magenta : 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{field.name}</span>
                    <input 
                      type="number" 
                      value={field.weight} 
                      onChange={e => updateWeight(i, parseInt(e.target.value) || 0)}
                      style={{ width: 40, padding: '4px 6px', borderRadius: 4, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: COLORS.orange, fontFamily: 'monospace', fontSize: 10, textAlign: 'center' }}
                    />
                  </div>
                ))}
              </div>

              {formatFields.length === 0 && selectedFormat && (
                <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                  Lade Felder...
                </div>
              )}

              {!selectedFormat && (
                <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                  Wähle ein Format
                </div>
              )}
            </div>

            {/* STATS */}
            <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.cyan }}>{content.length + generateFormatInjection().length}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOTAL CHARS</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.orange }}>{enabledFields.reduce((a, b) => a + b.weight, 0)}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOTAL WEIGHT</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="live-preview" style={{ padding: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>👁️</span>
                <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.green }}>
                  {previewMode === 'wrapper' ? 'WRAPPER PREVIEW' : previewMode === 'format' ? 'FORMAT PREVIEW' : '🔥 FINALER PROMPT'}
                </h4>
              </div>
              <span style={{ fontSize: 9, padding: '4px 10px', borderRadius: 20, background: previewMode === 'combined' ? 'rgba(16,185,129,0.2)' : 'rgba(217,70,239,0.2)', color: previewMode === 'combined' ? COLORS.green : COLORS.magenta }}>
                {previewMode === 'combined' ? 'Was die AI sieht' : previewMode === 'wrapper' ? 'Nur Wrapper' : 'Nur Format'}
              </span>
            </div>

            <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: 12, border: `1px solid ${previewMode === 'combined' ? COLORS.green : COLORS.magenta}30`, padding: 16, overflow: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {previewMode === 'wrapper' && content}
                {previewMode === 'format' && (selectedFormat ? generateFormatInjection() : 'Wähle ein Format um die Injection zu sehen...')}
                {previewMode === 'combined' && (
                  <>
                    <span style={{ color: COLORS.cyan }}>{content}</span>
                    {selectedFormat && enabledFields.length > 0 && (
                      <span style={{ color: COLORS.magenta }}>{generateFormatInjection()}</span>
                    )}
                  </>
                )}
              </pre>
            </div>

            {/* COMBINED STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
              <div style={{ padding: 10, background: 'rgba(0,212,255,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.cyan }}>{content.split('\n').length}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>WRAPPER</div>
              </div>
              <div style={{ padding: 10, background: 'rgba(217,70,239,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.magenta }}>{enabledFields.length}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>FELDER</div>
              </div>
              <div style={{ padding: 10, background: 'rgba(16,185,129,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.green }}>{getCombinedPrompt().split('\n').length}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOTAL</div>
              </div>
              <div style={{ padding: 10, background: 'rgba(245,158,11,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.orange }}>~{Math.round(getCombinedPrompt().length / 4)}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '14px 24px', borderTop: `1px solid ${color}20`, background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
              📦 {wrapper.size_human} → {(estimatedSize / 1024).toFixed(1)} KB
            </span>
            {selectedFormat && (
              <span style={{ fontSize: 11, color: COLORS.magenta, fontFamily: 'monospace' }}>
                📋 {selectedFormat.toUpperCase()} ({enabledFields.length} Felder)
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onClose} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 12, cursor: 'pointer' }}>ABBRECHEN</button>
            <button onClick={() => onSave(content, selectedFormat ? { format: selectedFormat, fields: formatFields } : undefined)} disabled={saving || !hasChanges} className="cyber-btn" style={{ padding: '12px 32px', borderRadius: 10, border: 'none', background: hasChanges && !saving ? `linear-gradient(135deg, ${color}, ${color}cc)` : 'rgba(255,255,255,0.1)', color: '#030b15', fontFamily: 'monospace', fontSize: 12, fontWeight: 800, cursor: hasChanges && !saving ? 'pointer' : 'not-allowed' }}>
              {saving ? '⏳ MODULIERT...' : '🔄 MODULIEREN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
