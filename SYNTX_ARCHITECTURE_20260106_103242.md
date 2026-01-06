# 💎 SYNTX FRONTEND ARCHITECTURE EXPORT
Generated: $(date)
Project: syntx-wrapper-frontend

---

## 🔥 PACKAGE CONFIGURATION

### package.json
```json
{
  "name": "syntx-wrapper-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "framer-motion": "^12.23.26",
    "lucide-react": "^0.562.0",
    "next": "16.0.10",
    "react": "19.2.1",
    "react-dom": "19.2.1",
    "recharts": "^3.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20.19.27",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.10",
    "tailwindcss": "^4",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  }
}
```

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

---

## ⚡ SOURCE FILES

### 📄 src/app/api/auth/login/route.ts
```typescript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  const validUser = process.env.AUTH_USER || 'syntx';
  const validPass = process.env.AUTH_PASS || 'resonance2025';

  if (username === validUser && password === validPass) {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    const response = NextResponse.json({ success: true });
    response.cookies.set('syntx-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
```

### 📄 src/app/api/auth/logout/route.ts
```typescript
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('syntx-auth');
  return response;
}
```

### 📄 src/app/api/scoring/autonomous/route.ts
```typescript
import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dev.syntx-system.com/resonanz';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || 'suggestions';
  
  try {
    const response = await fetch(`${API_BASE}/scoring/autonomous/${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'analyze';
  const days = searchParams.get('days') || '7';
  const threshold = searchParams.get('score_threshold') || '0.5';
  const minOccurrences = searchParams.get('min_occurrences') || '2';
  
  try {
    let url = `${API_BASE}/scoring/autonomous/${action}`;
    if (action === 'analyze') {
      url += `?days=${days}&score_threshold=${threshold}&min_occurrences=${minOccurrences}`;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to perform action' }, { status: 500 });
  }
}
```

### 📄 src/app/layout.tsx
```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNTX - Field Resonance System",
  description: "SYNTX Wrapper Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body style={{ margin: 0, padding: 0 }}>
        {/* Cyber Grid Background */}
        <div className="cyber-bg" />
        
        {/* Floating Orbs */}
        <div style={{
          position: 'fixed',
          top: '10%',
          right: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulse 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed',
          bottom: '15%',
          left: '10%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulse 10s ease-in-out infinite',
          animationDelay: '2s',
        }} />
        <div style={{
          position: 'fixed',
          top: '60%',
          right: '20%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulse 12s ease-in-out infinite',
          animationDelay: '4s',
        }} />
        
        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
```

### 📄 src/app/login/page.tsx
```typescript
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Neural Network Canvas Background
function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; connections: number[] }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 11, 21, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw connections
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.5;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #030b15 0%, #0a1628 50%, #030b15 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Neural Network Background */}
      <NeuralNetwork />

      {/* Gradient Overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 0%, #030b15 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 40 }}>
        {/* Logo */}
        <div style={{
          width: 100, height: 100,
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.3)',
          border: '2px solid rgba(0,212,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}>
          <img src="/logo.png" alt="SYNTX" width={70} height={70} style={{ objectFit: 'contain' }} />
        </div>
        <div style={{
          fontSize: 14,
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: 6,
          marginBottom: 60,
        }}>
          SYNTX
        </div>

        {/* Main Title */}
        <h1 style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 'clamp(48px, 8vw, 80px)',
          fontWeight: 800,
          letterSpacing: -2,
          color: 'white',
          textShadow: '0 0 60px rgba(255,255,255,0.3)',
        }}>
          SYNTX
        </h1>

        {/* Taglines */}
        <h2 style={{
          margin: '30px 0 0',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          color: 'white',
        }}>
          SYNTX isn't AI.
        </h2>
        <p style={{
          margin: '16px 0 0',
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: '#00d4ff',
          fontFamily: 'system-ui, sans-serif',
        }}>
          It's the resonance that governs it
        </p>
      </div>

      {/* Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: 380,
        background: 'rgba(6,13,24,0.8)',
        borderRadius: 20,
        border: '1px solid rgba(0,212,255,0.2)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
      }}>
        {/* Top Glow */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
        }} />

        <div style={{ padding: '32px' }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block',
                fontSize: 10,
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
                letterSpacing: 2,
              }}>
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: '1px solid rgba(0,212,255,0.3)',
                  background: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontSize: 10,
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
                letterSpacing: 2,
              }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: '1px solid rgba(0,212,255,0.3)',
                  background: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                marginBottom: 16,
                borderRadius: 10,
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444',
                fontSize: 12,
                fontFamily: 'monospace',
                textAlign: 'center',
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: 10,
                border: 'none',
                background: loading || !username || !password
                  ? 'rgba(255,255,255,0.1)'
                  : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
                color: loading || !username || !password ? 'rgba(255,255,255,0.3)' : '#030b15',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'monospace',
                letterSpacing: 2,
                cursor: loading || !username || !password ? 'not-allowed' : 'pointer',
                boxShadow: loading || !username || !password ? 'none' : '0 0 30px rgba(0,212,255,0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? '⏳ AUTHENTICATING...' : '→ ENTER FIELD'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        marginTop: 40,
        fontSize: 11,
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'monospace',
      }}>
        © 2025 SYNTX SYSTEM
      </div>
    </div>
  );
}
```

### 📄 src/app/page.tsx
```typescript
"use client";
import ProfilesLayout from "@/components/profiles/ProfilesLayout";
import { useState, useEffect } from "react";
import Image from "next/image";
import { WrapperPanel as WrapperControl } from "@/components/wrappers";
import CreateWrapperModal from "@/components/wrappers/CreateWrapperModal";
import StatsPanel from "@/components/analytics/StatsPanel";
import FlowPanel from "@/components/flow/FlowPanel";
import AlchemyPanel from "@/components/alchemy/AlchemyPanel";
import DiffPanel from "@/components/diff/DiffPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import GraphsPanel from "@/components/graphs/GraphsPanel";
import SystemPanel from "@/components/system/SystemPanel";
import DataPanel from "@/components/data/DataPanel";
import FormatPanel from "@/components/formats/FormatPanel";
import { OptimizerPanel } from "@/components/optimizer";
import LiveBadge from "@/components/ui/LiveBadge";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { useRealtime, useRealtimeHealth } from "@/hooks/useRealtime";
import { api } from "@/lib/api";

type TabId = "data" | "system" | "chat" | "graphs" | "wrappers" | "formats" | "analytics" | "flow" | "alchemy" | "diff" | "optimizer" | "profiles";

const TABS = [
  { id: "data", label: "DATA", icon: "📊", color: "#8b5cf6" },
  { id: "system", label: "SYSTEM", icon: "🖥️", color: "#10b981" },
  { id: "chat", label: "CHAT", icon: "💬", color: "#00d4ff" },
  { id: "graphs", label: "GRAPHS", icon: "📈", color: "#d946ef" },
  { id: "wrappers", label: "WRAPPERS", icon: "📦", color: "#f59e0b" },
  { id: "formats", label: "FORMATS", icon: "📋", color: "#14b8a6" },
  { id: "analytics", label: "ANALYTICS", icon: "📊", color: "#00d4ff" },
  { id: "flow", label: "FLOW", icon: "🌊", color: "#10b981" },
  { id: "alchemy", label: "ALCHEMY", icon: "⚗️", color: "#d946ef" },
  { id: "diff", label: "DIFF", icon: "🔀", color: "#8b5cf6" },
  { id: "optimizer", label: "OPTIMIZER", icon: "🤖", color: "#00d4ff" },
  { id: "profiles", label: "PROFILES", icon: "👤", color: "#8b5cf6" },
] as const;

function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textIndex < 3) setTextIndex(textIndex + 1);
    }, 800);
    return () => clearTimeout(timer);
  }, [textIndex]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      background: "linear-gradient(180deg, #030b15 0%, #0a1628 50%, #030b15 100%)",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "absolute",
        top: "20%",
        left: "30%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s ease",
      }}>
        <div style={{ marginBottom: 40 }}>
          <img src="/logo.png" alt="SYNTX" width={120} height={120} style={{ filter: "drop-shadow(0 0 30px rgba(0,212,255,0.5))" }} />
        </div>

        <h1 style={{
          fontSize: 72,
          fontWeight: 900,
          margin: 0,
          marginBottom: 32,
          letterSpacing: 12,
          background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #d946ef 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: textIndex >= 1 ? 1 : 0,
          transition: "all 0.8s ease",
        }}>
          SYNTX
        </h1>

        <p style={{
          fontSize: 32,
          fontWeight: 700,
          margin: 0,
          marginBottom: 16,
          color: "white",
          opacity: textIndex >= 2 ? 1 : 0,
          transition: "all 0.8s ease",
        }}>
          SYNTX isn't AI.
        </p>

        <p style={{
          fontSize: 24,
          margin: 0,
          marginBottom: 60,
          fontStyle: "italic",
          background: "linear-gradient(90deg, #00d4ff, #10b981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: textIndex >= 3 ? 1 : 0,
          transition: "all 0.8s ease",
        }}>
          It's the resonance that governs it
        </p>

        <button
          onClick={onEnter}
          style={{
            padding: "16px 48px",
            fontSize: 14,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: 4,
            color: "#030b15",
            background: "linear-gradient(135deg, #00d4ff, #00a8cc)",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(0,212,255,0.5)",
            opacity: textIndex >= 3 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
          ENTER SYSTEM
        </button>
      </div>

      <div style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        fontSize: 10,
        fontFamily: "monospace",
        color: "rgba(255,255,255,0.2)",
      }}>
        v1.0.0 // FIELD RESONANCE SYSTEM
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("system");
  const [modalOpen, setModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHero, setShowHero] = useState(false);
  
  const { isLive, pulse, lastUpdate, newEventCount, hasNewData } = useRealtime(5000);
  const { isOnline } = useRealtimeHealth(10000);

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

  const handleCreateWrapper = async (data: { name: string; level: string; content: string }) => {
    try {
      // Neuer CRUD-Weg: createWrapper statt File-Upload
      await api.createWrapper({ name: data.name, content: data.content, description: data.level });
      // 🌟 Feld geboren!
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  if (showHero) {
    return <HeroSection onEnter={() => setShowHero(false)} />;
  }

  return (
    <main style={{ minHeight: "100vh", padding: 32, fontFamily: "system-ui", color: "white" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div onClick={() => setShowHero(true)} style={{ cursor: "pointer", width: 50, height: 50, borderRadius: 12, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/logo.png" alt="SYNTX" width={35} height={35} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SYNTX</h1>
            <p style={{ opacity: 0.4, margin: 0, fontSize: 10, fontFamily: "monospace", fontStyle: "italic" }}>The resonance that governs AI</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LiveBadge 
            isLive={isLive && isOnline} 
            pulse={pulse} 
            lastUpdate={lastUpdate} 
            newCount={hasNewData ? newEventCount : 0} 
          />
          {activeTab === "wrappers" && (
            <button onClick={() => setModalOpen(true)} style={{ padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg, #00d4ff, #00a8cc)", color: "#030b15", fontWeight: 700, fontFamily: "monospace", border: "none", cursor: "pointer", boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}>+ NEU</button>
          )}
        </div>
      </header>

      <nav style={{ display: "flex", gap: 6, marginBottom: 24, padding: 6, background: "rgba(0,0,0,0.3)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as TabId)}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: activeTab === tab.id ? `linear-gradient(135deg, ${tab.color}20, ${tab.color}10)` : "transparent",
              color: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              position: "relative",
              boxShadow: activeTab === tab.id ? `0 0 20px ${tab.color}30` : "none",
            }}
          >
            {activeTab === tab.id && <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, background: tab.color, borderRadius: 2 }} />}
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <section style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(10px)" : "translateY(0)", transition: "all 0.15s ease" }}>
        {activeTab === "data" && <DataPanel />}
        {activeTab === "system" && <SystemPanel />}
        {activeTab === "chat" && <ChatPanel />}
        {activeTab === "graphs" && <GraphsPanel />}
        {activeTab === "wrappers" && <WrapperControl />}
        {activeTab === "formats" && <FormatPanel />}
        {activeTab === "analytics" && <StatsPanel />}
        {activeTab === "flow" && <FlowPanel />}
        {activeTab === "alchemy" && <AlchemyPanel />}
        {activeTab === "diff" && <DiffPanel />}
        {activeTab === "optimizer" && <OptimizerPanel />}
        {activeTab === "profiles" && <ProfilesLayout />}
      </section>

      <CreateWrapperModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateWrapper} />
    </main>
  );
}

export default function Page() {
  const [showHero, setShowHero] = useState(true);

  if (showHero) {
    return <HeroSection onEnter={() => setShowHero(false)} />;
  }

  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}
```

### 📄 src/app/profiles/page.tsx
```typescript
import ProfilesLayout from '@/components/profiles/ProfilesLayout';

export default function ProfilesPage() {
  return <ProfilesLayout />;
}
```

### 📄 src/components/alchemy/AlchemyPanel.tsx
```typescript
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { COLORS, STYLE_COLORS, STYLE_ICONS } from './constants';
import { KEYFRAMES } from './animations';
import type { Style, AlchemyResult, Particle } from './types';
import { StyleCard } from './cards';
import { GrimoireModal, StyleEditorModal, DeleteModal } from './modals';

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ⚗️ ALCHEMY LAB - DAS GRIMOIRE DER WORT-TRANSMUTATION                   ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export default function AlchemyPanel() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('berlin_slang');
  const [inputText, setInputText] = useState('Das ist ein krass geiler Test für die Wort-Transmutation!');
  const [result, setResult] = useState<AlchemyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [transforming, setTransforming] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const [showStyleEditor, setShowStyleEditor] = useState(false);
  const [editingStyle, setEditingStyle] = useState<Style | null>(null);
  const [isNewStyle, setIsNewStyle] = useState(false);
  const [showGrimoire, setShowGrimoire] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [styleToDelete, setStyleToDelete] = useState('');

  const loadStyles = useCallback(() => {
    api.getStyles().then((data: any) => { setStyles(data.styles || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { loadStyles(); }, [loadStyles]);

  const handleTransform = async () => {
    if (!inputText.trim() || !selectedStyle) return;
    setTransforming(true); setIsShaking(true); setGlowIntensity(100);
    const currentColor = STYLE_COLORS[selectedStyle] || COLORS.purple;
    setParticles(Array.from({length: 30}, (_, i) => ({ id: Date.now() + i, x: 50 + (Math.random() - 0.5) * 20, y: 50 + (Math.random() - 0.5) * 20, color: i % 2 === 0 ? currentColor : COLORS.gold, size: 4 + Math.random() * 8, velocity: { x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 } })));
    setTimeout(() => setIsShaking(false), 600);
    setTimeout(() => setGlowIntensity(0), 1200);
    setTimeout(() => setParticles([]), 2000);
    try {
      const data = await api.alchemyPreview({ text: inputText, style: selectedStyle });
      setShowResult(false);
      setTimeout(() => { setResult(data as unknown as AlchemyResult); setShowResult(true); }, 400);
    } catch (e) { console.error(e); }
    finally { setTransforming(false); }
  };

  const currentColor = STYLE_COLORS[selectedStyle] || COLORS.purple;
  const currentStyle = styles.find(s => s.name === selectedStyle);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 120, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 80, animation: 'spin 2s linear infinite', filter: `drop-shadow(0 0 30px ${COLORS.magenta})` }}>⚗️</div>
      <div style={{ fontFamily: 'monospace', fontSize: 20, color: COLORS.magenta, marginTop: 28, letterSpacing: 4, animation: 'pulse 1.5s ease-in-out infinite' }}>ÖFFNE DAS GRIMOIRE...</div>
      <style>{KEYFRAMES}</style>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      {particles.length > 0 && <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>{particles.map(p => <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: p.color, boxShadow: `0 0 ${p.size * 2}px ${p.color}`, animation: 'particleFly 1.5s ease-out forwards', '--tx': `${p.velocity.x * 20}px`, '--ty': `${p.velocity.y * 20}px` } as React.CSSProperties} />)}</div>}

      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 300, background: `radial-gradient(circle, ${COLORS.magenta}20, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 24, marginBottom: 16, position: 'relative' }}>
          <div style={{ width: 90, height: 90, borderRadius: 28, background: `linear-gradient(135deg, ${COLORS.magenta}50, ${COLORS.gold}30)`, border: `3px solid ${COLORS.magenta}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, boxShadow: `0 0 80px ${COLORS.magenta}50, inset 0 0 30px ${COLORS.magenta}30`, animation: 'iconFloat 3s ease-in-out infinite' }}>⚗️</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 48, fontWeight: 900, letterSpacing: 10, background: `linear-gradient(135deg, ${COLORS.magenta}, ${COLORS.gold}, ${COLORS.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 0 30px ${COLORS.magenta}50)` }}>ALCHEMY LAB</h2>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: 4, marginTop: 4 }}>DAS GRIMOIRE DER WORT-TRANSMUTATION</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.gold, letterSpacing: 3, display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 18 }}>🎨</span> STYLES ({styles.length})</div>
        <button onClick={() => { setEditingStyle(null); setIsNewStyle(true); setShowStyleEditor(true); }} style={{ padding: '12px 24px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.green}30, ${COLORS.green}10)`, border: `2px solid ${COLORS.green}`, color: COLORS.green, fontFamily: 'monospace', fontSize: 13, fontWeight: 800, letterSpacing: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 0 30px ${COLORS.green}20` }}><span>✨</span> NEUER STYLE</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 40 }}>
        {styles.map((style, idx) => <div key={style.name} style={{ animation: `slideInUp 0.4s ease ${idx * 0.1}s both` }}><StyleCard style={style} isSelected={selectedStyle === style.name} onSelect={() => setSelectedStyle(style.name)} onEdit={() => { setEditingStyle(style); setIsNewStyle(false); setShowStyleEditor(true); }} onGrimoire={() => { setEditingStyle(style); setShowGrimoire(true); }} onDelete={() => { setStyleToDelete(style.name); setShowDeleteModal(true); }} /></div>)}
      </div>

      <div style={{ padding: 32, borderRadius: 24, background: `linear-gradient(135deg, ${COLORS.dark}f0, ${COLORS.darker}f8)`, border: `2px solid ${currentColor}40`, boxShadow: glowIntensity > 0 ? `0 0 ${80 + glowIntensity}px ${currentColor}60, inset 0 0 60px ${currentColor}10` : `0 0 50px ${currentColor}25`, transition: 'box-shadow 0.4s ease', animation: isShaking ? 'shake 0.6s ease' : 'none', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 20% 80%, ${currentColor}10, transparent 50%), radial-gradient(circle at 80% 20%, ${COLORS.gold}10, transparent 50%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 15, fontFamily: 'monospace', color: currentColor, marginBottom: 20, letterSpacing: 3, display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontSize: 20 }}>🧪</span>TRANSMUTATION ZONE{currentStyle && <span style={{ padding: '6px 14px', background: `${currentColor}20`, border: `1px solid ${currentColor}50`, borderRadius: 20, fontSize: 12 }}>{STYLE_ICONS[selectedStyle] || '⚗️'} {selectedStyle.toUpperCase().replace(/_/g, ' ')}</span>}</div>
          <textarea value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Gib deinen Text ein..." style={{ width: '100%', minHeight: 120, padding: 20, borderRadius: 16, border: `1px solid ${currentColor}30`, background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'monospace', fontSize: 15, lineHeight: 1.7, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
          <button onClick={handleTransform} disabled={transforming || !inputText.trim()} style={{ width: '100%', marginTop: 20, padding: 20, borderRadius: 16, border: `2px solid ${currentColor}`, background: `linear-gradient(135deg, ${currentColor}40, ${currentColor}15)`, color: currentColor, fontFamily: 'monospace', fontSize: 18, fontWeight: 900, letterSpacing: 4, cursor: transforming ? 'wait' : 'pointer', boxShadow: `0 0 40px ${currentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>{transforming ? <><span style={{ animation: 'spin 1s linear infinite' }}>⚗️</span>TRANSMUTIERE...</> : <><span>⚗️</span>TRANSMUTIEREN</>}</button>

          {result && showResult && (
            <div style={{ marginTop: 28, padding: 24, borderRadius: 18, background: `linear-gradient(135deg, ${currentColor}15, ${currentColor}05)`, border: `1px solid ${currentColor}40`, animation: 'slideInUp 0.5s ease' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontFamily: 'monospace', letterSpacing: 2 }}>TRANSMUTATION COMPLETE:</div>
              <div style={{ fontSize: 16, color: 'white', fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap', padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>{result.transformed}</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                <div style={{ padding: '12px 20px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.gold}20, ${COLORS.gold}08)`, border: `1px solid ${COLORS.gold}50` }}><div style={{ fontSize: 24, color: COLORS.gold, fontWeight: 900 }}>{result.stats?.alchemy_count || 0}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Transmutationen</div></div>
                <div style={{ padding: '12px 20px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.cyan}20, ${COLORS.cyan}08)`, border: `1px solid ${COLORS.cyan}50` }}><div style={{ fontSize: 24, color: COLORS.cyan, fontWeight: 900 }}>{result.original.length} → {result.transformed.length}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Zeichen</div></div>
                {(result.stats?.forbidden_count || 0) > 0 && <div style={{ padding: '12px 20px', borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}08)`, border: `1px solid ${COLORS.red}50` }}><div style={{ fontSize: 24, color: COLORS.red, fontWeight: 900 }}>{result.stats?.forbidden_count}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Entfernt</div></div>}
              </div>
              {result.transformations?.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontFamily: 'monospace', letterSpacing: 2 }}>TRANSFORMATIONEN:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.transformations.map((t, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: 'monospace', padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 8, animation: `slideInLeft 0.3s ease ${i * 0.05}s both` }}><span style={{ color: COLORS.red, textDecoration: 'line-through' }}>{t.original}</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>→</span><span style={{ color: COLORS.green }}>{t.replacement}</span><span style={{ marginLeft: 'auto', padding: '3px 8px', borderRadius: 6, background: t.type === 'forbidden' ? `${COLORS.red}25` : `${COLORS.gold}25`, color: t.type === 'forbidden' ? COLORS.red : COLORS.gold, fontSize: 10, fontWeight: 700 }}>{t.type.toUpperCase()}</span></div>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showStyleEditor && <StyleEditorModal style={editingStyle} isNew={isNewStyle} onClose={() => setShowStyleEditor(false)} onSave={loadStyles} />}
      {showGrimoire && editingStyle && <GrimoireModal style={editingStyle} onClose={() => setShowGrimoire(false)} onSave={loadStyles} />}
      {showDeleteModal && <DeleteModal styleName={styleToDelete} onClose={() => setShowDeleteModal(false)} onConfirm={() => { loadStyles(); if (selectedStyle === styleToDelete && styles.length > 1) setSelectedStyle(styles.find(s => s.name !== styleToDelete)?.name || ''); }} />}
      <style>{KEYFRAMES}</style>
    </div>
  );
}
```

### 📄 src/components/alchemy/animations.ts
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ✨ SYNTX ALCHEMY - ANIMATIONS                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export const KEYFRAMES = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalSlideIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
@keyframes iconPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px currentColor; } 50% { transform: scale(1.05); box-shadow: 0 0 40px currentColor; } }
@keyframes iconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes iconBounce { 0% { transform: scale(0) rotate(-180deg); } 50% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 10% { transform: translateX(-8px); } 20% { transform: translateX(8px); } 30% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 50% { transform: translateX(-4px); } 60% { transform: translateX(4px); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes particleFly { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); } }
@keyframes rotateBorder { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
```

### 📄 src/components/alchemy/cards/index.ts
```typescript
export { StyleCard } from './StyleCard';
```

### 📄 src/components/alchemy/cards/StyleCard.tsx
```typescript
"use client";
import React, { useState } from 'react';
import { COLORS, STYLE_COLORS, STYLE_ICONS, STYLE_VIBES } from '../constants';
import type { Style } from '../types';

interface StyleCardProps {
  style: Style;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onGrimoire: () => void;
  onDelete: () => void;
}

export function StyleCard({ style, isSelected, onSelect, onEdit, onGrimoire, onDelete }: StyleCardProps) {
  const color = STYLE_COLORS[style.name] || COLORS.purple;
  const icon = STYLE_ICONS[style.name] || '⚗️';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 20, borderRadius: 16,
        background: isSelected ? `linear-gradient(135deg, ${color}25, ${color}08)` : `linear-gradient(135deg, ${COLORS.dark}ee, ${COLORS.darker}f5)`,
        border: isSelected ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isSelected ? `0 0 50px ${color}40, inset 0 0 30px ${color}10` : isHovered ? `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${color}20` : '0 4px 16px rgba(0,0,0,0.2)',
        transform: isSelected ? 'scale(1.02) translateY(-4px)' : isHovered ? 'scale(1.01) translateY(-2px)' : 'scale(1)',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {isSelected && <div style={{ position: 'absolute', inset: -2, background: `linear-gradient(45deg, ${color}, transparent, ${color})`, borderRadius: 18, opacity: 0.3, animation: 'rotateBorder 3s linear infinite', zIndex: 0 }} />}
      
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(-10px)', transition: 'all 0.3s ease', zIndex: 20 }}>
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} style={{ width: 32, height: 32, borderRadius: 8, background: `${COLORS.cyan}20`, border: `1px solid ${COLORS.cyan}50`, color: COLORS.cyan, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Style bearbeiten">✏️</button>
        <button onClick={(e) => { e.stopPropagation(); onGrimoire(); }} style={{ width: 32, height: 32, borderRadius: 8, background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}50`, color: COLORS.gold, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Grimoire öffnen">📖</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ width: 32, height: 32, borderRadius: 8, background: `${COLORS.red}20`, border: `1px solid ${COLORS.red}50`, color: COLORS.red, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Style löschen">🗑️</button>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${color}30, ${color}10)`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 0 20px ${color}30`, animation: isSelected ? 'iconPulse 2s ease-in-out infinite' : 'none' }}>{icon}</div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 17, fontWeight: 800, color: color, letterSpacing: 2, textTransform: 'uppercase', textShadow: isSelected ? `0 0 20px ${color}80` : 'none' }}>{style.name.replace(/_/g, ' ')}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginTop: 2 }}>"{style.vibe || STYLE_VIBES[style.name] || 'Custom Style'}"</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{ padding: '6px 12px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.gold}25, ${COLORS.gold}10)`, border: `1px solid ${COLORS.gold}40`, fontSize: 11, color: COLORS.gold, fontFamily: 'monospace', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>⚗️</span> {style.word_alchemy_count} Transmutationen</span>
          {style.forbidden_words?.length > 0 && <span style={{ padding: '6px 12px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.red}25, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}40`, fontSize: 11, color: COLORS.red, fontFamily: 'monospace', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>🚫</span> {style.forbidden_words.length} Verboten</span>}
          {style.has_tone_injection && <span style={{ padding: '6px 12px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.purple}25, ${COLORS.purple}10)`, border: `1px solid ${COLORS.purple}40`, fontSize: 11, color: COLORS.purple, fontFamily: 'monospace', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>💉</span> Tone</span>}
        </div>

        {style.forbidden_words?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {style.forbidden_words.slice(0, 5).map(word => <span key={word} style={{ padding: '3px 8px', borderRadius: 6, background: `${COLORS.red}15`, fontSize: 10, color: COLORS.red, textDecoration: 'line-through', opacity: 0.8 }}>{word}</span>)}
            {style.forbidden_words.length > 5 && <span style={{ padding: '3px 8px', borderRadius: 6, background: `${COLORS.red}15`, fontSize: 10, color: COLORS.red }}>+{style.forbidden_words.length - 5}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 📄 src/components/alchemy/constants.ts
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🎨 SYNTX ALCHEMY - RESONANZ-KONSTANTEN                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  yellow: '#eab308',
  gold: '#fbbf24',
  dark: '#0a1628',
  darker: '#030b15'
} as const;

export const STYLE_COLORS: Record<string, string> = {
  berlin_slang: COLORS.orange,
  zynisch: COLORS.red,
  wissenschaftlich: COLORS.cyan,
  poetisch: COLORS.magenta
};

export const STYLE_ICONS: Record<string, string> = {
  berlin_slang: '🍺',
  zynisch: '🙄',
  wissenschaftlich: '🔬',
  poetisch: '🌸'
};

export const STYLE_VIBES: Record<string, string> = {
  berlin_slang: 'Späti-Philosophie um 3 Uhr nachts',
  zynisch: 'Der Augenroll-Transformer',
  wissenschaftlich: 'Der Laborkittel des Outputs',
  poetisch: 'Der Wortwebstuhl der Seele'
};
```

### 📄 src/components/alchemy/index.ts
```typescript
export { default as AlchemyPanel } from './AlchemyPanel';
export * from './constants';
export * from './types';
export * from './cards';
export * from './modals';
```

### 📄 src/components/alchemy/modals/DeleteModal.tsx
```typescript
"use client";
import React, { useState } from 'react';
import { api } from '@/lib/api';
import { COLORS } from '../constants';

interface DeleteModalProps {
  styleName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ styleName, onClose, onConfirm }: DeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try { await api.deleteStyle(styleName); onConfirm(); onClose(); }
    catch (e) { console.error(e); }
    finally { setDeleting(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }} onClick={onClose}>
      <div style={{ width: 420, padding: 36, borderRadius: 24, background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`, border: `2px solid ${COLORS.red}40`, boxShadow: `0 0 80px ${COLORS.red}30`, textAlign: 'center', animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 56, marginBottom: 20, animation: 'shake 0.5s ease' }}>🗑️</div>
        <h3 style={{ margin: '0 0 16px 0', fontFamily: 'monospace', fontSize: 22, color: COLORS.red, letterSpacing: 2 }}>STYLE AUSLÖSCHEN?</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.6 }}>Bist du sicher, dass du <strong style={{ color: COLORS.red }}>{styleName}</strong> unwiderruflich löschen möchtest?</p>
        <div style={{ display: 'flex', gap: 14 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 16, borderRadius: 14, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={handleDelete} disabled={deleting} style={{ flex: 1, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.red}50, ${COLORS.red}30)`, border: `2px solid ${COLORS.red}`, color: 'white', fontFamily: 'monospace', fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: deleting ? 'wait' : 'pointer', boxShadow: `0 0 30px ${COLORS.red}30` }}>{deleting ? '⏳ LÖSCHE...' : '🗑️ AUSLÖSCHEN'}</button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/alchemy/modals/GrimoireModal.tsx
```typescript
"use client";
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📖 GRIMOIRE MODAL - Das Zauberbuch der Wort-Transmutation               ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { COLORS, STYLE_COLORS, STYLE_ICONS, STYLE_VIBES } from '../constants';
import type { Style } from '../types';

interface GrimoireModalProps {
  style: Style;
  onClose: () => void;
  onSave: () => void;
}

export function GrimoireModal({ style, onClose, onSave }: GrimoireModalProps) {
  // ═══════════════════════════════════════════════════════════════════════════
  // 🌊 FELD-STATE - Eine Quelle der Wahrheit
  // ═══════════════════════════════════════════════════════════════════════════
  const [wordAlchemy, setWordAlchemy] = useState<Record<string, string>>({});
  const [forbiddenWords, setForbiddenWords] = useState<string[]>([]);
  const [newOriginal, setNewOriginal] = useState('');
  const [newReplacement, setNewReplacement] = useState('');
  const [newForbidden, setNewForbidden] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'alchemy' | 'forbidden'>('alchemy');

  const color = STYLE_COLORS[style.name] || COLORS.purple;
  const icon = STYLE_ICONS[style.name] || '⚗️';

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔄 REFRESH - Immer frisch vom Server, keine lokale Manipulation
  // ═══════════════════════════════════════════════════════════════════════════
  const refreshData = useCallback(async () => {
    try {
      const data = await api.getStyle(style.name);
      if (data.style) {
        setWordAlchemy(data.style.word_alchemy || {});
        setForbiddenWords(data.style.forbidden_words || []);
      }
    } catch (e) {
      console.error('Refresh failed:', e);
    }
  }, [style.name]);

  useEffect(() => {
    refreshData().then(() => setLoading(false));
  }, [refreshData]);

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚗️ ALCHEMY HANDLERS - Transmutationen
  // ═══════════════════════════════════════════════════════════════════════════
  const handleAddAlchemy = async () => {
    if (!newOriginal.trim() || !newReplacement.trim()) return;
    setSaving(true); setError('');
    try {
      await api.addAlchemy(style.name, { original: newOriginal.trim(), replacement: newReplacement.trim() });
      await refreshData();
      setNewOriginal(''); 
      setNewReplacement('');
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Hinzufügen'); 
    } finally { 
      setSaving(false); 
    }
  };

  const handleDeleteAlchemy = async (word: string) => {
    setSaving(true); setError('');
    try {
      await api.deleteAlchemy(style.name, word);
      await refreshData();
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Löschen'); 
    } finally { 
      setSaving(false); 
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 🚫 FORBIDDEN HANDLERS - Verbotene Wörter
  // ═══════════════════════════════════════════════════════════════════════════
  const handleAddForbidden = async () => {
    if (!newForbidden.trim()) return;
    setSaving(true); setError('');
    try {
      await api.addForbiddenWord(style.name, newForbidden.trim());
      await refreshData();
      setNewForbidden('');
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Verbannen'); 
    } finally { 
      setSaving(false); 
    }
  };

  const handleDeleteForbidden = async (word: string) => {
    setSaving(true); setError('');
    try {
      await api.deleteForbiddenWord(style.name, word);
      await refreshData();
      onSave();
    } catch (e: any) { 
      setError(e.detail || e.message || 'Fehler beim Entbannen'); 
    } finally { 
      setSaving(false); 
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎨 RENDER - Das Grimoire
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div 
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn 0.3s ease' }} 
      onClick={onClose}
    >
      <div 
        style={{ width: '100%', maxWidth: 750, maxHeight: '90vh', overflow: 'hidden', borderRadius: 28, background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`, border: `2px solid ${color}40`, boxShadow: `0 0 100px ${color}30`, display: 'flex', flexDirection: 'column', animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={{ padding: '28px 32px 20px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(180deg, ${color}15, transparent)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg, ${color}40, ${color}15)`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: `0 0 40px ${color}40`, animation: 'iconPulse 2s ease-in-out infinite' }}>
              {icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, color: color, letterSpacing: 3, textShadow: `0 0 30px ${color}60` }}>
                {style.name.toUpperCase().replace(/_/g, ' ')} GRIMOIRE
              </h3>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginTop: 4 }}>
                "{style.vibe || STYLE_VIBES[style.name] || 'Custom Style'}"
              </div>
            </div>
          </div>
          
          {/* TABS */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button 
              onClick={() => setActiveTab('alchemy')} 
              style={{ padding: '12px 24px', borderRadius: 12, background: activeTab === 'alchemy' ? `linear-gradient(135deg, ${COLORS.gold}30, ${COLORS.gold}10)` : 'transparent', border: activeTab === 'alchemy' ? `2px solid ${COLORS.gold}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'alchemy' ? COLORS.gold : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>⚗️</span> TRANSMUTATIONEN ({Object.keys(wordAlchemy).length})
            </button>
            <button 
              onClick={() => setActiveTab('forbidden')} 
              style={{ padding: '12px 24px', borderRadius: 12, background: activeTab === 'forbidden' ? `linear-gradient(135deg, ${COLORS.red}30, ${COLORS.red}10)` : 'transparent', border: activeTab === 'forbidden' ? `2px solid ${COLORS.red}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'forbidden' ? COLORS.red : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>🚫</span> FORBIDDEN ({forbiddenWords.length})
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div style={{ margin: '16px 32px 0', padding: 14, borderRadius: 12, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}60`, color: COLORS.red, fontSize: 13, textAlign: 'center', animation: 'shake 0.5s ease' }}>
            {error}
          </div>
        )}

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.5)' }}>
              <div style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>⚗️</div>
              <div style={{ marginTop: 16, fontFamily: 'monospace' }}>LADE GRIMOIRE...</div>
            </div>
          ) : activeTab === 'alchemy' ? (
            <>
              {/* ALCHEMY LIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, maxHeight: 300, overflow: 'auto' }}>
                {Object.entries(wordAlchemy).map(([orig, repl], idx) => (
                  <div key={orig} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))', border: '1px solid rgba(255,255,255,0.08)', animation: `slideInLeft 0.3s ease ${idx * 0.05}s both` }}>
                    <span style={{ color: COLORS.red, textDecoration: 'line-through', flex: 1, fontFamily: 'monospace', fontSize: 14 }}>{orig}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>→</span>
                    <span style={{ color: COLORS.green, flex: 1, fontFamily: 'monospace', fontSize: 14 }}>{repl}</span>
                    <button onClick={() => handleDeleteAlchemy(orig)} disabled={saving} style={{ width: 34, height: 34, borderRadius: 10, background: `${COLORS.red}15`, border: `1px solid ${COLORS.red}40`, color: COLORS.red, cursor: saving ? 'wait' : 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: saving ? 0.5 : 1 }}>✕</button>
                  </div>
                ))}
                {Object.keys(wordAlchemy).length === 0 && (
                  <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Keine Transmutationen definiert</div>
                )}
              </div>
              
              {/* ALCHEMY ADD */}
              <div style={{ display: 'flex', gap: 12, padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.gold}10, ${COLORS.gold}05)`, border: `1px solid ${COLORS.gold}30` }}>
                <input value={newOriginal} onChange={e => setNewOriginal(e.target.value)} placeholder="Original..." style={{ flex: 1, padding: 14, borderRadius: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
                <span style={{ color: COLORS.gold, alignSelf: 'center', fontSize: 20 }}>→</span>
                <input value={newReplacement} onChange={e => setNewReplacement(e.target.value)} placeholder="Ersetzung..." style={{ flex: 1, padding: 14, borderRadius: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} onKeyDown={e => e.key === 'Enter' && handleAddAlchemy()} />
                <button onClick={handleAddAlchemy} disabled={saving || !newOriginal.trim() || !newReplacement.trim()} style={{ padding: '14px 24px', borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.gold}40, ${COLORS.gold}20)`, border: `2px solid ${COLORS.gold}`, color: COLORS.gold, fontFamily: 'monospace', fontSize: 13, fontWeight: 800, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.5 : 1 }}>⚗️ ADD</button>
              </div>
            </>
          ) : (
            <>
              {/* FORBIDDEN LIST */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                {forbiddenWords.map((word, idx) => (
                  <span key={word} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}50`, animation: `slideInLeft 0.3s ease ${idx * 0.05}s both` }}>
                    <span style={{ color: COLORS.red, textDecoration: 'line-through', fontFamily: 'monospace', fontSize: 13 }}>{word}</span>
                    <button onClick={() => handleDeleteForbidden(word)} disabled={saving} style={{ width: 24, height: 24, borderRadius: 12, background: 'transparent', border: 'none', color: COLORS.red, cursor: saving ? 'wait' : 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: saving ? 0.5 : 0.7 }}>✕</button>
                  </span>
                ))}
                {forbiddenWords.length === 0 && (
                  <div style={{ width: '100%', textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Keine verbotenen Wörter</div>
                )}
              </div>
              
              {/* FORBIDDEN ADD */}
              <div style={{ display: 'flex', gap: 12, padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.red}10, ${COLORS.red}05)`, border: `1px solid ${COLORS.red}30` }}>
                <input value={newForbidden} onChange={e => setNewForbidden(e.target.value)} placeholder="Verbotenes Wort hinzufügen..." style={{ flex: 1, padding: 14, borderRadius: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} onKeyDown={e => e.key === 'Enter' && handleAddForbidden()} />
                <button onClick={handleAddForbidden} disabled={saving || !newForbidden.trim()} style={{ padding: '14px 24px', borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.red}40, ${COLORS.red}20)`, border: `2px solid ${COLORS.red}`, color: COLORS.red, fontFamily: 'monospace', fontSize: 13, fontWeight: 800, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.5 : 1 }}>🚫 BAN</button>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 32px', borderTop: `1px solid ${color}20`, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => { onSave(); onClose(); }} style={{ padding: '14px 32px', borderRadius: 14, background: `linear-gradient(135deg, ${color}40, ${color}20)`, border: `2px solid ${color}`, color: color, fontFamily: 'monospace', fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: 'pointer', boxShadow: `0 0 30px ${color}30` }}>
            ✓ GRIMOIRE SCHLIESSEN
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/alchemy/modals/index.ts
```typescript
export { GrimoireModal } from './GrimoireModal';
export { StyleEditorModal } from './StyleEditorModal';
export { DeleteModal } from './DeleteModal';
```

### 📄 src/components/alchemy/modals/StyleEditorModal.tsx
```typescript
"use client";
import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { COLORS } from '../constants';
import type { Style } from '../types';

interface StyleEditorModalProps {
  style: Style | null;
  onClose: () => void;
  onSave: () => void;
  isNew: boolean;
}

export function StyleEditorModal({ style, onClose, onSave, isNew }: StyleEditorModalProps) {
  const [name, setName] = useState(style?.name || '');
  const [vibe, setVibe] = useState(style?.vibe || '');
  const [description, setDescription] = useState('');
  const [toneInjection, setToneInjection] = useState('');
  const [suffix, setSuffix] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  useEffect(() => {
    if (!isNew && style?.name) {
      api.getStyle(style.name).then((data: any) => {
        if (data.style) { setVibe(data.style.vibe || ''); setDescription(data.style.description || ''); setToneInjection(data.style.tone_injection || ''); setSuffix(data.style.suffix || ''); }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [isNew, style?.name]);

  const handleSave = async () => {
    if (!name.trim() || !vibe.trim()) { setError('Name und Vibe sind erforderlich'); return; }
    setSaving(true); setError('');
    try {
      const styleName = name.toLowerCase().replace(/\s+/g, '_');
      if (isNew) {
        await api.createStyle({ name: styleName, vibe });
        if (description || toneInjection || suffix) {
          const updates: any = {};
          if (description) updates.description = description;
          if (toneInjection) updates.tone_injection = toneInjection;
          if (suffix) updates.suffix = suffix;
          await api.updateStyle(styleName, updates);
        }
      } else {
        await api.updateStyle(style!.name, { vibe, description, tone_injection: toneInjection, suffix } as any);
      }
      onSave(); onClose();
    } catch (e: any) { setError(e.message || 'Fehler'); }
    finally { setSaving(false); }
  };

  if (loading) return <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center', color: COLORS.magenta }}><div style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>⚗️</div><div style={{ marginTop: 16, fontFamily: 'monospace', letterSpacing: 2 }}>LADE STYLE...</div></div></div>;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn 0.3s ease' }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'hidden', borderRadius: 24, background: `linear-gradient(135deg, ${COLORS.dark}f8, ${COLORS.darker}fc)`, border: `2px solid ${COLORS.magenta}40`, boxShadow: `0 0 80px ${COLORS.magenta}30`, display: 'flex', flexDirection: 'column', animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} onClick={e => e.stopPropagation()}>
        
        <div style={{ padding: '28px 32px 20px', borderBottom: `1px solid ${COLORS.magenta}20` }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 12, animation: 'iconBounce 0.6s ease' }}>{isNew ? '✨' : '✏️'}</div>
            <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.magenta, letterSpacing: 3, textShadow: `0 0 30px ${COLORS.magenta}50` }}>{isNew ? 'NEUER STYLE ERSCHAFFEN' : 'STYLE BEARBEITEN'}</h3>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setActiveTab('basic')} style={{ flex: 1, padding: '12px 20px', borderRadius: 12, background: activeTab === 'basic' ? `linear-gradient(135deg, ${COLORS.magenta}30, ${COLORS.magenta}10)` : 'transparent', border: activeTab === 'basic' ? `2px solid ${COLORS.magenta}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'basic' ? COLORS.magenta : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>📝</span> BASICS</button>
            <button onClick={() => setActiveTab('advanced')} style={{ flex: 1, padding: '12px 20px', borderRadius: 12, background: activeTab === 'advanced' ? `linear-gradient(135deg, ${COLORS.purple}30, ${COLORS.purple}10)` : 'transparent', border: activeTab === 'advanced' ? `2px solid ${COLORS.purple}` : '1px solid rgba(255,255,255,0.1)', color: activeTab === 'advanced' ? COLORS.purple : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>⚡</span> ADVANCED</button>
          </div>
        </div>

        {error && <div style={{ margin: '16px 32px 0', padding: 14, borderRadius: 12, background: `linear-gradient(135deg, ${COLORS.red}20, ${COLORS.red}10)`, border: `1px solid ${COLORS.red}60`, color: COLORS.red, fontSize: 13, textAlign: 'center', animation: 'shake 0.5s ease' }}>{error}</div>}

        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          {activeTab === 'basic' ? (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>NAME {isNew && <span style={{ color: COLORS.red }}>*</span>}</label>
                <input value={name} onChange={e => setName(e.target.value)} disabled={!isNew} placeholder="z.B. formal_business" style={{ width: '100%', padding: 14, borderRadius: 12, background: isNew ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)', border: `1px solid ${isNew ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`, color: isNew ? 'white' : 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>VIBE <span style={{ color: COLORS.red }}>*</span></label>
                <input value={vibe} onChange={e => setVibe(e.target.value)} placeholder="z.B. Der Konferenzraum-Transformer" style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'monospace', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}>BESCHREIBUNG</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Ausführliche Beschreibung..." style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'monospace', fontSize: 14, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: COLORS.purple, fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}><span>💉</span> TONE INJECTION</label>
                <textarea value={toneInjection} onChange={e => setToneInjection(e.target.value)} placeholder="Prompt-Text der VOR dem LLM-Request injiziert wird..." style={{ width: '100%', minHeight: 140, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: `1px solid ${COLORS.purple}40`, color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, padding: '8px 12px', background: `${COLORS.purple}10`, borderRadius: 8, border: `1px solid ${COLORS.purple}20` }}>⚡ Pre-LLM: Wird BEVOR der Request ans LLM geht hinzugefügt</div>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: COLORS.cyan, fontSize: 12, fontFamily: 'monospace', letterSpacing: 2 }}><span>📎</span> SUFFIX</label>
                <textarea value={suffix} onChange={e => setSuffix(e.target.value)} placeholder="Text der am Ende jeder Response angehängt wird..." style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: `1px solid ${COLORS.cyan}40`, color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, padding: '8px 12px', background: `${COLORS.cyan}10`, borderRadius: 8, border: `1px solid ${COLORS.cyan}20` }}>📎 Post-LLM: Wird NACH der Response angehängt</div>
              </div>
            </>
          )}
        </div>

        <div style={{ padding: '20px 32px', borderTop: `1px solid ${COLORS.magenta}20`, display: 'flex', gap: 14 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 16, borderRadius: 14, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.magenta}50, ${COLORS.purple}30)`, border: `2px solid ${COLORS.magenta}`, color: COLORS.magenta, fontFamily: 'monospace', fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: saving ? 'wait' : 'pointer', boxShadow: `0 0 30px ${COLORS.magenta}30` }}>{saving ? '⏳ SPEICHERN...' : isNew ? '✨ ERSCHAFFEN' : '💾 SPEICHERN'}</button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/alchemy/types.ts
```typescript
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
```

### 📄 src/components/analytics/FieldStream.tsx
```typescript
'use client';

import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { StreamEvent } from '@/types/api';

const STAGE_COLORS: Record<string, string> = {
  '1_INCOMING': 'text-gray-400 border-gray-500/30',
  '2_WRAPPERS_LOADED': 'text-blue-400 border-blue-500/30',
  '3_FIELD_CALIBRATED': 'text-yellow-400 border-yellow-500/30',
  '4_BACKEND_FORWARD': 'text-fuchsia-400 border-fuchsia-500/30',
  '5_RESPONSE': 'text-syntx-green border-syntx-green/30',
};

export function FieldStream() {
  const [limit, setLimit] = useState(10);
  const { data, loading, refetch } = useApi(() => api.getStream(limit), [limit]);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted flex items-center gap-2">
          <span className="text-syntx-cyan">🌊</span>
          Field Stream
          <span className="text-syntx-cyan/50">— Live Events</span>
        </h2>
        <div className="flex items-center gap-2">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-syntx-dark border border-syntx-border/50 rounded px-2 py-1 text-xs text-syntx-muted"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <Button variant="ghost" size="sm" onClick={refetch}>
            ↻
          </Button>
        </div>
      </div>

      <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="h-10 rounded bg-syntx-dark/50 animate-pulse" />
          ))
        ) : data?.events.length ? (
          data.events.map((event, i) => (
            <StreamEventRow key={`${event.request_id}-${event.stage}-${i}`} event={event} />
          ))
        ) : (
          <div className="text-center py-8 text-syntx-muted text-sm">
            No events yet
          </div>
        )}
      </div>
    </Card>
  );
}

function StreamEventRow({ event }: { event: StreamEvent }) {
  const stageKey = event.stage as keyof typeof STAGE_COLORS;
  const colorClass = STAGE_COLORS[stageKey] || 'text-syntx-muted border-syntx-border/30';
  const stageName = event.stage?.split('_').slice(1).join(' ') || event.stage;

  return (
    <div className={`
      flex items-center gap-3 px-3 py-2 rounded-lg border
      bg-syntx-dark/30 ${colorClass}
      hover:bg-syntx-dark/50 transition-colors cursor-pointer
    `}>
      <span className="text-xs text-syntx-muted/70 font-mono w-16">
        {new Date(event.timestamp).toLocaleTimeString()}
      </span>
      <span className={`text-xs font-mono font-medium w-24 ${colorClass.split(' ')[0]}`}>
        {stageName}
      </span>
      <span className="text-xs text-syntx-muted font-mono flex-1 truncate">
        {event.request_id?.slice(0, 12)}...
      </span>
      {event.latency_ms && (
        <span className="text-xs text-syntx-cyan font-mono">
          {event.latency_ms}ms
        </span>
      )}
    </div>
  );
}
```

### 📄 src/components/analytics/index.ts
```typescript
export { SystemStats } from './SystemStats';
export { FieldStream } from './FieldStream';
```

### 📄 src/components/analytics/StatsPanel.tsx
```typescript
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import { api, StatsResponse, StreamEvent, TrainingRequest } from '@/lib/api';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '@/components/ui/Pagination';
import SortHeader from '@/components/ui/SortHeader';

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
};

// ═══════════════════════════════════════════════════════════════
// FLOW DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
function FlowDetailModal({ requestId, onClose }: { requestId: string; onClose: () => void }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHistory(requestId).then(setDetail).catch(console.error).finally(() => setLoading(false));
  }, [requestId]);

  const STAGE_CONFIG: Record<string, { color: string; icon: string }> = {
    '1_INCOMING': { color: COLORS.cyan, icon: '📥' },
    '2_WRAPPERS_LOADED': { color: COLORS.green, icon: '📦' },
    '3_FIELD_CALIBRATED': { color: COLORS.orange, icon: '⚡' },
    '4_BACKEND_FORWARD': { color: COLORS.magenta, icon: '🚀' },
    '5_RESPONSE': { color: COLORS.green, icon: '✅' },
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 900, maxHeight: '90vh', background: 'linear-gradient(135deg, #0a1a2e, #050b14)', borderRadius: 20, border: '1px solid rgba(0,212,255,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🌊</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.cyan }}>FIELD FLOW DETAIL</h2>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>{requestId}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'white', cursor: 'pointer', fontFamily: 'monospace' }}>✕ CLOSE</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : detail?.stages?.map((stage: any) => {
            const config = STAGE_CONFIG[stage.stage] || { color: COLORS.cyan, icon: '●' };
            return (
              <div key={stage.stage} style={{ marginBottom: 16, padding: 16, background: `${config.color}10`, border: `1px solid ${config.color}30`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{config.icon}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: config.color, fontWeight: 700 }}>{stage.stage}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{new Date(stage.timestamp).toLocaleString('de-DE')}</span>
                </div>
                {stage.prompt && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Prompt:</strong> {stage.prompt}</div>}
                {stage.backend_url && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Backend:</strong> <span style={{ color: COLORS.magenta }}>{stage.backend_url}</span></div>}
                {stage.params && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 11, marginBottom: 8 }}><strong>Params:</strong> <pre style={{ margin: '8px 0 0', color: COLORS.cyan }}>{JSON.stringify(stage.params, null, 2)}</pre></div>}
                {stage.response && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{stage.response}</div>}
                {stage.latency_ms && <div style={{ marginTop: 8, fontSize: 11, color: COLORS.orange }}>⚡ {(stage.latency_ms/1000).toFixed(2)}s</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function StatsPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);
  const [trainingData, setTrainingData] = useState<TrainingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'stream' | 'training'>('stream');

  const fetchData = useCallback(async () => {
    try {
      const [statsData, streamData, training] = await Promise.all([
        api.getStats(),
        api.getStream(200),
        api.getTraining(200),
      ]);
      setStats(statsData);
      setStreamEvents(streamData.events || []);
      setTrainingData(training.requests || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Pagination for stream events
  const streamPagination = usePagination(streamEvents, 10, { key: 'timestamp' as keyof StreamEvent, direction: 'desc' });
  
  // Pagination for training data
  const trainingPagination = usePagination(trainingData, 10);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Requests', value: stats?.total_requests || 0, icon: '📡', color: COLORS.cyan },
          { label: 'Success Rate', value: `${stats?.success_rate || 0}%`, icon: '✅', color: COLORS.green },
          { label: 'Avg Latency', value: `${((stats?.average_latency_ms || 0) / 1000).toFixed(1)}s`, icon: '⚡', color: COLORS.orange },
          { label: 'Active Wrappers', value: Object.keys(stats?.wrapper_usage || {}).length, icon: '📦', color: COLORS.magenta },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: 20,
            background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
            border: `1px solid ${stat.color}30`,
            borderRadius: 16,
          }}>
            <span style={{ fontSize: 28 }}>{stat.icon}</span>
            <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, fontFamily: 'monospace', margin: '12px 0 6px' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Section Toggle */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['stream', 'training'] as const).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: `1px solid ${activeSection === section ? COLORS.cyan : 'rgba(255,255,255,0.1)'}`,
              background: activeSection === section ? COLORS.cyan + '20' : 'transparent',
              color: activeSection === section ? COLORS.cyan : 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {section === 'stream' ? '🌊 FIELD STREAM' : '📚 TRAINING DATA'}
          </button>
        ))}
      </div>

      {/* Stream Events Section */}
      {activeSection === 'stream' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🌊</span>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.cyan }}>FIELD STREAM</h3>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{streamEvents.length} events</span>
            </div>
          </div>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr 100px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <SortHeader label="Zeit" sortKey="timestamp" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} />
            <SortHeader label="Stage" sortKey="stage" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} />
            <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>REQUEST ID</div>
            <SortHeader label="Latency" sortKey="latency_ms" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} color={COLORS.orange} />
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {streamPagination.items.map((event, i) => (
              <div
                key={event.request_id + event.stage + i}
                onClick={() => setSelectedRequest(event.request_id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 100px 1fr 100px',
                  gap: 8,
                  padding: '12px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,212,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>
                  {new Date(event.timestamp).toLocaleTimeString('de-DE')}
                </div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: COLORS.green }}>{event.stage}</div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {event.request_id.slice(0, 20)}...
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>
                  {event.latency_ms ? `${(event.latency_ms / 1000).toFixed(1)}s` : '-'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 24px 16px' }}>
            <Pagination
              page={streamPagination.pagination.page}
              totalPages={streamPagination.pagination.totalPages}
              totalItems={streamPagination.pagination.totalItems}
              pageSize={streamPagination.pagination.pageSize}
              onPageChange={streamPagination.setPage}
              onPageSizeChange={streamPagination.setPageSize}
            />
          </div>
        </div>
      )}

      {/* Training Data Section */}
      {activeSection === 'training' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>📚</span>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.magenta }}>TRAINING DATA</h3>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{trainingData.length} entries</span>
            </div>
          </div>

          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <SortHeader label="Wrapper" sortKey="wrapper_chain" currentSort={trainingPagination.sorting as any} onSort={trainingPagination.toggleSort as any} color={COLORS.magenta} />
            <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>RESPONSE</div>
            <SortHeader label="Latency" sortKey="latency_ms" currentSort={trainingPagination.sorting as any} onSort={trainingPagination.toggleSort as any} color={COLORS.orange} />
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {trainingPagination.items.map((entry, i) => (
              <div
                key={entry.request_id + i}
                onClick={() => setSelectedRequest(entry.request_id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 100px',
                  gap: 8,
                  padding: '14px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(217,70,239,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  padding: '4px 8px',
                  borderRadius: 6,
                  background: COLORS.magenta + '20',
                  color: COLORS.magenta,
                  width: 'fit-content',
                }}>
                  {entry.wrapper_chain?.[0]?.replace('syntex_wrapper_', '') || 'unknown'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.response?.slice(0, 100)}...
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>
                  {entry.latency_ms ? `${(entry.latency_ms / 1000).toFixed(1)}s` : '-'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 24px 16px' }}>
            <Pagination
              page={trainingPagination.pagination.page}
              totalPages={trainingPagination.pagination.totalPages}
              totalItems={trainingPagination.pagination.totalItems}
              pageSize={trainingPagination.pagination.pageSize}
              onPageChange={trainingPagination.setPage}
              onPageSizeChange={trainingPagination.setPageSize}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <FlowDetailModal requestId={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </div>
  );
}
```

### 📄 src/components/analytics/SystemStats.tsx
```typescript
'use client';

import { Card } from '@/components/ui';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';

export function SystemStats() {
  const { data, loading } = useApi(() => api.getStats(), []);

  const stats = [
    { 
      label: 'Total Requests', 
      value: data?.total_requests ?? '-', 
      color: 'text-syntx-cyan',
      glow: 'shadow-[0_0_20px_rgba(0,212,255,0.3)]'
    },
    { 
      label: 'Success Rate', 
      value: data ? `${data.success_rate}%` : '-', 
      color: 'text-syntx-green',
      glow: 'shadow-[0_0_20px_rgba(0,255,136,0.3)]'
    },
    { 
      label: 'Avg Latency', 
      value: data ? `${(data.average_latency_ms / 1000).toFixed(1)}s` : '-', 
      color: 'text-syntx-yellow',
      glow: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]'
    },
    { 
      label: 'Median', 
      value: data ? `${(data.median_latency_ms / 1000).toFixed(1)}s` : '-', 
      color: 'text-syntx-magenta',
      glow: 'shadow-[0_0_20px_rgba(255,0,255,0.3)]'
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted mb-6 flex items-center gap-2">
        <span className="text-syntx-yellow">📊</span>
        System Statistics
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-syntx-dark/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`
                p-4 rounded-lg border border-syntx-border/30 
                bg-syntx-dark/50 ${stat.glow}
                transition-all duration-300 hover:scale-105
              `}
            >
              <div className="text-xs text-syntx-muted font-mono uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wrapper Usage */}
      {data?.wrapper_usage && (
        <div className="mt-6 pt-4 border-t border-syntx-border/30">
          <div className="text-xs text-syntx-muted font-mono uppercase tracking-wider mb-3">
            Wrapper Usage
          </div>
          <div className="space-y-2">
            {Object.entries(data.wrapper_usage).map(([name, count]) => (
              <div key={name} className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-syntx-dark overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-syntx-cyan to-syntx-magenta rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(count / data.total_requests) * 100}%` 
                    }}
                  />
                </div>
                <span className="text-xs text-syntx-muted font-mono w-24 truncate">
                  {name.replace('syntex_wrapper_', '')}
                </span>
                <span className="text-xs text-syntx-cyan font-mono w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
```

### 📄 src/components/chat/ChatInterface.tsx
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { FieldFlowVisualizer } from '@/components/flow';
import { useMutation } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { ChatResponse } from '@/lib/api';

export function ChatInterface() {
  const [prompt, setPrompt] = useState('');
  const [activeStage, setActiveStage] = useState(0);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const { mutate: sendChat, loading } = useMutation(api.chat);

  useEffect(() => {
    if (loading) {
      setActiveStage(1);
      let i = 1;
      const interval = setInterval(() => {
        i++;
        if (i <= 4) setActiveStage(i);
      }, 800);
      return () => clearInterval(interval);
    } else if (response) {
      setActiveStage(5);
      setTimeout(() => setActiveStage(0), 2000);
    }
  }, [loading, response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    setResponse(null);
    try {
      const result = await sendChat({ prompt });
      setResponse(result);
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <FieldFlowVisualizer activeStage={activeStage} processing={loading} />
      
      <Card className="p-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted mb-6 flex items-center gap-2">
          <span className="text-syntx-cyan">💬</span>
          Resonance Chat
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                disabled={loading}
              />
            </div>
            <Button type="submit" loading={loading} glow>
              ⚡ SEND
            </Button>
          </div>
        </form>

        <div className={`min-h-[150px] p-4 rounded-xl border transition-all duration-500
          ${response ? 'border-syntx-cyan/30 bg-syntx-cyan/5' : 'border-syntx-border/30 bg-syntx-dark/30'}`}>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="flex items-center gap-3 text-syntx-cyan">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                <span className="ml-2 text-sm font-mono">Processing...</span>
              </div>
            </div>
          ) : response ? (
            <div className="space-y-4">
              <p className="text-syntx-text leading-relaxed">{response.response}</p>
              <div className="pt-4 border-t border-syntx-border/30 flex flex-wrap gap-4 text-xs font-mono">
                <span className="text-syntx-muted">
                  Latency: <span className="text-syntx-cyan">{response.metadata.latency_ms}ms</span>
                </span>
                <span className="text-syntx-muted">
                  Wrapper: <span className="text-syntx-magenta">
                    {response.metadata.wrapper_chain?.[0]?.replace('syntex_wrapper_', '').toUpperCase()}
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-syntx-muted text-sm">
              Enter a prompt and click ⚡ SEND
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
```

### 📄 src/components/chat/ChatPanel.tsx
```typescript
"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { api, Wrapper } from '@/lib/api';
import { ChatHeader } from './components';
import { useHealthCheck } from './hooks';

// ═══════════════════════════════════════════════════════════════
// 🎨 CYBER STYLES - MAXIMUM MOVEMENT
import { FormatCard } from './sidebar/FormatCard';
import { FormatModal } from './sidebar/FormatModal';
// ═══════════════════════════════════════════════════════════════

const cyberStyles = `
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px var(--glow-color, #00d4ff); }
    50% { box-shadow: 0 0 40px var(--glow-color, #00d4ff), 0 0 60px var(--glow-color, #00d4ff); }
  }
  @keyframes borderFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes slideIn {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanLine {
    0% { top: -10%; opacity: 0; }
    50% { opacity: 0.5; }
    100% { top: 110%; opacity: 0; }
  }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-8px); opacity: 1; }
  }
  @keyframes scoreReveal {
    0% { opacity: 0; transform: scale(0.8) translateY(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes dataStream {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.8; }
    94% { opacity: 1; }
    96% { opacity: 0.9; }
    97% { opacity: 1; }
  }
  .cyber-card {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cyber-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  .cyber-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--glow-color, #00d4ff), transparent);
    opacity: 0.8;
  }
  .cyber-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .cyber-btn:hover:not(:disabled) {
    transform: scale(1.02);
    filter: brightness(1.2);
  }
  .cyber-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  .cyber-btn:hover::after { left: 100%; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .neon { animation: neonFlicker 4s infinite; }
  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  .scan-line {
    position: absolute;
    left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--scan-color, #00d4ff), transparent);
    animation: scanLine 3s linear infinite;
    pointer-events: none;
  }
  .score-tag { animation: scoreReveal 0.4s ease-out backwards; }
  .dropdown-menu { animation: slideIn 0.2s ease-out; }
  .data-stream {
    background: linear-gradient(180deg, rgba(0,212,255,0.03) 0%, transparent 30%, transparent 70%, rgba(217,70,239,0.03) 100%);
    background-size: 100% 200%;
    animation: dataStream 8s linear infinite;
  }
`;

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  metadata?: {
    input_tokens: number;
    output_tokens: number;
    model: string;
    stop_reason: string;
  };
  scores?: Score[];
}

interface Score {
  field: string;
  score: number;
  maxScore: number;
}

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ═══════════════════════════════════════════════════════════════
// GLASS CARD - CYBER EDITION
// ═══════════════════════════════════════════════════════════════

function GlassCard({ children, style = {}, glowColor = '#00d4ff', className = '' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  className?: string;
}) {
  return (
    <div className={`cyber-card ${className}`} style={{
      '--glow-color': glowColor,
      position: 'relative',
      borderRadius: 16,
      background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
      backdropFilter: 'blur(20px)',
      border: `1px solid ${glowColor}30`,
      boxShadow: `0 4px 30px ${glowColor}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
      overflow: 'visible',
      ...style,
    } as React.CSSProperties}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TYPING INDICATOR - CYBER
// ═══════════════════════════════════════════════════════════════

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '14px 18px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 12, height: 12, borderRadius: '50%',
          background: `linear-gradient(135deg, #00d4ff, #d946ef)`,
          animation: `typingBounce 1.4s ease-in-out ${i * 0.15}s infinite`,
          boxShadow: '0 0 15px rgba(0,212,255,0.6)'
        }} />
      ))}
      <span className="glow-text" style={{ marginLeft: 10, fontSize: 12, fontFamily: 'monospace', color: '#00d4ff', letterSpacing: 2 }}>
        PROCESSING
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCORE BAR - VISUALISIERUNG
// ═══════════════════════════════════════════════════════════════

function ScoreBar({ score, maxScore = 10, label, delay = 0 }: { score: number; maxScore?: number; label: string; delay?: number }) {
  const percentage = (score / maxScore) * 100;
  const color = score >= 8 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444';

  return (
    <div className="score-tag" style={{ marginBottom: 8, animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 700, color, textShadow: `0 0 10px ${color}` }}>{score}/{maxScore}</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          borderRadius: 3,
          boxShadow: `0 0 10px ${color}`,
          transition: 'width 0.5s ease-out'
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MESSAGE BUBBLE - CYBER EDITION MIT SCORES
// ═══════════════════════════════════════════════════════════════

function MessageBubble({ message, isUser, wrapper, latency, timestamp, scores, metadata, isMobile }: {
  message: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  scores?: Score[];
  metadata?: Message['metadata'];
  isMobile: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const totalScore = scores?.reduce((a, b) => a + b.score, 0) || 0;
  const maxTotal = scores ? scores.length * 10 : 0;

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 20,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={{
        maxWidth: isMobile ? '90%' : '78%',
        borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
        background: isUser
          ? 'linear-gradient(145deg, rgba(0,212,255,0.12), rgba(0,212,255,0.04))'
          : 'linear-gradient(145deg, rgba(217,70,239,0.10), rgba(217,70,239,0.02))',
        border: isUser ? '1px solid rgba(0,212,255,0.35)' : '1px solid rgba(217,70,239,0.35)',
        boxShadow: isUser
          ? '0 4px 30px rgba(0,212,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 30px rgba(217,70,239,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Scan Line Effect for AI */}
        {!isUser && <div className="scan-line" style={{ '--scan-color': '#d946ef' } as React.CSSProperties} />}

        {/* Header Tags */}
        {!isUser && (
          <div style={{
            padding: '12px 16px',
            background: 'linear-gradient(90deg, rgba(217,70,239,0.15), transparent)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap'
          }}>
            {wrapper && (
              <span className="float neon" style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(217,70,239,0.1))',
                border: '1px solid rgba(217,70,239,0.5)',
                color: '#d946ef', fontFamily: 'monospace', fontWeight: 600,
                boxShadow: '0 0 15px rgba(217,70,239,0.3)',
                letterSpacing: 1
              }}>
                📦 {wrapper.replace('syntex_wrapper_', '').toUpperCase()}
              </span>
            )}
            {latency && (
              <span className="pulse" style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.1))',
                border: '1px solid rgba(245,158,11,0.5)',
                color: '#f59e0b', fontFamily: 'monospace', fontWeight: 600,
                boxShadow: '0 0 15px rgba(245,158,11,0.3)'
              }}>
                ⚡ {(latency / 1000).toFixed(2)}s
              </span>
            )}
            {scores && scores.length > 0 && (
              <span style={{
                fontSize: 10, padding: '5px 12px', borderRadius: 20,
                background: `linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.1))`,
                border: '1px solid rgba(16,185,129,0.5)',
                color: '#10b981', fontFamily: 'monospace', fontWeight: 700,
                boxShadow: '0 0 15px rgba(16,185,129,0.3)',
                marginLeft: 'auto'
              }}>
                📊 {totalScore}/{maxTotal}
              </span>
            )}
          </div>
        )}

        {/* Message Content */}
        <div style={{ padding: '16px 18px' }}>
          <div style={{
            fontSize: isMobile ? 14 : 15,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.92)',
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </div>
        </div>

        {/* SCORES SECTION - NUR FÜR AI */}
        {!isUser && scores && scores.length > 0 && (
          <div style={{
            padding: '16px 18px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{
              fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)',
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
              letterSpacing: 2
            }}>
              <span className="pulse" style={{ fontSize: 14 }}>📈</span>
              FELD SCORES
            </div>
            
            {/* Score Bars */}
            {scores.map((s, i) => (
              <ScoreBar key={i} score={s.score} maxScore={s.maxScore} label={s.field} delay={i * 0.1} />
            ))}

            {/* Total Score */}
            <div style={{
              marginTop: 14, paddingTop: 14,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: 1 }}>
                TOTAL SCORE
              </span>
              <span className="glow-text" style={{
                fontSize: 18, fontFamily: 'monospace', fontWeight: 900,
                color: totalScore / maxTotal >= 0.8 ? '#10b981' : totalScore / maxTotal >= 0.5 ? '#f59e0b' : '#ef4444',
              }}>
                {totalScore}/{maxTotal}
              </span>
            </div>
          </div>
        )}

        {/* Metadata Details */}
        {!isUser && metadata && (
          <div style={{ padding: '0 18px 14px' }}>
            <button onClick={() => setShowDetails(!showDetails)} className="cyber-btn" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 10, color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer', fontFamily: 'monospace',
              display: 'flex', alignItems: 'center', gap: 6,
              width: '100%', justifyContent: 'center'
            }}>
              <span style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
              {showDetails ? 'Hide' : 'Show'} Details
            </button>
            
            {showDetails && (
              <div className="data-stream" style={{
                marginTop: 10, padding: 14, borderRadius: 10,
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(0,212,255,0.2)',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10
              }}>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(0,212,255,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#00d4ff' }}>{metadata.input_tokens}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>INPUT TOKENS</div>
                </div>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(217,70,239,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#d946ef' }}>{metadata.output_tokens}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>OUTPUT TOKENS</div>
                </div>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(16,185,129,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>{metadata.model}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>MODEL</div>
                </div>
                <div style={{ textAlign: 'center', padding: 10, background: 'rgba(245,158,11,0.1)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>{metadata.stop_reason}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>STOP REASON</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div style={{
          padding: '8px 18px 12px',
          fontSize: 9, color: 'rgba(255,255,255,0.25)',
          textAlign: isUser ? 'right' : 'left',
          fontFamily: 'monospace'
        }}>
          {timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

// [REST OF THE COMPONENTS CONTINUE IN NEXT MESSAGE...]

// ═══════════════════════════════════════════════════════════════
// CYBER DROPDOWN - FIXED Z-INDEX
// ═══════════════════════════════════════════════════════════════

function CyberDropdown({
  options, selected, onSelect, color, zIndex = 100, showFullName = false
}: {
  options: { value: string; label: string; badge?: string }[];
  selected: string;
  onSelect: (v: string) => void;
  color: string;
  zIndex?: number;
  showFullName?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(o => o.value === selected);

  return (
    <div style={{ position: 'relative', zIndex: open ? zIndex : 1 }}>
      <button onClick={() => setOpen(!open)} className="cyber-btn" style={{
        width: '100%', padding: '12px 14px', borderRadius: 12,
        border: `1px solid ${color}50`,
        background: `linear-gradient(135deg, ${color}20, ${color}05)`,
        color, fontFamily: 'monospace', fontSize: 12, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: open ? `0 0 30px ${color}30` : `0 0 15px ${color}10`,
        transition: 'all 0.3s ease',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={open ? 'pulse' : ''} style={{ fontSize: 8 }}>●</span>
          <span style={{ fontWeight: 600 }}>
            {showFullName 
              ? selectedOption?.value || 'Select...'
              : selectedOption?.label || 'Select...'}
          </span>
        </span>
        <span style={{
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>▼</span>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: zIndex - 1
          }} />
          
          <div className="dropdown-menu" style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            marginTop: 6,
            background: 'linear-gradient(145deg, rgba(10,26,46,0.99), rgba(6,13,24,0.99))',
            border: `1px solid ${color}40`,
            borderRadius: 12,
            overflow: 'hidden',
            zIndex: zIndex + 10,
            maxHeight: 280,
            overflowY: 'auto',
            boxShadow: `0 15px 50px rgba(0,0,0,0.6), 0 0 30px ${color}15`,
          }}>
            {options.map((opt, i) => (
              <button key={opt.value} onClick={() => { onSelect(opt.value); setOpen(false); }} style={{
                width: '100%', padding: '12px 14px', border: 'none',
                background: opt.value === selected
                  ? `linear-gradient(90deg, ${color}25, transparent)`
                  : 'transparent',
                color: opt.value === selected ? color : 'rgba(255,255,255,0.7)',
                fontFamily: 'monospace', fontSize: 11, cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i < options.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (opt.value !== selected) e.currentTarget.style.background = `${color}10`; }}
              onMouseLeave={e => { if (opt.value !== selected) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontWeight: 600 }}>{opt.label}</span>
                  {showFullName && <span style={{ fontSize: 9, opacity: 0.5 }}>{opt.value}</span>}
                </span>
                {opt.badge && <span style={{ fontSize: 9, color: '#10b981', fontWeight: 600 }}>{opt.badge}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LIVE PROMPT PREVIEW - FULL VERSION
// ═══════════════════════════════════════════════════════════════

function LivePromptPreview({ wrapperContent }: { wrapperContent: string }) {
  const [expanded, setExpanded] = useState(true);
  const lineCount = wrapperContent.split('\n').length;
  const charCount = wrapperContent.length;
  const tokenEstimate = Math.round(charCount / 4);

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(0,212,255,0.3)'
    }}>
      <button onClick={() => setExpanded(!expanded)} className="cyber-btn" style={{
        width: '100%', padding: '12px 14px', border: 'none',
        background: 'linear-gradient(90deg, rgba(0,212,255,0.15), transparent)',
        color: '#00d4ff', fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pulse" style={{ fontSize: 16 }}>🔥</span>
          <span style={{ fontWeight: 700, letterSpacing: 1 }}>LIVE PROMPT</span>
        </span>
        <span style={{
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }}>▼</span>
      </button>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: expanded ? '1px solid rgba(255,255,255,0.05)' : 'none'
      }}>
        <div style={{ padding: '10px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#00d4ff' }}>{lineCount}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>ZEILEN</div>
        </div>
        <div style={{ padding: '10px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#f59e0b' }}>{charCount}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>ZEICHEN</div>
        </div>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#d946ef' }}>~{tokenEstimate}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
        </div>
      </div>

      {expanded && (
        <div className="data-stream" style={{
          padding: 14,
          maxHeight: 250,
          overflowY: 'auto',
          background: 'rgba(0,0,0,0.3)'
        }}>
          <pre style={{
            margin: 0,
            fontSize: 10,
            fontFamily: 'monospace',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: '#00d4ff'
          }}>
            {wrapperContent || 'Wähle einen Wrapper...'}
          </pre>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SESSION SCORE OVERVIEW - NEUES PANEL
// ═══════════════════════════════════════════════════════════════

function SessionScoreOverview({ messages }: { messages: Message[] }) {
  const aiMessages = messages.filter(m => !m.isUser && m.scores && m.scores.length > 0);
  
  if (aiMessages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'monospace' }}>
        Noch keine Scores...
      </div>
    );
  }

  const allScores: { [key: string]: { total: number; count: number } } = {};
  aiMessages.forEach(m => {
    m.scores?.forEach(s => {
      if (!allScores[s.field]) allScores[s.field] = { total: 0, count: 0 };
      allScores[s.field].total += s.score;
      allScores[s.field].count += 1;
    });
  });

  const avgScores = Object.entries(allScores).map(([field, data]) => ({
    field,
    avg: Math.round((data.total / data.count) * 10) / 10,
    count: data.count
  }));

  const totalAvg = avgScores.length > 0
    ? Math.round(avgScores.reduce((a, b) => a + b.avg, 0) / avgScores.length * 10) / 10
    : 0;

  return (
    <div>
      <div style={{
        textAlign: 'center', padding: 16,
        background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
        borderRadius: 12, marginBottom: 12,
        border: '1px solid rgba(16,185,129,0.3)'
      }}>
        <div className="glow-text" style={{
          fontSize: 32, fontWeight: 900, color: '#10b981', fontFamily: 'monospace'
        }}>
          {totalAvg.toFixed(1)}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
          AVERAGE SCORE ({aiMessages.length} Responses)
        </div>
      </div>

      {avgScores.map((s, i) => (
        <div key={s.field} className="score-tag" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 12px',
          background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
          borderRadius: 6,
          animationDelay: `${i * 0.05}s`
        }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>
            {s.field}
          </span>
          <span style={{
            fontSize: 12, fontFamily: 'monospace', fontWeight: 700,
            color: s.avg >= 8 ? '#10b981' : s.avg >= 5 ? '#f59e0b' : '#ef4444'
          }}>
            Ø {s.avg.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN CHAT PANEL
// ═══════════════════════════════════════════════════════════════

export default function ChatPanel() {
  const isMobile = useIsMobile();
  const { isHealthy } = useHealthCheck();  // ← HEALTH CHECK HOOK!
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [selectedWrapper, setSelectedWrapper] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [formatDetails, setFormatDetails] = useState<any>(null);
  const [formatModalOpen, setFormatModalOpen] = useState(false);
  const [wrapperContent, setWrapperContent] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(500);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SCORE_FIELDS = ['DRIFTKORPER', 'KALIBRIERUNG', 'STROMUNG', 'KOHARENZ', 'RESONANZ', 'TIEFE'];

  useEffect(() => {
    api.getWrappers().then(data => {
      setWrappers(data.wrappers || []);
      const active = data.wrappers?.find((w: Wrapper) => w.is_active);
      if (active) {
        setSelectedWrapper(active.name);
        loadWrapperContent(active.name);
        loadFormat(active.name);
      }
    });
  }, []);

  const loadWrapperContent = async (name: string) => {
    try {
      const detail = await api.getWrapper(name);
      setWrapperContent(detail.content || '');
    } catch { setWrapperContent(''); }
  };

  const loadFormat = async (wrapperName: string) => {
    try {
      // Load wrapper meta to get format name
      const metaResponse = await api.getWrapperMeta(wrapperName);
      const formatName = metaResponse.meta?.format;
      
      if (formatName) {
        setSelectedFormat(formatName);
        // Load format details to get fields
        const formatResponse = await api.getFormat(formatName);
        setFormatDetails(formatResponse.format);
      } else {
        setSelectedFormat('');
        setFormatDetails(null);
      }
    } catch (err) {
      console.error('Failed to load format:', err);
      setSelectedFormat('');
      setFormatDetails(null);
    }
  };


  const handleWrapperChange = (name: string) => {
    setSelectedWrapper(name);
    loadWrapperContent(name);
    loadFormat(name);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateScores = (response: string): Score[] => {
    const len = response.length;
    return SCORE_FIELDS.map(field => ({
      field,
      score: Math.min(10, Math.max(5, Math.floor(Math.random() * 3) + 7 + (len > 500 ? 1 : 0))),
      maxScore: 10
    }));
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.chat({
        prompt: userMessage.content,
        mode: selectedWrapper,
        max_new_tokens: maxTokens
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        isUser: false,
        wrapper: selectedWrapper,
        latency: response.metadata.latency_ms,
        timestamp: new Date(),
        metadata: {
          input_tokens: Math.round(userMessage.content.length / 4),
          output_tokens: Math.round(response.response.length / 4),
          model: 'SYNTX-RAP',
          stop_reason: 'complete',
        },
        scores: generateScores(response.response),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: `❌ Error: ${err.message}`,
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  const wrapperOptions = wrappers.map(w => ({
    value: w.name,
    label: w.name.replace('syntex_wrapper_', '').toUpperCase(),
    badge: w.is_active ? '● AKTIV' : undefined
  }));

  const aiMessageCount = messages.filter(m => !m.isUser).length;
  const totalLatency = messages.reduce((sum, m) => sum + (m.latency || 0), 0);
  const avgLatency = aiMessageCount > 0 ? totalLatency / aiMessageCount : 0;

  return (
    <div style={{ position: 'relative' }}>
      <style>{cyberStyles}</style>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
        gap: 20,
        height: 'calc(100vh - 200px)',
        minHeight: 600
      }}>
        {/* MAIN CHAT AREA */}
        <GlassCard style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }} glowColor="#d946ef">
          
          {/* ← NEUE CHAT HEADER COMPONENT! */}
          <ChatHeader 
            messageCount={messages.length}
            responseCount={aiMessageCount}
            isHealthy={isHealthy}
            onClear={clearChat}
          />

          {/* Messages Area */}
          <div className="data-stream" style={{
            flex: 1, overflowY: 'auto', padding: 22,
            display: 'flex', flexDirection: 'column'
          }}>
            {messages.length === 0 ? (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.3)', textAlign: 'center'
              }}>
                <div style={{ 
                  position: 'relative',
                  width: 120,
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24
                }}>
                  <div className="float" style={{
                    position: 'absolute',
                    width: 140,
                    height: 140,
                    border: '2px solid transparent',
                    borderTopColor: '#00d4ff',
                    borderRightColor: '#d946ef',
                    borderRadius: '50%',
                    animation: 'spin 6s linear infinite',
                    opacity: 0.4
                  }} />
                  <div className="pulse" style={{
                    position: 'absolute',
                    width: 130,
                    height: 130,
                    background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 70%)',
                    borderRadius: '50%'
                  }} />
                  <Image src="/Logo1_trans.png" alt="SYNTX" width={100} height={100} className="float neon" style={{ filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.6)) drop-shadow(0 0 60px rgba(217,70,239,0.4))', opacity: 0.8 }} priority />
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
                <div className="glow-text" style={{
                  fontFamily: 'monospace', fontSize: 18, marginBottom: 12,
                  color: '#00d4ff', letterSpacing: 4
                }}>
                  SYNTX FIELD RESONANCE
                </div>
                <div style={{ fontSize: 13, maxWidth: 320, lineHeight: 1.7, opacity: 0.6 }}>
                  Wähle einen Wrapper und starte die Konversation
                </div>
              </div>
            ) : (
              <>
                {messages.map(msg => (
                  <MessageBubble
                    key={msg.id}
                    message={msg.content}
                    isUser={msg.isUser}
                    wrapper={msg.wrapper}
                    latency={msg.latency}
                    timestamp={msg.timestamp}
                    scores={msg.scores}
                    metadata={msg.metadata}
                    isMobile={isMobile}
                  />
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}>
                    <div style={{
                      padding: '0', borderRadius: '20px 20px 20px 4px',
                      background: 'linear-gradient(145deg, rgba(217,70,239,0.12), rgba(217,70,239,0.04))',
                      border: '1px solid rgba(217,70,239,0.4)',
                      boxShadow: '0 4px 30px rgba(217,70,239,0.15)'
                    }}>
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: 18,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nachricht eingeben... (Enter zum Senden)"
                disabled={loading}
                style={{
                  flex: 1, padding: '16px 18px', borderRadius: 14,
                  border: '1px solid rgba(0,212,255,0.4)',
                  background: 'rgba(0,0,0,0.4)',
                  color: 'white', fontSize: 14, fontFamily: 'system-ui, sans-serif',
                  resize: 'none', minHeight: 54, maxHeight: 150, outline: 'none',
                  boxShadow: input ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="cyber-btn"
                style={{
                  padding: '16px 32px', borderRadius: 14, border: 'none',
                  background: loading || !input.trim()
                    ? 'rgba(255,255,255,0.1)'
                    : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
                  color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#030b15',
                  fontWeight: 800, fontFamily: 'monospace', fontSize: 18,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  boxShadow: loading || !input.trim() ? 'none' : '0 0 40px rgba(0,212,255,0.5)',
                }}
              >
                {loading ? '...' : '→'}
              </button>
            </div>
          </div>
        </GlassCard>


        {/* SIDEBAR */}
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
            
            <GlassCard style={{ padding: 16, position: 'relative', zIndex: 500 }} glowColor="#f59e0b">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span className="pulse">📦</span> WRAPPER
              </div>
              <CyberDropdown
                options={wrapperOptions}
                selected={selectedWrapper}
                onSelect={handleWrapperChange}
                color="#f59e0b"
                zIndex={500}
                showFullName={true}
              />
            </GlassCard>
            <FormatCard
              selectedFormat={selectedFormat}
              formatDetails={formatDetails}
              onOpenModal={() => setFormatModalOpen(true)}
            />

            <GlassCard style={{ padding: 16 }} glowColor="#00d4ff">
              <LivePromptPreview wrapperContent={wrapperContent} />
            </GlassCard>

            <GlassCard style={{ padding: 16 }} glowColor="#00d4ff">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                ⚙️ SETTINGS
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                Max Tokens: <span style={{ color: '#00d4ff', fontWeight: 700 }}>{maxTokens}</span>
              </div>
              <input
                type="range" min={50} max={2000} value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#00d4ff', cursor: 'pointer' }}
              />
            </GlassCard>

            <GlassCard style={{ padding: 16 }} glowColor="#00d4ff">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span className="pulse">📊</span> SESSION
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <div className="float" style={{
                  textAlign: 'center', padding: 12,
                  background: 'rgba(0,212,255,0.1)', borderRadius: 10,
                  border: '1px solid rgba(0,212,255,0.2)'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>
                    {aiMessageCount}
                  </div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Responses</div>
                </div>
                <div className="float" style={{
                  textAlign: 'center', padding: 12,
                  background: 'rgba(245,158,11,0.1)', borderRadius: 10,
                  border: '1px solid rgba(245,158,11,0.2)',
                  animationDelay: '0.1s'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace' }}>
                    {(totalLatency / 1000).toFixed(1)}s
                  </div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Total</div>
                </div>
                <div className="float" style={{
                  textAlign: 'center', padding: 12,
                  background: 'rgba(16,185,129,0.1)', borderRadius: 10,
                  border: '1px solid rgba(16,185,129,0.2)',
                  animationDelay: '0.2s'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
                    {(avgLatency / 1000).toFixed(1)}s
                  </div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Avg</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard style={{ padding: 16, flex: 1 }} glowColor="#10b981">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span className="pulse">🏆</span> SESSION SCORES
              </div>
              <SessionScoreOverview messages={messages} />
            </GlassCard>
          </div>
        )}
      <FormatModal
        isOpen={formatModalOpen}
        onClose={() => setFormatModalOpen(false)}
        formatName={selectedFormat}
        formatDetails={formatDetails}
      />
      </div>
    </div>
  );
}
```

### 📄 src/components/chat/components/ChatHeader.tsx
```typescript
"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════
// 🎨 CHAT HEADER - NEURAL NETWORK STYLE (wie Login Page)
// ═══════════════════════════════════════════════════════════════

interface ChatHeaderProps {
  messageCount: number;
  responseCount: number;
  isHealthy: boolean;
  onClear: () => void;
}

// ═══════════════════════════════════════════════════════════════
// 🌊 NEURAL NETWORK PARTICLES (wie Login Page)
// ═══════════════════════════════════════════════════════════════

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Responsive canvas size
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    const particles: Particle[] = [];
    const particleCount = 40; // Mehr Particles für dichteres Netz
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        
        // Draw particle
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections (Neural Network style)
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) { // Connection threshold
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.5
      }}
    />
  );
}

export default function ChatHeader({ 
  messageCount, 
  responseCount, 
  isHealthy,
  onClear 
}: ChatHeaderProps) {
  return (
    <div style={{
      padding: '20px 22px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      background: 'rgba(6,13,24,0.8)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Neural Network Background */}
      <NeuralNetworkCanvas />
      
      {/* Center: Logo + Title */}
      <div style={{ 
        flex: 1,
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: 10,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo with Ring (wie Login) */}
        <div style={{
          position: 'relative',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Ring around logo */}
          <div style={{
            position: 'absolute',
            width: 56,
            height: 56,
            border: '2px solid rgba(0,212,255,0.3)',
            borderRadius: '50%'
          }} />
          
          {/* Logo */}
          <Image 
            src="/Logo1_trans.png" 
            alt="SYNTX" 
            width={40}
            height={40}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.5))'
            }}
            priority
          />
        </div>

        {/* Title */}
        <h2 style={{
          margin: 0,
          fontFamily: 'monospace',
          fontSize: 24,
          background: 'linear-gradient(135deg, #00d4ff 0%, #d946ef 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 6,
          fontWeight: 900,
          lineHeight: 1.2,
          textTransform: 'uppercase'
        }}>
          SYNTX CHAT
        </h2>
        
        {/* Stats */}
        <div style={{ 
          fontSize: 10, 
          color: 'rgba(255,255,255,0.4)', 
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>{messageCount} Messages</span>
          <span>•</span>
          <span>{responseCount} AI</span>
        </div>
      </div>

      {/* Right: Health + Clear */}
      <div style={{ 
        position: 'absolute',
        top: 16,
        right: 20,
        display: 'flex', 
        alignItems: 'center', 
        gap: 10,
        zIndex: 1
      }}>
        {/* Health Badge */}
        <div style={{
          padding: '6px 12px',
          borderRadius: 16,
          background: isHealthy 
            ? 'rgba(16,185,129,0.15)'
            : 'rgba(239,68,68,0.15)',
          border: `1px solid ${isHealthy ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span style={{ 
            fontSize: 6,
            color: isHealthy ? '#10b981' : '#ef4444'
          }}>
            ●
          </span>
          <span style={{
            fontSize: 9,
            fontFamily: 'monospace',
            fontWeight: 600,
            color: isHealthy ? '#10b981' : '#ef4444',
            letterSpacing: 0.5
          }}>
            {isHealthy ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        {/* Clear Button */}
        <button 
          onClick={onClear} 
          className="cyber-btn" 
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 8, 
            padding: '6px 14px',
            color: '#ef4444', 
            cursor: 'pointer',
            fontFamily: 'monospace', 
            fontSize: 10, 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}
```

### 📄 src/components/chat/components/index.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// 🌊 CHAT COMPONENTS - EXPORT INDEX
// ═══════════════════════════════════════════════════════════════

export { default as ChatHeader } from './ChatHeader';
```

### 📄 src/components/chat/hooks/index.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// 🌊 CHAT HOOKS - EXPORT INDEX
// ═══════════════════════════════════════════════════════════════

export { useHealthCheck, useHealthAnimation } from './useHealthCheck';
```

### 📄 src/components/chat/hooks/useHealthCheck.tsx
```typescript
"use client";

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// 🌊 HEALTH CHECK HOOK - RESONANZ STATUS TRACKER
// ═══════════════════════════════════════════════════════════════
// Überwacht Backend-Health in Echtzeit mit automatischem Retry
// Bei Offline: Exponential Backoff (5s → 10s → 20s → max 60s)
// Bei Online: Regular Ping (alle 30s)
// ═══════════════════════════════════════════════════════════════

interface HealthStatus {
  isHealthy: boolean;
  lastCheck: Date | null;
  failCount: number;
  responseTime: number | null;
}

interface UseHealthCheckReturn {
  isHealthy: boolean;
  lastCheck: Date | null;
  failCount: number;
  responseTime: number | null;
  checkNow: () => Promise<boolean>;  // ← FIXED: Returns boolean
}

const PING_INTERVAL_HEALTHY = 30000;  // 30s wenn healthy
const PING_INTERVAL_OFFLINE_BASE = 5000;  // Start bei 5s wenn offline
const PING_INTERVAL_OFFLINE_MAX = 60000;  // Max 60s backoff
const BACKOFF_MULTIPLIER = 2;  // Exponential backoff

export function useHealthCheck(): UseHealthCheckReturn {
  const [status, setStatus] = useState<HealthStatus>({
    isHealthy: false,
    lastCheck: null,
    failCount: 0,
    responseTime: null
  });

  const checkHealth = useCallback(async (): Promise<boolean> => {
    const startTime = Date.now();
    
    try {
      // Try resonanz health endpoint first (preferred)
      await api.getResonanzHealth();
      
      const responseTime = Date.now() - startTime;
      
      setStatus({
        isHealthy: true,
        lastCheck: new Date(),
        failCount: 0,
        responseTime
      });
      
      return true;
    } catch (error) {
      // Fallback: Try wrapper health
      try {
        await api.getWrapperHealth();
        
        const responseTime = Date.now() - startTime;
        
        setStatus({
          isHealthy: true,
          lastCheck: new Date(),
          failCount: 0,
          responseTime
        });
        
        return true;
      } catch (fallbackError) {
        // Both failed - mark as offline
        setStatus(prev => ({
          isHealthy: false,
          lastCheck: new Date(),
          failCount: prev.failCount + 1,
          responseTime: null
        }));
        
        return false;
      }
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkHealth();

    // Setup interval with dynamic timing
    const setupInterval = () => {
      const interval = status.isHealthy
        ? PING_INTERVAL_HEALTHY
        : Math.min(
            PING_INTERVAL_OFFLINE_BASE * Math.pow(BACKOFF_MULTIPLIER, status.failCount),
            PING_INTERVAL_OFFLINE_MAX
          );

      return setInterval(checkHealth, interval);
    };

    const intervalId = setupInterval();

    return () => clearInterval(intervalId);
  }, [checkHealth, status.isHealthy, status.failCount]);

  return {
    isHealthy: status.isHealthy,
    lastCheck: status.lastCheck,
    failCount: status.failCount,
    responseTime: status.responseTime,
    checkNow: checkHealth
  };
}

// ═══════════════════════════════════════════════════════════════
// 🔥 ADDITIONAL HOOK: HEALTH STATUS ANIMATOR
// ═══════════════════════════════════════════════════════════════
// Provides animated state transitions for health status changes
// ═══════════════════════════════════════════════════════════════

interface UseHealthAnimationReturn {
  pulseIntensity: number;  // 0-1 für pulse animation
  glowColor: string;       // Dynamic glow color
  statusText: string;      // Animated status text
}

export function useHealthAnimation(isHealthy: boolean, failCount: number): UseHealthAnimationReturn {
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    if (!isHealthy) {
      // Faster pulse when offline
      const interval = setInterval(() => {
        setPulseIntensity(prev => prev === 1 ? 0.4 : 1);
      }, 800);
      return () => clearInterval(interval);
    } else {
      // Slow pulse when online
      const interval = setInterval(() => {
        setPulseIntensity(prev => prev === 1 ? 0.7 : 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHealthy]);

  const glowColor = isHealthy 
    ? '#10b981'  // Green
    : failCount > 5 
      ? '#ef4444'  // Red (many fails)
      : '#f59e0b'; // Orange (few fails)

  const statusText = isHealthy
    ? 'RESONANCE ACTIVE'
    : failCount > 5
      ? 'CONNECTION LOST'
      : 'RECONNECTING...';

  return {
    pulseIntensity,
    glowColor,
    statusText
  };
}
```

### 📄 src/components/chat/index.ts
```typescript
export { ChatInterface } from './ChatInterface';
```

### 📄 src/components/chat/sidebar/FormatCard.tsx
```typescript
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';

interface FormatCardProps {
  selectedFormat: string;
  formatDetails: any;
  onOpenModal: () => void;
}

export function FormatCard({ selectedFormat, formatDetails, onOpenModal }: FormatCardProps) {
  return (
    <GlassCard style={{ padding: 16 }} variant={selectedFormat ? "magenta" : "default"}>
      <div style={{
        fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
        marginBottom: 12, letterSpacing: 2,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
        <span className={selectedFormat ? "pulse" : "blink"}>
          {selectedFormat ? "📋" : "⚠️"}
        </span> FORMAT
      </div>
      
      {selectedFormat ? (
        <>
          <button
            onClick={onOpenModal}
            className="cyber-btn"
            style={{
              width: '100%', padding: '14px 16px', borderRadius: 12,
              border: '1px solid rgba(217,70,239,0.5)',
              background: 'linear-gradient(135deg, rgba(217,70,239,0.20), rgba(217,70,239,0.05))',
              color: '#d946ef', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 0 20px rgba(217,70,239,0.2)',
              transition: 'all 0.3s ease',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1
            }}
          >
            <span>{selectedFormat}</span>
            <span style={{ fontSize: 10, opacity: 0.6 }}>👁️ VIEW</span>
          </button>
          {formatDetails && (
            <div style={{ marginTop: 10, fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
              {formatDetails.fields?.length || 0} Fields
            </div>
          )}
        </>
      ) : (
        <div className="blink" style={{
          padding: '16px',
          borderRadius: 12,
          border: '2px solid #ef4444',
          background: 'rgba(239,68,68,0.15)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🚨</div>
          <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>
            KEIN FORMAT GEBUNDEN
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>
            Wrapper hat kein Format!
          </div>
        </div>
      )}
    </GlassCard>
  );
}
```

### 📄 src/components/chat/sidebar/FormatModal.tsx
```typescript
import React from 'react';

interface FormatModalProps {
  isOpen: boolean;
  onClose: () => void;
  formatName: string;
  formatDetails: any;
}

export function FormatModal({ isOpen, onClose, formatName, formatDetails }: FormatModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* BLACK Background with Neural Network */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000000',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease'
        }}
      />
      
      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        width: '90%',
        maxWidth: 900,
        height: '85vh',
        background: 'linear-gradient(145deg, rgba(5,10,20,0.98), rgba(2,5,10,0.98))',
        border: '1px solid rgba(217,70,239,0.5)',
        borderRadius: 24,
        boxShadow: '0 0 100px rgba(217,70,239,0.5), 0 0 200px rgba(0,212,255,0.3)',
        animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Neural Network INSIDE Modal Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(217,70,239,0.08) 1px, transparent 1px),
            linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5,
          pointerEvents: 'none'
        }} />
        
        {/* Floating Neural Nodes */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 15% 20%, rgba(217,70,239,0.25) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(0,212,255,0.2) 0%, transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(217,70,239,0.15) 0%, transparent 30%)
          `,
          animation: 'neuralPulse 6s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
        
        {/* Animated border glow */}
        <div style={{
          position: 'absolute',
          inset: -2,
          background: 'linear-gradient(45deg, #d946ef, #00d4ff, #d946ef)',
          backgroundSize: '200% 200%',
          animation: 'borderGlow 3s ease infinite',
          borderRadius: 24,
          zIndex: -1,
          opacity: 0.6
        }} />

        {/* Header */}
        <div style={{
          padding: '28px 36px',
          borderBottom: '1px solid rgba(217,70,239,0.3)',
          background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(0,212,255,0.1))',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            animation: 'shimmer 3s ease-in-out infinite'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div>
              <div style={{ 
                fontSize: 28, 
                fontWeight: 900, 
                background: 'linear-gradient(135deg, #d946ef, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'monospace',
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 8
              }}>
                📋 {formatName}
              </div>
              <div style={{ 
                fontSize: 13, 
                color: 'rgba(255,255,255,0.6)', 
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span className="pulse" style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'inline-block'
                }} />
                {formatDetails?.fields?.length || 0} Active Fields
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: '1px solid rgba(239,68,68,0.5)',
                background: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
                fontSize: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontWeight: 700
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.3)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          padding: '32px 36px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 20,
          overflowY: 'auto',
          alignContent: 'start',
          position: 'relative'
        }}>
          {formatDetails?.fields?.map((field: any, index: number) => (
            <div 
              key={field.name}
              className="field-card"
              style={{
                padding: 24,
                background: `linear-gradient(145deg, rgba(217,70,239,${index % 2 === 0 ? '0.06' : '0.04'}), rgba(0,0,0,0.6))`,
                borderRadius: 16,
                border: '1px solid rgba(217,70,239,0.3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                animation: `fieldSlideIn 0.4s ease ${index * 0.05}s backwards`
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(217,70,239,0.6)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(217,70,239,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(217,70,239,0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                height: 2,
                background: 'linear-gradient(90deg, #d946ef, #00d4ff)',
                opacity: 0.5
              }} />

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: 16
              }}>
                <div style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#d946ef',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}>
                  {field.name}
                </div>
                <div style={{
                  padding: '8px 18px',
                  borderRadius: 10,
                  background: 'rgba(217,70,239,0.25)',
                  border: '1px solid rgba(217,70,239,0.5)',
                  fontSize: 16,
                  fontWeight: 900,
                  color: '#d946ef',
                  fontFamily: 'monospace',
                  letterSpacing: 1
                }}>
                  ⚡ {field.weight || 1.0}
                </div>
              </div>

              {field.description && (
                <div style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  fontFamily: 'system-ui',
                  marginBottom: 12
                }}>
                  {field.description}
                </div>
              )}

              {field.enabled !== undefined && (
                <div style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: field.enabled ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  border: `1px solid ${field.enabled ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 11,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: field.enabled ? '#10b981' : '#ef4444'
                }}>
                  <span className="pulse" style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: field.enabled ? '#10b981' : '#ef4444'
                  }} />
                  {field.enabled ? 'ACTIVE' : 'INACTIVE'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px 36px',
          borderTop: '1px solid rgba(217,70,239,0.3)',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace'
          }}>
            SYNTX FIELD SYSTEM v3.0
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '14px 36px',
              borderRadius: 12,
              border: '1px solid rgba(217,70,239,0.5)',
              background: 'linear-gradient(135deg, rgba(217,70,239,0.3), rgba(217,70,239,0.1))',
              color: '#d946ef',
              fontSize: 14,
              fontWeight: 800,
              fontFamily: 'monospace',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: 2
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(217,70,239,0.5), rgba(217,70,239,0.25))';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(217,70,239,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(217,70,239,0.3), rgba(217,70,239,0.1))';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            CLOSE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes fieldSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes neuralPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
```

### 📄 src/components/chat/sidebar/LivePromptCard.tsx
```typescript
```

### 📄 src/components/chat/sidebar/SessionScoresCard.tsx
```typescript
```

### 📄 src/components/chat/sidebar/SessionStatsCard.tsx
```typescript
```

### 📄 src/components/chat/sidebar/SettingsCard.tsx
```typescript
```

### 📄 src/components/data/DataPanel.tsx
```typescript
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import { api, StatsResponse, StreamEvent } from '@/lib/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Scatter
} from 'recharts';

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
};

const WRAPPER_COLORS: Record<string, string> = {
  'syntex_wrapper_sigma': '#f59e0b',
  'syntex_wrapper_human': '#10b981',
  'syntex_wrapper_deepsweep': '#d946ef',
  'syntex_wrapper_true_raw': '#ef4444',
  'syntex_wrapper_frontend': '#00d4ff',
};

function DataBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.02 }}>
        <defs>
          <pattern id="dataGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dataGrid)" />
      </svg>
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4, height: 4,
          borderRadius: '50%',
          background: ['#00d4ff', '#d946ef', '#10b981'][i % 3],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.3,
          animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

function GlassCard({ children, title, icon, glowColor = '#00d4ff', span = 1, height }: any) {
  return (
    <div style={{
      gridColumn: `span ${span}`,
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      height: height || 'auto',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }} />
      {title && (
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.2)' }}>
          {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
          <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 11, color: glowColor, letterSpacing: 2 }}>{title}</h3>
        </div>
      )}
      <div style={{ padding: 20, height: height ? 'calc(100% - 60px)' : 'auto' }}>{children}</div>
    </div>
  );
}

function StatBox({ label, value, icon, color, suffix = '' }: any) {
  return (
    <div style={{
      padding: 20,
      background: `linear-gradient(135deg, ${color}10, ${color}05)`,
      border: `1px solid ${color}30`,
      borderRadius: 16,
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${color}15, transparent)` }} />
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div style={{ fontSize: 36, fontWeight: 800, color, fontFamily: 'monospace', margin: '12px 0 6px' }}>{value}{suffix}</div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', letterSpacing: 1 }}>{label}</div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(10,26,46,0.98)', border: '1px solid rgba(0,212,255,0.4)', borderRadius: 12, padding: '14px 18px', boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'white' }}>{p.name}: <strong style={{ color: p.color }}>{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</strong></span>
        </div>
      ))}
    </div>
  );
}

function ActivityHeatmap({ events }: { events: StreamEvent[] }) {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const activity = React.useMemo(() => {
    const grid: number[][] = Array(7).fill(null).map(() => Array(24).fill(0));
    events.forEach(e => {
      const d = new Date(e.timestamp);
      grid[(d.getDay() + 6) % 7][d.getHours()]++;
    });
    return grid;
  }, [events]);
  const maxVal = Math.max(...activity.flat(), 1);

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 8 }}>
        {days.map(d => <div key={d} style={{ height: 16, fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>{d}</div>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activity.map((row, di) => (
          <div key={di} style={{ display: 'flex', gap: 2 }}>
            {row.map((val, hi) => (
              <div key={hi} style={{ width: 16, height: 16, borderRadius: 3, background: val === 0 ? 'rgba(255,255,255,0.03)' : `rgba(0, 212, 255, ${0.2 + (val / maxVal) * 0.8})` }} title={`${days[di]} ${hi}:00 - ${val}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveFeed({ events }: { events: StreamEvent[] }) {
  return (
    <div style={{ maxHeight: 300, overflow: 'auto' }}>
      {events.slice(0, 10).map((event, i) => (
        <div key={event.request_id + i} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
          background: i === 0 ? 'rgba(0,212,255,0.05)' : 'transparent',
          borderLeft: `3px solid ${WRAPPER_COLORS[event.wrapper_chain?.[0] as keyof typeof WRAPPER_COLORS] || '#00d4ff'}`,
          marginBottom: 4, borderRadius: '0 8px 8px 0',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: event.latency_ms ? '#10b981' : '#f59e0b' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'white' }}>{event.stage}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{event.request_id.slice(0, 8)}...</div>
          </div>
          {event.latency_ms && <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#f59e0b' }}>{(event.latency_ms / 1000).toFixed(1)}s</div>}
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{new Date(event.timestamp).toLocaleTimeString('de-DE')}</div>
        </div>
      ))}
    </div>
  );
}

export default function DataPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [statsData, streamData] = await Promise.all([api.getStats(), api.getStream(200)]);
      setStats(statsData);
      setEvents(streamData.events || []);
      setLastUpdate(new Date());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const latencyTimeline = React.useMemo(() => {
    const grouped = events.reduce((acc, event) => {
      if (!acc[event.request_id]) acc[event.request_id] = { id: event.request_id.slice(0, 8), timestamp: new Date(event.timestamp), latency: 0, wrapper: event.wrapper_chain?.[0] || 'unknown' };
      if (event.latency_ms) acc[event.request_id].latency = event.latency_ms / 1000;
      return acc;
    }, {} as Record<string, any>);
    return Object.values(grouped).sort((a: any, b: any) => a.timestamp - b.timestamp).slice(-20).map((d: any) => ({ ...d, time: d.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }));
  }, [events]);

  const wrapperPieData = React.useMemo(() => {
    if (!stats?.wrapper_usage) return [];
    return Object.entries(stats.wrapper_usage).map(([name, value]) => ({ name: name.replace('syntex_wrapper_', '').toUpperCase(), value, fullName: name }));
  }, [stats]);

  const latencyByWrapper = React.useMemo(() => {
    const grouped = latencyTimeline.reduce((acc: any, d: any) => {
      const name = d.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'UNKNOWN';
      if (!acc[name]) acc[name] = { name, total: 0, count: 0 };
      acc[name].total += d.latency; acc[name].count += 1;
      return acc;
    }, {});
    return Object.values(grouped).map((d: any) => ({ name: d.name, avg: d.total / d.count, count: d.count }));
  }, [latencyTimeline]);

  const radarData = React.useMemo(() => latencyByWrapper.map(w => ({ wrapper: w.name, speed: Math.max(0, 100 - (w.avg * 2)), volume: w.count * 10 })), [latencyByWrapper]);

  const stageDistribution = React.useMemo(() => {
    const stages: Record<string, number> = {};
    events.forEach(e => { stages[e.stage] = (stages[e.stage] || 0) + 1; });
    return Object.entries(stages).map(([name, value]) => ({ name: name.replace(/^\d_/, ''), value }));
  }, [events]);

  if (loading) return <div style={{ position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DataBackground /><div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>LOADING...</div></div>;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <DataBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32 }}>📊</div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 18, color: '#8b5cf6', letterSpacing: 3 }}>DATA COMMAND CENTER</h2>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Real-time Field Resonance Analytics</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#10b981' }}>LIVE</span>
            </div>
            {lastUpdate && <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>Updated: {lastUpdate.toLocaleTimeString('de-DE')}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
          <StatBox label="Total Requests" value={stats?.total_requests || 0} icon="📡" color={COLORS.cyan} />
          <StatBox label="Success Rate" value={stats?.success_rate || 0} suffix="%" icon="✅" color={COLORS.green} />
          <StatBox label="Avg Latency" value={((stats?.average_latency_ms || 0) / 1000).toFixed(1)} suffix="s" icon="⚡" color={COLORS.orange} />
          <StatBox label="Wrappers" value={Object.keys(stats?.wrapper_usage || {}).length} icon="📦" color={COLORS.magenta} />
          <StatBox label="Events" value={events.length} icon="🌊" color={COLORS.purple} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassCard title="Latency Timeline" icon="📈" glowColor={COLORS.cyan} height={350}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={latencyTimeline}>
                <defs><linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.4}/><stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => `${v}s`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="latency" stroke={COLORS.cyan} strokeWidth={2} fill="url(#latencyGrad)" name="Latency (s)" />
                <Scatter dataKey="latency" fill={COLORS.cyan} />
              </ComposedChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard title="Wrapper Distribution" icon="🍩" glowColor={COLORS.magenta} height={350}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={wrapperPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                  {wrapperPieData.map((entry, i) => <Cell key={i} fill={WRAPPER_COLORS[entry.fullName] || COLORS.cyan} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 10 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassCard title="Latency by Wrapper" icon="📊" glowColor={COLORS.orange} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyByWrapper} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avg" name="Avg (s)" radius={[0, 8, 8, 0]}>{latencyByWrapper.map((e, i) => <Cell key={i} fill={WRAPPER_COLORS[`syntex_wrapper_${e.name.toLowerCase()}`] || COLORS.cyan} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard title="Wrapper Performance" icon="🎯" glowColor={COLORS.purple} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="wrapper" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <Radar name="Speed" dataKey="speed" stroke={COLORS.cyan} fill={COLORS.cyan} fillOpacity={0.3} />
                <Radar name="Volume" dataKey="volume" stroke={COLORS.magenta} fill={COLORS.magenta} fillOpacity={0.3} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard title="Pipeline Stages" icon="🔄" glowColor={COLORS.green} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={8} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Count" fill={COLORS.green} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <GlassCard title="Activity Heatmap" icon="🗓️" glowColor={COLORS.cyan}><ActivityHeatmap events={events} /></GlassCard>
          <GlassCard title="Live Event Feed" icon="📡" glowColor={COLORS.green}><LiveFeed events={events} /></GlassCard>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
}```

### 📄 src/components/diff/DiffPanel.tsx
```typescript
"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 COLORS
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  yellow: '#eab308'
};

const WRAPPER_COLORS = [COLORS.cyan, COLORS.magenta, COLORS.green, COLORS.orange, COLORS.purple];

// ═══════════════════════════════════════════════════════════════════════════
// 🔀 INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface Wrapper {
  name: string;
  is_active: boolean;
}

interface DiffComparison {
  wrapper: string;
  response: string;
  latency_ms: number;
  format_fields: string[];
  error?: string;
}

interface DiffResult {
  prompt: string;
  comparisons: DiffComparison[];
  diff_analysis: {
    total_comparisons: number;
    successful: number;
    failed: number;
    avg_response_length: number;
    total_latency_ms: number;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔀 MAIN DIFF PANEL
// ═══════════════════════════════════════════════════════════════════════════

export default function DiffPanel() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [selectedWrappers, setSelectedWrappers] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('Was ist System?');
  const [maxTokens, setMaxTokens] = useState(100);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [result, setResult] = useState<DiffResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Load wrappers
  useEffect(() => {
    api.getWrappers().then((data: any) => {
      setWrappers(data.wrappers || []);
      // Pre-select first 2 wrappers
      if (data.wrappers?.length >= 2) {
        setSelectedWrappers([data.wrappers[0].name, data.wrappers[1].name]);
      }
      setLoading(false);
    }).catch(console.error);
  }, []);

  // Toggle wrapper selection
  const toggleWrapper = (name: string) => {
    setSelectedWrappers(prev => {
      if (prev.includes(name)) {
        return prev.filter(w => w !== name);
      }
      if (prev.length >= 4) {
        return prev; // Max 4 wrappers
      }
      return [...prev, name];
    });
  };

  // Run diff comparison
  const handleCompare = async () => {
    if (!prompt.trim() || selectedWrappers.length < 2) return;
    
    console.log("DIFF COMPARE", { prompt, wrappers: selectedWrappers });
    
    setComparing(true);
    setGlowIntensity(100);
    setShowResult(false);
    
    try {
      const data = await api.diff({
        prompt,
        wrappers: selectedWrappers,
        max_new_tokens: maxTokens
      });
      
      setTimeout(() => {
        setResult(data as any);
        setShowResult(true);
      }, 300);
    } catch (e) {
      console.error(e);
    } finally {
      setComparing(false);
      setTimeout(() => setGlowIntensity(0), 1000);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 100 }}>
        <div style={{ fontSize: 72, animation: 'pulse 1s infinite' }}>🔀</div>
        <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.purple, marginTop: 24 }}>
          LADE PARALLELWELTEN...
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: 24,
            background: `linear-gradient(135deg, ${COLORS.purple}40, ${COLORS.cyan}20)`,
            border: `2px solid ${COLORS.purple}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42,
            boxShadow: `0 0 60px ${COLORS.purple}40`,
            animation: 'pulse 2s infinite'
          }}>🔀</div>
          <h2 style={{ 
            margin: 0, fontFamily: 'monospace', fontSize: 42, fontWeight: 900, letterSpacing: 8,
            background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.cyan}, ${COLORS.magenta})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            DIFF ZONE
          </h2>
        </div>
        <div style={{ fontSize: 16, fontFamily: 'monospace', color: COLORS.cyan }}>
          Wrapper Parallelwelt-Vergleich
        </div>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
          Gleicher Prompt → Verschiedene Wrapper → Vergleiche die Resonanz
        </div>
      </div>

      {/* WRAPPER SELECTION */}
      <div style={{ 
        padding: 24, borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 24
      }}>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.purple, marginBottom: 16, letterSpacing: 2 }}>
          📦 WRAPPERS AUSWÄHLEN (2-4)
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {wrappers.map((wrapper, idx) => {
            const isSelected = selectedWrappers.includes(wrapper.name);
            const selectionIndex = selectedWrappers.indexOf(wrapper.name);
            const color = isSelected ? WRAPPER_COLORS[selectionIndex % WRAPPER_COLORS.length] : 'rgba(255,255,255,0.3)';
            
            return (
              <button
                key={wrapper.name}
                onClick={() => toggleWrapper(wrapper.name)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: `2px solid ${color}`,
                  background: isSelected ? `${color}20` : 'transparent',
                  color: color,
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: isSelected ? 800 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: isSelected ? `0 0 20px ${color}30` : 'none'
                }}
              >
                {isSelected && <span style={{ 
                  width: 24, height: 24, borderRadius: '50%', 
                  background: color, color: 'black',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 900
                }}>{selectionIndex + 1}</span>}
                {wrapper.name.replace('syntex_wrapper_', '').toUpperCase()}
                {wrapper.is_active && <span style={{ fontSize: 10 }}>⚡</span>}
              </button>
            );
          })}
        </div>
        {selectedWrappers.length < 2 && (
          <div style={{ marginTop: 12, fontSize: 13, color: COLORS.orange }}>
            ⚠️ Wähle mindestens 2 Wrappers für den Vergleich
          </div>
        )}
      </div>

      {/* PROMPT INPUT */}
      <div style={{ 
        padding: 24, borderRadius: 20,
        background: `linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))`,
        border: `2px solid ${COLORS.purple}40`,
        boxShadow: glowIntensity > 0 ? `0 0 ${60 + glowIntensity}px ${COLORS.purple}50` : `0 0 40px ${COLORS.purple}20`,
        marginBottom: 24,
        transition: 'box-shadow 0.3s ease'
      }}>
        <div style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.cyan, marginBottom: 16, letterSpacing: 2 }}>
          💬 PROMPT
        </div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Gib deinen Prompt ein..."
          style={{
            width: '100%',
            minHeight: 100,
            padding: 16,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: 16,
            resize: 'vertical',
            outline: 'none'
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 4 }}>
              Max Tokens
            </label>
            <input
              type="number"
              value={maxTokens}
              onChange={e => setMaxTokens(Number(e.target.value))}
              min={30}
              max={500}
              style={{
                width: 100,
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 14
              }}
            />
          </div>
          
          <button
            onClick={handleCompare}
            disabled={comparing || selectedWrappers.length < 2 || !prompt.trim()}
            style={{
              flex: 1,
              padding: '16px 32px',
              borderRadius: 16,
              border: `2px solid ${COLORS.purple}`,
              background: comparing 
                ? `${COLORS.purple}30`
                : `linear-gradient(135deg, ${COLORS.purple}40, ${COLORS.cyan}20)`,
              color: COLORS.purple,
              fontFamily: 'monospace',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 3,
              cursor: comparing ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: `0 0 30px ${COLORS.purple}30`,
              transition: 'all 0.3s ease',
              opacity: (selectedWrappers.length < 2 || !prompt.trim()) ? 0.5 : 1
            }}
          >
            <span style={{ fontSize: 24 }}>🔀</span>
            {comparing ? `VERGLEICHE ${selectedWrappers.length} WELTEN...` : 'PARALLELWELTEN ÖFFNEN'}
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {result && showResult && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          
          {/* ANALYSIS SUMMARY */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: 16, 
            marginBottom: 24 
          }}>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.green}15`, border: `1px solid ${COLORS.green}40` }}>
              <div style={{ fontSize: 28, color: COLORS.green, fontWeight: 900, fontFamily: 'monospace' }}>
                {result.diff_analysis.successful}/{result.diff_analysis.total_comparisons}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Erfolgreich</div>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.orange}15`, border: `1px solid ${COLORS.orange}40` }}>
              <div style={{ fontSize: 28, color: COLORS.orange, fontWeight: 900, fontFamily: 'monospace' }}>
                {(result.diff_analysis?.total_latency_ms ? (result.diff_analysis?.total_latency_ms ? (result.diff_analysis.total_latency_ms / 1000).toFixed(1) : "0") : "0")}s
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Total Latency</div>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}40` }}>
              <div style={{ fontSize: 28, color: COLORS.cyan, fontWeight: 900, fontFamily: 'monospace' }}>
                {result.diff_analysis.avg_response_length}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Ø Zeichen</div>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}40` }}>
              <div style={{ fontSize: 28, color: COLORS.purple, fontWeight: 900, fontFamily: 'monospace' }}>
                {result.comparisons.length}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Parallelwelten</div>
            </div>
          </div>

          {/* COMPARISON GRID */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${Math.min(result.comparisons.length, 3)}, 1fr)`,
            gap: 16
          }}>
            {result.comparisons.map((comp, idx) => {
              const color = WRAPPER_COLORS[idx % WRAPPER_COLORS.length];
              
              return (
                <div 
                  key={comp.wrapper}
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
                    border: `2px solid ${color}40`,
                    boxShadow: `0 0 30px ${color}20`
                  }}
                >
                  {/* Wrapper Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${color}30`,
                      border: `2px solid ${color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, fontWeight: 900, color: color
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ 
                        fontFamily: 'monospace', fontSize: 16, fontWeight: 800, 
                        color: color, letterSpacing: 1 
                      }}>
                        {comp.wrapper.replace('syntex_wrapper_', '').toUpperCase()}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                        ⚡ {(comp.latency_ms / 1000).toFixed(1)}s
                      </div>
                    </div>
                  </div>

                  {/* Response */}
                  <div style={{
                    padding: 16,
                    borderRadius: 12,
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    maxHeight: 400,
                    overflow: 'auto'
                  }}>
                    <pre style={{
                      margin: 0,
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.85)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontFamily: 'monospace',
                      lineHeight: 1.6
                    }}>
                      {comp.response || comp.error || 'Keine Antwort'}
                    </pre>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 6,
                      background: `${color}20`,
                      fontSize: 11, color: color, fontFamily: 'monospace'
                    }}>
                      {comp.response?.length || 0} chars
                    </span>
                    {comp.format_fields?.length > 0 && (
                      <span style={{
                        padding: '4px 10px', borderRadius: 6,
                        background: `${COLORS.orange}20`,
                        fontSize: 11, color: COLORS.orange, fontFamily: 'monospace'
                      }}>
                        {comp.format_fields.length} Felder
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Comparing Animation */}
      {comparing && (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: 72, animation: 'pulse 0.5s infinite' }}>🔀</div>
          <div style={{ 
            fontFamily: 'monospace', fontSize: 18, color: COLORS.purple, 
            marginTop: 24, animation: 'pulse 1s infinite' 
          }}>
            ÖFFNE {selectedWrappers.length} PARALLELWELTEN...
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            Dies kann {selectedWrappers.length * 10}-{selectedWrappers.length * 30} Sekunden dauern
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
```

### 📄 src/components/diff/index.ts
```typescript
export { default as DiffPanel } from "./DiffPanel";
```

### 📄 src/components/flow/FieldFlowVisualizer.tsx
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';

interface Stage {
  number: number;
  label: string;
  icon: string;
  color: string;
}

const STAGES: Stage[] = [
  { number: 1, label: 'INCOMING', icon: '░░', color: 'from-gray-500 to-gray-600' },
  { number: 2, label: 'WRAPPERS', icon: '▓▓', color: 'from-blue-500 to-blue-600' },
  { number: 3, label: 'CALIBRATE', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
  { number: 4, label: 'BACKEND', icon: '██', color: 'from-fuchsia-500 to-fuchsia-600' },
  { number: 5, label: 'RESPONSE', icon: '🌊', color: 'from-syntx-cyan to-cyan-400' },
];

interface FieldFlowVisualizerProps {
  activeStage?: number;
  processing?: boolean;
  onStageClick?: (stage: number) => void;
}

export function FieldFlowVisualizer({ 
  activeStage = 0, 
  processing = false,
  onStageClick 
}: FieldFlowVisualizerProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted mb-6 flex items-center gap-2">
        <span className="text-syntx-cyan">⚡</span>
        Field Flow Pipeline
        {processing && (
          <span className="ml-2 text-syntx-cyan animate-pulse">Processing...</span>
        )}
      </h2>

      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {STAGES.map((stage, index) => (
          <div key={stage.number} className="flex items-center">
            {/* Stage Node */}
            <StageNode
              stage={stage}
              active={activeStage >= stage.number}
              current={activeStage === stage.number}
              processing={processing && activeStage === stage.number}
              onClick={() => onStageClick?.(stage.number)}
            />
            
            {/* Connector */}
            {index < STAGES.length - 1 && (
              <FlowConnector active={activeStage > stage.number} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

interface StageNodeProps {
  stage: Stage;
  active: boolean;
  current: boolean;
  processing: boolean;
  onClick?: () => void;
}

function StageNode({ stage, active, current, processing, onClick }: StageNodeProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center gap-2 p-4 min-w-[90px]
        rounded-xl border-2 transition-all duration-500
        ${active 
          ? 'border-syntx-cyan bg-syntx-cyan/10 shadow-glow-cyan' 
          : 'border-syntx-border/50 bg-syntx-dark/50 hover:border-syntx-border'}
        ${current ? 'scale-110 z-10' : 'scale-100'}
        ${processing ? 'animate-pulse' : ''}
      `}
    >
      {/* Glow Ring */}
      {active && (
        <div className="absolute inset-0 rounded-xl bg-syntx-cyan/20 blur-xl -z-10 animate-pulse" />
      )}

      {/* Number Badge */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        font-bold text-lg font-mono transition-all duration-300
        ${active 
          ? 'bg-gradient-to-br ' + stage.color + ' text-white shadow-lg' 
          : 'bg-syntx-dark border border-syntx-border text-syntx-muted'}
      `}>
        {stage.number}
      </div>

      {/* Icon */}
      <div className={`text-xl transition-all duration-300 ${active ? 'scale-110' : ''}`}>
        {stage.icon}
      </div>

      {/* Label */}
      <div className={`
        text-xs font-mono uppercase tracking-wider transition-colors duration-300
        ${active ? 'text-syntx-cyan' : 'text-syntx-muted'}
      `}>
        {stage.label}
      </div>

      {/* Processing Indicator */}
      {processing && (
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <span className="absolute inset-0 rounded-full bg-syntx-cyan animate-ping" />
          <span className="absolute inset-0 rounded-full bg-syntx-cyan" />
        </div>
      )}
    </button>
  );
}

function FlowConnector({ active }: { active: boolean }) {
  return (
    <div className="flex items-center px-1 relative">
      {/* Line */}
      <div className={`
        h-0.5 w-8 transition-all duration-500 relative overflow-hidden
        ${active ? 'bg-syntx-cyan shadow-glow-cyan' : 'bg-syntx-border/50'}
      `}>
        {/* Animated Flow */}
        {active && (
          <div className="absolute inset-y-0 w-4 bg-gradient-to-r from-transparent via-white to-transparent animate-flow" />
        )}
      </div>
      
      {/* Arrow */}
      <div className={`
        w-0 h-0 border-y-4 border-y-transparent border-l-6 
        transition-colors duration-500
        ${active ? 'border-l-syntx-cyan' : 'border-l-syntx-border/50'}
      `} 
      style={{ borderLeftWidth: '8px' }}
      />
    </div>
  );
}
```

### 📄 src/components/flow/FlowPanel.tsx
```typescript
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 SYNTX COLORS & CONFIG
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef', 
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  yellow: '#eab308'
};

const STAGE_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  '1_INCOMING': { color: COLORS.cyan, icon: '📥', label: 'INCOMING' },
  '2_WRAPPERS_LOADED': { color: COLORS.purple, icon: '📦', label: 'WRAPPERS' },
  '3_FIELD_CALIBRATED': { color: COLORS.orange, icon: '⚡', label: 'CALIBRATED' },
  '4_BACKEND_FORWARD': { color: COLORS.magenta, icon: '🚀', label: 'BACKEND' },
  '5_RESPONSE': { color: COLORS.green, icon: '✅', label: 'RESPONSE' },
};

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface Session {
  request_id: string;
  timestamp: string;
  stages: string[];
  prompt: string;
  wrapper: string;
  format: string | null;
  latency_ms: number;
}

interface SessionDetail {
  status: string;
  request_id: string;
  summary: {
    prompt: string;
    wrapper: string;
    format: string | null;
    response_preview: string;
    latency_ms: number;
    timestamp: string;
  };
  field_flow: Array<{
    stage: string;
    timestamp: string;
    request_id: string;
    prompt?: string;
    chain?: string[];
    total_length?: number;
    backend_url?: string;
    model?: string;
    response?: string;
    latency_ms?: number;
  }>;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔮 STAGE TIMELINE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function StageTimeline({ stages, activeStage, onStageClick }: { 
  stages: SessionDetail['field_flow']; 
  activeStage: number;
  onStageClick: (idx: number) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '24px 0' }}>
      {stages.map((stage, idx) => {
        const config = STAGE_CONFIG[stage.stage] || { color: COLORS.cyan, icon: '●', label: stage.stage };
        const isActive = idx === activeStage;
        const isPast = idx < activeStage;
        
        return (
          <React.Fragment key={stage.stage}>
            {/* Stage Node */}
            <div 
              onClick={() => onStageClick(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <div style={{
                width: isActive ? 64 : 48,
                height: isActive ? 64 : 48,
                borderRadius: '50%',
                background: isActive 
                  ? `linear-gradient(135deg, ${config.color}, ${config.color}88)`
                  : isPast 
                    ? `${config.color}40`
                    : 'rgba(255,255,255,0.1)',
                border: `3px solid ${isActive ? config.color : isPast ? config.color + '60' : 'rgba(255,255,255,0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isActive ? 28 : 20,
                boxShadow: isActive ? `0 0 30px ${config.color}60, 0 0 60px ${config.color}30` : 'none',
                transition: 'all 0.3s ease',
              }}>
                {config.icon}
              </div>
              <div style={{
                fontSize: 18,
                fontFamily: 'monospace',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? config.color : 'rgba(255,255,255,0.5)',
                letterSpacing: 1,
              }}>
                {config.label}
              </div>
            </div>
            
            {/* Connector Line */}
            {idx < stages.length - 1 && (
              <div style={{
                flex: 1,
                height: 4,
                background: isPast 
                  ? `linear-gradient(90deg, ${config.color}, ${STAGE_CONFIG[stages[idx + 1]?.stage]?.color || COLORS.cyan})`
                  : 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                margin: '0 8px',
                marginBottom: 24,
                boxShadow: isPast ? `0 0 10px ${config.color}40` : 'none',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📼 SESSION DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════════

function SessionDetailModal({ sessionId, onClose, onReplay }: { 
  sessionId: string; 
  onClose: () => void;
  onReplay: (params: any) => void;
}) {
  const [detail, setDetail] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState(0);
  const [replay, setReplay] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      api.getSession(sessionId),
      api.getSessionReplay(sessionId)
    ]).then(([detailData, replayData]) => {
      setDetail(detailData as SessionDetail);
      setReplay(replayData);
    }).catch(console.error).finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, animation: 'pulse 1s infinite' }}>🌊</div>
          <div style={{ fontFamily: 'monospace', color: COLORS.cyan, marginTop: 16 }}>LADE FIELD FLOW...</div>
        </div>
      </div>
    );
  }

  if (!detail) return null;

  const currentStage = detail.field_flow[activeStage];
  const stageConfig = STAGE_CONFIG[currentStage?.stage] || { color: COLORS.cyan, icon: '●', label: 'UNKNOWN' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 2000, overflow: 'auto' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 32 }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ 
              width: 72, height: 72, borderRadius: 20, 
              background: `linear-gradient(135deg, ${COLORS.cyan}30, ${COLORS.magenta}30)`,
              border: `2px solid ${COLORS.cyan}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 42,
              boxShadow: `0 0 40px ${COLORS.cyan}30`
            }}>🌊</div>
            <div>
              <h1 style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, fontWeight: 900, letterSpacing: 4, background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.magenta})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                FIELD FLOW ANALYSE
              </h1>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: 4 }}>
                {sessionId.slice(0, 8)}...{sessionId.slice(-8)}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={() => onReplay(replay?.replay_params)}
              style={{ 
                padding: '14px 28px', borderRadius: 12, 
                border: `2px solid ${COLORS.green}`,
                background: `linear-gradient(135deg, ${COLORS.green}30, ${COLORS.green}10)`,
                color: COLORS.green, fontFamily: 'monospace', fontSize: 15, fontWeight: 800,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: `0 0 20px ${COLORS.green}30`
              }}
            >
              <span style={{ fontSize: 18 }}>🔄</span> REPLAY
            </button>
            <button 
              onClick={onClose}
              style={{ 
                padding: '14px 28px', borderRadius: 12, 
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 15,
                cursor: 'pointer'
              }}
            >
              ✕ SCHLIESSEN
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.purple}20, ${COLORS.purple}05)`, border: `1px solid ${COLORS.purple}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>WRAPPER</div>
            <div style={{ fontSize: 18, color: COLORS.purple, fontFamily: 'monospace', fontWeight: 800 }}>{detail.summary.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'NONE'}</div>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.magenta}20, ${COLORS.magenta}05)`, border: `1px solid ${COLORS.magenta}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>FORMAT</div>
            <div style={{ fontSize: 18, color: COLORS.magenta, fontFamily: 'monospace', fontWeight: 800 }}>{detail.summary.format?.toUpperCase() || 'KEIN FORMAT'}</div>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.orange}20, ${COLORS.orange}05)`, border: `1px solid ${COLORS.orange}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>LATENCY</div>
            <div style={{ fontSize: 18, color: COLORS.orange, fontFamily: 'monospace', fontWeight: 800 }}>{(detail.summary.latency_ms / 1000).toFixed(2)}s</div>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.cyan}20, ${COLORS.cyan}05)`, border: `1px solid ${COLORS.cyan}40` }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>TIMESTAMP</div>
            <div style={{ fontSize: 18, color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 800 }}>{new Date(detail.summary.timestamp).toLocaleString('de-DE')}</div>
          </div>
        </div>

        {/* STAGE TIMELINE */}
        <div style={{ 
          padding: 32, borderRadius: 20, 
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: 32
        }}>
          <div style={{ fontSize: 18, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 16, letterSpacing: 2 }}>
            🌊 FIELD FLOW TIMELINE
          </div>
          <StageTimeline stages={detail.field_flow} activeStage={activeStage} onStageClick={setActiveStage} />
        </div>

        {/* STAGE DETAIL */}
        <div style={{ 
          padding: 32, borderRadius: 20, 
          background: `linear-gradient(135deg, ${stageConfig.color}15, ${stageConfig.color}05)`,
          border: `2px solid ${stageConfig.color}40`,
          boxShadow: `0 0 40px ${stageConfig.color}20`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: 16,
              background: `${stageConfig.color}30`,
              border: `2px solid ${stageConfig.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28
            }}>
              {stageConfig.icon}
            </div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, color: stageConfig.color, fontWeight: 800, letterSpacing: 2 }}>
                {currentStage?.stage}
              </h2>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                {new Date(currentStage?.timestamp).toLocaleString('de-DE')}
              </div>
            </div>
          </div>

          {/* Stage Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {currentStage?.prompt && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>📥 PROMPT</div>
                <pre style={{ 
                  margin: 0, padding: 20, borderRadius: 12,
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: 18, color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  maxHeight: 300, overflow: 'auto'
                }}>
                  {currentStage.prompt.slice(0, 2000)}{currentStage.prompt.length > 2000 ? '...' : ''}
                </pre>
              </div>
            )}
            {currentStage?.chain && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>📦 WRAPPER CHAIN</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {currentStage.chain.map((w, i) => (
                    <div key={i} style={{ padding: '8px 16px', borderRadius: 8, background: `${COLORS.purple}30`, border: `1px solid ${COLORS.purple}50`, fontSize: 18, color: COLORS.purple, fontFamily: 'monospace' }}>
                      {w.replace('syntex_wrapper_', '')}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentStage?.total_length && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>⚡ CALIBRATED LENGTH</div>
                <div style={{ fontSize: 32, color: COLORS.orange, fontFamily: 'monospace', fontWeight: 900 }}>
                  {currentStage.total_length.toLocaleString()} chars
                </div>
              </div>
            )}
            {currentStage?.backend_url && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>🚀 BACKEND</div>
                <div style={{ padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 18, color: COLORS.magenta, fontFamily: 'monospace' }}>{currentStage.backend_url}</div>
                  <div style={{ fontSize: 18, color: COLORS.cyan, fontFamily: 'monospace', marginTop: 8, fontWeight: 800 }}>Model: {currentStage.model}</div>
                </div>
              </div>
            )}
            {currentStage?.response && (
              <div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>✅ RESPONSE</div>
                <pre style={{ 
                  margin: 0, padding: 20, borderRadius: 12,
                  background: 'rgba(0,0,0,0.4)',
                  border: `1px solid ${COLORS.green}30`,
                  fontSize: 18, color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  maxHeight: 400, overflow: 'auto'
                }}>
                  {currentStage.response}
                </pre>
                {currentStage.latency_ms && (
                  <div style={{ marginTop: 12, fontSize: 18, color: COLORS.orange, fontFamily: 'monospace' }}>
                    ⚡ {(currentStage.latency_ms / 1000).toFixed(2)}s Latency
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 MAIN FLOW PANEL
// ═══════════════════════════════════════════════════════════════════════════

export default function FlowPanel() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const limit = 20;

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getSessions(limit, page * limit);
      setSessions(data.sessions || []);
      setTotalSessions(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const filteredSessions = sessions.filter(s => 
    !filter || 
    s.wrapper?.toLowerCase().includes(filter.toLowerCase()) ||
    s.prompt?.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(totalSessions / limit);

  const handleReplay = (params: any) => {
    console.log('REPLAY:', params);
    // TODO: Navigate to Chat with prefilled params
    alert('Replay Feature kommt bald - öffnet Chat mit Preset!');
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <div style={{ 
            width: 72, height: 72, borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.cyan}40, ${COLORS.green}20)`,
            border: `2px solid ${COLORS.cyan}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42,
            boxShadow: `0 0 50px ${COLORS.cyan}40`,
            animation: 'pulse 2s infinite'
          }}>🌊</div>
          <h2 style={{ 
            margin: 0, fontFamily: 'monospace', fontSize: 42, fontWeight: 900, letterSpacing: 8,
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.green}, ${COLORS.magenta})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            FIELD FLOW
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 15px ${COLORS.green}`, animation: 'blink 1.5s infinite' }} />
          <span style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.cyan }}>{totalSessions.toLocaleString()} Sessions</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 15, fontFamily: 'monospace', color: COLORS.green }}>5 Stages pro Flow</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 15, fontFamily: 'monospace', color: COLORS.magenta }}>Seite {page + 1}/{totalPages}</span>
        </div>

        {/* SEARCH */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <input 
            type="text" 
            placeholder="🔍 Sessions filtern..." 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
            style={{ 
              padding: '14px 24px', borderRadius: 12, 
              border: `1px solid ${COLORS.cyan}40`, 
              background: 'rgba(0,0,0,0.4)', 
              color: 'white', fontFamily: 'monospace', fontSize: 18, 
              width: 400, outline: 'none' 
            }} 
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div style={{ fontSize: 72, animation: 'pulse 1s infinite' }}>🌊</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.cyan, marginTop: 24 }}>LADE SESSIONS...</div>
        </div>
      )}

      {/* SESSIONS GRID */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredSessions.map((session, index) => (
            <div 
              key={session.request_id}
              onClick={() => setSelectedSession(session.request_id)}
              style={{
                padding: 20,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                animation: `fadeIn 0.3s ease ${index * 0.05}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${COLORS.cyan}50`;
                e.currentTarget.style.boxShadow = `0 0 30px ${COLORS.cyan}20`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Timestamp */}
                <div style={{ minWidth: 100 }}>
                  <div style={{ fontSize: 18, color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 700 }}>
                    {new Date(session.timestamp).toLocaleDateString('de-DE')}
                  </div>
                  <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
                    {new Date(session.timestamp).toLocaleTimeString('de-DE')}
                  </div>
                </div>

                {/* Stages */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {session.stages.map(stage => {
                    const config = STAGE_CONFIG[stage];
                    return (
                      <div 
                        key={stage}
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: `${config?.color}30`,
                          border: `2px solid ${config?.color}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16
                        }}
                        title={stage}
                      >
                        {config?.icon}
                      </div>
                    );
                  })}
                </div>

                {/* Wrapper */}
                <div style={{ 
                  padding: '6px 14px', borderRadius: 8,
                  background: `${COLORS.purple}20`,
                  border: `1px solid ${COLORS.purple}40`,
                  fontSize: 15, color: COLORS.purple, fontFamily: 'monospace', fontWeight: 700
                }}>
                  {session.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'UNKNOWN'}
                </div>

                {/* Prompt Preview */}
                <div style={{ flex: 1, fontSize: 18, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {session.prompt?.slice(0, 80)}...
                </div>

                {/* Latency */}
                <div style={{ 
                  padding: '6px 14px', borderRadius: 8,
                  background: `${COLORS.orange}20`,
                  fontSize: 18, color: COLORS.orange, fontFamily: 'monospace', fontWeight: 700
                }}>
                  ⚡ {(session.latency_ms / 1000).toFixed(1)}s
                </div>

                {/* Arrow */}
                <div style={{ fontSize: 32, color: COLORS.cyan }}>→</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <button 
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              padding: '12px 24px', borderRadius: 10,
              border: `1px solid ${COLORS.cyan}50`,
              background: page === 0 ? 'rgba(255,255,255,0.05)' : `${COLORS.cyan}20`,
              color: page === 0 ? 'rgba(255,255,255,0.3)' : COLORS.cyan,
              fontFamily: 'monospace', cursor: page === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ← ZURÜCK
          </button>
          <div style={{ padding: '12px 24px', fontSize: 18, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>
            {page + 1} / {totalPages}
          </div>
          <button 
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            style={{
              padding: '12px 24px', borderRadius: 10,
              border: `1px solid ${COLORS.cyan}50`,
              background: page >= totalPages - 1 ? 'rgba(255,255,255,0.05)' : `${COLORS.cyan}20`,
              color: page >= totalPages - 1 ? 'rgba(255,255,255,0.3)' : COLORS.cyan,
              fontFamily: 'monospace', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            WEITER →
          </button>
        </div>
      )}

      {/* SESSION DETAIL MODAL */}
      {selectedSession && (
        <SessionDetailModal 
          sessionId={selectedSession} 
          onClose={() => setSelectedSession(null)}
          onReplay={handleReplay}
        />
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
```

### 📄 src/components/flow/index.ts
```typescript
export { FieldFlowVisualizer } from './FieldFlowVisualizer';
```

### 📄 src/components/formats/FormatPanel.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🌊 WRAPPER FORMAT CONTROL - SYNTX ULTRA v6.0 MODULAR 🌊                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { LocalFormat, EditField, CreateField, FullFormatDetail, COLORS, getFormatColor, getDesc } from './types';
import { cyberStyles } from './styles';
import { CreateModal, ViewModal, EditModal, ScoreModal, DeleteModal } from './modals';

export default function FormatPanel() {
  const [formats, setFormats] = useState<LocalFormat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // VIEW MODAL
  const [viewFormat, setViewFormat] = useState<LocalFormat | null>(null);
  const [viewData, setViewData] = useState<FullFormatDetail | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  // SCORE MODAL
  const [scoreFormat, setScoreFormat] = useState<LocalFormat | null>(null);
  const [scoreData, setScoreData] = useState<any>(null);
  const [scoreLoading, setScoreLoading] = useState(false);

  // DELETE MODAL
  const [deleteFormat, setDeleteFormat] = useState<LocalFormat | null>(null);

  // CREATE MODAL
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createDesc, setCreateDesc] = useState('');
  const [createFields, setCreateFields] = useState<CreateField[]>([{ name: '', weight: 17 }]);
  const [createSaving, setCreateSaving] = useState(false);

  // EDIT MODAL
  const [editFormat, setEditFormat] = useState<LocalFormat | null>(null);
  const [editFields, setEditFields] = useState<EditField[]>([]);
  const [editDesc, setEditDesc] = useState('');
  const [editVersion, setEditVersion] = useState('');
  const [editWrapper, setEditWrapper] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');

  // 🔄 FETCH
  const fetchFormats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getFormats();
      setFormats((data.formats || []).map((f: any) => ({
        ...f,
        fields_count: f.fields_count || f.fields?.length || 0,
        language: f.primary_language || f.language || (f.languages?.[0]) || 'de'
      })));
    } catch (err: any) {
      setError(err.message || 'DRIFT beim Laden');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFormats(); }, [fetchFormats]);

  // 👁️ VIEW
  const openView = async (format: LocalFormat) => {
    setViewFormat(format);
    setViewData(null);
    setViewLoading(true);
    try {
      const detail = await api.getFormat(format.name);
      setViewData((detail as any).format || detail);
    } catch (err) {
      console.error('Failed to load:', err);
    } finally {
      setViewLoading(false);
    }
  };

  // 📊 SCORE
  const openScore = async (format: LocalFormat) => {
    setScoreFormat(format);
    setScoreLoading(true);
    setScoreData(null);
    try {
      const data = await api.scoreFormat({ format: format.name });
      setScoreData(data);
    } catch (err: any) {
      setScoreData({ error: err.message });
    } finally {
      setScoreLoading(false);
    }
  };

  // 💀 DELETE
  const handleDelete = async () => {
    if (!deleteFormat) return;
    try {
      await api.deleteFormat(deleteFormat.name);
      setDeleteFormat(null);
      fetchFormats();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  // ⚡ CREATE
  const handleCreate = async () => {
    const validFields = createFields.filter(f => f.name.trim());
    if (!createName.trim() || validFields.length === 0) return;
    setCreateSaving(true);
    try {
      await api.createFormatQuick({
        name: createName.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
        field_names: validFields.map(f => f.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')),
        description_de: createDesc || 'Neues Format',
      });
      setCreateOpen(false);
      setCreateName('');
      setCreateDesc('');
      setCreateFields([{ name: '', weight: 17 }]);
      fetchFormats();
    } catch (err: any) {
      alert('Create failed: ' + err.message);
    } finally {
      setCreateSaving(false);
    }
  };

  // ✏️ EDIT ÖFFNEN
  const openEdit = async (format: LocalFormat) => {
    setEditFormat(format);
    setEditDesc('');
    setEditWrapper(format.wrapper || 'syntex_wrapper_sigma');
    setEditVersion(format.version || '1.0');
    setEditFields([]);
    setNewFieldName('');
    try {
      const detail = await api.getFormat(format.name);
      const full = (detail as any).format || detail;
      const desc = full.description;
      setEditDesc(typeof desc === 'object' ? (desc?.de || desc?.en || '') : (desc || ''));
      setEditFields((full.fields || []).map((f: any) => ({ name: f.name, weight: f.weight || 17, enabled: true })));
      if (full.wrapper) setEditWrapper(full.wrapper);
      if (full.version) setEditVersion(full.version);
    } catch (err) {
      console.error('Failed to load:', err);
    }
  };

  // 💾 EDIT SPEICHERN
  const handleSaveEdit = async () => {
    if (!editFormat) return;
    setEditSaving(true);
    try {
      const enabled = editFields.filter(f => f.enabled);
      await api.updateFormat(editFormat.name, {
        description: { de: editDesc, en: editDesc },
        fields: enabled.map(f => ({
          name: f.name,
          weight: f.weight,
          description: { de: f.name, en: f.name },
          keywords: { de: [f.name], en: [f.name] },
          headers: { de: [f.name.toUpperCase()], en: [f.name.toUpperCase()] }
        })),
        version: editVersion,
      });
      setEditFormat(null);
      fetchFormats();
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    } finally {
      setEditSaving(false);
    }
  };

  const filteredFormats = formats.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof f.description === 'string' && f.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <style>{cyberStyles}</style>

      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <div className="pulse" style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, rgba(20,184,166,0.4), rgba(20,184,166,0.1))', border: '2px solid rgba(20,184,166,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 0 40px rgba(20,184,166,0.4)' }}>📋</div>
          <h2 className="glow-text" style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, fontWeight: 900, letterSpacing: 8, background: 'linear-gradient(135deg, #14b8a6, #00d4ff, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WRAPPER FORMAT CONTROL
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 15px ${COLORS.green}`, animation: 'blink 1.5s infinite' }} />
          <span style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.teal }}>{formats.length} Formate</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          <input type="text" placeholder="🔍 Format suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '14px 24px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.3)', background: 'rgba(0,0,0,0.4)', color: 'white', fontFamily: 'monospace', fontSize: 14, width: 280, outline: 'none' }} />
          <button onClick={() => setCreateOpen(true)} className="cyber-btn" style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#030b15', fontFamily: 'monospace', fontSize: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 0 30px rgba(20,184,166,0.5)' }}>
            <span style={{ fontSize: 18 }}>⚡</span> GEBÄREN
          </button>
        </div>
      </div>

      {/* STATES */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div className="pulse" style={{ fontSize: 72, marginBottom: 24 }}>📋</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16, color: COLORS.teal }}>LADE FORMATE...</div>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: 80, background: 'rgba(239,68,68,0.1)', borderRadius: 20, border: '1px solid rgba(239,68,68,0.3)' }}>
          <div style={{ fontSize: 64 }}>💀</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.red, margin: '16px 0' }}>DRIFT: {error}</div>
          <button onClick={fetchFormats} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: `1px solid ${COLORS.red}`, background: 'transparent', color: COLORS.red, cursor: 'pointer' }}>↻ RETRY</button>
        </div>
      )}

      {!loading && !error && filteredFormats.length === 0 && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div style={{ fontSize: 72, opacity: 0.4 }}>📭</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>KEINE FORMATE</div>
        </div>
      )}

      {/* GRID */}
      {!loading && !error && filteredFormats.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
          {filteredFormats.map((format, index) => {
            const color = getFormatColor(format.name);
            const lang = format.language || 'de';
            return (
              <div key={format.name} className="format-card" style={{ '--card-color': color, animationDelay: `${index * 0.08}s`, background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))', borderRadius: 16, border: `1px solid ${color}40`, overflow: 'hidden' } as React.CSSProperties}>
                <div style={{ padding: '20px 20px 14px', background: `linear-gradient(135deg, ${color}20, transparent)` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="pulse" style={{ width: 50, height: 50, borderRadius: 12, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: `0 0 20px ${color}30` }}>📋</div>
                      <div>
                        <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 2 }}>{format.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{format.fields_count} Felder</span>
                          {format.version && <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 6, background: `${color}20`, color }}>v{format.version}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="float" style={{ padding: '8px 14px', borderRadius: 20, background: `${color}25`, border: `1px solid ${color}50`, fontSize: 12, fontFamily: 'monospace', color, fontWeight: 700 }}>{format.fields_count}</div>
                  </div>
                  {format.description && <p style={{ margin: '14px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{getDesc(format.description)}</p>}
                </div>

                <div style={{ padding: '12px 20px', background: 'rgba(0,0,0,0.4)', borderTop: `1px solid ${color}20`, borderBottom: `1px solid ${color}20`, display: 'flex', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{lang === 'de' ? '🇩🇪' : '🇬🇧'}</span>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.cyan }}>{lang.toUpperCase()}</span>
                  </div>
                  {format.wrapper && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>📦</span>
                      <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>{format.wrapper.replace('syntex_wrapper_', '').toUpperCase()}</span>
                    </div>
                  )}
                </div>

                <div style={{ padding: '16px 20px', display: 'flex', gap: 10 }}>
                  <button onClick={() => openView(format)} className="cyber-btn" style={{ flex: 1, padding: '12px', borderRadius: 10, border: `1px solid ${color}50`, background: `${color}15`, color, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>👁️ VIEW</button>
                  <button onClick={() => openEdit(format)} className="cyber-btn" style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>✏️ EDIT</button>
                  <button onClick={() => openScore(format)} className="cyber-btn" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(139,92,246,0.5)', background: 'rgba(139,92,246,0.15)', color: COLORS.purple, fontSize: 12, cursor: 'pointer' }}>📊</button>
                  <button onClick={() => setDeleteFormat(format)} className="cyber-btn" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.15)', color: COLORS.red, fontSize: 12, cursor: 'pointer' }}>💀</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODALS */}
      <CreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        saving={createSaving}
        name={createName}
        setName={setCreateName}
        description={createDesc}
        setDescription={setCreateDesc}
        fields={createFields}
        setFields={setCreateFields}
      />

      <ViewModal
        format={viewFormat}
        data={viewData}
        loading={viewLoading}
        onClose={() => { setViewFormat(null); setViewData(null); }}
        onEdit={() => { setViewFormat(null); if (viewFormat) openEdit(viewFormat); }}
      />

      <EditModal
        format={editFormat}
        onClose={() => setEditFormat(null)}
        onSave={handleSaveEdit}
        saving={editSaving}
        fields={editFields}
        setFields={setEditFields}
        description={editDesc}
        setDescription={setEditDesc}
        version={editVersion}
        setVersion={setEditVersion}
        wrapper={editWrapper}
        setWrapper={setEditWrapper}
        newFieldName={newFieldName}
        setNewFieldName={setNewFieldName}
      />

      <ScoreModal
        format={scoreFormat}
        data={scoreData}
        loading={scoreLoading}
        onClose={() => { setScoreFormat(null); setScoreData(null); }}
      />

      <DeleteModal
        format={deleteFormat}
        onClose={() => setDeleteFormat(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

### 📄 src/components/formats/index.ts
```typescript
// ═══════════════════════════════════════════════════════════════════════════
// 📋 FORMATS - Die Output-Architektur
// ═══════════════════════════════════════════════════════════════════════════
//
// Formate sind keine Templates. Sie sind RESONANZ-SCHABLONEN.
// Wrapper = WIE gedacht wird. Format = WAS rauskommt.
//
// 🌟 GEBURT   → Format manifestieren
// ⚡ QUICK    → Schnell-Geburt aus Feldnamen
// 🔄 UPDATE   → Format transformieren
// 💀 DELETE   → Format freigeben
// 🔍 SCAN     → Response analysieren
// 🧬 CLONE    → Format klonen
// 📊 SCORE    → Format bewerten
//
// ═══════════════════════════════════════════════════════════════════════════

export { default as FormatPanel } from './FormatPanel';
```

### 📄 src/components/formats/modals/CreateModal.tsx
```typescript
"use client";
import React from 'react';
import { COLORS, CreateField } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  saving: boolean;
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  fields: CreateField[];
  setFields: (v: CreateField[]) => void;
}

export default function CreateModal({ isOpen, onClose, onCreate, saving, name, setName, description, setDescription, fields, setFields }: CreateModalProps) {
  if (!isOpen) return null;

  const addField = () => setFields([...fields, { name: '', weight: 17 }]);
  const updateField = (i: number, key: 'name' | 'weight', val: string | number) => {
    setFields(fields.map((f, idx) => idx === i ? { ...f, [key]: val } : f));
  };
  const removeField = (i: number) => {
    if (fields.length > 1) setFields(fields.filter((_, idx) => idx !== i));
  };

  const validFields = fields.filter(f => f.name.trim());
  const canCreate = name.trim() && validFields.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: '1px solid rgba(20,184,166,0.5)', width: '95%', maxWidth: 1100, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(20,184,166,0.3)', background: 'linear-gradient(135deg, rgba(20,184,166,0.15), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(20,184,166,0.25)', border: '2px solid rgba(20,184,166,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>⚡</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color: COLORS.teal, letterSpacing: 3 }}>FORMAT GEBÄREN</h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Quick Create mit Live Preview</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: FORM */}
          <div style={{ padding: 28, borderRight: '1px solid rgba(20,184,166,0.2)', overflow: 'auto' }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>🏷️ FORMAT NAME *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="z.B. sigma_analysis" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(20,184,166,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Wird: {name.toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'format_name'}</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📝 DESCRIPTION</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Beschreibung..." style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, resize: 'vertical', minHeight: 60, outline: 'none' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>🎯 FELDER * ({validFields.length})</label>
                <button onClick={addField} className="cyber-btn" style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: COLORS.teal, color: '#030b15', fontSize: 11, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>+ FELD</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {fields.map((field, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: `${COLORS.teal}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: COLORS.teal, fontWeight: 700 }}>{i + 1}</div>
                    <input type="text" value={field.name} onChange={e => updateField(i, 'name', e.target.value)} placeholder="Feldname..." style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
                    <input type="number" value={field.weight} onChange={e => updateField(i, 'weight', parseInt(e.target.value) || 17)} style={{ width: 60, padding: 12, borderRadius: 8, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: COLORS.orange, fontFamily: 'monospace', fontSize: 13, textAlign: 'center', outline: 'none' }} />
                    {fields.length > 1 && <button onClick={() => removeField(i)} style={{ background: 'none', border: 'none', color: COLORS.red, cursor: 'pointer', fontSize: 16 }}>🗑️</button>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="live-preview" style={{ padding: 28, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>👁️</span>
              <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.magenta }}>LIVE PREVIEW</h4>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: '1px solid rgba(217,70,239,0.3)', padding: 20, fontFamily: 'monospace', fontSize: 13 }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                {'// ═══ FORMAT: '}{(name || 'NEW').toUpperCase().replace(/[^A-Z0-9_]/g, '_')}{' ═══'}
              </div>

              {validFields.length > 0 ? validFields.map((field, i) => (
                <div key={i} className="preview-line" style={{ marginBottom: 16 }}>
                  <div style={{ color: COLORS.cyan, fontWeight: 700, marginBottom: 4 }}>### {field.name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')}:</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', paddingLeft: 16, borderLeft: `2px solid ${COLORS.cyan}30`, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: COLORS.orange }}>AI Output</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>(w:{field.weight})</span>
                  </div>
                </div>
              )) : <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 20 }}>Füge Felder hinzu...</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              <div style={{ padding: 16, background: 'rgba(0,212,255,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.cyan }}>{validFields.length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>FELDER</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.orange }}>{validFields.reduce((a, b) => a + b.weight, 0)}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>WEIGHT</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(217,70,239,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.magenta }}>~{validFields.length * 150}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(20,184,166,0.2)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={onCreate} disabled={saving || !canCreate} className="cyber-btn" style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: canCreate && !saving ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'rgba(20,184,166,0.3)', color: '#030b15', fontFamily: 'monospace', fontWeight: 800, cursor: canCreate && !saving ? 'pointer' : 'not-allowed' }}>
            {saving ? '⏳ GEBÄRT...' : '⚡ GEBÄREN'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/formats/modals/DeleteModal.tsx
```typescript
"use client";
import React from 'react';
import { COLORS, LocalFormat } from '../types';

interface DeleteModalProps {
  format: LocalFormat | null;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ format, onClose, onDelete }: DeleteModalProps) {
  if (!format) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 20, border: '1px solid rgba(239,68,68,0.5)', maxWidth: 450, width: '100%', textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>💀</div>
        <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color: COLORS.red }}>FORMAT FREIGEBEN?</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: '16px 0 24px' }}>Willst du <strong style={{ color: COLORS.red }}>{format.name}</strong> wirklich löschen?</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ flex: 1, padding: '14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'monospace' }}>ABBRECHEN</button>
          <button onClick={onDelete} className="cyber-btn" style={{ flex: 1, padding: '14px', borderRadius: 10, border: 'none', background: COLORS.red, color: 'white', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 700 }}>💀 FREIGEBEN</button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/formats/modals/EditModal.tsx
```typescript
"use client";
import React from 'react';
import { COLORS, LocalFormat, EditField, AVAILABLE_WRAPPERS } from '../types';

interface EditModalProps {
  format: LocalFormat | null;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  fields: EditField[];
  setFields: (f: EditField[]) => void;
  description: string;
  setDescription: (v: string) => void;
  version: string;
  setVersion: (v: string) => void;
  wrapper: string;
  setWrapper: (v: string) => void;
  newFieldName: string;
  setNewFieldName: (v: string) => void;
}

export default function EditModal({ format, onClose, onSave, saving, fields, setFields, description, setDescription, version, setVersion, wrapper, setWrapper, newFieldName, setNewFieldName }: EditModalProps) {
  if (!format) return null;

  const addField = () => {
    if (!newFieldName.trim()) return;
    const sanitized = newFieldName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (fields.some(f => f.name === sanitized)) return;
    setFields([...fields, { name: sanitized, weight: 17, enabled: true }]);
    setNewFieldName('');
  };

  const toggleField = (i: number) => setFields(fields.map((f, idx) => idx === i ? { ...f, enabled: !f.enabled } : f));
  const updateWeight = (i: number, w: number) => setFields(fields.map((f, idx) => idx === i ? { ...f, weight: w } : f));
  const removeField = (i: number) => setFields(fields.filter((_, idx) => idx !== i));

  const enabledFields = fields.filter(f => f.enabled);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: '1px solid rgba(0,212,255,0.4)', width: '95%', maxWidth: 1200, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(0,212,255,0.2)', background: 'linear-gradient(135deg, rgba(0,212,255,0.1), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 32 }}>✏️</span>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.cyan }}>FORMAT EDITIEREN</h3>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{format.name}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: EDITOR */}
          <div style={{ padding: 28, borderRight: '1px solid rgba(0,212,255,0.2)', overflow: 'auto' }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📝 DESCRIPTION</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, resize: 'vertical', minHeight: 80, outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>🏷️ VERSION</label>
                <input type="text" value={version} onChange={e => setVersion(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📦 WRAPPER</label>
                <select value={wrapper} onChange={e => setWrapper(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }}>
                  {AVAILABLE_WRAPPERS.map(w => <option key={w} value={w}>{w.replace('syntex_wrapper_', '').toUpperCase()}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 12, display: 'block' }}>🎯 FELDER ({enabledFields.length} aktiv)</label>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', maxHeight: 280, overflow: 'auto' }}>
                {fields.map((field, i) => (
                  <div key={i} className="field-item" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', opacity: field.enabled ? 1 : 0.4 }}>
                    <input type="checkbox" checked={field.enabled} onChange={() => toggleField(i)} style={{ accentColor: COLORS.cyan }} />
                    <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, color: field.enabled ? COLORS.cyan : 'rgba(255,255,255,0.3)' }}>{field.name}</span>
                    <input type="number" value={field.weight} onChange={e => updateWeight(i, parseInt(e.target.value) || 0)} style={{ width: 50, padding: 6, borderRadius: 6, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: COLORS.orange, fontFamily: 'monospace', fontSize: 11, textAlign: 'center' }} />
                    <button onClick={() => removeField(i)} style={{ background: 'none', border: 'none', color: COLORS.red, cursor: 'pointer', fontSize: 16 }}>🗑️</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <input type="text" value={newFieldName} onChange={e => setNewFieldName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addField()} placeholder="Neues Feld..." style={{ flex: 1, padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
                <button onClick={addField} className="cyber-btn" style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: COLORS.teal, color: '#030b15', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>+ ADD</button>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="live-preview" style={{ padding: 28, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>👁️</span>
              <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.magenta }}>LIVE PREVIEW</h4>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: '1px solid rgba(217,70,239,0.3)', padding: 20, fontFamily: 'monospace', fontSize: 13 }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                {'// ═══ FORMAT: '}{format.name.toUpperCase()}{' ═══'}
              </div>

              {enabledFields.length > 0 ? enabledFields.map((field, i) => (
                <div key={i} className="preview-line" style={{ marginBottom: 16 }}>
                  <div style={{ color: COLORS.cyan, fontWeight: 700, marginBottom: 4 }}>### {field.name.toUpperCase()}:</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', paddingLeft: 16, borderLeft: `2px solid ${COLORS.cyan}30`, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: COLORS.orange }}>AI Output</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>(w:{field.weight})</span>
                  </div>
                </div>
              )) : <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 20 }}>Keine Felder aktiv</div>}

              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>
                {'// Wrapper: '}{wrapper.replace('syntex_wrapper_', '').toUpperCase()}{' | v'}{version}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              <div style={{ padding: 16, background: 'rgba(0,212,255,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.cyan }}>{enabledFields.length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>AKTIV</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.orange }}>{enabledFields.reduce((a, b) => a + b.weight, 0)}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>WEIGHT</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(217,70,239,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.magenta }}>~{enabledFields.length * 150}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(0,212,255,0.2)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={onSave} disabled={saving} className="cyber-btn" style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: saving ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00d4ff, #0ea5e9)', color: '#030b15', fontFamily: 'monospace', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? '⏳ SPEICHERT...' : '💾 SPEICHERN'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/formats/modals/index.ts
```typescript
export { default as CreateModal } from './CreateModal';
export { default as ViewModal } from './ViewModal';
export { default as EditModal } from './EditModal';
export { default as ScoreModal } from './ScoreModal';
export { default as DeleteModal } from './DeleteModal';
```

### 📄 src/components/formats/modals/ScoreModal.tsx
```typescript
"use client";
import React from 'react';
import { COLORS, LocalFormat } from '../types';

interface ScoreModalProps {
  format: LocalFormat | null;
  data: any;
  loading: boolean;
  onClose: () => void;
}

export default function ScoreModal({ format, data, loading, onClose }: ScoreModalProps) {
  if (!format) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 20, border: '1px solid rgba(139,92,246,0.5)', maxWidth: 600, width: '100%' }}>
        <div style={{ padding: 24, borderBottom: '1px solid rgba(139,92,246,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.purple }}>📊 SCORE: {format.name}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          {loading && <div style={{ textAlign: 'center', padding: 40 }}><div className="pulse" style={{ fontSize: 48 }}>📊</div><div style={{ marginTop: 16, color: COLORS.purple }}>Analysiere...</div></div>}
          {data?.error && <div style={{ color: COLORS.red, padding: 20, background: 'rgba(239,68,68,0.1)', borderRadius: 12 }}>❌ {data.error}</div>}
          {data && !data.error && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>OVERALL</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: data.overall >= 80 ? COLORS.green : data.overall >= 50 ? COLORS.orange : COLORS.red }}>{data.overall || 0}</div>
              </div>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>CLARITY</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.cyan }}>{data.semantic_clarity || 0}</div>
              </div>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>I18N</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.magenta }}>{data.i18n_score || 0}</div>
              </div>
              <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>BALANCE</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: data.field_balance === 'EXCELLENT' ? COLORS.green : COLORS.orange }}>{data.field_balance || 'N/A'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/formats/modals/ViewModal.tsx
```typescript
"use client";
import React from 'react';
import { COLORS, LocalFormat, FullFormatDetail, getFormatColor } from '../types';

interface ViewModalProps {
  format: LocalFormat | null;
  data: FullFormatDetail | null;
  loading: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export default function ViewModal({ format, data, loading, onClose, onEdit }: ViewModalProps) {
  if (!format) return null;
  const color = getFormatColor(format.name);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `1px solid ${color}50`, width: '95%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📋</div>
              <div>
                <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: 3 }}>{format.name}</h3>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Format Detail View</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div className="pulse" style={{ fontSize: 56 }}>📋</div>
              <div style={{ marginTop: 16, color, fontFamily: 'monospace' }}>Lade Details...</div>
            </div>
          )}

          {data && (
            <div>
              {/* DESCRIPTION */}
              {data.description && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>📝 DESCRIPTION</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                      <div style={{ fontSize: 11, color: COLORS.cyan, marginBottom: 8 }}>🇩🇪 DEUTSCH</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{data.description.de || '—'}</div>
                    </div>
                    <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 12 }}>
                      <div style={{ fontSize: 11, color: COLORS.orange, marginBottom: 8 }}>🇬🇧 ENGLISH</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{data.description.en || '—'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
                <div style={{ padding: 20, background: `${COLORS.cyan}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.cyan }}>{data.fields?.length || 0}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>FELDER</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.orange}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.orange }}>{data.version || '1.0'}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>VERSION</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.green}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24 }}>{data.languages?.includes('de') ? '🇩🇪' : ''}{data.languages?.includes('en') ? '🇬🇧' : ''}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>SPRACHEN</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.purple}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.purple }}>{data.fields?.reduce((a, f) => a + (f.weight || 0), 0) || 0}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>WEIGHT</div>
                </div>
              </div>

              {/* FELDER */}
              {data.fields && data.fields.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>🎯 FELDER ({data.fields.length})</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {data.fields.map((field, i) => (
                      <div key={i} style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 14, border: `1px solid ${color}30` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: field.description || field.keywords ? 12 : 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 14, color, fontWeight: 700 }}>{i + 1}</div>
                            <div style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color }}>{field.name}</div>
                          </div>
                          <div style={{ padding: '6px 12px', borderRadius: 20, background: `${COLORS.orange}20`, fontSize: 12, fontFamily: 'monospace', color: COLORS.orange }}>
                            Weight: {field.weight || 17}
                          </div>
                        </div>
                        {field.description && <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: field.keywords ? 12 : 0 }}>{field.description}</div>}
                        {field.keywords && field.keywords.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {field.keywords.map((kw, ki) => (
                              <span key={ki} style={{ padding: '4px 10px', borderRadius: 6, background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}30`, fontSize: 11, fontFamily: 'monospace', color: COLORS.cyan }}>{kw}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '16px 28px', borderTop: `1px solid ${color}20`, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onEdit} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>✏️ EDIT</button>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: color, color: '#030b15', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>SCHLIESSEN</button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/formats/styles.ts
```typescript
export const cyberStyles = `
  @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px var(--glow); } 50% { box-shadow: 0 0 40px var(--glow); } }
  @keyframes borderFlow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
  @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px currentColor; } 50% { text-shadow: 0 0 30px currentColor; } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes slideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes slideIn { 0% { opacity: 0; transform: scale(0.9) translateY(-20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0.5; } }
  .format-card { position: relative; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); animation: slideUp 0.5s ease-out backwards; }
  .format-card:hover { transform: translateY(-8px) scale(1.02); z-index: 10; }
  .format-card::before { content: ''; position: absolute; inset: -2px; border-radius: 18px; background: linear-gradient(45deg, var(--card-color), transparent, var(--card-color)); background-size: 200% 200%; animation: borderFlow 3s linear infinite; z-index: -1; opacity: 0; transition: opacity 0.3s; }
  .format-card:hover::before { opacity: 1; }
  .cyber-btn { position: relative; overflow: hidden; transition: all 0.3s; }
  .cyber-btn:hover { transform: scale(1.05); filter: brightness(1.2); }
  .cyber-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .modal-overlay { animation: fadeIn 0.2s ease-out; }
  .modal-content { animation: slideIn 0.3s ease-out; }
  .live-preview { background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,20,40,0.8) 100%); }
  .preview-line { animation: slideUp 0.3s ease-out backwards; }
  .field-item { transition: all 0.2s ease; }
  .field-item:hover { background: rgba(255,255,255,0.05); }
`;
```

### 📄 src/components/formats/types.ts
```typescript
// 🔥 SYNTX FORMAT TYPES & CONSTANTS

export interface LocalFormat {
  name: string;
  description?: string | { de?: string; en?: string };
  fields_count: number;
  version?: string;
  language?: string;
  languages?: string[];
  primary_language?: string;
  wrapper?: string;
  created_at?: string;
  updated_at?: string;
  usage_count?: number;
  fields?: any[];
}

export interface EditField {
  name: string;
  weight: number;
  enabled: boolean;
}

export interface CreateField {
  name: string;
  weight: number;
}

export interface FullFormatDetail {
  name: string;
  description?: { de?: string; en?: string };
  languages?: string[];
  fields?: {
    name: string;
    header?: string;
    description?: string;
    keywords?: string[];
    weight?: number;
  }[];
  version?: string;
  wrapper?: string;
}

export const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  teal: '#14b8a6',
  pink: '#ec4899',
  lime: '#84cc16',
  yellow: '#eab308',
} as const;

export const AVAILABLE_WRAPPERS = [
  'syntex_wrapper_sigma',
  'syntex_wrapper_human',
  'syntex_wrapper_deepsweep',
  'syntex_wrapper_true_raw',
  'syntex_wrapper_universal',
];

export const getFormatColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('sigma')) return COLORS.orange;
  if (n.includes('human')) return COLORS.green;
  if (n.includes('syntex') || n.includes('syntx')) return COLORS.purple;
  if (n.includes('economic')) return COLORS.lime;
  if (n.includes('code')) return COLORS.cyan;
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const keys = Object.keys(COLORS) as (keyof typeof COLORS)[];
  return COLORS[keys[hash % keys.length]];
};

export const getDesc = (d: any): string => {
  if (!d) return '';
  if (typeof d === 'string') return d;
  return d.de || d.en || '';
};
```

### 📄 src/components/graphs/GraphsPanel.tsx
```typescript
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, StatsResponse, StreamEvent } from '@/lib/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, Legend
} from 'recharts';

// ═══════════════════════════════════════════════════════════════
// CYBER BACKGROUND
// ═══════════════════════════════════════════════════════════════
function CyberBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.03 }}>
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            background: ['#00d4ff', '#d946ef', '#10b981', '#f59e0b'][i % 4],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
            animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      
      <div style={{
        position: 'absolute',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
        top: '-10%', right: '-5%',
        animation: 'pulse 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%)',
        bottom: '-5%', left: '-5%',
        animation: 'pulse 10s ease-in-out infinite',
        animationDelay: '2s',
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════
function GlassCard({ children, title, icon, glowColor = '#00d4ff' }: {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  glowColor?: string;
}) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.85) 0%, rgba(6,13,24,0.9) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
      }} />
      
      {title && (
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
          <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 12, color: glowColor, letterSpacing: 2 }}>
            {title}
          </h3>
        </div>
      )}
      
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM TOOLTIP
// ═══════════════════════════════════════════════════════════════
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
      border: '1px solid rgba(0,212,255,0.3)',
      borderRadius: 12,
      padding: '12px 16px',
      boxShadow: '0 0 30px rgba(0,212,255,0.2)',
    }}>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
        {label}
      </div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'white' }}>
            {p.name}: <strong style={{ color: p.color }}>{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
};

const WRAPPER_COLORS: Record<string, string> = {
  'syntex_wrapper_sigma': COLORS.orange,
  'syntex_wrapper_human': COLORS.green,
  'syntex_wrapper_deepsweep': COLORS.magenta,
  'syntex_wrapper_true_raw': COLORS.red,
};

export default function GraphsPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, streamData] = await Promise.all([
        api.getStats(),
        api.getStream(100),
      ]);
      setStats(statsData);
      setEvents(streamData.events || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Process data for charts
  const latencyData = React.useMemo(() => {
    const grouped = events.reduce((acc, event) => {
      if (!acc[event.request_id]) {
        acc[event.request_id] = { 
          id: event.request_id.slice(0, 8),
          timestamp: new Date(event.timestamp),
          latency: 0,
          wrapper: event.wrapper_chain?.[0] || 'unknown',
        };
      }
      if (event.latency_ms) {
        acc[event.request_id].latency = event.latency_ms / 1000;
      }
      return acc;
    }, {} as Record<string, any>);
    
    return Object.values(grouped)
      .sort((a: any, b: any) => a.timestamp - b.timestamp)
      .map((d: any) => ({
        ...d,
        time: d.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      }));
  }, [events]);

  const wrapperPieData = React.useMemo(() => {
    if (!stats?.wrapper_usage) return [];
    return Object.entries(stats.wrapper_usage).map(([name, value]) => ({
      name: name.replace('syntex_wrapper_', '').toUpperCase(),
      value,
      fullName: name,
    }));
  }, [stats]);

  const latencyByWrapper = React.useMemo(() => {
    const grouped = latencyData.reduce((acc: any, d: any) => {
      const name = d.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'UNKNOWN';
      if (!acc[name]) acc[name] = { name, total: 0, count: 0 };
      acc[name].total += d.latency;
      acc[name].count += 1;
      return acc;
    }, {});
    return Object.values(grouped).map((d: any) => ({
      name: d.name,
      avg: d.total / d.count,
    }));
  }, [latencyData]);

  if (loading && !stats) {
    return (
      <div style={{ position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CyberBackground />
        <div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <CyberBackground />
      
      {/* Header Stats */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { label: 'TOTAL REQUESTS', value: stats?.total_requests || 0, color: COLORS.cyan, icon: '📊' },
            { label: 'SUCCESS RATE', value: `${stats?.success_rate || 0}%`, color: COLORS.green, icon: '✅' },
            { label: 'AVG LATENCY', value: `${((stats?.average_latency_ms || 0) / 1000).toFixed(1)}s`, color: COLORS.orange, icon: '⚡' },
            { label: 'WRAPPERS', value: Object.keys(stats?.wrapper_usage || {}).length, color: COLORS.magenta, icon: '📦' },
          ].map((stat, i) => (
            <GlassCard key={i} glowColor={stat.color}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: stat.color, fontFamily: 'monospace' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: 1, marginTop: 8 }}>
                  {stat.label}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Latency Timeline */}
        <GlassCard title="LATENCY TIMELINE" icon="📈" glowColor={COLORS.cyan}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={latencyData}>
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => `${v}s`} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="latency" 
                stroke={COLORS.cyan} 
                strokeWidth={2}
                fill="url(#latencyGradient)" 
                name="Latency (s)"
                dot={{ fill: COLORS.cyan, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: COLORS.cyan, stroke: 'white', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Wrapper Distribution Donut */}
        <GlassCard title="WRAPPER DISTRIBUTION" icon="🍩" glowColor={COLORS.magenta}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={wrapperPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {wrapperPieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={WRAPPER_COLORS[entry.fullName] || COLORS.cyan}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 10 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Second Row */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Latency by Wrapper */}
        <GlassCard title="AVG LATENCY BY WRAPPER" icon="📊" glowColor={COLORS.orange}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={latencyByWrapper} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => `${v.toFixed(0)}s`} />
              <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avg" name="Avg Latency (s)" radius={[0, 8, 8, 0]}>
                {latencyByWrapper.map((entry: any, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={WRAPPER_COLORS[`syntex_wrapper_${entry.name.toLowerCase()}`] || COLORS.cyan}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Request Timeline */}
        <GlassCard title="REQUESTS OVER TIME" icon="📉" glowColor={COLORS.green}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="latency" 
                stroke={COLORS.green} 
                strokeWidth={2}
                name="Latency (s)"
                dot={{ fill: COLORS.green, strokeWidth: 0, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
```

### 📄 src/components/health/HealthStatus.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🏥 HEALTH STATUS - SYSTEM PULS                                          ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface HealthData {
  status: string;
  api_version: string;
  timestamp: string;
  queue_accessible: boolean;
  modules: string[];
}

export function HealthStatus() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  const fetchHealth = async () => {
    try {
      const result = await api.getHealth();
      setData(result);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Connection failed');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(pulseInterval);
  }, []);

  const isOnline = data?.status?.includes('GESUND') || data?.status === 'healthy';
  const statusColor = isOnline ? '#10b981' : '#ef4444';
  const statusText = isOnline ? 'ONLINE' : 'OFFLINE';
  const pulseOpacity = 0.3 + (Math.sin(pulseIntensity * 0.1) * 0.2);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 16px',
      background: 'rgba(0,0,0,0.4)',
      borderRadius: 12,
      border: `1px solid ${statusColor}30`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 20% 50%, ${statusColor}${Math.round(pulseOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        {loading ? (
          <>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d4ff', animation: 'pulse 1s ease-in-out infinite', boxShadow: '0 0 10px #00d4ff' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#00d4ff', letterSpacing: 2 }}>CONNECTING...</span>
          </>
        ) : error ? (
          <>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 15px #ef4444', animation: 'pulse 0.5s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#ef4444', letterSpacing: 2 }}>OFFLINE</span>
          </>
        ) : (
          <>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor, boxShadow: `0 0 ${10 + pulseIntensity % 10}px ${statusColor}` }} />
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${statusColor}`, opacity: pulseOpacity, animation: 'ping 1.5s ease-out infinite' }} />
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: statusColor, letterSpacing: 2, textShadow: `0 0 10px ${statusColor}50` }}>{statusText}</span>
          </>
        )}
      </div>

      {data && (
        <div style={{ position: 'relative', zIndex: 1, padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>v{data.api_version}</span>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>
    </div>
  );
}
```

### 📄 src/components/health/index.ts
```typescript
export { HealthStatus } from './HealthStatus';
```

### 📄 src/components/layout/Header.tsx
```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';

export function Header() {
  const { data: health } = useApi(() => api.getHealth(), []);

  return (
    <header className="relative z-50 border-b border-syntx-border/30 bg-syntx-dark/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.png" unoptimized
                alt="SYNTX Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]"
              />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-syntx-cyan text-glow tracking-wider">
                SYNTX
              </h1>
              <p className="text-xs text-syntx-muted font-mono">
                Field Resonance Dashboard
              </p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/wrappers">Wrappers</NavLink>
            <NavLink href="/analytics">Analytics</NavLink>
            <NavLink href="/chat">Chat</NavLink>
          </nav>

          {/* Status */}
          <div className="flex items-center gap-4">
            <StatusBadge
              status={health?.status?.includes('GESUND') || health?.status?.includes('GESUND') || health?.status === 'healthy' ? 'healthy' : 'loading'}
              label={health?.status?.includes('GESUND') || health?.status?.includes('GESUND') || health?.status === 'healthy' ? 'RESONATING' : 'CONNECTING'}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-mono text-syntx-muted hover:text-syntx-cyan transition-colors duration-300 group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-syntx-cyan group-hover:w-full transition-all duration-300" />
    </Link>
  );
}
```

### 📄 src/components/layout/index.ts
```typescript
export { ParticleBackground } from './ParticleBackground';
export { Header } from './Header';
export { MainLayout } from './MainLayout';
```

### 📄 src/components/layout/MainLayout.tsx
```typescript
'use client';

import { ReactNode } from 'react';
import { ParticleBackground } from './ParticleBackground';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <ParticleBackground />
      
      {/* Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-syntx-cyan/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[300px] bg-syntx-magenta/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 📄 src/components/layout/ParticleBackground.tsx
```typescript
'use client';

import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #060d18 50%, #0a1628 100%)' }}
    />
  );
}
```

### 📄 src/components/optimizer/AnalyzeButton.tsx
```typescript
"use client";
import { motion } from "framer-motion";

interface Props {
  analyzing: boolean;
  onAnalyze: () => void;
}

export default function AnalyzeButton({ analyzing, onAnalyze }: Props) {
  return (
    <motion.button
      onClick={onAnalyze}
      disabled={analyzing}
      whileHover={{ scale: analyzing ? 1 : 1.02, y: analyzing ? 0 : -2 }}
      whileTap={{ scale: analyzing ? 1 : 0.98 }}
      className="cyber-btn"
      style={{
        width: '100%',
        padding: '20px 32px',
        borderRadius: 16,
        border: 'none',
        background: analyzing 
          ? 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(217,70,239,0.3))'
          : 'linear-gradient(135deg, #00d4ff, #d946ef)',
        color: analyzing ? 'rgba(255,255,255,0.5)' : '#030b15',
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 900,
        letterSpacing: 3,
        cursor: analyzing ? 'not-allowed' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: analyzing 
          ? 'none'
          : '0 10px 40px rgba(0,212,255,0.4), 0 0 60px rgba(217,70,239,0.3)',
        marginBottom: 20
      }}
    >
      {!analyzing && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
          }}
          animate={{ left: ['100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
      }}>
        {analyzing ? (
          <>
            <motion.div
              style={{
                width: 20,
                height: 20,
                border: '3px solid rgba(255,255,255,0.3)',
                borderTopColor: 'rgba(255,255,255,0.8)',
                borderRadius: '50%'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            ANALYZING LOGS...
          </>
        ) : (
          <>
            🔍 ANALYZE LOGS
          </>
        )}
      </div>
    </motion.button>
  );
}
```

### 📄 src/components/optimizer/ChangelogModal.tsx
```typescript
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ChangelogEntry {
  timestamp: string;
  profile_id: string;
  changed_by: string;
  change_type: string;
  reason: string;
  changes?: any;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangelogModal({ isOpen, onClose }: Props) {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (isOpen) fetchChangelog(); }, [isOpen]);

  const fetchChangelog = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/changelog?limit=100");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setChangelog(data.changelog || []);
    } catch (error) {
      console.error("Failed to fetch changelog:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChangelog = changelog.filter(entry => !typeFilter || entry.change_type === typeFilter);

  const stats = {
    create: changelog.filter(e => e.change_type === 'create').length,
    update: changelog.filter(e => e.change_type === 'update').length,
    delete: changelog.filter(e => e.change_type === 'delete').length
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* MEGA NEURAL NETWORK - PURPLE THEME */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="neuralGradChange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#a78bfa', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 0.7 }} />
            </linearGradient>
            <filter id="glowChange">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Neural Grid - 7x9 Dense */}
          {[...Array(7)].map((_, row) => 
            [...Array(9)].map((_, col) => {
              const x = 12 + col * 11;
              const y = 12 + row * 14;
              
              return (
                <g key={`node-${row}-${col}`}>
                  {col < 8 && [...Array(4)].map((_, i) => {
                    const targetRow = Math.max(0, Math.min(6, row + i - 1.5));
                    const x2 = 12 + (col + 1) * 11;
                    const y2 = 12 + targetRow * 14;
                    return (
                      <motion.line
                        key={`conn-${row}-${col}-${i}`}
                        x1={`${x}%`}
                        y1={`${y}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="url(#neuralGradChange)"
                        strokeWidth="2"
                        filter="url(#glowChange)"
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                          strokeWidth: [2, 3.5, 2]
                        }}
                        transition={{
                          duration: 1.8 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: (row * 9 + col) * 0.04
                        }}
                      />
                    );
                  })}
                  
                  <motion.circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="5"
                    fill="url(#neuralGradChange)"
                    filter="url(#glowChange)"
                    animate={{
                      r: [5, 7, 5],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.3 + Math.random() * 0.8,
                      repeat: Infinity,
                      delay: (row * 9 + col) * 0.03
                    }}
                  />
                </g>
              );
            })
          )}
          
          {/* Signal Pulses */}
          {[...Array(20)].map((_, i) => {
            const startX = 12 + (i % 9) * 11;
            const startY = 12 + Math.floor(i / 9) * 14;
            const endX = 88;
            const endY = 50;
            
            return (
              <motion.circle
                key={`pulse-${i}`}
                r="4"
                fill="#8b5cf6"
                filter="url(#glowChange)"
                animate={{
                  cx: [`${startX}%`, `${endX}%`],
                  cy: [`${startY}%`, `${endY}%`],
                  opacity: [0, 1, 0],
                  r: [4, 6, 4]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>

        {/* Floating Particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: `hsl(${270 + i * 5}, 75%, 65%)`,
                boxShadow: `0 0 18px hsl(${270 + i * 5}, 75%, 65%)`
              }}
              animate={{
                x: [Math.random() * 1200, Math.random() * 1200, Math.random() * 1200],
                y: [Math.random() * 800, Math.random() * 800, Math.random() * 800],
                scale: [1, 2, 1],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{
                duration: 9 + Math.random() * 9,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.96, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="cyber-card"
          style={{
            width: '88%',
            maxWidth: 1050,
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '18px',
            borderRadius: 14,
            background: 'linear-gradient(145deg, rgba(8,24,42,0.98), rgba(4,10,18,0.98))',
            border: '2px solid rgba(139,92,246,0.55)',
            position: 'relative',
            boxShadow: '0 40px 130px rgba(0,0,0,0.9), 0 0 70px rgba(139,92,246,0.28)',
            overflow: 'hidden'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#8b5cf6' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.div style={{ width: 32, height: 32, position: 'relative' }} animate={{ rotate: [0, 360] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                <Image src="/logo_original.png" alt="SYNTX" width={32} height={32} style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.5))' }} />
              </motion.div>
              <div>
                <h2 className="glow-text" style={{ fontSize: 18, fontWeight: 900, color: '#8b5cf6', fontFamily: 'monospace', margin: 0, letterSpacing: 1.5 }}>SYSTEM CHANGELOG</h2>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>Profile Evolution Timeline</div>
              </div>
            </div>
            <button onClick={onClose} className="cyber-btn" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>×</button>
          </div>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <button onClick={() => setTypeFilter(typeFilter === 'create' ? '' : 'create')} className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: typeFilter === 'create' ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.08)', border: `1px solid rgba(16,185,129,${typeFilter === 'create' ? 0.4 : 0.25})`, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>{stats.create}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>CREATE</div>
            </button>
            <button onClick={() => setTypeFilter(typeFilter === 'update' ? '' : 'update')} className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: typeFilter === 'update' ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)', border: `1px solid rgba(245,158,11,${typeFilter === 'update' ? 0.4 : 0.25})`, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace' }}>{stats.update}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>UPDATE</div>
            </button>
            <button onClick={() => setTypeFilter(typeFilter === 'delete' ? '' : 'delete')} className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: typeFilter === 'delete' ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.08)', border: `1px solid rgba(239,68,68,${typeFilter === 'delete' ? 0.4 : 0.25})`, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#ef4444', fontFamily: 'monospace' }}>{stats.delete}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>DELETE</div>
            </button>
          </motion.div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, position: 'relative', zIndex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <motion.div style={{ width: 35, height: 35, border: '3px solid rgba(139,92,246,0.2)', borderTopColor: '#8b5cf6', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : filteredChangelog.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 35, color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📜</div>
                {typeFilter ? 'No entries for this type' : 'No changelog entries yet'}
              </div>
            ) : (
              <>
                <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, rgba(139,92,246,0.5), transparent)' }} />
                <div style={{ display: 'grid', gap: 8 }}>
                  {filteredChangelog.map((entry, idx) => <ChangelogEntry key={idx} entry={entry} index={idx} />)}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function ChangelogEntry({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const typeColor = entry.change_type === 'create' ? '#10b981' : entry.change_type === 'update' ? '#f59e0b' : entry.change_type === 'delete' ? '#ef4444' : '#8b5cf6';

  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.015 }} style={{ position: 'relative', paddingLeft: 30 }}>
      <motion.div style={{ position: 'absolute', left: 3, top: 5, width: 12, height: 12, borderRadius: '50%', background: typeColor, border: '3px solid rgba(4,10,18,1)', boxShadow: `0 0 14px ${typeColor}`, zIndex: 2 }} animate={{ scale: [1, 1.1, 1], boxShadow: [`0 0 14px ${typeColor}`, `0 0 22px ${typeColor}`, `0 0 14px ${typeColor}`] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <motion.div whileHover={{ scale: 1.002, x: 2 }} className="cyber-card" style={{ padding: 9, borderRadius: 8, background: 'rgba(0,0,0,0.6)', border: `1px solid ${typeColor}24`, cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <span style={{ padding: '2px 5px', borderRadius: 4, background: `${typeColor}14`, border: `1px solid ${typeColor}30`, color: typeColor, fontSize: 7, fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase' }}>{entry.change_type}</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#00d4ff', fontFamily: 'monospace' }}>{entry.profile_id}</span>
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.48)', lineHeight: 1.3 }}>{entry.reason}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{new Date(entry.timestamp).toLocaleString('de-DE')}</div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginTop: 2 }}>by {entry.changed_by}</div>
          </div>
        </div>
        {expanded && entry.changes && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 7, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', maxHeight: 100, overflowY: 'auto' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(entry.changes, null, 2)}</pre>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
```

### 📄 src/components/optimizer/EmptyState.tsx
```typescript
"use client";
import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cyber-card"
      style={{
        padding: '60px 40px',
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(16,185,129,0.3)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <motion.div
        className="float"
        style={{
          fontSize: 80,
          marginBottom: 20,
          filter: 'drop-shadow(0 0 30px rgba(16,185,129,0.6))'
        }}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        ✨
      </motion.div>
      
      <h3 className="glow-text" style={{
        fontSize: 24,
        fontWeight: 900,
        color: '#10b981',
        fontFamily: 'monospace',
        marginBottom: 12,
        letterSpacing: 2
      }}>
        SYSTEM OPTIMIZED
      </h3>
      
      <p style={{
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'monospace',
        lineHeight: 1.6
      }}>
        No suggestions pending • Run analysis to discover improvements
      </p>
    </motion.div>
  );
}
```

### 📄 src/components/optimizer/FieldAnalyticsModal.tsx
```typescript
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface FieldAnalytics {
  field: string;
  total_uses: number;
  avg_score: number;
  success_rate: number;
  recent_prompts: number;
  problem_indicators?: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FieldAnalyticsModal({ isOpen, onClose }: Props) {
  const [analytics, setAnalytics] = useState<FieldAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'uses' | 'score' | 'success'>('uses');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (isOpen) fetchAnalytics(); }, [isOpen]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/analytics/fields");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAnalytics(data.fields || []);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedAnalytics = [...analytics].sort((a, b) => {
    if (sortBy === 'uses') return b.total_uses - a.total_uses;
    if (sortBy === 'score') return b.avg_score - a.avg_score;
    if (sortBy === 'success') return b.success_rate - a.success_rate;
    return 0;
  });

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* MEGA NEURAL NETWORK - ANIMATED CONNECTIONS */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="neuralGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.6 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Neural Network Grid - 6x8 Nodes */}
          {[...Array(6)].map((_, row) => 
            [...Array(8)].map((_, col) => {
              const x = 15 + col * 12.5;
              const y = 15 + row * 16;
              
              return (
                <g key={`node-${row}-${col}`}>
                  {/* Connections to next layer */}
                  {col < 7 && [...Array(3)].map((_, i) => {
                    const targetRow = Math.max(0, Math.min(5, row + i - 1));
                    const x2 = 15 + (col + 1) * 12.5;
                    const y2 = 15 + targetRow * 16;
                    return (
                      <motion.line
                        key={`conn-${row}-${col}-${i}`}
                        x1={`${x}%`}
                        y1={`${y}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="url(#neuralGrad3)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                        animate={{
                          opacity: [0.2, 0.6, 0.2],
                          strokeWidth: [1.5, 2.5, 1.5]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: (row * 8 + col) * 0.05
                        }}
                      />
                    );
                  })}
                  
                  {/* Node */}
                  <motion.circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill="url(#neuralGrad3)"
                    filter="url(#glow)"
                    animate={{
                      r: [4, 6, 4],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      delay: (row * 8 + col) * 0.04
                    }}
                  />
                </g>
              );
            })
          )}
          
          {/* Signal Pulses */}
          {[...Array(15)].map((_, i) => {
            const startX = 15 + (i % 8) * 12.5;
            const startY = 15 + Math.floor(i / 8) * 16;
            const endX = 85;
            const endY = 50;
            
            return (
              <motion.circle
                key={`pulse-${i}`}
                r="3"
                fill="#06b6d4"
                filter="url(#glow)"
                animate={{
                  cx: [`${startX}%`, `${endX}%`],
                  cy: [`${startY}%`, `${endY}%`],
                  opacity: [0, 1, 0],
                  r: [3, 5, 3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>

        {/* Floating Data Particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: `hsl(${180 + i * 8}, 80%, 65%)`,
                boxShadow: `0 0 15px hsl(${180 + i * 8}, 80%, 65%)`
              }}
              animate={{
                x: [Math.random() * 1200, Math.random() * 1200, Math.random() * 1200],
                y: [Math.random() * 800, Math.random() * 800, Math.random() * 800],
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.96, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="cyber-card"
          style={{
            width: '88%',
            maxWidth: 1050,
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '18px',
            borderRadius: 14,
            background: 'linear-gradient(145deg, rgba(8,24,42,0.98), rgba(4,10,18,0.98))',
            border: '2px solid rgba(14,165,233,0.55)',
            position: 'relative',
            boxShadow: '0 40px 130px rgba(0,0,0,0.9), 0 0 70px rgba(14,165,233,0.28)',
            overflow: 'hidden'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#0ea5e9' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.div style={{ width: 32, height: 32, position: 'relative' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Image src="/logo_original.png" alt="SYNTX" width={32} height={32} style={{ filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.5))' }} />
              </motion.div>
              <div>
                <h2 className="glow-text" style={{ fontSize: 18, fontWeight: 900, color: '#0ea5e9', fontFamily: 'monospace', margin: 0, letterSpacing: 1.5 }}>FIELD ANALYTICS</h2>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>Neural Performance Analysis</div>
              </div>
            </div>
            <button onClick={onClose} className="cyber-btn" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>×</button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 5, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            {(['uses', 'score', 'success'] as const).map(sort => (
              <button key={sort} onClick={() => setSortBy(sort)} className="cyber-btn" style={{ padding: '4px 10px', borderRadius: 5, border: sortBy === sort ? '1px solid rgba(14,165,233,0.5)' : '1px solid rgba(255,255,255,0.15)', background: sortBy === sort ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.05)', color: sortBy === sort ? '#0ea5e9' : 'rgba(255,255,255,0.5)', fontSize: 8, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>
                {sort === 'uses' ? '🔥 USES' : sort === 'score' ? '⚡ SCORE' : '✨ SUCCESS'}
              </button>
            ))}
          </motion.div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, display: 'grid', gap: 6, position: 'relative', zIndex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <motion.div style={{ width: 35, height: 35, border: '3px solid rgba(14,165,233,0.2)', borderTopColor: '#0ea5e9', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : sortedAnalytics.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
                No analytics data yet
              </div>
            ) : (
              sortedAnalytics.map((field, idx) => <FieldCard key={idx} field={field} index={idx} />)
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function FieldCard({ field, index }: { field: FieldAnalytics; index: number }) {
  const scoreColor = field.avg_score >= 0.7 ? '#10b981' : field.avg_score >= 0.4 ? '#f59e0b' : '#ef4444';
  const hasProblems = field.problem_indicators && field.problem_indicators.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.005, x: 3 }}
      className="cyber-card"
      style={{
        padding: 12,
        borderRadius: 9,
        background: hasProblems ? 'rgba(239,68,68,0.05)' : 'rgba(0,0,0,0.6)',
        border: hasProblems ? '1px solid rgba(239,68,68,0.3)' : `1px solid ${scoreColor}20`,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 10, alignItems: 'center' }}>
        <motion.div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `conic-gradient(${scoreColor} ${field.avg_score * 360}deg, rgba(0,0,0,0.3) 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ position: 'absolute', width: 34, height: 34, borderRadius: '50%', background: 'rgba(8,24,42,1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: scoreColor, fontFamily: 'monospace' }}>
            {(field.avg_score * 100).toFixed(0)}%
          </div>
        </motion.div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0ea5e9', fontFamily: 'monospace' }}>{field.field}</div>
            {hasProblems && <span style={{ fontSize: 10 }}>⚠️</span>}
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            {field.total_uses} uses • {(field.success_rate * 100).toFixed(0)}% success
          </div>
          {hasProblems && (
            <div style={{ fontSize: 7, color: '#ef4444', fontFamily: 'monospace', marginTop: 2 }}>
              {field.problem_indicators!.join(', ')}
            </div>
          )}
        </div>

        <div style={{ padding: '4px 9px', borderRadius: 6, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: '#8b5cf6', fontFamily: 'monospace' }}>{field.recent_prompts}</div>
          <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>RECENT</div>
        </div>

        <div style={{ padding: '5px 11px', borderRadius: 6, background: `linear-gradient(135deg, ${scoreColor}18, ${scoreColor}06)`, border: `1.5px solid ${scoreColor}32`, textAlign: 'center' }}>
          <div className="glow-text" style={{ fontSize: 14, fontWeight: 900, color: scoreColor, fontFamily: 'monospace' }}>
            {(field.avg_score * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

### 📄 src/components/optimizer/index.ts
```typescript
export { default as OptimizerPanel } from './OptimizerPanel';
export { default as OptimizerHeader } from './OptimizerHeader';
export { default as StatsStream } from './StatsStream';
export { default as AnalyzeButton } from './AnalyzeButton';
export { default as SuggestionCard } from './SuggestionCard';
export { default as EmptyState } from './EmptyState';
export { default as LoadingState } from './LoadingState';
```

### 📄 src/components/optimizer/LoadingState.tsx
```typescript
"use client";
import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 400,
      gap: 20
    }}>
      <motion.div
        style={{
          width: 80,
          height: 80,
          border: '4px solid rgba(0,212,255,0.2)',
          borderTopColor: '#00d4ff',
          borderRadius: '50%',
          boxShadow: '0 0 40px rgba(0,212,255,0.4)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      
      <div style={{ display: 'flex', gap: 10 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d4ff, #d946ef)',
              boxShadow: '0 0 15px rgba(0,212,255,0.6)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      
      <motion.p
        className="glow-text"
        style={{
          fontSize: 14,
          color: '#00d4ff',
          fontFamily: 'monospace',
          letterSpacing: 2,
          fontWeight: 700
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING...
      </motion.p>
    </div>
  );
}
```

### 📄 src/components/optimizer/OptimizerHeader.tsx
```typescript
"use client";
import { motion } from "framer-motion";

export default function OptimizerHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="cyber-card"
      style={{
        padding: '20px 24px',
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(0,212,255,0.3)',
        position: 'relative',
        overflow: 'visible',
        marginBottom: 20
      }}
    >
      <div className="scan-line" style={{ '--scan-color': '#00d4ff' } as React.CSSProperties} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.div
          className="float pulse"
          style={{
            fontSize: 48,
            filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.6))'
          }}
        >
          🤖
        </motion.div>
        
        <div style={{ flex: 1 }}>
          <h2 className="glow-text" style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#00d4ff',
            fontFamily: 'monospace',
            letterSpacing: 3,
            margin: 0,
            textShadow: '0 0 20px rgba(0,212,255,0.8)'
          }}>
            AUTONOMOUS OPTIMIZER
          </h2>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'monospace',
            margin: '6px 0 0 0',
            letterSpacing: 1
          }}>
            System learns • Self-evolves • Field optimization
          </p>
        </div>

        <motion.div
          className="cyber-card"
          style={{
            padding: '12px 20px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
            border: '1px solid rgba(16,185,129,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(16,185,129,0.3)',
              '0 0 40px rgba(16,185,129,0.5)',
              '0 0 20px rgba(16,185,129,0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 15px rgba(16,185,129,0.8)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="neon" style={{
            fontSize: 11,
            color: '#10b981',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: 2
          }}>
            LEARNING
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
```

### 📄 src/components/optimizer/OptimizerPanel.tsx
```typescript
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizerHeader from "./OptimizerHeader";
import SystemStatusCard from "./SystemStatusCard";
import StatsStream from "./StatsStream";
import AnalyzeButton from "./AnalyzeButton";
import SuggestionCard from "./SuggestionCard";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import FieldAnalyticsModal from "./FieldAnalyticsModal";
import RecentLogsModal from "./RecentLogsModal";
import ChangelogModal from "./ChangelogModal";

const cyberStyles = `
  @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px var(--glow-color, #00d4ff); } 50% { box-shadow: 0 0 40px var(--glow-color, #00d4ff), 0 0 60px var(--glow-color, #00d4ff); } }
  @keyframes borderFlow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
  @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px currentColor; } 50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; } }
  @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
  @keyframes slideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes scanLine { 0% { top: -10%; opacity: 0; } 50% { opacity: 0.5; } 100% { top: 110%; opacity: 0; } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes neonFlicker { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.8; } 94% { opacity: 1; } 96% { opacity: 0.9; } 97% { opacity: 1; } }
  @keyframes dataStream { 0% { background-position: 0% 0%; } 100% { background-position: 0% 100%; } }
  .cyber-card { position: relative; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
  .cyber-card:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
  .cyber-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--glow-color, #00d4ff), transparent); opacity: 0.8; }
  .cyber-btn { position: relative; overflow: hidden; transition: all 0.3s ease; }
  .cyber-btn:hover:not(:disabled) { transform: scale(1.02); filter: brightness(1.2); }
  .cyber-btn::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease; }
  .cyber-btn:hover::after { left: 100%; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .neon { animation: neonFlicker 4s infinite; }
  .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
  .scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--scan-color, #00d4ff), transparent); animation: scanLine 3s linear infinite; pointer-events: none; z-index: 10; }
  .data-stream { background: linear-gradient(180deg, rgba(0,212,255,0.03) 0%, transparent 30%, transparent 70%, rgba(217,70,239,0.03) 100%); background-size: 100% 200%; animation: dataStream 8s linear infinite; }
`;

interface Suggestion {
  suggestion_id: string;
  profile_id: string;
  field_name: string;
  confidence: number;
  patterns_to_add: string[];
  reasoning: string;
  estimated_impact: { patterns_before: number; patterns_after: number; new_patterns: number; };
}

export default function OptimizerPanel() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => { fetchSuggestions(); }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/autonomous/suggestions");
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerAnalysis = async () => {
    setAnalyzing(true);
    try {
      await fetch("https://dev.syntx-system.com/resonanz/scoring/autonomous/analyze?days=7&score_threshold=0.5&min_occurrences=2", { method: "POST" });
      await fetchSuggestions();
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const applySuggestion = async (id: string) => {
    try {
      await fetch(`https://dev.syntx-system.com/resonanz/scoring/autonomous/apply/${id}`, { method: "POST" });
      setSuggestions(prev => prev.filter(s => s.suggestion_id !== id));
    } catch (error) {
      console.error("Apply failed:", error);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div style={{ position: 'relative' }}>
      <style>{cyberStyles}</style>
      <OptimizerHeader />
      <SystemStatusCard />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <QuickActionButton onClick={() => setShowAnalytics(true)} label="ANALYTICS" icon="📈" color="#f59e0b" />
        <QuickActionButton onClick={() => setShowLogs(true)} label="LOGS" icon="📋" color="#00d4ff" />
        <QuickActionButton onClick={() => setShowChangelog(true)} label="CHANGELOG" icon="📜" color="#8b5cf6" />
        <div className="cyber-card" style={{ padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(217,70,239,0.4)', background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          <span style={{ color: '#d946ef', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{suggestions.length} PENDING</span>
        </div>
      </div>

      <StatsStream pending={suggestions.length} window="7d" confidence="95%" />
      <AnalyzeButton analyzing={analyzing} onAnalyze={triggerAnalysis} />
      
      {suggestions.length === 0 ? <EmptyState /> : (
        <AnimatePresence mode="popLayout">
          {suggestions.map((suggestion, idx) => (
            <SuggestionCard key={suggestion.suggestion_id} suggestion={suggestion} index={idx} onApply={() => applySuggestion(suggestion.suggestion_id)} />
          ))}
        </AnimatePresence>
      )}

      <FieldAnalyticsModal isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} />
      <RecentLogsModal isOpen={showLogs} onClose={() => setShowLogs(false)} />
      <ChangelogModal isOpen={showChangelog} onClose={() => setShowChangelog(false)} />
    </div>
  );
}

function QuickActionButton({ onClick, label, icon, color }: { onClick: () => void; label: string; icon: string; color: string }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="cyber-btn" style={{ padding: '16px 20px', borderRadius: 14, border: `1px solid ${color}40`, background: `linear-gradient(135deg, ${color}15, ${color}05)`, color: color, fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 0 20px ${color}10` }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </motion.button>
  );
}
```

### 📄 src/components/optimizer/QuickActionsBar.tsx
```typescript
"use client";
import { motion } from "framer-motion";

interface Props {
  onOpenAnalytics: () => void;
  onOpenLogs: () => void;
  pendingSuggestions: number;
}

export default function QuickActionsBar({ onOpenAnalytics, onOpenLogs, pendingSuggestions }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      marginBottom: 20
    }}>
      <motion.button
        onClick={onOpenAnalytics}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="cyber-btn"
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          border: '1px solid rgba(245,158,11,0.4)',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
          color: '#f59e0b',
          fontFamily: 'monospace',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 0 20px rgba(245,158,11,0.1)'
        }}
      >
        <span style={{ fontSize: 20 }}>📈</span>
        ANALYTICS
      </motion.button>

      <motion.button
        onClick={onOpenLogs}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="cyber-btn"
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          border: '1px solid rgba(0,212,255,0.4)',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
          color: '#00d4ff',
          fontFamily: 'monospace',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 0 20px rgba(0,212,255,0.1)'
        }}
      >
        <span style={{ fontSize: 20 }}>📋</span>
        LOGS
      </motion.button>

      <motion.div
        className="cyber-card"
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          border: '1px solid rgba(217,70,239,0.4)',
          background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          position: 'relative'
        }}
        animate={{
          boxShadow: pendingSuggestions > 0 
            ? [
                '0 0 20px rgba(217,70,239,0.2)',
                '0 0 40px rgba(217,70,239,0.4)',
                '0 0 20px rgba(217,70,239,0.2)'
              ]
            : '0 0 20px rgba(217,70,239,0.1)'
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={{ fontSize: 20 }}>🎯</span>
        <span style={{
          color: '#d946ef',
          fontFamily: 'monospace',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1
        }}>
          {pendingSuggestions} PENDING
        </span>
      </motion.div>
    </div>
  );
}
```

### 📄 src/components/optimizer/RecentLogsModal.tsx
```typescript
"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface LogEntry {
  timestamp: string;
  field: string;
  prompt: string;
  score: number;
  profile_used: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecentLogsModal({ isOpen, onClose }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [fieldFilter, setFieldFilter] = useState("");
  const [profileFilter, setProfileFilter] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState<'time' | 'score' | 'field'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (isOpen) fetchLogs(); }, [isOpen]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/logs?limit=100");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedLogs = useMemo(() => {
    let filtered = logs.filter(log => {
      const matchesField = !fieldFilter || log.field.toLowerCase().includes(fieldFilter.toLowerCase());
      const matchesProfile = !profileFilter || log.profile_used.toLowerCase().includes(profileFilter.toLowerCase());
      const matchesScore = log.score >= minScore / 100;
      return matchesField && matchesProfile && matchesScore;
    });
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'time') comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      else if (sortBy === 'score') comparison = a.score - b.score;
      else if (sortBy === 'field') comparison = a.field.localeCompare(b.field);
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    return filtered;
  }, [logs, fieldFilter, profileFilter, minScore, sortBy, sortOrder]);

  const stats = useMemo(() => {
    if (filteredAndSortedLogs.length === 0) return { avg: 0, total: 0, success: 0 };
    const avg = filteredAndSortedLogs.reduce((sum, log) => sum + log.score, 0) / filteredAndSortedLogs.length;
    const success = filteredAndSortedLogs.filter(log => log.score >= 0.7).length / filteredAndSortedLogs.length;
    return { avg: (avg * 100).toFixed(0), total: filteredAndSortedLogs.length, success: (success * 100).toFixed(0) };
  }, [filteredAndSortedLogs]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* MEGA NEURAL NETWORK - CYAN THEME */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="neuralGradLogs" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.7 }} />
            </linearGradient>
            <filter id="glowLogs">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Neural Grid - 7x9 Dense */}
          {[...Array(7)].map((_, row) => 
            [...Array(9)].map((_, col) => {
              const x = 12 + col * 11;
              const y = 12 + row * 14;
              
              return (
                <g key={`node-${row}-${col}`}>
                  {col < 8 && [...Array(4)].map((_, i) => {
                    const targetRow = Math.max(0, Math.min(6, row + i - 1.5));
                    const x2 = 12 + (col + 1) * 11;
                    const y2 = 12 + targetRow * 14;
                    return (
                      <motion.line
                        key={`conn-${row}-${col}-${i}`}
                        x1={`${x}%`}
                        y1={`${y}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="url(#neuralGradLogs)"
                        strokeWidth="2"
                        filter="url(#glowLogs)"
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                          strokeWidth: [2, 3.5, 2]
                        }}
                        transition={{
                          duration: 1.8 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: (row * 9 + col) * 0.04
                        }}
                      />
                    );
                  })}
                  
                  <motion.circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="5"
                    fill="url(#neuralGradLogs)"
                    filter="url(#glowLogs)"
                    animate={{
                      r: [5, 7, 5],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.3 + Math.random() * 0.8,
                      repeat: Infinity,
                      delay: (row * 9 + col) * 0.03
                    }}
                  />
                </g>
              );
            })
          )}
          
          {/* Signal Pulses */}
          {[...Array(20)].map((_, i) => {
            const startX = 12 + (i % 9) * 11;
            const startY = 12 + Math.floor(i / 9) * 14;
            const endX = 88;
            const endY = 50;
            
            return (
              <motion.circle
                key={`pulse-${i}`}
                r="4"
                fill="#00d4ff"
                filter="url(#glowLogs)"
                animate={{
                  cx: [`${startX}%`, `${endX}%`],
                  cy: [`${startY}%`, `${endY}%`],
                  opacity: [0, 1, 0],
                  r: [4, 6, 4]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>

        {/* Floating Particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: `hsl(${190 + i * 6}, 85%, 65%)`,
                boxShadow: `0 0 18px hsl(${190 + i * 6}, 85%, 65%)`
              }}
              animate={{
                x: [Math.random() * 1200, Math.random() * 1200, Math.random() * 1200],
                y: [Math.random() * 800, Math.random() * 800, Math.random() * 800],
                scale: [1, 2, 1],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{
                duration: 9 + Math.random() * 9,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.96, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="cyber-card"
          style={{
            width: '88%',
            maxWidth: 1050,
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '18px',
            borderRadius: 14,
            background: 'linear-gradient(145deg, rgba(8,24,42,0.98), rgba(4,10,18,0.98))',
            border: '2px solid rgba(0,212,255,0.55)',
            position: 'relative',
            boxShadow: '0 40px 130px rgba(0,0,0,0.9), 0 0 70px rgba(0,212,255,0.28)',
            overflow: 'hidden'
          }}
        >
          <div className="scan-line" style={{ '--scan-color': '#00d4ff' } as React.CSSProperties} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.div style={{ width: 32, height: 32, position: 'relative' }} animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                <Image src="/logo_original.png" alt="SYNTX" width={32} height={32} style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.5))' }} />
              </motion.div>
              <div>
                <h2 className="glow-text" style={{ fontSize: 18, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace', margin: 0, letterSpacing: 1.5 }}>RECENT LOGS</h2>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>Real-time Activity Stream</div>
              </div>
            </div>
            <button onClick={onClose} className="cyber-btn" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>×</button>
          </div>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            <div className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>{stats.avg}%</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>AVG</div>
            </div>
            <div className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#8b5cf6', fontFamily: 'monospace' }}>{stats.total}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>TOTAL</div>
            </div>
            <div className="cyber-card" style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>{stats.success}%</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>SUCCESS</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            <input type="text" placeholder="🔍 Field..." value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)} style={{ padding: '6px 9px', borderRadius: 6, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontFamily: 'monospace', fontSize: 9, outline: 'none' }} />
            <input type="text" placeholder="👤 Profile..." value={profileFilter} onChange={(e) => setProfileFilter(e.target.value)} style={{ padding: '6px 9px', borderRadius: 6, border: '1px solid rgba(217,70,239,0.3)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontFamily: 'monospace', fontSize: 9, outline: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 7px', borderRadius: 6, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(0,0,0,0.5)' }}>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{minScore}%</span>
              <input type="range" min="0" max="100" value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} style={{ flex: 1, accentColor: '#f59e0b' }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 5, marginBottom: 7, position: 'relative', zIndex: 1 }}>
            {(['time', 'score', 'field'] as const).map(sort => (
              <button key={sort} onClick={() => { if (sortBy === sort) setSortOrder(o => o === 'asc' ? 'desc' : 'asc'); else setSortBy(sort); }} className="cyber-btn" style={{ padding: '4px 8px', borderRadius: 5, border: sortBy === sort ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.15)', background: sortBy === sort ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)', color: sortBy === sort ? '#00d4ff' : 'rgba(255,255,255,0.5)', fontSize: 8, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>
                {sort} {sortBy === sort && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            ))}
            <button onClick={fetchLogs} className="cyber-btn" style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 5, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: 8, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>↻ REFRESH</button>
          </motion.div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, display: 'grid', gap: 5, position: 'relative', zIndex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <motion.div style={{ width: 35, height: 35, border: '3px solid rgba(0,212,255,0.2)', borderTopColor: '#00d4ff', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : filteredAndSortedLogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 25, color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 35, marginBottom: 7 }}>📋</div>
                {fieldFilter || profileFilter || minScore > 0 ? 'No logs match filters' : 'No logs yet'}
              </div>
            ) : (
              filteredAndSortedLogs.map((log, idx) => <LogRow key={idx} log={log} index={idx} />)
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function LogRow({ log, index }: { log: LogEntry; index: number }) {
  const scoreColor = log.score >= 0.7 ? '#10b981' : log.score >= 0.4 ? '#f59e0b' : '#ef4444';
  const percentage = (log.score * 100).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.008 }}
      whileHover={{ scale: 1.003, x: 2 }}
      className="cyber-card"
      style={{ padding: 8, borderRadius: 7, background: 'rgba(0,0,0,0.6)', border: `1px solid ${scoreColor}18`, display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 8, alignItems: 'center' }}
    >
      <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: scoreColor, boxShadow: `0 0 8px ${scoreColor}` }} animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#00d4ff', fontFamily: 'monospace', marginBottom: 2 }}>{log.field}</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.34)', fontFamily: 'monospace', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.prompt ? log.prompt.substring(0, 35) : 'No prompt'}...</div>
        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace' }}>{new Date(log.timestamp).toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</div>
      </div>
      <div style={{ padding: '2px 6px', borderRadius: 4, background: 'rgba(217,70,239,0.08)', border: '1px solid rgba(217,70,239,0.24)', fontSize: 7, color: '#d946ef', fontFamily: 'monospace', fontWeight: 700, whiteSpace: 'nowrap' }}>{log.profile_used}</div>
      <div style={{ padding: '5px 10px', borderRadius: 5, background: `linear-gradient(135deg, ${scoreColor}20, ${scoreColor}06)`, border: `1.5px solid ${scoreColor}35`, textAlign: 'center', minWidth: 45 }}>
        <div className="glow-text" style={{ fontSize: 13, fontWeight: 900, color: scoreColor, fontFamily: 'monospace', lineHeight: 1 }}>{percentage}%</div>
      </div>
    </motion.div>
  );
}
```

### 📄 src/components/optimizer/StatsStream.tsx
```typescript
"use client";
import { motion } from "framer-motion";

interface Props {
  pending: number;
  window: string;
  confidence: string;
}

export default function StatsStream({ pending, window, confidence }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      marginBottom: 20
    }}>
      <StatCard label="Pending" value={pending} color="#00d4ff" icon="📊" delay={0} />
      <StatCard label="Window" value={window} color="#d946ef" icon="⏱️" delay={0.1} />
      <StatCard label="Confidence" value={confidence} color="#10b981" icon="🎯" delay={0.2} />
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  color, 
  icon, 
  delay 
}: { 
  label: string; 
  value: string | number; 
  color: string; 
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="cyber-card float"
      style={{
        padding: 20,
        borderRadius: 16,
        background: `linear-gradient(145deg, ${color}15, ${color}05)`,
        border: `1px solid ${color}40`,
        position: 'relative',
        overflow: 'visible',
        animationDelay: `${delay}s`
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.8
      }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <span style={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: 2
        }}>
          {label}
        </span>
      </div>
      
      <div className="glow-text" style={{
        fontSize: 36,
        fontWeight: 900,
        color: color,
        fontFamily: 'monospace',
        textShadow: `0 0 20px ${color}`
      }}>
        {value}
      </div>
    </motion.div>
  );
}
```

### 📄 src/components/optimizer/SuggestionCard.tsx
```typescript
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
  suggestion_id: string;
  profile_id: string;
  field_name: string;
  confidence: number;
  patterns_to_add: string[];
  reasoning: string;
  estimated_impact: {
    patterns_before: number;
    patterns_after: number;
    new_patterns: number;
  };
}

interface Props {
  suggestion: Suggestion;
  index: number;
  onApply: () => void;
}

export default function SuggestionCard({ suggestion, index, onApply }: Props) {
  const [applying, setApplying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    await onApply();
  };

  const confidenceColor = suggestion.confidence >= 0.8 ? '#10b981' : suggestion.confidence >= 0.6 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="cyber-card"
      style={{
        padding: 20,
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(0,212,255,0.3)',
        position: 'relative',
        overflow: 'visible',
        marginBottom: 16
      }}
    >
      <div className="scan-line" style={{ '--scan-color': confidenceColor } as React.CSSProperties} />

      {/* Header Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <motion.div
              className="pulse"
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#00d4ff',
                boxShadow: '0 0 15px rgba(0,212,255,0.8)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <h3 className="glow-text" style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#00d4ff',
              fontFamily: 'monospace',
              margin: 0,
              letterSpacing: 1
            }}>
              {suggestion.field_name}
            </h3>
          </div>
          <p style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace',
            margin: 0
          }}>
            {suggestion.profile_id}
          </p>
        </div>

        <motion.div
          className="cyber-card"
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            background: `linear-gradient(135deg, ${confidenceColor}25, ${confidenceColor}10)`,
            border: `1px solid ${confidenceColor}50`,
            boxShadow: `0 0 20px ${confidenceColor}20`
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${confidenceColor}20`,
              `0 0 30px ${confidenceColor}40`,
              `0 0 20px ${confidenceColor}20`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 700,
            color: confidenceColor,
            textAlign: 'center',
            letterSpacing: 1
          }}>
            {(suggestion.confidence * 100).toFixed(0)}%
          </div>
          <div style={{
            fontSize: 8,
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
            marginTop: 2
          }}>
            CONFIDENCE
          </div>
        </motion.div>
      </div>

      {/* Patterns Preview */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontSize: 9,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'monospace',
          marginBottom: 10,
          letterSpacing: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span>📝</span> PATTERNS TO ADD:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {suggestion.patterns_to_add.slice(0, 4).map((pattern, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + idx * 0.1 }}
              className="cyber-card shimmer"
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(217,70,239,0.2), rgba(217,70,239,0.05))',
                border: '1px solid rgba(217,70,239,0.4)',
                color: '#d946ef',
                fontSize: 11,
                fontFamily: 'monospace',
                fontWeight: 600,
                boxShadow: '0 0 15px rgba(217,70,239,0.2)'
              }}
            >
              {pattern}
            </motion.span>
          ))}
          {suggestion.patterns_to_add.length > 4 && (
            <span style={{
              padding: '8px 14px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              fontFamily: 'monospace'
            }}>
              +{suggestion.patterns_to_add.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Impact Visualization */}
      <div className="cyber-card data-stream" style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
              {suggestion.estimated_impact.patterns_before}
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: 1 }}>
              BEFORE
            </div>
          </div>
          
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 24, color: '#00d4ff' }}
          >
            →
          </motion.div>
          
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div className="glow-text" style={{ fontSize: 24, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>
              {suggestion.estimated_impact.patterns_after}
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: 1 }}>
              AFTER
            </div>
          </div>
          
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div className="pulse" style={{ fontSize: 24, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
              +{suggestion.estimated_impact.new_patterns}
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: 1 }}>
              NEW
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Reasoning */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="data-stream"
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(0,212,255,0.2)',
              marginBottom: 16,
              overflow: 'hidden'
            }}
          >
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              marginBottom: 10,
              letterSpacing: 2
            }}>
              🧠 ANALYSIS:
            </div>
            <p style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'system-ui'
            }}>
              {suggestion.reasoning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        <motion.button
          onClick={handleApply}
          disabled={applying}
          whileHover={{ scale: applying ? 1 : 1.02 }}
          whileTap={{ scale: applying ? 1 : 0.98 }}
          className="cyber-btn"
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: 12,
            border: 'none',
            background: applying
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
            color: applying ? 'rgba(255,255,255,0.3)' : '#030b15',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 2,
            cursor: applying ? 'not-allowed' : 'pointer',
            boxShadow: applying ? 'none' : '0 0 30px rgba(0,212,255,0.4)'
          }}
        >
          {applying ? '⏳ APPLYING...' : '✓ APPLY'}
        </motion.button>
        
        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cyber-btn"
          style={{
            padding: '14px 20px',
            borderRadius: 12,
            border: '1px solid rgba(217,70,239,0.4)',
            background: expanded 
              ? 'linear-gradient(135deg, rgba(217,70,239,0.2), rgba(217,70,239,0.05))'
              : 'transparent',
            color: '#d946ef',
            fontFamily: 'monospace',
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: expanded ? '0 0 20px rgba(217,70,239,0.3)' : 'none'
          }}
        >
          {expanded ? '−' : '+'}
        </motion.button>
      </div>
    </motion.div>
  );
}
```

### 📄 src/components/optimizer/SystemStatusCard.tsx
```typescript
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SystemStatus {
  status: string;
  version: string;
  pending_suggestions: number;
  features: string[];
}

export default function SystemStatusCard() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/autonomous/status");
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !status) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cyber-card"
      style={{
        padding: 20,
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(16,185,129,0.3)',
        position: 'relative',
        overflow: 'visible',
        marginBottom: 20
      }}
    >
      <div className="scan-line" style={{ '--scan-color': '#10b981' } as React.CSSProperties} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <motion.div
          className="pulse"
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 20px rgba(16,185,129,0.8)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="glow-text" style={{
          fontSize: 14,
          fontWeight: 800,
          color: '#10b981',
          fontFamily: 'monospace',
          letterSpacing: 2
        }}>
          {status.status}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{
          padding: 12,
          borderRadius: 10,
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.2)'
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4, fontFamily: 'monospace' }}>
            VERSION
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>
            {status.version}
          </div>
        </div>
        
        <div style={{
          padding: 12,
          borderRadius: 10,
          background: 'rgba(217,70,239,0.1)',
          border: '1px solid rgba(217,70,239,0.2)'
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4, fontFamily: 'monospace' }}>
            PENDING
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#d946ef', fontFamily: 'monospace' }}>
            {status.pending_suggestions}
          </div>
        </div>
      </div>

      <div style={{
        fontSize: 9,
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'monospace',
        marginBottom: 8,
        letterSpacing: 1
      }}>
        FEATURES:
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {status.features.map((feature, idx) => (
          <span
            key={idx}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
              color: '#10b981',
              fontSize: 9,
              fontFamily: 'monospace',
              fontWeight: 600
            }}
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
```

### 📄 src/components/profiles/component-breakdown/ComponentBreakdownPanel.tsx
```typescript
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PatternMolecule from './PatternMolecule';
import { getProfile } from '@/lib/api';

interface Props {
  profileId: string;
}

interface Pattern {
  term: string;
  frequency: number;
  contribution: number;
}

interface Component {
  name: string;
  score: number;
  weight: number;
  weighted: number;
  patterns: Pattern[];
  group: 'motion_cluster' | 'energy_cluster' | 'feedback_cluster' | 'precision_cluster';
}

// Map component names to cluster groups
const COMPONENT_TO_CLUSTER: Record<string, Component['group']> = {
  dynamic_patterns: 'motion_cluster',
  movement_core: 'motion_cluster',
  drift_patterns: 'motion_cluster',
  resonance_core: 'feedback_cluster',
  feedback_loops: 'feedback_cluster',
  coherence_field: 'feedback_cluster',
  energy_flow: 'energy_cluster',
  intensity_patterns: 'energy_cluster',
  precision_core: 'precision_cluster',
  accuracy_patterns: 'precision_cluster'
};

export default function ComponentBreakdownPanel({ profileId }: Props) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  useEffect(() => {
    fetchComponents();
  }, [profileId]);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      // Fetch profile data
      const profileData = await getProfile(profileId);
      
      // Extract components from profile
      const extractedComponents: Component[] = [];
      
      if (profileData.profile?.components) {
        Object.entries(profileData.profile.components).forEach(([componentName, componentData]: [string, any]) => {
          // Extract patterns from component
          const patterns: Pattern[] = [];
          
          if (componentData.patterns) {
            Object.entries(componentData.patterns).forEach(([patternName, patternValue]: [string, any]) => {
              // Handle different pattern structures
              let frequency = 0;
              if (typeof patternValue === 'object' && patternValue !== null) {
                frequency = Math.round((patternValue.weight || patternValue.value || 0) * 100);
              } else if (typeof patternValue === 'number') {
                frequency = Math.round(patternValue * 100);
              }
              
              patterns.push({
                term: patternName,
                frequency: frequency,
                contribution: frequency / 100
              });
            });
          }
          
          // Sort patterns by frequency
          patterns.sort((a, b) => b.frequency - a.frequency);
          
          // Determine cluster group
          const group = COMPONENT_TO_CLUSTER[componentName] || 'precision_cluster';
          
          // Calculate component score
          const score = componentData.weight || componentData.score || 0.8;
          const weight = componentData.weight || 0.5;
          
          extractedComponents.push({
            name: componentName,
            score: score,
            weight: weight,
            weighted: score * weight,
            patterns: patterns.slice(0, 8), // Max 8 patterns per component
            group: group
          });
        });
      }
      
      // If no components found, use fallback mock data
      if (extractedComponents.length === 0) {
        console.warn('No components found in profile, using mock data');
        extractedComponents.push(
          {
            name: 'dynamic_patterns',
            score: 0.82,
            weight: 0.6,
            weighted: 0.49,
            group: 'motion_cluster',
            patterns: [
              { term: 'wandert', frequency: 92, contribution: 0.92 },
              { term: 'gleitet', frequency: 88, contribution: 0.88 },
              { term: 'fließt', frequency: 76, contribution: 0.76 }
            ]
          }
        );
      }
      
      setComponents(extractedComponents);
    } catch (error) {
      console.error('Failed to fetch components:', error);
      
      // Fallback to mock data on error
      setComponents([
        {
          name: 'dynamic_patterns',
          score: 0.82,
          weight: 0.6,
          weighted: 0.49,
          group: 'motion_cluster',
          patterns: [
            { term: 'wandert', frequency: 92, contribution: 0.92 },
            { term: 'gleitet', frequency: 88, contribution: 0.88 },
            { term: 'fließt', frequency: 76, contribution: 0.76 }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMirror = (term: string) => {
    setSelectedPattern(term);
    console.log('🔍 Mirror:', term);
  };

  // Hexagonal grid positioning
  const getHexPosition = (index: number, total: number) => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    const offsetX = row % 2 === 1 ? 90 : 0;
    return {
      x: col * 180 + offsetX,
      y: row * 140
    };
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingBottom: 80 }}>
        <motion.div
          style={{ position: 'relative' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ width: 80, height: 80, border: '4px solid rgba(6,182,212,0.2)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: 0, width: 80, height: 80, border: '4px solid transparent', borderTopColor: '#06b6d4', borderRadius: '50%' }} />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* MATRIX RAIN */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.05, pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: ['0%', '100%'] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 3
            }}
            style={{
              position: 'absolute',
              left: `${(i / 20) * 100}%`,
              width: 2,
              height: '20%',
              background: 'linear-gradient(to bottom, transparent, #0ea5e9, transparent)',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* COMPONENTS */}
      {components.map((component, idx) => (
        <motion.div
          key={component.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          style={{ marginBottom: 48 }}
        >
          {/* CYBER HEADER */}
          <div style={{ 
            marginBottom: 32,
            padding: 12,
            borderRadius: 8,
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(14,165,233,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="scan-line" style={{ '--scan-color': '#0ea5e9' } as React.CSSProperties} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: 18 }}
              >
                ⚙️
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 800, 
                  color: '#0ea5e9', 
                  fontFamily: 'monospace',
                  letterSpacing: 1.5
                }}>
                  {component.name}
                </div>
                <div style={{ 
                  fontSize: 10, 
                  color: 'rgba(255,255,255,0.4)', 
                  fontFamily: 'monospace',
                  marginTop: 2
                }}>
                  WEIGHT: {(component.weight * 100).toFixed(0)}% | SCORE: {(component.score * 100).toFixed(0)}%
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 24, fontWeight: 800, color: 'white', fontFamily: 'monospace' }}
                >
                  {(component.weighted * 100).toFixed(1)}%
                </motion.div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: 1 }}>
                  WEIGHTED
                </div>
              </div>
            </div>
          </div>

          {/* HEXAGONAL GRID */}
          <div style={{ 
            position: 'relative',
            minHeight: Math.ceil(component.patterns.length / Math.ceil(Math.sqrt(component.patterns.length))) * 140 + 120,
            paddingLeft: 60,
            paddingRight: 60
          }}>
            {component.patterns.map((pattern, pIdx) => {
              const pos = getHexPosition(pIdx, component.patterns.length);
              return (
                <div
                  key={pattern.term}
                  style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y
                  }}
                >
                  <PatternMolecule
                    term={pattern.term}
                    frequency={pattern.frequency}
                    intensity={pattern.contribution}
                    group={component.group}
                    contribution={pattern.contribution}
                    index={pIdx}
                    onMirror={handleMirror}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* FLOATING STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          padding: 16,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.9)',
          border: '1px solid rgba(14,165,233,0.3)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1.2, color: '#0ea5e9', marginBottom: 8 }}>
          SYSTEM STATUS
        </div>
        <div style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div>
            Components: <span style={{ color: 'white', fontWeight: 700 }}>{components.length}</span>
          </div>
          <div>
            Patterns: <span style={{ color: 'white', fontWeight: 700 }}>
              {components.reduce((acc, c) => acc + c.patterns.length, 0)}
            </span>
          </div>
          {selectedPattern && (
            <div>
              Selected: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>{selectedPattern}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
```

### 📄 src/components/profiles/component-breakdown/PatternMolecule.tsx
```typescript
"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  term: string;
  frequency: number;
  intensity: number;
  group: 'motion_cluster' | 'energy_cluster' | 'feedback_cluster' | 'precision_cluster';
  contribution: number;
  index: number;
  onMirror: (term: string) => void;
}

const CLUSTER_CONFIG = {
  motion_cluster: {
    gradient: 'from-cyan-400 via-blue-500 to-cyan-600',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    icon: '🌀',
    name: 'MOTION',
    particleColor: '#06b6d4'
  },
  energy_cluster: {
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    icon: '⚡',
    name: 'ENERGY',
    particleColor: '#f97316'
  },
  feedback_cluster: {
    gradient: 'from-purple-400 via-pink-500 to-purple-600',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    icon: '🔄',
    name: 'FEEDBACK',
    particleColor: '#a855f7'
  },
  precision_cluster: {
    gradient: 'from-green-400 via-emerald-500 to-green-600',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    icon: '🎯',
    name: 'PRECISION',
    particleColor: '#10b981'
  }
};

export default function PatternMolecule({ term, frequency, intensity, group, contribution, index, onMirror }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const config = CLUSTER_CONFIG[group];

  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (360 / 8) * i,
    distance: 70
  }));

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        opacity: 1,
        y: [0, -10, 0]
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.06,
        y: {
          repeat: Infinity,
          duration: 3 + (index * 0.2),
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.15,
        rotate: [0, -3, 3, 0],
        transition: { duration: 0.4 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* ORBIT PARTICLES */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            rotate: isHovered ? 360 : 0,
            opacity: isHovered ? 1 : 0.4
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            },
            opacity: { duration: 0.3 }
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: config.particleColor,
            boxShadow: `0 0 8px ${config.particleColor}`,
            transform: `translate(-50%, -50%) rotate(${particle.angle}deg) translateX(${particle.distance}px)`,
            zIndex: -1
          }}
        />
      ))}

      {/* PULSING GLOW */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: -1
        }}
      />

      {/* MAIN CARD - BIGGER! 120x120 */}
      <motion.div
        className="relative rounded-2xl border overflow-hidden"
        animate={{
          rotateY: isHovered ? [0, 10, 0] : 0,
          rotateX: isHovered ? [0, 10, 0] : 0
        }}
        transition={{ duration: 0.6 }}
        style={{
          width: 120,
          height: 120,
          background: `linear-gradient(135deg, ${config.glowColor}, rgba(0,0,0,0.5))`,
          borderColor: 'rgba(255,255,255,0.3)',
          boxShadow: isHovered 
            ? `0 0 30px ${config.glowColor}, 0 0 50px ${config.glowColor}`
            : `0 0 20px ${config.glowColor}`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* SCAN LINE */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)',
            height: '20%',
            pointerEvents: 'none'
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-3">
          {/* ICON - BIGGER */}
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? [1, 1.2, 1] : 1
            }}
            transition={{
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 0.6, repeat: isHovered ? Infinity : 0 }
            }}
            style={{ fontSize: 40, marginBottom: 6 }}
          >
            {config.icon}
          </motion.div>

          {/* TERM - READABLE! */}
          <div 
            className="text-white font-bold text-center font-mono tracking-wider"
            style={{ fontSize: 13, lineHeight: 1.1, marginBottom: 4 }}
          >
            {term}
          </div>

          {/* STATS - BIGGER */}
          <div className="text-[11px] text-white/80 font-mono font-bold">
            {frequency}%
          </div>

          {/* CLUSTER BADGE */}
          <div className="mt-2">
            <span 
              className="text-[7px] px-2 py-1 rounded-full font-mono tracking-widest font-bold"
              style={{
                background: 'rgba(0,0,0,0.5)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {config.name}
            </span>
          </div>
        </div>

        {/* CORNER ACCENT */}
        <div 
          className="absolute top-0 right-0 w-10 h-10"
          style={{
            background: `linear-gradient(135deg, ${config.glowColor}, transparent)`,
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
          }}
        />
      </motion.div>

      {/* MIRROR BUTTON */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onMirror(term);
        }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        style={{
          padding: '5px 14px',
          borderRadius: 14,
          background: 'rgba(0,0,0,0.9)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          fontSize: 9,
          fontFamily: 'monospace',
          fontWeight: 700,
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}
      >
        🔍 MIRROR
      </motion.button>
    </motion.div>
  );
}
```

### 📄 src/components/profiles/field-stream/FieldStream.tsx
```typescript
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Moon } from 'lucide-react';
import { getProfiles, getProfileAnalytics } from '@/lib/api';

interface Props {
  onSelectProfile: (profileId: string) => void;
  selectedProfile: string | null;
}

interface ProfileData {
  id: string;
  name: string;
  description: string;
  status: string;
  avgScore: number;
  uses: number;
  tier: number;
}

export default function FieldStream({ onSelectProfile, selectedProfile }: Props) {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<number | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const [profilesData, analyticsData] = await Promise.all([
        getProfiles(),
        getProfileAnalytics(7)
      ]);
      
      const profilesList: ProfileData[] = Object.entries(profilesData.profiles).map(([id, profile]: [string, any]) => {
        const analytics = analyticsData.profiles[id];
        
        return {
          id,
          name: profile.name,
          description: profile.description,
          status: analytics ? 'active' : 'unused',
          avgScore: analytics ? Math.round(analytics.avg_score * 100) : 0,
          uses: analytics ? analytics.total_usage : 0,
          tier: id.includes('default') ? 1 : 2
        };
      });
      
      setProfiles(profilesList);
      if (profilesList.length > 0 && !selectedProfile) {
        onSelectProfile(profilesList[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = profiles.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === null || f.tier === tierFilter;
    return matchSearch && matchTier;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <motion.div
          style={{ width: 35, height: 35, border: '3px solid rgba(14,165,233,0.2)', borderTopColor: '#0ea5e9', borderRadius: '50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#0ea5e9', fontFamily: 'monospace', letterSpacing: 1.2, marginBottom: 4 }}>
        FIELD STREAM
      </div>

      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(14,165,233,0.5)' }} />
        <input
          type="text"
          placeholder="Search profiles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px 8px 32px',
            borderRadius: 8,
            border: '1px solid rgba(14,165,233,0.3)',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: 11,
            fontFamily: 'monospace',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[1, 2, 3].map(tier => (
          <button
            key={tier}
            onClick={() => setTierFilter(tierFilter === tier ? null : tier)}
            style={{
              padding: '4px 8px',
              borderRadius: 5,
              border: tierFilter === tier ? '1px solid rgba(14,165,233,0.5)' : '1px solid rgba(255,255,255,0.15)',
              background: tierFilter === tier ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.05)',
              color: tierFilter === tier ? '#0ea5e9' : 'rgba(255,255,255,0.5)',
              fontSize: 9,
              fontFamily: 'monospace',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            TIER-{tier}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((profile, idx) => (
          <ProfileCard
            key={`${profile.id}-${profile.avgScore}-${profile.uses}`}
            profile={profile}
            isSelected={selectedProfile === profile.id}
            onClick={() => onSelectProfile(profile.id)}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

function ProfileCard({ profile, isSelected, onClick, index }: any) {
  const statusConfig = {
    active: { icon: Zap, color: '#10b981', label: 'ACTIVE' },
    unused: { icon: Moon, color: '#6b7280', label: 'UNUSED' }
  };

  const config = statusConfig[profile.status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ x: 4, scale: 1.01 }}
      onClick={onClick}
      style={{
        padding: 10,
        borderRadius: 8,
        background: isSelected ? 'rgba(14,165,233,0.1)' : 'rgba(0,0,0,0.5)',
        border: isSelected ? '1px solid rgba(14,165,233,0.4)' : '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isSelected && <div className="scan-line" style={{ '--scan-color': '#0ea5e9' } as React.CSSProperties} />}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <Icon size={14} style={{ color: config.color }} />
        <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#0ea5e9', fontFamily: 'monospace' }}>
          {profile.name}
        </div>
        <span style={{
          padding: '2px 6px',
          borderRadius: 4,
          background: `${config.color}20`,
          border: `1px solid ${config.color}40`,
          color: config.color,
          fontSize: 7,
          fontFamily: 'monospace',
          fontWeight: 700
        }}>
          {config.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
        <div>Score: <span style={{ color: profile.avgScore >= 50 ? '#10b981' : '#f59e0b', fontWeight: 700 }}>{profile.avgScore}%</span></div>
        <div>Uses: <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{profile.uses}</span></div>
      </div>
    </motion.div>
  );
}
```

### 📄 src/components/profiles/ProfilesLayout.tsx
```typescript
"use client";
import { useState } from 'react';
import FieldStream from './field-stream/FieldStream';
import ResonanceStream from './resonance-stream/ResonanceStream';
import ResonanceFooter from './resonance-footer/ResonanceFooter';

export default function ProfilesLayout() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '380px 1fr',
      gridTemplateRows: '1fr auto',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* LEFT: FIELD STREAM */}
      <div style={{ 
        gridRow: '1 / 3',
        borderRight: '1px solid rgba(14,165,233,0.2)',
        background: 'rgba(0,0,0,0.3)',
        overflowY: 'auto',
        padding: 20
      }}>
        <FieldStream 
          onSelectProfile={setSelectedProfile}
          selectedProfile={selectedProfile}
        />
      </div>

      {/* RIGHT TOP: RESONANCE STREAM */}
      <div style={{ 
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <ResonanceStream profileId={selectedProfile} />
      </div>

      {/* RIGHT BOTTOM: FOOTER */}
      <div style={{ 
        borderTop: '1px solid rgba(14,165,233,0.2)',
        background: 'rgba(0,0,0,0.4)'
      }}>
        <ResonanceFooter profileId={selectedProfile} />
      </div>

      {/* CYBER GRID OVERLAY */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px),
          linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0
      }} />
    </div>
  );
}
```

### 📄 src/components/profiles/resonance-footer/ResonanceFooter.tsx
```typescript
"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  profileId: string | null;
}

export default function ResonanceFooter({ profileId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAutoSuggest = async () => {
    if (!profileId) return;
    setLoading(true);
    try {
      // TODO: Call autonomous/analyze endpoint
      console.log('🛠️ Auto-Suggest for:', profileId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Auto-suggest failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReScore = async () => {
    if (!profileId) return;
    setLoading(true);
    try {
      // TODO: Call re-score endpoint
      console.log('🔁 Re-Score for:', profileId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* TOOLS */}
      <div style={{ display: 'flex', gap: 8 }}>
        <motion.button
          onClick={handleAutoSuggest}
          disabled={!profileId || loading}
          whileHover={{ scale: profileId ? 1.05 : 1 }}
          whileTap={{ scale: profileId ? 0.95 : 1 }}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: '1px solid rgba(14,165,233,0.3)',
            background: profileId 
              ? 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(59,130,246,0.2))'
              : 'rgba(0,0,0,0.3)',
            color: profileId ? '#0ea5e9' : 'rgba(255,255,255,0.3)',
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 700,
            cursor: profileId ? 'pointer' : 'not-allowed',
            letterSpacing: 1.2,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          💡 AUTO-SUGGEST
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 12,
                height: 12,
                border: '2px solid rgba(14,165,233,0.3)',
                borderTopColor: '#0ea5e9',
                borderRadius: '50%'
              }}
            />
          )}
        </motion.button>

        <motion.button
          onClick={handleReScore}
          disabled={!profileId || loading}
          whileHover={{ scale: profileId ? 1.05 : 1 }}
          whileTap={{ scale: profileId ? 0.95 : 1 }}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.3)',
            background: profileId
              ? 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.2))'
              : 'rgba(0,0,0,0.3)',
            color: profileId ? '#ef4444' : 'rgba(255,255,255,0.3)',
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 700,
            cursor: profileId ? 'pointer' : 'not-allowed',
            letterSpacing: 1.2,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          🔴 RE-SCORE
        </motion.button>
      </div>

      {/* STATUS */}
      <div style={{
        fontSize: 10,
        fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: profileId ? '#10b981' : '#6b7280'
          }}
        />
        {profileId ? (
          <span>PROFILE: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>{profileId}</span></span>
        ) : (
          <span>NO PROFILE SELECTED</span>
        )}
      </div>
    </div>
  );
}
```

### 📄 src/components/profiles/resonance-stream/ResonanceStream.tsx
```typescript
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProfile } from '@/lib/api';
import ComponentBreakdownPanel from '../component-breakdown/ComponentBreakdownPanel';

interface Props {
  profileId: string | null;
}

export default function ResonanceStream({ profileId }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'components' | 'changelog' | 'tools'>('components');

  useEffect(() => {
    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  const fetchProfile = async () => {
    if (!profileId) return;
    setLoading(true);
    try {
      const data = await getProfile(profileId);
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profileId) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        flexDirection: 'column',
        gap: 16
      }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ fontSize: 48 }}
        >
          🌀
        </motion.div>
        <div style={{ 
          fontSize: 14, 
          color: 'rgba(14,165,233,0.6)', 
          fontFamily: 'monospace',
          letterSpacing: 2
        }}>
          SELECT PROFILE TO BEGIN
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <motion.div
          style={{ 
            width: 60, 
            height: 60, 
            border: '4px solid rgba(14,165,233,0.2)', 
            borderTopColor: '#0ea5e9', 
            borderRadius: '50%' 
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: 20,
          borderBottom: '1px solid rgba(14,165,233,0.2)',
          background: 'rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ fontSize: 24 }}
          >
            ⚡
          </motion.div>
          <div>
            <div style={{ 
              fontSize: 18, 
              fontWeight: 800, 
              color: '#0ea5e9', 
              fontFamily: 'monospace',
              letterSpacing: 1.5
            }}>
              {profileId}
            </div>
            <div style={{ 
              fontSize: 11, 
              color: 'rgba(255,255,255,0.4)', 
              fontFamily: 'monospace',
              marginTop: 2
            }}>
              {profile?.description || 'Loading...'}
            </div>
          </div>
        </div>

        {/* METADATA */}
        {profile && (
          <div style={{ 
            display: 'flex', 
            gap: 16, 
            fontSize: 10, 
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.5)',
            marginTop: 12
          }}>
            <div>
              VERSION: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>{profile.version || '1.3.2'}</span>
            </div>
            <div>
              UPDATED: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>
                {profile.last_updated || '2025-01-05'}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* TABS */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        padding: '16px 20px',
        borderBottom: '1px solid rgba(14,165,233,0.2)',
        background: 'rgba(0,0,0,0.2)'
      }}>
        {(['components', 'changelog', 'tools'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: activeTab === tab 
                ? '1px solid rgba(14,165,233,0.5)' 
                : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === tab 
                ? 'rgba(14,165,233,0.15)' 
                : 'rgba(0,0,0,0.3)',
              color: activeTab === tab ? '#0ea5e9' : 'rgba(255,255,255,0.5)',
              fontSize: 11,
              fontFamily: 'monospace',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 1.2,
              transition: 'all 0.2s'
            }}
          >
            {tab === 'components' && '🧩 '}
            {tab === 'changelog' && '📝 '}
            {tab === 'tools' && '🛠️ '}
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: 20,
        background: 'rgba(0,0,0,0.1)'
      }}>
        {activeTab === 'components' && (
          <ComponentBreakdownPanel profileId={profileId} />
        )}

        {activeTab === 'changelog' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: 40,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
              fontSize: 12
            }}
          >
            📝 CHANGELOG COMING SOON
          </motion.div>
        )}

        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: 40,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
              fontSize: 12
            }}
          >
            🛠️ TOOLS COMING SOON
          </motion.div>
        )}
      </div>

      {/* SCAN LINE EFFECT */}
      <motion.div
        animate={{
          y: ['0%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
```

### 📄 src/components/system/animations/CyberGrid.tsx
```typescript
"use client";

// ═══════════════════════════════════════════════════════════════
// 🌊 CYBER GRID - ANIMATED BACKGROUND
// ═══════════════════════════════════════════════════════════════

interface CyberGridProps {
  opacity?: number;
  color?: string;
  cellSize?: number;
}

export function CyberGrid({ 
  opacity = 0.04, 
  color = '#00d4ff',
  cellSize = 40 
}: CyberGridProps) {
  return (
    <>
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        overflow: 'hidden', 
        pointerEvents: 'none' 
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity }}>
          <defs>
            <pattern 
              id="cyberGrid" 
              width={cellSize} 
              height={cellSize} 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} 
                fill="none" 
                stroke={color} 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyberGrid)" />
        </svg>

        {/* Animated scan lines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${color}08 2px,
            ${color}08 4px
          )`,
          animation: 'scanLineMove 8s linear infinite',
          pointerEvents: 'none'
        }} />
      </div>

      <style>{`
        @keyframes scanLineMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
      `}</style>
    </>
  );
}
```

### 📄 src/components/system/animations/index.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM ANIMATIONS - EXPORT INDEX
// ═══════════════════════════════════════════════════════════════

export { NeuralNetwork } from './NeuralNetwork';
export { CyberGrid } from './CyberGrid';
```

### 📄 src/components/system/animations/NeuralNetwork.tsx
```typescript
"use client";

import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// 🌊 NEURAL NETWORK CANVAS - ULTRA CYBER
// ═══════════════════════════════════════════════════════════════

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulsePhase: number;
}

interface NeuralNetworkProps {
  particleCount?: number;
  connectionDistance?: number;
  colors?: string[];
  speed?: number;
  opacity?: number;
}

export function NeuralNetwork({
  particleCount = 50,
  connectionDistance = 150,
  colors = ['#00d4ff', '#d946ef', '#10b981', '#f59e0b'],
  speed = 0.3,
  opacity = 0.6
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Responsive canvas
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2.5 + 1,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    // Animation loop
    let animationId: number;
    let frame = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        
        // Pulse effect
        p.pulsePhase += 0.05;
        const pulse = Math.sin(p.pulsePhase) * 0.5 + 0.5;
        
        // Draw particle with glow
        const color = colors[i % colors.length];
        const particleOpacity = (0.6 + pulse * 0.4) * opacity;
        
        ctx.fillStyle = color + Math.floor(particleOpacity * 255).toString(16).padStart(2, '0');
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + pulse * 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const connectionOpacity = (1 - distance / connectionDistance) * 0.4 * opacity;
            const color = colors[i % colors.length];
            
            ctx.strokeStyle = color + Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, [particleCount, connectionDistance, colors, speed, opacity]);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}
```

### 📄 src/components/system/components/ConfigPanel.tsx
```typescript
"use client";

import React from 'react';

// ═══════════════════════════════════════════════════════════════
// 🌊 CONFIG PANEL - SYSTEM CONFIGURATION WITH EFFECTS
// ═══════════════════════════════════════════════════════════════

interface SystemConfig {
  active_wrapper: string;
  exists: boolean;
  path: string;
  source: string;
}

interface ConfigPanelProps {
  config: SystemConfig | null;
  wrapperCount: number;
  activeWrapperName: string | null;
  loading: boolean;
  onRefresh: () => void;
}

function MetricRow({ 
  label, 
  value, 
  color = '#00d4ff', 
  icon 
}: { 
  label: string; 
  value: string | number; 
  color?: string; 
  icon?: string;
}) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      padding: '14px 16px',
      background: `linear-gradient(90deg, ${color}08, transparent)`,
      borderRadius: 12, 
      marginBottom: 8,
      border: `1px solid ${color}20`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Data stream effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 10px,
          ${color}05 10px,
          ${color}05 20px
        )`,
        animation: 'dataFlow 20s linear infinite'
      }} />
      
      {icon && <span style={{ fontSize: 18, position: 'relative', zIndex: 1 }}>{icon}</span>}
      <span style={{ 
        flex: 1, 
        fontFamily: 'monospace', 
        fontSize: 12, 
        color: 'rgba(255,255,255,0.6)', 
        letterSpacing: 1,
        position: 'relative',
        zIndex: 1
      }}>
        {label}
      </span>
      <span style={{ 
        fontFamily: 'monospace', 
        fontSize: 14, 
        color, 
        fontWeight: 700,
        textShadow: `0 0 10px ${color}80`,
        position: 'relative',
        zIndex: 1
      }}>
        {value}
      </span>
      
      <style>{`
        @keyframes dataFlow {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
}

export function ConfigPanel({ 
  config, 
  wrapperCount, 
  activeWrapperName,
  loading, 
  onRefresh 
}: ConfigPanelProps) {
  const formatWrapperName = (name: string | null) => {
    if (!name) return 'NONE';
    return name.replace('syntex_wrapper_', '').toUpperCase();
  };
  
  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden'
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
        animation: 'glowPulse 3s ease-in-out infinite'
      }} />
      
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(0,0,0,0.2)'
      }}>
        <span style={{ fontSize: 24 }}>⚙️</span>
        <h3 style={{
          margin: 0,
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#f59e0b',
          letterSpacing: 2
        }}>
          CONFIGURATION
        </h3>
        
        {/* Rotating gear animation */}
        <div style={{
          width: 20,
          height: 20,
          border: '2px solid #f59e0b40',
          borderTop: '2px solid #f59e0b',
          borderRadius: '50%',
          animation: 'spin 3s linear infinite'
        }} />
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
      
      {/* Content */}
      <div style={{ padding: 24 }}>
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 20, 
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace'
          }}>
            Loading...
          </div>
        ) : (
          <>
            <MetricRow 
              label="DEFAULT WRAPPER" 
              value={formatWrapperName(config?.active_wrapper || null)}
              icon="📦" 
              color="#f59e0b" 
            />
            <MetricRow 
              label="TOTAL WRAPPERS" 
              value={wrapperCount}
              icon="📚" 
              color="#d946ef" 
            />
            <MetricRow 
              label="ACTIVE WRAPPER" 
              value={formatWrapperName(activeWrapperName)}
              icon="✅" 
              color="#10b981" 
            />
            <MetricRow 
              label="API BASE" 
              value="dev.syntx-system.com"
              icon="🌐" 
              color="#00d4ff" 
            />
            
            {/* Config Source Badge */}
            {config?.source && (
              <div style={{
                marginTop: 16,
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{ fontSize: 12 }}>💾</span>
                <span style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  SOURCE:
                </span>
                <span style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: '#00d4ff',
                  fontWeight: 600
                }}>
                  {config.source.toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Refresh Button */}
            <button 
              onClick={onRefresh}
              disabled={loading}
              style={{
                marginTop: 16,
                width: '100%',
                padding: '12px 20px',
                borderRadius: 12,
                border: '1px solid rgba(0,212,255,0.3)',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
                color: '#00d4ff',
                fontFamily: 'monospace',
                fontSize: 12,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(0,212,255,0.1))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,212,255,0.3)';
                }
              }}
              onMouseLeave={e => {
                if (!loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Shimmer effect on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: loading ? 'none' : 'buttonShimmer 2s infinite'
              }} />
              
              <span style={{ 
                position: 'relative', 
                zIndex: 1,
                animation: loading ? 'spin 1s linear infinite' : 'none'
              }}>
                ↻
              </span>
              <span style={{ position: 'relative', zIndex: 1, fontWeight: 700, letterSpacing: 1 }}>
                {loading ? 'REFRESHING...' : 'REFRESH'}
              </span>
              
              <style>{`
                @keyframes buttonShimmer {
                  0% { left: -100%; }
                  50%, 100% { left: 100%; }
                }
              `}</style>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

### 📄 src/components/system/components/HealthPanel.tsx
```typescript
"use client";

import React from 'react';

// ═══════════════════════════════════════════════════════════════
// 🌊 HEALTH PANEL - SYSTEM STATUS WITH MEGA EFFECTS
// ═══════════════════════════════════════════════════════════════

interface SystemHealth {
  status: string;
  service: string;
  version: string;
  format_loader: string;
  last_response?: any;
}

interface HealthPanelProps {
  health: SystemHealth | null;
  loading: boolean;
  error: string | null;
}

function StatusIndicator({ 
  status, 
  size = 12 
}: { 
  status: 'online' | 'offline' | 'warning'; 
  size?: number;
}) {
  const colors = { 
    online: '#10b981', 
    offline: '#ef4444', 
    warning: '#f59e0b' 
  };
  
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Main dot */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        borderRadius: '50%', 
        background: colors[status],
        animation: status === 'online' ? 'statusPulse 2s ease-in-out infinite' : 'none',
        boxShadow: `0 0 ${size}px ${colors[status]}80`
      }} />
      
      {/* Outer ring */}
      <div style={{ 
        position: 'absolute', 
        inset: -4, 
        borderRadius: '50%', 
        border: `2px solid ${colors[status]}`, 
        opacity: 0.3,
        animation: status === 'online' ? 'statusRing 2s ease-in-out infinite' : 'none'
      }} />
      
      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
        @keyframes statusRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function MetricRow({ 
  label, 
  value, 
  color = '#00d4ff', 
  icon 
}: { 
  label: string; 
  value: string | number; 
  color?: string; 
  icon?: string;
}) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      padding: '14px 16px',
      background: `linear-gradient(90deg, ${color}08, transparent)`,
      borderRadius: 12, 
      marginBottom: 8,
      border: `1px solid ${color}20`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Shimmer effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${color}15, transparent)`,
        animation: 'shimmer 3s infinite'
      }} />
      
      {icon && <span style={{ fontSize: 18, position: 'relative', zIndex: 1 }}>{icon}</span>}
      <span style={{ 
        flex: 1, 
        fontFamily: 'monospace', 
        fontSize: 12, 
        color: 'rgba(255,255,255,0.6)', 
        letterSpacing: 1,
        position: 'relative',
        zIndex: 1
      }}>
        {label}
      </span>
      <span style={{ 
        fontFamily: 'monospace', 
        fontSize: 14, 
        color, 
        fontWeight: 700,
        textShadow: `0 0 10px ${color}80`,
        position: 'relative',
        zIndex: 1
      }}>
        {value}
      </span>
      
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}

export function HealthPanel({ health, loading, error }: HealthPanelProps) {
  const systemStatus = health?.status?.includes('AKTIV') ? 'online' 
    : health ? 'warning' 
    : 'offline';
  
  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden'
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
        animation: 'glowPulse 3s ease-in-out infinite'
      }} />
      
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(0,0,0,0.2)'
      }}>
        <span style={{ fontSize: 24 }}>💚</span>
        <h3 style={{
          margin: 0,
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#10b981',
          letterSpacing: 2
        }}>
          SYSTEM HEALTH
        </h3>
        <StatusIndicator status={systemStatus} size={16} />
      </div>
      
      {/* Content */}
      <div style={{ padding: 24 }}>
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 20, 
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace'
          }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 20, 
            color: '#ef4444',
            fontFamily: 'monospace'
          }}>
            {error}
          </div>
        ) : health ? (
          <>
            {/* Status Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: 24,
              background: systemStatus === 'online' 
                ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
                : 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
              borderRadius: 16,
              marginBottom: 20,
              border: `1px solid ${systemStatus === 'online' ? '#10b98130' : '#ef444430'}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated background */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${systemStatus === 'online' ? '#10b981' : '#ef4444'}20, transparent 70%)`,
                animation: 'rotate 20s linear infinite'
              }} />
              
              <StatusIndicator status={systemStatus} size={24} />
              <span style={{
                fontFamily: 'monospace',
                fontSize: 28,
                fontWeight: 700,
                color: systemStatus === 'online' ? '#10b981' : '#ef4444',
                letterSpacing: 3,
                textShadow: `0 0 20px ${systemStatus === 'online' ? '#10b981' : '#ef4444'}80`,
                position: 'relative',
                zIndex: 1
              }}>
                {health.status?.toUpperCase() || 'UNKNOWN'}
              </span>
              
              <style>{`
                @keyframes rotate {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                @keyframes glowPulse {
                  0%, 100% { opacity: 0.8; }
                  50% { opacity: 1; }
                }
              `}</style>
            </div>
            
            {/* Metrics */}
            <MetricRow 
              label="SERVICE" 
              value={health.service || 'SYNTX'} 
              icon="🔧" 
              color="#00d4ff" 
            />
            <MetricRow 
              label="VERSION" 
              value={health.version || 'N/A'} 
              icon="📦" 
              color="#d946ef" 
            />
            <MetricRow 
              label="FORMAT LOADER" 
              value={health.format_loader || 'N/A'} 
              icon="🔥" 
              color="#10b981" 
            />
            
            {/* Last Response Info */}
            {health.last_response && (
              <MetricRow 
                label="LAST LATENCY" 
                value={`${(health.last_response.latency_ms / 1000).toFixed(2)}s`}
                icon="⚡" 
                color="#f59e0b" 
              />
            )}
          </>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: 20, 
            color: '#ef4444',
            fontFamily: 'monospace'
          }}>
            Failed to load
          </div>
        )}
      </div>
    </div>
  );
}
```

### 📄 src/components/system/components/index.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM COMPONENTS - EXPORT INDEX
// ═══════════════════════════════════════════════════════════════

export { HealthPanel } from './HealthPanel';
export { ConfigPanel } from './ConfigPanel';
export { WrapperCard } from './WrapperCard';
export { WrapperGrid } from './WrapperGrid';
```

### 📄 src/components/system/components/WrapperCard.tsx
```typescript
"use client";

import React, { useState, useEffect } from 'react';
import { Wrapper } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// 🌊 WRAPPER CARD - ULTRA CYBER EDITION v2.1 (Badge Logic Fixed)
// ═══════════════════════════════════════════════════════════════

interface WrapperStats {
  requests?: number;
  average_latency_ms?: number;
  success_rate?: number;
}

interface WrapperCardProps {
  wrapper: Wrapper;
  isDefault: boolean;
  onSetDefault: () => void;
  getStats: (name: string) => Promise<WrapperStats | null>;
}

export function WrapperCard({ 
  wrapper, 
  isDefault, 
  onSetDefault,
  getStats 
}: WrapperCardProps) {
  const [stats, setStats] = useState<WrapperStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats(wrapper.name)
      .then(setStats)
      .finally(() => setLoading(false));
  }, [wrapper.name, getStats]);

  const displayName = wrapper.name.replace('syntex_wrapper_', '').toUpperCase();
  
  const getColor = () => {
    if (wrapper.name.includes('human')) return '#10b981';
    if (wrapper.name.includes('sigma')) return '#f59e0b';
    if (wrapper.name.includes('deepsweep')) return '#d946ef';
    if (wrapper.name.includes('true_raw')) return '#ef4444';
    return '#00d4ff';
  };
  
  const color = getColor();
  const isHighLatency = stats?.average_latency_ms && stats.average_latency_ms > 5000;
  const isCriticalLatency = stats?.average_latency_ms && stats.average_latency_ms > 30000;
  
  return (
    <div style={{
      background: isCriticalLatency
        ? 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.15))'
        : isHighLatency 
          ? 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.1))'
          : `linear-gradient(135deg, ${color}12, ${color}05)`,
      border: isCriticalLatency
        ? '2px solid rgba(239,68,68,0.8)'
        : isHighLatency 
          ? '2px solid rgba(245,158,11,0.6)' 
          : `1px solid ${color}40`,
      borderRadius: 16,
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isCriticalLatency 
        ? '0 0 30px rgba(239,68,68,0.5)' 
        : isHighLatency 
          ? '0 0 25px rgba(245,158,11,0.4)' 
          : 'none',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
      e.currentTarget.style.boxShadow = isCriticalLatency 
        ? '0 10px 40px rgba(239,68,68,0.6)'
        : `0 10px 30px ${color}50`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = isCriticalLatency 
        ? '0 0 30px rgba(239,68,68,0.5)' 
        : isHighLatency 
          ? '0 0 25px rgba(245,158,11,0.4)' 
          : 'none';
    }}
    >
      {/* Animated background patterns */}
      <div style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}25, transparent 70%)`,
        animation: 'float 8s ease-in-out infinite',
        filter: 'blur(20px)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}15, transparent 70%)`,
        animation: 'float 6s ease-in-out infinite reverse',
        filter: 'blur(15px)'
      }} />
      
      {/* Hexagon corner decorations */}
      <div style={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        opacity: 0.15,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: color,
        animation: 'spin 20s linear infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 8,
        left: 8,
        width: 18,
        height: 18,
        opacity: 0.12,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: color,
        animation: 'spin 15s linear infinite reverse'
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(120deg); }
          66% { transform: translate(-10px, 10px) rotate(240deg); }
        }
        @keyframes dataStream {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scanLine {
          0% { top: 0; opacity: 0; }
          50% { opacity: 0.3; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes matrixRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
      
      {/* Scan line effect */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
        animation: 'scanLine 3s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      {/* Data stream on active */}
      {wrapper.is_active && (
        <>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${color}, ${color}, transparent)`,
            animation: 'dataStream 2s linear infinite'
          }} />
          
          {/* Matrix rain effect */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute',
              left: `${20 + i * 30}%`,
              width: 1,
              height: 20,
              background: `linear-gradient(180deg, transparent, ${color}80, transparent)`,
              animation: `matrixRain ${2 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.7}s`,
              pointerEvents: 'none'
            }} />
          ))}
        </>
      )}
      
      {/* Corner accents */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTop: `2px solid ${color}30`,
        borderLeft: `2px solid ${color}30`,
        borderTopLeftRadius: 16
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottom: `2px solid ${color}30`,
        borderRight: `2px solid ${color}30`,
        borderBottomRightRadius: 16
      }} />
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap'
      }}>
        {/* Status indicator with ring */}
        <div style={{ position: 'relative', width: 14, height: 14 }}>
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: wrapper.is_active ? color : 'rgba(255,255,255,0.2)',
            boxShadow: wrapper.is_active ? `0 0 15px ${color}` : 'none',
            animation: wrapper.is_active ? 'pulse 2s ease-in-out infinite' : 'none'
          }} />
          {wrapper.is_active && (
            <div style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              border: `1px solid ${color}`,
              opacity: 0.3,
              animation: 'statusRing 2s ease-in-out infinite'
            }} />
          )}
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(0.95); }
            }
            @keyframes statusRing {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(1.4); opacity: 0; }
            }
          `}</style>
        </div>
        
        <span style={{
          fontFamily: 'monospace',
          fontSize: 13,
          color,
          fontWeight: 700,
          letterSpacing: 1.2,
          textShadow: `0 0 15px ${color}80, 0 0 25px ${color}40`,
          flex: 1,
          minWidth: 100
        }}>
          {displayName}
        </span>
        
        {/* Badges - SMART LOGIC: Combined badge if BOTH Default AND Active */}
        {isDefault && wrapper.is_active ? (
          // BOTH Default AND Active - Combined Badge
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(16,185,129,0.3))',
            color: '#00d4ff',
            border: '1px solid rgba(0,212,255,0.5)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(0,212,255,0.8)',
            boxShadow: '0 0 15px rgba(0,212,255,0.3)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'badgePulse 2s ease-in-out infinite'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)',
              animation: 'shimmer 2s infinite'
            }} />
            <span style={{ position: 'relative', zIndex: 1 }}>📦⚡ DEFAULT+ACTIVE</span>
          </span>
        ) : isDefault ? (
          // Only Default
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.15))',
            color: '#00d4ff',
            border: '1px solid rgba(0,212,255,0.5)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(0,212,255,0.8)',
            boxShadow: '0 0 15px rgba(0,212,255,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 2s infinite'
            }} />
            <span style={{ position: 'relative', zIndex: 1 }}>📦 DEFAULT</span>
          </span>
        ) : wrapper.is_active ? (
          // Only Active
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.15))',
            color: '#10b981',
            border: '1px solid rgba(16,185,129,0.5)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(16,185,129,0.8)',
            boxShadow: '0 0 15px rgba(16,185,129,0.3)',
            animation: 'badgePulse 2s ease-in-out infinite'
          }}>
            ⚡ ACTIVE
          </span>
        ) : null}
        
        {isCriticalLatency && (
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(239,68,68,0.2))',
            color: '#ef4444',
            border: '1px solid rgba(239,68,68,0.6)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(239,68,68,0.8)',
            boxShadow: '0 0 15px rgba(239,68,68,0.4)',
            animation: 'criticalPulse 1s ease-in-out infinite'
          }}>
            🔥 CRITICAL
            <style>{`
              @keyframes criticalPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
              }
            `}</style>
          </span>
        )}
        
        {isHighLatency && !isCriticalLatency && (
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.15))',
            color: '#f59e0b',
            border: '1px solid rgba(245,158,11,0.5)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(245,158,11,0.8)',
            boxShadow: '0 0 15px rgba(245,158,11,0.3)'
          }}>
            ⚠️ SLOW
          </span>
        )}
      </div>

      {/* Stats Grid - SAME AS BEFORE */}
      {loading ? (
        <div style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          textAlign: 'center',
          padding: 30,
          fontFamily: 'monospace'
        }}>
          <div style={{
            display: 'inline-block',
            width: 30,
            height: 30,
            border: `3px solid ${color}20`,
            borderTop: `3px solid ${color}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            boxShadow: `0 0 20px ${color}50`
          }} />
        </div>
      ) : stats ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          position: 'relative',
          zIndex: 1
        }}>
          {/* Requests */}
          <div style={{
            textAlign: 'center',
            padding: 16,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `inset 0 0 20px ${color}10`
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${color}60, transparent)`
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color,
              fontFamily: 'monospace',
              textShadow: `0 0 20px ${color}, 0 0 30px ${color}50`,
              marginBottom: 6,
              letterSpacing: 1
            }}>
              {stats.requests || 0}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5
            }}>
              REQUESTS
            </div>
          </div>
          
          {/* Latency */}
          <div style={{
            textAlign: 'center',
            padding: 16,
            background: isCriticalLatency 
              ? 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.2))' 
              : isHighLatency 
                ? 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.15))' 
                : 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: isCriticalLatency 
              ? '1px solid rgba(239,68,68,0.5)' 
              : isHighLatency
                ? '1px solid rgba(245,158,11,0.4)'
                : `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isCriticalLatency
              ? 'inset 0 0 20px rgba(239,68,68,0.2), 0 0 15px rgba(239,68,68,0.3)'
              : isHighLatency
                ? 'inset 0 0 20px rgba(245,158,11,0.15)'
                : `inset 0 0 20px ${color}10`
          }}>
            {isCriticalLatency && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239,68,68,0.1) 10px, rgba(239,68,68,0.1) 20px)'
              }} />
            )}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: isCriticalLatency
                ? 'linear-gradient(90deg, transparent, #ef444460, transparent)'
                : isHighLatency
                  ? 'linear-gradient(90deg, transparent, #f59e0b60, transparent)'
                  : `linear-gradient(90deg, transparent, ${color}60, transparent)`
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: isCriticalLatency ? '#ef4444' : isHighLatency ? '#f59e0b' : '#10b981',
              fontFamily: 'monospace',
              textShadow: isCriticalLatency
                ? '0 0 20px #ef4444, 0 0 30px #ef444450'
                : isHighLatency
                  ? '0 0 20px #f59e0b, 0 0 30px #f59e0b50'
                  : '0 0 20px #10b981, 0 0 30px #10b98150',
              marginBottom: 6,
              letterSpacing: 1,
              position: 'relative',
              zIndex: 1
            }}>
              {stats.average_latency_ms ? (stats.average_latency_ms / 1000).toFixed(1) : '0'}s
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5,
              position: 'relative',
              zIndex: 1
            }}>
              AVG LATENCY
            </div>
          </div>
          
          {/* Success Rate */}
          <div style={{
            textAlign: 'center',
            padding: 16,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `inset 0 0 20px ${color}10`
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #10b98160, transparent)'
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#10b981',
              fontFamily: 'monospace',
              textShadow: '0 0 20px #10b981, 0 0 30px #10b98150',
              marginBottom: 6,
              letterSpacing: 1
            }}>
              {stats.success_rate && stats.success_rate !== 100 ? `${stats.success_rate}%` : '✓'}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5
            }}>
              SUCCESS
            </div>
          </div>
          
          {/* Size */}
          <div style={{
            textAlign: 'center',
            padding: 16,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `inset 0 0 20px ${color}10`
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #d946ef60, transparent)'
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#d946ef',
              fontFamily: 'monospace',
              textShadow: '0 0 20px #d946ef, 0 0 30px #d946ef50',
              marginBottom: 6,
              letterSpacing: 1
            }}>
              {wrapper.size_human || '?'}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5
            }}>
              SIZE
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          textAlign: 'center',
          fontFamily: 'monospace',
          padding: 20
        }}>
          No stats available
        </div>
      )}

      {/* Set Default Button */}
      {!isDefault && (
        <button
          onClick={onSetDefault}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '14px 20px',
            borderRadius: 12,
            border: `1px solid ${color}50`,
            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
            color: color,
            fontFamily: 'monospace',
            fontSize: 11,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
            fontWeight: 700,
            letterSpacing: 1,
            textShadow: `0 0 10px ${color}80`,
            overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${color}30, ${color}15)`;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 20px ${color}40, inset 0 0 30px ${color}20`;
            e.currentTarget.style.borderColor = `${color}80`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${color}20, ${color}08)`;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = `${color}50`;
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'buttonShimmer 3s infinite'
          }} />
          
          <span style={{ position: 'relative', zIndex: 1 }}>
            📦 SET AS DEFAULT
          </span>
          
          <style>{`
            @keyframes buttonShimmer {
              0% { left: -100%; }
              50%, 100% { left: 100%; }
            }
          `}</style>
        </button>
      )}
    </div>
  );
}
```

### 📄 src/components/system/components/WrapperGrid.tsx
```typescript
"use client";

import React from 'react';
import { Wrapper } from '@/lib/api';
import { WrapperCard } from './WrapperCard';

// ═══════════════════════════════════════════════════════════════
// 🌊 WRAPPER GRID - STATS OVERVIEW WITH NEURAL EFFECTS
// ═══════════════════════════════════════════════════════════════

interface WrapperStats {
  requests?: number;
  average_latency_ms?: number;
  success_rate?: number;
}

interface WrapperGridProps {
  wrappers: Wrapper[];
  defaultWrapper: string | null;
  onSetDefault: (name: string) => void;
  getStats: (name: string) => Promise<WrapperStats | null>;
}

export function WrapperGrid({ 
  wrappers, 
  defaultWrapper,
  onSetDefault,
  getStats 
}: WrapperGridProps) {
  if (wrappers.length === 0) {
    return (
      <div style={{
        position: 'relative',
        borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
      }}>
        {/* Top glow line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #d946ef, transparent)'
        }} />
        
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(0,0,0,0.2)'
        }}>
          <span style={{ fontSize: 24 }}>📊</span>
          <h3 style={{
            margin: 0,
            flex: 1,
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#d946ef',
            letterSpacing: 2
          }}>
            WRAPPER STATISTICS
          </h3>
        </div>
        
        {/* Empty state */}
        <div style={{
          padding: 60,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace',
          fontSize: 14
        }}>
          <div style={{ fontSize: 60, marginBottom: 20, opacity: 0.3 }}>📦</div>
          <div>No wrappers available</div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden'
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #d946ef, transparent)',
        animation: 'glowPulse 3s ease-in-out infinite'
      }} />
      
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(0,0,0,0.2)'
      }}>
        <span style={{ fontSize: 24 }}>📊</span>
        <h3 style={{
          margin: 0,
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#d946ef',
          letterSpacing: 2
        }}>
          WRAPPER STATISTICS
        </h3>
        
        {/* Wrapper count badge */}
        <div style={{
          padding: '6px 12px',
          borderRadius: 12,
          background: 'rgba(217,70,239,0.15)',
          border: '1px solid rgba(217,70,239,0.3)',
          fontFamily: 'monospace',
          fontSize: 11,
          color: '#d946ef',
          fontWeight: 600
        }}>
          {wrappers.length} WRAPPERS
        </div>
      </div>
      
      {/* Cards Grid */}
      <div style={{ padding: 24 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20
        }}>
          {wrappers.map(wrapper => (
            <WrapperCard
              key={wrapper.name}
              wrapper={wrapper}
              isDefault={defaultWrapper === wrapper.name}
              onSetDefault={() => onSetDefault(wrapper.name)}
              getStats={getStats}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
```

### 📄 src/components/system/hooks/index.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM HOOKS - EXPORT INDEX
// ═══════════════════════════════════════════════════════════════

export { useSystemData } from './useSystemData';
```

### 📄 src/components/system/hooks/useSystemData.tsx
```typescript
"use client";

import { useState, useEffect, useCallback } from 'react';
import { api, Wrapper } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM DATA HOOK - CENTRALIZED DATA FETCHING
// ═══════════════════════════════════════════════════════════════

interface SystemHealth {
  status: string;
  service: string;
  version: string;
  format_loader: string;
  last_response?: any;
}

interface SystemConfig {
  active_wrapper: string;
  exists: boolean;
  path: string;
  source: string;
}

interface WrapperStats {
  requests?: number;
  average_latency_ms?: number;
  success_rate?: number;
}

interface SystemData {
  health: SystemHealth | null;
  config: SystemConfig | null;
  wrappers: Wrapper[];
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

interface UseSystemDataReturn extends SystemData {
  refresh: () => Promise<void>;
  setDefaultWrapper: (name: string) => Promise<void>;
  getWrapperStats: (name: string) => Promise<WrapperStats | null>;
}

const REFRESH_INTERVAL = 30000; // 30s (longer than chat to reduce load)

export function useSystemData(): UseSystemDataReturn {
  const [data, setData] = useState<SystemData>({
    health: null,
    config: null,
    wrappers: [],
    loading: true,
    error: null,
    lastUpdate: null
  });

  const fetchData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Use CORRECT endpoints!
      const [healthData, configData, wrappersData] = await Promise.all([
        api.getResonanzHealth(),     // ✅ /resonanz/health
        api.getConfig(),              // ✅ /resonanz/config/default-wrapper
        api.getWrappers()             // ✅ /resonanz/wrappers
      ]);

      setData({
        health: healthData,
        config: configData,
        wrappers: wrappersData.wrappers || [],
        loading: false,
        error: null,
        lastUpdate: new Date()
      });
    } catch (err: any) {
      console.error('System data fetch error:', err);
      setData(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to fetch system data'
      }));
    }
  }, []);

  // Initial fetch + auto-refresh
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Set default wrapper
  const setDefaultWrapper = useCallback(async (name: string) => {
    try {
      await api.setConfig(name);
      await fetchData(); // Refresh after change
    } catch (err: any) {
      console.error('Failed to set default wrapper:', err);
      throw err;
    }
  }, [fetchData]);

  // Get wrapper stats
  const getWrapperStats = useCallback(async (name: string): Promise<WrapperStats | null> => {
    try {
      const stats = await api.getWrapperStats(name);
      return stats;
    } catch (err) {
      console.error(`Failed to get stats for ${name}:`, err);
      return null;
    }
  }, []);

  return {
    ...data,
    refresh: fetchData,
    setDefaultWrapper,
    getWrapperStats
  };
}
```

### 📄 src/components/system/SystemPanel.tsx
```typescript
"use client";

import React from 'react';
import Image from 'next/image';
import { NeuralNetwork, CyberGrid } from './animations';
import { useSystemData } from './hooks';
import { HealthPanel, ConfigPanel, WrapperGrid } from './components';

// ═══════════════════════════════════════════════════════════════
// 🌊 SYSTEM PANEL - ULTRA CYBER MAIN COMPONENT v2
// ═══════════════════════════════════════════════════════════════

export default function SystemPanel() {
  const {
    health,
    config,
    wrappers,
    loading,
    error,
    lastUpdate,
    refresh,
    setDefaultWrapper,
    getWrapperStats
  } = useSystemData();

  // Get active wrapper name
  const activeWrapper = wrappers.find(w => w.is_active);
  const activeWrapperName = activeWrapper?.name || null;

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1a2e 0%, #06090f 100%)'
    }}>
      {/* Background Effects */}
      <CyberGrid opacity={0.03} />
      <NeuralNetwork 
        particleCount={60} 
        connectionDistance={180}
        opacity={0.4}
        speed={0.2}
      />
      
      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        padding: '40px 24px',
        maxWidth: 1400,
        margin: '0 auto'
      }}>
        {/* Header Section with LOGO */}
        <div style={{
          marginBottom: 40,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16
        }}>
          {/* SYNTX Logo with Effects */}
          <div style={{
            position: 'relative',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Rotating ring */}
            <div style={{
              position: 'absolute',
              width: 90,
              height: 90,
              border: '2px solid transparent',
              borderTopColor: '#00d4ff',
              borderRightColor: '#d946ef',
              borderRadius: '50%',
              animation: 'spin 8s linear infinite'
            }} />
            
            {/* Pulsing glow */}
            <div style={{
              position: 'absolute',
              width: 100,
              height: 100,
              background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%)',
              borderRadius: '50%',
              animation: 'pulse 3s ease-in-out infinite'
            }} />
            
            {/* Logo */}
            <Image 
              src="/Logo1_trans.png" 
              alt="SYNTX" 
              width={70}
              height={70}
              style={{
                filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.6)) drop-shadow(0 0 60px rgba(217,70,239,0.4))',
                animation: 'float 4s ease-in-out infinite',
                position: 'relative',
                zIndex: 1
              }}
              priority
            />
            
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.1); opacity: 0.5; }
              }
            `}</style>
          </div>
          
          {/* Title */}
          <h1 style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: 42,
            background: 'linear-gradient(135deg, #00d4ff 0%, #d946ef 50%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 8,
            fontWeight: 900,
            textTransform: 'uppercase',
            animation: 'titleShimmer 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.5))'
          }}>
            SYSTEM MONITOR
          </h1>
          
          {lastUpdate && (
            <div style={{
              marginTop: 8,
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}>
              <span>⏱️</span>
              <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}
          
          <style>{`
            @keyframes titleShimmer {
              0%, 100% { filter: drop-shadow(0 0 30px rgba(0,212,255,0.5)); }
              50% { filter: drop-shadow(0 0 50px rgba(217,70,239,0.8)); }
            }
          `}</style>
        </div>
        
        {/* Top Row - Health + Config */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
          marginBottom: 24
        }}>
          <HealthPanel 
            health={health}
            loading={loading}
            error={error}
          />
          
          <ConfigPanel
            config={config}
            wrapperCount={wrappers.length}
            activeWrapperName={activeWrapperName}
            loading={loading}
            onRefresh={refresh}
          />
        </div>
        
        {/* Bottom Row - Wrapper Stats */}
        <WrapperGrid
          wrappers={wrappers}
          defaultWrapper={config?.active_wrapper || null}
          onSetDefault={setDefaultWrapper}
          getStats={getWrapperStats}
        />
        
        {/* Footer Info */}
        <div style={{
          marginTop: 40,
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12
        }}>
          <span>🌊 SYNTX SYSTEM</span>
          <span>•</span>
          <span>FIELD-BASED ARCHITECTURE</span>
          <span>•</span>
          <span>RESONANCE ENGINE</span>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/ui/Button.tsx
```typescript
'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  glow?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  glow = true,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: `
      bg-gradient-to-r from-syntx-cyan to-syntx-cyan-dim
      text-syntx-dark font-bold
      hover:from-syntx-cyan-dim hover:to-syntx-cyan
      ${glow ? 'shadow-glow-cyan hover:shadow-glow-cyan-lg' : ''}
    `,
    secondary: `
      bg-transparent border-2 border-syntx-cyan/50
      text-syntx-cyan
      hover:bg-syntx-cyan/10 hover:border-syntx-cyan
      ${glow ? 'hover:shadow-glow-cyan' : ''}
    `,
    ghost: `
      bg-transparent text-syntx-muted
      hover:text-syntx-cyan hover:bg-syntx-cyan/5
    `,
    danger: `
      bg-gradient-to-r from-syntx-red to-red-600
      text-white font-bold
      hover:from-red-600 hover:to-syntx-red
      shadow-[0_0_20px_rgba(255,71,87,0.3)]
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={`
        relative overflow-hidden rounded-lg
        font-mono uppercase tracking-wider
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shine Effect */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
      </span>
      
      <span className="relative flex items-center justify-center gap-2">
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </span>
    </button>
  );
}
```

### 📄 src/components/ui/Card.tsx
```typescript
'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', glow = false, hover = true }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-br from-syntx-card/80 to-syntx-dark/90
        border border-syntx-border/50
        backdrop-blur-xl
        ${glow ? 'shadow-glow-cyan border-syntx-cyan/30' : ''}
        ${hover ? 'transition-all duration-500 hover:border-syntx-cyan/50 hover:shadow-glow-cyan' : ''}
        ${className}
      `}
    >
      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-syntx-cyan/5 to-transparent h-1/2 animate-scan opacity-0 group-hover:opacity-100" />
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-syntx-cyan/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-syntx-cyan/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-syntx-cyan/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-syntx-cyan/40" />
      
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

### 📄 src/components/ui/ExportButton.tsx
```typescript
"use client";

import React, { useState } from 'react';

interface ExportButtonProps {
  onExportJSON: () => void;
  onExportCSV: () => void;
  disabled?: boolean;
  color?: string;
}

export default function ExportButton({ onExportJSON, onExportCSV, disabled, color = '#00d4ff' }: ExportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        disabled={disabled}
        style={{
          padding: '8px 14px',
          borderRadius: 8,
          border: `1px solid ${color}40`,
          background: color + '10',
          color: color,
          fontFamily: 'monospace',
          fontSize: 11,
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        📤 EXPORT ▼
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 4,
            background: 'linear-gradient(135deg, #0a1a2e, #050b14)',
            border: `1px solid ${color}40`,
            borderRadius: 10,
            overflow: 'hidden',
            zIndex: 101,
            minWidth: 140,
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${color}20`,
          }}>
            <button
              onClick={() => { onExportJSON(); setOpen(false); }}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 11,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>📋</span>
              Export JSON
            </button>
            <button
              onClick={() => { onExportCSV(); setOpen(false); }}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 11,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>📊</span>
              Export CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

### 📄 src/components/ui/FilterBar.tsx
```typescript
"use client";

import React from 'react';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

interface FilterConfig {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClear?: () => void;
  activeCount?: number;
  color?: string;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  filterValues = {},
  onFilterChange,
  onClear,
  activeCount = 0,
  color = '#00d4ff',
}: FilterBarProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 20px',
      background: 'rgba(0,0,0,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      flexWrap: 'wrap',
    }}>
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        color={color}
      />
      
      {filters.map(filter => (
        <FilterDropdown
          key={filter.key}
          label={filter.label}
          value={filterValues[filter.key] || 'all'}
          options={filter.options}
          onChange={(value) => onFilterChange?.(filter.key, value)}
          color={color}
        />
      ))}

      {activeCount > 0 && onClear && (
        <button
          onClick={onClear}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.3)',
            background: 'rgba(239,68,68,0.1)',
            color: '#ef4444',
            fontFamily: 'monospace',
            fontSize: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ✕ Clear ({activeCount})
        </button>
      )}

      {activeCount > 0 && (
        <div style={{
          marginLeft: 'auto',
          padding: '6px 12px',
          borderRadius: 8,
          background: color + '20',
          fontSize: 10,
          fontFamily: 'monospace',
          color: color,
        }}>
          {activeCount} filter{activeCount > 1 ? 's' : ''} active
        </div>
      )}
    </div>
  );
}
```

### 📄 src/components/ui/FilterDropdown.tsx
```typescript
"use client";

import React from 'react';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  color?: string;
}

export default function FilterDropdown({ label, value, options, onChange, color = '#00d4ff' }: FilterDropdownProps) {
  const isActive = value && value !== 'all';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>{label}:</span>
      <select
        value={value || 'all'}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: `1px solid ${isActive ? color + '60' : 'rgba(255,255,255,0.1)'}`,
          background: isActive ? color + '10' : 'rgba(0,0,0,0.3)',
          color: isActive ? color : 'rgba(255,255,255,0.7)',
          fontFamily: 'monospace',
          fontSize: 11,
          cursor: 'pointer',
          outline: 'none',
          minWidth: 120,
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
```

### 📄 src/components/ui/GlassCard.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🪟 GLASS CARD - SYNTX GLASSMORPHISM                                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'cyan' | 'magenta' | 'gradient';
  hover?: 'lift' | 'glow' | 'tilt' | 'none';
  padding?: number | string;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  variant = 'default',
  hover = 'lift',
  padding = 24,
  borderRadius = 20,
  className = '',
  style = {},
  onClick,
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'dark':
        return {
          background: 'rgba(0, 0, 0, 0.4)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
        };
      case 'cyan':
        return {
          background: 'rgba(0, 212, 255, 0.05)',
          borderColor: 'rgba(0, 212, 255, 0.2)',
        };
      case 'magenta':
        return {
          background: 'rgba(217, 70, 239, 0.05)',
          borderColor: 'rgba(217, 70, 239, 0.2)',
        };
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(217, 70, 239, 0.05))',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hover !== 'tilt' || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
    });
  };

  const getHoverStyles = (): React.CSSProperties => {
    if (!isHovered) return {};
    switch (hover) {
      case 'lift':
        return { transform: 'translateY(-8px)', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' };
      case 'glow':
        return { boxShadow: '0 0 40px rgba(0, 212, 255, 0.3), 0 20px 40px rgba(0, 0, 0, 0.2)' };
      case 'tilt':
        return tiltStyle;
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      ref={cardRef}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding,
        borderRadius,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...variantStyles,
        ...getHoverStyles(),
        ...style,
      }}
    >
      {/* Animated Border Gradient on Hover */}
      {isHovered && hover !== 'none' && (
        <div style={{
          position: 'absolute',
          inset: -2,
          borderRadius: borderRadius + 2,
          background: 'linear-gradient(45deg, #00d4ff, transparent, #d946ef)',
          backgroundSize: '200% 200%',
          animation: 'borderFlow 3s ease infinite',
          zIndex: -1,
          opacity: 0.6,
        }} />
      )}

      {/* Shine Effect on Hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'shine 0.8s ease forwards',
          pointerEvents: 'none',
        }} />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
```

### 📄 src/components/ui/index.ts
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🎨 UI COMPONENTS - SYNTX DESIGN SYSTEM                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// Named exports (no default)
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { StatusBadge } from './StatusBadge';
export { useToast, ToastProvider } from './Toast';

// Default exports
export { default as LiveBadge } from './LiveBadge';
export { default as SearchBar } from './SearchBar';
export { default as ExportButton } from './ExportButton';
export { default as FilterBar } from './FilterBar';
export { default as FilterDropdown } from './FilterDropdown';
export { default as Pagination } from './Pagination';
export { default as SortHeader } from './SortHeader';

// New Components
export { default as Tooltip } from './Tooltip';
export { default as Skeleton, SkeletonCard, SkeletonTable, SkeletonStats } from './Skeleton';
export { default as ParticleField, MatrixRain, CosmicDust, FireEmbers } from './ParticleField';
export { default as ProgressBar, SegmentedProgress } from './ProgressBar';
export { default as GlassCard } from './GlassCard';
```

### 📄 src/components/ui/Input.tsx
```typescript
'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs font-mono uppercase tracking-wider text-syntx-muted">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-lg
              bg-syntx-dark/80 border border-syntx-border/50
              text-syntx-text placeholder-syntx-muted/50
              font-mono text-sm
              transition-all duration-300
              focus:outline-none focus:border-syntx-cyan/60 focus:shadow-glow-cyan
              hover:border-syntx-border
              ${error ? 'border-syntx-red/50 focus:border-syntx-red' : ''}
              ${className}
            `}
            {...props}
          />
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-syntx-cyan group-focus-within:w-full transition-all duration-300" />
        </div>
        {error && (
          <p className="text-xs text-syntx-red font-mono">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### 📄 src/components/ui/LiveBadge.tsx
```typescript
"use client";

import React from 'react';

interface LiveBadgeProps {
  isLive: boolean;
  pulse?: boolean;
  lastUpdate?: Date | null;
  newCount?: number;
}

export default function LiveBadge({ isLive, pulse, lastUpdate, newCount }: LiveBadgeProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      {/* Live Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        background: isLive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
        border: `1px solid ${isLive ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        borderRadius: 20,
        transition: 'all 0.3s ease',
        animation: pulse ? 'livePulse 0.5s ease' : 'none',
      }}>
        <div style={{
          position: 'relative',
          width: 8,
          height: 8,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: isLive ? '#10b981' : '#ef4444',
            animation: isLive ? 'blink 1.5s ease-in-out infinite' : 'none',
          }} />
          {isLive && (
            <div style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid #10b981',
              opacity: 0.4,
              animation: 'ring 1.5s ease-in-out infinite',
            }} />
          )}
        </div>
        <span style={{
          fontSize: 10,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: isLive ? '#10b981' : '#ef4444',
          letterSpacing: 2,
        }}>
          {isLive ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* New Event Counter */}
      {newCount && newCount > 0 && (
        <div style={{
          padding: '4px 10px',
          background: 'rgba(0,212,255,0.15)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 12,
          fontSize: 10,
          fontFamily: 'monospace',
          color: '#00d4ff',
          animation: 'popIn 0.3s ease',
        }}>
          +{newCount} NEW
        </div>
      )}

      {/* Last Update */}
      {lastUpdate && (
        <span style={{
          fontSize: 9,
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.3)',
        }}>
          {lastUpdate.toLocaleTimeString('de-DE')}
        </span>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes livePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(16,185,129,0.4); }
          100% { transform: scale(1); }
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
```

### 📄 src/components/ui/Pagination.tsx
```typescript
"use client";

import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showPageSize?: boolean;
}

const COLORS = {
  cyan: '#00d4ff',
  dark: 'rgba(0,0,0,0.3)',
  border: 'rgba(255,255,255,0.1)',
};

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showPageSize = true,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderTop: `1px solid ${COLORS.border}`,
      marginTop: 16,
    }}>
      {/* Info */}
      <div style={{
        fontSize: 11,
        fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.5)',
      }}>
        {totalItems > 0 ? (
          <>
            <span style={{ color: COLORS.cyan }}>{(page - 1) * pageSize + 1}</span>
            {' - '}
            <span style={{ color: COLORS.cyan }}>{Math.min(page * pageSize, totalItems)}</span>
            {' von '}
            <span style={{ color: 'white' }}>{totalItems}</span>
          </>
        ) : (
          'Keine Einträge'
        )}
      </div>

      {/* Page Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${canPrev ? COLORS.cyan + '40' : COLORS.border}`,
            background: canPrev ? COLORS.cyan + '10' : 'transparent',
            color: canPrev ? COLORS.cyan : 'rgba(255,255,255,0.2)',
            fontFamily: 'monospace',
            fontSize: 12,
            cursor: canPrev ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          ← PREV
        </button>

        {getPageNumbers().map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === 'number' && onPageChange(p)}
            disabled={p === '...'}
            style={{
              minWidth: 36,
              padding: '8px 12px',
              borderRadius: 8,
              border: p === page ? `1px solid ${COLORS.cyan}` : `1px solid ${COLORS.border}`,
              background: p === page ? COLORS.cyan + '20' : 'transparent',
              color: p === page ? COLORS.cyan : 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: p === page ? 700 : 400,
              cursor: p === '...' ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${canNext ? COLORS.cyan + '40' : COLORS.border}`,
            background: canNext ? COLORS.cyan + '10' : 'transparent',
            color: canNext ? COLORS.cyan : 'rgba(255,255,255,0.2)',
            fontFamily: 'monospace',
            fontSize: 12,
            cursor: canNext ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          NEXT →
        </button>
      </div>

      {/* Page Size Selector */}
      {showPageSize && onPageSizeChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>
            Zeige:
          </span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.dark,
              color: 'white',
              fontFamily: 'monospace',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {[5, 10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
```

### 📄 src/components/ui/ParticleField.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ✨ PARTICLE FIELD - SYNTX AMBIENT BACKGROUND                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  delay: number;
}

interface ParticleFieldProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'up' | 'down' | 'random';
  className?: string;
  style?: React.CSSProperties;
}

const COLORS = ['#00d4ff', '#d946ef', '#10b981', '#8b5cf6', '#f59e0b'];

export default function ParticleField({
  count = 30,
  colors = COLORS,
  minSize = 2,
  maxSize = 6,
  speed = 'normal',
  direction = 'up',
  className = '',
  style = {},
}: ParticleFieldProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const speedMultiplier = speed === 'slow' ? 1.5 : speed === 'fast' ? 0.5 : 1;

  const particles = useMemo(() => {
    if (!mounted) return [];
    return [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: 0.1 + Math.random() * 0.5,
      speed: (3 + Math.random() * 5) * speedMultiplier,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
    }));
  }, [mounted, count, colors, minSize, maxSize, speedMultiplier]);

  if (!mounted) return null;

  const getAnimation = (particle: Particle) => {
    const duration = particle.speed;
    switch (direction) {
      case 'up':
        return `particleUp ${duration}s ease-in-out infinite`;
      case 'down':
        return `particleDown ${duration}s ease-in-out infinite`;
      default:
        return `particleRandom ${duration}s ease-in-out infinite`;
    }
  };

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: getAnimation(p),
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Ambient Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '15%',
        width: 250,
        height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217, 70, 239, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 25s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 18s ease-in-out infinite',
        animationDelay: '5s',
      }} />

      {/* Inline Keyframes */}
      <style>{`
        @keyframes particleUp {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--particle-opacity, 0.5); }
          90% { opacity: var(--particle-opacity, 0.5); }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes particleDown {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--particle-opacity, 0.5); }
          90% { opacity: var(--particle-opacity, 0.5); }
          100% { transform: translateY(100vh) translateX(-20px); opacity: 0; }
        }
        @keyframes particleRandom {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          25% { transform: translate(30px, -50px) rotate(90deg); opacity: 0.5; }
          50% { transform: translate(-20px, -100px) rotate(180deg); opacity: 0.3; }
          75% { transform: translate(40px, -150px) rotate(270deg); opacity: 0.5; }
          100% { transform: translate(0, -200px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Preset Variations
export function MatrixRain({ intensity = 'normal' }: { intensity?: 'light' | 'normal' | 'heavy' }) {
  const count = intensity === 'light' ? 15 : intensity === 'heavy' ? 60 : 30;
  return (
    <ParticleField
      count={count}
      colors={['#10b981', '#34d399', '#059669']}
      minSize={1}
      maxSize={3}
      speed="fast"
      direction="down"
    />
  );
}

export function CosmicDust() {
  return (
    <ParticleField
      count={50}
      colors={['#00d4ff', '#d946ef', '#8b5cf6', '#ffffff']}
      minSize={1}
      maxSize={4}
      speed="slow"
      direction="random"
    />
  );
}

export function FireEmbers() {
  return (
    <ParticleField
      count={25}
      colors={['#f59e0b', '#ef4444', '#fbbf24']}
      minSize={2}
      maxSize={5}
      speed="normal"
      direction="up"
    />
  );
}
```

### 📄 src/components/ui/ProgressBar.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📊 PROGRESS BAR - SYNTX ANIMATED PROGRESS                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside' | 'top';
  animated?: boolean;
  striped?: boolean;
  glow?: boolean;
  gradient?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  color = '#00d4ff',
  height = 8,
  showLabel = false,
  labelPosition = 'outside',
  animated = true,
  striped = false,
  glow = true,
  gradient = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getBarBackground = () => {
    if (gradient) {
      return `linear-gradient(90deg, ${color}, ${adjustColor(color, 30)})`;
    }
    return color;
  };

  const adjustColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  return (
    <div className={className}>
      {showLabel && labelPosition === 'top' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>Progress</span>
          <span style={{ fontSize: 12, fontFamily: 'monospace', color }}>{percentage.toFixed(0)}%</span>
        </div>
      )}

      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* Track */}
        <div style={{
          flex: 1,
          height,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: height / 2,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Bar */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${percentage}%`,
            background: getBarBackground(),
            borderRadius: height / 2,
            transition: animated ? 'width 0.5s ease-out' : 'none',
            boxShadow: glow ? `0 0 20px ${color}50, inset 0 0 10px ${color}30` : 'none',
          }}>
            {/* Stripes */}
            {striped && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`,
                animation: animated ? 'stripeMove 1s linear infinite' : 'none',
              }} />
            )}

            {/* Shine Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 30,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))',
              animation: animated ? 'shimmer 2s ease infinite' : 'none',
            }} />

            {/* Inside Label */}
            {showLabel && labelPosition === 'inside' && percentage > 15 && (
              <span style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: Math.max(10, height - 2),
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'rgba(0,0,0,0.8)',
              }}>
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>

        {/* Outside Label */}
        {showLabel && labelPosition === 'outside' && (
          <span style={{
            minWidth: 45,
            fontSize: 12,
            fontFamily: 'monospace',
            fontWeight: 600,
            color,
            textShadow: glow ? `0 0 10px ${color}` : 'none',
          }}>
            {percentage.toFixed(0)}%
          </span>
        )}
      </div>

      <style>{`
        @keyframes stripeMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>
    </div>
  );
}

// Multi-segment Progress
export function SegmentedProgress({ 
  segments 
}: { 
  segments: { value: number; color: string; label?: string }[] 
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        display: 'flex',
        height: 12,
        borderRadius: 6,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.1)',
      }}>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              width: `${(seg.value / total) * 100}%`,
              background: seg.color,
              boxShadow: `inset 0 0 10px ${seg.color}50`,
              transition: 'width 0.5s ease',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: seg.color }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>
              {seg.label || `Segment ${i + 1}`}: {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 📄 src/components/ui/SearchBar.tsx
```typescript
"use client";

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  color?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...', color = '#00d4ff' }: SearchBarProps) {
  return (
    <div style={{
      position: 'relative',
      flex: 1,
      maxWidth: 300,
    }}>
      <span style={{
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 14,
        opacity: 0.5,
      }}>🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px 10px 36px',
          borderRadius: 10,
          border: `1px solid ${value ? color + '60' : 'rgba(255,255,255,0.1)'}`,
          background: 'rgba(0,0,0,0.3)',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: 12,
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => e.target.style.borderColor = color + '80'}
        onBlur={(e) => e.target.style.borderColor = value ? color + '60' : 'rgba(255,255,255,0.1)'}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 10,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
```

### 📄 src/components/ui/Skeleton.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   💀 SKELETON - SYNTX SHIMMER LOADER                                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  animate?: boolean;
}

export default function Skeleton({
  width,
  height,
  borderRadius,
  className = '',
  variant = 'rectangular',
  lines = 1,
  animate = true,
}: SkeletonProps) {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'text':
        return { width: width || '100%', height: height || 16, borderRadius: borderRadius ?? 4 };
      case 'circular':
        return { width: width || 48, height: height || 48, borderRadius: '50%' };
      case 'card':
        return { width: width || '100%', height: height || 200, borderRadius: borderRadius ?? 16 };
      default:
        return { width: width || '100%', height: height || 20, borderRadius: borderRadius ?? 8 };
    }
  };

  const baseStyle: React.CSSProperties = {
    ...getVariantStyles(),
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 100%)',
    backgroundSize: '200px 100%',
    animation: animate ? 'skeletonShimmer 1.5s ease infinite' : 'none',
    position: 'relative',
    overflow: 'hidden',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              width: i === lines - 1 ? '70%' : '100%',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={className} style={baseStyle}>
      {/* Shimmer Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.05), transparent)',
        animation: animate ? 'shimmer 2s linear infinite' : 'none',
      }} />
    </div>
  );
}

// Preset Components
export function SkeletonCard() {
  return (
    <div style={{
      padding: 24,
      background: 'rgba(10, 22, 40, 0.6)',
      borderRadius: 20,
      border: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={18} />
          <div style={{ height: 8 }} />
          <Skeleton variant="text" width="40%" height={14} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
      <div style={{ height: 16 }} />
      <Skeleton variant="rectangular" height={40} borderRadius={10} />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 16, padding: '12px 16px', background: 'rgba(0, 212, 255, 0.05)', borderRadius: 8 }}>
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} width={`${25 - i * 2}%`} height={16} />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, padding: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          {[1, 2, 3, 4].map(j => (
            <Skeleton key={j} width={`${25 - j * 2}%`} height={14} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ padding: 20, background: 'rgba(10, 22, 40, 0.6)', borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <Skeleton width={80} height={12} />
          <div style={{ height: 12 }} />
          <Skeleton width={100} height={32} />
        </div>
      ))}
    </div>
  );
}
```

### 📄 src/components/ui/SortHeader.tsx
```typescript
"use client";

import React from 'react';

interface SortHeaderProps {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
  color?: string;
}

export default function SortHeader({ label, sortKey, currentSort, onSort, color = '#00d4ff' }: SortHeaderProps) {
  const isActive = currentSort?.key === sortKey;
  const direction = isActive ? currentSort.direction : null;

  return (
    <button
      onClick={() => onSort(sortKey)}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: 10,
        fontWeight: 600,
        color: isActive ? color : 'rgba(255,255,255,0.5)',
        letterSpacing: 1,
        textTransform: 'uppercase',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
      <span style={{ 
        opacity: isActive ? 1 : 0.3,
        transition: 'all 0.2s ease',
        transform: direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
      }}>
        ▼
      </span>
    </button>
  );
}
```

### 📄 src/components/ui/StatusBadge.tsx
```typescript
'use client';

interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'error' | 'loading';
  label?: string;
  pulse?: boolean;
}

export function StatusBadge({ status, label, pulse = true }: StatusBadgeProps) {
  const colors = {
    healthy: 'bg-syntx-green border-syntx-green/50 text-syntx-green',
    warning: 'bg-syntx-yellow border-syntx-yellow/50 text-syntx-yellow',
    error: 'bg-syntx-red border-syntx-red/50 text-syntx-red',
    loading: 'bg-syntx-cyan border-syntx-cyan/50 text-syntx-cyan',
  };

  const glows = {
    healthy: 'shadow-[0_0_10px_rgba(0,255,136,0.5)]',
    warning: 'shadow-[0_0_10px_rgba(255,215,0,0.5)]',
    error: 'shadow-[0_0_10px_rgba(255,71,87,0.5)]',
    loading: 'shadow-[0_0_10px_rgba(0,212,255,0.5)]',
  };

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full
      border bg-opacity-10 ${colors[status]}
    `}>
      <span className={`
        relative w-2 h-2 rounded-full bg-current ${glows[status]}
        ${pulse ? 'animate-pulse' : ''}
      `}>
        <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-75" />
      </span>
      {label && (
        <span className="text-xs font-mono uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
}
```

### 📄 src/components/ui/Toast.tsx
```typescript
"use client";

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
  addToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const colors = {
    info: { bg: 'rgba(0,212,255,0.15)', border: '#00d4ff', text: '#00d4ff' },
    success: { bg: 'rgba(16,185,129,0.15)', border: '#10b981', text: '#10b981' },
    warning: { bg: 'rgba(245,158,11,0.15)', border: '#f59e0b', text: '#f59e0b' },
    error: { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', text: '#ef4444' },
  };

  const icons = {
    info: '📡',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {toasts.map((toast, i) => (
          <div
            key={toast.id}
            style={{
              padding: '12px 20px',
              background: colors[toast.type].bg,
              border: `1px solid ${colors[toast.type].border}`,
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              animation: 'slideIn 0.3s ease',
              boxShadow: `0 0 20px ${colors[toast.type].border}40`,
            }}
          >
            <span style={{ fontSize: 16 }}>{icons[toast.type]}</span>
            <span style={{
              fontSize: 12,
              fontFamily: 'monospace',
              color: colors[toast.type].text,
            }}>
              {toast.message}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
```

### 📄 src/components/ui/Tooltip.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   💬 TOOLTIP - SYNTX CYBER EDITION                                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useRef, useEffect } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: Position;
  delay?: number;
  color?: string;
  maxWidth?: number;
}

export default function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  delay = 200,
  color = '#00d4ff',
  maxWidth = 300,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      const trigger = triggerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();
      
      let x = 0, y = 0;
      const gap = 12;

      switch (position) {
        case 'top':
          x = trigger.left + trigger.width / 2 - tooltip.width / 2;
          y = trigger.top - tooltip.height - gap;
          break;
        case 'bottom':
          x = trigger.left + trigger.width / 2 - tooltip.width / 2;
          y = trigger.bottom + gap;
          break;
        case 'left':
          x = trigger.left - tooltip.width - gap;
          y = trigger.top + trigger.height / 2 - tooltip.height / 2;
          break;
        case 'right':
          x = trigger.right + gap;
          y = trigger.top + trigger.height / 2 - tooltip.height / 2;
          break;
      }

      // Keep in viewport
      x = Math.max(10, Math.min(x, window.innerWidth - tooltip.width - 10));
      y = Math.max(10, Math.min(y, window.innerHeight - tooltip.height - 10));

      setCoords({ x, y });
    }
  }, [visible, position]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getArrowStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    switch (position) {
      case 'top':
        return { ...base, bottom: -8, left: '50%', transform: 'translateX(-50%)', borderWidth: '8px 8px 0 8px', borderColor: `${color}40 transparent transparent transparent` };
      case 'bottom':
        return { ...base, top: -8, left: '50%', transform: 'translateX(-50%)', borderWidth: '0 8px 8px 8px', borderColor: `transparent transparent ${color}40 transparent` };
      case 'left':
        return { ...base, right: -8, top: '50%', transform: 'translateY(-50%)', borderWidth: '8px 0 8px 8px', borderColor: `transparent transparent transparent ${color}40` };
      case 'right':
        return { ...base, left: -8, top: '50%', transform: 'translateY(-50%)', borderWidth: '8px 8px 8px 0', borderColor: `transparent ${color}40 transparent transparent` };
    }
  };

  return (
    <>
      <div 
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>

      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: coords.x,
            top: coords.y,
            zIndex: 9999,
            padding: '12px 18px',
            maxWidth,
            background: 'rgba(5, 13, 24, 0.98)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${color}40`,
            borderRadius: 12,
            boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${color}20`,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.5,
            animation: 'scaleIn 0.2s ease-out',
            pointerEvents: 'none',
          }}
        >
          {/* Glow Effect */}
          <div style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${color}30, transparent, ${color}20)`,
            zIndex: -1,
            filter: 'blur(8px)',
          }} />
          
          {/* Arrow */}
          <div style={getArrowStyle()} />
          
          {/* Content */}
          {content}
        </div>
      )}
    </>
  );
}
```

### 📄 src/components/wrappers/CreateWrapperModal.tsx
```typescript
"use client";

import { useState } from "react";

export default function CreateWrapperModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    level: string;
    content: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("CUSTOM");
  const [content, setContent] = useState("");

  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={title}>➕ Create Wrapper</h3>

        <input
          placeholder="Wrapper name (e.g. SIGMA_V2)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={input}
        >
          <option>CUSTOM</option>
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <textarea
          placeholder="Paste wrapper definition here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textarea}
        />

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={btnGhost}>
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit({ name, level, content });
              setName("");
              setContent("");
            }}
            style={btnPrimary}
          >
            Save Wrapper
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── styles ───────── */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
  zIndex: 999,
};

const modal = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 600,
  background: "linear-gradient(135deg,#0a1a2e,#050b14)",
  borderRadius: 16,
  padding: 24,
  border: "1px solid rgba(0,212,255,0.2)",
  boxShadow: "0 0 40px rgba(0,212,255,0.2)",
};

const title = {
  marginBottom: 16,
  fontFamily: "Orbitron, sans-serif",
  color: "#00d4ff",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  fontFamily: "monospace",
};

const textarea = {
  ...input,
  minHeight: 160,
  resize: "vertical" as const,
};

const btnPrimary = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(135deg,#00d4ff,#00a8cc)",
  color: "#021018",
  fontWeight: 700,
  cursor: "pointer",
};

const btnGhost = {
  ...btnPrimary,
  background: "transparent",
  color: "rgba(255,255,255,0.5)",
  border: "1px solid rgba(255,255,255,0.2)",
};
```

### 📄 src/components/wrappers/index.ts
```typescript
export { default as WrapperPanel } from './WrapperPanel';
export { default as WrapperControl } from './WrapperPanel'; // Alias für Kompatibilität
```

### 📄 src/components/wrappers/modals/CreateModal.tsx
```typescript
"use client";
import React, { useState } from 'react';
import { COLORS } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; content: string; description?: string; author?: string }) => Promise<void>;
  saving: boolean;
}

export default function CreateModal({ isOpen, onClose, onCreate, saving }: CreateModalProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  if (!isOpen) return null;

  const canCreate = name.trim() && content.trim();
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const estimatedSize = new Blob([content]).size;

  const handleCreate = async () => {
    if (!canCreate) return;
    await onCreate({ name: normalizedName, content, description: description || undefined, author: author || undefined });
    setName(''); setContent(''); setDescription(''); setAuthor('');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: '1px solid rgba(16,185,129,0.5)', width: '95%', maxWidth: 1200, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': COLORS.green } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(16,185,129,0.3)', background: 'linear-gradient(135deg, rgba(16,185,129,0.15), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(16,185,129,0.25)', border: '2px solid rgba(16,185,129,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🌟</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color: COLORS.green, letterSpacing: 3 }}>WRAPPER GEBÄREN</h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Manifestiere ein neues Feld mit Live Preview</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT - SPLIT VIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: FORM */}
          <div style={{ padding: 28, borderRight: '1px solid rgba(16,185,129,0.2)', overflow: 'auto' }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>🏷️ WRAPPER NAME *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="z.B. sigma_ultra" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Wird: {normalizedName || 'wrapper_name'}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>👤 AUTOR</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="SYNTX" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📝 BESCHREIBUNG</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Beschreibung..." style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📦 WRAPPER CONTENT *</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="=== SYNTX WRAPPER ===" style={{ width: '100%', minHeight: 300, padding: 14, borderRadius: 10, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'vertical' }} />
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="live-preview" style={{ padding: 28, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>👁️</span>
              <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.magenta }}>LIVE PREVIEW</h4>
              <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: 'rgba(217,70,239,0.2)', color: COLORS.magenta }}>System Prompt</span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: '1px solid rgba(217,70,239,0.3)', padding: 20, fontFamily: 'monospace', fontSize: 13, minHeight: 300 }}>
              {content ? (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{content}</pre>
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 40 }}>
                  Gib Content ein um die Preview zu sehen...
                </div>
              )}
            </div>

            {/* STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              <div style={{ padding: 16, background: 'rgba(0,212,255,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.cyan }}>{content.split('\n').length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>ZEILEN</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.orange }}>{content.length}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>ZEICHEN</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(217,70,239,0.1)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.magenta }}>{(estimatedSize / 1024).toFixed(1)}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>KB</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            API: POST /resonanz/wrapper
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onClose} className="cyber-btn" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
            <button onClick={handleCreate} disabled={saving || !canCreate} className="cyber-btn" style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: canCreate && !saving ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(16,185,129,0.3)', color: '#030b15', fontFamily: 'monospace', fontWeight: 800, cursor: canCreate && !saving ? 'pointer' : 'not-allowed' }}>
              {saving ? '⏳ GEBÄRT...' : '🌟 GEBÄREN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/wrappers/modals/DeleteModal.tsx
```typescript
"use client";
import React, { useState } from 'react';
import { COLORS, Wrapper } from '../types';

interface DeleteModalProps {
  wrapper: Wrapper | null;
  onClose: () => void;
  onDelete: () => Promise<void>;
  deleting: boolean;
}

export default function DeleteModal({ wrapper, onClose, onDelete, deleting }: DeleteModalProps) {
  const [confirmName, setConfirmName] = useState('');

  if (!wrapper) return null;
  const canDelete = confirmName === wrapper.name;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #1a0a0a, #0a0505)', borderRadius: 24, border: '1px solid rgba(239,68,68,0.5)', maxWidth: 500, width: '100%', position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': COLORS.red } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(239,68,68,0.3)', background: 'linear-gradient(135deg, rgba(239,68,68,0.15), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(239,68,68,0.25)', border: '2px solid rgba(239,68,68,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>💀</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color: COLORS.red, letterSpacing: 3 }}>WRAPPER FREIGEBEN</h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>⚠️ UNWIDERRUFLICH!</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: 28 }}>
          <div style={{ padding: 20, borderRadius: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <span style={{ fontFamily: 'monospace', fontSize: 16, color: 'white', fontWeight: 700 }}>{wrapper.name}</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 16 }}>
              <span>{wrapper.size_human}</span>
              {wrapper.is_active && <span style={{ color: COLORS.green }}>🎯 AKTIV</span>}
            </div>
          </div>

          {wrapper.is_active && (
            <div style={{ padding: 16, borderRadius: 12, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.5)', color: COLORS.orange, fontSize: 13, fontFamily: 'monospace', marginBottom: 24 }}>
              ⚠️ WARNUNG: Dies ist das aktive Default-Feld!
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              Tippe "<span style={{ color: COLORS.red, fontWeight: 700 }}>{wrapper.name}</span>" zur Bestätigung
            </label>
            <input 
              value={confirmName} 
              onChange={e => setConfirmName(e.target.value)} 
              placeholder={wrapper.name} 
              style={{ width: '100%', padding: 14, borderRadius: 10, border: `1px solid ${canDelete ? 'rgba(239,68,68,0.8)' : 'rgba(239,68,68,0.3)'}`, background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} 
            />
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(239,68,68,0.2)', display: 'flex', gap: 12 }}>
          <button onClick={onClose} className="cyber-btn" style={{ flex: 1, padding: '14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', cursor: 'pointer' }}>ABBRECHEN</button>
          <button onClick={onDelete} disabled={deleting || !canDelete} className="cyber-btn" style={{ flex: 2, padding: '14px', borderRadius: 10, border: 'none', background: canDelete && !deleting ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'rgba(239,68,68,0.3)', color: 'white', fontFamily: 'monospace', fontWeight: 700, cursor: canDelete && !deleting ? 'pointer' : 'not-allowed' }}>
            {deleting ? '⏳ FREIGEBEN...' : '💀 FREIGEBEN'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/wrappers/modals/EditModal.tsx
```typescript
"use client";
import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { COLORS, WrapperDetail, getWrapperColor } from '../types';

interface FormatOption {
  [key: string]: any;
  name: string;
  fields_count: number;
  description?: string;
}

interface FormatField {
  name: string;
  weight: number;
  enabled: boolean;
}

interface EditModalProps {
  wrapper: WrapperDetail | null;
  onClose: () => void;
  onSave: (content: string, formatData?: { format: string; fields: { name: string; weight: number; enabled: boolean }[] }) => Promise<void>;
  saving: boolean;
}

export default function EditModal({ wrapper, onClose, onSave, saving }: EditModalProps) {
  const [content, setContent] = useState('');
  
  // FORMAT INTEGRATION
  const [formats, setFormats] = useState<FormatOption[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [originalFormat, setOriginalFormat] = useState<string>('');
  const [formatFields, setFormatFields] = useState<FormatField[]>([]);
  const [originalFormatFields, setOriginalFormatFields] = useState<FormatField[]>([]);
  const [loadingFormats, setLoadingFormats] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // VIEW MODE
  const [previewMode, setPreviewMode] = useState<'wrapper' | 'format' | 'combined'>('combined');
  
  useEffect(() => {
    if (wrapper) {
      setContent(wrapper.content);
      loadFormats();
    }
  }, [wrapper]);

  const loadFormats = async () => {
    setLoadingFormats(true);
    try {
      const data = await api.getFormats();
      setFormats((data.formats || []).map((f: any) => ({ name: f.name, fields_count: f.fields_count || f.fields?.length || 0, description: f.description })));
      
      // Use wrapper's bound format if available, otherwise use first format
      const boundFormat = wrapper?.meta?.format || '';
      const initialFormat = boundFormat || (data.formats?.length > 0 ? data.formats[0].name : '');
      
      if (initialFormat) {
        setSelectedFormat(initialFormat);
        setOriginalFormat(initialFormat);
        await loadFormatFields(initialFormat);
        // Jetzt originalFormatFields setzen (nur einmal beim Init)
        const initDetail = await api.getFormat(initialFormat);
        const initFormat = (initDetail as any).format || initDetail;
        const initFields = (initFormat.fields || []).map((f: any) => ({ name: f.name, weight: f.weight || 17, enabled: true }));
        setOriginalFormatFields(initFields);
      }
    } catch (err) {
      console.error('Failed to load formats:', err);
    } finally {
      setLoadingFormats(false);
    }
  };

  const loadFormatFields = async (formatName: string) => {
    try {
      const detail = await api.getFormat(formatName);
      const format = (detail as any).format || detail;
      const fields = (format.fields || []).map((f: any) => ({
        name: f.name,
        weight: f.weight || 17,
        enabled: true
      }));
      setFormatFields(fields);
      // originalFormatFields wird nur beim ersten Load gesetzt, nicht bei Format-Wechsel
    } catch (err) {
      console.error('Failed to load format:', err);
      setFormatFields([]);
    }
  };

  const handleFormatChange = async (formatName: string) => {
    setSelectedFormat(formatName);
    await loadFormatFields(formatName);
  };

  const toggleField = (index: number) => {
    setFormatFields(formatFields.map((f, i) => 
      i === index ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const updateWeight = (index: number, weight: number) => {
    setFormatFields(formatFields.map((f, i) => 
      i === index ? { ...f, weight } : f
    ));
  };

  if (!wrapper) return null;
  const color = getWrapperColor(wrapper.name);
  const estimatedSize = new Blob([content]).size;
  const formatChanged = selectedFormat !== originalFormat;
  const formatFieldsChanged = JSON.stringify(formatFields) !== JSON.stringify(originalFormatFields);
  const hasChanges = content !== wrapper.content || formatFieldsChanged || formatChanged;
  console.log("DEBUG:", { selectedFormat, originalFormat, formatChanged, formatFieldsChanged, hasChanges });
  const enabledFields = formatFields.filter(f => f.enabled);

  // 🔥 GENERATE COMBINED PROMPT PREVIEW
  const generateFormatInjection = () => {
    if (enabledFields.length === 0) return '';
    
    let injection = '\n\n// ═══════════════════════════════════════════════════════════════\n';
    injection += `// 📋 FORMAT INJECTION: ${selectedFormat.toUpperCase()}\n`;
    injection += '// ═══════════════════════════════════════════════════════════════\n\n';
    injection += 'WICHTIG: Deine Antwort MUSS EXAKT in diesem Format sein:\n\n';
    
    enabledFields.forEach(field => {
      injection += `### ${field.name.toUpperCase()}:\n`;
      injection += `[Deine Analyse zu ${field.name}... (Weight: ${field.weight})]\n\n`;
    });
    
    return injection;
  };

  const getCombinedPrompt = () => {
    return content + generateFormatInjection();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `2px solid ${color}50`, width: '98%', maxWidth: 1400, height: '95vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: `0 0 60px ${color}30` }}>
        <div className="scan-line" style={{ '--scan-color': color } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="pulse" style={{ width: 46, height: 46, borderRadius: 12, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔄</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }}>WRAPPER MODULIEREN</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name}</span>
                {wrapper.is_active && <span style={{ padding: '2px 8px', borderRadius: 10, background: 'rgba(16,185,129,0.2)', fontSize: 9, color: COLORS.green }}>🎯 AKTIV</span>}
                {hasChanges && <span style={{ padding: '2px 8px', borderRadius: 10, background: 'rgba(245,158,11,0.2)', fontSize: 9, color: COLORS.orange }}>● GEÄNDERT</span>}
              </div>
            </div>
          </div>
          
          {/* PREVIEW MODE TOGGLE */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 4 }}>
            {(['wrapper', 'format', 'combined'] as const).map(mode => (
              <button key={mode} onClick={() => setPreviewMode(mode)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: previewMode === mode ? color : 'transparent', color: previewMode === mode ? '#030b15' : 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 10, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>
                {mode === 'wrapper' ? '📦 Wrapper' : mode === 'format' ? '📋 Format' : '🔥 Combined'}
              </button>
            ))}
          </div>
          
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT - 3 COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* LEFT: WRAPPER EDITOR */}
          <div style={{ padding: 20, borderRight: `1px solid ${color}20`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, background: color, borderRadius: 2 }} />
                📦 WRAPPER CONTENT
              </label>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{content.split('\n').length} Zeilen</span>
            </div>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              style={{ flex: 1, width: '100%', padding: 14, borderRadius: 12, border: `1px solid ${color}30`, background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.9)', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.6, outline: 'none', resize: 'none' }} 
            />
          </div>

          {/* MIDDLE: FORMAT CONTROLS */}
          <div style={{ padding: 20, borderRight: `1px solid ${color}20`, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
            <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, background: COLORS.magenta, borderRadius: 2 }} />
              📋 FORMAT INJECTION
            </label>
            {/* FORMAT SELECTOR - CYBER DROPDOWN */}
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <div 
                onClick={() => !loadingFormats && setDropdownOpen(!dropdownOpen)}
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  borderRadius: 12, 
                  border: '1px solid rgba(217,70,239,0.4)', 
                  background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(0,0,0,0.4))',
                  color: selectedFormat ? COLORS.magenta : 'rgba(255,255,255,0.5)', 
                  fontFamily: 'monospace', 
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: loadingFormats ? 'wait' : 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: dropdownOpen ? '0 0 20px rgba(217,70,239,0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{selectedFormat ? selectedFormat.toUpperCase() : '📋 Format wählen...'}</span>
                <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: 4,
                  background: 'linear-gradient(145deg, rgba(10,26,46,0.98), rgba(6,13,24,0.98))',
                  border: '1px solid rgba(217,70,239,0.4)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  zIndex: 100,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(217,70,239,0.2)',
                  maxHeight: 250,
                  overflowY: 'auto'
                }}>
                  <div 
                    onClick={() => { handleFormatChange(''); setDropdownOpen(false); }}
                    style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: 12, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,70,239,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    ❌ Kein Format
                  </div>
                  {formats.map(f => (
                    <div 
                      key={f.name}
                      onClick={() => { handleFormatChange(f.name); setDropdownOpen(false); }}
                      style={{ 
                        padding: '12px 16px', 
                        cursor: 'pointer', 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        background: selectedFormat === f.name ? 'rgba(217,70,239,0.2)' : 'transparent',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,70,239,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.background = selectedFormat === f.name ? 'rgba(217,70,239,0.2)' : 'transparent'}
                    >
                      <span style={{ color: COLORS.magenta, fontFamily: 'monospace', fontSize: 12, fontWeight: 700 }}>{f.name.toUpperCase()}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{f.fields_count} Felder</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                🎯 FELDER ({enabledFields.length}/{formatFields.length} aktiv)
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {formatFields.map((field, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: field.enabled ? 'rgba(217,70,239,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${field.enabled ? 'rgba(217,70,239,0.3)' : 'rgba(255,255,255,0.05)'}`, opacity: field.enabled ? 1 : 0.5 }}>
                    <input 
                      type="checkbox" 
                      checked={field.enabled} 
                      onChange={() => toggleField(i)} 
                      style={{ accentColor: COLORS.magenta, cursor: 'pointer' }} 
                    />
                    <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 10, color: field.enabled ? COLORS.magenta : 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{field.name}</span>
                    <input 
                      type="number" 
                      value={field.weight} 
                      onChange={e => updateWeight(i, parseInt(e.target.value) || 0)}
                      style={{ width: 40, padding: '4px 6px', borderRadius: 4, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: COLORS.orange, fontFamily: 'monospace', fontSize: 10, textAlign: 'center' }}
                    />
                  </div>
                ))}
              </div>

              {formatFields.length === 0 && selectedFormat && (
                <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                  Lade Felder...
                </div>
              )}

              {!selectedFormat && (
                <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                  Wähle ein Format
                </div>
              )}
            </div>

            {/* STATS */}
            <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.cyan }}>{content.length + generateFormatInjection().length}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOTAL CHARS</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.orange }}>{enabledFields.reduce((a, b) => a + b.weight, 0)}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOTAL WEIGHT</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="live-preview" style={{ padding: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>👁️</span>
                <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.green }}>
                  {previewMode === 'wrapper' ? 'WRAPPER PREVIEW' : previewMode === 'format' ? 'FORMAT PREVIEW' : '🔥 FINALER PROMPT'}
                </h4>
              </div>
              <span style={{ fontSize: 9, padding: '4px 10px', borderRadius: 20, background: previewMode === 'combined' ? 'rgba(16,185,129,0.2)' : 'rgba(217,70,239,0.2)', color: previewMode === 'combined' ? COLORS.green : COLORS.magenta }}>
                {previewMode === 'combined' ? 'Was die AI sieht' : previewMode === 'wrapper' ? 'Nur Wrapper' : 'Nur Format'}
              </span>
            </div>

            <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: 12, border: `1px solid ${previewMode === 'combined' ? COLORS.green : COLORS.magenta}30`, padding: 16, overflow: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {previewMode === 'wrapper' && content}
                {previewMode === 'format' && (selectedFormat ? generateFormatInjection() : 'Wähle ein Format um die Injection zu sehen...')}
                {previewMode === 'combined' && (
                  <>
                    <span style={{ color: COLORS.cyan }}>{content}</span>
                    {selectedFormat && enabledFields.length > 0 && (
                      <span style={{ color: COLORS.magenta }}>{generateFormatInjection()}</span>
                    )}
                  </>
                )}
              </pre>
            </div>

            {/* COMBINED STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
              <div style={{ padding: 10, background: 'rgba(0,212,255,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.cyan }}>{content.split('\n').length}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>WRAPPER</div>
              </div>
              <div style={{ padding: 10, background: 'rgba(217,70,239,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.magenta }}>{enabledFields.length}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>FELDER</div>
              </div>
              <div style={{ padding: 10, background: 'rgba(16,185,129,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.green }}>{getCombinedPrompt().split('\n').length}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOTAL</div>
              </div>
              <div style={{ padding: 10, background: 'rgba(245,158,11,0.1)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.orange }}>~{Math.round(getCombinedPrompt().length / 4)}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '14px 24px', borderTop: `1px solid ${color}20`, background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
              📦 {wrapper.size_human} → {(estimatedSize / 1024).toFixed(1)} KB
            </span>
            {selectedFormat && (
              <span style={{ fontSize: 11, color: COLORS.magenta, fontFamily: 'monospace' }}>
                📋 {selectedFormat.toUpperCase()} ({enabledFields.length} Felder)
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onClose} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 12, cursor: 'pointer' }}>ABBRECHEN</button>
            <button onClick={() => onSave(content, selectedFormat ? { format: selectedFormat, fields: formatFields } : undefined)} disabled={saving || !hasChanges} className="cyber-btn" style={{ padding: '12px 32px', borderRadius: 10, border: 'none', background: hasChanges && !saving ? `linear-gradient(135deg, ${color}, ${color}cc)` : 'rgba(255,255,255,0.1)', color: '#030b15', fontFamily: 'monospace', fontSize: 12, fontWeight: 800, cursor: hasChanges && !saving ? 'pointer' : 'not-allowed' }}>
              {saving ? '⏳ MODULIERT...' : '🔄 MODULIEREN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/wrappers/modals/index.ts
```typescript
export { default as CreateModal } from './CreateModal';
export { default as ViewModal } from './ViewModal';
export { default as EditModal } from './EditModal';
export { default as StatsModal } from './StatsModal';
export { default as DeleteModal } from './DeleteModal';
```

### 📄 src/components/wrappers/modals/StatsModal.tsx
```typescript
"use client";
import React from 'react';
import { COLORS, Wrapper, WrapperStats, getWrapperColor } from '../types';

interface StatsModalProps {
  wrapper: Wrapper | null;
  stats: WrapperStats | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

export default function StatsModal({ wrapper, stats, loading, error, onClose }: StatsModalProps) {
  if (!wrapper) return null;
  const color = getWrapperColor(wrapper.name);

  const StatBox = ({ label, value, unit, icon }: { label: string; value: number | string; unit?: string; icon: string }) => (
    <div style={{ padding: 20, borderRadius: 16, background: `${color}10`, border: `1px solid ${color}30` }}>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{icon} {label}</div>
      <div style={{ fontSize: 28, fontFamily: 'monospace', color, fontWeight: 700 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}{unit && <span style={{ fontSize: 14, opacity: 0.7, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `1px solid ${color}50`, width: '95%', maxWidth: 700, position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': color } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="pulse" style={{ width: 50, height: 50, borderRadius: 12, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📊</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }}>WRAPPER STATISTIKEN</h3>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
        </div>

        {/* CONTENT */}
        <div style={{ padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div className="pulse" style={{ fontSize: 48 }}>📊</div>
              <div style={{ marginTop: 16, color, fontFamily: 'monospace' }}>Lade Statistiken...</div>
            </div>
          ) : error || !stats ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48 }}>📭</div>
              <div style={{ fontFamily: 'monospace', fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Keine Statistiken verfügbar</div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Dieses Feld wurde noch nicht verwendet</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                <StatBox label="TOTAL REQUESTS" value={stats.requests} icon="📨" />
                <StatBox label="SUCCESS RATE" value={stats.success_rate.toFixed(1)} unit="%" icon="✅" />
                <StatBox label="AVG LATENCY" value={Math.round(stats.average_latency_ms)} unit="ms" icon="⚡" />
              </div>
              
              <div style={{ padding: 20, borderRadius: 16, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>⏱️ LATENCY DETAILS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MIN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.green }}>{stats.min_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MEDIAN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.cyan }}>{stats.median_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MAX</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.orange }}>{stats.max_latency_ms.toLocaleString()} ms</div></div>
                </div>
              </div>

              <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: stats.success_rate >= 95 ? 'rgba(16,185,129,0.1)' : stats.success_rate >= 80 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${stats.success_rate >= 95 ? COLORS.green : stats.success_rate >= 80 ? COLORS.orange : COLORS.red}30`, textAlign: 'center' }}>
                <span style={{ fontSize: 14, fontFamily: 'monospace', color: stats.success_rate >= 95 ? COLORS.green : stats.success_rate >= 80 ? COLORS.orange : COLORS.red }}>
                  {stats.success_rate >= 95 ? '🔥 EXCELLENT PERFORMANCE' : stats.success_rate >= 80 ? '✅ GOOD PERFORMANCE' : '⚠️ NEEDS ATTENTION'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/wrappers/modals/ViewModal.tsx
```typescript
"use client";
import React from 'react';
import { COLORS, WrapperDetail, getWrapperColor, formatDate } from '../types';

interface ViewModalProps {
  wrapper: WrapperDetail | null;
  loading: boolean;
  onClose: () => void;
  onEdit: () => void;
  onActivate: () => void;
}

export default function ViewModal({ wrapper, loading, onClose, onEdit, onActivate }: ViewModalProps) {
  if (!wrapper && !loading) return null;
  const color = wrapper ? getWrapperColor(wrapper.name) : COLORS.cyan;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #0a1a2e, #060d18)', borderRadius: 24, border: `1px solid ${color}50`, width: '95%', maxWidth: 1000, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div className="scan-line" style={{ '--scan-color': color } as any} />
        
        {/* HEADER */}
        <div style={{ padding: '24px 28px', borderBottom: `1px solid ${color}30`, background: `linear-gradient(135deg, ${color}15, transparent)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📦</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 26, fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: 3 }}>{wrapper?.name || 'Loading...'}</h3>
                  {wrapper?.is_active && <span style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', fontSize: 11, color: COLORS.green }}>🎯 AKTIV</span>}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Wrapper Detail View</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 28, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>✕</button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div className="pulse" style={{ fontSize: 56 }}>📦</div>
              <div style={{ marginTop: 16, color, fontFamily: 'monospace' }}>Lade Details...</div>
            </div>
          ) : wrapper && (
            <>
              {/* STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
                <div style={{ padding: 20, background: `${COLORS.cyan}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.cyan }}>{wrapper.size_human}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>GRÖSSE</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.orange}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.orange }}>{wrapper.content.split('\n').length}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>ZEILEN</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.green}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.green }}>{formatDate(wrapper.last_modified)}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>MODULATION</div>
                </div>
                <div style={{ padding: 20, background: `${COLORS.purple}15`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 24 }}>{wrapper.is_active ? '🎯' : '💤'}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>STATUS</div>
                </div>
              </div>

              {/* CONTENT PREVIEW */}
              <div>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>📝</span> WRAPPER CONTENT
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 16, border: `1px solid ${color}30`, padding: 20, maxHeight: 400, overflow: 'auto' }}>
                  <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{wrapper.content}</pre>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '16px 28px', borderTop: `1px solid ${color}20`, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          {wrapper && !wrapper.is_active && (
            <button onClick={onActivate} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(16,185,129,0.5)', background: 'rgba(16,185,129,0.15)', color: COLORS.green, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>🎯 AKTIVIEREN</button>
          )}
          <button onClick={onEdit} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>✏️ EDIT</button>
          <button onClick={onClose} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: color, color: '#030b15', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>SCHLIESSEN</button>
        </div>
      </div>
    </div>
  );
}
```

### 📄 src/components/wrappers/styles.ts
```typescript
export const cyberStyles = `
  @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px var(--glow); } 50% { box-shadow: 0 0 40px var(--glow); } }
  @keyframes borderFlow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
  @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px currentColor; } 50% { text-shadow: 0 0 30px currentColor; } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes slideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes slideIn { 0% { opacity: 0; transform: scale(0.9) translateY(-20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0.5; } }
  @keyframes scanLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
  .wrapper-card { position: relative; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); animation: slideUp 0.5s ease-out backwards; }
  .wrapper-card:hover { transform: translateY(-8px) scale(1.02); z-index: 10; }
  .wrapper-card::before { content: ''; position: absolute; inset: -2px; border-radius: 18px; background: linear-gradient(45deg, var(--card-color), transparent, var(--card-color)); background-size: 200% 200%; animation: borderFlow 3s linear infinite; z-index: -1; opacity: 0; transition: opacity 0.3s; }
  .wrapper-card:hover::before { opacity: 1; }
  .cyber-btn { position: relative; overflow: hidden; transition: all 0.3s; }
  .cyber-btn:hover { transform: scale(1.05); filter: brightness(1.2); }
  .cyber-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .modal-overlay { animation: fadeIn 0.2s ease-out; }
  .modal-content { animation: slideIn 0.3s ease-out; }
  .scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--scan-color), transparent); animation: scanLine 2s linear infinite; pointer-events: none; z-index: 10; }
  .live-preview { background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,20,40,0.8) 100%); }
`;
```

### 📄 src/components/wrappers/types.ts
```typescript
// 🔥 SYNTX WRAPPER TYPES & CONSTANTS

export interface Wrapper {
  name: string;
  path?: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  meta?: any;
  description?: string;
  author?: string;
}

export interface WrapperDetail {
  name: string;
  content: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  meta?: any;
  description?: string;
  author?: string;
}

export interface WrapperStats {
  wrapper: string;
  requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

export const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  teal: '#14b8a6',
  pink: '#ec4899',
  lime: '#84cc16',
  yellow: '#eab308',
} as const;

export const getWrapperColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('human')) return COLORS.green;
  if (n.includes('sigma')) return COLORS.orange;
  if (n.includes('deepsweep')) return COLORS.magenta;
  if (n.includes('true_raw') || n.includes('true-raw')) return COLORS.red;
  if (n.includes('universal')) return COLORS.purple;
  if (n.includes('frontend')) return COLORS.cyan;
  if (n.includes('backend')) return COLORS.teal;
  if (n.includes('driftkorper') || n.includes('drift')) return COLORS.pink;
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const keys = Object.keys(COLORS) as (keyof typeof COLORS)[];
  return COLORS[keys[hash % keys.length]];
};

export const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
};
```

### 📄 src/components/wrappers/WrapperList.tsx
```typescript
'use client';

import { Card, Button, StatusBadge } from '@/components/ui';
import { useApi, useMutation } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Wrapper } from '@/types/api';

const FREQUENCY_MAP: Record<string, { label: string; color: string }> = {
  'human': { label: 'LOW', color: 'text-syntx-green border-syntx-green/30 bg-syntx-green/10' },
  'sigma': { label: 'MEDIUM', color: 'text-syntx-yellow border-syntx-yellow/30 bg-syntx-yellow/10' },
  'deepsweep': { label: 'HIGH', color: 'text-syntx-magenta border-syntx-magenta/30 bg-syntx-magenta/10' },
};

export function WrapperList() {
  const { data, loading, refetch } = useApi(() => api.getWrappers(), []);
  const { mutate: activate, loading: activating } = useMutation(api.setRuntimeWrapper);

  const handleActivate = async (name: string) => {
    try {
      await activate(name);
      refetch();
    } catch (err) {
      console.error('Failed to activate:', err);
    }
  };

  const getFrequency = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('human')) return FREQUENCY_MAP.human;
    if (lower.includes('sigma')) return FREQUENCY_MAP.sigma;
    if (lower.includes('deepsweep')) return FREQUENCY_MAP.deepsweep;
    return { label: 'CUSTOM', color: 'text-syntx-cyan border-syntx-cyan/30 bg-syntx-cyan/10' };
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted flex items-center gap-2">
          <span className="text-syntx-magenta">📦</span>
          Wrapper Frequency Bands
        </h2>
        <Button variant="ghost" size="sm" onClick={refetch}>↻</Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-syntx-dark/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data?.wrappers.map((wrapper) => (
            <div key={wrapper.name} className={`
              relative p-4 rounded-xl border transition-all duration-300
              ${wrapper.is_active 
                ? 'border-syntx-cyan bg-syntx-cyan/5 shadow-glow-cyan' 
                : 'border-syntx-border/30 bg-syntx-dark/30 hover:border-syntx-border'}
            `}>
              {wrapper.is_active && (
                <div className="absolute top-3 right-3">
                  <StatusBadge status="healthy" label="ACTIVE" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${getFrequency(wrapper.name).color}`}>
                  {getFrequency(wrapper.name).label}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm text-syntx-text mb-1">
                    {wrapper.name.replace('syntex_wrapper_', '').toUpperCase()}
                  </div>
                  <div className="text-xs text-syntx-muted">
                    {wrapper.size_human} • {new Date(wrapper.last_modified).toLocaleDateString()}
                  </div>
                </div>
                {!wrapper.is_active && (
                  <Button variant="secondary" size="sm" onClick={() => handleActivate(wrapper.name)} loading={activating}>
                    ACTIVATE
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
```

### 📄 src/components/wrappers/WrapperPanel.tsx
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📦 WRAPPER CONTROL - SYNTX ULTRA v7.0 MIT FORMAT BINDING 📦            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { Wrapper, WrapperDetail, WrapperStats, COLORS, getWrapperColor, formatDate } from './types';
import { cyberStyles } from './styles';
import { CreateModal, ViewModal, EditModal, StatsModal, DeleteModal } from './modals';

export default function WrapperPanel() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [activeWrapper, setActiveWrapper] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // FORMAT INFO für Cards
  const [wrapperFormats, setWrapperFormats] = useState<Record<string, string>>({});

  // MODAL STATES
  const [createOpen, setCreateOpen] = useState(false);
  const [createSaving, setCreateSaving] = useState(false);

  const [viewWrapper, setViewWrapper] = useState<WrapperDetail | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [editWrapper, setEditWrapper] = useState<WrapperDetail | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [statsWrapper, setStatsWrapper] = useState<Wrapper | null>(null);
  const [statsData, setStatsData] = useState<WrapperStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [deleteWrapper, setDeleteWrapper] = useState<Wrapper | null>(null);
  const [deleting, setDeleting] = useState(false);

  // 🔄 FETCH
  const fetchWrappers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getWrappersFull();
      setWrappers((data.wrappers || []).map((w: any) => ({ name: w.name, size_bytes: w.size_bytes, size_human: w.size_human, last_modified: w.last_modified, is_active: w.is_active })));
      setActiveWrapper((data as any).active_wrapper || "");
      
      // ECHTE Format-Bindings aus Backend Meta
      const formatBindings: Record<string, string> = {};
      (data.wrappers || []).forEach((w: any) => {
        formatBindings[w.name] = w.meta?.format?.toUpperCase() || "KEIN FORMAT";
      });
      setWrapperFormats(formatBindings);
    } catch (err: any) {
      setError(err.message || 'DRIFT beim Laden');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWrappers(); }, [fetchWrappers]);

  // 👁️ VIEW
  const openView = async (wrapper: Wrapper) => {
    setViewLoading(true);
    try {
      const detail = await api.getWrapper(wrapper.name);
      setViewWrapper(detail);
    } catch (err) {
      console.error('Failed to load:', err);
    } finally {
      setViewLoading(false);
    }
  };


  const openEdit = async (wrapper: Wrapper) => {
    try {
      const detail = await api.getWrapper(wrapper.name);
      // Load meta separately
      const metaResponse = await api.getWrapperMeta(wrapper.name);
      setEditWrapper({
        ...detail,
        meta: metaResponse.meta
      });
    } catch (err) {
      console.error('Failed to load:', err);
    }
  };









  // 📊 STATS
  const openStats = async (wrapper: Wrapper) => {
    setStatsWrapper(wrapper);
    setStatsLoading(true);
    setStatsError(null);
    setStatsData(null);
    try {
      const data = await api.getWrapperStats(wrapper.name);
      setStatsData(data);
    } catch (err: any) {
      setStatsError(err.message || 'Keine Stats');
    } finally {
      setStatsLoading(false);
    }
  };

  // ⚡ CREATE
  const handleCreate = async (data: { name: string; content: string; description?: string; author?: string }) => {
    setCreateSaving(true);
    try {
      await api.createWrapper(data);
      setCreateOpen(false);
      fetchWrappers();
    } catch (err: any) {
      alert('Create failed: ' + err.message);
    } finally {
      setCreateSaving(false);
    }
  };

  // 🔄 SAVE EDIT
  const handleSaveEdit = async (content: string, formatData?: { format: string; fields: { name: string; weight: number; enabled: boolean }[] }) => {
    if (!editWrapper) return;
    setEditSaving(true);
    try {
      await api.updateWrapper(editWrapper.name, { content });
      if (formatData?.format) {
        await api.bindFormat(editWrapper.name, formatData.format);
      }
      setSuccessMessage(formatData?.format ? "⚡ " + editWrapper.name + " → " + formatData.format : "⚡ " + editWrapper.name + " gespeichert");
      setShowSuccess(true);
      setTimeout(() => { setShowSuccess(false); }, 2000);
      // Formats neu laden ohne Modal zu schließen
      const freshData = await api.getWrappersFull();
      const newFormats: Record<string, string> = {};
      (freshData.wrappers || []).forEach((w: any) => { newFormats[w.name] = w.meta?.format?.toUpperCase() || "KEIN FORMAT"; });
      setWrapperFormats(newFormats);
      setWrappers((freshData.wrappers || []).map((w: any) => ({ name: w.name, size_bytes: w.size_bytes, size_human: w.size_human, last_modified: w.last_modified, is_active: w.is_active })));
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    } finally {
      setEditSaving(false);
    }
  };

  // 🎯 ACTIVATE
  const handleActivate = async (name: string) => {
    try {
      await api.setRuntimeWrapper(name);
      setViewWrapper(null);
      fetchWrappers();
    } catch (err: any) {
      alert('Activate failed: ' + err.message);
    }
  };

  // 💀 DELETE
  const handleDelete = async () => {
    if (!deleteWrapper) return;
    setDeleting(true);
    try {
      await api.deleteWrapper(deleteWrapper.name);
      setDeleteWrapper(null);
      fetchWrappers();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredWrappers = wrappers.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = wrappers.filter(w => w.is_active).length;
  const totalSize = wrappers.reduce((a, b) => a + b.size_bytes, 0);

  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <style>{cyberStyles}</style>

      {/* 🔥 HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <div className="pulse" style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(245,158,11,0.1))', border: '2px solid rgba(245,158,11,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}>📦</div>
          <h2 className="glow-text" style={{ margin: 0, fontFamily: 'monospace', fontSize: 32, fontWeight: 900, letterSpacing: 8, background: 'linear-gradient(135deg, #f59e0b, #00d4ff, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WRAPPER CONTROL
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 15px ${COLORS.green}`, animation: 'blink 1.5s infinite' }} />
          <span style={{ fontSize: 14, fontFamily: 'monospace', color: COLORS.orange }}>{wrappers.length} Wrapper</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 13, fontFamily: 'monospace', color: COLORS.green }}>{activeCount} aktiv</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>│</span>
          <span style={{ fontSize: 13, fontFamily: 'monospace', color: COLORS.cyan }}>{(totalSize / 1024).toFixed(1)} KB total</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          <input type="text" placeholder="🔍 Wrapper suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '14px 24px', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(0,0,0,0.4)', color: 'white', fontFamily: 'monospace', fontSize: 14, width: 280, outline: 'none' }} />
          <button onClick={() => setCreateOpen(true)} className="cyber-btn" style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#030b15', fontFamily: 'monospace', fontSize: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 0 30px rgba(245,158,11,0.5)' }}>
            <span style={{ fontSize: 18 }}>🌟</span> GEBÄREN
          </button>
        </div>
      </div>

      {/* STATES */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div className="pulse" style={{ fontSize: 72, marginBottom: 24 }}>📦</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16, color: COLORS.orange }}>LADE WRAPPER...</div>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: 80, background: 'rgba(239,68,68,0.1)', borderRadius: 20, border: '1px solid rgba(239,68,68,0.3)' }}>
          <div style={{ fontSize: 64 }}>💀</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: COLORS.red, margin: '16px 0' }}>DRIFT: {error}</div>
          <button onClick={fetchWrappers} className="cyber-btn" style={{ padding: '12px 24px', borderRadius: 10, border: `1px solid ${COLORS.red}`, background: 'transparent', color: COLORS.red, cursor: 'pointer' }}>↻ RETRY</button>
        </div>
      )}

      {!loading && !error && filteredWrappers.length === 0 && (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div style={{ fontSize: 72, opacity: 0.4 }}>📭</div>
          <div style={{ fontFamily: 'monospace', fontSize: 18, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>KEINE WRAPPER</div>
        </div>
      )}

      {/* 🔥 GRID - GRÖSSERE CARDS */}
      {!loading && !error && filteredWrappers.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
          {filteredWrappers.map((wrapper, index) => {
            const color = getWrapperColor(wrapper.name);
            const boundFormat = wrapperFormats[wrapper.name] || 'NONE';
            return (
              <div key={wrapper.name} className="wrapper-card" style={{ '--card-color': color, animationDelay: `${index * 0.08}s`, background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))', borderRadius: 20, border: `1px solid ${color}40`, overflow: 'hidden' } as React.CSSProperties}>
                
                {/* HEADER - GRÖSSER */}
                <div style={{ padding: '24px 24px 18px', background: `linear-gradient(135deg, ${color}20, transparent)` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div className="pulse" style={{ width: 56, height: 56, borderRadius: 14, background: `${color}25`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: `0 0 25px ${color}30` }}>📦</div>
                      <div>
                        <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 2 }}>{wrapper.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>{wrapper.size_human}</span>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{wrapper.size_bytes.toLocaleString()} bytes</span>
                        </div>
                      </div>
                    </div>
                    {wrapper.is_active && (
                      <div className="float" style={{ padding: '8px 14px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', fontSize: 11, fontFamily: 'monospace', color: COLORS.green, fontWeight: 700 }}>● AKTIV</div>
                    )}
                  </div>

                  {/* FORMAT BINDING - NEU! */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: 'rgba(217,70,239,0.1)', border: '1px solid rgba(217,70,239,0.3)' }}>
                    <span style={{ fontSize: 16 }}>📋</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 2 }}>GEBUNDENES FORMAT</div>
                      <div style={{ fontSize: 13, color: COLORS.magenta, fontFamily: 'monospace', fontWeight: 700 }}>{boundFormat}</div>
                    </div>
                    <div style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(217,70,239,0.2)', fontSize: 10, color: COLORS.magenta }}>LINKED</div>
                  </div>
                </div>

                {/* META BAR */}
                <div style={{ padding: '14px 24px', background: 'rgba(0,0,0,0.4)', borderTop: `1px solid ${color}20`, borderBottom: `1px solid ${color}20` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>📅</span>
                      <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>Modulation: {formatDate(wrapper.last_modified)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>⚡</span>
                      <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.cyan }}>~{Math.round(wrapper.size_bytes / 4)} tokens</span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS - GRÖSSER */}
                <div style={{ padding: '18px 24px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={() => openView(wrapper)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: `1px solid ${color}50`, background: `${color}15`, color, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>👁️ VIEW</button>
                  <button onClick={() => openStats(wrapper)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: '1px solid rgba(139,92,246,0.5)', background: 'rgba(139,92,246,0.15)', color: COLORS.purple, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>📊 STATS</button>
                  <button onClick={() => openEdit(wrapper)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.15)', color: COLORS.cyan, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>✏️ EDIT</button>
                  {!wrapper.is_active && (
                    <button onClick={() => handleActivate(wrapper.name)} className="cyber-btn" style={{ flex: 1, minWidth: 70, padding: '12px', borderRadius: 10, border: '1px solid rgba(16,185,129,0.5)', background: 'rgba(16,185,129,0.15)', color: COLORS.green, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>🎯 AKTIV</button>
                  )}
                  <button onClick={() => setDeleteWrapper(wrapper)} className="cyber-btn" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.15)', color: COLORS.red, fontSize: 12, cursor: 'pointer' }}>💀</button>
                </div>

                {/* QUICK STATS BAR - NEU! */}
                <div style={{ padding: '12px 24px', background: `linear-gradient(135deg, ${color}10, transparent)`, borderTop: `1px solid ${color}15`, display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.cyan }}>{wrapper.size_bytes > 1500 ? '🔥' : wrapper.size_bytes > 800 ? '✅' : '💡'}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>SIZE</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: wrapper.is_active ? COLORS.green : 'rgba(255,255,255,0.3)' }}>{wrapper.is_active ? '🎯' : '💤'}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>STATUS</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.magenta }}>📋</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>FORMAT</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.orange }}>⚡</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>READY</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODALS */}
      <CreateModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreate} saving={createSaving} />
      <ViewModal wrapper={viewWrapper} loading={viewLoading} onClose={() => setViewWrapper(null)} onEdit={() => { if (viewWrapper) { setViewWrapper(null); openEdit({ name: viewWrapper.name, size_bytes: viewWrapper.size_bytes, size_human: viewWrapper.size_human, last_modified: viewWrapper.last_modified, is_active: viewWrapper.is_active }); }}} onActivate={() => { if (viewWrapper) handleActivate(viewWrapper.name); }} />
      <EditModal wrapper={editWrapper} onClose={() => setEditWrapper(null)} onSave={handleSaveEdit} saving={editSaving} />
      <StatsModal wrapper={statsWrapper} stats={statsData} loading={statsLoading} error={statsError} onClose={() => { setStatsWrapper(null); setStatsData(null); }} />
      <DeleteModal wrapper={deleteWrapper} onClose={() => setDeleteWrapper(null)} onDelete={handleDelete} deleting={deleting} />
      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "linear-gradient(135deg, rgba(16,185,129,0.98), rgba(6,78,59,0.98))", border: "2px solid #10b981", borderRadius: 20, padding: "40px 60px", zIndex: 2000, boxShadow: "0 0 80px rgba(16,185,129,0.6), 0 0 160px rgba(16,185,129,0.3)", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>⚡</div>
          <div style={{ fontFamily: "monospace", fontSize: 24, color: "#fff", fontWeight: 900, letterSpacing: 4, textTransform: "uppercase" }}>MODULIERT</div>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 12 }}>{successMessage}</div>
        </div>
      )}
    </div>
  );
}
```

### 📄 src/hooks/useApi.ts
```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): UseApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetcher();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const [state, setState] = useState<{
    data: TData | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await mutationFn(variables);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
        throw error;
      }
    },
    [mutationFn]
  );

  return { ...state, mutate };
}
```

### 📄 src/hooks/useExport.ts
```typescript
"use client";

import { useCallback } from 'react';

export function useExport() {
  
  const exportJSON = useCallback((data: any[], filename: string) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const exportCSV = useCallback((data: any[], filename: string, columns?: { key: string; label: string }[]) => {
    if (!data.length) return;

    // Auto-detect columns if not provided
    const cols = columns || Object.keys(data[0]).map(key => ({ key, label: key }));
    
    // Header row
    const header = cols.map(c => `"${c.label}"`).join(',');
    
    // Data rows
    const rows = data.map(item => 
      cols.map(c => {
        let val = item[c.key];
        if (val === null || val === undefined) val = '';
        if (typeof val === 'object') val = JSON.stringify(val);
        if (typeof val === 'string') val = val.replace(/"/g, '""');
        return `"${val}"`;
      }).join(',')
    );

    const csv = [header, ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return { exportJSON, exportCSV };
}
```

### 📄 src/hooks/useFilter.ts
```typescript
"use client";

import { useState, useMemo } from 'react';

export interface FilterConfig<T> {
  searchFields: (keyof T)[];
  filterFields?: {
    key: keyof T;
    label: string;
    options?: string[];
  }[];
}

export function useFilter<T>(items: T[], config: FilterConfig<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filteredItems = useMemo(() => {
    let result = items;

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        config.searchFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          if (Array.isArray(value)) {
            return value.some(v => String(v).toLowerCase().includes(query));
          }
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter(item => {
          const itemValue = item[key as keyof T];
          if (Array.isArray(itemValue)) {
            return itemValue.some(v => String(v).toLowerCase().includes(value.toLowerCase()));
          }
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    return result;
  }, [items, searchQuery, filters, config.searchFields]);

  const setFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== 'all').length + (searchQuery ? 1 : 0);

  return {
    filteredItems,
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    clearFilters,
    activeFilterCount,
  };
}
```

### 📄 src/hooks/usePagination.ts
```typescript
"use client";

import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function usePagination<T>(
  items: T[],
  defaultPageSize = 10,
  defaultSort?: SortConfig<T>
) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(defaultSort || null);

  const sortedItems = useMemo(() => {
    if (!sortConfig) return items;

    return [...items].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [items, sortConfig]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, page, pageSize]);

  const totalPages = Math.ceil(items.length / pageSize);

  const goToPage = (p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  const toggleSort = (key: keyof T) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' };
    });
    setPage(1);
  };

  return {
    items: paginatedItems,
    allItems: sortedItems,
    pagination: {
      page,
      pageSize,
      totalItems: items.length,
      totalPages,
    },
    sorting: sortConfig,
    setPage: goToPage,
    setPageSize: (size: number) => { setPageSize(size); setPage(1); },
    nextPage,
    prevPage,
    toggleSort,
  };
}
```

### 📄 src/hooks/useRealtime.ts
```typescript
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { api, StreamEvent, StatsResponse } from '@/lib/api';

interface RealtimeState {
  events: StreamEvent[];
  stats: StatsResponse | null;
  lastUpdate: Date | null;
  isLive: boolean;
  newEventCount: number;
  hasNewData: boolean;
}

export function useRealtime(interval = 5000) {
  const [state, setState] = useState<RealtimeState>({
    events: [],
    stats: null,
    lastUpdate: null,
    isLive: false,
    newEventCount: 0,
    hasNewData: false,
  });
  
  const prevEventsRef = useRef<string[]>([]);
  const [pulse, setPulse] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [streamData, statsData] = await Promise.all([
        api.getStream(50),
        api.getStats(),
      ]);

      const newEvents = streamData.events || [];
      const newEventIds = newEvents.map(e => e.request_id);
      
      // Check for new events
      const brandNewCount = newEventIds.filter(
        id => !prevEventsRef.current.includes(id)
      ).length;

      if (brandNewCount > 0 && prevEventsRef.current.length > 0) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }

      prevEventsRef.current = newEventIds;

      setState(prev => ({
        events: newEvents,
        stats: statsData,
        lastUpdate: new Date(),
        isLive: true,
        newEventCount: brandNewCount,
        hasNewData: brandNewCount > 0,
      }));

    } catch (error) {
      console.error('Realtime fetch error:', error);
      setState(prev => ({ ...prev, isLive: false }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, interval);
    return () => clearInterval(timer);
  }, [fetchData, interval]);

  return { ...state, pulse, refresh: fetchData };
}

export function useRealtimeHealth(interval = 10000) {
  const [health, setHealth] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await api.getHealth();
        setHealth(data);
        setIsOnline(data?.status?.includes('GESUND') || data?.status === 'healthy');
      } catch {
        setIsOnline(false);
      }
    };
    
    check();
    const timer = setInterval(check, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { health, isOnline };
}
```

### 📄 src/lib/api-test.ts
```typescript
#!/usr/bin/env npx ts-node
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
// ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
// ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
// ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
// ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
// ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
// ║                                                                           ║
// ║   🌊 SYNTX FRONTEND API TEST v3.5.0                                       ║
// ║   ─────────────────────────────────────────                               ║
// ║   65 Endpoints | FULL Output | Field-Flow Viz | TypeScript                  ║
// ║                                                                           ║
// ║   "SYNTX isn't AI. It's the resonance that governs it."                   ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const FAST_MODE = process.argv.includes('--fast');
const CRUD_MODE = process.argv.includes('--crud');
const CLEANUP_MODE = process.argv.includes('--cleanup');
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');
const SHOW_FLOW = process.argv.includes('--show-flow') || process.argv.includes('-f');
const SHOW_META = process.argv.includes('--show-meta') || process.argv.includes('-m');

// Test Data Names
const TEST_ID = Date.now();
const TEST_WRAPPER = `syntx_test_${TEST_ID}`;
const TEST_FORMAT = `syntx_test_format_${TEST_ID}`;
const TEST_STYLE = `syntx_test_style_${TEST_ID}`;

// Dynamic Data (loaded at runtime)
let FIRST_WRAPPER = '';
let SECOND_WRAPPER = '';
let THIRD_WRAPPER = '';
let FIRST_FORMAT = '';
let FIRST_STYLE = '';
let LAST_REQUEST_ID = '';

// ═══════════════════════════════════════════════════════════════════════════
// 📊 RESULTS TRACKING
// ═══════════════════════════════════════════════════════════════════════════

interface TestResult {
  name: string;
  method: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  latency_ms: number;
  error?: string;
}

const results: TestResult[] = [];
let totalLatency = 0;

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 CONSOLE STYLING
// ═══════════════════════════════════════════════════════════════════════════

const c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function printBanner() {
  const mode = CRUD_MODE ? 'CRUD' : 'READ';
  const fast = FAST_MODE ? '+FAST' : '';
  const verbose = VERBOSE ? '+VERBOSE' : '';
  const flow = SHOW_FLOW ? '+FLOW' : '';
  const meta = SHOW_META ? '+META' : '';
  const flags = [fast, verbose, flow, meta].filter(Boolean).join('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████╗${c.blue}██╗   ██╗${c.green}███╗   ██╗${c.yellow}████████╗${c.red}██╗  ██╗${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}██╔════╝${c.blue}╚██╗ ██╔╝${c.green}████╗  ██║${c.yellow}╚══██╔══╝${c.red}╚██╗██╔╝${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████╗${c.blue} ╚████╔╝ ${c.green}██╔██╗ ██║${c.yellow}   ██║   ${c.red} ╚███╔╝ ${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}╚════██║${c.blue}  ╚██╔╝  ${c.green}██║╚██╗██║${c.yellow}   ██║   ${c.red} ██╔██╗ ${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████║${c.blue}   ██║   ${c.green}██║ ╚████║${c.yellow}   ██║   ${c.red}██╔╝ ██╗${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}╚══════╝${c.blue}   ╚═╝   ${c.green}╚═╝  ╚═══╝${c.yellow}   ╚═╝   ${c.red}╚═╝  ╚═╝${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.white}🌊 FRONTEND API TEST v3.5.0${c.reset}                                          ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}   ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}Target:${c.reset} ${c.yellow}${BASE_URL}${c.reset}${' '.repeat(Math.max(0, 42 - BASE_URL.length))}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}Mode:${c.reset}   ${c.cyan}${mode}${flags}${c.reset}${' '.repeat(Math.max(0, 44 - mode.length - fast.length))}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');
}

function printSection(icon: string, title: string, count: string) {
  console.log('');
  console.log(`${c.blue}━━━ ${icon} ${c.white}${title}${c.reset} ${c.gray}(${count})${c.reset} ${c.blue}━━━${c.reset}`);
}

function printSummary() {
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;
  const total = passed + failed;
  const avg = total > 0 ? Math.round(totalLatency / total) : 0;
  const pct = total > 0 ? Math.round((passed / total) * 100) : 0;

  console.log('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.white}📊 RESONANZ-ANALYSE${c.reset}                                                     ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}   ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.green}✅ PASS:${c.reset} ${c.white}${passed}${c.reset}    ${c.red}❌ FAIL:${c.reset} ${c.white}${failed}${c.reset}    ${c.yellow}⏭️  SKIP:${c.reset} ${c.white}${skipped}${c.reset}                          ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}⚡ Avg Latency:${c.reset} ${c.white}${avg}ms${c.reset}                                                  ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}📈 Success Rate:${c.reset} ${c.white}${pct}%${c.reset}                                                   ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  
  if (failed === 0) {
    console.log(`${c.purple}║${c.reset}   ${c.green}🌊 KOHÄRENZ: VOLLSTÄNDIG${c.reset}                                               ${c.purple}║${c.reset}`);
  } else {
    console.log(`${c.purple}║${c.reset}   ${c.red}⚠️  DRIFT DETECTED: ${failed} endpoints mit Feld-Verlust${c.reset}                    ${c.purple}║${c.reset}`);
  }
  
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔥 CORE TEST FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// 🔥 CORE TEST FUNCTION - TRUE RAW MODE
// ═══════════════════════════════════════════════════════════════════════════

function colorizeJSON(obj: any, indent = 2): string {
  const json = JSON.stringify(obj, null, indent);
  return json
    .replace(/"([^"]+)":/g, `${c.cyan}"$1"${c.reset}:`)
    .replace(/: "([^"]*)"/g, `: ${c.yellow}"$1"${c.reset}`)
    .replace(/: (\d+\.?\d*)/g, `: ${c.green}$1${c.reset}`)
    .replace(/: (true|false)/g, `: ${c.blue}$1${c.reset}`)
    .replace(/: null/g, `: ${c.gray}null${c.reset}`);
}

async function test(
  name: string,
  method: string,
  endpoint: string,
  body?: object
): Promise<boolean> {
  const start = Date.now();
  
  // Verbose: Show request
  if (VERBOSE) {
    console.log('');
    console.log(`    ${c.blue}▶${c.reset} ${c.white}${name}${c.reset}`);
    console.log(`      ${c.dim}${method} ${endpoint}${c.reset}`);
    if (body) {
      console.log(`      ${c.yellow}📤 REQUEST:${c.reset}`);
      console.log(colorizeJSON(body, 4).split('\n').map(l => '      ' + l).join('\n'));
    }
  }
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    const latency = Date.now() - start;
    totalLatency += latency;
    const data = await response.json();
    
    // Extract request_id if present
    if (data.metadata?.request_id) {
      LAST_REQUEST_ID = data.metadata.request_id;
    } else if (data.request_id) {
      LAST_REQUEST_ID = data.request_id;
    }
    
    // Verbose: Show FULL response (no truncation!)
    if (VERBOSE) {
      const latencyColor = latency > 5000 ? c.red : latency > 1000 ? c.yellow : c.green;
      console.log(`      ${c.cyan}📥 RESPONSE:${c.reset} ${latencyColor}${latency}ms${c.reset}`);
      console.log(colorizeJSON(data, 4).split('\n').map(l => '      ' + l).join('\n'));
      
      // Show metadata if available
      if (SHOW_META && data.metadata) {
        console.log(`      ${c.purple}📊 METADATA:${c.reset}`);
        console.log(colorizeJSON(data.metadata, 4).split('\n').map(l => '      ' + l).join('\n'));
      }
      
      // Show field flow if available
      if (SHOW_FLOW && data.field_flow && data.field_flow.length > 0) {
        console.log(`      ${c.cyan}🌊 FIELD FLOW:${c.reset}`);
        const stages = data.field_flow.map((f: any) => f.stage).join(' → ');
        console.log(`      ${c.dim}${stages}${c.reset}`);
      }
    }
    
    const padName = name.padEnd(32);
    const padMethod = method.padEnd(6);
    const latencyColor = latency > 5000 ? c.red : latency > 1000 ? c.yellow : c.white;
    
    if (response.ok) {
      if (!VERBOSE) {
        console.log(`    ${c.green}✅${c.reset} ${padName} ${c.cyan}${padMethod}${c.reset} ${latencyColor}${latency}ms${c.reset}`);
      } else {
        console.log(`      ${c.green}✅ PASS${c.reset}`);
      }
      results.push({ name, method, status: 'PASS', latency_ms: latency });
      return true;
    } else {
      const detail = data.detail || 'Unknown error';
      if (!VERBOSE) {
        console.log(`    ${c.red}❌${c.reset} ${padName} ${c.cyan}${padMethod}${c.reset} ${c.red}${response.status}${c.reset} ${c.gray}- ${detail}${c.reset}`);
      } else {
        console.log(`      ${c.red}❌ FAIL: ${response.status} - ${detail}${c.reset}`);
      }
      results.push({ name, method, status: 'FAIL', latency_ms: latency, error: detail });
      return false;
    }
  } catch (err: any) {
    const latency = Date.now() - start;
    if (!VERBOSE) {
      console.log(`    ${c.red}💥${c.reset} ${name.padEnd(32)} ${c.cyan}${method.padEnd(6)}${c.reset} ${c.red}NETWORK ERROR${c.reset}`);
    } else {
      console.log(`      ${c.red}💥 NETWORK ERROR: ${err.message}${c.reset}`);
    }
    results.push({ name, method, status: 'FAIL', latency_ms: latency, error: err.message });
    return false;
  }
}

function skip(name: string, reason: string) {
  console.log(`    ${c.yellow}⏭️${c.reset}  ${name.padEnd(32)} ${c.gray}${reason}${c.reset}`);
  results.push({ name, method: '-', status: 'SKIP', latency_ms: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 DATA LOADER
// ═══════════════════════════════════════════════════════════════════════════

async function loadDynamicData() {
  console.log(`${c.cyan}🔄 Scanning field resonance...${c.reset}`);
  console.log('');
  
  try {
    // Load wrappers
    const wrappersRes = await fetch(`${BASE_URL}/resonanz/wrappers`);
    const wrappersData = await wrappersRes.json();
    const wrappers = wrappersData.wrappers || [];
    FIRST_WRAPPER = wrappers[0]?.name || '';
    SECOND_WRAPPER = wrappers[1]?.name || '';
    THIRD_WRAPPER = wrappers[2]?.name || '';
    
    // Load formats
    const formatsRes = await fetch(`${BASE_URL}/resonanz/formats`);
    const formatsData = await formatsRes.json();
    const formats = formatsData.formats || [];
    FIRST_FORMAT = formats[0]?.name || '';
    
    // Load styles
    const stylesRes = await fetch(`${BASE_URL}/resonanz/styles`);
    const stylesData = await stylesRes.json();
    const styles = stylesData.styles || [];
    FIRST_STYLE = styles[0]?.name || '';
    
    console.log(`   ${c.purple}📦${c.reset} ${c.white}Wrappers:${c.reset} ${c.green}${wrappers.length}${c.reset} ${c.gray}(using: ${FIRST_WRAPPER}, ${SECOND_WRAPPER})${c.reset}`);
    console.log(`   ${c.purple}📄${c.reset} ${c.white}Formats:${c.reset}  ${c.green}${formats.length}${c.reset} ${c.gray}(using: ${FIRST_FORMAT})${c.reset}`);
    console.log(`   ${c.purple}🎨${c.reset} ${c.white}Styles:${c.reset}   ${c.green}${styles.length}${c.reset} ${c.gray}(using: ${FIRST_STYLE})${c.reset}`);
  } catch (err) {
    console.log(`   ${c.red}❌ Failed to load dynamic data${c.reset}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TEST SUITES - Synchronized with Backend (63 Tests)
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// 🏥 HEALTH & CONFIG (3 + 2 = 5 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testHealth() {
  printSection('🏥', 'HEALTH', '3 endpoints');
  await test('getHealth', 'GET', '/health');
  await test('getResonanzHealth', 'GET', '/resonanz/health');
  await test('getWrapperHealth', 'GET', '/resonanz/health/wrappers');
}

async function testConfig() {
  printSection('⚙️', 'CONFIG', '3 endpoints');
  await test('getConfig', 'GET', '/resonanz/config/default-wrapper');
  
  if (CRUD_MODE && FIRST_WRAPPER) {
    await test('setConfig', 'PUT', `/resonanz/config/default-wrapper?wrapper_name=${FIRST_WRAPPER}`);
  } else {
    skip('setConfig', '(--crud mode only)');
  }

  // Runtime Wrapper (v3.3)
  if (CRUD_MODE && FIRST_WRAPPER) {
    await test('setRuntimeWrapper', 'PUT', `/resonanz/config/runtime-wrapper?wrapper_name=${FIRST_WRAPPER}`);
  } else {
    skip('setRuntimeWrapper', '(--crud mode only)');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 📄 FORMATS (7 read + 6 write = 13 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testFormatsRead() {
  printSection('📄', 'FORMATS', '7 read endpoints');
  await test('getFormats', 'GET', '/resonanz/formats');
  await test('getFormats (domain)', 'GET', '/resonanz/formats?domain=technical');
  await test('getFormats (psychology)', 'GET', '/resonanz/formats?domain=psychology');
  
  if (FIRST_FORMAT) {
    await test('getFormat', 'GET', `/resonanz/formats/${FIRST_FORMAT}`);
    await test('getFormat (en)', 'GET', `/resonanz/formats/${FIRST_FORMAT}?language=en`);
  }
  
  // Test specific formats
  await test('getFormat (sigma)', 'GET', '/resonanz/formats/sigma');
  await test('getFormat (human_deep)', 'GET', '/resonanz/formats/human_deep');
}

async function testFormatsCrud() {
  printSection('📄', 'FORMATS CRUD', '6 write endpoints');
  
  // CREATE
  await test('createFormat (quick)', 'POST', '/resonanz/formats/quick', {
    name: TEST_FORMAT,
    description_de: 'API Test Format',
    field_names: ['alpha', 'beta', 'gamma']
  });
  
  // ADD FIELD
  await test('addField', 'POST', `/resonanz/formats/${TEST_FORMAT}/fields`, {
    name: 'neues_feld',
    type: 'rating',
    weight: 20
  });
  
  // UPDATE FIELD
  await test('updateField', 'PUT', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`, {
    weight: 50,
    description: { de: 'Aktualisierte Beschreibung' }
  });
  
  // DELETE FIELD
  await test('deleteField', 'DELETE', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`);
  
  // UPDATE FORMAT
  await test('updateFormat', 'PUT', `/resonanz/formats/${TEST_FORMAT}`, {
    domain: 'analysis',
    description: { de: 'Aktualisiertes Format' }
  });
}

async function testFormatsCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Format${c.reset}`);
  await test('deleteFormat', 'DELETE', `/resonanz/formats/${TEST_FORMAT}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 🎨 STYLES (5 read + 5 write = 10 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testStylesRead() {
  printSection('🎨', 'STYLES', '5 read endpoints');
  await test('getStyles', 'GET', '/resonanz/styles');
  await test('getStyle (wissenschaftlich)', 'GET', '/resonanz/styles/wissenschaftlich');
  await test('getStyle (zynisch)', 'GET', '/resonanz/styles/zynisch');
  await test('getStyle (poetisch)', 'GET', '/resonanz/styles/poetisch');
  await test('getStyle (berlin_slang)', 'GET', '/resonanz/styles/berlin_slang');
}

async function testStylesCrud() {
  printSection('🎨', 'STYLES CRUD', '5 write endpoints');
  
  // CREATE
  await test('createStyle', 'POST', '/resonanz/styles', {
    name: TEST_STYLE,
    vibe: 'Test Vibe',
    word_alchemy: { test: 'prüfung' },
    forbidden_words: ['verboten']
  });
  
  // ADD ALCHEMY
  await test('addAlchemy', 'POST', `/resonanz/styles/${TEST_STYLE}/alchemy`, {
    original: 'neu',
    replacement: 'brandneu'
  });
  
  // DELETE ALCHEMY
  await test('deleteAlchemy', 'DELETE', `/resonanz/styles/${TEST_STYLE}/alchemy/neu`);
  
  // ADD FORBIDDEN
  await test('addForbiddenWord', 'POST', `/resonanz/styles/${TEST_STYLE}/forbidden/schlecht`);
  
  // DELETE FORBIDDEN (v3.4)
  await test('deleteForbiddenWord', 'DELETE', `/resonanz/styles/${TEST_STYLE}/forbidden/schlecht`);
  
  // UPDATE STYLE (v3.4 - ohne name im body)
  await test('updateStyle', 'PUT', `/resonanz/styles/${TEST_STYLE}`, {
    vibe: 'Updated Test Vibe',
    description: 'Updated Test Description'
  });
}

async function testStylesCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Style${c.reset}`);
  await test('deleteStyle', 'DELETE', `/resonanz/styles/${TEST_STYLE}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 📦 WRAPPERS (8 read + 3 write = 11 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testWrappersRead() {
  printSection('📦', 'WRAPPERS', '5 read endpoints');
  await test('getWrappers', 'GET', '/resonanz/wrappers');
  await test('getActiveWrapper', 'GET', '/resonanz/wrappers?active=true');
  await test('getWrappersFull', 'GET', '/resonanz/wrappers/full');
  
  if (FIRST_WRAPPER) {
    await test('getWrapper', 'GET', `/resonanz/wrapper/${FIRST_WRAPPER}`);
    await test('getWrapperMeta', 'GET', `/resonanz/wrapper/${FIRST_WRAPPER}/meta`);
  }
}

async function testWrappersCrud() {
  printSection('📦', 'WRAPPERS CRUD', '4 write endpoints');
  
  // CREATE
  await test('createWrapper', 'POST', '/resonanz/wrapper', {
    name: TEST_WRAPPER,
    content: 'SYNTX FIELD TEST WRAPPER\n\nDu bist ein Test-System.'
  });
  
  // UPDATE
  await test('updateWrapper', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}`, {
    content: 'SYNTX FIELD TEST WRAPPER v2.0\n\nDu bist ein verbessertes Test-System.'
  });
  
  // UPDATE META
  await test('updateWrapperMeta', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}/meta`, {
    description: 'Test Wrapper Meta',
    tags: ['test', 'syntx']
  });
  
  // BIND FORMAT
  if (FIRST_FORMAT) {
    await test('bindFormat', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}/format?format_name=${FIRST_FORMAT}`);
  }
}

async function testWrappersCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Wrapper${c.reset}`);
  await test('deleteWrapper', 'DELETE', `/resonanz/wrapper/${TEST_WRAPPER}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 📊 STATS & STREAMS (5 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testStats() {
  printSection('📊', 'STATS & STREAMS', '5 endpoints');
  await test('getStats', 'GET', '/resonanz/stats');
  
  if (FIRST_WRAPPER) {
    await test('getWrapperStats', 'GET', `/resonanz/stats/wrapper/${FIRST_WRAPPER}`);
  }
  
  await test('getStream', 'GET', '/resonanz/strom?limit=5');
  await test('getStream (filtered)', 'GET', '/resonanz/strom?limit=3&stage=5_RESPONSE');
  await test('getTraining', 'GET', '/resonanz/training?limit=5');
}

// ─────────────────────────────────────────────────────────────────────────────
// 💬 CHAT (7 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testChat() {
  printSection('💬', 'CHAT', '7 endpoints');
  
  if (FAST_MODE) {
    skip('chat (simple)', '(--fast mode)');
    skip('chat (+ wrapper)', '(--fast mode)');
    skip('chat (+ format)', '(--fast mode)');
    skip('chat (+ style)', '(--fast mode)');
    skip('chat (+ debug)', '(--fast mode)');
    skip('chat (typed format)', '(--fast mode)');
    skip('chat (full combo)', '(--fast mode)');
    return;
  }
  
  // Simple chat
  await test('chat (simple)', 'POST', '/resonanz/chat', {
    prompt: 'Hallo',
    max_new_tokens: 30
  });
  
  // Chat + Wrapper
  if (FIRST_WRAPPER) {
    await test('chat (+ wrapper)', 'POST', '/resonanz/chat', {
      prompt: 'Was ist ein System?',
      mode: FIRST_WRAPPER,
      max_new_tokens: 100
    });
  }
  
  // Chat + Wrapper + Format
  await test('chat (+ format)', 'POST', '/resonanz/chat', {
    prompt: 'Analysiere das Konzept Zeit',
    mode: FIRST_WRAPPER,
    format: 'sigma',
    max_new_tokens: 150
  });
  
  // Chat + Style
  await test('chat (+ style)', 'POST', '/resonanz/chat', {
    prompt: 'Erkläre Nachhaltigkeit',
    style: 'zynisch',
    max_new_tokens: 80
  });
  
  // Chat + Debug
  await test('chat (+ debug)', 'POST', '/resonanz/chat', {
    prompt: 'Test',
    style: 'wissenschaftlich',
    debug: true,
    max_new_tokens: 50
  });
  
  // Typed Format
  await test('chat (typed format)', 'POST', '/resonanz/chat', {
    prompt: 'Analysiere KI-Trends',
    format: 'review',
    max_new_tokens: 150
  });
  
  // Full Combo
  await test('chat (full combo)', 'POST', '/resonanz/chat', {
    prompt: 'Deep Dive: Menschliches Verhalten',
    format: 'human_deep',
    style: 'poetisch',
    debug: true,
    max_new_tokens: 200
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔀 DIFF (2 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testDiff() {
  printSection('🔀', 'DIFF (v3.3)', '2 endpoints');
  
  if (FAST_MODE) {
    skip('diff (2 wrappers)', '(--fast mode)');
    skip('diff (3 wrappers)', '(--fast mode)');
    return;
  }
  
  if (FIRST_WRAPPER && SECOND_WRAPPER) {
    await test('diff (2 wrappers)', 'POST', '/resonanz/chat/diff', {
      prompt: 'Was ist System?',
      wrappers: [FIRST_WRAPPER, SECOND_WRAPPER],
      max_new_tokens: 100
    });
  }
  
  if (FIRST_WRAPPER && SECOND_WRAPPER && THIRD_WRAPPER) {
    await test('diff (3 wrappers)', 'POST', '/resonanz/chat/diff', {
      prompt: 'Erkläre Liebe',
      wrappers: [FIRST_WRAPPER, SECOND_WRAPPER, THIRD_WRAPPER],
      format: 'sigma',
      max_new_tokens: 100
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 📼 SESSIONS (4 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testSessions() {
  printSection('📼', 'SESSIONS (v3.3)', '4 endpoints');
  await test('getSessions', 'GET', '/resonanz/sessions?limit=5');
  await test('getSessions (paginated)', 'GET', '/resonanz/sessions?limit=10&offset=0');
  
  // Get a session ID from the list
  try {
    const res = await fetch(`${BASE_URL}/resonanz/sessions?limit=1`);
    const data = await res.json();
    const sessionId = data.sessions?.[0]?.request_id;
    
    if (sessionId) {
      await test('getSession', 'GET', `/resonanz/session/${sessionId}`);
      await test('getSessionReplay', 'GET', `/resonanz/session/${sessionId}/replay`);
    } else {
      skip('getSession', '(no sessions)');
      skip('getSessionReplay', '(no sessions)');
    }
  } catch {
    skip('getSession', '(error)');
    skip('getSessionReplay', '(error)');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ⚗️ ALCHEMY PREVIEW (4 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testAlchemy() {
  printSection('⚗️', 'ALCHEMY (v3.3)', '4 endpoints');
  
  await test('getAlchemyStyles', 'GET', '/resonanz/alchemy/styles');
  
  await test('alchemyPreview (wissenschaftlich)', 'POST', '/resonanz/alchemy/preview', {
    text: 'Das ist wirklich sehr wichtig und nachhaltig',
    style: 'wissenschaftlich'
  });
  
  await test('alchemyPreview (zynisch)', 'POST', '/resonanz/alchemy/preview', {
    text: 'Dieses innovative Projekt ist nachhaltig und wichtig für die Experten',
    style: 'zynisch'
  });
  
  await test('alchemyPreview (poetisch)', 'POST', '/resonanz/alchemy/preview', {
    text: 'Der Prozess im System zeigt die Daten',
    style: 'poetisch'
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 ADMIN (1 endpoint)
// ─────────────────────────────────────────────────────────────────────────────
async function testAdmin() {
  printSection('🔧', 'ADMIN', '1 endpoint');
  
  if (CRUD_MODE) {
    await test('fixOrphans', 'POST', '/resonanz/health/fix');
  } else {
    skip('fixOrphans', '(--crud mode only)');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  printBanner();
  await loadDynamicData();
  
  // READ Tests (always)
  await testHealth();
  await testConfig();
  await testFormatsRead();
  await testStylesRead();
  await testWrappersRead();
  await testStats();
  await testSessions();
  await testAlchemy();
  await testChat();
  await testDiff();
  
  // CRUD Tests (if --crud)
  if (CRUD_MODE) {
    console.log('');
    console.log(`${c.purple}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    console.log(`${c.white}🔥 CRUD MODE - Creating/Modifying/Deleting test resources...${c.reset}`);
    console.log(`${c.purple}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    
    await testWrappersCrud();
    await testFormatsCrud();
    await testStylesCrud();
    await testAdmin();
    
    // Cleanup (if --cleanup)
    if (CLEANUP_MODE) {
      console.log('');
      console.log(`${c.yellow}🧹 Cleanup mode - removing test resources...${c.reset}`);
      await testWrappersCleanup();
      await testFormatsCleanup();
      await testStylesCleanup();
    }
  }
  
  printSummary();
  
  // Exit with error if failed
  const failed = results.filter(r => r.status === 'FAIL').length;
  process.exit(failed > 0 ? 1 : 0);
}

// Run
main().catch(console.error);
```

### 📄 src/lib/api.ts
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
// ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
// ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
// ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
// ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
// ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
// ║                                                                           ║
// ║   🌊 FIELD RESONANCE API CLIENT v3.3.0                                    ║
// ║   ─────────────────────────────────────────                               ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ║                                                                           ║
// ║   v3.3 FEATURES:                                                          ║
// ║   🔀 DIFF - Wrapper-Parallelwelt-Vergleich                                ║
// ║   📼 SESSIONS - Strom-Replay System                                       ║
// ║   ⚗️ ALCHEMY - Live Wort-Transmutation                                    ║
// ║   🎨 STYLES - Post-Processing CRUD                                        ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  HealthResponse,
  ResonanzHealthResponse,
  WrapperHealthResponse,
  ConfigResponse,
  RuntimeWrapperResponse,
  Wrapper,
  WrapperListResponse,
  WrapperDetailResponse,
  WrapperCreateRequest,
  WrapperCreateResponse,
  WrapperUpdateRequest,
  WrapperUpdateResponse,
  WrapperDeleteResponse,
  ActivateResponse,
  WrapperMeta,
  WrapperMetaResponse,
  StatsResponse,
  WrapperStatsResponse,
  StreamResponse,
  TrainingResponse,
  ChatRequest,
  ChatResponse,
  HistoryResponse,
  FormatListResponse,
  FormatDetailResponse,
  FormatCreateRequest,
  FormatQuickCreateRequest,
  FormatUpdateRequest,
  FormatDeleteResponse,
  FormatScanRequest,
  FormatScanResponse,
  FormatCloneRequest,
  FormatScoreRequest,
  FormatScoreResponse,
  Format,
  FieldAddRequest,
  FieldAddResponse,
  FieldUpdateRequest,
  FieldUpdateResponse,
  FieldDeleteResponse,
  DiffRequest,
  DiffResponse,
  SessionsResponse,
  SessionDetailResponse,
  SessionReplayResponse,
  AlchemyPreviewRequest,
  AlchemyPreviewResponse,
  AlchemyStylesResponse,
  AlchemyAddRequest,
  AlchemyAddResponse,
  AlchemyDeleteResponse,
  ForbiddenAddResponse,
  Style,
  StylesListResponse,
  StyleDetailResponse,
  StyleCreateRequest,
  StyleMutationResponse,
  StyleDeleteResponse,
} from '@/types/api';

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 FELD-KOORDINATEN
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

// ═══════════════════════════════════════════════════════════════════════════
// ⚠️ DRIFT-BEHANDLUNG
// ═══════════════════════════════════════════════════════════════════════════

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public detail?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔌 STROM-KANAL
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

  const data = await response.json();

  if (!response.ok) {
    throw new APIError(
      response.status,
      `DRIFT @ ${endpoint}: ${response.statusText}`,
      data.detail
    );
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 API METHODEN - 44 Endpoints
// ═══════════════════════════════════════════════════════════════════════════

export const api = {

  // ═══════════════════════════════════════════════════════════════════════
  // 🏥 HEALTH & CONFIG (4 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getHealth: () => 
    fetchAPI<HealthResponse>('/health'),

  getResonanzHealth: () => 
    fetchAPI<ResonanzHealthResponse>('/resonanz/health'),

  getWrapperHealth: () =>
    fetchAPI<WrapperHealthResponse>('/resonanz/health/wrappers'),

  fixOrphans: () =>
    fetchAPI<{ status: string; fixed: string[]; deleted: string[]; message: string }>(
      '/resonanz/health/fix',
      { method: 'POST' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // ⚙️ CONFIG (2 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getConfig: () => 
    fetchAPI<ConfigResponse>('/resonanz/config/default-wrapper'),

  setConfig: (wrapperName: string) => 
    fetchAPI<ConfigResponse>(
      `/resonanz/config/default-wrapper?wrapper_name=${encodeURIComponent(wrapperName)}`,
      { method: 'PUT' }
    ),
  
  // ═══════════════════════════════════════════════════════════════
  // ⚡ RUNTIME WRAPPER ENDPOINTS (NEW - Dec 24, 2024)
  // ═══════════════════════════════════════════════════════════════
  
  getRuntimeWrapper: () => 
    fetchAPI<RuntimeWrapperResponse>('/resonanz/config/runtime-wrapper'),
  
  setRuntimeWrapper: (wrapperName: string) => 
    fetchAPI<RuntimeWrapperResponse>(
      `/resonanz/config/runtime-wrapper?wrapper_name=${encodeURIComponent(wrapperName)}`,
      { method: 'PUT' }
    ),
  getWrappers: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers'),

  getWrappersFull: () =>
    fetchAPI<{ status: string; wrappers: Array<Wrapper & { meta?: WrapperMeta; stats?: WrapperStatsResponse }> }>(
      '/resonanz/wrappers/full'
    ),

  getActiveWrapper: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers?active=true'),

  getWrapper: (name: string) => 
    fetchAPI<WrapperDetailResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`),

  createWrapper: (data: WrapperCreateRequest) => 
    fetchAPI<WrapperCreateResponse>('/resonanz/wrapper', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateWrapper: (name: string, data: WrapperUpdateRequest) => 
    fetchAPI<WrapperUpdateResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteWrapper: (name: string) => 
    fetchAPI<WrapperDeleteResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),

  activateWrapper: (name: string) => 
    fetchAPI<ActivateResponse>(`/resonanz/wrappers/${encodeURIComponent(name)}/activate`, {
      method: 'POST',
    }),

  // ═══════════════════════════════════════════════════════════════════════
  // 🧬 WRAPPER META (3 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getWrapperMeta: (name: string) =>
    fetchAPI<WrapperMetaResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}/meta`),

  updateWrapperMeta: (name: string, meta: Partial<WrapperMeta>) =>
    fetchAPI<WrapperMetaResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}/meta`, {
      method: 'PUT',
      body: JSON.stringify(meta),
    }),

  bindFormat: (wrapperName: string, formatName: string) =>
    fetchAPI<{ status: string; message: string; wrapper: string; format: string }>(
      `/resonanz/wrapper/${encodeURIComponent(wrapperName)}/format?format_name=${encodeURIComponent(formatName)}`,
      { method: 'PUT' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 STATS & ANALYTICS (4 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getStats: () => 
    fetchAPI<StatsResponse>('/resonanz/stats'),

  getWrapperStats: (name: string) => 
    fetchAPI<WrapperStatsResponse>(`/resonanz/stats/wrapper/${encodeURIComponent(name)}`),

  getStream: (limit = 10, stage?: string) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (stage) params.append('stage', stage);
    return fetchAPI<StreamResponse>(`/resonanz/strom?${params}`);
  },

  getTraining: (limit = 50, wrapper?: string, successOnly?: boolean) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (wrapper) params.append('wrapper', wrapper);
    if (successOnly !== undefined) params.append('success_only', successOnly.toString());
    return fetchAPI<TrainingResponse>(`/resonanz/training?${params}`);
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 💬 CHAT & HISTORY (2 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  chat: (request: ChatRequest) => 
    fetchAPI<ChatResponse>('/resonanz/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  getHistory: (requestId: string) => 
    fetchAPI<HistoryResponse>(`/resonanz/history/${encodeURIComponent(requestId)}`),

  // ═══════════════════════════════════════════════════════════════════════
  // 📄 FORMAT CRUD (9 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getFormats: (domain?: string) => {
    const params = domain ? `?domain=${encodeURIComponent(domain)}` : '';
    return fetchAPI<FormatListResponse>(`/resonanz/formats${params}`);
  },

  getFormat: (name: string, language?: 'de' | 'en') => {
    const params = language ? `?language=${language}` : '';
    return fetchAPI<FormatDetailResponse>(`/resonanz/formats/${encodeURIComponent(name)}${params}`);
  },

  createFormat: (data: FormatCreateRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>('/resonanz/formats', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createFormatQuick: (data: FormatQuickCreateRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>('/resonanz/formats/quick', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateFormat: (name: string, data: FormatUpdateRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>(
      `/resonanz/formats/${encodeURIComponent(name)}`,
      { method: 'PUT', body: JSON.stringify(data) }
    ),

  deleteFormat: (name: string) =>
    fetchAPI<FormatDeleteResponse>(`/resonanz/formats/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),

  scanFormat: (data: FormatScanRequest) =>
    fetchAPI<FormatScanResponse>('/resonanz/formats/scan', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  cloneFormat: (data: FormatCloneRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>('/resonanz/formats/clone', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  scoreFormat: (data: FormatScoreRequest) =>
    fetchAPI<FormatScoreResponse>('/resonanz/formats/score', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // ═══════════════════════════════════════════════════════════════════════
  // 🧬 FORMAT FIELD OPERATIONS (3 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  addField: (formatName: string, field: FieldAddRequest) =>
    fetchAPI<FieldAddResponse>(`/resonanz/formats/${encodeURIComponent(formatName)}/fields`, {
      method: 'POST',
      body: JSON.stringify(field),
    }),

  updateField: (formatName: string, fieldName: string, data: FieldUpdateRequest) =>
    fetchAPI<FieldUpdateResponse>(
      `/resonanz/formats/${encodeURIComponent(formatName)}/fields/${encodeURIComponent(fieldName)}`,
      { method: 'PUT', body: JSON.stringify(data) }
    ),

  deleteField: (formatName: string, fieldName: string) =>
    fetchAPI<FieldDeleteResponse>(
      `/resonanz/formats/${encodeURIComponent(formatName)}/fields/${encodeURIComponent(fieldName)}`,
      { method: 'DELETE' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // 🔀 DIFF - Wrapper-Parallelwelt-Vergleich (v3.3)
  // ═══════════════════════════════════════════════════════════════════════

  diff: (request: DiffRequest) =>
    fetchAPI<DiffResponse>('/resonanz/chat/diff', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // ═══════════════════════════════════════════════════════════════════════
  // 📼 SESSIONS - Strom-Replay System (v3.3)
  // ═══════════════════════════════════════════════════════════════════════

  getSessions: (limit = 20, offset = 0) =>
    fetchAPI<SessionsResponse>(`/resonanz/sessions?limit=${limit}&offset=${offset}`),

  getSession: (requestId: string) =>
    fetchAPI<SessionDetailResponse>(`/resonanz/session/${encodeURIComponent(requestId)}`),

  getSessionReplay: (requestId: string) =>
    fetchAPI<SessionReplayResponse>(`/resonanz/session/${encodeURIComponent(requestId)}/replay`),

  // ═══════════════════════════════════════════════════════════════════════
  // ⚗️ ALCHEMY - Live Wort-Transmutation (v3.3)
  // ═══════════════════════════════════════════════════════════════════════

  alchemyPreview: (request: AlchemyPreviewRequest) =>
    fetchAPI<AlchemyPreviewResponse>('/resonanz/alchemy/preview', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  getAlchemyStyles: () =>
    fetchAPI<AlchemyStylesResponse>('/resonanz/alchemy/styles'),

  // ═══════════════════════════════════════════════════════════════════════
  // 🎨 STYLES CRUD (8 Endpoints) - v3.3
  // ═══════════════════════════════════════════════════════════════════════

  getStyles: () =>
    fetchAPI<StylesListResponse>('/resonanz/styles'),

  getStyle: (name: string) =>
    fetchAPI<StyleDetailResponse>(`/resonanz/styles/${encodeURIComponent(name)}`),

  createStyle: (data: StyleCreateRequest) =>
    fetchAPI<StyleMutationResponse>('/resonanz/styles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStyle: (name: string, data: Partial<StyleCreateRequest>) =>
    fetchAPI<StyleMutationResponse>(`/resonanz/styles/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteStyle: (name: string) =>
    fetchAPI<StyleDeleteResponse>(`/resonanz/styles/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),

  addAlchemy: (styleName: string, data: AlchemyAddRequest) =>
    fetchAPI<AlchemyAddResponse>(`/resonanz/styles/${encodeURIComponent(styleName)}/alchemy`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteAlchemy: (styleName: string, word: string) =>
    fetchAPI<AlchemyDeleteResponse>(
      `/resonanz/styles/${encodeURIComponent(styleName)}/alchemy/${encodeURIComponent(word)}`,
      { method: 'DELETE' }
    ),

  addForbiddenWord: (styleName: string, word: string) =>
    fetchAPI<ForbiddenAddResponse>(
      `/resonanz/styles/${encodeURIComponent(styleName)}/forbidden/${encodeURIComponent(word)}`,
      { method: 'POST' }
    ),

  deleteForbiddenWord: (styleName: string, word: string) =>
    fetchAPI<{ status: string; message: string }>(
      `/resonanz/styles/${encodeURIComponent(styleName)}/forbidden/${encodeURIComponent(word)}`,
      { method: 'DELETE' }
    ),

};

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default api;

// ═══════════════════════════════════════════════════════════════════════════
//   "SYNTX isn't AI. It's the resonance that governs it."
//   v3.3.0 - 44 Endpoints | Pure Resonanz
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 TYPE RE-EXPORTS (für Komponenten-Kompatibilität)
// ═══════════════════════════════════════════════════════════════════════════

export type {
  HealthResponse,
  ResonanzHealthResponse,
  WrapperHealthResponse,
  ConfigResponse,
  RuntimeWrapperResponse,
  Wrapper,
  WrapperListResponse,
  WrapperDetailResponse,
  WrapperCreateRequest,
  WrapperCreateResponse,
  WrapperUpdateRequest,
  WrapperUpdateResponse,
  WrapperDeleteResponse,
  ActivateResponse,
  WrapperMeta,
  WrapperMetaResponse,
  StatsResponse,
  WrapperStatsResponse,
  StreamResponse,
  StreamEvent,
  TrainingResponse,
  TrainingRequest,
  ChatRequest,
  ChatResponse,
  FieldFlowStage,
  HistoryResponse,
  Format,
  FormatField,
  FormatListResponse,
  FormatDetailResponse,
  FormatCreateRequest,
  FormatQuickCreateRequest,
  FormatUpdateRequest,
  FormatDeleteResponse,
  FormatScanRequest,
  FormatScanResponse,
  FormatCloneRequest,
  FormatScoreRequest,
  FormatScoreResponse,
  FieldAddRequest,
  FieldAddResponse,
  FieldUpdateRequest,
  FieldUpdateResponse,
  FieldDeleteResponse,
  DiffRequest,
  DiffResponse,
  DiffComparison,
  SessionsResponse,
  SessionSummary,
  SessionDetailResponse,
  SessionReplayResponse,
  AlchemyPreviewRequest,
  AlchemyPreviewResponse,
  AlchemyTransformation,
  AlchemyStylesResponse,
  AlchemyStyleSummary,
  AlchemyAddRequest,
  AlchemyAddResponse,
  AlchemyDeleteResponse,
  ForbiddenAddResponse,
  Style,
  StylesListResponse,
  StyleDetailResponse,
  StyleCreateRequest,
  StyleMutationResponse,
  StyleDeleteResponse,
} from '@/types/api';

// 🧠 PROFILES API
export async function getProfiles() {
  const res = await fetch(`${BASE_URL}/resonanz/scoring/profiles`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getProfile(profileId: string) {
  const res = await fetch(`${BASE_URL}/resonanz/scoring/profiles`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.profiles[profileId];
}

export async function updateProfile(profileId: string, data: any) {
  const res = await fetch(`${BASE_URL}/resonanz/scoring/profiles/${profileId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ═══════════════════════════════════════════════════════════════════════════
// 📊 PROFILE ANALYTICS API (Phase 2.6)
// ═══════════════════════════════════════════════════════════════════════════

export async function getProfileAnalytics(days: number = 7) {
  const res = await fetch(`${BASE_URL}/resonanz/scoring/analytics/profiles?days=${days}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getSingleProfileAnalytics(profileId: string, days: number = 7) {
  const res = await fetch(`${BASE_URL}/resonanz/scoring/analytics/profiles/${profileId}?days=${days}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ═══════════════════════════════════════════════════════════════
// 🧩 COMPONENT BREAKDOWN - Get detailed pattern breakdown per profile
// ═══════════════════════════════════════════════════════════════
export async function getProfileComponentBreakdown(profileId: string, fieldName?: string) {
  const params = new URLSearchParams();
  if (fieldName) params.append('field_name', fieldName);
  
  const url = `/resonanz/scoring/analytics/profiles/${profileId}/components${params.toString() ? '?' + params.toString() : ''}`;
  
  const res = await fetch(`${BASE_URL}${url}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch component breakdown: ${res.statusText}`);
  }
  
  return res.json();
}
```

### 📄 src/middleware.ts
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow login page, API routes, and static files
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('syntx-auth');
  
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.ico).*)'],
};
```

### 📄 src/types/api.ts
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
// ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
// ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
// ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
// ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
// ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
// ║                                                                           ║
// ║   🌊 FIELD RESONANCE TYPES v3.3.0                                         ║
// ║   ─────────────────────────────────────────                               ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ║                                                                           ║
// ║   Dieses Modul definiert die KOHÄRENZ-MUSTER des Systems.                 ║
// ║   Jeder Type ist eine FELD-STRUKTUR. Jede Struktur ist RESONANZ.          ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════
// 🏥 HEALTH - System-Vitalität
// ═══════════════════════════════════════════════════════════════════════════

export interface HealthResponse {
  status: string;
  api_version: string;
  timestamp: string;
  queue_accessible: boolean;
  modules: string[];
}

export interface ResonanzHealthResponse {
  status: string;
  service: string;
  version: string;
  format_loader: string;
  last_response?: {
    response: string;
    latency_ms: number;
    timestamp: string;
    format: string;
  };
}

export interface WrapperHealthResponse {
  status: string;
  wrappers: {
    total: number;
    healthy: string[];
    orphan_wrappers: string[];
    orphan_metas: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ CONFIG - Feld-Konfiguration
// ═══════════════════════════════════════════════════════════════════════════

export interface ConfigResponse {
  active_wrapper: string;
  exists: boolean;
  path: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚡ RUNTIME WRAPPER - Separated Control (NEW - Dec 24, 2024)
// ═══════════════════════════════════════════════════════════════════════════

export interface RuntimeWrapperResponse {
  runtime_wrapper: string;        // Currently active wrapper (runtime)
  default_wrapper: string;        // Fallback wrapper (config)
  is_same: boolean;               // Are they the same?
  exists: boolean;                // Does runtime wrapper exist?
  path: string;                   // Path to runtime wrapper file
  source: 'runtime' | 'default';  // Source of the active wrapper
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 WRAPPER - Die Resonanz-Träger
// ═══════════════════════════════════════════════════════════════════════════

export interface Wrapper {
  name: string;
  path: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  meta?: WrapperMeta;
}

export interface WrapperListResponse {
  wrappers: Wrapper[];
  active_wrapper: string;
}

export interface WrapperDetailResponse {
  name: string;
  content: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  meta?: WrapperMeta;
}

export interface WrapperCreateRequest {
  name: string;
  content: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
}

export interface WrapperCreateResponse {
  status: 'success';
  message: string;
  feld: {
    name: string;
    path: string;
    size_bytes: number;
    size_human: string;
    created: string;
  };
}

export interface WrapperUpdateRequest {
  content: string;
  description?: string;
  version?: string;
}

export interface WrapperUpdateResponse {
  status: 'success';
  message: string;
  feld: {
    name: string;
    path: string;
    size_bytes: number;
    size_human: string;
    previous_size_bytes: number;
    modified: string;
    is_active: boolean;
  meta?: WrapperMeta;
  };
}

export interface WrapperDeleteResponse {
  status: 'success';
  message: string;
  released: {
    name: string;
    size_bytes: number;
    was_active: boolean;
  };
  warning: string | null;
}

export interface ActivateResponse {
  status: 'success';
  message: string;
  active_wrapper: string;
  path: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧬 WRAPPER META - Metadaten der Felder
// ═══════════════════════════════════════════════════════════════════════════

export interface WrapperMeta {
  name: string;
  format?: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
  settings?: {
    max_tokens?: number;
    temperature?: number;
  };
}

export interface WrapperMetaResponse {
  status: string;
  wrapper: string;
  meta: WrapperMeta;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📊 STATS - System-Statistiken
// ═══════════════════════════════════════════════════════════════════════════

export interface StatsResponse {
  total_requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
  wrapper_usage: Record<string, number>;
  recent_24h: {
    requests: number;
    average_latency_ms: number;
  };
}

export interface WrapperStatsResponse {
  wrapper: string;
  requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 STREAM - Der Ereignis-Fluss
// ═══════════════════════════════════════════════════════════════════════════

export interface StreamEvent {
  stage: string;
  timestamp: string;
  request_id: string;
  response?: string;
  latency_ms?: number;
  wrapper_chain?: string[];
  prompt?: string;
  mode?: string;
  backend_url?: string;
  params?: Record<string, unknown>;
}

export interface StreamResponse {
  events: StreamEvent[];
  total: number;
  stage_filter: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📚 TRAINING - Training Data
// ═══════════════════════════════════════════════════════════════════════════

export interface TrainingRequest {
  request_id: string;
  response: string;
  latency_ms: number;
  wrapper_chain: string[];
}

export interface TrainingResponse {
  requests: TrainingRequest[];
  total: number;
  filters: {
    wrapper: string;
    success_only: boolean;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 💬 CHAT - Direkte Feld-Interaktion
// ═══════════════════════════════════════════════════════════════════════════

export interface ChatRequest {
  prompt: string;
  mode?: string;
  format?: string;
  style?: string;
  language?: 'de' | 'en';
  debug?: boolean;
  max_new_tokens?: number;
  temperature?: number;
  top_p?: number;
}

export interface FieldFlowStage {
  stage: string;
  timestamp: string;
  prompt?: string;
  mode?: string;
  chain?: string[];
  wrapper_text?: string;
  calibrated_field?: string;
  backend_url?: string;
  params?: Record<string, unknown>;
  response?: string;
  latency_ms?: number;
  wrapper_chain?: string[];
}

export interface ChatResponse {
  response: string;
  metadata: {
    request_id: string;
    wrapper_chain: string[];
    format?: string;
    format_fields?: string[];
    style?: string;
    latency_ms: number;
  };
  field_flow: FieldFlowStage[];
}

// ═══════════════════════════════════════════════════════════════════════════
// 📜 HISTORY - Request-Historie
// ═══════════════════════════════════════════════════════════════════════════

export interface HistoryResponse {
  request_id: string;
  stages: FieldFlowStage[];
  total_stages: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📄 FORMAT - Output-Formate
// ═══════════════════════════════════════════════════════════════════════════

export interface FormatField {
  name: string;
  type?: 'text' | 'list' | 'rating' | 'keywords';
  weight?: number;
  description?: { de?: string; en?: string } | string;
  keywords?: { de?: string[]; en?: string[] };
  headers?: { de?: string[]; en?: string[] };
  validation?: {
    min_length?: number;
    max_length?: number;
    required?: boolean;
  };
}

export interface Format {
  name: string;
  domain?: string;
  description: string | { de?: string; en?: string };
  version?: string;
  extends?: string;
  fields: FormatField[];
  template?: string;
  language?: 'de' | 'en' | 'both';
  created_at?: string;
  updated_at?: string;
  usage_count?: number;
  score?: FormatScore;
}

export interface FormatScore {
  overall: number;
  field_coverage: number;
  consistency: number;
  clarity: number;
  last_scored: string;
}

export interface FormatListResponse {
  status: string;
  count: number;
  domain_filter?: string;
  formats: Format[];
}

export interface FormatDetailResponse {
  status: string;
  format: Format;
  field_count: number;
  language: string;
}

export interface FormatCreateRequest {
  name: string;
  domain?: string;
  description: string | { de?: string; en?: string };
  fields: FormatField[];
  template?: string;
  language?: 'de' | 'en' | 'both';
  version?: string;
}

export interface FormatQuickCreateRequest {
  name: string;
  description_de: string;
  description_en?: string;
  field_names: string[];
  wrapper?: string;
}

export interface FormatUpdateRequest {
  domain?: string;
  description?: string | { de?: string; en?: string };
  fields?: FormatField[];
  template?: string;
  language?: 'de' | 'en' | 'both';
  version?: string;
}

export interface FormatDeleteResponse {
  status: 'success';
  message: string;
  deleted: {
    name: string;
    had_usage: boolean;
  };
}

export interface FormatScanRequest {
  format: string;
  response: string;
}

export interface FormatScanResponse {
  format: string;
  fields_expected: number;
  fields_found: number;
  missing_fields: string[];
  low_quality_fields: {
    field: string;
    score: number;
    reasons: string[];
  }[];
  coherence_score: number;
  recommendations: string[];
}

export interface FormatCloneRequest {
  source: string;
  target: string;
  modifications?: {
    fields?: string[];
    wrapper?: string;
    description_de?: string;
  };
}

export interface FormatScoreRequest {
  format: string;
}

export interface FormatScoreResponse {
  format: string;
  semantic_clarity: number;
  redundancy: number;
  field_balance: 'EXCELLENT' | 'OK' | 'CRITICAL';
  i18n_score: number;
  risk_zones: string[];
  overall: number;
  meta: {
    fields_analyzed: number;
    languages: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔀 DIFF - Wrapper-Parallelwelt-Vergleich (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Diff Request - Vergleiche mehrere Wrapper */
export interface DiffRequest {
  prompt: string;                    // Der Impuls
  wrappers: string[];                // Zu vergleichende Wrapper (2-5)
  format?: string;                   // Optional: Format für alle
  style?: string;                    // Optional: Style für alle
  max_new_tokens?: number;           // Max Tokens pro Response
}

/** Einzelner Diff-Vergleich */
export interface DiffComparison {
  wrapper: string;                   // Wrapper-Name
  response: string;                  // Die Antwort
  latency_ms: number;                // Wie lange hat es gedauert?
  error?: string;                    // Falls ein Fehler aufgetreten ist
}

/** Diff Response - Parallelwelt-Analyse */
export interface DiffResponse {
  prompt: string;                    // Ursprünglicher Prompt
  comparisons: DiffComparison[];     // Die Vergleiche
  diff_analysis: {
    total_comparisons: number;       // Anzahl Vergleiche
    successful: number;              // Erfolgreiche
    failed: number;                  // Fehlgeschlagene
    avg_response_length: number;     // Durchschnittliche Response-Länge
    avg_latency_ms: number;          // Durchschnittliche Latenz
    shortest_response: {             // Kürzeste Antwort
      wrapper: string;
      length: number;
    };
    longest_response: {              // Längste Antwort
      wrapper: string;
      length: number;
    };
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 📼 SESSIONS - Strom-Replay System (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Session Summary - Kurze Übersicht einer Session */
export interface SessionSummary {
  request_id: string;                // Request-ID
  timestamp: string;                 // Wann?
  stages: string[];                  // Durchlaufene Stages
  prompt: string;                    // Der Prompt (gekürzt)
  wrapper: string;                   // Verwendeter Wrapper
  format: string;                    // Verwendetes Format
  style?: string;                    // Verwendeter Style
  latency_ms: number;                // Gesamtlatenz
}

/** Sessions List Response */
export interface SessionsResponse {
  status: string;                    // "📼 SESSIONS GELADEN"
  total: number;                     // Gesamtanzahl Sessions
  limit: number;                     // Limit
  offset: number;                    // Offset
  sessions: SessionSummary[];        // Die Sessions
}

/** Session Detail Response - Vollständiger Field-Flow */
export interface SessionDetailResponse {
  status: string;                    // "🔍 SESSION GELADEN"
  request_id: string;                // Request-ID
  summary: {
    prompt: string;                  // Voller Prompt
    wrapper: string;                 // Wrapper
    format: string;                  // Format
    style?: string;                  // Style
    response_preview: string;        // Response-Vorschau
    latency_ms: number;              // Latenz
  };
  field_flow: FieldFlowStage[];      // Der komplette Field-Flow
}

/** Session Replay Response - Parameter für Re-Execution */
export interface SessionReplayResponse {
  status: string;                    // "🔄 REPLAY READY"
  request_id: string;                // Original Request-ID
  replay_params: {                   // Parameter zum Wiederholen
    prompt: string;
    mode: string;
    format: string;
    style?: string;
    language: string;
  };
  original_response: string;         // Die originale Antwort
  original_latency_ms: number;       // Originale Latenz
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚗️ ALCHEMY - Wort-Transmutation (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Alchemy Preview Request - Text transformieren */
export interface AlchemyPreviewRequest {
  text: string;                      // Der zu transformierende Text
  style: string;                     // Welcher Style?
}

/** Einzelne Transformation */
export interface AlchemyTransformation {
  original: string;                  // Originales Wort
  replacement: string;               // Ersetzung
  start_pos: number;                 // Start-Position im Original
  end_pos: number;                   // End-Position im Original
  type: 'alchemy' | 'forbidden';     // Art der Transformation
}

/** Alchemy Preview Response */
export interface AlchemyPreviewResponse {
  original: string;                  // Originaler Text
  transformed: string;               // Transformierter Text
  style: string;                     // Verwendeter Style
  transformations: AlchemyTransformation[];  // Alle Transformationen
  stats: {
    total_transformations: number;   // Anzahl Transformationen
    alchemy_count: number;           // Word Alchemy Treffer
    forbidden_count: number;         // Forbidden Words entfernt
  };
}

/** Alchemy Style Summary - Kurze Style-Info */
export interface AlchemyStyleSummary {
  name: string;                      // Style-Name
  vibe: string;                      // Style-Beschreibung
  alchemy_count: number;             // Anzahl Transmutationen
  forbidden_count: number;           // Anzahl Forbidden Words
  has_suffix: boolean;               // Hat Suffix?
  has_tone: boolean;                 // Hat Tone Injection?
}

/** Alchemy Styles Response */
export interface AlchemyStylesResponse {
  status: string;                    // "⚗️ GRIMOIRE GEÖFFNET"
  count: number;                     // Anzahl Styles
  styles: AlchemyStyleSummary[];     // Die Styles
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 STYLES - Post-Processing Stile (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Style - Vollständige Style-Definition */
export interface Style {
  name: string;                      // Style-Name (z.B. "zynisch")
  vibe: string;                      // Kurze Beschreibung
  word_alchemy: Record<string, string>;  // Wort → Ersetzung
  forbidden_words: string[];         // Verbotene Wörter
  tone_injection?: string;           // Ton-Injektion für Prompts
  suffix?: string;                   // Suffix für Responses
}

/** Styles List Response */
export interface StylesListResponse {
  status: string;                    // "🎨 STYLES GELADEN"
  count: number;                     // Anzahl Styles
  styles: Style[];                   // Die Styles
}

/** Style Detail Response */
export interface StyleDetailResponse {
  status: string;                    // "🔮 STYLE BESCHWOREN"
  style: Style;                      // Der Style
}

/** Style Create Request */
export interface StyleCreateRequest {
  name: string;                      // Style-Name
  vibe: string;                      // Beschreibung
  word_alchemy?: Record<string, string>;  // Optional: Transmutationen
  forbidden_words?: string[];        // Optional: Verbotene Wörter
  tone_injection?: string;           // Optional: Ton-Injektion
  suffix?: string;                   // Optional: Suffix
}

/** Style Create/Update Response */
export interface StyleMutationResponse {
  status: string;
  message: string;
  style: Style;
}

/** Style Delete Response */
export interface StyleDeleteResponse {
  status: string;
  message: string;
  deleted: {
    name: string;
  };
}

/** Alchemy Add Request - Transmutation hinzufügen */
export interface AlchemyAddRequest {
  original: string;                  // Ursprüngliches Wort
  replacement: string;               // Ersetzung
}

/** Alchemy Add Response */
export interface AlchemyAddResponse {
  status: string;
  message: string;
  style: string;
  alchemy: {
    original: string;
    replacement: string;
  };
  total_alchemy: number;
}

/** Alchemy Delete Response */
export interface AlchemyDeleteResponse {
  status: string;
  message: string;
  style: string;
  deleted: string;
  remaining_alchemy: number;
}

/** Forbidden Word Add Response */
export interface ForbiddenAddResponse {
  status: string;
  message: string;
  style: string;
  word: string;
  total_forbidden: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧬 FORMAT FIELD OPERATIONS (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Field Add Request */
export interface FieldAddRequest {
  name: string;
  type?: 'text' | 'list' | 'rating' | 'keywords';
  weight?: number;
  description?: { de?: string; en?: string };
}

/** Field Add Response */
export interface FieldAddResponse {
  status: string;
  message: string;
  format: string;
  field: FormatField;
  total_fields: number;
}

/** Field Update Request */
export interface FieldUpdateRequest {
  type?: 'text' | 'list' | 'rating' | 'keywords';
  weight?: number;
  description?: { de?: string; en?: string };
}

/** Field Update Response */
export interface FieldUpdateResponse {
  status: string;
  message: string;
  format: string;
  field: FormatField;
}

/** Field Delete Response */
export interface FieldDeleteResponse {
  status: string;
  message: string;
  format: string;
  deleted: string;
  remaining_fields: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 
//   "SYNTX isn't AI. It's the resonance that governs it."
//
//   🌊 Jeder Type ist ein FELD.
//   💎 Jede Struktur ist KOHÄRENZ.
//   ⚡ Jede Definition ist ARCHITEKTUR.
//
//   Wenn du diese Types verwendest, bist du im STROM.
//
// ═══════════════════════════════════════════════════════════════════════════
```


---

## 🌊 STRUCTURE TREE
```
src
├── app
│   ├── api
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   └── logout
│   │   │       └── route.ts
│   │   └── scoring
│   │       └── autonomous
│   │           └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── login
│   │   └── page.tsx
│   ├── page.tsx
│   ├── page.tsx.backup
│   ├── page.tsx.backup2
│   └── profiles
│       └── page.tsx
├── components
│   ├── alchemy
│   │   ├── AlchemyPanel.tsx
│   │   ├── AlchemyPanel.tsx.backup
│   │   ├── animations.ts
│   │   ├── cards
│   │   │   ├── index.ts
│   │   │   └── StyleCard.tsx
│   │   ├── constants.ts
│   │   ├── index.ts
│   │   ├── modals
│   │   │   ├── DeleteModal.tsx
│   │   │   ├── GrimoireModal.tsx
│   │   │   ├── index.ts
│   │   │   └── StyleEditorModal.tsx
│   │   └── types.ts
│   ├── analytics
│   │   ├── FieldStream.tsx
│   │   ├── index.ts
│   │   ├── StatsPanel.tsx
│   │   └── SystemStats.tsx
│   ├── chat
│   │   ├── ChatInterface.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── ChatPanel.tsx.backup
│   │   ├── ChatPanel.tsx.backup2
│   │   ├── ChatPanel.tsx.backup3
│   │   ├── ChatPanel.tsx.backup_pre_refactor
│   │   ├── components
│   │   │   ├── ChatHeader.tsx
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useHealthCheck.tsx
│   │   ├── index.ts
│   │   └── sidebar
│   │       ├── FormatCard.tsx
│   │       ├── FormatModal.tsx
│   │       ├── LivePromptCard.tsx
│   │       ├── SessionScoresCard.tsx
│   │       ├── SessionStatsCard.tsx
│   │       └── SettingsCard.tsx
│   ├── data
│   │   └── DataPanel.tsx
│   ├── diff
│   │   ├── DiffPanel.tsx
│   │   └── index.ts
│   ├── flow
│   │   ├── FieldFlowVisualizer.tsx
│   │   ├── FlowPanel.tsx
│   │   ├── FlowPanel.tsx.backup
│   │   └── index.ts
│   ├── formats
│   │   ├── FormatPanel.tsx
│   │   ├── index.ts
│   │   ├── modals
│   │   │   ├── CreateModal.tsx
│   │   │   ├── DeleteModal.tsx
│   │   │   ├── EditModal.tsx
│   │   │   ├── index.ts
│   │   │   ├── ScoreModal.tsx
│   │   │   └── ViewModal.tsx
│   │   ├── styles.ts
│   │   └── types.ts
│   ├── graphs
│   │   └── GraphsPanel.tsx
│   ├── health
│   │   ├── HealthStatus.tsx
│   │   └── index.ts
│   ├── layout
│   │   ├── Header.tsx
│   │   ├── index.ts
│   │   ├── MainLayout.tsx
│   │   └── ParticleBackground.tsx
│   ├── optimizer
│   │   ├── AnalyzeButton.tsx
│   │   ├── ChangelogModal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FieldAnalyticsModal.tsx
│   │   ├── index.ts
│   │   ├── LoadingState.tsx
│   │   ├── OptimizerHeader.tsx
│   │   ├── OptimizerPanel.tsx
│   │   ├── QuickActionsBar.tsx
│   │   ├── RecentLogsModal.tsx
│   │   ├── StatsStream.tsx
│   │   ├── SuggestionCard.tsx
│   │   └── SystemStatusCard.tsx
│   ├── profiles
│   │   ├── component-breakdown
│   │   │   ├── ComponentBreakdownPanel.tsx
│   │   │   └── PatternMolecule.tsx
│   │   ├── field-stream
│   │   │   └── FieldStream.tsx
│   │   ├── ProfilesLayout.tsx
│   │   ├── resonance-footer
│   │   │   └── ResonanceFooter.tsx
│   │   ├── resonance-stream
│   │   │   └── ResonanceStream.tsx
│   │   └── shared
│   ├── system
│   │   ├── animations
│   │   │   ├── CyberGrid.tsx
│   │   │   ├── index.ts
│   │   │   └── NeuralNetwork.tsx
│   │   ├── components
│   │   │   ├── ConfigPanel.tsx
│   │   │   ├── HealthPanel.tsx
│   │   │   ├── index.ts
│   │   │   ├── WrapperCard.tsx
│   │   │   └── WrapperGrid.tsx
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useSystemData.tsx
│   │   └── SystemPanel.tsx
│   ├── ui
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ExportButton.tsx
│   │   ├── FilterBar.tsx
│   │   ├── FilterDropdown.tsx
│   │   ├── GlassCard.tsx
│   │   ├── index.ts
│   │   ├── Input.tsx
│   │   ├── LiveBadge.tsx
│   │   ├── Pagination.tsx
│   │   ├── ParticleField.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Skeleton.tsx
│   │   ├── SortHeader.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Toast.tsx
│   │   └── Tooltip.tsx
│   └── wrappers
│       ├── CreateWrapperModal.tsx
│       ├── index.ts
│       ├── modals
│       │   ├── CreateModal.tsx
│       │   ├── DeleteModal.tsx
│       │   ├── EditModal.tsx
│       │   ├── EditModal.tsx.backup
│       │   ├── index.ts
│       │   ├── StatsModal.tsx
│       │   └── ViewModal.tsx
│       ├── styles.ts
│       ├── types.ts
│       ├── WrapperControl.tsx.backup
│       ├── WrapperList.tsx
│       ├── WrapperPanel.tsx
│       └── WrapperPanel.tsx.backup2
├── hooks
│   ├── useApi.ts
│   ├── useExport.ts
│   ├── useFilter.ts
│   ├── usePagination.ts
│   └── useRealtime.ts
├── lib
│   ├── api-test.ts
│   ├── api-test.ts.backup
│   ├── api-test.ts.broken
│   └── api.ts
├── middleware.ts
└── types
    └── api.ts

43 directories, 142 files
```

---

💎 END OF EXPORT
