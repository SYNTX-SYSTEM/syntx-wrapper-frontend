// SYNTX API - Direct Backend Connection
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

const req = async (path: string, opts: RequestInit = {}) => {
  const res = await fetch(`${BASE}${path}`, { ...opts, credentials: 'include' });
  if (!res.ok) throw new Error(`API Error: ${path}`);
  return res.json();
};

export const api = {
  // FORMATS
  getFormats: () => req('/mapping/formats'),
  getFormat: (name: string) => req(`/mapping/format/${name}`),
  
  // PROFILES
  getProfiles: () => req('/profiles/'),
  getProfile: (name: string) => req(`/profiles/${name}`),
  
  // SCORING
  scoreFormat: (data: { format_name: string; text: string }) => 
    req('/api/scoring/format', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  
  getScoringHistory: (params: { format?: string; profile?: string; limit?: number }) => {
    const q = new URLSearchParams();
    if (params.format) q.append('format', params.format);
    if (params.profile) q.append('profile', params.profile);
    if (params.limit) q.append('limit', params.limit.toString());
    return req(`/api/scoring/history?${q}`);
  },
  
  // STYLES
  getStyles: () => req('/resonanz/styles'),
  getStyle: (name: string) => req(`/resonanz/styles/${name}`),
  
  alchemyPreview: (data: { text: string; style: string }) =>
    req('/resonanz/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: data.text, 
        style: data.style, 
        max_new_tokens: 500 
      }),
    }),
  
  createStyle: (data: any) =>
    req('/api/resonanz/styles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  
  updateStyle: (name: string, data: any) =>
    req(`/api/resonanz/styles/${name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  
  deleteStyle: (name: string) =>
    req(`/api/resonanz/styles/${name}`, { method: 'DELETE' }),
  
  addAlchemy: (styleName: string, data: { original: string; replacement: string }) =>
    req(`/api/resonanz/styles/${styleName}/alchemy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  
  deleteAlchemy: (styleName: string, original: string) =>
    req(`/api/resonanz/styles/${styleName}/alchemy/${encodeURIComponent(original)}`, {
      method: 'DELETE',
    }),
  
  addForbidden: (styleName: string, word: string) =>
    req(`/api/resonanz/styles/${styleName}/forbidden/${encodeURIComponent(word)}`, {
      method: 'POST',
    }),
  
  deleteForbidden: (styleName: string, word: string) =>
    req(`/api/resonanz/styles/${styleName}/forbidden/${encodeURIComponent(word)}`, {
      method: 'DELETE',
    }),
  
  // STREAM
  
  // CHAT
  
  // DIFF - Multi-wrapper comparison
  diff: (data: { prompt: string; wrappers: string[]; max_new_tokens?: number }) =>
    req('/resonanz/diff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  
  // DIFF - Multi-wrapper comparison
  chat: (data: { prompt: string; [key: string]: any }) =>
    req('/resonanz/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  getStream: (limit = 10) => req(`/resonanz/strom?limit=${limit}`),
};

// STATS & ANALYTICS
export const statsAPI = {
  getStats: () => req('/resonanz/stats'),
  getTraining: (limit = 10) => req(`/resonanz/training?limit=${limit}`),
  getHistory: (requestId: string) => req(`/resonanz/history/${requestId}`),
};

// RE-EXPORT TYPES
export type { 
  StatsResponse, 
  StreamEvent, 
  TrainingRequest,
  WrapperStatsResponse 
} from '@/types/api';

// RE-EXPORT MORE TYPES
export type { ChatResponse, Wrapper } from '@/types/api';

// WRAPPERS API
export { wrapperAPI } from './api-wrappers';

// SYSTEM API
export { systemAPI } from './api-system';

// FORMATS API
export { formatAPI } from './api-formats';
