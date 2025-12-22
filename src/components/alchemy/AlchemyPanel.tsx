"use client";

import React, { useState, useEffect, useCallback } from 'react';
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
  yellow: '#eab308',
  gold: '#fbbf24'
};

const STYLE_COLORS: Record<string, string> = {
  berlin_slang: COLORS.orange,
  zynisch: COLORS.red,
  wissenschaftlich: COLORS.cyan,
  poetisch: COLORS.magenta
};

const STYLE_ICONS: Record<string, string> = {
  berlin_slang: '🍺',
  zynisch: '🙄',
  wissenschaftlich: '🔬',
  poetisch: '🌸'
};

// ═══════════════════════════════════════════════════════════════════════════
// 🔮 INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface Style {
  name: string;
  vibe: string;
  description: string;
  word_alchemy_count: number;
  forbidden_words: string[];
  has_suffix: boolean;
  has_tone_injection: boolean;
}

interface AlchemyResult {
  original: string;
  transformed: string;
  style: string;
  transformations: Array<{
    original: string;
    replacement: string;
    start_pos: number;
    end_pos: number;
    type: string;
  }>;
  stats: {
    alchemy_count: number;
    forbidden_count: number;
    original_length: number;
    transformed_length: number;
    has_suffix: boolean;
    has_tone_injection: boolean;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 STYLE CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function StyleCard({ style, isSelected, onSelect }: { 
  style: Style; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  const color = STYLE_COLORS[style.name] || COLORS.purple;
  const icon = STYLE_ICONS[style.name] || '⚗️';

  return (
    <div 
      onClick={onSelect}
      style={{
        padding: 24,
        borderRadius: 20,
        background: isSelected 
          ? `linear-gradient(135deg, ${color}30, ${color}10)`
          : 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
        border: `2px solid ${isSelected ? color : 'rgba(255,255,255,0.1)'}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? `0 0 40px ${color}30` : 'none',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: `${color}30`,
          border: `2px solid ${color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ 
            margin: 0, fontFamily: 'monospace', fontSize: 18, 
            color: color, fontWeight: 800, letterSpacing: 2,
            textTransform: 'uppercase'
          }}>
            {style.name.replace('_', ' ')}
          </h3>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontStyle: 'italic' }}>
            "{style.vibe}"
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ 
        margin: '0 0 16px 0', fontSize: 14, color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.5
      }}>
        {style.description}
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ 
          padding: '6px 12px', borderRadius: 8,
          background: `${COLORS.gold}20`,
          fontSize: 12, color: COLORS.gold, fontFamily: 'monospace'
        }}>
          ⚗️ {style.word_alchemy_count} Transmutationen
        </div>
        {style.forbidden_words.length > 0 && (
          <div style={{ 
            padding: '6px 12px', borderRadius: 8,
            background: `${COLORS.red}20`,
            fontSize: 12, color: COLORS.red, fontFamily: 'monospace'
          }}>
            🚫 {style.forbidden_words.length} Verboten
          </div>
        )}
        {style.has_tone_injection && (
          <div style={{ 
            padding: '6px 12px', borderRadius: 8,
            background: `${COLORS.green}20`,
            fontSize: 12, color: COLORS.green, fontFamily: 'monospace'
          }}>
            💉 Tone Injection
          </div>
        )}
      </div>

      {/* Forbidden Words */}
      {style.forbidden_words.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
            🚫 VERBOTENE WÖRTER:
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {style.forbidden_words.map((word, i) => (
              <span key={i} style={{
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                fontSize: 12, color: COLORS.red, fontFamily: 'monospace',
                textDecoration: 'line-through'
              }}>
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚗️ MAIN ALCHEMY PANEL
// ═══════════════════════════════════════════════════════════════════════════

export default function AlchemyPanel() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('berlin_slang');
  const [inputText, setInputText] = useState('Das ist ein krass geiler Test für die Wort-Transmutation!');
  const [result, setResult] = useState<AlchemyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [transforming, setTransforming] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number}>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Load styles
  useEffect(() => {
    api.getStyles().then((data: any) => {
      setStyles(data.styles || []);
      setLoading(false);
    }).catch(console.error);
  }, []);

  // Transform text
  const handleTransform = async () => {
    console.log("TRANSMUTIEREN CLICKED", { inputText, selectedStyle });
    
    // Start Effects
    setIsShaking(true);
    setGlowIntensity(100);
    
    // Generate particles
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
    
    // Clear effects after animation
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setGlowIntensity(0), 1000);
    setTimeout(() => setParticles([]), 2000);
    if (!inputText.trim() || !selectedStyle) return;
    setTransforming(true);
    try {
      const data = await api.alchemyPreview({ text: inputText, style: selectedStyle });
      setShowResult(false);
      setTimeout(() => {
        setResult(data as any);
        setShowResult(true);
      }, 100);
    } catch (e) {
      console.error(e);
    } finally {
      setTransforming(false);
    }
  };


  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 100 }}>
        <div style={{ fontSize: 72, animation: 'pulse 1s infinite' }}>⚗️</div>
        <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.magenta, marginTop: 24 }}>
          GRIMOIRE WIRD GEÖFFNET...
        </div>
      </div>
    );
  }

  const currentColor = STYLE_COLORS[selectedStyle] || COLORS.purple;

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: 24,
            background: `linear-gradient(135deg, ${COLORS.magenta}40, ${COLORS.gold}20)`,
            border: `2px solid ${COLORS.magenta}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42,
            boxShadow: `0 0 60px ${COLORS.magenta}40`,
            animation: 'pulse 2s infinite'
          }}>⚗️</div>
          <h2 style={{ 
            margin: 0, fontFamily: 'monospace', fontSize: 42, fontWeight: 900, letterSpacing: 8,
            background: `linear-gradient(135deg, ${COLORS.magenta}, ${COLORS.gold}, ${COLORS.cyan})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            ALCHEMY LAB
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.magenta, boxShadow: `0 0 15px ${COLORS.magenta}` }} />
          <span style={{ fontSize: 16, fontFamily: 'monospace', color: COLORS.gold }}>{styles.length} Styles</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 15, fontFamily: 'monospace', color: COLORS.magenta }}>Wort-Transmutation aktiv</span>
        </div>
      </div>

      {/* STYLE GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: 20, 
        marginBottom: 48 
      }}>
        {styles.map(style => (
          <StyleCard 
            key={style.name}
            style={style}
            isSelected={selectedStyle === style.name}
            onSelect={() => setSelectedStyle(style.name)}
          />
        ))}
      </div>

      {/* TRANSMUTATION ZONE */}
      <div style={{ 
        padding: 32,
        borderRadius: 24,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: `2px solid ${currentColor}40`,
        boxShadow: glowIntensity > 0 ? `0 0 ${60 + glowIntensity}px ${currentColor}80, 0 0 ${100 + glowIntensity}px ${currentColor}40` : `0 0 60px ${currentColor}20`,
        animation: isShaking ? "shake 0.5s ease" : "none"
      }}>
        <div style={{ 
          fontSize: 14, fontFamily: 'monospace', color: currentColor, 
          marginBottom: 24, letterSpacing: 3, textAlign: 'center'
        }}>
          ⚗️ TRANSMUTATION ZONE - {selectedStyle.toUpperCase().replace('_', ' ')}
        </div>

        {/* Input */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', display: 'block', marginBottom: 8 }}>
            📝 ORIGINAL TEXT
          </label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Gib hier deinen Text ein..."
            style={{
              width: '100%',
              minHeight: 120,
              padding: 20,
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: 16,
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        {/* Transform Button */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <button
            onClick={handleTransform}
              
            disabled={transforming || !inputText.trim()}
            style={{
              padding: '16px 48px',
              borderRadius: 16,
              border: `2px solid ${currentColor}`,
              background: `linear-gradient(135deg, ${currentColor}40, ${currentColor}20)`,
              color: currentColor,
              fontFamily: 'monospace',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 3,
              cursor: transforming ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: `0 0 30px ${currentColor}30`,
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{ fontSize: 24 }}>⚗️</span>
            {transforming ? 'TRANSMUTIERE...' : 'TRANSMUTIEREN'}
          </button>
        </div>

        {/* Result */}
        {result && showResult && (
          <div style={{ animation: 'resultReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', display: 'block', marginBottom: 8 }}>
              ✨ TRANSMUTIERTER TEXT
            </label>
            <div style={{
              padding: 20,
              borderRadius: 16,
              border: `2px solid ${currentColor}50`,
              background: `${currentColor}10`,
              marginBottom: 24
            }}>
              <p style={{ 
                margin: 0, fontSize: 18, color: 'white', lineHeight: 1.6,
                fontFamily: 'monospace'
              }}>
                {result.transformed}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <div style={{ 
                padding: '12px 20px', borderRadius: 12,
                background: `${COLORS.gold}20`,
                border: `1px solid ${COLORS.gold}40`
              }}>
                <div style={{ fontSize: 24, color: COLORS.gold, fontWeight: 900, fontFamily: 'monospace' }}>
                  {result.stats.alchemy_count}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Transmutationen</div>
              </div>
              <div style={{ 
                padding: '12px 20px', borderRadius: 12,
                background: `${COLORS.cyan}20`,
                border: `1px solid ${COLORS.cyan}40`
              }}>
                <div style={{ fontSize: 24, color: COLORS.cyan, fontWeight: 900, fontFamily: 'monospace' }}>
                  {result.stats.original_length} → {result.stats.transformed_length}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Zeichen</div>
              </div>
              {result.stats.forbidden_count > 0 && (
                <div style={{ 
                  padding: '12px 20px', borderRadius: 12,
                  background: `${COLORS.red}20`,
                  border: `1px solid ${COLORS.red}40`
                }}>
                  <div style={{ fontSize: 24, color: COLORS.red, fontWeight: 900, fontFamily: 'monospace' }}>
                    {result.stats.forbidden_count}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Entfernt</div>
                </div>
              )}
            </div>

            {/* Transformations Detail */}
            {result.transformations.length > 0 && (
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 12 }}>
                  🔄 TRANSFORMATIONEN
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.transformations.map((t, i) => (
                    <div key={i} style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16
                    }}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: 6,
                        background: 'rgba(239,68,68,0.2)',
                        color: COLORS.red, fontSize: 14, fontFamily: 'monospace',
                        textDecoration: 'line-through'
                      }}>
                        {t.original}
                      </span>
                      <span style={{ color: currentColor, fontSize: 20 }}>→</span>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: 6,
                        background: `${COLORS.green}20`,
                        color: COLORS.green, fontSize: 14, fontFamily: 'monospace',
                        fontWeight: 700
                      }}>
                        {t.replacement}
                      </span>
                      <span style={{ 
                        marginLeft: 'auto',
                        fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace'
                      }}>
                        {t.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
        @keyframes particleFly { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px var(--glow-color); } 50% { box-shadow: 0 0 60px var(--glow-color), 0 0 100px var(--glow-color); } }
        @keyframes resultReveal { 0% { opacity: 0; transform: translateY(20px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px currentColor; } 50% { text-shadow: 0 0 30px currentColor, 0 0 50px currentColor; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}{particles.length > 0 && (
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
            {particles.map(p => (
              <div key={p.id} style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: currentColor,
                boxShadow: `0 0 10px ${currentColor}`,
                animation: "particleFly 1.5s ease-out forwards",
                "--tx": `${(Math.random() - 0.5) * 200}px`,
                "--ty": `${(Math.random() - 0.5) * 200}px`
              } as React.CSSProperties} />
            ))}
          </div>
        )}
        </style>
    </div>
  );
}
