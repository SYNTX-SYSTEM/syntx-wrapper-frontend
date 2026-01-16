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
};

type Props = {
  profile: any;
  onPropertyChange: (propertyId: string, newValue: number) => void;
};

export function OracleEye({ profile, onPropertyChange }: Props) {
  const [spaceballs, setSpaceballs] = useState<SpaceballData[]>([]);
  const [containerCenter, setContainerCenter] = useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate container center on mount and resize
    const updateCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerCenter({
          x: rect.width / 2,
          y: rect.height / 2,
        });
      }
    };

    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  useEffect(() => {
    if (profile && containerCenter.x > 0) {
      generateSpaceballs(profile);
    }
  }, [profile, containerCenter]);

  const generateSpaceballs = (profileData: any) => {
    const balls: SpaceballData[] = [];
    const radius = 280;
    let index = 0;

    // Entity Weights
    if (profileData.entity_weights) {
      Object.entries(profileData.entity_weights).forEach(([name, value]) => {
        const angle = (index / 10) * 2 * Math.PI;
        balls.push({
          id: `entity_${name}`,
          name: name.replace(/_/g, ' ').substring(0, 15),
          value: value as number,
          color: ORACLE_COLORS.primary,
          position: {
            x: containerCenter.x + Math.cos(angle) * radius,
            y: containerCenter.y + Math.sin(angle) * radius,
          },
        });
        index++;
      });
    }

    // Thresholds
    if (profileData.thresholds) {
      Object.entries(profileData.thresholds).forEach(([name, value]) => {
        const angle = (index / 10) * 2 * Math.PI;
        balls.push({
          id: `threshold_${name}`,
          name,
          value: value as number,
          color: ORACLE_COLORS.secondary,
          position: {
            x: containerCenter.x + Math.cos(angle) * radius,
            y: containerCenter.y + Math.sin(angle) * radius,
          },
        });
        index++;
      });
    }

    // Field Scoring Methods
    if (profileData.field_scoring_methods) {
      Object.entries(profileData.field_scoring_methods).forEach(([name, method]: [string, any]) => {
        const angle = (index / 10) * 2 * Math.PI;
        balls.push({
          id: `method_${name}`,
          name: name.replace(/_/g, ' ').substring(0, 15),
          value: method.weight,
          color: ORACLE_COLORS.tertiary,
          position: {
            x: containerCenter.x + Math.cos(angle) * radius,
            y: containerCenter.y + Math.sin(angle) * radius,
          },
        });
        index++;
      });
    }

    setSpaceballs(balls);
  };

  const handleSpaceballDrag = (id: string, newPosition: { x: number; y: number }, newValue: number) => {
    setSpaceballs(prev =>
      prev.map(ball =>
        ball.id === id
          ? { ...ball, position: newPosition, value: newValue }
          : ball
      )
    );

    onPropertyChange(id, newValue);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Logo Background - Behind Eye */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${ORACLE_COLORS.primary}40, transparent 70%)`,
        animation: 'rotate 20s linear infinite, pulse-glow 3s ease-in-out infinite',
        zIndex: 1,
      }}>
        <img
          src="/logo_original.png"
          alt="SYNTX Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.3,
            filter: `drop-shadow(0 0 40px ${ORACLE_COLORS.primary})`,
          }}
        />
      </div>

      {/* Eye Center */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 300,
        borderRadius: '50%',
        border: `3px solid ${ORACLE_COLORS.primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `
          0 0 50px ${ORACLE_COLORS.primary}80,
          0 0 100px ${ORACLE_COLORS.primary}40,
          inset 0 0 50px ${ORACLE_COLORS.primary}20
        `,
        background: `radial-gradient(circle at center, ${ORACLE_COLORS.bg}f0, ${ORACLE_COLORS.bgLight}80)`,
        zIndex: 10,
      }}>
        {profile && (
          <div style={{
            position: 'absolute',
            top: -50,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 12,
            fontWeight: 800,
            color: ORACLE_COLORS.primary,
            fontFamily: 'monospace',
            letterSpacing: 2,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textShadow: `0 0 20px ${ORACLE_COLORS.primary}`,
          }}>
            {profile.profile_name}
          </div>
        )}

        <div style={{
          fontSize: 100,
          filter: `drop-shadow(0 0 30px ${ORACLE_COLORS.primary})`,
          animation: 'blink 5s ease-in-out infinite',
        }}>
          👁️
        </div>
      </div>

      {/* Spaceballs */}
      {containerCenter.x > 0 && spaceballs.map(ball => (
        <Spaceball
          key={ball.id}
          name={ball.name}
          value={ball.value}
          color={ball.color}
          position={ball.position}
          centerPosition={containerCenter}
          onDrag={(newPos, newVal) => handleSpaceballDrag(ball.id, newPos, newVal)}
        />
      ))}

      <style jsx>{`
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.3;
            filter: drop-shadow(0 0 40px ${ORACLE_COLORS.primary});
          }
          50% { 
            opacity: 0.5;
            filter: drop-shadow(0 0 80px ${ORACLE_COLORS.primary});
          }
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          93%, 96% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
