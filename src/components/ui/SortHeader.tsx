"use client";

import React from 'react';

interface SortHeaderProps {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
  color?: string;
}

export default function SortHeader({ label, sortKey, currentSort, onSort, color = '#00d4ff' }: SortHeaderProps) {
  const isActive = currentSort?.key === sortKey;
  const direction = isActive ? currentSort.direction : null;

  return (
    <button
      onClick={() => onSort(sortKey)}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: 10,
        fontWeight: 600,
        color: isActive ? color : 'rgba(255,255,255,0.5)',
        letterSpacing: 1,
        textTransform: 'uppercase',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
      <span style={{ 
        opacity: isActive ? 1 : 0.3,
        transition: 'all 0.2s ease',
        transform: direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
      }}>
        ▼
      </span>
    </button>
  );
}
