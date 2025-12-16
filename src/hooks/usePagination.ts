"use client";

import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function usePagination<T>(
  items: T[],
  defaultPageSize = 10,
  defaultSort?: SortConfig<T>
) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(defaultSort || null);

  const sortedItems = useMemo(() => {
    if (!sortConfig) return items;

    return [...items].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [items, sortConfig]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, page, pageSize]);

  const totalPages = Math.ceil(items.length / pageSize);

  const goToPage = (p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  const toggleSort = (key: keyof T) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' };
    });
    setPage(1);
  };

  return {
    items: paginatedItems,
    allItems: sortedItems,
    pagination: {
      page,
      pageSize,
      totalItems: items.length,
      totalPages,
    },
    sorting: sortConfig,
    setPage: goToPage,
    setPageSize: (size: number) => { setPageSize(size); setPage(1); },
    nextPage,
    prevPage,
    toggleSort,
  };
}
