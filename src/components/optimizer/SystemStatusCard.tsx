"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SystemStatus {
  status: string;
  version: string;
  pending_suggestions: number;
  features: string[];
}

export default function SystemStatusCard() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/autonomous/status");
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !status) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cyber-card"
      style={{
        padding: 20,
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(16,185,129,0.3)',
        position: 'relative',
        overflow: 'visible',
        marginBottom: 20
      }}
    >
      <div className="scan-line" style={{ '--scan-color': '#10b981' } as React.CSSProperties} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <motion.div
          className="pulse"
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 20px rgba(16,185,129,0.8)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="glow-text" style={{
          fontSize: 14,
          fontWeight: 800,
          color: '#10b981',
          fontFamily: 'monospace',
          letterSpacing: 2
        }}>
          {status.status}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{
          padding: 12,
          borderRadius: 10,
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.2)'
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4, fontFamily: 'monospace' }}>
            VERSION
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>
            {status.version}
          </div>
        </div>
        
        <div style={{
          padding: 12,
          borderRadius: 10,
          background: 'rgba(217,70,239,0.1)',
          border: '1px solid rgba(217,70,239,0.2)'
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4, fontFamily: 'monospace' }}>
            PENDING
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#d946ef', fontFamily: 'monospace' }}>
            {status.pending_suggestions}
          </div>
        </div>
      </div>

      <div style={{
        fontSize: 9,
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'monospace',
        marginBottom: 8,
        letterSpacing: 1
      }}>
        FEATURES:
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {status.features.map((feature, idx) => (
          <span
            key={idx}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
              color: '#10b981',
              fontSize: 9,
              fontFamily: 'monospace',
              fontWeight: 600
            }}
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
