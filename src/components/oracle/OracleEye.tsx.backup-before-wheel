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
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          metadata: {
            category: 'Entity Weight',
            profile_id: profileData.profile_id,
            description: `Scoring weight for ${name.replace(/_/g, ' ')} entity`,
          },
        });
        index++;
      });
    }

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
          metadata: {
            category: 'Threshold',
            profile_id: profileData.profile_id,
            description: `Score threshold for ${name} rating level`,
          },
        });
        index++;
      });
    }

    if (profileData.field_scoring_methods) {
      Object.entries(profileData.field_scoring_methods).forEach(([name, methodData]: [string, any]) => {
        const angle = (index / 10) * 2 * Math.PI;
        balls.push({
          id: `method_${name}`,
          name: name.replace(/_/g, ' ').substring(0, 15),
          value: methodData.weight,
          color: ORACLE_COLORS.tertiary,
          position: {
            x: containerCenter.x + Math.cos(angle) * radius,
            y: containerCenter.y + Math.sin(angle) * radius,
          },
          metadata: {
            method: methodData.method || 'N/A',
            description: methodData.description || 'No description available',
            category: 'Field Scoring Method',
            profile_id: profileData.profile_id,
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
        overflow: 'visible',
      }}
    >
      {/* MEGA MILKY WAY GALAXY BACKGROUND */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 40% at 50% 50%, ${ORACLE_COLORS.primary}25, transparent 60%),
          radial-gradient(ellipse 60% 30% at 30% 50%, ${ORACLE_COLORS.secondary}20, transparent 50%),
          radial-gradient(ellipse 60% 30% at 70% 50%, ${ORACLE_COLORS.tertiary}20, transparent 50%),
          radial-gradient(ellipse 40% 20% at 50% 50%, ${ORACLE_COLORS.primary}15, transparent 40%)
        `,
        animation: 'galaxyRotate 60s linear infinite, galaxyPulse 8s ease-in-out infinite',
        zIndex: 0,
      }}>
        {/* Spiral Arms Effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              ${ORACLE_COLORS.primary}15 45deg,
              transparent 90deg,
              ${ORACLE_COLORS.secondary}15 135deg,
              transparent 180deg,
              ${ORACLE_COLORS.tertiary}15 225deg,
              transparent 270deg,
              ${ORACLE_COLORS.primary}15 315deg,
              transparent 360deg
            )
          `,
          animation: 'spiralRotate 40s linear infinite',
          opacity: 0.6,
        }} />

        {/* Dense Star Field - Milky Way Style */}
        {[...Array(200)].map((_, i) => {
          const isCluster = i % 4 === 0;
          const size = isCluster ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.5;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          // Create density towards center (Milky Way effect)
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
                background: isCluster ? ORACLE_COLORS.primary : '#fff',
                boxShadow: `0 0 ${size * 3}px ${isCluster ? ORACLE_COLORS.primary : '#fff'}`,
                opacity: opacity * 0.8,
                animation: `starTwinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          );
        })}

        {/* Nebula Clouds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`nebula-${i}`}
            style={{
              position: 'absolute',
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
              width: `${100 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 50}px`,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${i % 2 === 0 ? ORACLE_COLORS.primary : ORACLE_COLORS.secondary}20, transparent 70%)`,
              filter: 'blur(20px)',
              animation: `nebulaDrift ${15 + i * 5}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Logo BEHIND Eye - Larger & More Visible */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${ORACLE_COLORS.primary}15, transparent 70%)`,
        animation: 'logoRotate 30s linear infinite, logoPulse 4s ease-in-out infinite',
        zIndex: 1,
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src="/logo_original.png"
          alt="SYNTX Logo"
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
            opacity: 0.25,
            filter: `
              drop-shadow(0 0 60px ${ORACLE_COLORS.primary})
              drop-shadow(0 0 100px ${ORACLE_COLORS.primary}80)
            `,
          }}
        />
      </div>

      {/* Mega Eye Center - ON TOP */}
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
          0 0 160px ${ORACLE_COLORS.primary}40,
          inset 0 0 80px ${ORACLE_COLORS.primary}20
        `,
        background: `
          radial-gradient(circle at center, ${ORACLE_COLORS.bg}ff 30%, ${ORACLE_COLORS.bgLight}f0 70%, ${ORACLE_COLORS.primary}20)
        `,
        zIndex: 10,
        animation: 'eyePulse 4s ease-in-out infinite',
      }}>
        {/* Iris Ring */}
        <div style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: `3px solid ${ORACLE_COLORS.secondary}80`,
          boxShadow: `
            0 0 40px ${ORACLE_COLORS.secondary}60,
            inset 0 0 40px ${ORACLE_COLORS.secondary}20
          `,
          animation: 'irisRotate 10s linear infinite',
        }} />

        {/* Profile Name */}
        {profile && (
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
            textShadow: `
              0 0 20px ${ORACLE_COLORS.primary},
              0 0 40px ${ORACLE_COLORS.primary}80
            `,
            animation: 'textGlow 3s ease-in-out infinite',
          }}>
            {profile.profile_name}
          </div>
        )}

        {/* Eye Emoji */}
        <div style={{
          fontSize: 120,
          filter: `
            drop-shadow(0 0 40px ${ORACLE_COLORS.primary})
            drop-shadow(0 0 80px ${ORACLE_COLORS.primary}80)
          `,
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
          metadata={ball.metadata}
          onDrag={(newPos, newVal) => handleSpaceballDrag(ball.id, newPos, newVal)}
        />
      ))}

      <style jsx>{`
        @keyframes galaxyRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spiralRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes galaxyPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes nebulaDrift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -10px); }
          50% { transform: translate(-10px, 20px); }
          75% { transform: translate(-20px, -15px); }
        }
        @keyframes logoRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes logoPulse {
          0%, 100% { 
            opacity: 0.25;
            filter: 
              drop-shadow(0 0 60px ${ORACLE_COLORS.primary})
              drop-shadow(0 0 100px ${ORACLE_COLORS.primary}80);
          }
          50% { 
            opacity: 0.4;
            filter: 
              drop-shadow(0 0 80px ${ORACLE_COLORS.primary})
              drop-shadow(0 0 120px ${ORACLE_COLORS.primary}ff);
          }
        }
        @keyframes eyePulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.02);
          }
        }
        @keyframes irisRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes textGlow {
          0%, 100% { 
            text-shadow: 
              0 0 20px ${ORACLE_COLORS.primary},
              0 0 40px ${ORACLE_COLORS.primary}80;
          }
          50% { 
            text-shadow: 
              0 0 30px ${ORACLE_COLORS.primary},
              0 0 60px ${ORACLE_COLORS.primary}ff,
              0 0 90px ${ORACLE_COLORS.primary}80;
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
