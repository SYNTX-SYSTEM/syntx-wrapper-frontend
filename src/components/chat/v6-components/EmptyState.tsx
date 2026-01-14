"use client";

import React from 'react';
import Image from 'next/image';
import { NeuralBackground } from '../NeuralBackground';

export function EmptyState() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    }}>
      <NeuralBackground />
      
      <div style={{ 
        position: 'relative',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        zIndex: 1
      }}>
        <div className="float" style={{
          position: 'absolute',
          width: 140,
          height: 140,
          border: '2px solid transparent',
          borderTopColor: '#00d4ff',
          borderRightColor: '#d946ef',
          borderRadius: '50%',
          animation: 'spin 6s linear infinite',
          opacity: 0.4
        }} />
        <div className="pulse" style={{
          position: 'absolute',
          width: 130,
          height: 130,
          background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 70%)',
          borderRadius: '50%'
        }} />
        <Image 
          src="/Logo1_trans.png" 
          alt="SYNTX" 
          width={100} 
          height={100} 
          className="float neon" 
          style={{ 
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.6)) drop-shadow(0 0 60px rgba(217,70,239,0.4))', 
            opacity: 0.8,
            zIndex: 2
          }} 
          priority 
        />
      </div>
      <div className="glow-text" style={{
        fontFamily: 'monospace', fontSize: 18, marginBottom: 12,
        color: '#00d4ff', letterSpacing: 4, zIndex: 1
      }}>
        SYNTX FIELD RESONANCE
      </div>
      <div style={{ 
        fontSize: 13, maxWidth: 320, lineHeight: 1.7, opacity: 0.6, 
        zIndex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.5)' 
      }}>
        Wähle einen Wrapper und starte die Konversation
      </div>
    </div>
  );
}
