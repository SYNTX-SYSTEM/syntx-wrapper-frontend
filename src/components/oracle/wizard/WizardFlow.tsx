'use client';

import React, { useState } from 'react';
import { ORACLE_COLORS } from '../constants';
import { SkullCloseButton } from '../SkullCloseButton';
import { WelcomeStep } from './WelcomeStep';
import { FieldWeightsStep } from './FieldWeightsStep';
import { EntityWeightsStep } from './EntityWeightsStep';
import { ThresholdsStep } from './ThresholdsStep';
import { DriftStep } from './DriftStep';
import { SuccessStep } from './SuccessStep';

interface WizardFlowProps {
  selectedFormat: string;
  onComplete: (data: any) => void;
  onClose: () => void;
}

type WizardStep = 'welcome' | 'field_weights' | 'entity_weights' | 'thresholds' | 'drift' | 'success';

interface ScoringData {
  field_scoring_methods: Record<string, { weight: number }>;
  entity_weights: Record<string, number>;
  thresholds: { pass: number };
  drift_thresholds: Record<string, number>;
}

export function WizardFlow({ selectedFormat, onComplete, onClose }: WizardFlowProps) {
  const [step, setStep] = useState<WizardStep>('welcome');
  
  const [scoringData, setScoringData] = useState<ScoringData>({
    field_scoring_methods: {
      presence_check: { weight: 0.22 },
      keyword_coverage: { weight: 0.45 },
      completeness_check: { weight: 0.62 },
      semantic_coherence: { weight: 2.84 },
      drift_detection: { weight: 1.00 },
    },
    entity_weights: {
      gpt4_semantic_entity: 1.28,
    },
    thresholds: {
      pass: 7.5,
    },
    drift_thresholds: {
      no_drift: 0.9,
      minor_drift: 0.7,
      moderate_drift: 0.5,
      major_drift: 0.3,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const steps: WizardStep[] = ['welcome', 'field_weights', 'entity_weights', 'thresholds', 'drift', 'success'];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');
      
      console.log('🔥 STEP 1: Getting current binding...');
      
      const bindingResponse = await fetch(
        `https://dev.syntx-system.com/scoring/bindings/get_binding_by_format/${selectedFormat}`,
        {
          headers: { 'Authorization': `Basic ${AUTH}` },
        }
      );

      if (!bindingResponse.ok) {
        throw new Error('Failed to get binding');
      }

      const bindingData = await bindingResponse.json();
      const profileId = bindingData.profile_complete?.profile_id;

      if (!profileId) {
        throw new Error('No profile found for format');
      }

      console.log('✅ STEP 1: Found profile:', profileId);
      console.log('🔥 STEP 2: Updating scoring weights...');

      // Build payload for PUT /scoring/profiles/{id}/weights
      const updatePayload = {
        entity_weights: scoringData.entity_weights,
        thresholds: scoringData.thresholds,
        method_weights: Object.entries(scoringData.field_scoring_methods).reduce((acc, [key, val]) => {
          acc[key] = val.weight;
          return acc;
        }, {} as Record<string, number>),
      };

      const updateResponse = await fetch(
        `https://dev.syntx-system.com/scoring/profiles/${profileId}/weights`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${AUTH}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Scoring update failed: ${errorText}`);
      }

      console.log('✅ STEP 2: Scoring weights updated!');
      console.log('🎉 COMPLETE!');
      
      setStep('success');
      
      setTimeout(() => {
        onComplete({ profile_id: profileId });
      }, 2000);
      
    } catch (error) {
      console.error('❌ Save failed:', error);
      alert(`❌ Failed to save: ${error}`);
      setIsSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.98)',
      backdropFilter: 'blur(15px)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease-out',
      overflow: 'auto',
    }}>
      {step !== 'success' && <SkullCloseButton onClose={onClose} />}

      {step !== 'success' && (
        <div style={{
          padding: '30px 60px',
          borderBottom: `2px solid ${ORACLE_COLORS.primary}40`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 32 }}>🧙</div>
            <div>
              <div style={{
                fontSize: 28,
                fontWeight: 900,
                color: ORACLE_COLORS.secondary,
                fontFamily: 'monospace',
                letterSpacing: 3,
              }}>
                WIZARD SCORING TUNER
              </div>
              <div style={{
                fontSize: 14,
                color: ORACLE_COLORS.secondary + '80',
                fontFamily: 'monospace',
                marginTop: 4,
              }}>
                Format: {selectedFormat.toUpperCase()} • Adjust Scoring Weights
              </div>
            </div>
          </div>

          <div style={{
            height: 8,
            background: ORACLE_COLORS.bgLight,
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
              transition: 'width 0.3s',
              boxShadow: `0 0 20px ${ORACLE_COLORS.primary}80`,
            }} />
          </div>

          <div style={{
            marginTop: 10,
            fontSize: 12,
            color: ORACLE_COLORS.primary,
            fontFamily: 'monospace',
          }}>
            STREAM ENERGY: {currentStepIndex + 1} / {steps.length}
          </div>
        </div>
      )}

      <div style={{
        flex: 1,
        padding: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {step === 'welcome' && (
          <WelcomeStep 
            profileName={`Scoring for ${selectedFormat.toUpperCase()}`}
            formatName={selectedFormat}
            onNext={() => setStep('field_weights')} 
          />
        )}

        {step === 'field_weights' && (
          <FieldWeightsStep 
            data={scoringData.field_scoring_methods}
            onChange={(field, weight) => {
              setScoringData(prev => ({
                ...prev,
                field_scoring_methods: {
                  ...prev.field_scoring_methods,
                  [field]: { weight },
                },
              }));
            }}
            onNext={() => setStep('entity_weights')}
            onBack={() => setStep('welcome')}
          />
        )}

        {step === 'entity_weights' && (
          <EntityWeightsStep
            data={scoringData.entity_weights}
            onChange={(entity, weight) => {
              setScoringData(prev => ({
                ...prev,
                entity_weights: { ...prev.entity_weights, [entity]: weight },
              }));
            }}
            onNext={() => setStep('thresholds')}
            onBack={() => setStep('field_weights')}
          />
        )}

        {step === 'thresholds' && (
          <ThresholdsStep
            value={scoringData.thresholds.pass}
            onChange={(value) => {
              setScoringData(prev => ({
                ...prev,
                thresholds: { pass: value },
              }));
            }}
            onNext={() => setStep('drift')}
            onBack={() => setStep('entity_weights')}
          />
        )}

        {step === 'drift' && (
          <DriftStep
            data={scoringData.drift_thresholds}
            onChange={(level, value) => {
              setScoringData(prev => ({
                ...prev,
                drift_thresholds: { ...prev.drift_thresholds, [level]: value },
              }));
            }}
            onSave={handleSave}
            onBack={() => setStep('thresholds')}
            isSaving={isSaving}
          />
        )}

        {step === 'success' && (
          <SuccessStep 
            profileName={`Scoring for ${selectedFormat.toUpperCase()}`}
            formatName={selectedFormat}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
