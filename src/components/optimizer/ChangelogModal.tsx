"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (isOpen) {
      fetchChangelog();
    }
  }, [isOpen]);

  const fetchChangelog = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/changelog?limit=50");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setChangelog(data.changelog || []);
    } catch (error) {
      console.error("Failed to fetch changelog:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="cyber-card"
          style={{
            width: '90%',
            maxWidth: 900,
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: 40,
            borderRadius: 24,
            background: 'linear-gradient(145deg, rgba(10,26,46,0.98), rgba(6,13,24,0.98))',
            border: '2px solid rgba(139,92,246,0.5)',
            position: 'relative',
            boxShadow: '0 30px 100px rgba(0,0,0,0.7), 0 0 50px rgba(139,92,246,0.2)'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#8b5cf6' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 48 }}>📜</span>
              <div>
                <h2 className="glow-text" style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#8b5cf6',
                  fontFamily: 'monospace',
                  margin: 0,
                  letterSpacing: 3
                }}>
                  SYSTEM CHANGELOG
                </h2>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'monospace',
                  marginTop: 4,
                  letterSpacing: 2
                }}>
                  Profile Evolution Timeline • Autonomous Updates
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
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
              <motion.div
                style={{
                  width: 80,
                  height: 80,
                  border: '5px solid rgba(139,92,246,0.2)',
                  borderTopColor: '#8b5cf6',
                  borderRadius: '50%'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          ) : changelog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: 80, marginBottom: 20 }}>📜</div>
              No changelog entries yet
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              {/* Timeline Line */}
              <div style={{
                position: 'absolute',
                left: 20,
                top: 0,
                bottom: 0,
                width: 2,
                background: 'linear-gradient(180deg, rgba(139,92,246,0.5), transparent)',
              }} />
              
              <div style={{ display: 'grid', gap: 20 }}>
                {changelog.map((entry, idx) => (
                  <ChangelogEntry key={idx} entry={entry} index={idx} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ChangelogEntry({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  
  const typeColor = entry.change_type === 'create' ? '#10b981' 
    : entry.change_type === 'update' ? '#f59e0b' 
    : entry.change_type === 'delete' ? '#ef4444' 
    : '#8b5cf6';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{ position: 'relative', paddingLeft: 60 }}
    >
      {/* Timeline Dot */}
      <motion.div
        style={{
          position: 'absolute',
          left: 11,
          top: 12,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: typeColor,
          border: '3px solid rgba(6,13,24,1)',
          boxShadow: `0 0 20px ${typeColor}`,
          zIndex: 2
        }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            `0 0 20px ${typeColor}`,
            `0 0 30px ${typeColor}`,
            `0 0 20px ${typeColor}`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div
        className="cyber-card"
        style={{
          padding: 20,
          borderRadius: 14,
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid ${typeColor}30`,
          cursor: 'pointer'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{
                padding: '4px 10px',
                borderRadius: 6,
                background: `${typeColor}20`,
                border: `1px solid ${typeColor}40`,
                color: typeColor,
                fontSize: 10,
                fontFamily: 'monospace',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {entry.change_type}
              </span>
              <span style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#00d4ff',
                fontFamily: 'monospace'
              }}>
                {entry.profile_id}
              </span>
            </div>
            <div style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6
            }}>
              {entry.reason}
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace'
            }}>
              {new Date(entry.timestamp).toLocaleString('de-DE')}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
              marginTop: 4
            }}>
              by {entry.changed_by}
            </div>
          </div>
        </div>

        {expanded && entry.changes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontSize: 11,
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.5)',
              maxHeight: 200,
              overflowY: 'auto'
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(entry.changes, null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
