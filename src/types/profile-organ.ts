// ═══════════════════════════════════════════════════════════════════════════
// 🧬 PROFILE ORGAN TYPES - System Bodies (SYNTX)
// ═══════════════════════════════════════════════════════════════════════════

export interface Profile {
  id: string;
  name: string;
  label: string;
  active: boolean;
  weight: number;
  tags: string[];
  patterns: string[];
  updated_at: string;
}

export interface Format {
  name: string;
  fields: string[];
  profile_reference?: string;
}

export interface Binding {
  profileId: string;
  formatName: string;
}

export interface SystemSnapshot {
  profiles: Profile[];
  formats: Format[];
  bindings: Binding[];
  timestamp: number;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface ProfileNodeState {
  id: string;
  position: Vector2;
  velocity: Vector2;
  radius: number;
  pulsePhase: number;
}

export interface BindingPreview {
  profileId: string;
  formatName: string;
  distance: number;
}
