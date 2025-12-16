"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, StatsResponse, StreamEvent } from '@/lib/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, Legend
} from 'recharts';

// ═══════════════════════════════════════════════════════════════
// CYBER BACKGROUND
// ═══════════════════════════════════════════════════════════════
function CyberBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.03 }}>
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            background: ['#00d4ff', '#d946ef', '#10b981', '#f59e0b'][i % 4],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
            animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      
      <div style={{
        position: 'absolute',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
        top: '-10%', right: '-5%',
        animation: 'pulse 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%)',
        bottom: '-5%', left: '-5%',
        animation: 'pulse 10s ease-in-out infinite',
        animationDelay: '2s',
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════
function GlassCard({ children, title, icon, glowColor = '#00d4ff' }: {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  glowColor?: string;
}) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.85) 0%, rgba(6,13,24,0.9) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
      }} />
      
      {title && (
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
          <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 12, color: glowColor, letterSpacing: 2 }}>
            {title}
          </h3>
        </div>
      )}
      
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM TOOLTIP
// ═══════════════════════════════════════════════════════════════
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
      border: '1px solid rgba(0,212,255,0.3)',
      borderRadius: 12,
      padding: '12px 16px',
      boxShadow: '0 0 30px rgba(0,212,255,0.2)',
    }}>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
        {label}
      </div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'white' }}>
            {p.name}: <strong style={{ color: p.color }}>{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
};

const WRAPPER_COLORS: Record<string, string> = {
  'syntex_wrapper_sigma': COLORS.orange,
  'syntex_wrapper_human': COLORS.green,
  'syntex_wrapper_deepsweep': COLORS.magenta,
  'syntex_wrapper_true_raw': COLORS.red,
};

export default function GraphsPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, streamData] = await Promise.all([
        api.getStats(),
        api.getStream(100),
      ]);
      setStats(statsData);
      setEvents(streamData.events || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Process data for charts
  const latencyData = React.useMemo(() => {
    const grouped = events.reduce((acc, event) => {
      if (!acc[event.request_id]) {
        acc[event.request_id] = { 
          id: event.request_id.slice(0, 8),
          timestamp: new Date(event.timestamp),
          latency: 0,
          wrapper: event.wrapper_chain?.[0] || 'unknown',
        };
      }
      if (event.latency_ms) {
        acc[event.request_id].latency = event.latency_ms / 1000;
      }
      return acc;
    }, {} as Record<string, any>);
    
    return Object.values(grouped)
      .sort((a: any, b: any) => a.timestamp - b.timestamp)
      .map((d: any) => ({
        ...d,
        time: d.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      }));
  }, [events]);

  const wrapperPieData = React.useMemo(() => {
    if (!stats?.wrapper_usage) return [];
    return Object.entries(stats.wrapper_usage).map(([name, value]) => ({
      name: name.replace('syntex_wrapper_', '').toUpperCase(),
      value,
      fullName: name,
    }));
  }, [stats]);

  const latencyByWrapper = React.useMemo(() => {
    const grouped = latencyData.reduce((acc: any, d: any) => {
      const name = d.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'UNKNOWN';
      if (!acc[name]) acc[name] = { name, total: 0, count: 0 };
      acc[name].total += d.latency;
      acc[name].count += 1;
      return acc;
    }, {});
    return Object.values(grouped).map((d: any) => ({
      name: d.name,
      avg: d.total / d.count,
    }));
  }, [latencyData]);

  if (loading && !stats) {
    return (
      <div style={{ position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CyberBackground />
        <div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <CyberBackground />
      
      {/* Header Stats */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { label: 'TOTAL REQUESTS', value: stats?.total_requests || 0, color: COLORS.cyan, icon: '📊' },
            { label: 'SUCCESS RATE', value: `${stats?.success_rate || 0}%`, color: COLORS.green, icon: '✅' },
            { label: 'AVG LATENCY', value: `${((stats?.average_latency_ms || 0) / 1000).toFixed(1)}s`, color: COLORS.orange, icon: '⚡' },
            { label: 'WRAPPERS', value: Object.keys(stats?.wrapper_usage || {}).length, color: COLORS.magenta, icon: '📦' },
          ].map((stat, i) => (
            <GlassCard key={i} glowColor={stat.color}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: stat.color, fontFamily: 'monospace' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: 1, marginTop: 8 }}>
                  {stat.label}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Latency Timeline */}
        <GlassCard title="LATENCY TIMELINE" icon="📈" glowColor={COLORS.cyan}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={latencyData}>
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => `${v}s`} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="latency" 
                stroke={COLORS.cyan} 
                strokeWidth={2}
                fill="url(#latencyGradient)" 
                name="Latency (s)"
                dot={{ fill: COLORS.cyan, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: COLORS.cyan, stroke: 'white', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Wrapper Distribution Donut */}
        <GlassCard title="WRAPPER DISTRIBUTION" icon="🍩" glowColor={COLORS.magenta}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={wrapperPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {wrapperPieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={WRAPPER_COLORS[entry.fullName] || COLORS.cyan}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 10 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Second Row */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Latency by Wrapper */}
        <GlassCard title="AVG LATENCY BY WRAPPER" icon="📊" glowColor={COLORS.orange}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={latencyByWrapper} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => `${v.toFixed(0)}s`} />
              <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avg" name="Avg Latency (s)" radius={[0, 8, 8, 0]}>
                {latencyByWrapper.map((entry: any, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={WRAPPER_COLORS[`syntex_wrapper_${entry.name.toLowerCase()}`] || COLORS.cyan}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Request Timeline */}
        <GlassCard title="REQUESTS OVER TIME" icon="📉" glowColor={COLORS.green}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="latency" 
                stroke={COLORS.green} 
                strokeWidth={2}
                name="Latency (s)"
                dot={{ fill: COLORS.green, strokeWidth: 0, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
