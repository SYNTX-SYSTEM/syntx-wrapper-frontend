"use client";

import React from 'react';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

interface FilterConfig {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClear?: () => void;
  activeCount?: number;
  color?: string;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  filterValues = {},
  onFilterChange,
  onClear,
  activeCount = 0,
  color = '#00d4ff',
}: FilterBarProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 20px',
      background: 'rgba(0,0,0,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      flexWrap: 'wrap',
    }}>
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        color={color}
      />
      
      {filters.map(filter => (
        <FilterDropdown
          key={filter.key}
          label={filter.label}
          value={filterValues[filter.key] || 'all'}
          options={filter.options}
          onChange={(value) => onFilterChange?.(filter.key, value)}
          color={color}
        />
      ))}

      {activeCount > 0 && onClear && (
        <button
          onClick={onClear}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.3)',
            background: 'rgba(239,68,68,0.1)',
            color: '#ef4444',
            fontFamily: 'monospace',
            fontSize: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ✕ Clear ({activeCount})
        </button>
      )}

      {activeCount > 0 && (
        <div style={{
          marginLeft: 'auto',
          padding: '6px 12px',
          borderRadius: 8,
          background: color + '20',
          fontSize: 10,
          fontFamily: 'monospace',
          color: color,
        }}>
          {activeCount} filter{activeCount > 1 ? 's' : ''} active
        </div>
      )}
    </div>
  );
}
