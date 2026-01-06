// ═══════════════════════════════════════════════════════════════════════════
// 💚 HEALTH CHECK BADGE - System Readiness Indicator
// ═══════════════════════════════════════════════════════════════════════════
// Pure system status display

import React from 'react';
import { SystemHealthData } from '@/lib/api-profiles';

interface HealthCheckBadgeProps {
  health: SystemHealthData | null;
  loading?: boolean;
}

export function HealthCheckBadge({ health, loading }: HealthCheckBadgeProps) {
  
  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900/40 border border-gray-500/20 rounded-full text-xs">
        <span className="animate-pulse">⚪</span>
        <span className="text-gray-400 font-mono">CHECKING...</span>
      </div>
    );
  }
  
  if (!health) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900/40 border border-red-500/20 rounded-full text-xs">
        <span>🔴</span>
        <span className="text-red-300 font-mono">HEALTH CHECK FAILED</span>
      </div>
    );
  }
  
  const allReady = 
    health.organs.profile_usage === 'READY' && 
    health.organs.pattern_analytics === 'READY';
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-xs ${
      allReady 
        ? 'bg-green-900/20 border-green-500/30' 
        : 'bg-red-900/20 border-red-500/30'
    }`}>
      <span>{allReady ? '🟢' : '🔴'}</span>
      <span className={`font-mono ${allReady ? 'text-green-300' : 'text-red-300'}`}>
        {allReady ? 'SYSTEM READY' : 'ORGANS FEHLEN'}
      </span>
    </div>
  );
}
