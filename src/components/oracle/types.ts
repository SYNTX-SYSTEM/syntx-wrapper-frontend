// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ ORACLE TYPES - RESONANZ NODE ARCHITECTURE                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export type ResonanzNode = {
  id: string;
  label: string;
  position: { x: number; y: number };
  fixed?: boolean;
  fieldScore?: number;
  glowIntensity?: number;
  type: 'field' | 'entity' | 'score';
  metrics?: {
    presence: number;
    keyword_coverage: number;
    completeness: number;
    semantic_coherence: number;
  };
};

export type StromEdge = {
  id: string;
  from: string;
  to: string;
  type: 'flow' | 'dependency';
  scoreWeight?: number;
  animated?: boolean;
};

export type OracleState = {
  activeFormat: string | null;
  nodes: ResonanzNode[];
  edges: StromEdge[];
  zoom: number;
  offset: { x: number; y: number };
  selectedNode: string | null;
  hoverNode: string | null;
};

export type CanvasInteraction = {
  type: 'click' | 'drag' | 'zoom' | 'pan';
  nodeId?: string;
  delta?: { x: number; y: number };
};
