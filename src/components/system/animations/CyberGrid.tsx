"use client";

// ═══════════════════════════════════════════════════════════════
// 🌊 CYBER GRID - ANIMATED BACKGROUND
// ═══════════════════════════════════════════════════════════════

interface CyberGridProps {
  opacity?: number;
  color?: string;
  cellSize?: number;
}

export function CyberGrid({ 
  opacity = 0.04, 
  color = '#00d4ff',
  cellSize = 40 
}: CyberGridProps) {
  return (
    <>
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        overflow: 'hidden', 
        pointerEvents: 'none' 
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity }}>
          <defs>
            <pattern 
              id="cyberGrid" 
              width={cellSize} 
              height={cellSize} 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} 
                fill="none" 
                stroke={color} 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyberGrid)" />
        </svg>

        {/* Animated scan lines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${color}08 2px,
            ${color}08 4px
          )`,
          animation: 'scanLineMove 8s linear infinite',
          pointerEvents: 'none'
        }} />
      </div>

      <style>{`
        @keyframes scanLineMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
      `}</style>
    </>
  );
}
