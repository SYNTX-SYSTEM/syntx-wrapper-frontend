"use client";

import { useState, useEffect, useCallback } from 'react';
import { api, Wrapper } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM DATA HOOK - CENTRALIZED DATA FETCHING
// ═══════════════════════════════════════════════════════════════

interface SystemHealth {
  status: string;
  service: string;
  version: string;
  format_loader: string;
  last_response?: any;
}

interface SystemConfig {
  active_wrapper: string;
  exists: boolean;
  path: string;
  source: string;
}

interface WrapperStats {
  requests?: number;
  average_latency_ms?: number;
  success_rate?: number;
}

interface SystemData {
  health: SystemHealth | null;
  config: SystemConfig | null;
  wrappers: Wrapper[];
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

interface UseSystemDataReturn extends SystemData {
  refresh: () => Promise<void>;
  setDefaultWrapper: (name: string) => Promise<void>;
  getWrapperStats: (name: string) => Promise<WrapperStats | null>;
}

const REFRESH_INTERVAL = 30000; // 30s (longer than chat to reduce load)

export function useSystemData(): UseSystemDataReturn {
  const [data, setData] = useState<SystemData>({
    health: null,
    config: null,
    wrappers: [],
    loading: true,
    error: null,
    lastUpdate: null
  });

  const fetchData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Use CORRECT endpoints!
      const [healthData, configData, wrappersData] = await Promise.all([
        api.getResonanzHealth(),     // ✅ /resonanz/health
        api.getConfig(),              // ✅ /resonanz/config/default-wrapper
        api.getWrappers()             // ✅ /resonanz/wrappers
      ]);

      setData({
        health: healthData,
        config: configData,
        wrappers: wrappersData.wrappers || [],
        loading: false,
        error: null,
        lastUpdate: new Date()
      });
    } catch (err: any) {
      console.error('System data fetch error:', err);
      setData(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to fetch system data'
      }));
    }
  }, []);

  // Initial fetch + auto-refresh
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Set default wrapper
  const setDefaultWrapper = useCallback(async (name: string) => {
    try {
      await api.setConfig(name);
      await fetchData(); // Refresh after change
    } catch (err: any) {
      console.error('Failed to set default wrapper:', err);
      throw err;
    }
  }, [fetchData]);

  // Get wrapper stats
  const getWrapperStats = useCallback(async (name: string): Promise<WrapperStats | null> => {
    try {
      const stats = await api.getWrapperStats(name);
      return stats;
    } catch (err) {
      console.error(`Failed to get stats for ${name}:`, err);
      return null;
    }
  }, []);

  return {
    ...data,
    refresh: fetchData,
    setDefaultWrapper,
    getWrapperStats
  };
}
