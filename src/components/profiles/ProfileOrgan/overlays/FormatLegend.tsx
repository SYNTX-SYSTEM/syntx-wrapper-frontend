'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFormatColor } from '@/lib/tooltips';

interface Format {
  name: string;
  fields_count: number;
}

export default function FormatLegend() {
  const [formats, setFormats] = useState<Format[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dev.syntx-system.com/resonanz/formats')
      .then(res => res.json())
      .then(data => {
        setFormats(data.formats || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      {/* CONTAINER */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '16px',
          padding: '16px',
          maxHeight: '600px',
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '280px',
          boxShadow: '0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.05)',
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '2px',
            margin: 0,
            textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          }}>
            ⚡ FORMAT LEGEND
          </h3>
          <p style={{
            color: '#666',
            fontSize: '11px',
            fontFamily: 'monospace',
            margin: '4px 0 0 0',
          }}>
            {formats.length} formats active
          </p>
        </div>

        {/* FORMATS LIST - STERNEN STROM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {formats.map((format, index) => {
            const color = getFormatColor(format.name);
            
            return (
              <motion.div
                key={format.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + (index * 0.05),
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  background: `linear-gradient(90deg, ${color.primary}08, transparent)`,
                  border: `1px solid ${color.primary}30`,
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* STAR GLOW */}
                <motion.div
                  animate={{
                    x: [-20, 280],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: color.primary,
                    boxShadow: `0 0 10px ${color.glow}, 0 0 20px ${color.glow}`,
                  }}
                />

                {/* COLOR INDICATOR */}
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: color.primary,
                    boxShadow: `0 0 12px ${color.glow}, inset 0 0 6px rgba(255, 255, 255, 0.3)`,
                    flexShrink: 0,
                  }}
                />

                {/* FORMAT INFO */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: color.primary,
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: 'monospace',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textShadow: `0 0 8px ${color.glow}`,
                    }}
                  >
                    {format.name}
                  </div>
                  <div
                    style={{
                      color: '#888',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      marginTop: '2px',
                    }}
                  >
                    {format.fields_count} fields
                  </div>
                </div>

                {/* PULSE RING */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity,
                  }}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: `2px solid ${color.primary}`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SCROLLBAR STYLE */}
      <style>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
