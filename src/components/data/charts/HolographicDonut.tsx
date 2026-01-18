"use client";
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { getWrapperColor } from '@/lib/colorUtils';

interface HolographicDonutProps {
  data: Array<{
    name: string;
    value: number;
    fullName: string;
  }>;
}

export function HolographicDonut({ data }: HolographicDonutProps) {
  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {data.map((entry, i) => {
              const color = getWrapperColor(entry.fullName);
              return (
                <filter key={i} id={`donutGlow-${i}`}>
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              );
            })}
          </defs>
          <Pie 
            data={data} 
            cx="50%" 
            cy="50%" 
            innerRadius={60} 
            outerRadius={100} 
            paddingAngle={5}
            dataKey="value" 
            stroke="none"
            animationBegin={0}
            animationDuration={1500}
          >
            {data.map((entry, i) => {
              const color = getWrapperColor(entry.fullName);
              return (
                <Cell 
                  key={`cell-${i}`} 
                  fill={color}
                  style={{ 
                    filter: `url(#donutGlow-${i}) drop-shadow(0 0 10px ${color})`,
                    cursor: 'pointer'
                  }}
                />
              );
            })}
          </Pie>
          <Tooltip 
            contentStyle={{
              background: 'rgba(10,26,46,0.98)',
              border: '1px solid rgba(0,212,255,0.4)',
              borderRadius: 12,
              boxShadow: '0 0 30px rgba(0,212,255,0.3)',
              fontFamily: 'monospace'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            formatter={(v) => (
              <span style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontFamily: 'monospace', 
                fontSize: 10 
              }}>
                {v}
              </span>
            )} 
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
