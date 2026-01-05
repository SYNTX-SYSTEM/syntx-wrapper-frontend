"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface FieldAnalytics {
  field: string;
  total_uses: number;
  avg_score: number;
  success_rate: number;
  recent_prompts: number;
  problem_indicators?: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FieldAnalyticsModal({ isOpen, onClose }: Props) {
  const [analytics, setAnalytics] = useState<FieldAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'uses' | 'score' | 'success'>('uses');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (isOpen) fetchAnalytics(); }, [isOpen]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/analytics/fields");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAnalytics(data.fields || []);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedAnalytics = [...analytics].sort((a, b) => {
    if (sortBy === 'uses') return b.total_uses - a.total_uses;
    if (sortBy === 'score') return b.avg_score - a.avg_score;
    if (sortBy === 'success') return b.success_rate - a.success_rate;
    return 0;
  });

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
        {/* MEGA NEURAL NETWORK - ANIMATED CONNECTIONS */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="neuralGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.6 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Neural Network Grid - 6x8 Nodes */}
          {[...Array(6)].map((_, row) => 
            [...Array(8)].map((_, col) => {
              const x = 15 + col * 12.5;
              const y = 15 + row * 16;
              
              return (
                <g key={`node-${row}-${col}`}>
                  {/* Connections to next layer */}
                  {col < 7 && [...Array(3)].map((_, i) => {
                    const targetRow = Math.max(0, Math.min(5, row + i - 1));
                    const x2 = 15 + (col + 1) * 12.5;
                    const y2 = 15 + targetRow * 16;
                    return (
                      <motion.line
                        key={`conn-${row}-${col}-${i}`}
                        x1={`${x}%`}
                        y1={`${y}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="url(#neuralGrad3)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                        animate={{
                          opacity: [0.2, 0.6, 0.2],
                          strokeWidth: [1.5, 2.5, 1.5]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: (row * 8 + col) * 0.05
                        }}
                      />
                    );
                  })}
                  
                  {/* Node */}
                  <motion.circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill="url(#neuralGrad3)"
                    filter="url(#glow)"
                    animate={{
                      r: [4, 6, 4],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      delay: (row * 8 + col) * 0.04
                    }}
                  />
                </g>
              );
            })
          )}
          
          {/* Signal Pulses */}
          {[...Array(15)].map((_, i) => {
            const startX = 15 + (i % 8) * 12.5;
            const startY = 15 + Math.floor(i / 8) * 16;
            const endX = 85;
            const endY = 50;
            
            return (
              <motion.circle
                key={`pulse-${i}`}
                r="3"
                fill="#06b6d4"
                filter="url(#glow)"
                animate={{
                  cx: [`${startX}%`, `${endX}%`],
                  cy: [`${startY}%`, `${endY}%`],
                  opacity: [0, 1, 0],
                  r: [3, 5, 3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>

        {/* Floating Data Particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: `hsl(${180 + i * 8}, 80%, 65%)`,
                boxShadow: `0 0 15px hsl(${180 + i * 8}, 80%, 65%)`
              }}
              animate={{
                x: [Math.random() * 1200, Math.random() * 1200, Math.random() * 1200],
                y: [Math.random() * 800, Math.random() * 800, Math.random() * 800],
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
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
            border: '2px solid rgba(14,165,233,0.55)',
            position: 'relative',
            boxShadow: '0 40px 130px rgba(0,0,0,0.9), 0 0 70px rgba(14,165,233,0.28)',
            overflow: 'hidden'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#0ea5e9' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.div style={{ width: 32, height: 32, position: 'relative' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Image src="/logo_original.png" alt="SYNTX" width={32} height={32} style={{ filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.5))' }} />
              </motion.div>
              <div>
                <h2 className="glow-text" style={{ fontSize: 18, fontWeight: 900, color: '#0ea5e9', fontFamily: 'monospace', margin: 0, letterSpacing: 1.5 }}>FIELD ANALYTICS</h2>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>Neural Performance Analysis</div>
              </div>
            </div>
            <button onClick={onClose} className="cyber-btn" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>×</button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 5, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            {(['uses', 'score', 'success'] as const).map(sort => (
              <button key={sort} onClick={() => setSortBy(sort)} className="cyber-btn" style={{ padding: '4px 10px', borderRadius: 5, border: sortBy === sort ? '1px solid rgba(14,165,233,0.5)' : '1px solid rgba(255,255,255,0.15)', background: sortBy === sort ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.05)', color: sortBy === sort ? '#0ea5e9' : 'rgba(255,255,255,0.5)', fontSize: 8, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>
                {sort === 'uses' ? '🔥 USES' : sort === 'score' ? '⚡ SCORE' : '✨ SUCCESS'}
              </button>
            ))}
          </motion.div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, display: 'grid', gap: 6, position: 'relative', zIndex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <motion.div style={{ width: 35, height: 35, border: '3px solid rgba(14,165,233,0.2)', borderTopColor: '#0ea5e9', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : sortedAnalytics.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
                No analytics data yet
              </div>
            ) : (
              sortedAnalytics.map((field, idx) => <FieldCard key={idx} field={field} index={idx} />)
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function FieldCard({ field, index }: { field: FieldAnalytics; index: number }) {
  const scoreColor = field.avg_score >= 0.7 ? '#10b981' : field.avg_score >= 0.4 ? '#f59e0b' : '#ef4444';
  const hasProblems = field.problem_indicators && field.problem_indicators.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.005, x: 3 }}
      className="cyber-card"
      style={{
        padding: 12,
        borderRadius: 9,
        background: hasProblems ? 'rgba(239,68,68,0.05)' : 'rgba(0,0,0,0.6)',
        border: hasProblems ? '1px solid rgba(239,68,68,0.3)' : `1px solid ${scoreColor}20`,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 10, alignItems: 'center' }}>
        <motion.div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `conic-gradient(${scoreColor} ${field.avg_score * 360}deg, rgba(0,0,0,0.3) 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ position: 'absolute', width: 34, height: 34, borderRadius: '50%', background: 'rgba(8,24,42,1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: scoreColor, fontFamily: 'monospace' }}>
            {(field.avg_score * 100).toFixed(0)}%
          </div>
        </motion.div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0ea5e9', fontFamily: 'monospace' }}>{field.field}</div>
            {hasProblems && <span style={{ fontSize: 10 }}>⚠️</span>}
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            {field.total_uses} uses • {(field.success_rate * 100).toFixed(0)}% success
          </div>
          {hasProblems && (
            <div style={{ fontSize: 7, color: '#ef4444', fontFamily: 'monospace', marginTop: 2 }}>
              {field.problem_indicators!.join(', ')}
            </div>
          )}
        </div>

        <div style={{ padding: '4px 9px', borderRadius: 6, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: '#8b5cf6', fontFamily: 'monospace' }}>{field.recent_prompts}</div>
          <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>RECENT</div>
        </div>

        <div style={{ padding: '5px 11px', borderRadius: 6, background: `linear-gradient(135deg, ${scoreColor}18, ${scoreColor}06)`, border: `1.5px solid ${scoreColor}32`, textAlign: 'center' }}>
          <div className="glow-text" style={{ fontSize: 14, fontWeight: 900, color: scoreColor, fontFamily: 'monospace' }}>
            {(field.avg_score * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
