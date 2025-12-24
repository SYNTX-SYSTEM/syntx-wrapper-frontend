"use client";
import React, { useState } from 'react';
import { COLORS, STYLE_COLORS, STYLE_ICONS, STYLE_VIBES } from '../constants';
import type { Style } from '../types';

interface StyleCardProps {
  style: Style;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onGrimoire: () => void;
  onDelete: () => void;
}

export function StyleCard({ style, isSelected, onSelect, onEdit, onGrimoire, onDelete }: StyleCardProps) {
  const color = STYLE_COLORS[style.name] || COLORS.purple;
  const icon = STYLE_ICONS[style.name] || '⚗️';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 20, borderRadius: 16,
        background: isSelected ? `linear-gradient(135deg, ${color}25, ${color}08)` : `linear-gradient(135deg, ${COLORS.dark}ee, ${COLORS.darker}f5)`,
        border: isSelected ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isSelected ? `0 0 50px ${color}40, inset 0 0 30px ${color}10` : isHovered ? `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${color}20` : '0 4px 16px rgba(0,0,0,0.2)',
        transform: isSelected ? 'scale(1.02) translateY(-4px)' : isHovered ? 'scale(1.01) translateY(-2px)' : 'scale(1)',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {isSelected && <div style={{ position: 'absolute', inset: -2, background: `linear-gradient(45deg, ${color}, transparent, ${color})`, borderRadius: 18, opacity: 0.3, animation: 'rotateBorder 3s linear infinite', zIndex: 0 }} />}
      
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(-10px)', transition: 'all 0.3s ease', zIndex: 20 }}>
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} style={{ width: 32, height: 32, borderRadius: 8, background: `${COLORS.cyan}20`, border: `1px solid ${COLORS.cyan}50`, color: COLORS.cyan, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Style bearbeiten">✏️</button>
        <button onClick={(e) => { e.stopPropagation(); onGrimoire(); }} style={{ width: 32, height: 32, borderRadius: 8, background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}50`, color: COLORS.gold, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Grimoire öffnen">📖</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ width: 32, height: 32, borderRadius: 8, background: `${COLORS.red}20`, border: `1px solid ${COLORS.red}50`, color: COLORS.red, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Style löschen">🗑️</button>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${color}30, ${color}10)`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 0 20px ${color}30`, animation: isSelected ? 'iconPulse 2s ease-in-out infinite' : 'none' }}>{icon}</div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 17, fontWeight: 800, color: color, letterSpacing: 2, textTransform: 'uppercase', textShadow: isSelected ? `0 0 20px ${color}80` : 'none' }}>{style.name.replace(/_/g, ' ')}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginTop: 2 }}>"{style.vibe || STYLE_VIBES[style.name] || 'Custom Style'}"</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{ padding: '6px 12px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.gold}25, ${COLORS.gold}10)`, border: `1px solid ${COLORS.gold}40`, fontSize: 11, color: COLORS.gold, fontFamily: 'monospace', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>⚗️</span> {style.word_alchemy_count} Transmutationen</span>
          {style.forbidden_words?.length > 0 && <span style={{ padding: '6px 12px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.red}25, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}40`, fontSize: 11, color: COLORS.red, fontFamily: 'monospace', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>🚫</span> {style.forbidden_words.length} Verboten</span>}
          {style.has_tone_injection && <span style={{ padding: '6px 12px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.purple}25, ${COLORS.purple}10)`, border: `1px solid ${COLORS.purple}40`, fontSize: 11, color: COLORS.purple, fontFamily: 'monospace', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>💉</span> Tone</span>}
        </div>

        {style.forbidden_words?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {style.forbidden_words.slice(0, 5).map(word => <span key={word} style={{ padding: '3px 8px', borderRadius: 6, background: `${COLORS.red}15`, fontSize: 10, color: COLORS.red, textDecoration: 'line-through', opacity: 0.8 }}>{word}</span>)}
            {style.forbidden_words.length > 5 && <span style={{ padding: '3px 8px', borderRadius: 6, background: `${COLORS.red}15`, fontSize: 10, color: COLORS.red }}>+{style.forbidden_words.length - 5}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
