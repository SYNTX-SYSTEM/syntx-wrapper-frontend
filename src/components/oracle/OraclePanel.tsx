'use client';

import React, { useState, useEffect } from 'react';
import { OracleHeader } from './OracleHeader';
import { ProfileIdDisplay } from './ProfileIdDisplay';
import { OracleEye } from './OracleEye';
import { BirthTrigger } from './BirthTrigger';
import { FormatSelector } from './FormatSelector';
import { ProfileSelector } from './ProfileSelector';
import { ScoringViewer } from './ScoringViewer';
import { SaveSuccessOverlay } from './SaveSuccessOverlay';
import { SpaceLegend } from './SpaceLegend';
import { ORACLE_COLORS } from './constants';

export function OraclePanel() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [modifiedProperties, setModifiedProperties] = useState<Record<string, number>>({});
  const [originalValues, setOriginalValues] = useState<Record<string, number>>({});
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [showSaveOverlay, setShowSaveOverlay] = useState(false);
  const [saveModifications, setSaveModifications] = useState<any[]>([]);
  const [legendStats, setLegendStats] = useState({
    avgScore: 0,
    maxScore: 0,
    minScore: 0,
    fieldCount: 0,
  });

  useEffect(() => {
    if (selectedFormat && selectedProfile) {
      loadProfileData(selectedFormat);
    }
  }, [selectedFormat, selectedProfile]);

  useEffect(() => {
    if (profileData) {
      calculateLegendStats();
    }
  }, [profileData, modifiedProperties]);

  const calculateLegendStats = () => {
    const allValues: number[] = [];

    if (profileData?.entity_weights) {
      Object.entries(profileData.entity_weights).forEach(([k, v]) => {
        const id = `entity_${k}`;
        allValues.push(modifiedProperties[id] ?? (v as number));
      });
    }

    if (profileData?.thresholds) {
      Object.entries(profileData.thresholds).forEach(([k, v]) => {
        const id = `threshold_${k}`;
        allValues.push(modifiedProperties[id] ?? (v as number));
      });
    }

    if (profileData?.field_scoring_methods) {
      Object.entries(profileData.field_scoring_methods).forEach(([k, v]: [string, any]) => {
        const id = `method_${k}`;
        allValues.push(modifiedProperties[id] ?? v.weight);
      });
    }

    if (allValues.length > 0) {
      const avg = allValues.reduce((a, b) => a + b, 0) / allValues.length;
      const max = Math.max(...allValues);
      const min = Math.min(...allValues);

      setLegendStats({
        avgScore: avg,
        maxScore: max,
        minScore: min,
        fieldCount: allValues.length,
      });
    } else {
      setLegendStats({
        avgScore: 0,
        maxScore: 0,
        minScore: 0,
        fieldCount: 0,
      });
    }
  };

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
        
        const originals: Record<string, number> = {};
        const profile = data.profile_complete;
        
        if (profile?.entity_weights) {
          Object.entries(profile.entity_weights).forEach(([k, v]) => {
            originals[`entity_${k}`] = v as number;
          });
        }
        if (profile?.thresholds) {
          Object.entries(profile.thresholds).forEach(([k, v]) => {
            originals[`threshold_${k}`] = v as number;
          });
        }
        if (profile?.field_scoring_methods) {
          Object.entries(profile.field_scoring_methods).forEach(([k, v]: [string, any]) => {
            originals[`method_${k}`] = v.weight;
          });
        }
        
        setOriginalValues(originals);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
    setSelectedProfile(null);
    setProfileData(null);
    setModifiedProperties({});
    setOriginalValues({});
  };

  const handleProfileChange = (profile: string) => {
    setSelectedProfile(profile);
  };

  const handlePropertyChange = (propertyId: string, newValue: number) => {
    setModifiedProperties(prev => ({
      ...prev,
      [propertyId]: newValue,
    }));

  const handleBirthComplete = async (newProfileData: any) => {
    console.log("🌊 BIRTH COMPLETE:", newProfileData);
    try {
      setSelectedProfile(newProfileData.profile_id);
      await loadProfileData(selectedFormat!);
      setReloadTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to reload:", error);
    }
  };
  };

  const handleSave = async () => {
    if (!selectedFormat || Object.keys(modifiedProperties).length === 0) {
      alert('No changes to save');
      return;
    }

    const actualProfileId = profileData?.profile_id;
    
    if (!actualProfileId) {
      alert('Profile ID not found');
      return;
    }

    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');

      const entityWeights: Record<string, number> = {};
      const thresholds: Record<string, number> = {};
      const methodWeights: Record<string, number> = {};

      Object.entries(modifiedProperties).forEach(([id, value]) => {
        if (id.startsWith('entity_')) {
          entityWeights[id.replace('entity_', '')] = value;
        } else if (id.startsWith('threshold_')) {
          thresholds[id.replace('threshold_', '')] = value;
        } else if (id.startsWith('method_')) {
          methodWeights[id.replace('method_', '')] = value;
        }
      });

      const payload: any = {};
      if (Object.keys(entityWeights).length > 0) payload.entity_weights = entityWeights;
      if (Object.keys(thresholds).length > 0) payload.thresholds = thresholds;
      if (Object.keys(methodWeights).length > 0) payload.method_weights = methodWeights;

      const response = await fetch(
        `https://dev.syntx-system.com/scoring/profiles/${actualProfileId}/weights`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${AUTH}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const mods = Object.entries(modifiedProperties).map(([id, newValue]) => ({
          property: id.replace(/^(entity|threshold|method)_/, ''),
          oldValue: originalValues[id] || 0,
          newValue: newValue,
        }));
        
        setSaveModifications(mods);
        setShowSaveOverlay(true);
        setModifiedProperties({});
        
        await loadProfileData(selectedFormat!);
        setReloadTrigger(prev => prev + 1);
      } else {
        const errorText = await response.text();
        alert(`❌ Failed to save: ${errorText}`);
      }
    } catch (error) {
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
      overflow: 'visible', // ✅ CHANGED: Allow modals to overflow
    }}>
      {/* ═══════════════════════════════════════════════════ */}
      {/* 🌌 SUBTLE GALAXY BACKGROUND (Performance optimized) */}
      {/* ═══════════════════════════════════════════════════ */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        {/* Subtle Galaxy Glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 40% at 50% 50%, ${ORACLE_COLORS.primary}15, transparent 60%),
            radial-gradient(ellipse 60% 30% at 30% 60%, ${ORACLE_COLORS.secondary}10, transparent 50%),
            radial-gradient(ellipse 60% 30% at 70% 40%, ${ORACLE_COLORS.tertiary}10, transparent 50%)
          `,
          animation: 'galaxyPulse 15s ease-in-out infinite',
        }} />

        {/* Reduced Star Field (100 stars only) */}
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          return (
            <div
              key={`star-${i}`}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: size,
                height: size,
                borderRadius: '50%',
                background: i % 5 === 0 ? ORACLE_COLORS.primary : '#fff',
                boxShadow: `0 0 ${size * 3}px ${i % 5 === 0 ? ORACLE_COLORS.primary : '#fff'}`,
                opacity: 0.5,
                animation: `starTwinkle ${Math.random() * 6 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          );
        })}

        {/* Few Nebula Clouds (5 only) */}
        {[...Array(5)].map((_, i) => {
          const colors = [ORACLE_COLORS.primary, ORACLE_COLORS.secondary, ORACLE_COLORS.tertiary];
          return (
            <div
              key={`nebula-${i}`}
              style={{
                position: 'absolute',
                left: `${(i * 20) + 10}%`,
                top: `${(i * 20) + 10}%`,
                width: `${150 + Math.random() * 100}px`,
                height: `${80 + Math.random() * 60}px`,
                borderRadius: '60%',
                background: `radial-gradient(ellipse, ${colors[i % 3]}20, transparent 70%)`,
                filter: 'blur(40px)',
                animation: `nebulaDrift ${25 + i * 5}s ease-in-out infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          );
        })}
      </div>

      {/* Content Container */}
      <div style={{
        maxWidth: 1800,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <OracleHeader />

          {profileData && (
            <ProfileIdDisplay
              profileName={profileData.profile_name || profileData.profile_id}
              formatName={selectedFormat || "unknown"}
            />
          )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr 400px',
          gap: 40,
          alignItems: 'start',
        }}>
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

          <BirthTrigger
            selectedFormat={selectedFormat}
            profile={profileData}
            onPropertyChange={handlePropertyChange}
          />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}>
            <SpaceLegend stats={legendStats} />
            <ScoringViewer
              profileId={selectedProfile}
              format={selectedFormat}
              reloadTrigger={reloadTrigger}
            />
          </div>
        </div>
      </div>

      <SaveSuccessOverlay
        show={showSaveOverlay}
        modifications={saveModifications}
        profileId={profileData?.profile_id || ''}
        onClose={() => setShowSaveOverlay(false)}
      />

      <style jsx>{`
        @keyframes galaxyPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes nebulaDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
