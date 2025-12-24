"use client";

import React from 'react';
import Image from 'next/image';
import { NeuralNetwork, CyberGrid } from './animations';
import { useSystemData } from './hooks';
import { HealthPanel, ConfigPanel, WrapperGrid } from './components';

// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM PANEL - ULTRA CYBER MAIN COMPONENT v2
// ═══════════════════════════════════════════════════════════════

export default function SystemPanel() {
  const {
    health,
    config,
    wrappers,
    loading,
    error,
    lastUpdate,
    refresh,
    setDefaultWrapper,
    getWrapperStats
  } = useSystemData();

  // Get active wrapper name
  const activeWrapper = wrappers.find(w => w.is_active);
  const activeWrapperName = activeWrapper?.name || null;

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1a2e 0%, #06090f 100%)'
    }}>
      {/* Background Effects */}
      <CyberGrid opacity={0.03} />
      <NeuralNetwork 
        particleCount={60} 
        connectionDistance={180}
        opacity={0.4}
        speed={0.2}
      />
      
      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        padding: '40px 24px',
        maxWidth: 1400,
        margin: '0 auto'
      }}>
        {/* Header Section with LOGO */}
        <div style={{
          marginBottom: 40,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16
        }}>
          {/* SYNTX Logo with Effects */}
          <div style={{
            position: 'relative',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Rotating ring */}
            <div style={{
              position: 'absolute',
              width: 90,
              height: 90,
              border: '2px solid transparent',
              borderTopColor: '#00d4ff',
              borderRightColor: '#d946ef',
              borderRadius: '50%',
              animation: 'spin 8s linear infinite'
            }} />
            
            {/* Pulsing glow */}
            <div style={{
              position: 'absolute',
              width: 100,
              height: 100,
              background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%)',
              borderRadius: '50%',
              animation: 'pulse 3s ease-in-out infinite'
            }} />
            
            {/* Logo */}
            <Image 
              src="/Logo1_trans.png" 
              alt="SYNTX" 
              width={70}
              height={70}
              style={{
                filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.6)) drop-shadow(0 0 60px rgba(217,70,239,0.4))',
                animation: 'float 4s ease-in-out infinite',
                position: 'relative',
                zIndex: 1
              }}
              priority
            />
            
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.1); opacity: 0.5; }
              }
            `}</style>
          </div>
          
          {/* Title */}
          <h1 style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: 42,
            background: 'linear-gradient(135deg, #00d4ff 0%, #d946ef 50%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 8,
            fontWeight: 900,
            textTransform: 'uppercase',
            animation: 'titleShimmer 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.5))'
          }}>
            SYSTEM MONITOR
          </h1>
          
          {lastUpdate && (
            <div style={{
              marginTop: 8,
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}>
              <span>⏱️</span>
              <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}
          
          <style>{`
            @keyframes titleShimmer {
              0%, 100% { filter: drop-shadow(0 0 30px rgba(0,212,255,0.5)); }
              50% { filter: drop-shadow(0 0 50px rgba(217,70,239,0.8)); }
            }
          `}</style>
        </div>
        
        {/* Top Row - Health + Config */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
          marginBottom: 24
        }}>
          <HealthPanel 
            health={health}
            loading={loading}
            error={error}
          />
          
          <ConfigPanel
            config={config}
            wrapperCount={wrappers.length}
            activeWrapperName={activeWrapperName}
            loading={loading}
            onRefresh={refresh}
          />
        </div>
        
        {/* Bottom Row - Wrapper Stats */}
        <WrapperGrid
          wrappers={wrappers}
          defaultWrapper={config?.active_wrapper || null}
          onSetDefault={setDefaultWrapper}
          getStats={getWrapperStats}
        />
        
        {/* Footer Info */}
        <div style={{
          marginTop: 40,
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12
        }}>
          <span>🌊 SYNTX SYSTEM</span>
          <span>•</span>
          <span>FIELD-BASED ARCHITECTURE</span>
          <span>•</span>
          <span>RESONANCE ENGINE</span>
        </div>
      </div>
    </div>
  );
}
