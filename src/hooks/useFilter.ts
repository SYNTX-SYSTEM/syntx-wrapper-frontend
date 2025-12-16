"use client";

import { useState, useMemo } from 'react';

export interface FilterConfig<T> {
  searchFields: (keyof T)[];
  filterFields?: {
    key: keyof T;
    label: string;
    options?: string[];
  }[];
}

export function useFilter<T>(items: T[], config: FilterConfig<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filteredItems = useMemo(() => {
    let result = items;

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        config.searchFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          if (Array.isArray(value)) {
            return value.some(v => String(v).toLowerCase().includes(query));
          }
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter(item => {
          const itemValue = item[key as keyof T];
          if (Array.isArray(itemValue)) {
            return itemValue.some(v => String(v).toLowerCase().includes(value.toLowerCase()));
          }
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    return result;
  }, [items, searchQuery, filters, config.searchFields]);

  const setFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== 'all').length + (searchQuery ? 1 : 0);

  return {
    filteredItems,
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    clearFilters,
    activeFilterCount,
  };
}
