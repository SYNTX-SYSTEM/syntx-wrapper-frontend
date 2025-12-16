"use client";

import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showPageSize?: boolean;
}

const COLORS = {
  cyan: '#00d4ff',
  dark: 'rgba(0,0,0,0.3)',
  border: 'rgba(255,255,255,0.1)',
};

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showPageSize = true,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderTop: `1px solid ${COLORS.border}`,
      marginTop: 16,
    }}>
      {/* Info */}
      <div style={{
        fontSize: 11,
        fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.5)',
      }}>
        {totalItems > 0 ? (
          <>
            <span style={{ color: COLORS.cyan }}>{(page - 1) * pageSize + 1}</span>
            {' - '}
            <span style={{ color: COLORS.cyan }}>{Math.min(page * pageSize, totalItems)}</span>
            {' von '}
            <span style={{ color: 'white' }}>{totalItems}</span>
          </>
        ) : (
          'Keine Einträge'
        )}
      </div>

      {/* Page Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${canPrev ? COLORS.cyan + '40' : COLORS.border}`,
            background: canPrev ? COLORS.cyan + '10' : 'transparent',
            color: canPrev ? COLORS.cyan : 'rgba(255,255,255,0.2)',
            fontFamily: 'monospace',
            fontSize: 12,
            cursor: canPrev ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          ← PREV
        </button>

        {getPageNumbers().map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === 'number' && onPageChange(p)}
            disabled={p === '...'}
            style={{
              minWidth: 36,
              padding: '8px 12px',
              borderRadius: 8,
              border: p === page ? `1px solid ${COLORS.cyan}` : `1px solid ${COLORS.border}`,
              background: p === page ? COLORS.cyan + '20' : 'transparent',
              color: p === page ? COLORS.cyan : 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: p === page ? 700 : 400,
              cursor: p === '...' ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${canNext ? COLORS.cyan + '40' : COLORS.border}`,
            background: canNext ? COLORS.cyan + '10' : 'transparent',
            color: canNext ? COLORS.cyan : 'rgba(255,255,255,0.2)',
            fontFamily: 'monospace',
            fontSize: 12,
            cursor: canNext ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          NEXT →
        </button>
      </div>

      {/* Page Size Selector */}
      {showPageSize && onPageSizeChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>
            Zeige:
          </span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.dark,
              color: 'white',
              fontFamily: 'monospace',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {[5, 10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
