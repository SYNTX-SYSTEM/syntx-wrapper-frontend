"use client";

import React from 'react';

interface SessionPanelProps {
  aiMessageCount: number;
  totalLatency: number;
  avgLatency: number;
}

export function SessionPanel({ 
  aiMessageCount, 
  totalLatency, 
  avgLatency 
}: SessionPanelProps) {
  return (
    <div>
      <div style={{
        fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
        marginBottom: 12, letterSpacing: 2,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
        <span className="pulse">📊</span> SESSION
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        <div className="float" style={{
          textAlign: 'center', padding: 12,
          background: 'rgba(0,212,255,0.1)', borderRadius: 10,
          border: '1px solid rgba(0,212,255,0.2)'
        }}>
          <div style={{ 
            fontSize: 24, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' 
          }}>
            {aiMessageCount}
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>
            Responses
          </div>
        </div>
        
        <div className="float" style={{
          textAlign: 'center', padding: 12,
          background: 'rgba(245,158,11,0.1)', borderRadius: 10,
          border: '1px solid rgba(245,158,11,0.2)',
          animationDelay: '0.1s'
        }}>
          <div style={{ 
            fontSize: 24, fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace' 
          }}>
            {(totalLatency / 1000).toFixed(1)}s
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>
            Total
          </div>
        </div>
        
        <div className="float" style={{
          textAlign: 'center', padding: 12,
          background: 'rgba(16,185,129,0.1)', borderRadius: 10,
          border: '1px solid rgba(16,185,129,0.2)',
          animationDelay: '0.2s'
        }}>
          <div style={{ 
            fontSize: 24, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' 
          }}>
            {(avgLatency / 1000).toFixed(1)}s
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>
            Avg
          </div>
        </div>
      </div>
    </div>
  );
}
