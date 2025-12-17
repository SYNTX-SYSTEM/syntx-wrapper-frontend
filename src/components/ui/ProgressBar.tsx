// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📊 PROGRESS BAR - SYNTX ANIMATED PROGRESS                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside' | 'top';
  animated?: boolean;
  striped?: boolean;
  glow?: boolean;
  gradient?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  color = '#00d4ff',
  height = 8,
  showLabel = false,
  labelPosition = 'outside',
  animated = true,
  striped = false,
  glow = true,
  gradient = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getBarBackground = () => {
    if (gradient) {
      return `linear-gradient(90deg, ${color}, ${adjustColor(color, 30)})`;
    }
    return color;
  };

  const adjustColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  return (
    <div className={className}>
      {showLabel && labelPosition === 'top' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>Progress</span>
          <span style={{ fontSize: 12, fontFamily: 'monospace', color }}>{percentage.toFixed(0)}%</span>
        </div>
      )}

      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* Track */}
        <div style={{
          flex: 1,
          height,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: height / 2,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Bar */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${percentage}%`,
            background: getBarBackground(),
            borderRadius: height / 2,
            transition: animated ? 'width 0.5s ease-out' : 'none',
            boxShadow: glow ? `0 0 20px ${color}50, inset 0 0 10px ${color}30` : 'none',
          }}>
            {/* Stripes */}
            {striped && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`,
                animation: animated ? 'stripeMove 1s linear infinite' : 'none',
              }} />
            )}

            {/* Shine Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 30,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))',
              animation: animated ? 'shimmer 2s ease infinite' : 'none',
            }} />

            {/* Inside Label */}
            {showLabel && labelPosition === 'inside' && percentage > 15 && (
              <span style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: Math.max(10, height - 2),
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'rgba(0,0,0,0.8)',
              }}>
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>

        {/* Outside Label */}
        {showLabel && labelPosition === 'outside' && (
          <span style={{
            minWidth: 45,
            fontSize: 12,
            fontFamily: 'monospace',
            fontWeight: 600,
            color,
            textShadow: glow ? `0 0 10px ${color}` : 'none',
          }}>
            {percentage.toFixed(0)}%
          </span>
        )}
      </div>

      <style>{`
        @keyframes stripeMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>
    </div>
  );
}

// Multi-segment Progress
export function SegmentedProgress({ 
  segments 
}: { 
  segments: { value: number; color: string; label?: string }[] 
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        display: 'flex',
        height: 12,
        borderRadius: 6,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.1)',
      }}>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              width: `${(seg.value / total) * 100}%`,
              background: seg.color,
              boxShadow: `inset 0 0 10px ${seg.color}50`,
              transition: 'width 0.5s ease',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: seg.color }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>
              {seg.label || `Segment ${i + 1}`}: {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
