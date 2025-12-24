"use client";

import React from 'react';
import { NeuralNetwork, CyberGrid } from './animations';
import { useSystemData } from './hooks';
import { HealthPanel, ConfigPanel, WrapperGrid } from './components';

// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM PANEL - ULTRA CYBER MAIN COMPONENT
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
        {/* Header Section */}
        <div style={{
          marginBottom: 40,
          textAlign: 'center'
        }}>
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
              marginTop: 12,
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
