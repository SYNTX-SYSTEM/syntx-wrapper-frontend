"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  timestamp: string;
  field: string;
  score: number;
  profile: string;
  text_preview: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecentLogsModal({ isOpen, onClose }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/logs?limit=50");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    !filter || log.field.toLowerCase().includes(filter.toLowerCase())
  );

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
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)'
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
            maxWidth: 1000,
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            padding: 32,
            borderRadius: 20,
            background: 'linear-gradient(145deg, rgba(10,26,46,0.98), rgba(6,13,24,0.98))',
            border: '2px solid rgba(0,212,255,0.4)',
            position: 'relative',
            boxShadow: '0 20px 80px rgba(0,0,0,0.6)'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#00d4ff' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 40 }}>📋</span>
              <h2 className="glow-text" style={{
                fontSize: 28,
                fontWeight: 900,
                color: '#00d4ff',
                fontFamily: 'monospace',
                margin: 0,
                letterSpacing: 2
              }}>
                RECENT LOGS
              </h2>
            </div>
            <button
              onClick={onClose}
              className="cyber-btn"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 20,
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by field..."
            style={{
              width: '100%',
              padding: '14px 18px',
              marginBottom: 20,
              borderRadius: 12,
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              fontSize: 13,
              fontFamily: 'monospace',
              outline: 'none'
            }}
          />

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
              <motion.div
                style={{
                  width: 60,
                  height: 60,
                  border: '4px solid rgba(0,212,255,0.2)',
                  borderTopColor: '#00d4ff',
                  borderRadius: '50%'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gap: 10 }}>
              {filteredLogs.map((log, idx) => (
                <LogRow key={idx} log={log} index={idx} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function LogRow({ log, index }: { log: LogEntry; index: number }) {
  const scoreColor = log.score >= 0.7 ? '#10b981' : log.score >= 0.4 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02 }}
      className="data-stream"
      style={{
        padding: 14,
        borderRadius: 10,
        background: 'rgba(0,0,0,0.3)',
        border: `1px solid ${scoreColor}20`,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto auto',
        gap: 14,
        alignItems: 'center',
        fontSize: 11
      }}
    >
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: scoreColor,
        boxShadow: `0 0 10px ${scoreColor}`
      }} />

      <div>
        <div style={{
          fontWeight: 700,
          color: '#00d4ff',
          fontFamily: 'monospace',
          marginBottom: 4
        }}>
          {log.field}
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 10,
          fontFamily: 'monospace'
        }}>
          {log.text_preview.substring(0, 60)}...
        </div>
      </div>

      <div style={{
        padding: '6px 12px',
        borderRadius: 8,
        background: `${scoreColor}20`,
        border: `1px solid ${scoreColor}40`,
        color: scoreColor,
        fontFamily: 'monospace',
        fontWeight: 700
      }}>
        {(log.score * 100).toFixed(0)}%
      </div>

      <div style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: 9,
        fontFamily: 'monospace'
      }}>
        {new Date(log.timestamp).toLocaleTimeString()}
      </div>
    </motion.div>
  );
}
