export const RING_COLORS = [
  { color: '#00d4ff', glow: 'rgba(0,212,255,0.6)', name: 'cyan' },
  { color: '#9d00ff', glow: 'rgba(157,0,255,0.6)', name: 'purple' },
  { color: '#00ff88', glow: 'rgba(0,255,136,0.6)', name: 'green' },
  { color: '#ffcc00', glow: 'rgba(255,204,0,0.6)', name: 'yellow' },
  { color: '#ff6b00', glow: 'rgba(255,107,0,0.6)', name: 'orange' },
  { color: '#ff0066', glow: 'rgba(255,0,102,0.6)', name: 'pink' },
];

// RING RADIUS = FUNKTION VON WEIGHT!
// Mehr Weight = Größerer Ring = Weiter vom Planeten
export const calculateRingRadius = (weight: number, index: number, totalComponents: number): number => {
  const baseRadius = 180;
  const weightMultiplier = 250;
  const indexOffset = index * 60;
  
  return baseRadius + indexOffset + (weight * weightMultiplier);
};

// CLICK ZONE MIT WEIGHT-BASIERTEN RADII
export const calculateClickZone = (
  index: number, 
  components: [string, any][]
) => {
  const componentWeights = components.map(([_, c]) => c.weight);
  
  if (index === 0) {
    const ring1Radius = calculateRingRadius(componentWeights[0], 0, components.length);
    return {
      innerRadius: 90,
      outerRadius: ring1Radius,
    };
  } else {
    const prevRingRadius = calculateRingRadius(componentWeights[index - 1], index - 1, components.length);
    const currentRingRadius = calculateRingRadius(componentWeights[index], index, components.length);
    return {
      innerRadius: prevRingRadius,
      outerRadius: currentRingRadius,
    };
  }
};
