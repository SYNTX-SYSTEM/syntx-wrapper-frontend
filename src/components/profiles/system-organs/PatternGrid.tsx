// ═══════════════════════════════════════════════════════════════════════════
// 🔷 PATTERN GRID - Container for Pattern Cards
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react';
import { PatternCard } from './PatternCard';

interface Pattern {
  name: string;
  cluster?: string;
  score: number;
  state: 'ACTIVE' | 'DORMANT' | 'TENSIONED' | 'UNBORN';
  stability: string;
  matchCount: number;
  weight?: number;
}

interface PatternGridProps {
  patterns: Pattern[];
}

export function PatternGrid({ patterns }: PatternGridProps) {
  
  if (patterns.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '48px 0', 
        color: 'rgba(255,255,255,0.4)', 
        fontFamily: 'monospace', 
        fontSize: 12 
      }}>
        NO PATTERNS DEFINED
      </div>
    );
  }
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: 12 
    }}>
      {patterns.map((pattern) => (
        <PatternCard
          key={pattern.name}
          name={pattern.name}
          cluster={pattern.cluster}
          score={pattern.score}
          state={pattern.state}
          stability={pattern.stability}
          matchCount={pattern.matchCount}
          weight={pattern.weight}
        />
      ))}
    </div>
  );
}
