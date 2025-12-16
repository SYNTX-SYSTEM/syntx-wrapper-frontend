"use client";

import { useCallback } from 'react';

export function useExport() {
  
  const exportJSON = useCallback((data: any[], filename: string) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const exportCSV = useCallback((data: any[], filename: string, columns?: { key: string; label: string }[]) => {
    if (!data.length) return;

    // Auto-detect columns if not provided
    const cols = columns || Object.keys(data[0]).map(key => ({ key, label: key }));
    
    // Header row
    const header = cols.map(c => `"${c.label}"`).join(',');
    
    // Data rows
    const rows = data.map(item => 
      cols.map(c => {
        let val = item[c.key];
        if (val === null || val === undefined) val = '';
        if (typeof val === 'object') val = JSON.stringify(val);
        if (typeof val === 'string') val = val.replace(/"/g, '""');
        return `"${val}"`;
      }).join(',')
    );

    const csv = [header, ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return { exportJSON, exportCSV };
}
