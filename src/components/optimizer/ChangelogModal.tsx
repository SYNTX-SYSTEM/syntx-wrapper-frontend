"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ChangelogEntry {
  timestamp: string;
  profile_id: string;
  changed_by: string;
  change_type: string;
  reason: string;
  changes?: any;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangelogModal({ isOpen, onClose }: Props) {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (isOpen) fetchChangelog(); }, [isOpen]);

  const fetchChangelog = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/changelog?limit=100");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setChangelog(data.changelog || []);
    } catch (error) {
      console.error("Failed to fetch changelog:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChangelog = changelog.filter(entry => !typeFilter || entry.change_type === typeFilter);

  const stats = {
    create: changelog.filter(e => e.change_type === 'create').length,
    update: changelog.filter(e => e.change_type === 'update').length,
    delete: changelog.filter(e => e.change_type === 'delete').length
  };

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
        {/* MEGA NEURAL NETWORK - PURPLE THEME */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="neuralGradChange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#a78bfa', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 0.7 }} />
            </linearGradient>
            <filter id="glowChange">
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
                        stroke="url(#neuralGradChange)"
                        strokeWidth="2"
                        filter="url(#glowChange)"
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
                    fill="url(#neuralGradChange)"
                    filter="url(#glowChange)"
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
                fill="#8b5cf6"
                filter="url(#glowChange)"
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
                background: `hsl(${270 + i * 5}, 75%, 65%)`,
                boxShadow: `0 0 18px hsl(${270 + i * 5}, 75%, 65%)`
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
            border: '2px solid rgba(139,92,246,0.55)',
            position: 'relative',
            boxShadow: '0 40px 130px rgba(0,0,0,0.9), 0 0 70px rgba(139,92,246,0.28)',
            overflow: 'hidden'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#8b5cf6' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.div style={{ width: 32, height: 32, position: 'relative' }} animate={{ rotate: [0, 360] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                <Image src="/logo_original.png" alt="SYNTX" width={32} height={32} style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.5))' }} />
              </motion.div>
              <div>
                <h2 className="glow-text" style={{ fontSize: 18, fontWeight: 900, color: '#8b5cf6', fontFamily: 'monospace', margin: 0, letterSpacing: 1.5 }}>SYSTEM CHANGELOG</h2>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>Profile Evolution Timeline</div>
              </div>
            </div>
            <button onClick={onClose} className="cyber-btn" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>×</button>
          </div>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <button onClick={() => setTypeFilter(typeFilter === 'create' ? '' : 'create')} className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: typeFilter === 'create' ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.08)', border: `1px solid rgba(16,185,129,${typeFilter === 'create' ? 0.4 : 0.25})`, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>{stats.create}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>CREATE</div>
            </button>
            <button onClick={() => setTypeFilter(typeFilter === 'update' ? '' : 'update')} className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: typeFilter === 'update' ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)', border: `1px solid rgba(245,158,11,${typeFilter === 'update' ? 0.4 : 0.25})`, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace' }}>{stats.update}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>UPDATE</div>
            </button>
            <button onClick={() => setTypeFilter(typeFilter === 'delete' ? '' : 'delete')} className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: typeFilter === 'delete' ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.08)', border: `1px solid rgba(239,68,68,${typeFilter === 'delete' ? 0.4 : 0.25})`, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#ef4444', fontFamily: 'monospace' }}>{stats.delete}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>DELETE</div>
            </button>
          </motion.div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, position: 'relative', zIndex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <motion.div style={{ width: 35, height: 35, border: '3px solid rgba(139,92,246,0.2)', borderTopColor: '#8b5cf6', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : filteredChangelog.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 35, color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📜</div>
                {typeFilter ? 'No entries for this type' : 'No changelog entries yet'}
              </div>
            ) : (
              <>
                <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, rgba(139,92,246,0.5), transparent)' }} />
                <div style={{ display: 'grid', gap: 8 }}>
                  {filteredChangelog.map((entry, idx) => <ChangelogEntry key={idx} entry={entry} index={idx} />)}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function ChangelogEntry({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const typeColor = entry.change_type === 'create' ? '#10b981' : entry.change_type === 'update' ? '#f59e0b' : entry.change_type === 'delete' ? '#ef4444' : '#8b5cf6';

  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.015 }} style={{ position: 'relative', paddingLeft: 30 }}>
      <motion.div style={{ position: 'absolute', left: 3, top: 5, width: 12, height: 12, borderRadius: '50%', background: typeColor, border: '3px solid rgba(4,10,18,1)', boxShadow: `0 0 14px ${typeColor}`, zIndex: 2 }} animate={{ scale: [1, 1.1, 1], boxShadow: [`0 0 14px ${typeColor}`, `0 0 22px ${typeColor}`, `0 0 14px ${typeColor}`] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <motion.div whileHover={{ scale: 1.002, x: 2 }} className="cyber-card" style={{ padding: 9, borderRadius: 8, background: 'rgba(0,0,0,0.6)', border: `1px solid ${typeColor}24`, cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <span style={{ padding: '2px 5px', borderRadius: 4, background: `${typeColor}14`, border: `1px solid ${typeColor}30`, color: typeColor, fontSize: 7, fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase' }}>{entry.change_type}</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#00d4ff', fontFamily: 'monospace' }}>{entry.profile_id}</span>
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.48)', lineHeight: 1.3 }}>{entry.reason}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{new Date(entry.timestamp).toLocaleString('de-DE')}</div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginTop: 2 }}>by {entry.changed_by}</div>
          </div>
        </div>
        {expanded && entry.changes && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 7, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', maxHeight: 100, overflowY: 'auto' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(entry.changes, null, 2)}</pre>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
