"use client";
import React, { useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Scatter } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = { cyan: '#00d4ff', purple: '#d946ef' };

interface NeuralPulseWaveProps {
  data: Array<{
    id: string;
    time: string;
    latency: number;
    timestamp: Date;
    wrapper: string;
  }>;
}

export function NeuralPulseWave({ data }: NeuralPulseWaveProps) {
  const particles = useMemo(() => 
    data.slice(-5).map((d, i) => ({ 
      id: d.id, 
      x: (i / 5) * 100, 
      delay: i * 0.2 
    })), [data]
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Particle Trail Layer - only for last 5 data points */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.5, 0],
            x: [`${p.x}%`, `${p.x + 5}%`],
            y: ['50%', '20%', '50%']
          }}
          transition={{ 
            duration: 3, 
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${COLORS.cyan}, transparent)`,
            boxShadow: `0 0 20px ${COLORS.cyan}`,
            pointerEvents: 'none',
            zIndex: 10
          }}
        />
      ))}

      {/* Chart Layer with REAL DATA */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="neuralGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.6}/>
              <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
            </linearGradient>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={10}
            style={{ fontFamily: 'monospace' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={10}
            tickFormatter={(v) => `${v}s`}
            style={{ fontFamily: 'monospace' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(10,26,46,0.98)',
              border: `1px solid ${COLORS.cyan}40`,
              borderRadius: 12,
              boxShadow: `0 0 30px ${COLORS.cyan}30`,
              fontFamily: 'monospace',
              fontSize: 11
            }}
          />
          <Area 
            type="monotone" 
            dataKey="latency" 
            stroke={COLORS.cyan}
            strokeWidth={3}
            fill="url(#neuralGrad)"
            filter="url(#glowEffect)"
            animationDuration={1000}
            name="Latency (s)"
          />
          <Line
            type="monotone"
            dataKey="latency"
            stroke={COLORS.purple}
            strokeWidth={1}
            dot={false}
            strokeDasharray="5 5"
          />
          <Scatter 
            dataKey="latency" 
            fill={COLORS.cyan}
            r={4}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
