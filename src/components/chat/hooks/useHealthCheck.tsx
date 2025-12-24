"use client";

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// 🌊 HEALTH CHECK HOOK - RESONANZ STATUS TRACKER
// ═══════════════════════════════════════════════════════════════
// Überwacht Backend-Health in Echtzeit mit automatischem Retry
// Bei Offline: Exponential Backoff (5s → 10s → 20s → max 60s)
// Bei Online: Regular Ping (alle 30s)
// ═══════════════════════════════════════════════════════════════

interface HealthStatus {
  isHealthy: boolean;
  lastCheck: Date | null;
  failCount: number;
  responseTime: number | null;
}

interface UseHealthCheckReturn {
  isHealthy: boolean;
  lastCheck: Date | null;
  failCount: number;
  responseTime: number | null;
  checkNow: () => Promise<boolean>;  // ← FIXED: Returns boolean
}

const PING_INTERVAL_HEALTHY = 30000;  // 30s wenn healthy
const PING_INTERVAL_OFFLINE_BASE = 5000;  // Start bei 5s wenn offline
const PING_INTERVAL_OFFLINE_MAX = 60000;  // Max 60s backoff
const BACKOFF_MULTIPLIER = 2;  // Exponential backoff

export function useHealthCheck(): UseHealthCheckReturn {
  const [status, setStatus] = useState<HealthStatus>({
    isHealthy: false,
    lastCheck: null,
    failCount: 0,
    responseTime: null
  });

  const checkHealth = useCallback(async (): Promise<boolean> => {
    const startTime = Date.now();
    
    try {
      // Try resonanz health endpoint first (preferred)
      await api.getResonanzHealth();
      
      const responseTime = Date.now() - startTime;
      
      setStatus({
        isHealthy: true,
        lastCheck: new Date(),
        failCount: 0,
        responseTime
      });
      
      return true;
    } catch (error) {
      // Fallback: Try wrapper health
      try {
        await api.getWrapperHealth();
        
        const responseTime = Date.now() - startTime;
        
        setStatus({
          isHealthy: true,
          lastCheck: new Date(),
          failCount: 0,
          responseTime
        });
        
        return true;
      } catch (fallbackError) {
        // Both failed - mark as offline
        setStatus(prev => ({
          isHealthy: false,
          lastCheck: new Date(),
          failCount: prev.failCount + 1,
          responseTime: null
        }));
        
        return false;
      }
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkHealth();

    // Setup interval with dynamic timing
    const setupInterval = () => {
      const interval = status.isHealthy
        ? PING_INTERVAL_HEALTHY
        : Math.min(
            PING_INTERVAL_OFFLINE_BASE * Math.pow(BACKOFF_MULTIPLIER, status.failCount),
            PING_INTERVAL_OFFLINE_MAX
          );

      return setInterval(checkHealth, interval);
    };

    const intervalId = setupInterval();

    return () => clearInterval(intervalId);
  }, [checkHealth, status.isHealthy, status.failCount]);

  return {
    isHealthy: status.isHealthy,
    lastCheck: status.lastCheck,
    failCount: status.failCount,
    responseTime: status.responseTime,
    checkNow: checkHealth
  };
}

// ═══════════════════════════════════════════════════════════════
// 🔥 ADDITIONAL HOOK: HEALTH STATUS ANIMATOR
// ═══════════════════════════════════════════════════════════════
// Provides animated state transitions for health status changes
// ═══════════════════════════════════════════════════════════════

interface UseHealthAnimationReturn {
  pulseIntensity: number;  // 0-1 für pulse animation
  glowColor: string;       // Dynamic glow color
  statusText: string;      // Animated status text
}

export function useHealthAnimation(isHealthy: boolean, failCount: number): UseHealthAnimationReturn {
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    if (!isHealthy) {
      // Faster pulse when offline
      const interval = setInterval(() => {
        setPulseIntensity(prev => prev === 1 ? 0.4 : 1);
      }, 800);
      return () => clearInterval(interval);
    } else {
      // Slow pulse when online
      const interval = setInterval(() => {
        setPulseIntensity(prev => prev === 1 ? 0.7 : 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHealthy]);

  const glowColor = isHealthy 
    ? '#10b981'  // Green
    : failCount > 5 
      ? '#ef4444'  // Red (many fails)
      : '#f59e0b'; // Orange (few fails)

  const statusText = isHealthy
    ? 'RESONANCE ACTIVE'
    : failCount > 5
      ? 'CONNECTION LOST'
      : 'RECONNECTING...';

  return {
    pulseIntensity,
    glowColor,
    statusText
  };
}
