"use client";
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { getWrapperColor } from '@/lib/colorUtils';

interface EnergyBarsProps {
  data: Array<{
    name: string;
    avg: number;
    count: number;
  }>;
}

export function EnergyBars({ data }: EnergyBarsProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <defs>
          {data.map((entry, i) => {
            const color = getWrapperColor(`syntex_wrapper_${entry.name.toLowerCase()}`);
            return (
              <linearGradient key={i} id={`barGrad-${entry.name}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="100%" stopColor={color} stopOpacity={1}/>
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          type="number" 
          stroke="rgba(255,255,255,0.3)" 
          fontSize={10}
          style={{ fontFamily: 'monospace' }}
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          stroke="rgba(255,255,255,0.3)" 
          fontSize={10} 
          width={100}
          style={{ fontFamily: 'monospace' }}
        />
        <Tooltip 
          contentStyle={{
            background: 'rgba(10,26,46,0.98)',
            border: '1px solid rgba(0,212,255,0.4)',
            borderRadius: 12,
            fontFamily: 'monospace'
          }}
        />
        <Bar 
          dataKey="avg" 
          name="Avg Latency (s)" 
          radius={[0, 8, 8, 0]}
          animationDuration={1000}
        >
          {data.map((entry, i) => {
            const color = getWrapperColor(`syntex_wrapper_${entry.name.toLowerCase()}`);
            return (
              <Cell 
                key={`cell-${i}`} 
                fill={`url(#barGrad-${entry.name})`}
                style={{ 
                  filter: `drop-shadow(0 0 8px ${color}66)` 
                }}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
