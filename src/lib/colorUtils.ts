// 🌊⚡ SYNTX DYNAMIC COLOR SYSTEM ⚡🌊
// Generates consistent colors for any wrapper name

const SYNTX_PALETTE = [
  '#00d4ff', // cyan
  '#d946ef', // magenta
  '#f59e0b', // orange
  '#10b981', // green
  '#ef4444', // red
  '#8b5cf6', // purple
  '#06b6d4', // teal
  '#ec4899', // pink
  '#f97316', // orange-alt
  '#14b8a6', // teal-alt
];

// Simple hash function for consistent color assignment
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getWrapperColor(wrapperName: string): string {
  const index = hashString(wrapperName) % SYNTX_PALETTE.length;
  return SYNTX_PALETTE[index];
}

export function generateWrapperColors(wrappers: string[]): Record<string, string> {
  return wrappers.reduce((acc, wrapper) => {
    acc[wrapper] = getWrapperColor(wrapper);
    return acc;
  }, {} as Record<string, string>);
}

export const SYNTX_COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
} as const;
