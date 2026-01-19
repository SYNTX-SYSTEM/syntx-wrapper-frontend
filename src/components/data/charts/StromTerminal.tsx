"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { StreamEvent } from '@/lib/api';
import { getWrapperColor } from '@/lib/colorUtils';

interface StromTerminalProps {
  events: StreamEvent[];
}

export function StromTerminal({ events }: StromTerminalProps) {
  const eventsList = Array.isArray(events) ? events : [];
  
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <motion.div
        animate={{ x: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, #00d4ff, transparent)',
          boxShadow: '0 0 10px #00d4ff',
          zIndex: 10
        }}
      />

      <div style={{ maxHeight: 300, overflow: 'auto', position: 'relative' }}>
        {eventsList.slice(0, 10).map((event, i) => {
          const color = getWrapperColor(event.wrapper_chain?.[0] || 'unknown');
          const isActive = i === 0;
          
          return (
            <motion.div
              key={event.request_id + i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                background: isActive ? `${color}15` : 'transparent',
                borderLeft: `3px solid ${color}`,
                marginBottom: 4,
                borderRadius: '0 8px 8px 0',
                position: 'relative'
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: event.latency_ms ? '#10b981' : '#f59e0b',
                  boxShadow: `0 0 8px ${event.latency_ms ? '#10b981' : '#f59e0b'}`
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 11, 
                  fontFamily: 'monospace', 
                  color: 'white',
                  textShadow: `0 0 4px ${color}`
                }}>
                  {event.stage}
                </div>
                <div style={{ 
                  fontSize: 9, 
                  color: 'rgba(255,255,255,0.4)', 
                  fontFamily: 'monospace' 
                }}>
                  {event.request_id.slice(0, 8)}...
                </div>
              </div>

              {event.latency_ms && (
                <div style={{ 
                  width: 60,
                  height: 4,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((event.latency_ms / 100000) * 100, 100)}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${color}, #00d4ff)`,
                      boxShadow: `0 0 6px ${color}`
                    }}
                  />
                </div>
              )}

              {event.latency_ms && (
                <div style={{ 
                  fontSize: 11, 
                  fontFamily: 'monospace', 
                  color: '#f59e0b',
                  minWidth: 40,
                  textAlign: 'right'
                }}>
                  {(event.latency_ms / 1000).toFixed(1)}s
                </div>
              )}

              <div style={{ 
                fontSize: 9, 
                color: 'rgba(255,255,255,0.3)', 
                fontFamily: 'monospace',
                minWidth: 60,
                textAlign: 'right'
              }}>
                {new Date(event.timestamp).toLocaleTimeString('de-DE')}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
