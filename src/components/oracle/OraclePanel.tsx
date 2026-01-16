// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ ORACLE PANEL - MAIN INTEGRATION                                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { ResonanzNode, StromEdge } from './types';
import { ORACLE_COLORS } from './constants';
import { CanvasEngine } from './CanvasEngine';
import { FormatSelector } from './FormatSelector';
import { ControlsPanel } from './ControlsPanel';
import { LayoutResolver } from './LayoutResolver';

type Format = {
  name: string;
  description: string;
  fields?: Array<{
    name: string;
    type: string;
    description?: string;
  }>;
};

export default function OraclePanel() {
  // State
  const [formats, setFormats] = useState<Format[]>([]);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [nodes, setNodes] = useState<ResonanzNode[]>([]);
  const [edges, setEdges] = useState<StromEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);

  // Load formats on mount
  useEffect(() => {
    loadFormats();
  }, []);

  const loadFormats = async () => {
    setLoading(true);
    try {
      const response = await api.getFormats();
      setFormats(response.formats || []);
    } catch (error) {
      console.error('Failed to load formats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load format details and generate nodes
  const handleFormatChange = async (formatName: string) => {
    if (!formatName) return;
    
    setActiveFormat(formatName);
    setLoading(true);

    try {
      const formatData = await api.getFormat(formatName);
      
      // Generate nodes from fields
      const fieldNodes: ResonanzNode[] = (formatData.format.fields || []).map((field, idx) => ({
        id: `field-${field.name}`,
        label: field.name,
        position: { x: 400, y: 300 }, // Will be recalculated
        type: 'field',
        fieldScore: 0,
        glowIntensity: 0,
      }));

      // Add entity node
      const entityNode: ResonanzNode = {
        id: 'entity-main',
        label: 'ENTITY',
        position: { x: 400, y: 300 },
        type: 'entity',
        fixed: true, // Keep entity in center
      };

      // Add score node
      const scoreNode: ResonanzNode = {
        id: 'score-main',
        label: 'SCORE',
        position: { x: 400, y: 500 },
        type: 'score',
      };

      const allNodes = [...fieldNodes, entityNode, scoreNode];

      // Generate edges (field → entity → score)
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

      // Apply layout
      const layout = new LayoutResolver(allNodes, allEdges, 800, 600);
      const positionedNodes = layout.compute(100);

      setNodes(positionedNodes);
      setEdges(allEdges);
    } catch (error) {
      console.error('Failed to load format:', error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger scoring and update nodes
  const handleTriggerScoring = async () => {
    if (!activeFormat) return;

    setLoadingScores(true);
    try {
      // Mock scoring - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update nodes with random scores
      setNodes(prev => prev.map(node => {
        if (node.type === 'field') {
          const score = 0.3 + Math.random() * 0.7;
          return {
            ...node,
            fieldScore: score,
            glowIntensity: score,
          };
        }
        return node;
      }));
    } catch (error) {
      console.error('Scoring failed:', error);
    } finally {
      setLoadingScores(false);
    }
  };

  // Recalculate layout
  const handleRecalculateLayout = useCallback(() => {
    if (nodes.length === 0) return;

    const layout = new LayoutResolver(nodes, edges, 800, 600);
    const newNodes = layout.compute(100);
    setNodes(newNodes);
  }, [nodes, edges]);

  // Reset view
  const handleResetView = useCallback(() => {
    setSelectedNode(null);
    setHoverNode(null);
  }, []);

  // Handle node drag
  const handleNodeDrag = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, position } : node
    ));
  }, []);

  // Handle node click
  const handleNodeClick = useCallback((id: string) => {
    setSelectedNode(prev => prev === id ? null : id);
  }, []);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: ORACLE_COLORS.bg,
      padding: 24,
    }}>
      {/* Header */}
      <div style={{
        marginBottom: 24,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            fontSize: 60,
            animation: 'float 6s ease-in-out infinite',
          }}>
            👁️
          </div>
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
            }}>
              THE ORACLE
            </h1>
            <div style={{
              fontSize: 14,
              color: ORACLE_COLORS.textDim,
              letterSpacing: 4,
              marginTop: 8,
              fontFamily: 'monospace',
            }}>
              SCORE VISION NEXUS
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: 24,
      }}>
        {/* Sidebar */}
        <div>
          <FormatSelector
            formats={formats}
            activeFormat={activeFormat}
            onChange={handleFormatChange}
            loading={loading}
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
              <div style={{
                fontSize: 18,
                color: ORACLE_COLORS.textDim,
                fontFamily: 'monospace',
              }}>
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

      {/* Float Animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
