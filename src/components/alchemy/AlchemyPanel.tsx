"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { COLORS, STYLE_COLORS, STYLE_ICONS } from './constants';
import { KEYFRAMES } from './animations';
import type { Style, AlchemyResult, Particle } from './types';
import { StyleCard } from './cards';
import { GrimoireModal, StyleEditorModal, DeleteModal } from './modals';

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ⚗️ ALCHEMY LAB - DAS GRIMOIRE DER WORT-TRANSMUTATION                   ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export default function AlchemyPanel() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('berlin_slang');
  const [inputText, setInputText] = useState('Das ist ein krass geiler Test für die Wort-Transmutation!');
  const [result, setResult] = useState<AlchemyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [transforming, setTransforming] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const [showStyleEditor, setShowStyleEditor] = useState(false);
  const [editingStyle, setEditingStyle] = useState<Style | null>(null);
  const [isNewStyle, setIsNewStyle] = useState(false);
  const [showGrimoire, setShowGrimoire] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [styleToDelete, setStyleToDelete] = useState('');

  const loadStyles = useCallback(() => {
    api.getStyles().then((data: any) => { setStyles(data.styles || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { loadStyles(); }, [loadStyles]);

  const handleTransform = async () => {
    if (!inputText.trim() || !selectedStyle) return;
    setTransforming(true); setIsShaking(true); setGlowIntensity(100);
    const currentColor = STYLE_COLORS[selectedStyle] || COLORS.purple;
    setParticles(Array.from({length: 30}, (_, i) => ({ id: Date.now() + i, x: 50 + (Math.random() - 0.5) * 20, y: 50 + (Math.random() - 0.5) * 20, color: i % 2 === 0 ? currentColor : COLORS.gold, size: 4 + Math.random() * 8, velocity: { x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 } })));
    setTimeout(() => setIsShaking(false), 600);
    setTimeout(() => setGlowIntensity(0), 1200);
    setTimeout(() => setParticles([]), 2000);
    try {
      const data = await api.alchemyPreview({ text: inputText, style: selectedStyle });
      setShowResult(false);
      setTimeout(() => { setResult(data as unknown as AlchemyResult); setShowResult(true); }, 400);
    } catch (e) { console.error(e); }
    finally { setTransforming(false); }
  };

  const currentColor = STYLE_COLORS[selectedStyle] || COLORS.purple;
  const currentStyle = styles.find(s => s.name === selectedStyle);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 120, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 80, animation: 'spin 2s linear infinite', filter: `drop-shadow(0 0 30px ${COLORS.magenta})` }}>⚗️</div>
      <div style={{ fontFamily: 'monospace', fontSize: 20, color: COLORS.magenta, marginTop: 28, letterSpacing: 4, animation: 'pulse 1.5s ease-in-out infinite' }}>ÖFFNE DAS GRIMOIRE...</div>
      <style>{KEYFRAMES}</style>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      {particles.length > 0 && <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>{particles.map(p => <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: p.color, boxShadow: `0 0 ${p.size * 2}px ${p.color}`, animation: 'particleFly 1.5s ease-out forwards', '--tx': `${p.velocity.x * 20}px`, '--ty': `${p.velocity.y * 20}px` } as React.CSSProperties} />)}</div>}

      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 300, background: `radial-gradient(circle, ${COLORS.magenta}20, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 24, marginBottom: 16, position: 'relative' }}>
          <div style={{ width: 90, height: 90, borderRadius: 28, background: `linear-gradient(135deg, ${COLORS.magenta}50, ${COLORS.gold}30)`, border: `3px solid ${COLORS.magenta}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, boxShadow: `0 0 80px ${COLORS.magenta}50, inset 0 0 30px ${COLORS.magenta}30`, animation: 'iconFloat 3s ease-in-out infinite' }}>⚗️</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 48, fontWeight: 900, letterSpacing: 10, background: `linear-gradient(135deg, ${COLORS.magenta}, ${COLORS.gold}, ${COLORS.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 0 30px ${COLORS.magenta}50)` }}>ALCHEMY LAB</h2>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: 4, marginTop: 4 }}>DAS GRIMOIRE DER WORT-TRANSMUTATION</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.gold, letterSpacing: 3, display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 18 }}>🎨</span> STYLES ({styles.length})</div>
        <button onClick={() => { setEditingStyle(null); setIsNewStyle(true); setShowStyleEditor(true); }} style={{ padding: '12px 24px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.green}30, ${COLORS.green}10)`, border: `2px solid ${COLORS.green}`, color: COLORS.green, fontFamily: 'monospace', fontSize: 13, fontWeight: 800, letterSpacing: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 0 30px ${COLORS.green}20` }}><span>✨</span> NEUER STYLE</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 40 }}>
        {styles.map((style, idx) => <div key={style.name} style={{ animation: `slideInUp 0.4s ease ${idx * 0.1}s both` }}><StyleCard style={style} isSelected={selectedStyle === style.name} onSelect={() => setSelectedStyle(style.name)} onEdit={() => { setEditingStyle(style); setIsNewStyle(false); setShowStyleEditor(true); }} onGrimoire={() => { setEditingStyle(style); setShowGrimoire(true); }} onDelete={() => { setStyleToDelete(style.name); setShowDeleteModal(true); }} /></div>)}
      </div>

      <div style={{ padding: 32, borderRadius: 24, background: `linear-gradient(135deg, ${COLORS.dark}f0, ${COLORS.darker}f8)`, border: `2px solid ${currentColor}40`, boxShadow: glowIntensity > 0 ? `0 0 ${80 + glowIntensity}px ${currentColor}60, inset 0 0 60px ${currentColor}10` : `0 0 50px ${currentColor}25`, transition: 'box-shadow 0.4s ease', animation: isShaking ? 'shake 0.6s ease' : 'none', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 20% 80%, ${currentColor}10, transparent 50%), radial-gradient(circle at 80% 20%, ${COLORS.gold}10, transparent 50%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 15, fontFamily: 'monospace', color: currentColor, marginBottom: 20, letterSpacing: 3, display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontSize: 20 }}>🧪</span>TRANSMUTATION ZONE{currentStyle && <span style={{ padding: '6px 14px', background: `${currentColor}20`, border: `1px solid ${currentColor}50`, borderRadius: 20, fontSize: 12 }}>{STYLE_ICONS[selectedStyle] || '⚗️'} {selectedStyle.toUpperCase().replace(/_/g, ' ')}</span>}</div>
          <textarea value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Gib deinen Text ein..." style={{ width: '100%', minHeight: 120, padding: 20, borderRadius: 16, border: `1px solid ${currentColor}30`, background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'monospace', fontSize: 15, lineHeight: 1.7, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
          <button onClick={handleTransform} disabled={transforming || !inputText.trim()} style={{ width: '100%', marginTop: 20, padding: 20, borderRadius: 16, border: `2px solid ${currentColor}`, background: `linear-gradient(135deg, ${currentColor}40, ${currentColor}15)`, color: currentColor, fontFamily: 'monospace', fontSize: 18, fontWeight: 900, letterSpacing: 4, cursor: transforming ? 'wait' : 'pointer', boxShadow: `0 0 40px ${currentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>{transforming ? <><span style={{ animation: 'spin 1s linear infinite' }}>⚗️</span>TRANSMUTIERE...</> : <><span>⚗️</span>TRANSMUTIEREN</>}</button>

          {result && showResult && (
            <div style={{ marginTop: 28, padding: 24, borderRadius: 18, background: `linear-gradient(135deg, ${currentColor}15, ${currentColor}05)`, border: `1px solid ${currentColor}40`, animation: 'slideInUp 0.5s ease' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontFamily: 'monospace', letterSpacing: 2 }}>TRANSMUTATION COMPLETE:</div>
              <div style={{ fontSize: 16, color: 'white', fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap', padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>{result.transformed}</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                <div style={{ padding: '12px 20px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.gold}20, ${COLORS.gold}08)`, border: `1px solid ${COLORS.gold}50` }}><div style={{ fontSize: 24, color: COLORS.gold, fontWeight: 900 }}>{result.stats?.alchemy_count || 0}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Transmutationen</div></div>
                <div style={{ padding: '12px 20px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.cyan}20, ${COLORS.cyan}08)`, border: `1px solid ${COLORS.cyan}50` }}><div style={{ fontSize: 24, color: COLORS.cyan, fontWeight: 900 }}>{result.original.length} → {result.transformed.length}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Zeichen</div></div>
                {(result.stats?.forbidden_count || 0) > 0 && <div style={{ padding: '12px 20px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}08)`, border: `1px solid ${COLORS.red}50` }}><div style={{ fontSize: 24, color: COLORS.red, fontWeight: 900 }}>{result.stats?.forbidden_count}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Entfernt</div></div>}
              </div>
              {result.transformations?.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontFamily: 'monospace', letterSpacing: 2 }}>TRANSFORMATIONEN:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.transformations.map((t, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: 'monospace', padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 8, animation: `slideInLeft 0.3s ease ${i * 0.05}s both` }}><span style={{ color: COLORS.red, textDecoration: 'line-through' }}>{t.original}</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>→</span><span style={{ color: COLORS.green }}>{t.replacement}</span><span style={{ marginLeft: 'auto', padding: '3px 8px', borderRadius: 6, background: t.type === 'forbidden' ? `${COLORS.red}25` : `${COLORS.gold}25`, color: t.type === 'forbidden' ? COLORS.red : COLORS.gold, fontSize: 10, fontWeight: 700 }}>{t.type.toUpperCase()}</span></div>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showStyleEditor && <StyleEditorModal style={editingStyle} isNew={isNewStyle} onClose={() => setShowStyleEditor(false)} onSave={loadStyles} />}
      {showGrimoire && editingStyle && <GrimoireModal style={editingStyle} onClose={() => setShowGrimoire(false)} onSave={loadStyles} />}
      {showDeleteModal && <DeleteModal styleName={styleToDelete} onClose={() => setShowDeleteModal(false)} onConfirm={() => { loadStyles(); if (selectedStyle === styleToDelete && styles.length > 1) setSelectedStyle(styles.find(s => s.name !== styleToDelete)?.name || ''); }} />}
      <style>{KEYFRAMES}</style>
    </div>
  );
}
