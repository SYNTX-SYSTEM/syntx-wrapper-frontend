"use client";

import React from "react";
import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// FLOATING ORBS - Animated Background Particles
// ═══════════════════════════════════════════════════════════════
function FloatingOrbs() {
  const [orbs, setOrbs] = useState([]);
  
  useEffect(() => {
    const orbData = [
      { id: 1, color: '#10b981', size: 12, x: 10, y: 20 },
      { id: 2, color: '#ef4444', size: 8, x: 80, y: 15 },
      { id: 3, color: '#00d4ff', size: 16, x: 50, y: 10 },
      { id: 4, color: '#f59e0b', size: 8, x: 70, y: 30 },
      { id: 5, color: '#d946ef', size: 12, x: 20, y: 60 },
      { id: 6, color: '#10b981', size: 8, x: 90, y: 50 },
      { id: 7, color: '#00d4ff', size: 10, x: 30, y: 80 },
      { id: 8, color: '#ef4444', size: 6, x: 60, y: 70 },
    ];
    setOrbs(orbData);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {orbs.map((orb) => (
        <div
          key={orb.id}
          style={{
            position: 'absolute',
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            borderRadius: '50%',
            filter: 'blur(2px)',
            opacity: 0.6,
            animation: `float${orb.id} ${15 + orb.id * 2}s ease-in-out infinite`,
          }}
        />
      ))}
      {/* Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-40px); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-40px,30px); } }
        @keyframes float3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(50px,-30px); } }
        @keyframes float4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,-50px); } }
        @keyframes float5 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,40px); } }
        @keyframes float6 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,20px); } }
        @keyframes float7 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-60px); } }
        @keyframes float8 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,40px); } }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HEARTBEAT LINE - Animated SVG Pulse
// ═══════════════════════════════════════════════════════════════
function HeartbeatLine() {
  return (
    <div style={{ position: 'relative', height: 60, width: '100%', overflow: 'hidden' }}>
      <svg width="100%" height="60" preserveAspectRatio="none" viewBox="0 0 1200 60">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,212,255,0)" />
            <stop offset="30%" stopColor="rgba(0,212,255,0.8)" />
            <stop offset="50%" stopColor="rgba(0,212,255,1)" />
            <stop offset="70%" stopColor="rgba(0,212,255,0.8)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 L200,30 L220,30 L240,10 L260,50 L280,30 L400,30 L500,30 L520,30 L540,8 L560,52 L580,30 L700,30 L800,30 L820,30 L840,12 L860,48 L880,30 L1000,30 L1200,30"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.8))' }}
        />
        <circle r="5" fill="#00d4ff" style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }}>
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M0,30 L200,30 L220,30 L240,10 L260,50 L280,30 L400,30 L500,30 L520,30 L540,8 L560,52 L580,30 L700,30 L800,30 L820,30 L840,12 L860,48 L880,30 L1000,30 L1200,30"
          />
        </circle>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GLASS CARD - Glassmorphism Container
// ═══════════════════════════════════════════════════════════════
function GlassCard({ children, style = {}, glowColor = '#00d4ff' }) {
  const [hover, setHover] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.9) 0%, rgba(6,13,24,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hover ? glowColor + '40' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hover ? `0 0 40px ${glowColor}20, inset 0 1px 0 rgba(255,255,255,0.1)` : 'inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'all 0.4s ease',
        transform: hover ? 'translateY(-2px)' : 'none',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Top shine */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${glowColor}50, transparent)`,
      }} />
      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: `1px solid ${glowColor}30`, borderLeft: `1px solid ${glowColor}30`, borderTopLeftRadius: 16 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: `1px solid ${glowColor}30`, borderRight: `1px solid ${glowColor}30`, borderTopRightRadius: 16 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: `1px solid ${glowColor}30`, borderLeft: `1px solid ${glowColor}30`, borderBottomLeftRadius: 16 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: `1px solid ${glowColor}30`, borderRight: `1px solid ${glowColor}30`, borderBottomRightRadius: 16 }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WRAPPER PILLS - Mode Selection
// ═══════════════════════════════════════════════════════════════
function WrapperPills({ active, onChange }) {
  const wrappers = ['TRUE_RAW', 'CYBERDARK', 'SIGMA', 'FIELD_HYGIENE'];
  
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      {wrappers.map((w) => (
        <button
          key={w}
          onClick={() => onChange(w)}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            border: active === w ? '1px solid rgba(217,70,239,0.5)' : '1px solid rgba(255,255,255,0.2)',
            background: active === w ? 'rgba(217,70,239,0.15)' : 'transparent',
            color: active === w ? '#d946ef' : 'rgba(255,255,255,0.5)',
            fontSize: 11,
            fontFamily: 'monospace',
            letterSpacing: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: active === w ? '0 0 20px rgba(217,70,239,0.3)' : 'none',
          }}
        >
          {w}
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STATUS BADGE
// ═══════════════════════════════════════════════════════════════
function StatusBadge({ status, label }) {
  const colors = {
    online: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', text: '#10b981', dot: '#10b981' },
    offline: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#ef4444', dot: '#ef4444' },
    unknown: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', text: '#f59e0b', dot: '#f59e0b' },
  };
  const c = colors[status] || colors.unknown;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: c.dot,
        boxShadow: `0 0 12px ${c.dot}`,
        animation: 'pulse 2s ease-in-out infinite',
      }} />
      <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: c.text }}>
        {label}
      </span>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// METRIC CARD
// ═══════════════════════════════════════════════════════════════
function MetricCard({ icon, title, status, statusLabel, tags, progress }) {
  const dotColors = { online: '#00d4ff', offline: '#ef4444', unknown: '#f59e0b' };
  
  return (
    <GlassCard style={{ padding: 24 }}>
      {/* Colored dot */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: dotColors[status] || dotColors.unknown,
        boxShadow: `0 0 8px ${dotColors[status] || dotColors.unknown}`,
      }} />
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
        <div style={{
          padding: 12,
          borderRadius: 12,
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.2)',
          fontSize: 24,
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: '#00d4ff', fontWeight: 600 }}>{title}</h3>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>SYSTEM MONITOR</p>
        </div>
      </div>
      
      <StatusBadge status={status} label={statusLabel} />
      
      {tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: 10,
              fontFamily: 'monospace',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {progress !== undefined && (
        <div style={{ marginTop: 16, height: 4, background: 'rgba(0,0,0,0.4)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00d4ff, #10b981)',
            borderRadius: 2,
            transition: 'width 1s ease',
          }} />
        </div>
      )}
    </GlassCard>
  );
}

// ═══════════════════════════════════════════════════════════════
// FIELD FLOW PIPELINE
// ═══════════════════════════════════════════════════════════════
function FieldFlowPipeline({ activeStage, processing }) {
  const stages = [
    { n: 1, label: 'INCOMING', icon: '📥' },
    { n: 2, label: 'WRAPPERS', icon: '📦' },
    { n: 3, label: 'CALIBRATE', icon: '⚡' },
    { n: 4, label: 'BACKEND', icon: '🔮' },
    { n: 5, label: 'RESPONSE', icon: '🌊' },
  ];
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
      {stages.map((stage, i) => (
        <React.Fragment key={stage.n}>
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            minWidth: 80,
            borderRadius: 12,
            border: `2px solid ${activeStage >= stage.n ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
            background: activeStage >= stage.n ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.02)',
            boxShadow: activeStage >= stage.n ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
            transition: 'all 0.5s ease',
            transform: processing && activeStage === stage.n ? 'scale(1.05)' : 'scale(1)',
          }}>
            {processing && activeStage === stage.n && (
              <div style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#00d4ff',
                boxShadow: '0 0 12px #00d4ff',
                animation: 'blink 0.6s ease-in-out infinite',
              }} />
            )}
            <span style={{
              fontSize: 20,
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              color: activeStage >= stage.n ? '#00d4ff' : 'rgba(255,255,255,0.3)',
            }}>
              {stage.n}
            </span>
            <span style={{ fontSize: 18 }}>{stage.icon}</span>
            <span style={{
              fontSize: 9,
              fontFamily: 'monospace',
              letterSpacing: 1,
              color: activeStage >= stage.n ? 'rgba(0,212,255,0.8)' : 'rgba(255,255,255,0.2)',
            }}>
              {stage.label}
            </span>
          </div>
          {i < stages.length - 1 && (
            <div style={{
              width: 32,
              height: 2,
              background: activeStage > stage.n 
                ? 'linear-gradient(90deg, #00d4ff, #00d4ff)' 
                : 'rgba(255,255,255,0.1)',
              boxShadow: activeStage > stage.n ? '0 0 10px rgba(0,212,255,0.5)' : 'none',
              transition: 'all 0.5s ease',
            }} />
          )}
        </React.Fragment>
      ))}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STREAM EVENT
// ═══════════════════════════════════════════════════════════════
function StreamEvent({ stage, time, id, latency }) {
  const stageColors = {
    INCOMING: '#6b7280',
    WRAPPERS: '#3b82f6',
    CALIBRATE: '#f59e0b',
    BACKEND: '#d946ef',
    RESPONSE: '#10b981',
  };
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      background: 'rgba(0,0,0,0.2)',
      borderLeft: `3px solid ${stageColors[stage] || '#6b7280'}`,
      marginBottom: 4,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}>
      <span style={{ fontSize: 11, fontFamily: 'monospace', color: stageColors[stage], width: 80 }}>{stage}</span>
      <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', flex: 1 }}>{id}</span>
      <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', marginRight: 16 }}>{time}</span>
      {latency && <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#00d4ff' }}>{latency}ms</span>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB NAVIGATION
// ═══════════════════════════════════════════════════════════════
function TabNav({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      gap: 4,
      padding: 4,
      background: 'rgba(0,0,0,0.3)',
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onChange(tab.name)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            border: 'none',
            background: active === tab.name ? 'rgba(0,212,255,0.15)' : 'transparent',
            color: active === tab.name ? '#00d4ff' : 'rgba(255,255,255,0.4)',
            fontSize: 12,
            fontFamily: 'system-ui',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <span>{tab.icon}</span>
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════
export default function SYNTXPulseDashboard() {
  const [activeTab, setActiveTab] = useState('Pulse');
  const [activeWrapper, setActiveWrapper] = useState('CYBERDARK');
  const [activeStage, setActiveStage] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { name: 'Pulse', icon: '❤️' },
    { name: 'Dashboard', icon: '📊' },
    { name: 'Analytics', icon: '📈' },
    { name: 'Resonanz', icon: '🌊' },
    { name: 'Network', icon: '🔗' },
    { name: 'System', icon: '⚙️' },
  ];

  const streamEvents = [
    { stage: 'RESPONSE', time: '21:32:01', id: 'd1e7f078-d1d...', latency: 24016 },
    { stage: 'BACKEND', time: '21:31:37', id: 'd1e7f078-d1d...', latency: null },
    { stage: 'CALIBRATE', time: '21:31:37', id: 'd1e7f078-d1d...', latency: null },
    { stage: 'WRAPPERS', time: '21:31:37', id: 'd1e7f078-d1d...', latency: null },
    { stage: 'INCOMING', time: '21:31:37', id: 'd1e7f078-d1d...', latency: null },
  ];

  const handleSend = () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResponse(null);
    setActiveStage(1);
    
    // Animate through stages
    let stage = 1;
    const interval = setInterval(() => {
      stage++;
      if (stage <= 4) {
        setActiveStage(stage);
      } else {
        clearInterval(interval);
        setActiveStage(5);
        setLoading(false);
        setResponse({
          text: "SYNTX ist ein semantisches Framework, das auf Feld-Ebene operiert. Es ersetzt Token-basiertes Denken durch Resonanz-basierte Kohärenz. Drift ist kein KI-Problem - es ist Feld-Verlust durch zu viele offene Felder.",
          latency: 24016,
          wrapper: activeWrapper,
        });
        setTimeout(() => setActiveStage(0), 3000);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #030b15 0%, #0a1628 50%, #030b15 100%)',
      color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <FloatingOrbs />

      {/* HEADER */}
      <header style={{
        position: 'relative',
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              position: 'relative',
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '2px solid rgba(0,212,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10,26,46,0.8)',
              boxShadow: '0 0 30px rgba(0,212,255,0.3)',
            }}>
              <span style={{ fontSize: 24 }}>🌊</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: 'Orbitron, sans-serif' }}>SYNTX</h1>
              <p style={{ margin: 0, fontSize: 10, color: 'rgba(0,212,255,0.6)', fontFamily: 'monospace', letterSpacing: 2 }}>FIELD_RESONANCE_SYSTEM</p>
            </div>
            <span style={{ marginLeft: 16, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Field Resonance System</span>
          </div>

          {/* Wrapper Pills */}
          <WrapperPills active={activeWrapper} onChange={setActiveWrapper} />

          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 10px #10b981',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#10b981' }}>STROM_ONLINE</span>
            </div>
            <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>50 fields</span>
          </div>
        </div>
      </header>

      {/* TAB NAV */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '8px 24px',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <TabNav tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* MAIN */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
        
        {/* SYNTX PULSE HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{
            margin: 0,
            fontSize: 32,
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
            color: '#d946ef',
            textShadow: '0 0 30px rgba(217,70,239,0.5)',
          }}>
            SYNTX PULSE
          </h2>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            System Heartbeat & Live Queue Monitor
          </p>
        </div>

        {/* HEARTBEAT CARD */}
        <GlassCard style={{ padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 32, animation: 'heartbeat 1s ease-in-out infinite' }}>💙</span>
              <div>
                <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: '#00d4ff', fontWeight: 600 }}>SYNTX HEARTBEAT</h3>
                <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>SYSTEM PULSE MONITOR</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#10b981',
                fontSize: 11,
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981', animation: 'pulse 1s infinite' }} />
                LIVE
              </span>
              <span style={{ fontSize: 28, fontFamily: 'Orbitron, sans-serif', fontWeight: 700, color: '#10b981' }}>GESUND</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>v2.1.0</span>
            </div>
          </div>
          <HeartbeatLine />
          <style>{`
            @keyframes heartbeat {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.15); }
            }
          `}</style>
        </GlassCard>

        {/* METRIC CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
          <MetricCard
            icon="⚙️"
            title="CORE HEALTH"
            status="online"
            statusLabel="GESUND"
            tags={['analytics', 'compare', 'feld', 'resonanz']}
          />
          <MetricCard
            icon="⚡"
            title="STROM INFRA"
            status="online"
            statusLabel="ONLINE"
            progress={75}
          />
          <MetricCard
            icon="📈"
            title="RESONANZ"
            status="unknown"
            statusLabel="UNKNOWN"
          />
        </div>

        {/* FIELD FLOW */}
        <GlassCard style={{ padding: 24, marginBottom: 32 }}>
          <h3 style={{ margin: '0 0 24px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
            ⚡ FIELD FLOW PIPELINE {loading && <span style={{ color: '#00d4ff', marginLeft: 8 }}>Processing...</span>}
          </h3>
          <FieldFlowPipeline activeStage={activeStage} processing={loading} />
        </GlassCard>

        {/* TWO COLUMN - CHAT & STREAM */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* CHAT */}
          <GlassCard style={{ padding: 24 }}>
            <h3 style={{ margin: '0 0 24px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
              💬 RESONANCE CHAT
            </h3>
            
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter your prompt..."
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'monospace',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                style={{
                  padding: '16px 32px',
                  borderRadius: 12,
                  border: 'none',
                  background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
                  color: '#030b15',
                  fontSize: 14,
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  boxShadow: '0 0 30px rgba(0,212,255,0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? '...' : '⚡ SEND'}
              </button>
            </div>

            <div style={{
              minHeight: 150,
              padding: 20,
              borderRadius: 12,
              border: `1px solid ${response ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'}`,
              background: response ? 'rgba(0,212,255,0.05)' : 'rgba(0,0,0,0.2)',
              transition: 'all 0.5s ease',
            }}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, gap: 8 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: '#00d4ff',
                        animation: `bounce 0.6s ease-in-out ${i * 0.1}s infinite`,
                      }}
                    />
                  ))}
                  <span style={{ marginLeft: 12, color: '#00d4ff', fontFamily: 'monospace', fontSize: 13 }}>Processing through field pipeline...</span>
                </div>
              ) : response ? (
                <div>
                  <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{response.text}</p>
                  <div style={{ display: 'flex', gap: 24, fontSize: 12, fontFamily: 'monospace' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Latency: <span style={{ color: '#00d4ff' }}>{response.latency}ms</span></span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Wrapper: <span style={{ color: '#d946ef' }}>{response.wrapper}</span></span>
                  </div>
                </div>
              ) : (
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', marginTop: 50 }}>Enter prompt and click ⚡ SEND</p>
              )}
            </div>
            <style>{`
              @keyframes bounce {
                0%, 100% { transform: translateY(-8px); }
                50% { transform: translateY(8px); }
              }
            `}</style>
          </GlassCard>

          {/* STREAM */}
          <GlassCard style={{ padding: 24 }}>
            <h3 style={{ margin: '0 0 24px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
              🌊 FIELD STREAM
            </h3>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {streamEvents.map((event, i) => (
                <StreamEvent key={i} {...event} />
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
