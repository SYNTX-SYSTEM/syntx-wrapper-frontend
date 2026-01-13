// 💎⚡ SYNTX SCORING ORGAN - TYPES

export type FieldState = {
  focus: "idle" | "scoring";
  activeProfileId: string | null;
  energy: number;
  coherence: number;
  instability: number;
  bindings: Record<string, number>;
};

export type ScoringProfile = {
  id: string;
  name: string;
  label: string;
  strategy: string;
  weight: number;
  strategies: {
    pattern_match: number;
    keyword_density: number;
    gpt_score: number;
  };
};

export type ScoringResult = {
  scores: Record<string, {
    score: number;
    components: Record<string, number>;
    masking: boolean;
    reason: string;
    phrases: string[];
  }>;
  summary: {
    resonance_score: number;
    dominant_drift_types: string[];
    high_resonance_fields: string[];
  };
};
