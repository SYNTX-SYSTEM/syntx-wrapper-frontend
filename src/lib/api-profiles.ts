// ═══════════════════════════════════════════════════════════════════════════
// 🧠 SYNTX PROFILE ANALYTICS API
// ═══════════════════════════════════════════════════════════════════════════
// Pure data fetching. No interpretation. Only system truth.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

// ═══════════════════════════════════════════════════════════════════════════
// 🔌 HELPER - Same pattern as api.ts
// ═══════════════════════════════════════════════════════════════════════════

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPES - System Truth Structures
// ═══════════════════════════════════════════════════════════════════════════

export interface ProfileUsageData {
  profile_id: string;
  total_uses: number;
  avg_score: number;
  last_used: string | null;
  usage_trend: 'STABLE' | 'INCREASING' | 'DECREASING';
  status: 'ACTIVE' | 'UNUSED';
}

export interface PatternPulseData {
  pattern: string;
  score: number;
  match_count: number;
  stability: string;
  state?: 'ACTIVE' | 'DORMANT' | 'TENSIONED' | 'UNBORN';
}

export interface PatternAnalyticsData {
  state: 'ACTIVE' | 'DORMANT' | 'TENSIONED' | 'UNBORN';
  profile_id: string;
  message: string;
  patterns: Record<string, PatternPulseData>;
  dormant: string[];
  total_pulses: number;
}

export interface SystemHealthData {
  status: string;
  organs: {
    profile_usage: 'READY' | 'ERROR';
    pattern_analytics: 'READY' | 'ERROR';
  };
  message: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// API FUNCTIONS - Pure Fetchers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get system health status
 * Endpoint: GET /profiles/analytics/health
 */
export async function getSystemHealth(): Promise<SystemHealthData> {
  return fetchAPI<SystemHealthData>('/profiles/analytics/health');
}

/**
 * Get profile usage analytics
 * Endpoint: GET /profiles/analytics/usage/{id}
 */
export async function getProfileUsage(
  profileId: string,
  daysBack: number = 7
): Promise<{ status: string; data: ProfileUsageData }> {
  return fetchAPI<{ status: string; data: ProfileUsageData }>(
    `/profiles/analytics/usage/${profileId}?days_back=${daysBack}`
  );
}

/**
 * Get pattern pulse analytics
 * Endpoint: GET /profiles/analytics/patterns/{id}
 */
export async function getPatternPulse(
  profileId: string,
  daysBack: number = 7,
  verbose: boolean = false
): Promise<{ status: string; data: PatternAnalyticsData }> {
  const params = new URLSearchParams({
    days_back: daysBack.toString(),
    ...(verbose && { verbose: 'true' })
  });
  
  return fetchAPI<{ status: string; data: PatternAnalyticsData }>(
    `/profiles/analytics/patterns/${profileId}?${params}`
  );
}

/**
 * Get all profile analytics (merged view)
 * Endpoint: GET /resonanz/scoring/analytics/profiles
 */
export async function getAllProfileAnalytics(
  days: number = 7
): Promise<Record<string, ProfileUsageData>> {
  const data = await fetchAPI<{ profiles: Record<string, ProfileUsageData> }>(
    `/resonanz/scoring/analytics/profiles?days=${days}`
  );
  
  return data.profiles || {};
}

/**
 * Get component breakdown for profile
 * Endpoint: GET /resonanz/scoring/analytics/profiles/{id}/components
 */
export async function getProfileComponentBreakdown(profileId: string) {
  return fetchAPI<any>(
    `/resonanz/scoring/analytics/profiles/${profileId}/components`
  );
}
