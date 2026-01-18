// SYNTX FORMATS API - Format CRUD
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

const req = async (path: string, opts: RequestInit = {}) => {
  const res = await fetch(`${BASE}${path}`, { ...opts, credentials: 'include' });
  if (!res.ok) throw new Error(`API Error: ${path}`);
  return res.json();
};

export const formatAPI = {
  createFormatQuick: (data: any) => req('/resonanz/formats/quick', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updateFormat: (name: string, data: any) => req(`/resonanz/formats/${name}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteFormat: (name: string) => req(`/resonanz/formats/${name}`, { method: 'DELETE' }),
};
