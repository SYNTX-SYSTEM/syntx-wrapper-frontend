'use client';

import React, { useState, useEffect } from 'react';
import { Spaceball } from './Spaceball';
import { ORACLE_COLORS } from './constants';

type SpaceballData = {
  id: string;
  name: string;
  value: number;
  color: string;
  position: { x: number; y: number };
  metadata?: {
    method?: string;
    description?: string;
    profile_id?: string;
    category?: string;
  };
};

type Props = {
  profile: any;
  onPropertyChange: (propertyId: string, newValue: number) => void;
};

export function OracleEye({ profile, onPropertyChange }: Props) {
  const [spaceballs, setSpaceballs] = useState<SpaceballData[]>([]);
  const [containerCenter, setContainerCenter] = useState({ x: 0, y: 0 });
  const [currentView, setCurrentView] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // ═══════════════════════════════════════════════════════════════════
  // 🎯 VIEW NAVIGATION
  // ═══════════════════════════════════════════════════════════════════
  
  const totalViews = 4;
  
  const handlePrevView = () => {
    setCurrentView(prev => (prev - 1 + totalViews) % totalViews);
  };

  const handleNextView = () => {
    setCurrentView(prev => (prev + 1) % totalViews);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleNextView();
    } else {
      handlePrevView();
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // 🎯 CONTAINER CENTER CALCULATION
  // ═══════════════════════════════════════════════════════════════════

  useEffect(() => {
    const updateCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerCenter({ x: rect.width / 2, y: rect.height / 2 });
      }
    };
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  // ═══════════════════════════════════════════════════════════════════
  // 🎯 SPACEBALL GENERATION
  // ═══════════════════════════════════════════════════════════════════

  useEffect(() => {
    if (profile && containerCenter.x > 0) {
      generateSpaceballs(profile);
    }
  }, [profile, containerCenter, currentView]);

  const generateSpaceballs = (profileData: any) => {
    const balls: SpaceballData[] = [];
    const radius = 280;

    const createBall = (id: string, name: string, value: number, color: string, angle: number, category: string) => ({
      id,
      name: name.replace(/_/g, ' ').substring(0, 15),
      value,
      color,
      position: {
        x: containerCenter.x + Math.cos(angle) * radius,
        y: containerCenter.y + Math.sin(angle) * radius,
      },
      metadata: {
        category,
        profile_id: profileData.profile_id,
        description: `${category}: ${name.replace(/_/g, ' ')}`,
      },
    });

    // VIEW 0: ENTITY WEIGHTS
    if (currentView === 0 && profileData.entity_weights) {
      const entries = Object.entries(profileData.entity_weights);
      entries.forEach(([name, value], index) => {
        const angle = (index / entries.length) * 2 * Math.PI;
        balls.push(createBall(`entity_${name}`, name, value as number, ORACLE_COLORS.primary, angle, 'Entity Weight'));
      });
    }

    // VIEW 1: FIELD SCORING METHODS
    if (currentView === 1 && profileData.field_scoring_methods) {
      const entries = Object.entries(profileData.field_scoring_methods);
      entries.forEach(([name, methodData]: [string, any], index) => {
        const angle = (index / entries.length) * 2 * Math.PI;
        balls.push(createBall(`method_${name}`, name, methodData.weight, ORACLE_COLORS.tertiary, angle, 'Field Scoring Method'));
      });
    }

    // VIEW 2: THRESHOLDS
    if (currentView === 2 && profileData.thresholds) {
      const entries = Object.entries(profileData.thresholds);
      entries.forEach(([name, value], index) => {
        const angle = (index / entries.length) * 2 * Math.PI;
        balls.push(createBall(`threshold_${name}`, name, value as number, ORACLE_COLORS.secondary, angle, 'Threshold'));
      });
    }

    // VIEW 3: DRIFT THRESHOLDS
    if (currentView === 3 && profileData.drift_thresholds) {
      const entries = Object.entries(profileData.drift_thresholds);
      entries.forEach(([name, value], index) => {
        const angle = (index / entries.length) * 2 * Math.PI;
        balls.push(createBall(`drift_${name}`, name, value as number, '#ff6b00', angle, 'Drift Threshold'));
      });
    }

    setSpaceballs(balls);
  };

  // ═══════════════════════════════════════════════════════════════════
  // 🎯 SPACEBALL DRAG HANDLER
  // ═══════════════════════════════════════════════════════════════════

  const handleSpaceballDrag = (id: string, newPosition: { x: number; y: number }, newValue: number) => {
    setSpaceballs(prev =>
      prev.map(ball =>
        ball.id === id ? { ...ball, position: newPosition, value: newValue } : ball
      )
    );
    onPropertyChange(id, newValue);
  };

  // ═══════════════════════════════════════════════════════════════════
  // 🎯 VIEW LABELS
  // ═══════════════════════════════════════════════════════════════════

  const viewLabels = [
    '🎯 ENTITY WEIGHTS',
    '⚡ FIELD METHODS',
    '⚖️ THRESHOLDS',
    '🌊 DRIFT THRESHOLDS'
  ];

  // ═══════════════════════════════════════════════════════════════════
  // 🎯 RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      style={{
        position: 'relative',
        width: '100%',
        height: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}
    >
      {/* 🌌 BACKGROUND GALAXY */}
      <GalaxyBackground />

      {/* 💫 LOGO BEHIND EYE */}
      <LogoBackground />

      {/* 👁️ CENTRAL EYE */}
      <CentralEye profileName={profile?.profile_name} />

      {/* ← NAVIGATION ARROWS → */}
      <NavigationArrows
        onPrev={handlePrevView}
        onNext={handleNextView}
        currentView={currentView}
        viewLabel={viewLabels[currentView]}
      />

      {/* 🪐 SPACEBALLS */}
      {containerCenter.x > 0 && spaceballs.map(ball => (
        <Spaceball
          key={ball.id}
          name={ball.name}
          value={ball.value}
          color={ball.color}
          position={ball.position}
          centerPosition={containerCenter}
          metadata={ball.metadata}
          onDrag={(newPos, newVal) => handleSpaceballDrag(ball.id, newPos, newVal)}
        />
      ))}

      <style jsx>{`
        @keyframes galaxyRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes starTwinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes nebulaDrift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -10px); } }
        @keyframes eyePulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.02); } }
        @keyframes logoRotate { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes blink { 0%, 90%, 100% { opacity: 1; } 93%, 96% { opacity: 0.1; } }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🎯 SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function GalaxyBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 40% at 50% 50%, ${ORACLE_COLORS.primary}25, transparent 60%),
          radial-gradient(ellipse 60% 30% at 30% 50%, ${ORACLE_COLORS.secondary}20, transparent 50%),
          radial-gradient(ellipse 60% 30% at 70% 50%, ${ORACLE_COLORS.tertiary}20, transparent 50%)
        `,
        animation: 'galaxyRotate 60s linear infinite',
      }} />
      {[...Array(150)].map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const distFromCenter = Math.sqrt(Math.pow(left - 50, 2) + Math.pow(top - 50, 2));
        const opacity = Math.max(0.2, 1 - (distFromCenter / 70));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: i % 5 === 0 ? ORACLE_COLORS.primary : '#fff',
              boxShadow: `0 0 ${size * 3}px ${i % 5 === 0 ? ORACLE_COLORS.primary : '#fff'}`,
              opacity: opacity * 0.8,
              animation: `starTwinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function LogoBackground() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      height: 500,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${ORACLE_COLORS.primary}15, transparent 70%)`,
      animation: 'logoRotate 30s linear infinite',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img
        src="/logo_original.png"
        alt="SYNTX"
        style={{
          width: '80%',
          height: '80%',
          objectFit: 'contain',
          opacity: 0.25,
          filter: `drop-shadow(0 0 60px ${ORACLE_COLORS.primary})`,
        }}
      />
    </div>
  );
}

function CentralEye({ profileName }: { profileName?: string }) {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 320,
      height: 320,
      borderRadius: '50%',
      border: `4px solid ${ORACLE_COLORS.primary}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `
        0 0 80px ${ORACLE_COLORS.primary}ff,
        0 0 120px ${ORACLE_COLORS.primary}80,
        inset 0 0 80px ${ORACLE_COLORS.primary}20
      `,
      background: `radial-gradient(circle at center, ${ORACLE_COLORS.bg}ff 30%, ${ORACLE_COLORS.bgLight}f0 70%, ${ORACLE_COLORS.primary}20)`,
      zIndex: 10,
      animation: 'eyePulse 4s ease-in-out infinite',
    }}>
      {/* IRIS */}
      <div style={{
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: '50%',
        border: `3px solid ${ORACLE_COLORS.secondary}80`,
        boxShadow: `0 0 40px ${ORACLE_COLORS.secondary}60, inset 0 0 40px ${ORACLE_COLORS.secondary}20`,
      }} />

      {/* PROFILE NAME */}
      {profileName && (
        <div style={{
          position: 'absolute',
          top: -60,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 14,
          fontWeight: 900,
          color: ORACLE_COLORS.primary,
          fontFamily: 'monospace',
          letterSpacing: 3,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          textShadow: `0 0 20px ${ORACLE_COLORS.primary}`,
        }}>
          {profileName}
        </div>
      )}

      {/* EYE EMOJI */}
      <div style={{
        fontSize: 120,
        filter: `drop-shadow(0 0 40px ${ORACLE_COLORS.primary})`,
        animation: 'blink 5s ease-in-out infinite',
      }}>
        👁️
      </div>
    </div>
  );
}

function NavigationArrows({ onPrev, onNext, currentView, viewLabel }: {
  onPrev: () => void;
  onNext: () => void;
  currentView: number;
  viewLabel: string;
}) {
  const arrowStyle = {
    position: 'absolute' as const,
    top: -100,
    width: 60,
    height: 60,
    borderRadius: '50%',
    border: `3px solid ${ORACLE_COLORS.tertiary}`,
    background: `radial-gradient(circle, ${ORACLE_COLORS.bgLight}, ${ORACLE_COLORS.bg})`,
    color: ORACLE_COLORS.tertiary,
    fontSize: 30,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 25px ${ORACLE_COLORS.tertiary}80`,
    transition: 'all 0.2s',
    zIndex: 100,
  };

  return (
    <>
      {/* LEFT ARROW */}
      <button
        onClick={onPrev}
        style={{ ...arrowStyle, left: '50%', transform: 'translateX(-200px)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-200px) scale(1.15)';
          e.currentTarget.style.boxShadow = `0 0 40px ${ORACLE_COLORS.tertiary}ff`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-200px) scale(1)';
          e.currentTarget.style.boxShadow = `0 0 25px ${ORACLE_COLORS.tertiary}80`;
        }}
      >
        ←
      </button>

      {/* VIEW LABEL */}
      <div style={{
        position: 'absolute',
        top: -100,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 11,
        fontWeight: 700,
        color: ORACLE_COLORS.tertiary,
        fontFamily: 'monospace',
        letterSpacing: 2,
        textAlign: 'center',
        textShadow: `0 0 15px ${ORACLE_COLORS.tertiary}`,
      }}>
        {viewLabel}
        <div style={{ fontSize: 8, marginTop: 5, opacity: 0.6 }}>
          (← → arrows or scroll wheel)
        </div>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={onNext}
        style={{ ...arrowStyle, right: '50%', transform: 'translateX(200px)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(200px) scale(1.15)';
          e.currentTarget.style.boxShadow = `0 0 40px ${ORACLE_COLORS.tertiary}ff`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(200px) scale(1)';
          e.currentTarget.style.boxShadow = `0 0 25px ${ORACLE_COLORS.tertiary}80`;
        }}
      >
        →
      </button>
    </>
  );
}
