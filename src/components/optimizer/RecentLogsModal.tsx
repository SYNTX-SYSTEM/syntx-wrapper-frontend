"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface LogEntry {
  timestamp: string;
  field: string;
  prompt: string;
  score: number;
  profile_used: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecentLogsModal({ isOpen, onClose }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [fieldFilter, setFieldFilter] = useState("");
  const [profileFilter, setProfileFilter] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState<'time' | 'score' | 'field'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (isOpen) fetchLogs(); }, [isOpen]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/logs?limit=100");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedLogs = useMemo(() => {
    let filtered = logs.filter(log => {
      const matchesField = !fieldFilter || log.field.toLowerCase().includes(fieldFilter.toLowerCase());
      const matchesProfile = !profileFilter || log.profile_used.toLowerCase().includes(profileFilter.toLowerCase());
      const matchesScore = log.score >= minScore / 100;
      return matchesField && matchesProfile && matchesScore;
    });
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'time') comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      else if (sortBy === 'score') comparison = a.score - b.score;
      else if (sortBy === 'field') comparison = a.field.localeCompare(b.field);
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    return filtered;
  }, [logs, fieldFilter, profileFilter, minScore, sortBy, sortOrder]);

  const stats = useMemo(() => {
    if (filteredAndSortedLogs.length === 0) return { avg: 0, total: 0, success: 0 };
    const avg = filteredAndSortedLogs.reduce((sum, log) => sum + log.score, 0) / filteredAndSortedLogs.length;
    const success = filteredAndSortedLogs.filter(log => log.score >= 0.7).length / filteredAndSortedLogs.length;
    return { avg: (avg * 100).toFixed(0), total: filteredAndSortedLogs.length, success: (success * 100).toFixed(0) };
  }, [filteredAndSortedLogs]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* MEGA NEURAL NETWORK - CYAN THEME */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="neuralGradLogs" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.7 }} />
            </linearGradient>
            <filter id="glowLogs">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Neural Grid - 7x9 Dense */}
          {[...Array(7)].map((_, row) => 
            [...Array(9)].map((_, col) => {
              const x = 12 + col * 11;
              const y = 12 + row * 14;
              
              return (
                <g key={`node-${row}-${col}`}>
                  {col < 8 && [...Array(4)].map((_, i) => {
                    const targetRow = Math.max(0, Math.min(6, row + i - 1.5));
                    const x2 = 12 + (col + 1) * 11;
                    const y2 = 12 + targetRow * 14;
                    return (
                      <motion.line
                        key={`conn-${row}-${col}-${i}`}
                        x1={`${x}%`}
                        y1={`${y}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="url(#neuralGradLogs)"
                        strokeWidth="2"
                        filter="url(#glowLogs)"
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                          strokeWidth: [2, 3.5, 2]
                        }}
                        transition={{
                          duration: 1.8 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: (row * 9 + col) * 0.04
                        }}
                      />
                    );
                  })}
                  
                  <motion.circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="5"
                    fill="url(#neuralGradLogs)"
                    filter="url(#glowLogs)"
                    animate={{
                      r: [5, 7, 5],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.3 + Math.random() * 0.8,
                      repeat: Infinity,
                      delay: (row * 9 + col) * 0.03
                    }}
                  />
                </g>
              );
            })
          )}
          
          {/* Signal Pulses */}
          {[...Array(20)].map((_, i) => {
            const startX = 12 + (i % 9) * 11;
            const startY = 12 + Math.floor(i / 9) * 14;
            const endX = 88;
            const endY = 50;
            
            return (
              <motion.circle
                key={`pulse-${i}`}
                r="4"
                fill="#00d4ff"
                filter="url(#glowLogs)"
                animate={{
                  cx: [`${startX}%`, `${endX}%`],
                  cy: [`${startY}%`, `${endY}%`],
                  opacity: [0, 1, 0],
                  r: [4, 6, 4]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>

        {/* Floating Particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: `hsl(${190 + i * 6}, 85%, 65%)`,
                boxShadow: `0 0 18px hsl(${190 + i * 6}, 85%, 65%)`
              }}
              animate={{
                x: [Math.random() * 1200, Math.random() * 1200, Math.random() * 1200],
                y: [Math.random() * 800, Math.random() * 800, Math.random() * 800],
                scale: [1, 2, 1],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{
                duration: 9 + Math.random() * 9,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.96, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="cyber-card"
          style={{
            width: '88%',
            maxWidth: 1050,
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '18px',
            borderRadius: 14,
            background: 'linear-gradient(145deg, rgba(8,24,42,0.98), rgba(4,10,18,0.98))',
            border: '2px solid rgba(0,212,255,0.55)',
            position: 'relative',
            boxShadow: '0 40px 130px rgba(0,0,0,0.9), 0 0 70px rgba(0,212,255,0.28)',
            overflow: 'hidden'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#00d4ff' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.div style={{ width: 32, height: 32, position: 'relative' }} animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                <Image src="/logo_original.png" alt="SYNTX" width={32} height={32} style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.5))' }} />
              </motion.div>
              <div>
                <h2 className="glow-text" style={{ fontSize: 18, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace', margin: 0, letterSpacing: 1.5 }}>RECENT LOGS</h2>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>Real-time Activity Stream</div>
              </div>
            </div>
            <button onClick={onClose} className="cyber-btn" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>×</button>
          </div>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            <div className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>{stats.avg}%</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>AVG</div>
            </div>
            <div className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#8b5cf6', fontFamily: 'monospace' }}>{stats.total}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>TOTAL</div>
            </div>
            <div className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>{stats.success}%</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>SUCCESS</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            <input type="text" placeholder="🔍 Field..." value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)} style={{ padding: '6px 9px', borderRadius: 6, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontFamily: 'monospace', fontSize: 9, outline: 'none' }} />
            <input type="text" placeholder="👤 Profile..." value={profileFilter} onChange={(e) => setProfileFilter(e.target.value)} style={{ padding: '6px 9px', borderRadius: 6, border: '1px solid rgba(217,70,239,0.3)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontFamily: 'monospace', fontSize: 9, outline: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 7px', borderRadius: 6, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(0,0,0,0.5)' }}>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{minScore}%</span>
              <input type="range" min="0" max="100" value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} style={{ flex: 1, accentColor: '#f59e0b' }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 5, marginBottom: 7, position: 'relative', zIndex: 1 }}>
            {(['time', 'score', 'field'] as const).map(sort => (
              <button key={sort} onClick={() => { if (sortBy === sort) setSortOrder(o => o === 'asc' ? 'desc' : 'asc'); else setSortBy(sort); }} className="cyber-btn" style={{ padding: '4px 8px', borderRadius: 5, border: sortBy === sort ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.15)', background: sortBy === sort ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)', color: sortBy === sort ? '#00d4ff' : 'rgba(255,255,255,0.5)', fontSize: 8, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>
                {sort} {sortBy === sort && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            ))}
            <button onClick={fetchLogs} className="cyber-btn" style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 5, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: 8, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>↻ REFRESH</button>
          </motion.div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, display: 'grid', gap: 5, position: 'relative', zIndex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <motion.div style={{ width: 35, height: 35, border: '3px solid rgba(0,212,255,0.2)', borderTopColor: '#00d4ff', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : filteredAndSortedLogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 25, color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 35, marginBottom: 7 }}>📋</div>
                {fieldFilter || profileFilter || minScore > 0 ? 'No logs match filters' : 'No logs yet'}
              </div>
            ) : (
              filteredAndSortedLogs.map((log, idx) => <LogRow key={idx} log={log} index={idx} />)
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function LogRow({ log, index }: { log: LogEntry; index: number }) {
  const scoreColor = log.score >= 0.7 ? '#10b981' : log.score >= 0.4 ? '#f59e0b' : '#ef4444';
  const percentage = (log.score * 100).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.008 }}
      whileHover={{ scale: 1.003, x: 2 }}
      className="cyber-card"
      style={{ padding: 8, borderRadius: 7, background: 'rgba(0,0,0,0.6)', border: `1px solid ${scoreColor}18`, display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 8, alignItems: 'center' }}
    >
      <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: scoreColor, boxShadow: `0 0 8px ${scoreColor}` }} animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#00d4ff', fontFamily: 'monospace', marginBottom: 2 }}>{log.field}</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.34)', fontFamily: 'monospace', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.prompt ? log.prompt.substring(0, 35) : 'No prompt'}...</div>
        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace' }}>{new Date(log.timestamp).toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</div>
      </div>
      <div style={{ padding: '2px 6px', borderRadius: 4, background: 'rgba(217,70,239,0.08)', border: '1px solid rgba(217,70,239,0.24)', fontSize: 7, color: '#d946ef', fontFamily: 'monospace', fontWeight: 700, whiteSpace: 'nowrap' }}>{log.profile_used}</div>
      <div style={{ padding: '5px 10px', borderRadius: 5, background: `linear-gradient(135deg, ${scoreColor}20, ${scoreColor}06)`, border: `1.5px solid ${scoreColor}35`, textAlign: 'center', minWidth: 45 }}>
        <div className="glow-text" style={{ fontSize: 13, fontWeight: 900, color: scoreColor, fontFamily: 'monospace', lineHeight: 1 }}>{percentage}%</div>
      </div>
    </motion.div>
  );
}
