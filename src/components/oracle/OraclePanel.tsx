'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { ResonanzNode, StromEdge } from './types';
import { ORACLE_COLORS } from './constants';
import { CanvasEngine } from './CanvasEngine';
import { FormatSelector } from './FormatSelector';
import { ControlsPanel } from './ControlsPanel';
import { SpaceLegend } from './SpaceLegend';
import { TextInputPanel } from './TextInputPanel';
import { ProfileSelector } from './ProfileSelector';
import { ScoringHistoryPanel } from './ScoringHistoryPanel';
import { ScoreJsonViewer } from './ScoreJsonViewer';
import { LayoutResolver } from './LayoutResolver';

type Format = {
  name: string;
  description: string;
  fields?: Array<{ name: string; type: string; description?: string }>;
  field_count?: number;
};

export default function OraclePanel() {
  // State
  const [formats, setFormats] = useState<Format[]>([]);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [nodes, setNodes] = useState<ResonanzNode[]>([]);
  const [edges, setEdges] = useState<StromEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);
  
  // Scoring Management
  const [selectedScoring, setSelectedScoring] = useState<any>(null);
  const [jsonViewerVisible, setJsonViewerVisible] = useState(false);

  useEffect(() => {
    loadFormats();
  }, []);

  const loadFormats = async () => {
    setLoading(true);
    try {
      const response = await api.getFormats();
      const enrichedFormats = await Promise.all(
        (response.formats || []).map(async (format) => {
          try {
            const details = await api.getFormat(format.name);
            return {
              ...format,
              fields: details.format.fields,
              field_count: details.format.fields?.length || 0,
            };
          } catch {
            return { ...format, field_count: 0 };
          }
        })
      );
      setFormats(enrichedFormats);
    } catch (error) {
      console.error('Failed to load formats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormatChange = async (formatName: string) => {
    if (!formatName) return;
    setActiveFormat(formatName);
    await initializeGraph(formatName);
  };

  const handleProfileChange = (profileName: string) => {
    setActiveProfile(profileName);
  };

  const initializeGraph = async (formatName: string) => {
    setLoading(true);
    try {
      const formatData = await api.getFormat(formatName);
      
      const fieldNodes: ResonanzNode[] = (formatData.format.fields || []).map((field) => ({
        id: `field-${field.name}`,
        label: field.name,
        position: { x: 400, y: 300 },
        type: 'field',
        fieldScore: 0,
        glowIntensity: 0,
      }));

      const entityNode: ResonanzNode = {
        id: 'entity-main',
        label: activeProfile || 'ENTITY',
        position: { x: 400, y: 300 },
        type: 'entity',
        fixed: true,
      };

      const scoreNode: ResonanzNode = {
        id: 'score-main',
        label: 'SCORE',
        position: { x: 400, y: 500 },
        type: 'score',
      };

      const allNodes = [...fieldNodes, entityNode, scoreNode];
      const fieldEdges: StromEdge[] = fieldNodes.map(node => ({
        id: `edge-${node.id}-entity`,
        from: node.id,
        to: entityNode.id,
        type: 'flow',
        scoreWeight: 0.5,
      }));

      const scoreEdge: StromEdge = {
        id: 'edge-entity-score',
        from: entityNode.id,
        to: scoreNode.id,
        type: 'flow',
        scoreWeight: 0.8,
        animated: true,
      };

      const allEdges = [...fieldEdges, scoreEdge];
      const layout = new LayoutResolver(allNodes, allEdges, 800, 600);
      const positionedNodes = layout.compute(100);

      setNodes(positionedNodes);
      setEdges(allEdges);
    } catch (error) {
      console.error('Failed to initialize graph:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Scoring Selection from History
  const handleScoringSelect = (scoring: any) => {
    console.log('Loading scoring:', scoring);
    setSelectedScoring(scoring);
    setJsonViewerVisible(true);

    // Update nodes with scoring data
    if (scoring.scores) {
      updateNodesWithScores(scoring.scores);
    }
  };

  const updateNodesWithScores = (scores: any) => {
    setNodes(prev => prev.map(node => {
      if (node.type !== 'field') return node;

      const fieldName = node.id.replace('field-', '');
      const fieldScore = scores[fieldName];

      if (!fieldScore) return node;

      return {
        ...node,
        fieldScore: fieldScore.score || 0,
        glowIntensity: fieldScore.score || 0,
        metrics: {
          presence: fieldScore.presence || 0,
          keyword_coverage: fieldScore.keyword_coverage || 0,
          completeness: fieldScore.completeness || 0,
          semantic_coherence: fieldScore.semantic_coherence || 0,
        },
      };
    }));
  };

  const handleTextSubmit = async (text: string) => {
    if (!activeFormat || !text.trim()) return;

    setLoadingScores(true);
    try {
      const response = await api.scoreFormat({
        format_name: activeFormat,
        text: text,
      });

      if (response.scores) {
        updateNodesWithScores(response.scores);
        setSelectedScoring(response);
        setJsonViewerVisible(true);
      }
    } catch (error) {
      console.error('Scoring failed:', error);
      
      // Mock fallback
      setNodes(prev => prev.map(node => {
        if (node.type === 'field') {
          const score = 0.3 + Math.random() * 0.7;
          return {
            ...node,
            fieldScore: score,
            glowIntensity: score,
            metrics: {
              presence: 0.5 + Math.random() * 0.5,
              keyword_coverage: 0.4 + Math.random() * 0.6,
              completeness: 0.6 + Math.random() * 0.4,
              semantic_coherence: 0.7 + Math.random() * 0.3,
            },
          };
        }
        return node;
      }));
    } finally {
      setLoadingScores(false);
    }
  };

  const handleTriggerScoring = () => {
    handleTextSubmit("Sample scoring text.");
  };

  const handleRecalculateLayout = useCallback(() => {
    if (nodes.length === 0) return;
    const layout = new LayoutResolver(nodes, edges, 800, 600);
    const newNodes = layout.compute(100);
    setNodes(newNodes);
  }, [nodes, edges]);

  const handleResetView = useCallback(() => {
    setSelectedNode(null);
    setHoverNode(null);
  }, []);

  const handleNodeDrag = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, position, fixed: false } : node
    ));
  }, []);

  const handleNodeClick = useCallback((id: string) => {
    setSelectedNode(prev => prev === id ? null : id);
  }, []);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: ORACLE_COLORS.bg,
      padding: 24,
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 60, animation: 'float 6s ease-in-out infinite' }}>👁️</div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: 8,
              background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'monospace',
            }}>THE ORACLE</h1>
            <div style={{
              fontSize: 14,
              color: ORACLE_COLORS.textDim,
              letterSpacing: 4,
              marginTop: 8,
              fontFamily: 'monospace',
            }}>SEMANTIC MEMORY SYSTEM</div>
          </div>
        </div>
      </div>

      {/* Space Legend */}
      <SpaceLegend
        nodes={nodes}
        activeProfile={activeProfile || undefined}
        selectedNode={selectedNode}
        hoverNode={hoverNode}
      />

      {/* JSON Viewer */}
      <ScoreJsonViewer
        data={selectedScoring}
        visible={jsonViewerVisible}
        onClose={() => setJsonViewerVisible(false)}
      />

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
        {/* Sidebar */}
        <div>
          <FormatSelector
            formats={formats}
            activeFormat={activeFormat}
            onChange={handleFormatChange}
            loading={loading}
          />

          <ProfileSelector
            activeProfile={activeProfile}
            onChange={handleProfileChange}
            loading={loading}
          />

          <ScoringHistoryPanel
            format={activeFormat}
            profile={activeProfile}
            onSelect={handleScoringSelect}
            selectedId={selectedScoring?.id || null}
          />

          <TextInputPanel
            onSubmit={handleTextSubmit}
            loading={loadingScores}
            disabled={!activeFormat}
          />

          <ControlsPanel
            onRecalculateLayout={handleRecalculateLayout}
            onResetView={handleResetView}
            onTriggerScoring={handleTriggerScoring}
            loading={loadingScores}
          />
        </div>

        {/* Canvas */}
        <div>
          {!activeFormat ? (
            <div style={{
              height: 'calc(100vh - 200px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${ORACLE_COLORS.bgLight}`,
              borderRadius: 20,
              background: `radial-gradient(circle, ${ORACLE_COLORS.bgLight}, ${ORACLE_COLORS.bg})`,
            }}>
              <div style={{ fontSize: 80, opacity: 0.3, marginBottom: 20 }}>👁️</div>
              <div style={{ fontSize: 18, color: ORACLE_COLORS.textDim, fontFamily: 'monospace' }}>
                SELECT FORMAT TO BEGIN
              </div>
            </div>
          ) : (
            <CanvasEngine
              nodes={nodes}
              edges={edges}
              onNodeDrag={handleNodeDrag}
              onNodeClick={handleNodeClick}
              selectedNode={selectedNode}
              hoverNode={hoverNode}
              onHoverNode={setHoverNode}
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
