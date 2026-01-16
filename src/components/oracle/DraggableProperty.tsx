'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  name: string;
  value: number;
  color: string;
  onDragStart: (name: string, value: number) => void;
};

export function DraggableProperty({ name, value, color, onDragStart }: Props) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('property', JSON.stringify({ name, value }));
    onDragStart(name, value);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        padding: '8px 12px',
        background: `${color}20`,
        border: `2px solid ${color}60`,
        borderRadius: 8,
        cursor: 'grab',
        transition: 'all 0.2s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.background = `${color}30`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}60`;
        e.currentTarget.style.background = `${color}20`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        fontSize: 10,
        fontWeight: 800,
        color,
        fontFamily: 'monospace',
        letterSpacing: 1,
        marginBottom: 4,
      }}>
        {name}
      </div>
      <div style={{
        fontSize: 16,
        fontWeight: 900,
        color,
        fontFamily: 'monospace',
      }}>
        {typeof value === 'number' ? value.toFixed(2) : value}
      </div>
    </div>
  );
}
