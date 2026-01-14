"use client";

import React, { useState, useEffect } from 'react';
import { ScoreBar } from './ScoreBar';

interface Score {
  field: string;
  score: number;
  maxScore: number;
}

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  scores?: Score[];
  isMobile: boolean;
}

export function MessageBubble({ 
  message, isUser, wrapper, latency, timestamp, scores, isMobile 
}: MessageBubbleProps) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => { 
    setTimeout(() => setVisible(true), 50); 
  }, []);

  const totalScore = scores?.reduce((a, b) => a + b.score, 0) || 0;
  const maxTotal = scores ? scores.length * 10 : 0;

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 20,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={{
        maxWidth: isMobile ? '90%' : '78%',
        borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
        background: isUser
          ? 'linear-gradient(145deg, rgba(0,212,255,0.12), rgba(0,212,255,0.04))'
          : 'linear-gradient(145deg, rgba(217,70,239,0.10), rgba(217,70,239,0.02))',
        border: isUser ? '1px solid rgba(0,212,255,0.35)' : '1px solid rgba(217,70,239,0.35)',
        boxShadow: isUser
          ? '0 4px 30px rgba(0,212,255,0.12)'
          : '0 4px 30px rgba(217,70,239,0.12)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {!isUser && <div className="scan-line" style={{ '--scan-color': '#d946ef' } as React.CSSProperties} />}

        {!isUser && (
          <div style={{
            padding: '12px 16px',
            background: 'linear-gradient(90deg, rgba(217,70,239,0.15), transparent)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap'
          }}>
            {wrapper && (
              <span className="float neon" style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(217,70,239,0.1))',
                border: '1px solid rgba(217,70,239,0.5)',
                color: '#d946ef', fontFamily: 'monospace', fontWeight: 600,
                letterSpacing: 1
              }}>
                📦 {wrapper.replace('syntex_wrapper_', '').toUpperCase()}
              </span>
            )}
            {latency && (
              <span className="pulse" style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.1))',
                border: '1px solid rgba(245,158,11,0.5)',
                color: '#f59e0b', fontFamily: 'monospace', fontWeight: 600
              }}>
                ⚡ {(latency / 1000).toFixed(2)}s
              </span>
            )}
            {scores && scores.length > 0 && (
              <span style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.1))',
                border: '1px solid rgba(16,185,129,0.5)',
                color: '#10b981', fontFamily: 'monospace', fontWeight: 700,
                marginLeft: 'auto'
              }}>
                📊 {totalScore}/{maxTotal}
              </span>
            )}
          </div>
        )}

        <div style={{ padding: '16px 18px' }}>
          <div style={{
            fontSize: isMobile ? 14 : 15,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.92)',
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </div>
        </div>

        {!isUser && scores && scores.length > 0 && (
          <div style={{
            padding: '16px 18px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{
              fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)',
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span className="pulse">📈</span>
              FELD SCORES
            </div>
            
            {scores.map((s, i) => (
              <ScoreBar key={i} score={s.score} maxScore={s.maxScore} label={s.field} delay={i * 0.1} />
            ))}

            <div style={{
              marginTop: 14, paddingTop: 14,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ 
                fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)', 
                fontWeight: 700
              }}>
                TOTAL
              </span>
              <span className="glow-text" style={{
                fontSize: 18, fontFamily: 'monospace', fontWeight: 900,
                color: totalScore / maxTotal >= 0.8 ? '#10b981' : totalScore / maxTotal >= 0.5 ? '#f59e0b' : '#ef4444',
              }}>
                {totalScore}/{maxTotal}
              </span>
            </div>
          </div>
        )}

        <div style={{
          padding: '8px 18px 12px',
          fontSize: 9, color: 'rgba(255,255,255,0.25)',
          textAlign: isUser ? 'right' : 'left',
          fontFamily: 'monospace'
        }}>
          {timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
