// SYNTX SYSTEM API - Health, Config, Training
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

const req = async (path: string, opts: RequestInit = {}) => {
  const res = await fetch(`${BASE}${path}`, { ...opts, credentials: 'include' });
  if (!res.ok) throw new Error(`API Error: ${path}`);
  return res.json();
};

export const systemAPI = {
  getHealth: () => req('/resonanz/health'),
  getResonanzHealth: () => req('/resonanz/health'),
  getConfig: () => req('/resonanz/config/default-wrapper'),
  getTraining: (limit = 10) => req(`/resonanz/training?limit=${limit}`),
  getSessions: (limit?: number, offset?: number) => req(`/resonanz/sessions?limit=${limit || 20}&offset=${offset || 0}`),
  getSession: (id: string) => req(`/resonanz/session/${id}`),
  getSessionReplay: (id: string) => req(`/resonanz/session/${id}/replay`),
  getHistory: () => req('/resonanz/sessions'),
};
