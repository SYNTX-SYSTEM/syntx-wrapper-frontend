const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

export const api = {
  // Formats
  getFormats: async () => {
    const response = await fetch(`${API_BASE}/api/formats`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch formats');
    return response.json();
  },

  getFormat: async (name: string) => {
    const response = await fetch(`${API_BASE}/api/formats/${name}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch format');
    return response.json();
  },

  // Profiles
  getProfiles: async () => {
    const response = await fetch(`${API_BASE}/api/profiles`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch profiles');
    return response.json();
  },

  getProfile: async (name: string) => {
    const response = await fetch(`${API_BASE}/api/profiles/${name}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  // Scoring
  scoreFormat: async (data: { format_name: string; text: string }) => {
    const response = await fetch(`${API_BASE}/api/scoring/format`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to score format');
    return response.json();
  },

  getScoringHistory: async (params: {
    format?: string;
    profile?: string;
    limit?: number;
  }) => {
    const query = new URLSearchParams();
    if (params.format) query.append('format', params.format);
    if (params.profile) query.append('profile', params.profile);
    if (params.limit) query.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE}/api/scoring/history?${query}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch scoring history');
    return response.json();
  },
};
