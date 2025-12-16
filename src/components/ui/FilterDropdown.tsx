"use client";

import React from 'react';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  color?: string;
}

export default function FilterDropdown({ label, value, options, onChange, color = '#00d4ff' }: FilterDropdownProps) {
  const isActive = value && value !== 'all';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>{label}:</span>
      <select
        value={value || 'all'}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: `1px solid ${isActive ? color + '60' : 'rgba(255,255,255,0.1)'}`,
          background: isActive ? color + '10' : 'rgba(0,0,0,0.3)',
          color: isActive ? color : 'rgba(255,255,255,0.7)',
          fontFamily: 'monospace',
          fontSize: 11,
          cursor: 'pointer',
          outline: 'none',
          minWidth: 120,
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
