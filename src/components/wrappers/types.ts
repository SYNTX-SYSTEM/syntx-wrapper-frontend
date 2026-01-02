// 🔥 SYNTX WRAPPER TYPES & CONSTANTS

export interface Wrapper {
  name: string;
  path?: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  meta?: any;
  description?: string;
  author?: string;
}

export interface WrapperDetail {
  name: string;
  content: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  meta?: any;
  description?: string;
  author?: string;
}

export interface WrapperStats {
  wrapper: string;
  requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

export const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  teal: '#14b8a6',
  pink: '#ec4899',
  lime: '#84cc16',
  yellow: '#eab308',
} as const;

export const getWrapperColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('human')) return COLORS.green;
  if (n.includes('sigma')) return COLORS.orange;
  if (n.includes('deepsweep')) return COLORS.magenta;
  if (n.includes('true_raw') || n.includes('true-raw')) return COLORS.red;
  if (n.includes('universal')) return COLORS.purple;
  if (n.includes('frontend')) return COLORS.cyan;
  if (n.includes('backend')) return COLORS.teal;
  if (n.includes('driftkorper') || n.includes('drift')) return COLORS.pink;
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const keys = Object.keys(COLORS) as (keyof typeof COLORS)[];
  return COLORS[keys[hash % keys.length]];
};

export const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
};
