// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🎨 SYNTX ALCHEMY - RESONANZ-KONSTANTEN                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  yellow: '#eab308',
  gold: '#fbbf24',
  dark: '#0a1628',
  darker: '#030b15'
} as const;

export const STYLE_COLORS: Record<string, string> = {
  berlin_slang: COLORS.orange,
  zynisch: COLORS.red,
  wissenschaftlich: COLORS.cyan,
  poetisch: COLORS.magenta
};

export const STYLE_ICONS: Record<string, string> = {
  berlin_slang: '🍺',
  zynisch: '🙄',
  wissenschaftlich: '🔬',
  poetisch: '🌸'
};

export const STYLE_VIBES: Record<string, string> = {
  berlin_slang: 'Späti-Philosophie um 3 Uhr nachts',
  zynisch: 'Der Augenroll-Transformer',
  wissenschaftlich: 'Der Laborkittel des Outputs',
  poetisch: 'Der Wortwebstuhl der Seele'
};
