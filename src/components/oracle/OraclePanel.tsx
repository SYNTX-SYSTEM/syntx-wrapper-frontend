'use client';

import React, { useState, useEffect } from 'react';
import { OracleHeader } from './OracleHeader';
import { OracleEye } from './OracleEye';
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
        
        // Store original values
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
    console.log('🔥 FORMAT CHANGED:', format);
    setSelectedFormat(format);
    setSelectedProfile(null);
    setProfileData(null);
    setModifiedProperties({});
    setOriginalValues({});
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
    if (!selectedFormat || Object.keys(modifiedProperties).length === 0) {
      alert('No changes to save');
      return;
    }

    const actualProfileId = profileData?.profile_id;
    
    if (!actualProfileId) {
      alert('Profile ID not found');
      console.error('❌ profileData:', profileData);
      return;
    }

    console.log('💾 SAVING WITH PROFILE ID:', actualProfileId);

    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');

      // Build weight update payload
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

      const payload: any = {};
      if (Object.keys(entityWeights).length > 0) payload.entity_weights = entityWeights;
      if (Object.keys(thresholds).length > 0) payload.thresholds = thresholds;
      if (Object.keys(methodWeights).length > 0) payload.method_weights = methodWeights;

      console.log('📦 PAYLOAD:', payload);

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
        const result = await response.json();
        console.log('✅ SAVE SUCCESS:', result);
        
        // Prepare modifications for overlay
        const mods = Object.entries(modifiedProperties).map(([id, newValue]) => ({
          property: id.replace(/^(entity|threshold|method)_/, ''),
          oldValue: originalValues[id] || 0,
          newValue: newValue,
        }));
        
        setSaveModifications(mods);
        setShowSaveOverlay(true);
        
        // Clear modifications
        setModifiedProperties({});
        
        // Trigger reload
        await loadProfileData(selectedFormat!);
        setReloadTrigger(prev => prev + 1);
      } else {
        const errorText = await response.text();
        console.error('❌ Save failed:', errorText);
        alert(`❌ Failed to save: ${errorText}`);
      }
    } catch (error) {
      console.error('❌ Save failed:', error);
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

          {/* Right Column - Stats (Raised Position) */}
          <div style={{ marginTop: -80 }}>
            <SpaceLegend scores={null} />
          </div>
        </div>
      </div>

      {/* Bottom Right - Scoring Viewer */}
      <ScoringViewer
        profileId={selectedProfile}
        format={selectedFormat}
        reloadTrigger={reloadTrigger}
      />

      {/* Save Success Overlay */}
      <SaveSuccessOverlay
        show={showSaveOverlay}
        modifications={saveModifications}
        profileId={profileData?.profile_id || ''}
        onClose={() => setShowSaveOverlay(false)}
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
