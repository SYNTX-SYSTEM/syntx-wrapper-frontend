// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ NODE RENDERER - INDIVIDUAL NODE VISUALIZATION                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState, useCallback } from 'react';
import { ResonanzNode } from './types';
import { ORACLE_COLORS, CANVAS_CONFIG } from './constants';

type Props = {
  node: ResonanzNode;
  isSelected: boolean;
  isHovered: boolean;
  onDrag: (position: { x: number; y: number }) => void;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
};

export function NodeRenderer({
  node,
  isSelected,
  isHovered,
  onDrag,
  onClick,
  onHover,
  onLeave,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    });
  }, [node.position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      onDrag({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart, onDrag]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Color based on type
  const getNodeColor = () => {
    switch (node.type) {
      case 'field': return ORACLE_COLORS.primary;
      case 'entity': return ORACLE_COLORS.secondary;
      case 'score': return ORACLE_COLORS.tertiary;
      default: return ORACLE_COLORS.primary;
    }
  };

  const color = getNodeColor();
  const glow = node.glowIntensity || 0;
  const score = node.fieldScore || 0;

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        position: 'absolute',
        left: node.position.x - CANVAS_CONFIG.nodeRadius,
        top: node.position.y - CANVAS_CONFIG.nodeRadius,
        width: CANVAS_CONFIG.nodeRadius * 2,
        height: CANVAS_CONFIG.nodeRadius * 2,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}40, ${color}10)`,
        border: `3px solid ${color}`,
        boxShadow: `
          0 0 ${20 + glow * 40}px ${color}80,
          inset 0 0 20px ${color}20
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'all 0.3s ease-out',
        transform: `scale(${isHovered ? 1.1 : isSelected ? 1.15 : 1})`,
        zIndex: isSelected ? 100 : isHovered ? 50 : 10,
        animation: glow > 0.5 ? 'pulse 2s ease-in-out infinite' : 'none',
      }}
    >
      {/* Label */}
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: ORACLE_COLORS.text,
        textAlign: 'center',
        textShadow: `0 0 10px ${color}`,
        fontFamily: 'monospace',
        letterSpacing: 1,
        maxWidth: '80%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {node.label}
      </div>

      {/* Score Badge */}
      {score > 0 && (
        <div style={{
          position: 'absolute',
          top: -10,
          right: -10,
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}, ${ORACLE_COLORS.secondary})`,
          border: `2px solid ${ORACLE_COLORS.bg}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 900,
          color: ORACLE_COLORS.text,
          boxShadow: `0 0 15px ${color}`,
        }}>
          {(score * 100).toFixed(0)}
        </div>
      )}

      {/* Pulse Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px ${color}80; }
          50% { box-shadow: 0 0 40px ${color}ff; }
        }
      `}</style>
    </div>
  );
}
