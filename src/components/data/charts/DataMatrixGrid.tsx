"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { StreamEvent } from '@/lib/api';

interface DataMatrixGridProps {
  events: StreamEvent[];
}

export function DataMatrixGrid({ events }: DataMatrixGridProps) {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  
  const activity = useMemo(() => {
    const map = new Map<string, number>();
    
    if (Array.isArray(events)) {
      events.forEach(e => {
        const date = new Date(e.timestamp);
        const key = `${date.getDay()}-${date.getHours()}`;
        map.set(key, (map.get(key) || 0) + 1);
      });
    }
    
    return map;
  }, [events]);

  const maxActivity = useMemo(() => {
    const values = Array.from(activity.values());
    return values.length > 0 ? Math.max(...values) : 1;
  }, [activity]);

  return (
    <div style={{ display: 'flex', gap: 4, height: '100%', alignItems: 'center' }}>
      {days.map((day, dayIdx) => (
        <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ 
            fontSize: 9, 
            color: 'rgba(255,255,255,0.4)', 
            textAlign: 'center',
            fontFamily: 'monospace',
            marginBottom: 4
          }}>
            {day}
          </div>
          {[...Array(24)].map((_, hour) => {
            const key = `${dayIdx}-${hour}`;
            const count = activity.get(key) || 0;
            const intensity = count / maxActivity;
            const color = intensity > 0.7 ? '#00d4ff' : intensity > 0.4 ? '#10b981' : '#f59e0b';

            return (
              <motion.div
                key={hour}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: count > 0 ? [0.3, intensity, 0.3] : 0.1,
                  scale: count > 0 ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (dayIdx * 24 + hour) * 0.01
                }}
                whileHover={{
                  scale: 1.5,
                  zIndex: 10
                }}
                style={{
                  flex: 1,
                  background: count > 0 ? color : 'rgba(255,255,255,0.05)',
                  borderRadius: 2,
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: count > 0 ? `0 0 8px ${color}` : 'none',
                  minHeight: 4
                }}
                title={`${day} ${hour}:00 - ${count} events`}
              >
                {count > 0 && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: 2,
                      background: color,
                      boxShadow: `0 0 4px ${color}`
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
