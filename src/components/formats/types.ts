// 🔥 SYNTX FORMAT TYPES & CONSTANTS

export interface LocalFormat {
  name: string;
  description?: string | { de?: string; en?: string };
  fields_count: number;
  version?: string;
  language?: string;
  languages?: string[];
  primary_language?: string;
  wrapper?: string;
  created_at?: string;
  updated_at?: string;
  usage_count?: number;
  fields?: any[];
}

export interface EditField {
  name: string;
  weight: number;
  enabled: boolean;
}

export interface CreateField {
  name: string;
  weight: number;
}

export interface FullFormatDetail {
  name: string;
  description?: { de?: string; en?: string };
  languages?: string[];
  fields?: {
    name: string;
    header?: string;
    description?: string;
    keywords?: string[];
    weight?: number;
  }[];
  version?: string;
  wrapper?: string;
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

export const AVAILABLE_WRAPPERS = [
  'syntex_wrapper_sigma',
  'syntex_wrapper_human',
  'syntex_wrapper_deepsweep',
  'syntex_wrapper_true_raw',
  'syntex_wrapper_universal',
];

export const getFormatColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('sigma')) return COLORS.orange;
  if (n.includes('human')) return COLORS.green;
  if (n.includes('syntex') || n.includes('syntx')) return COLORS.purple;
  if (n.includes('economic')) return COLORS.lime;
  if (n.includes('code')) return COLORS.cyan;
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const keys = Object.keys(COLORS) as (keyof typeof COLORS)[];
  return COLORS[keys[hash % keys.length]];
};

export const getDesc = (d: any): string => {
  if (!d) return '';
  if (typeof d === 'string') return d;
  return d.de || d.en || '';
};
