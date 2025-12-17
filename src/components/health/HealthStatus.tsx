// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🏥 HEALTH STATUS - SYSTEM PULS                                          ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface HealthData {
  status: string;
  api_version: string;
  timestamp: string;
  queue_accessible: boolean;
  modules: string[];
}

export function HealthStatus() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  const fetchHealth = async () => {
    try {
      const result = await api.getHealth();
      setData(result);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Connection failed');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(pulseInterval);
  }, []);

  const isOnline = data?.status?.includes('GESUND') || data?.status === 'healthy';
  const statusColor = isOnline ? '#10b981' : '#ef4444';
  const statusText = isOnline ? 'ONLINE' : 'OFFLINE';
  const pulseOpacity = 0.3 + (Math.sin(pulseIntensity * 0.1) * 0.2);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 16px',
      background: 'rgba(0,0,0,0.4)',
      borderRadius: 12,
      border: `1px solid ${statusColor}30`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 20% 50%, ${statusColor}${Math.round(pulseOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        {loading ? (
          <>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d4ff', animation: 'pulse 1s ease-in-out infinite', boxShadow: '0 0 10px #00d4ff' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#00d4ff', letterSpacing: 2 }}>CONNECTING...</span>
          </>
        ) : error ? (
          <>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 15px #ef4444', animation: 'pulse 0.5s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#ef4444', letterSpacing: 2 }}>OFFLINE</span>
          </>
        ) : (
          <>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor, boxShadow: `0 0 ${10 + pulseIntensity % 10}px ${statusColor}` }} />
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${statusColor}`, opacity: pulseOpacity, animation: 'ping 1.5s ease-out infinite' }} />
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: statusColor, letterSpacing: 2, textShadow: `0 0 10px ${statusColor}50` }}>{statusText}</span>
          </>
        )}
      </div>

      {data && (
        <div style={{ position: 'relative', zIndex: 1, padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>v{data.api_version}</span>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>
    </div>
  );
}
