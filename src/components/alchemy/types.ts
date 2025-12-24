// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🔮 SYNTX ALCHEMY - FELD-STRUKTUREN                                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export interface Style {
  name: string;
  vibe: string;
  description?: string;
  word_alchemy_count: number;
  forbidden_words: string[];
  has_suffix: boolean;
  has_tone_injection: boolean;
  word_alchemy?: Record<string, string>;
}

export interface AlchemyResult {
  original: string;
  transformed: string;
  style: string;
  transformations: Array<{
    original: string;
    replacement: string;
    start_pos: number;
    end_pos: number;
    type: string;
  }>;
  stats: {
    total_transformations: number;
    alchemy_count: number;
    forbidden_count: number;
  };
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}
