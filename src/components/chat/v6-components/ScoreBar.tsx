"use client";

import React from 'react';

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  label: string;
  delay?: number;
}

export function ScoreBar({ score, maxScore = 10, label, delay = 0 }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;
  const color = score >= 8 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444';

  return (
    <div className="score-tag" style={{ marginBottom: 8, animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ 
          fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)', 
          textTransform: 'uppercase' 
        }}>
          {label}
        </span>
        <span style={{ 
          fontSize: 11, fontFamily: 'monospace', fontWeight: 700, 
          color, textShadow: `0 0 10px ${color}` 
        }}>
          {score}/{maxScore}
        </span>
      </div>
      <div style={{ 
        height: 6, background: 'rgba(255,255,255,0.1)', 
        borderRadius: 3, overflow: 'hidden' 
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          borderRadius: 3,
          boxShadow: `0 0 10px ${color}`,
          transition: 'width 0.5s ease-out'
        }} />
      </div>
    </div>
  );
}
