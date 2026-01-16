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

  useEffect(() => {
    if (profile) {
      generateSpaceballs(profile);
    }
  }, [profile]);

  const generateSpaceballs = (profileData: any) => {
    const balls: SpaceballData[] = [];
    const centerX = 700;
    const centerY = 400;
    const radius = 250;
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
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
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
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
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
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
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
    <div style={{
      position: 'relative',
      width: '100%',
      height: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
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
        boxShadow: `0 0 50px ${ORACLE_COLORS.primary}80`,
        zIndex: 10,
      }}>
        {profile && (
          <div style={{
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 11,
            fontWeight: 800,
            color: ORACLE_COLORS.primary,
            fontFamily: 'monospace',
            letterSpacing: 2,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}>
            {profile.profile_name}
          </div>
        )}

        <div style={{
          fontSize: 80,
          filter: `drop-shadow(0 0 20px ${ORACLE_COLORS.primary})`,
        }}>
          👁️
        </div>
      </div>

      {/* Spaceballs */}
      {spaceballs.map(ball => (
        <Spaceball
          key={ball.id}
          name={ball.name}
          value={ball.value}
          color={ball.color}
          position={ball.position}
          onDrag={(newPos, newVal) => handleSpaceballDrag(ball.id, newPos, newVal)}
        />
      ))}
    </div>
  );
}
