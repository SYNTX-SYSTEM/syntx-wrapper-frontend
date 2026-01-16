// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ ORACLE CONSTANTS - VISUAL PARAMETERS                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export const ORACLE_COLORS = {
  bg: '#0a0a0f',
  bgLight: '#16213e',
  primary: '#00ffff',
  secondary: '#9d00ff',
  tertiary: '#00ff9d',
  glow: 'rgba(0, 255, 255, 0.4)',
  edge: 'rgba(157, 0, 255, 0.6)',
  text: '#ffffff',
  textDim: 'rgba(255, 255, 255, 0.6)',
};

export const CANVAS_CONFIG = {
  width: '100%',
  height: 'calc(100vh - 200px)',
  minZoom: 0.5,
  maxZoom: 3,
  zoomStep: 0.1,
  panSpeed: 1,
  nodeRadius: 60,
  edgeWidth: 2,
};

export const PHYSICS = {
  repulsion: 200,
  attraction: 0.01,
  damping: 0.9,
  centerGravity: 0.05,
};
