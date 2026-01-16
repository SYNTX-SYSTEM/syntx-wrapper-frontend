'use client';

import React, { useState, useEffect } from 'react';
import { OracleHeader } from './OracleHeader';
import { OracleEye } from './OracleEye';
import { FormatSelector } from './FormatSelector';
import { ProfileSelector } from './ProfileSelector';
import { ProfileViewer } from './ProfileViewer';
import { SpaceLegend } from './SpaceLegend';
import { ORACLE_COLORS } from './constants';

export function OraclePanel() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [modifiedProperties, setModifiedProperties] = useState<Record<string, number>>({});

  useEffect(() => {
    if (selectedFormat && selectedProfile) {
      loadProfileData(selectedFormat);
    }
  }, [selectedFormat, selectedProfile]);

  const loadProfileData = async (format: string) => {
    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');
      
      const response = await fetch(
        `https://dev.syntx-system.com/scoring/bindings/get_binding_by_format/${format}`,
        {
          headers: { 'Authorization': `Basic ${AUTH}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfileData(data.profile_complete || null);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleFormatChange = (format: string) => {
    console.log('🔥 FORMAT CHANGED:', format);
    setSelectedFormat(format);
    setSelectedProfile(null);
    setProfileData(null);
    setModifiedProperties({});
  };

  const handleProfileChange = (profile: string) => {
    console.log('🔥 PROFILE CHANGED:', profile);
    setSelectedProfile(profile);
  };

  const handlePropertyChange = (propertyId: string, newValue: number) => {
    console.log('🎯 PROPERTY CHANGED:', { propertyId, newValue });
    
    setModifiedProperties(prev => ({
      ...prev,
      [propertyId]: newValue,
    }));
  };

  const handleSave = async () => {
    if (!selectedFormat || !selectedProfile || Object.keys(modifiedProperties).length === 0) {
      alert('No changes to save');
      return;
    }

    console.log('💾 SAVING MODIFICATIONS:', {
      format: selectedFormat,
      profile: selectedProfile,
      modifications: modifiedProperties,
    });

    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');

      // Build update payload based on property types
      const entityWeights: Record<string, number> = {};
      const thresholds: Record<string, number> = {};
      const methodWeights: Record<string, number> = {};

      Object.entries(modifiedProperties).forEach(([id, value]) => {
        if (id.startsWith('entity_')) {
          const entityName = id.replace('entity_', '');
          entityWeights[entityName] = value;
        } else if (id.startsWith('threshold_')) {
          const thresholdName = id.replace('threshold_', '');
          thresholds[thresholdName] = value;
        } else if (id.startsWith('method_')) {
          const methodName = id.replace('method_', '');
          methodWeights[methodName] = value;
        }
      });

      // Update profile weights endpoint
      const response = await fetch(
        `https://dev.syntx-system.com/scoring/profiles/${selectedProfile}/weights`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${AUTH}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            entity_weights: Object.keys(entityWeights).length > 0 ? entityWeights : undefined,
            thresholds: Object.keys(thresholds).length > 0 ? thresholds : undefined,
          }),
        }
      );

      if (response.ok) {
        alert('✅ Scoring profile updated successfully!');
        setModifiedProperties({});
        loadProfileData(selectedFormat!);
      } else {
        const error = await response.text();
        alert(`❌ Failed to save: ${error}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert(`❌ Save failed: ${error}`);
    }
  };

  const hasModifications = Object.keys(modifiedProperties).length > 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: ORACLE_COLORS.bg,
      padding: 40,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1600,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <OracleHeader />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr 320px',
          gap: 40,
          alignItems: 'start',
        }}>
          {/* Left Column - Selectors */}
          <div>
            <FormatSelector
              activeFormat={selectedFormat}
              onChange={handleFormatChange}
              loading={false}
            />

            <ProfileSelector
              format={selectedFormat}
              activeProfile={selectedProfile}
              onChange={handleProfileChange}
              loading={false}
            />

            {/* Save Button */}
            {hasModifications && (
              <div style={{
                marginTop: 20,
                padding: 20,
                background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}40, ${ORACLE_COLORS.secondary}40)`,
                borderRadius: 14,
                border: `2px solid ${ORACLE_COLORS.primary}`,
                boxShadow: `0 0 30px ${ORACLE_COLORS.primary}60`,
              }}>
                <div style={{
                  fontSize: 12,
                  color: ORACLE_COLORS.primary,
                  fontFamily: 'monospace',
                  marginBottom: 12,
                  letterSpacing: 1,
                }}>
                  {Object.keys(modifiedProperties).length} properties modified
                </div>
                
                <button
                  onClick={handleSave}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
                    border: 'none',
                    borderRadius: 12,
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    letterSpacing: 2,
                    boxShadow: `0 0 20px ${ORACLE_COLORS.primary}80`,
                    animation: 'pulse 2s infinite',
                  }}
                >
                  💾 SAVE SCORING
                </button>
              </div>
            )}
          </div>

          {/* Center - Oracle Eye with Spaceballs */}
          <OracleEye
            profile={profileData}
            onPropertyChange={handlePropertyChange}
          />

          {/* Right Column - Stats */}
          <SpaceLegend scores={null} />
        </div>
      </div>

      {/* Bottom Right - Profile Viewer */}
      <ProfileViewer
        profileId={selectedProfile}
        format={selectedFormat}
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
