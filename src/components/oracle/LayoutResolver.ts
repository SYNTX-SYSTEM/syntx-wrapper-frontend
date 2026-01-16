// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ LAYOUT RESOLVER - FORCE-DIRECTED GRAPH LAYOUT                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { ResonanzNode, StromEdge } from './types';
import { PHYSICS } from './constants';

export class LayoutResolver {
  private nodes: ResonanzNode[];
  private edges: StromEdge[];
  private centerX: number;
  private centerY: number;

  constructor(nodes: ResonanzNode[], edges: StromEdge[], width: number, height: number) {
    this.nodes = nodes;
    this.edges = edges;
    this.centerX = width / 2;
    this.centerY = height / 2;
  }

  // Initialize random positions
  initializePositions(): ResonanzNode[] {
    return this.nodes.map(node => {
      if (node.fixed) return node;
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 200;
      
      return {
        ...node,
        position: {
          x: this.centerX + Math.cos(angle) * radius,
          y: this.centerY + Math.sin(angle) * radius,
        },
      };
    });
  }

  // Apply force-directed layout (single iteration)
  applyForces(nodes: ResonanzNode[]): ResonanzNode[] {
    const forces = nodes.map(() => ({ x: 0, y: 0 }));

    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].fixed) continue;

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].position.x - nodes[i].position.x;
        const dy = nodes[j].position.y - nodes[i].position.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < 1) continue;

        const force = PHYSICS.repulsion / distSq;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        forces[i].x -= fx;
        forces[i].y -= fy;
        if (!nodes[j].fixed) {
          forces[j].x += fx;
          forces[j].y += fy;
        }
      }
    }

    // Attraction along edges
    this.edges.forEach(edge => {
      const fromIdx = nodes.findIndex(n => n.id === edge.from);
      const toIdx = nodes.findIndex(n => n.id === edge.to);
      
      if (fromIdx === -1 || toIdx === -1) return;
      if (nodes[fromIdx].fixed && nodes[toIdx].fixed) return;

      const dx = nodes[toIdx].position.x - nodes[fromIdx].position.x;
      const dy = nodes[toIdx].position.y - nodes[fromIdx].position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const force = dist * PHYSICS.attraction;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;

      if (!nodes[fromIdx].fixed) {
        forces[fromIdx].x += fx;
        forces[fromIdx].y += fy;
      }
      if (!nodes[toIdx].fixed) {
        forces[toIdx].x -= fx;
        forces[toIdx].y -= fy;
      }
    });

    // Center gravity
    nodes.forEach((node, i) => {
      if (node.fixed) return;

      const dx = this.centerX - node.position.x;
      const dy = this.centerY - node.position.y;
      
      forces[i].x += dx * PHYSICS.centerGravity;
      forces[i].y += dy * PHYSICS.centerGravity;
    });

    // Apply forces with damping
    return nodes.map((node, i) => {
      if (node.fixed) return node;

      return {
        ...node,
        position: {
          x: node.position.x + forces[i].x * PHYSICS.damping,
          y: node.position.y + forces[i].y * PHYSICS.damping,
        },
      };
    });
  }

  // Run layout algorithm (multiple iterations)
  compute(iterations = 50): ResonanzNode[] {
    let nodes = this.initializePositions();

    for (let i = 0; i < iterations; i++) {
      nodes = this.applyForces(nodes);
    }

    return nodes;
  }
}
