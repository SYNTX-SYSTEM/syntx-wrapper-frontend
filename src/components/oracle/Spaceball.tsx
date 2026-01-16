'use client';

import React, { useState } from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  name: string;
  value: number;
  color: string;
  position: { x: number; y: number };
  centerPosition: { x: number; y: number };
  metadata?: {
    method?: string;
    description?: string;
    profile_id?: string;
    category?: string;
  };
  onDrag: (newPosition: { x: number; y: number }, newValue: number) => void;
};

export function Spaceball({ name, value, color, position, centerPosition, metadata, onDrag }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const distance = Math.sqrt(
      Math.pow(newX - centerPosition.x, 2) + Math.pow(newY - centerPosition.y, 2)
    );

    const maxDistance = 400;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const newValue = value * (1 + (normalizedDistance * 0.5));

    onDrag({ x: newX, y: newY }, newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Calculate arrow angle and length
  const dx = centerPosition.x - position.x;
  const dy = centerPosition.y - position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={() => !isDragging && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: isHovering ? 100 : 5,
      }}
    >
      {/* Connection Arrow Line */}
      <div style={{
        position: 'absolute',
        width: distance,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${color}60)`,
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
        boxShadow: `0 0 10px ${color}80`,
      }} />

      {/* Cyber Hover Tooltip */}
      {isHovering && metadata && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: 20,
          width: 280,
          background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f8, ${ORACLE_COLORS.bg}f8)`,
          borderRadius: 12,
          border: `2px solid ${color}`,
          boxShadow: `
            0 0 30px ${color}80,
            0 0 60px ${color}40,
            inset 0 0 30px ${color}10
          `,
          padding: 16,
          zIndex: 9999,
          animation: 'tooltipFadeIn 0.2s ease-out',
          pointerEvents: 'none',
        }}>
          {/* Connection Line to Ball */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            width: 2,
            height: 20,
            background: `linear-gradient(180deg, ${color}, transparent)`,
            transform: 'translateX(-50%)',
          }} />

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: `1px solid ${color}40`,
          }}>
            <div style={{
              fontSize: 16,
              filter: `drop-shadow(0 0 10px ${color})`,
            }}>
              ⚡
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 900,
              color,
              fontFamily: 'monospace',
              letterSpacing: 1,
              textTransform: 'uppercase',
              textShadow: `0 0 10px ${color}`,
            }}>
              {name}
            </div>
          </div>

          {/* Metadata Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <MetadataRow
              icon="💎"
              label="WEIGHT"
              value={value.toFixed(3)}
              color={color}
            />
            
            {metadata.method && (
              <MetadataRow
                icon="🌌"
                label="METHOD"
                value={metadata.method}
                color={color}
              />
            )}
            
            {metadata.profile_id && (
              <MetadataRow
                icon="📊"
                label="PROFILE"
                value={metadata.profile_id}
                color={color}
              />
            )}
            
            {metadata.category && (
              <MetadataRow
                icon="🔖"
                label="CATEGORY"
                value={metadata.category}
                color={color}
              />
            )}
          </div>

          {/* Description */}
          {metadata.description && (
            <div style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: `1px solid ${color}40`,
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 800,
                color: ORACLE_COLORS.textDim,
                fontFamily: 'monospace',
                marginBottom: 6,
                letterSpacing: 1,
              }}>
                🔍 DESCRIPTION:
              </div>
              <div style={{
                fontSize: 9,
                color: ORACLE_COLORS.text,
                fontFamily: 'monospace',
                lineHeight: 1.5,
              }}>
                {metadata.description}
              </div>
            </div>
          )}

          {/* Priority Indicator */}
          <div style={{
            marginTop: 12,
            padding: 8,
            background: `${color}20`,
            borderRadius: 6,
            border: `1px solid ${color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <div style={{
              fontSize: 10,
              fontWeight: 800,
              color,
              fontFamily: 'monospace',
              letterSpacing: 1,
            }}>
              ⚡ PRIORITY: {value > 0.3 ? 'HIGH' : value > 0.2 ? 'MEDIUM' : 'LOW'}
            </div>
          </div>
        </div>
      )}

      {/* Spaceball */}
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}ff, ${color}80)`,
        border: `3px solid ${color}`,
        boxShadow: `
          0 0 ${isHovering ? '40' : '20'}px ${color}80,
          0 0 ${isHovering ? '80' : '40'}px ${color}40,
          inset 0 0 20px ${color}40
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: isDragging ? 'none' : 'all 0.3s',
        animation: isDragging ? 'none' : 'float 3s ease-in-out infinite',
        transform: isHovering && !isDragging ? 'scale(1.1)' : 'none',
      }}>
        <div style={{
          fontSize: 9,
          fontWeight: 800,
          color: '#fff',
          fontFamily: 'monospace',
          textAlign: 'center',
          marginBottom: 4,
          textShadow: `0 0 10px ${color}`,
        }}>
          {name}
        </div>
        <div style={{
          fontSize: 16,
          fontWeight: 900,
          color: '#fff',
          fontFamily: 'monospace',
          textShadow: `0 0 10px ${color}`,
        }}>
          {value.toFixed(2)}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function MetadataRow({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{ fontSize: 12 }}>{icon}</div>
      <div style={{
        fontSize: 9,
        color: ORACLE_COLORS.textDim,
        fontFamily: 'monospace',
        width: 70,
      }}>
        {label}:
      </div>
      <div style={{
        flex: 1,
        fontSize: 9,
        fontWeight: 800,
        color,
        fontFamily: 'monospace',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {value}
      </div>
    </div>
  );
}
