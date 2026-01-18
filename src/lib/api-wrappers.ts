// SYNTX WRAPPERS API - Wrapper Management
const BASE = process.env.NEXT_PUBLIC_API_BASE || '';

const req = async (path: string, opts: RequestInit = {}) => {
  const res = await fetch(`${BASE}${path}`, { ...opts, credentials: 'include' });
  if (!res.ok) throw new Error(`API Error: ${path}`);
  return res.json();
};

export const wrapperAPI = {
  getWrappers: () => req('/resonanz/wrappers'),
  getWrappersFull: () => req('/resonanz/wrappers/full'),
  getWrapper: (name: string) => req(`/resonanz/wrapper/${name}`),
  getWrapperMeta: (name: string) => req(`/resonanz/wrapper/${name}/meta`),
  getWrapperStats: (name: string) => req(`/resonanz/stats/wrapper/${name}`),
  createWrapper: (data: any) => req('/resonanz/wrapper', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updateWrapper: (name: string, data: any) => req(`/resonanz/wrapper/${name}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteWrapper: (name: string) => req(`/resonanz/wrapper/${name}`, { method: 'DELETE' }),
};
