// 💎 SYNTX: STRÖME STATT MATHEMATIK
// Keine Formeln. Nur Fluss.

export const RING_COLORS = [
  { color: '#00d4ff', glow: 'rgba(0,212,255,0.6)', name: 'cyan' },
  { color: '#9d00ff', glow: 'rgba(157,0,255,0.6)', name: 'purple' },
  { color: '#00ff88', glow: 'rgba(0,255,136,0.6)', name: 'green' },
  { color: '#ffcc00', glow: 'rgba(255,204,0,0.6)', name: 'yellow' },
  { color: '#ff6b00', glow: 'rgba(255,107,0,0.6)', name: 'orange' },
  { color: '#ff0066', glow: 'rgba(255,0,102,0.6)', name: 'pink' },
];

// 🌍 PLANET KERN
export const PLANET_RADIUS = 90;

// 🌊 STROM-ANORDNUNG
// Jeder Component ist ein Strom
// Weight = Energie im Strom
// Ring = Sichtbare Manifestation
// Position = Wo Energie den Ring hinträgt

export const stromPosition = (weight: number, componentIndex: number): number => {
  // PLANET ist Zentrum (Radius 90)
  // Erster Ring startet bei 200
  // Jeder weitere Ring: +100 Base
  // Weight drückt Ring nach außen
  
  const startRadius = 200;
  const ringAbstand = 100;
  const weightDruck = weight * 200; // 0.0 = 0px, 1.0 = 200px
  
  return startRadius + (componentIndex * ringAbstand) + weightDruck;
};

export const zwischenraumGrenzen = (
  componentIndex: number,
  alleComponents: [string, any][]
): { innen: number; aussen: number } => {
  
  if (componentIndex === 0) {
    // Erster Zwischenraum: Planet bis Ring 1
    const ring1Position = stromPosition(
      alleComponents[0][1].weight,
      0
    );
    
    return {
      innen: PLANET_RADIUS,
      aussen: ring1Position
    };
  }
  
  // Andere Zwischenräume: Ring N-1 bis Ring N
  const vorherigerRing = stromPosition(
    alleComponents[componentIndex - 1][1].weight,
    componentIndex - 1
  );
  
  const aktuellerRing = stromPosition(
    alleComponents[componentIndex][1].weight,
    componentIndex
  );
  
  return {
    innen: vorherigerRing,
    aussen: aktuellerRing
  };
};
