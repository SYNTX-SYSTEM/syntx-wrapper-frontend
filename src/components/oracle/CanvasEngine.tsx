// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ CANVAS ENGINE - MAIN RENDERING CORE                                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ResonanzNode, StromEdge } from './types';
import { ORACLE_COLORS, CANVAS_CONFIG } from './constants';
import { NodeRenderer } from './NodeRenderer';
import { EdgeRenderer } from './EdgeRenderer';

type Props = {
  nodes: ResonanzNode[];
  edges: StromEdge[];
  onNodeDrag: (id: string, position: { x: number; y: number }) => void;
  onNodeClick: (id: string) => void;
  selectedNode: string | null;
  hoverNode: string | null;
  onHoverNode: (id: string | null) => void;
};

export function CanvasEngine({
  nodes,
  edges,
  onNodeDrag,
  onNodeClick,
  selectedNode,
  hoverNode,
  onHoverNode,
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Zoom Handler
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -CANVAS_CONFIG.zoomStep : CANVAS_CONFIG.zoomStep;
    setZoom(prev => Math.max(CANVAS_CONFIG.minZoom, Math.min(CANVAS_CONFIG.maxZoom, prev + delta)));
  }, []);

  // Pan Handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.shiftKey) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Attach wheel listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <div
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: CANVAS_CONFIG.width,
        height: CANVAS_CONFIG.height,
        backgroundColor: ORACLE_COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
        cursor: isPanning ? 'grabbing' : 'grab',
        borderRadius: 20,
        border: `1px solid ${ORACLE_COLORS.bgLight}`,
      }}
    >
      {/* Transform Container */}
      <div
        style={{
          transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: '50% 50%',
          transition: isPanning ? 'none' : 'transform 0.2s ease-out',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* SVG Layer - Edges */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {edges.map(edge => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            return (
              <EdgeRenderer
                key={edge.id}
                edge={edge}
                from={fromNode.position}
                to={toNode.position}
              />
            );
          })}
        </svg>

        {/* Node Layer */}
        {nodes.map(node => (
          <NodeRenderer
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            isHovered={hoverNode === node.id}
            onDrag={(pos) => onNodeDrag(node.id, pos)}
            onClick={() => onNodeClick(node.id)}
            onHover={() => onHoverNode(node.id)}
            onLeave={() => onHoverNode(null)}
          />
        ))}
      </div>

      {/* Zoom Indicator */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: '8px 16px',
        background: ORACLE_COLORS.bgLight,
        borderRadius: 8,
        color: ORACLE_COLORS.textDim,
        fontSize: 12,
        fontFamily: 'monospace',
      }}>
        ZOOM: {(zoom * 100).toFixed(0)}%
      </div>
    </div>
  );
}
