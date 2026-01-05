"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

interface FieldPerformance {
  field: string;
  avg_score: number;
  count: number;
  profile_used: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type SortBy = 'score' | 'count' | 'name';

export default function FieldAnalyticsModal({ isOpen, onClose }: Props) {
  const [fields, setFields] = useState<FieldPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>('score');

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const logsRes = await fetch("https://dev.syntx-system.com/resonanz/scoring/logs?limit=100");
      if (!logsRes.ok) throw new Error(`Logs fetch failed: ${logsRes.status}`);
      const logsData = await logsRes.json();
      
      const fieldSet = new Set<string>();
      logsData.logs.forEach((log: any) => {
        if (log.field) fieldSet.add(log.field);
      });
      const uniqueFields = Array.from(fieldSet);
      
      const performancePromises = uniqueFields.map(async (field) => {
        try {
          const perfRes = await fetch(`https://dev.syntx-system.com/resonanz/scoring/analytics/performance/${field}`);
          if (!perfRes.ok) return null;
          const perfData = await perfRes.json();
          return {
            field: perfData.field,
            avg_score: perfData.avg_score,
            count: perfData.total_scores,
            profile_used: perfData.profiles_used?.[0] || 'unknown'
          };
        } catch {
          return null;
        }
      });
      
      const results = await Promise.all(performancePromises);
      const validResults = results.filter((r): r is FieldPerformance => r !== null);
      
      setFields(validResults);
    } catch (err: any) {
      console.error("Failed to fetch analytics:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortedFields = [...fields].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.avg_score - a.avg_score;
      case 'count':
        return b.count - a.count;
      case 'name':
        return a.field.localeCompare(b.field);
      default:
        return 0;
    }
  });

  const totalSamples = fields.reduce((sum, f) => sum + f.count, 0);
  const avgScore = fields.length > 0 
    ? fields.reduce((sum, f) => sum + f.avg_score, 0) / fields.length 
    : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)'
        }}
      >
        {/* Neural Network Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          opacity: 0.15,
          pointerEvents: 'none'
        }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#d946ef' : '#f59e0b',
                boxShadow: `0 0 20px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#d946ef' : '#f59e0b'}`
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
                ],
                y: [
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
                ],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="cyber-card"
          style={{
            width: '90%',
            maxWidth: 1000,
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: 40,
            borderRadius: 24,
            background: 'linear-gradient(145deg, rgba(10,26,46,0.98), rgba(6,13,24,0.98))',
            border: '2px solid rgba(245,158,11,0.5)',
            position: 'relative',
            boxShadow: '0 30px 100px rgba(0,0,0,0.7), 0 0 50px rgba(245,158,11,0.2)'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#f59e0b' } as React.CSSProperties} />
          
          {/* Header with Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <motion.div
                className="float pulse"
                style={{
                  position: 'relative',
                  width: 60,
                  height: 60
                }}
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <Image 
                  src="/Logo1_trans.png" 
                  alt="SYNTX" 
                  width={60} 
                  height={60}
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.8))',
                    imageRendering: 'crisp-edges'
                  }}
                />
              </motion.div>
              
              <div>
                <h2 className="glow-text" style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#f59e0b',
                  fontFamily: 'monospace',
                  margin: 0,
                  letterSpacing: 3
                }}>
                  FIELD ANALYTICS
                </h2>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'monospace',
                  marginTop: 4,
                  letterSpacing: 2
                }}>
                  Neural Network Analysis • Field Resonance System
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="cyber-btn"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 24
          }}>
            <StatCard label="Total Fields" value={fields.length} color="#00d4ff" icon="🎯" />
            <StatCard label="Total Samples" value={totalSamples} color="#d946ef" icon="📊" />
            <StatCard label="Avg Performance" value={`${(avgScore * 100).toFixed(0)}%`} color={avgScore >= 0.7 ? '#10b981' : avgScore >= 0.4 ? '#f59e0b' : '#ef4444'} icon="⚡" />
          </div>

          {/* Sort Controls */}
          <div style={{
            display: 'flex',
            gap: 12,
            marginBottom: 20,
            padding: 16,
            borderRadius: 12,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <span style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              letterSpacing: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>🔧</span> SORT BY:
            </span>
            <SortButton active={sortBy === 'score'} onClick={() => setSortBy('score')} label="SCORE" />
            <SortButton active={sortBy === 'count'} onClick={() => setSortBy('count')} label="SAMPLES" />
            <SortButton active={sortBy === 'name'} onClick={() => setSortBy('name')} label="NAME" />
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 80, gap: 24 }}>
              <motion.div
                style={{
                  width: 80,
                  height: 80,
                  border: '5px solid rgba(245,158,11,0.2)',
                  borderTopColor: '#f59e0b',
                  borderRadius: '50%',
                  boxShadow: '0 0 40px rgba(245,158,11,0.4)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <div style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'monospace',
                fontSize: 13,
                letterSpacing: 2
              }}>
                AGGREGATING NEURAL FIELD DATA...
              </div>
            </div>
          ) : error ? (
            <div style={{
              padding: 60,
              textAlign: 'center',
              color: '#ef4444',
              fontFamily: 'monospace',
              fontSize: 14
            }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>⚠️</div>
              <div style={{ marginBottom: 20 }}>System Error: {error}</div>
              <button
                onClick={fetchAnalytics}
                className="cyber-btn"
                style={{
                  padding: '12px 24px',
                  borderRadius: 10,
                  border: '1px solid rgba(245,158,11,0.4)',
                  background: 'rgba(245,158,11,0.1)',
                  color: '#f59e0b',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 700
                }}
              >
                🔄 RETRY CONNECTION
              </button>
            </div>
          ) : fields.length === 0 ? (
            <div style={{
              padding: 80,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              fontSize: 14
            }}>
              <div style={{ fontSize: 80, marginBottom: 24 }}>📊</div>
              <div style={{ fontSize: 18, marginBottom: 12, color: 'rgba(255,255,255,0.6)' }}>
                No Neural Field Data
              </div>
              <div>Awaiting field calibration results...</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              {sortedFields.map((field, idx) => (
                <FieldRow key={field.field} field={field} index={idx} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="cyber-card"
      style={{
        padding: 16,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${color}15, ${color}05)`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <div>
        <div style={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'monospace',
          marginBottom: 4
        }}>
          {label}
        </div>
        <div className="glow-text" style={{
          fontSize: 24,
          fontWeight: 900,
          color: color,
          fontFamily: 'monospace'
        }}>
          {value}
        </div>
      </div>
    </motion.div>
  );
}

function SortButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cyber-btn"
      style={{
        padding: '8px 16px',
        borderRadius: 8,
        border: active ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
        background: active 
          ? 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))'
          : 'rgba(255,255,255,0.03)',
        color: active ? '#f59e0b' : 'rgba(255,255,255,0.5)',
        fontSize: 11,
        fontFamily: 'monospace',
        fontWeight: 700,
        cursor: 'pointer',
        letterSpacing: 1,
        boxShadow: active ? '0 0 20px rgba(245,158,11,0.3)' : 'none'
      }}
    >
      {label}
    </motion.button>
  );
}

function FieldRow({ field, index }: { field: FieldPerformance; index: number }) {
  const scoreColor = field.avg_score >= 0.7 ? '#10b981' : field.avg_score >= 0.4 ? '#f59e0b' : '#ef4444';
  const percentage = (field.avg_score * 100).toFixed(0);
  
  // 🔥 PROBLEM DETECTION
  const hasLowScore = field.avg_score < 0.3;
  const hasHighVolume = field.count > 5;
  const isProblem = hasLowScore && hasHighVolume;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.01, x: 4 }}
      className="cyber-card data-stream"
      style={{
        padding: 20,
        borderRadius: 14,
        background: isProblem 
          ? 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(0,0,0,0.4))'
          : 'rgba(0,0,0,0.4)',
        border: isProblem 
          ? '2px solid rgba(239,68,68,0.5)'
          : `1px solid ${scoreColor}30`,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto auto auto',
        gap: 20,
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* Problem Indicator */}
      {isProblem && (
        <motion.div
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            border: '2px solid rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            boxShadow: '0 0 30px rgba(239,68,68,0.8)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          ⚠️
        </motion.div>
      )}

      {/* Health Indicator Dot */}
      <motion.div
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: scoreColor,
          boxShadow: `0 0 20px ${scoreColor}`,
          border: '2px solid rgba(0,0,0,0.5)'
        }}
        animate={{
          scale: isProblem ? [1, 1.4, 1] : [1, 1.2, 1],
          opacity: [1, 0.6, 1]
        }}
        transition={{
          duration: isProblem ? 1 : 2,
          repeat: Infinity
        }}
      />

      {/* Field Info */}
      <div>
        <div style={{
          fontSize: 18,
          fontWeight: 900,
          color: isProblem ? '#ef4444' : '#00d4ff',
          fontFamily: 'monospace',
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          {field.field}
          {isProblem && (
            <span style={{
              fontSize: 9,
              padding: '3px 8px',
              borderRadius: 6,
              background: 'rgba(239,68,68,0.2)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#ef4444',
              fontWeight: 700,
              letterSpacing: 1
            }}>
              CRITICAL
            </span>
          )}
        </div>
        <div style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'monospace'
        }}>
          Profile: {field.profile_used}
        </div>
      </div>

      {/* Sample Count */}
      <div style={{
        textAlign: 'center',
        padding: '10px 16px',
        borderRadius: 10,
        background: 'rgba(0,212,255,0.1)',
        border: '1px solid rgba(0,212,255,0.2)'
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 800,
          color: '#00d4ff',
          fontFamily: 'monospace'
        }}>
          {field.count}
        </div>
        <div style={{
          fontSize: 8,
          color: 'rgba(255,255,255,0.3)',
          marginTop: 2,
          letterSpacing: 1
        }}>
          SAMPLES
        </div>
      </div>

      {/* Performance Bar */}
      <div style={{ width: 120 }}>
        <div style={{
          height: 8,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.1)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${field.avg_score * 100}%` }}
            transition={{ duration: 1, delay: index * 0.05 }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}aa)`,
              boxShadow: `0 0 10px ${scoreColor}`
            }}
          />
        </div>
      </div>

      {/* Score Badge */}
      <div style={{
        padding: '14px 26px',
        borderRadius: 12,
        background: `linear-gradient(135deg, ${scoreColor}30, ${scoreColor}15)`,
        border: `2px solid ${scoreColor}50`,
        textAlign: 'center',
        minWidth: 90
      }}>
        <div className="glow-text" style={{
          fontSize: 32,
          fontWeight: 900,
          color: scoreColor,
          fontFamily: 'monospace',
          lineHeight: 1
        }}>
          {percentage}%
        </div>
      </div>
    </motion.div>
  );
}
