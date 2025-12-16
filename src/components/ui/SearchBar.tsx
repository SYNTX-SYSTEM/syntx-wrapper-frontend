"use client";

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  color?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...', color = '#00d4ff' }: SearchBarProps) {
  return (
    <div style={{
      position: 'relative',
      flex: 1,
      maxWidth: 300,
    }}>
      <span style={{
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 14,
        opacity: 0.5,
      }}>🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px 10px 36px',
          borderRadius: 10,
          border: `1px solid ${value ? color + '60' : 'rgba(255,255,255,0.1)'}`,
          background: 'rgba(0,0,0,0.3)',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: 12,
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => e.target.style.borderColor = color + '80'}
        onBlur={(e) => e.target.style.borderColor = value ? color + '60' : 'rgba(255,255,255,0.1)'}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 10,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
