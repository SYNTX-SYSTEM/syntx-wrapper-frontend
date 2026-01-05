"use client";
import { motion } from "framer-motion";

interface Props {
  pending: number;
  window: string;
  confidence: string;
}

export default function StatsStream({ pending, window, confidence }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      marginBottom: 20
    }}>
      <StatCard label="Pending" value={pending} color="#00d4ff" icon="📊" delay={0} />
      <StatCard label="Window" value={window} color="#d946ef" icon="⏱️" delay={0.1} />
      <StatCard label="Confidence" value={confidence} color="#10b981" icon="🎯" delay={0.2} />
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  color, 
  icon, 
  delay 
}: { 
  label: string; 
  value: string | number; 
  color: string; 
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="cyber-card float"
      style={{
        padding: 20,
        borderRadius: 16,
        background: `linear-gradient(145deg, ${color}15, ${color}05)`,
        border: `1px solid ${color}40`,
        position: 'relative',
        overflow: 'visible',
        animationDelay: `${delay}s`
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.8
      }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <span style={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: 2
        }}>
          {label}
        </span>
      </div>
      
      <div className="glow-text" style={{
        fontSize: 36,
        fontWeight: 900,
        color: color,
        fontFamily: 'monospace',
        textShadow: `0 0 20px ${color}`
      }}>
        {value}
      </div>
    </motion.div>
  );
}
