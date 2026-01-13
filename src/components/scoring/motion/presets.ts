// 💎⚡ SYNTX SCORING ORGAN - MOTION PRESETS

export const TIME = {
  micro: 0.18,
  short: 0.35,
  base: 0.6,
  long: 1.1
};

export const EASE = {
  enter: [0.16, 1, 0.3, 1],
  float: [0.45, 0, 0.55, 1],
  snap: [0.2, 0.8, 0.2, 1],
  drift: [0.33, 0, 0.67, 1]
};

// PLANET
export const planet = {
  initial: { scale: 0.92, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: TIME.base, ease: EASE.enter as any }
  }
};

export const pulse = (intensity: number) => ({
  animate: {
    scale: [1, 1 + 0.015 * intensity, 1],
    transition: {
      duration: 1.6 - intensity * 0.4,
      repeat: Infinity,
      ease: EASE.float as any
    }
  }
});

// RINGE
export const ringStable = (coherence: number) => ({
  animate: {
    rotate: 360,
    opacity: 0.8,
    transition: {
      duration: 18 - coherence * 6,
      repeat: Infinity,
      ease: "linear"
    }
  }
});

export const ringTexture = (density: number) => ({
  animate: {
    rotate: -360,
    filter: `blur(${density * 0.8}px)`,
    transition: {
      duration: 22,
      repeat: Infinity,
      ease: "linear"
    }
  }
});

export const ringPulse = (score: number) => ({
  animate: {
    boxShadow: [
      "0 0 8px rgba(0,255,255,0.2)",
      `0 0 ${18 + score * 12}px rgba(0,255,255,0.8)`,
      "0 0 8px rgba(0,255,255,0.2)"
    ],
    transition: {
      duration: 1.2 - score * 0.4,
      repeat: Infinity,
      ease: EASE.snap as any
    }
  }
});

export const ringIntegrity = (sum: number) => ({
  animate: {
    rotate: sum === 1 ? 0 : [0, 1.5, -1.5, 0],
    transition: { duration: 0.6 }
  }
});

// FELDLINIEN
export const flowLine = (strength: number) => ({
  animate: {
    opacity: [0.2, 0.6, 0.2],
    strokeDashoffset: [0, -40],
    transition: {
      duration: 2.4 - strength,
      repeat: Infinity,
      ease: "linear"
    }
  }
});

export const attraction = {
  whileHover: {
    scale: 1.02,
    transition: { duration: TIME.micro }
  }
};

// PARTIKEL
export const particleFlow = {
  initial: { opacity: 0, y: 0 },
  animate: {
    opacity: [0, 1, 0],
    y: -120,
    transition: { duration: TIME.short, ease: EASE.drift as any }
  }
};

export const glitch = {
  animate: {
    x: [0, -2, 2, 0],
    opacity: [1, 0.6, 1],
    transition: { duration: 0.18 }
  }
};

// SCORE REAKTION
export const colorByScore = (s: number) =>
  s > 0.7 ? "#00ff88" : s > 0.4 ? "#ffcc00" : "#ff3355";

export const luminance = (r: number) => ({
  animate: {
    filter: `brightness(${1 + r * 0.6})`,
    transition: { duration: TIME.short }
  }
});

// OVERLAYS
export const projection = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: TIME.short, ease: EASE.enter as any }
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: TIME.micro }
  }
};

// STABILISIERUNG
export const stabilize = {
  animate: {
    scale: [1.02, 1],
    filter: ["brightness(1.4)", "brightness(1)"],
    transition: { duration: TIME.short }
  }
};

// LERP HELPER
export const lerp = (prev: number, next: number, factor: number) =>
  prev + (next - prev) * factor;
