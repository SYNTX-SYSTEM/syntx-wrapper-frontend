'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ORACLE_COLORS } from './constants';

interface WizardFlowProps {
  onComplete: (scoring: any) => void;
  onClose: () => void;
}

const FLOW_NODES = [
  { id: 'format', label: 'FORMAT', icon: '📋', color: ORACLE_COLORS.primary },
  { id: 'entity', label: 'ENTITY', icon: '🎯', color: ORACLE_COLORS.secondary },
  { id: 'fields', label: 'FIELDS', icon: '⚡', color: ORACLE_COLORS.primary },
  { id: 'weights', label: 'WEIGHTS', icon: '⚖️', color: ORACLE_COLORS.secondary },
  { id: 'birth', label: 'BIRTH', icon: '👁️', color: ORACLE_COLORS.primary },
];

export function WizardFlow({ onComplete, onClose }: WizardFlowProps) {
  const streamRef = useRef({
    activeNode: 0,
    energy: 0,
    data: {},
  });

  // Force re-render for stream updates
  const [tick, setTick] = useState(0);
  const forceUpdate = () => setTick(t => t + 1);

  // Energy pulse animation
  useEffect(() => {
    const pulse = setInterval(() => {
      streamRef.current.energy = (streamRef.current.energy + 1) % 100;
      forceUpdate();
    }, 50);

    return () => clearInterval(pulse);
  }, []);

  // Flow to next node
  const flowToNext = () => {
    const currentNode = FLOW_NODES[streamRef.current.activeNode];
    streamRef.current.data = { 
      ...streamRef.current.data, 
      [currentNode.id]: `${currentNode.label}_DATA` 
    };
    
    streamRef.current.activeNode++;
    
    if (streamRef.current.activeNode >= FLOW_NODES.length) {
      // Birth complete!
      setTimeout(() => {
        onComplete(streamRef.current.data);
      }, 500);
    }
    
    forceUpdate();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.98)',
      backdropFilter: 'blur(15px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10001,
      animation: 'wizardOpen 0.5s ease-out',
    }}>
      {/* Cosmic Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${ORACLE_COLORS.primary}10 1px, transparent 1px),
          linear-gradient(90deg, ${ORACLE_COLORS.primary}10 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.4,
      }} />

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 40,
          right: 40,
          background: 'transparent',
          border: `2px solid ${ORACLE_COLORS.primary}60`,
          color: ORACLE_COLORS.primary,
          padding: '12px 24px',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 14,
          fontFamily: 'monospace',
          fontWeight: 600,
          letterSpacing: 2,
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = `${ORACLE_COLORS.primary}20`;
          e.currentTarget.style.borderColor = ORACLE_COLORS.primary;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = `${ORACLE_COLORS.primary}60`;
        }}
      >
        ESC
      </button>

      {/* Title */}
      <div style={{
        fontSize: 32,
        fontWeight: 700,
        color: ORACLE_COLORS.secondary,
        fontFamily: 'monospace',
        letterSpacing: 4,
        textShadow: `0 0 40px ${ORACLE_COLORS.secondary}`,
        marginBottom: 60,
      }}>
        🧙 WIZARD GENESIS FLOW
      </div>

      {/* Flow Canvas */}
      <div style={{
        position: 'relative',
        width: '90%',
        maxWidth: 1400,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
      }}>
        {FLOW_NODES.map((node, idx) => {
          const isActive = idx === streamRef.current.activeNode;
          const isCompleted = idx < streamRef.current.activeNode;
          
          return (
            <React.Fragment key={node.id}>
              {/* Node */}
              <div
                style={{
                  position: 'relative',
                  width: 140,
                  height: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  background: `${ORACLE_COLORS.bgLight}cc`,
                  border: `3px solid ${isActive ? node.color : node.color + '40'}`,
                  borderRadius: '50%',
                  opacity: isActive ? 1 : isCompleted ? 0.5 : 0.3,
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.5s ease-out',
                  cursor: isActive ? 'pointer' : 'default',
                  boxShadow: isActive ? `0 0 60px ${node.color}80` : 'none',
                }}
                onClick={() => {
                  if (isActive) {
                    flowToNext();
                  }
                }}
              >
                <div style={{
                  fontSize: 48,
                  filter: `drop-shadow(0 0 20px ${node.color})`,
                }}>
                  {node.icon}
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: node.color,
                  fontFamily: 'monospace',
                  letterSpacing: 1,
                }}>
                  {node.label}
                </div>
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: -40,
                    fontSize: 11,
                    color: ORACLE_COLORS.textDim,
                    fontFamily: 'monospace',
                  }}>
                    CLICK TO FLOW →
                  </div>
                )}
              </div>

              {/* Energy Stream Arrow */}
              {idx < FLOW_NODES.length - 1 && (
                <div style={{
                  position: 'relative',
                  flex: 1,
                  height: 3,
                  background: `linear-gradient(90deg, 
                    ${node.color}${isCompleted ? '80' : '20'}, 
                    ${FLOW_NODES[idx + 1].color}20
                  )`,
                  margin: '0 20px',
                  transition: 'all 0.5s',
                }}>
                  {/* Flowing Energy Particle */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: `${streamRef.current.energy}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: node.color,
                      boxShadow: `0 0 20px ${node.color}`,
                    }} />
                  )}
                  
                  {/* Arrow Head */}
                  <div style={{
                    position: 'absolute',
                    right: -8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: `12px solid ${FLOW_NODES[idx + 1].color}${isCompleted ? '80' : '20'}`,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    transition: 'all 0.5s',
                  }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Energy Bar */}
      <div style={{
        marginTop: 60,
        width: '90%',
        maxWidth: 1400,
      }}>
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          marginBottom: 8,
          letterSpacing: 2,
        }}>
          STREAM ENERGY: {streamRef.current.activeNode + 1} / {FLOW_NODES.length}
        </div>
        <div style={{
          width: '100%',
          height: 8,
          background: `${ORACLE_COLORS.bgLight}80`,
          borderRadius: 4,
          overflow: 'hidden',
          border: `1px solid ${ORACLE_COLORS.primary}40`,
        }}>
          <div
            style={{
              height: '100%',
              width: `${((streamRef.current.activeNode + 1) / FLOW_NODES.length) * 100}%`,
              background: `linear-gradient(90deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
              boxShadow: `0 0 20px ${ORACLE_COLORS.primary}`,
              transition: 'width 0.5s ease-out',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes wizardOpen {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
