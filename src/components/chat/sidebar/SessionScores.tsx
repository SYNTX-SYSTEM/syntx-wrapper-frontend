"use client";

import React from 'react';

interface Message {
  isUser: boolean;
  scores?: Array<{ field: string; score: number; maxScore: number }>;
}

interface SessionScoresProps {
  messages: Message[];
}

export function SessionScores({ messages }: SessionScoresProps) {
  const aiMessages = messages.filter(m => !m.isUser && m.scores && m.scores.length > 0);
  
  if (aiMessages.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', padding: 20, 
        color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'monospace' 
      }}>
        Noch keine Scores...
      </div>
    );
  }

  const allScores: { [key: string]: { total: number; count: number } } = {};
  
  aiMessages.forEach(m => {
    m.scores?.forEach(s => {
      if (!allScores[s.field]) allScores[s.field] = { total: 0, count: 0 };
      allScores[s.field].total += s.score;
      allScores[s.field].count += 1;
    });
  });

  const avgScores = Object.entries(allScores).map(([field, data]) => ({
    field,
    avg: Math.round((data.total / data.count) * 10) / 10,
    count: data.count
  }));

  const totalAvg = avgScores.length > 0
    ? Math.round(avgScores.reduce((a, b) => a + b.avg, 0) / avgScores.length * 10) / 10
    : 0;

  return (
    <div>
      <div style={{
        textAlign: 'center', padding: 16,
        background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
        borderRadius: 12, marginBottom: 12,
        border: '1px solid rgba(16,185,129,0.3)'
      }}>
        <div className="glow-text" style={{
          fontSize: 32, fontWeight: 900, color: '#10b981', fontFamily: 'monospace'
        }}>
          {totalAvg.toFixed(1)}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
          AVERAGE SCORE ({aiMessages.length} Responses)
        </div>
      </div>

      {avgScores.map((s, i) => (
        <div key={s.field} className="score-tag" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 12px',
          background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
          borderRadius: 6,
          animationDelay: `${i * 0.05}s`
        }}>
          <span style={{ 
            fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' 
          }}>
            {s.field}
          </span>
          <span style={{
            fontSize: 12, fontFamily: 'monospace', fontWeight: 700,
            color: s.avg >= 8 ? '#10b981' : s.avg >= 5 ? '#f59e0b' : '#ef4444'
          }}>
            Ø {s.avg.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
