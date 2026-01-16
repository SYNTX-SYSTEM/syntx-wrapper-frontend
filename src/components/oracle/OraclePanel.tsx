'use client';

import React, { useState } from 'react';
import { OracleHeader } from './OracleHeader';
import { OracleVisualization } from './OracleVisualization';
import { FormatSelector } from './FormatSelector';
import { ProfileSelector } from './ProfileSelector';
import { TextInput } from './TextInput';
import { SpaceLegend } from './SpaceLegend';
import { ORACLE_COLORS } from './constants';

export function OraclePanel() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isScoring, setIsScoring] = useState(false);
  const [scores, setScores] = useState<any>(null);

  const handleFormatChange = (format: string) => {
    console.log('🔥 FORMAT CHANGED:', format);
    setSelectedFormat(format);
    setSelectedProfile(null);
    setScores(null);
  };

  const handleProfileChange = (profile: string) => {
    console.log('🔥 PROFILE CHANGED:', profile);
    setSelectedProfile(profile);
  };

  const handleScore = async () => {
    if (!selectedFormat || !selectedProfile || !inputText) {
      alert('Please select format, profile, and enter text');
      return;
    }

    setIsScoring(true);
    
    // TODO: Implement actual scoring API call
    setTimeout(() => {
      setScores({
        overall: 0.85,
        fields: [],
      });
      setIsScoring(false);
    }, 2000);
  };

  console.log('🎯 OraclePanel State:', {
    selectedFormat,
    selectedProfile,
    inputText: inputText.length,
    isScoring,
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: ORACLE_COLORS.bg,
      padding: 40,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1400,
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
          {/* Left Controls */}
          <div>
            <FormatSelector
              activeFormat={selectedFormat}
              onChange={handleFormatChange}
              loading={isScoring}
            />

            <ProfileSelector
              format={selectedFormat}
              activeProfile={selectedProfile}
              onChange={handleProfileChange}
              loading={isScoring}
            />

            <button
              onClick={handleScore}
              disabled={!selectedFormat || !selectedProfile || !inputText || isScoring}
              style={{
                width: '100%',
                marginTop: 20,
                padding: '16px 24px',
                background: selectedFormat && selectedProfile && inputText
                  ? `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`
                  : ORACLE_COLORS.bgLight,
                border: 'none',
                borderRadius: 12,
                color: selectedFormat && selectedProfile && inputText
                  ? '#fff'
                  : ORACLE_COLORS.textDim,
                fontSize: 14,
                fontWeight: 800,
                cursor: selectedFormat && selectedProfile && inputText
                  ? 'pointer'
                  : 'not-allowed',
                fontFamily: 'monospace',
                letterSpacing: 2,
                transition: 'all 0.3s',
              }}
            >
              {isScoring ? 'SCORING...' : 'Select Format & Profile'}
            </button>
          </div>

          {/* Center Visualization */}
          <OracleVisualization
            isActive={!!(selectedFormat && selectedProfile)}
            scores={scores}
          />

          {/* Right Stats */}
          <SpaceLegend scores={scores} />
        </div>

        {/* Bottom Input */}
        <div style={{ marginTop: 40 }}>
          <TextInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleScore}
            disabled={!selectedFormat || !selectedProfile || isScoring}
          />
        </div>
      </div>
    </div>
  );
}
