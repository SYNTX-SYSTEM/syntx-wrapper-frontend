'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';

interface Stage {
  number: number;
  label: string;
  icon: string;
  color: string;
}

const STAGES: Stage[] = [
  { number: 1, label: 'INCOMING', icon: '░░', color: 'from-gray-500 to-gray-600' },
  { number: 2, label: 'WRAPPERS', icon: '▓▓', color: 'from-blue-500 to-blue-600' },
  { number: 3, label: 'CALIBRATE', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
  { number: 4, label: 'BACKEND', icon: '██', color: 'from-fuchsia-500 to-fuchsia-600' },
  { number: 5, label: 'RESPONSE', icon: '🌊', color: 'from-syntx-cyan to-cyan-400' },
];

interface FieldFlowVisualizerProps {
  activeStage?: number;
  processing?: boolean;
  onStageClick?: (stage: number) => void;
}

export function FieldFlowVisualizer({ 
  activeStage = 0, 
  processing = false,
  onStageClick 
}: FieldFlowVisualizerProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted mb-6 flex items-center gap-2">
        <span className="text-syntx-cyan">⚡</span>
        Field Flow Pipeline
        {processing && (
          <span className="ml-2 text-syntx-cyan animate-pulse">Processing...</span>
        )}
      </h2>

      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {STAGES.map((stage, index) => (
          <div key={stage.number} className="flex items-center">
            {/* Stage Node */}
            <StageNode
              stage={stage}
              active={activeStage >= stage.number}
              current={activeStage === stage.number}
              processing={processing && activeStage === stage.number}
              onClick={() => onStageClick?.(stage.number)}
            />
            
            {/* Connector */}
            {index < STAGES.length - 1 && (
              <FlowConnector active={activeStage > stage.number} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

interface StageNodeProps {
  stage: Stage;
  active: boolean;
  current: boolean;
  processing: boolean;
  onClick?: () => void;
}

function StageNode({ stage, active, current, processing, onClick }: StageNodeProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center gap-2 p-4 min-w-[90px]
        rounded-xl border-2 transition-all duration-500
        ${active 
          ? 'border-syntx-cyan bg-syntx-cyan/10 shadow-glow-cyan' 
          : 'border-syntx-border/50 bg-syntx-dark/50 hover:border-syntx-border'}
        ${current ? 'scale-110 z-10' : 'scale-100'}
        ${processing ? 'animate-pulse' : ''}
      `}
    >
      {/* Glow Ring */}
      {active && (
        <div className="absolute inset-0 rounded-xl bg-syntx-cyan/20 blur-xl -z-10 animate-pulse" />
      )}

      {/* Number Badge */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        font-bold text-lg font-mono transition-all duration-300
        ${active 
          ? 'bg-gradient-to-br ' + stage.color + ' text-white shadow-lg' 
          : 'bg-syntx-dark border border-syntx-border text-syntx-muted'}
      `}>
        {stage.number}
      </div>

      {/* Icon */}
      <div className={`text-xl transition-all duration-300 ${active ? 'scale-110' : ''}`}>
        {stage.icon}
      </div>

      {/* Label */}
      <div className={`
        text-xs font-mono uppercase tracking-wider transition-colors duration-300
        ${active ? 'text-syntx-cyan' : 'text-syntx-muted'}
      `}>
        {stage.label}
      </div>

      {/* Processing Indicator */}
      {processing && (
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <span className="absolute inset-0 rounded-full bg-syntx-cyan animate-ping" />
          <span className="absolute inset-0 rounded-full bg-syntx-cyan" />
        </div>
      )}
    </button>
  );
}

function FlowConnector({ active }: { active: boolean }) {
  return (
    <div className="flex items-center px-1 relative">
      {/* Line */}
      <div className={`
        h-0.5 w-8 transition-all duration-500 relative overflow-hidden
        ${active ? 'bg-syntx-cyan shadow-glow-cyan' : 'bg-syntx-border/50'}
      `}>
        {/* Animated Flow */}
        {active && (
          <div className="absolute inset-y-0 w-4 bg-gradient-to-r from-transparent via-white to-transparent animate-flow" />
        )}
      </div>
      
      {/* Arrow */}
      <div className={`
        w-0 h-0 border-y-4 border-y-transparent border-l-6 
        transition-colors duration-500
        ${active ? 'border-l-syntx-cyan' : 'border-l-syntx-border/50'}
      `} 
      style={{ borderLeftWidth: '8px' }}
      />
    </div>
  );
}
