// TOOLTIPS.TS - SYNTX MEGA CALL 💎🔥
// Holt ALLES dynamisch vom Backend
// Keine statischen Daten - Pure API Flow!

const BASE_URL = 'https://dev.syntx-system.com';

// ═══════════════════════════════════════════════════════════════
// TYPES 🌊
// ═══════════════════════════════════════════════════════════════

export interface FormatField {
  name: string;
  type: string;
  description?: string;
}

export interface FormatDetails {
  name: string;
  description: string;
  fields_count: number;
  fields?: FormatField[];
  languages: string[];
}

export interface ProfileBinding {
  profile_id: string;
  profile_exists: boolean;
  profile_details: {
    name: string;
    description?: string;
    strategy: string;
    components: Record<string, any>;
    changelog: Array<{
      timestamp: string;
      changed_by: string;
      reason: string;
      changes?: any;
      field_analyzed?: string;
    }>;
    updated_at: string;
  };
  mistral_wrapper: string;
  gpt_wrapper: string;
  drift_scoring: {
    enabled: boolean;
    threshold: number;
  };
  resonanz_score: number;
}

export interface CompleteFormatData {
  // From /mapping/formats
  mappings: Record<string, {
    mistral_wrapper: string;
    gpt_wrapper: string;
    drift_scoring: {
      enabled: boolean;
      threshold: number;
    };
    resonanz_score: number;
    profile_id: string;
  }>;
  
  // From /resonanz/formats
  formats: FormatDetails[];
  
  // Total counts
  total_formats: number;
  total_profiles: number;
}

export interface TooltipData {
  formatName: string;
  formatDescription: string;
  formatFieldsCount: number;
  formatLanguages: string[];
  
  profileId: string;
  profileName: string;
  profileDescription?: string;
  profileStrategy: string;
  profileComponents: Record<string, any>;
  profileChangelog: Array<any>;
  
  mistralWrapper: string;
  gptWrapper: string;
  driftScoring: {
    enabled: boolean;
    threshold: number;
  };
  resonanzScore: number;
  
  // Dynamic color based on format name
  formatColor: {
    primary: string;
    glow: string;
    shadow: string;
  };
}

// ═══════════════════════════════════════════════════════════════
// MEGA CALL - GET EVERYTHING! 🔥
// ═══════════════════════════════════════════════════════════════

export async function getAllSystemData(): Promise<CompleteFormatData | null> {
  try {
    const [mappingsRes, formatsRes] = await Promise.all([
      fetch(`${BASE_URL}/mapping/formats`),
      fetch(`${BASE_URL}/resonanz/formats`),
    ]);

    if (!mappingsRes.ok || !formatsRes.ok) {
      console.error('Failed to fetch system data');
      return null;
    }

    const mappingsData = await mappingsRes.json();
    const formatsData = await formatsRes.json();

    return {
      mappings: mappingsData.mappings || {},
      formats: formatsData.formats || [],
      total_formats: mappingsData.total_formats || 0,
      total_profiles: mappingsData.total_profiles || 0,
    };
  } catch (error) {
    console.error('Error in getAllSystemData:', error);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// DYNAMIC FORMAT COLOR 🎨
// ═══════════════════════════════════════════════════════════════

export function getFormatColor(formatName: string) {
  const name = formatName.toLowerCase();
  
  // Dynamic color mapping based on format name patterns
  const colorMap: Record<string, { primary: string; glow: string; shadow: string }> = {
    syntx: { 
      primary: '#00ff88', 
      glow: 'rgba(0, 255, 136, 0.6)',
      shadow: '0 0 30px rgba(0, 255, 136, 0.4)'
    },
    ultra: { 
      primary: '#ff00ff', 
      glow: 'rgba(255, 0, 255, 0.6)',
      shadow: '0 0 30px rgba(255, 0, 255, 0.4)'
    },
    sigma: { 
      primary: '#ffaa00', 
      glow: 'rgba(255, 170, 0, 0.6)',
      shadow: '0 0 30px rgba(255, 170, 0, 0.4)'
    },
    dynamic: { 
      primary: '#ffaa00', 
      glow: 'rgba(255, 170, 0, 0.6)',
      shadow: '0 0 30px rgba(255, 170, 0, 0.4)'
    },
    flow: { 
      primary: '#ff3366', 
      glow: 'rgba(255, 51, 102, 0.6)',
      shadow: '0 0 30px rgba(255, 51, 102, 0.4)'
    },
    human: { 
      primary: '#ff3366', 
      glow: 'rgba(255, 51, 102, 0.6)',
      shadow: '0 0 30px rgba(255, 51, 102, 0.4)'
    },
    backend: { 
      primary: '#00ccff', 
      glow: 'rgba(0, 204, 255, 0.6)',
      shadow: '0 0 30px rgba(0, 204, 255, 0.4)'
    },
    system: { 
      primary: '#00ccff', 
      glow: 'rgba(0, 204, 255, 0.6)',
      shadow: '0 0 30px rgba(0, 204, 255, 0.4)'
    },
    frontend: { 
      primary: '#8a2be2', 
      glow: 'rgba(138, 43, 226, 0.6)',
      shadow: '0 0 30px rgba(138, 43, 226, 0.4)'
    },
    economics: { 
      primary: '#ffd700', 
      glow: 'rgba(255, 215, 0, 0.6)',
      shadow: '0 0 30px rgba(255, 215, 0, 0.4)'
    },
    review: { 
      primary: '#ff6600', 
      glow: 'rgba(255, 102, 0, 0.6)',
      shadow: '0 0 30px rgba(255, 102, 0, 0.4)'
    },
  };
  
  // Find matching color
  for (const [key, color] of Object.entries(colorMap)) {
    if (name.includes(key)) {
      return color;
    }
  }
  
  // Default cyan
  return { 
    primary: '#00ffff', 
    glow: 'rgba(0, 255, 255, 0.6)',
    shadow: '0 0 30px rgba(0, 255, 255, 0.4)'
  };
}

// ═══════════════════════════════════════════════════════════════
// GET TOOLTIP DATA FOR SPECIFIC FORMAT 🌊
// ═══════════════════════════════════════════════════════════════

export async function getTooltipData(formatName: string): Promise<TooltipData | null> {
  try {
    // Get complete profile binding details
    const stroemeRes = await fetch(`${BASE_URL}/mapping/formats/${formatName}/stroeme-profil-fuer-format`);
    
    if (!stroemeRes.ok) {
      console.error(`Failed to fetch data for format: ${formatName}`);
      return null;
    }

    const stroemeData = await stroemeRes.json();

    if (!stroemeData.erfolg) {
      console.error('Stroeme data not successful');
      return null;
    }

    // Get format details from formats list
    const formatsRes = await fetch(`${BASE_URL}/resonanz/formats`);
    const formatsData = await formatsRes.json();
    const formatInfo = formatsData.formats?.find((f: FormatDetails) => f.name === formatName);

    // Build complete tooltip data
    const binding = stroemeData.binding as ProfileBinding;
    
    const tooltipData: TooltipData = {
      formatName: stroemeData.format_name || formatName,
      formatDescription: formatInfo?.description || 'SYNTX Format',
      formatFieldsCount: formatInfo?.fields_count || 0,
      formatLanguages: formatInfo?.languages || ['de', 'en'],
      
      profileId: binding?.profile_id || 'unknown',
      profileName: binding?.profile_details?.name || 'Unknown Profile',
      profileDescription: binding?.profile_details?.description,
      profileStrategy: binding?.profile_details?.strategy || 'unknown',
      profileComponents: binding?.profile_details?.components || {},
      profileChangelog: binding?.profile_details?.changelog || [],
      
      mistralWrapper: binding?.mistral_wrapper || '',
      gptWrapper: binding?.gpt_wrapper || '',
      driftScoring: binding?.drift_scoring || { enabled: false, threshold: 0.8 },
      resonanzScore: binding?.resonanz_score || 0,
      
      formatColor: getFormatColor(formatName),
    };

    return tooltipData;
  } catch (error) {
    console.error('Error fetching tooltip data:', error);
    return null;
  }
}
