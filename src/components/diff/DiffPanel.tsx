"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 COLORS
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

const WRAPPER_COLORS = [COLORS.cyan, COLORS.magenta, COLORS.green, COLORS.orange, COLORS.purple];

// ═══════════════════════════════════════════════════════════════════════════
// 🔀 INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface Wrapper {
  name: string;
  is_active: boolean;
}

interface DiffComparison {
  wrapper: string;
  response: string;
  latency_ms: number;
  format_fields: string[];
  error?: string;
}

interface DiffResult {
  prompt: string;
  comparisons: DiffComparison[];
  diff_analysis: {
    total_comparisons: number;
    successful: number;
    failed: number;
    avg_response_length: number;
    total_latency_ms: number;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔀 MAIN DIFF PANEL
// ═══════════════════════════════════════════════════════════════════════════

export default function DiffPanel() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [selectedWrappers, setSelectedWrappers] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('Was ist System?');
  const [maxTokens, setMaxTokens] = useState(100);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [result, setResult] = useState<DiffResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Load wrappers
  useEffect(() => {
    api.getWrappers().then((data: any) => {
      setWrappers(data.wrappers || []);
      // Pre-select first 2 wrappers
      if (data.wrappers?.length >= 2) {
        setSelectedWrappers([data.wrappers[0].name, data.wrappers[1].name]);
      }
      setLoading(false);
    }).catch(console.error);
  }, []);

  // Toggle wrapper selection
  const toggleWrapper = (name: string) => {
    setSelectedWrappers(prev => {
      if (prev.includes(name)) {
        return prev.filter(w => w !== name);
      }
      if (prev.length >= 4) {
        return prev; // Max 4 wrappers
      }
      return [...prev, name];
    });
  };

  // Run diff comparison
  const handleCompare = async () => {
    if (!prompt.trim() || selectedWrappers.length < 2) return;
    
    console.log("DIFF COMPARE", { prompt, wrappers: selectedWrappers });
    
    setComparing(true);
    setGlowIntensity(100);
    setShowResult(false);
    
    try {
      const data = await api.diff({
        prompt,
        wrappers: selectedWrappers,
        max_new_tokens: maxTokens
      });
      
      setTimeout(() => {
        setResult(data as any);
        setShowResult(true);
      }, 300);
    } catch (e) {
      console.error(e);
    } finally {
      setComparing(false);
      setTimeout(() => setGlowIntensity(0), 1000);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 100 }}>
        <div style={{ fontSize: 72, animation: 'pulse 1s infinite' }}>🔀</div>
        <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.purple, marginTop: 24 }}>
          LADE PARALLELWELTEN...
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: 24,
            background: `linear-gradient(135deg, ${COLORS.purple}40, ${COLORS.cyan}20)`,
            border: `2px solid ${COLORS.purple}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42,
            boxShadow: `0 0 60px ${COLORS.purple}40`,
            animation: 'pulse 2s infinite'
          }}>🔀</div>
          <h2 style={{ 
            margin: 0, fontFamily: 'monospace', fontSize: 42, fontWeight: 900, letterSpacing: 8,
            background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.cyan}, ${COLORS.magenta})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            DIFF ZONE
          </h2>
        </div>
        <div style={{ fontSize: 16, fontFamily: 'monospace', color: COLORS.cyan }}>
          Wrapper Parallelwelt-Vergleich
        </div>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
          Gleicher Prompt → Verschiedene Wrapper → Vergleiche die Resonanz
        </div>
      </div>

      {/* WRAPPER SELECTION */}
      <div style={{ 
        padding: 24, borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 24
      }}>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.purple, marginBottom: 16, letterSpacing: 2 }}>
          📦 WRAPPERS AUSWÄHLEN (2-4)
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {wrappers.map((wrapper, idx) => {
            const isSelected = selectedWrappers.includes(wrapper.name);
            const selectionIndex = selectedWrappers.indexOf(wrapper.name);
            const color = isSelected ? WRAPPER_COLORS[selectionIndex % WRAPPER_COLORS.length] : 'rgba(255,255,255,0.3)';
            
            return (
              <button
                key={wrapper.name}
                onClick={() => toggleWrapper(wrapper.name)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: `2px solid ${color}`,
                  background: isSelected ? `${color}20` : 'transparent',
                  color: color,
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: isSelected ? 800 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: isSelected ? `0 0 20px ${color}30` : 'none'
                }}
              >
                {isSelected && <span style={{ 
                  width: 24, height: 24, borderRadius: '50%', 
                  background: color, color: 'black',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 900
                }}>{selectionIndex + 1}</span>}
                {wrapper.name.replace('syntex_wrapper_', '').toUpperCase()}
                {wrapper.is_active && <span style={{ fontSize: 10 }}>⚡</span>}
              </button>
            );
          })}
        </div>
        {selectedWrappers.length < 2 && (
          <div style={{ marginTop: 12, fontSize: 13, color: COLORS.orange }}>
            ⚠️ Wähle mindestens 2 Wrappers für den Vergleich
          </div>
        )}
      </div>

      {/* PROMPT INPUT */}
      <div style={{ 
        padding: 24, borderRadius: 20,
        background: `linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))`,
        border: `2px solid ${COLORS.purple}40`,
        boxShadow: glowIntensity > 0 ? `0 0 ${60 + glowIntensity}px ${COLORS.purple}50` : `0 0 40px ${COLORS.purple}20`,
        marginBottom: 24,
        transition: 'box-shadow 0.3s ease'
      }}>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.cyan, marginBottom: 16, letterSpacing: 2 }}>
          💬 PROMPT
        </div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Gib deinen Prompt ein..."
          style={{
            width: '100%',
            minHeight: 100,
            padding: 16,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: 16,
            resize: 'vertical',
            outline: 'none'
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>
              Max Tokens
            </label>
            <input
              type="number"
              value={maxTokens}
              onChange={e => setMaxTokens(Number(e.target.value))}
              min={30}
              max={500}
              style={{
                width: 100,
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 14
              }}
            />
          </div>
          
          <button
            onClick={handleCompare}
            disabled={comparing || selectedWrappers.length < 2 || !prompt.trim()}
            style={{
              flex: 1,
              padding: '16px 32px',
              borderRadius: 16,
              border: `2px solid ${COLORS.purple}`,
              background: comparing 
                ? `${COLORS.purple}30`
                : `linear-gradient(135deg, ${COLORS.purple}40, ${COLORS.cyan}20)`,
              color: COLORS.purple,
              fontFamily: 'monospace',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 3,
              cursor: comparing ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: `0 0 30px ${COLORS.purple}30`,
              transition: 'all 0.3s ease',
              opacity: (selectedWrappers.length < 2 || !prompt.trim()) ? 0.5 : 1
            }}
          >
            <span style={{ fontSize: 24 }}>🔀</span>
            {comparing ? `VERGLEICHE ${selectedWrappers.length} WELTEN...` : 'PARALLELWELTEN ÖFFNEN'}
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {result && showResult && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          
          {/* ANALYSIS SUMMARY */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: 16, 
            marginBottom: 24 
          }}>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.green}15`, border: `1px solid ${COLORS.green}40` }}>
              <div style={{ fontSize: 28, color: COLORS.green, fontWeight: 900, fontFamily: 'monospace' }}>
                {result.diff_analysis.successful}/{result.diff_analysis.total_comparisons}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Erfolgreich</div>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.orange}15`, border: `1px solid ${COLORS.orange}40` }}>
              <div style={{ fontSize: 28, color: COLORS.orange, fontWeight: 900, fontFamily: 'monospace' }}>
                {(result.diff_analysis?.total_latency_ms ? (result.diff_analysis?.total_latency_ms ? (result.diff_analysis.total_latency_ms / 1000).toFixed(1) : "0") : "0")}s
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Total Latency</div>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}40` }}>
              <div style={{ fontSize: 28, color: COLORS.cyan, fontWeight: 900, fontFamily: 'monospace' }}>
                {result.diff_analysis.avg_response_length}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Ø Zeichen</div>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}40` }}>
              <div style={{ fontSize: 28, color: COLORS.purple, fontWeight: 900, fontFamily: 'monospace' }}>
                {result.comparisons.length}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Parallelwelten</div>
            </div>
          </div>

          {/* COMPARISON GRID */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${Math.min(result.comparisons.length, 3)}, 1fr)`,
            gap: 16
          }}>
            {result.comparisons.map((comp, idx) => {
              const color = WRAPPER_COLORS[idx % WRAPPER_COLORS.length];
              
              return (
                <div 
                  key={comp.wrapper}
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
                    border: `2px solid ${color}40`,
                    boxShadow: `0 0 30px ${color}20`
                  }}
                >
                  {/* Wrapper Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${color}30`,
                      border: `2px solid ${color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, fontWeight: 900, color: color
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ 
                        fontFamily: 'monospace', fontSize: 16, fontWeight: 800, 
                        color: color, letterSpacing: 1 
                      }}>
                        {comp.wrapper.replace('syntex_wrapper_', '').toUpperCase()}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                        ⚡ {(comp.latency_ms / 1000).toFixed(1)}s
                      </div>
                    </div>
                  </div>

                  {/* Response */}
                  <div style={{
                    padding: 16,
                    borderRadius: 12,
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    maxHeight: 400,
                    overflow: 'auto'
                  }}>
                    <pre style={{
                      margin: 0,
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.85)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontFamily: 'monospace',
                      lineHeight: 1.6
                    }}>
                      {comp.response || comp.error || 'Keine Antwort'}
                    </pre>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 6,
                      background: `${color}20`,
                      fontSize: 11, color: color, fontFamily: 'monospace'
                    }}>
                      {comp.response?.length || 0} chars
                    </span>
                    {comp.format_fields?.length > 0 && (
                      <span style={{
                        padding: '4px 10px', borderRadius: 6,
                        background: `${COLORS.orange}20`,
                        fontSize: 11, color: COLORS.orange, fontFamily: 'monospace'
                      }}>
                        {comp.format_fields.length} Felder
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Comparing Animation */}
      {comparing && (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: 72, animation: 'pulse 0.5s infinite' }}>🔀</div>
          <div style={{ 
            fontFamily: 'monospace', fontSize: 18, color: COLORS.purple, 
            marginTop: 24, animation: 'pulse 1s infinite' 
          }}>
            ÖFFNE {selectedWrappers.length} PARALLELWELTEN...
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            Dies kann {selectedWrappers.length * 10}-{selectedWrappers.length * 30} Sekunden dauern
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
