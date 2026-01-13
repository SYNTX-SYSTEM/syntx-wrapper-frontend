'use client';

import { useOrganStore } from '../store';
import { motion } from 'framer-motion';

export default function FormatLayer() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const hoverFormatName = useOrganStore((state) => state.hoverFormatName);
  const setHoverFormat = useOrganStore((state) => state.setHoverFormat);

  if (!snapshot) return null;

  const getFormatPosition = (name: string, total: number, index: number) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const angle = (index / total) * Math.PI * 2;
    const radius = Math.min(w, h) * 0.45;
    return { x: w / 2 + Math.cos(angle) * radius, y: h / 2 + Math.sin(angle) * radius };
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none' }}>
      {snapshot.formats.map((format, index) => {
        const pos = getFormatPosition(format.name, snapshot.formats.length, index);
        const isHovered = hoverFormatName === format.name;
        const hasBinding = snapshot.bindings.some(b => b.formatName === format.name);

        return (
          <motion.div
            key={format.name}
            onMouseEnter={() => setHoverFormat(format.name)}
            onMouseLeave={() => setHoverFormat(null)}
            style={{
              position: 'absolute',
              left: pos.x - 40,
              top: pos.y - 40,
              width: 80,
              height: 80,
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="80" height="80" style={{ overflow: 'visible' }}>
              {/* MAIN STATION BODY */}
              <motion.polygon
                points="40,10 65,25 65,55 40,70 15,55 15,25"
                fill={hasBinding ? 'rgba(0,212,255,0.2)' : 'rgba(100,100,120,0.15)'}
                stroke={isHovered ? '#00d4ff' : hasBinding ? 'rgba(0,212,255,0.6)' : 'rgba(100,100,120,0.4)'}
                strokeWidth={isHovered ? 3 : 2}
                animate={{ 
                  filter: isHovered ? 'drop-shadow(0 0 15px rgba(0,212,255,1))' : 'none'
                }}
              />
              
              {/* ANTENNA ARRAY */}
              <line x1="40" y1="10" x2="40" y2="0" stroke={hasBinding ? '#00d4ff' : '#606080'} strokeWidth="2" />
              <circle cx="40" cy="0" r="3" fill={hasBinding ? '#00d4ff' : '#606080'}>
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>
              
              {/* SIDE ANTENNAS */}
              <line x1="15" y1="25" x2="5" y2="20" stroke={hasBinding ? '#00d4ff' : '#606080'} strokeWidth="1.5" />
              <line x1="65" y1="25" x2="75" y2="20" stroke={hasBinding ? '#00d4ff' : '#606080'} strokeWidth="1.5" />
              
              {/* CORE LIGHT */}
              <motion.circle
                cx="40"
                cy="40"
                r="8"
                fill={hasBinding ? 'rgba(0,212,255,0.4)' : 'rgba(100,100,120,0.3)'}
                stroke={hasBinding ? '#00d4ff' : '#606080'}
                strokeWidth="2"
                animate={{ 
                  r: isHovered ? [8, 10, 8] : 8,
                  opacity: hasBinding ? [0.6, 1, 0.6] : 0.4
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* DOCKING PORTS */}
              {[0, 120, 240].map((angle, i) => {
                const x = 40 + Math.cos((angle * Math.PI) / 180) * 20;
                const y = 40 + Math.sin((angle * Math.PI) / 180) * 20;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={hasBinding ? 'rgba(0,212,255,0.3)' : 'rgba(100,100,120,0.2)'}
                    stroke={hasBinding ? '#00d4ff' : '#606080'}
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
            
            {/* STATION NAME */}
            <motion.div 
              style={{
                position: 'absolute',
                top: '85px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: isHovered ? '#00d4ff' : hasBinding ? 'rgba(0,212,255,0.7)' : 'rgba(255,255,255,0.5)',
                fontSize: '10px',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                textShadow: isHovered ? '0 0 8px rgba(0,212,255,0.8)' : 'none',
                pointerEvents: 'none',
              }}
              animate={{ 
                y: isHovered ? [0, -3, 0] : 0
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {format.name}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
