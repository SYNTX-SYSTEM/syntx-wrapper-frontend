// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ EDGE RENDERER - CONNECTION FLOW VISUALIZATION                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { StromEdge } from './types';
import { ORACLE_COLORS, CANVAS_CONFIG } from './constants';

type Props = {
  edge: StromEdge;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export function EdgeRenderer({ edge, from, to }: Props) {
  const weight = edge.scoreWeight || 0.5;
  const color = edge.type === 'flow' ? ORACLE_COLORS.primary : ORACLE_COLORS.edge;
  const strokeWidth = CANVAS_CONFIG.edgeWidth + (weight * 3);

  // Calculate control point for curve
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const offset = 30;
  const ctrlX = midX + Math.cos(angle + Math.PI / 2) * offset;
  const ctrlY = midY + Math.sin(angle + Math.PI / 2) * offset;

  return (
    <g>
      {/* Glow Layer */}
      <path
        d={`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`}
        stroke={color}
        strokeWidth={strokeWidth + 4}
        fill="none"
        opacity={0.2}
        filter="blur(4px)"
      />

      {/* Main Line */}
      <path
        d={`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        opacity={weight}
        strokeLinecap="round"
      >
        {edge.animated && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="20"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Arrow Head */}
      <defs>
        <marker
          id={`arrow-${edge.id}`}
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={color} />
        </marker>
      </defs>
      <path
        d={`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`}
        stroke="transparent"
        strokeWidth={strokeWidth}
        fill="none"
        markerEnd={`url(#arrow-${edge.id})`}
      />
    </g>
  );
}
