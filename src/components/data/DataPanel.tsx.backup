"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, statsAPI, StatsResponse, StreamEvent } from '@/lib/api';
import { SYNTX_COLORS, getWrapperColor } from '@/lib/colorUtils';
import { NeuralPulseWave } from './charts/NeuralPulseWave';
import { HolographicDonut } from './charts/HolographicDonut';
import { EnergyBars } from './charts/EnergyBars';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts';

function DataBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.02 }}>
        <defs>
          <pattern id="dataGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dataGrid)" />
      </svg>
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4, height: 4,
          borderRadius: '50%',
          background: ['#00d4ff', '#d946ef', '#10b981'][i % 3],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.3,
          animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

function GlassCard({ children, title, icon, glowColor = '#00d4ff', span = 1, height }: any) {
  return (
    <div style={{
      gridColumn: `span ${span}`,
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      height: height || 'auto',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }} />
      {title && (
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.2)' }}>
          {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
          <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 11, color: glowColor, letterSpacing: 2 }}>{title}</h3>
        </div>
      )}
      <div style={{ padding: 20, height: height ? 'calc(100% - 60px)' : 'auto' }}>{children}</div>
    </div>
  );
}

function StatBox({ label, value, icon, color, suffix = '' }: any) {
  return (
    <div style={{
      padding: 20,
      background: `linear-gradient(135deg, ${color}10, ${color}05)`,
      border: `1px solid ${color}30`,
      borderRadius: 16,
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${color}15, transparent)` }} />
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div style={{ fontSize: 36, fontWeight: 800, color, fontFamily: 'monospace', margin: '12px 0 6px' }}>{value}{suffix}</div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', letterSpacing: 1 }}>{label}</div>
    </div>
  );
}

function ActivityHeatmap({ events }: { events: StreamEvent[] }) {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const activity = React.useMemo(() => {
    const grid: number[][] = Array(7).fill(null).map(() => Array(24).fill(0));
    events.forEach(e => {
      const d = new Date(e.timestamp);
      grid[(d.getDay() + 6) % 7][d.getHours()]++;
    });
    return grid;
  }, [events]);
  const maxVal = Math.max(...activity.flat(), 1);

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 8 }}>
        {days.map(d => <div key={d} style={{ height: 16, fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>{d}</div>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activity.map((row, di) => (
          <div key={di} style={{ display: 'flex', gap: 2 }}>
            {row.map((val, hi) => (
              <div key={hi} style={{ width: 16, height: 16, borderRadius: 3, background: val === 0 ? 'rgba(255,255,255,0.03)' : `rgba(0, 212, 255, ${0.2 + (val / maxVal) * 0.8})` }} title={`${days[di]} ${hi}:00 - ${val}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveFeed({ events }: { events: StreamEvent[] }) {
  return (
    <div style={{ maxHeight: 300, overflow: 'auto' }}>
      {events.slice(0, 10).map((event, i) => {
        const color = getWrapperColor(event.wrapper_chain?.[0] || 'unknown');
        return (
          <div key={event.request_id + i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            background: i === 0 ? 'rgba(0,212,255,0.05)' : 'transparent',
            borderLeft: `3px solid ${color}`,
            marginBottom: 4, borderRadius: '0 8px 8px 0',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: event.latency_ms ? '#10b981' : '#f59e0b' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'white' }}>{event.stage}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{event.request_id.slice(0, 8)}...</div>
            </div>
            {event.latency_ms && <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#f59e0b' }}>{(event.latency_ms / 1000).toFixed(1)}s</div>}
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{new Date(event.timestamp).toLocaleTimeString('de-DE')}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function DataPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [statsData, streamData] = await Promise.all([statsAPI.getStats(), api.getStream(200)]);
      setStats(statsData);
      setEvents(streamData.events || []);
      setLastUpdate(new Date());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const latencyTimeline = React.useMemo(() => {
    const grouped = events.reduce((acc, event) => {
      if (!acc[event.request_id]) acc[event.request_id] = { id: event.request_id.slice(0, 8), timestamp: new Date(event.timestamp), latency: 0, wrapper: event.wrapper_chain?.[0] || 'unknown' };
      if (event.latency_ms) acc[event.request_id].latency = event.latency_ms / 1000;
      return acc;
    }, {} as Record<string, any>);
    return Object.values(grouped).sort((a: any, b: any) => a.timestamp - b.timestamp).slice(-20).map((d: any) => ({ ...d, time: d.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }));
  }, [events]);

  const wrapperPieData = React.useMemo(() => {
    if (!stats?.wrapper_usage) return [];
    return Object.entries(stats.wrapper_usage).map(([name, value]) => ({ name: name.replace('syntex_wrapper_', '').toUpperCase(), value, fullName: name }));
  }, [stats]);

  const latencyByWrapper = React.useMemo(() => {
    const grouped = latencyTimeline.reduce((acc: any, d: any) => {
      const name = d.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'UNKNOWN';
      if (!acc[name]) acc[name] = { name, total: 0, count: 0 };
      acc[name].total += d.latency; acc[name].count += 1;
      return acc;
    }, {});
    return Object.values(grouped).map((d: any) => ({ name: d.name, avg: d.total / d.count, count: d.count }));
  }, [latencyTimeline]);

  const radarData = React.useMemo(() => latencyByWrapper.map(w => ({ wrapper: w.name, speed: Math.max(0, 100 - (w.avg * 2)), volume: w.count * 10 })), [latencyByWrapper]);

  const stageDistribution = React.useMemo(() => {
    const stages: Record<string, number> = {};
    events.forEach(e => { stages[e.stage] = (stages[e.stage] || 0) + 1; });
    return Object.entries(stages).map(([name, value]) => ({ name: name.replace(/^\d_/, ''), value }));
  }, [events]);

  if (loading) return <div style={{ position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DataBackground /><div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>LOADING...</div></div>;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <DataBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32 }}>📊</div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 18, color: '#8b5cf6', letterSpacing: 3 }}>DATA COMMAND CENTER</h2>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Real-time Field Resonance Analytics</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#10b981' }}>LIVE</span>
            </div>
            {lastUpdate && <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>Updated: {lastUpdate.toLocaleTimeString('de-DE')}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
          <StatBox label="Total Requests" value={stats?.total_requests || 0} icon="📡" color={SYNTX_COLORS.cyan} />
          <StatBox label="Success Rate" value={stats?.success_rate || 0} suffix="%" icon="✅" color={SYNTX_COLORS.green} />
          <StatBox label="Avg Latency" value={((stats?.average_latency_ms || 0) / 1000).toFixed(1)} suffix="s" icon="⚡" color={SYNTX_COLORS.orange} />
          <StatBox label="Wrappers" value={Object.keys(stats?.wrapper_usage || {}).length} icon="📦" color={SYNTX_COLORS.magenta} />
          <StatBox label="Events" value={events.length} icon="🌊" color={SYNTX_COLORS.purple} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassCard title="⚡ NEURAL PULSE WAVE" icon="📈" glowColor={SYNTX_COLORS.cyan} height={350}>
            <NeuralPulseWave data={latencyTimeline} />
          </GlassCard>
          <GlassCard title="🌀 HOLOGRAPHIC DISTRIBUTION" icon="🍩" glowColor={SYNTX_COLORS.magenta} height={350}>
            <HolographicDonut data={wrapperPieData} />
          </GlassCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassCard title="⚡ ENERGY BARS" icon="📊" glowColor={SYNTX_COLORS.orange} height={300}>
            <EnergyBars data={latencyByWrapper} />
          </GlassCard>
          <GlassCard title="Wrapper Performance" icon="🎯" glowColor={SYNTX_COLORS.purple} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="wrapper" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <Radar name="Speed" dataKey="speed" stroke={SYNTX_COLORS.cyan} fill={SYNTX_COLORS.cyan} fillOpacity={0.3} />
                <Radar name="Volume" dataKey="volume" stroke={SYNTX_COLORS.magenta} fill={SYNTX_COLORS.magenta} fillOpacity={0.3} />
                <Tooltip contentStyle={{ background: 'rgba(10,26,46,0.98)', border: '1px solid rgba(0,212,255,0.4)', borderRadius: 12, fontFamily: 'monospace' }} />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard title="Pipeline Stages" icon="🔄" glowColor={SYNTX_COLORS.green} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={8} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip contentStyle={{ background: 'rgba(10,26,46,0.98)', border: '1px solid rgba(0,212,255,0.4)', borderRadius: 12, fontFamily: 'monospace' }} />
                <Bar dataKey="value" name="Count" fill={SYNTX_COLORS.green} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <GlassCard title="Activity Heatmap" icon="🗓️" glowColor={SYNTX_COLORS.cyan}><ActivityHeatmap events={events} /></GlassCard>
          <GlassCard title="Live Event Feed" icon="📡" glowColor={SYNTX_COLORS.green}><LiveFeed events={events} /></GlassCard>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
}
