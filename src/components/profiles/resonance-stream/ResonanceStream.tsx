"use client";
import { motion } from 'framer-motion';

interface Props {
  profileId: string;
  onModify: () => void;
}

export default function ResonanceStream({ profileId, onModify }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* HEADER */}
      <div className="cyber-card" style={{
        padding: 16,
        borderRadius: 10,
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid rgba(14,165,233,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#0ea5e9', fontFamily: 'monospace', marginBottom: 4 }}>
              {profileId}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
              Version 1.3 • Last updated: 2025-01-05
            </div>
          </div>
          <button className="cyber-btn" style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid rgba(139,92,246,0.3)',
            background: 'rgba(139,92,246,0.1)',
            color: '#8b5cf6',
            fontSize: 10,
            fontFamily: 'monospace',
            fontWeight: 700,
            cursor: 'pointer'
          }}>
            📎 CHANGELOG
          </button>
        </div>
      </div>

      {/* COMPONENTS SECTION */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0ea5e9', fontFamily: 'monospace', letterSpacing: 1.2, marginBottom: 10 }}>
          🧱 COMPONENTS
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <ComponentCard title="dynamic_patterns" patterns={['wandert → 92%', 'bewegt → 88%', 'fließt → 76%']} />
          <ComponentCard title="resonance_core" patterns={['kohärenz → 95%', 'feld → 89%']} />
        </div>
      </div>

      {/* TOOLS SECTION */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0ea5e9', fontFamily: 'monospace', letterSpacing: 1.2, marginBottom: 10 }}>
          🔧 TOOLS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button className="cyber-btn" style={{ padding: '10px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.05)', color: '#10b981', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>
            💡 AUTO-SUGGEST
          </button>
          <button className="cyber-btn" style={{ padding: '10px', borderRadius: 8, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)', color: '#f59e0b', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>
            🎯 RE-SCORE
          </button>
        </div>
      </div>

      {/* GPT MIRROR */}
      <div className="cyber-card" style={{
        padding: 14,
        borderRadius: 10,
        background: 'rgba(139,92,246,0.05)',
        border: '1px solid rgba(139,92,246,0.3)'
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#8b5cf6', fontFamily: 'monospace', marginBottom: 6 }}>
          🧠 GPT-MIRROR
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', lineHeight: 1.4 }}>
          Pattern &apos;wandert&apos; resoniert stark mit dem Feld &apos;drift_movement&apos; - hohe semantische Kohärenz im Bewegungs-Cluster.
        </div>
      </div>
    </motion.div>
  );
}

function ComponentCard({ title, patterns }: { title: string; patterns: string[] }) {
  return (
    <div className="cyber-card" style={{
      padding: 12,
      borderRadius: 8,
      background: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(14,165,233,0.2)'
    }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: '#0ea5e9', fontFamily: 'monospace', marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ display: 'grid', gap: 4 }}>
        {patterns.map((p, i) => (
          <div key={i} style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', paddingLeft: 8, borderLeft: '2px solid rgba(16,185,129,0.3)' }}>
            • {p}
          </div>
        ))}
      </div>
    </div>
  );
}
