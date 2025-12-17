// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   SYNTX TAILWIND CONFIG - ULTRA CYBER EDITION                             ║
// ║   Custom animations, colors, and utilities for maximum resonance          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════
      // 🎨 COLORS - SYNTX Palette
      // ═══════════════════════════════════════════════════════════════
      colors: {
        syntx: {
          bg: '#030b15',
          dark: '#0a1628',
          darker: '#050d18',
          light: '#1a2d4a',
          cyan: '#00d4ff',
          'cyan-dim': '#0099cc',
          'cyan-bright': '#4de8ff',
          magenta: '#d946ef',
          'magenta-dim': '#a21caf',
          green: '#10b981',
          'green-bright': '#34d399',
          orange: '#f59e0b',
          'orange-bright': '#fbbf24',
          red: '#ef4444',
          'red-bright': '#f87171',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          muted: 'rgba(255, 255, 255, 0.5)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },

      // ═══════════════════════════════════════════════════════════════
      // 🔤 FONTS
      // ═══════════════════════════════════════════════════════════════
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'xxs': '0.65rem',
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },

      // ═══════════════════════════════════════════════════════════════
      // 📐 SPACING & SIZING
      // ═══════════════════════════════════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ═══════════════════════════════════════════════════════════════
      // 🌊 ANIMATIONS
      // ═══════════════════════════════════════════════════════════════
      animation: {
        // Glow & Pulse
        'glow': 'glow 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        
        // Float & Movement
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 10s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        
        // Slide Animations
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'rotate-in': 'rotateIn 0.5s ease-out forwards',
        
        // Scan & Data
        'scan': 'scanLine 2s linear infinite',
        'scan-fast': 'scanLine 1s linear infinite',
        'scan-horizontal': 'scanLineHorizontal 2s linear infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'data-stream': 'dataStream 10s linear infinite',
        
        // Shimmer & Gradient
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-slow': 'shimmer 3s linear infinite',
        'morph': 'morphGradient 8s ease infinite',
        'border-flow': 'borderFlow 3s ease infinite',
        'rainbow': 'rainbow 6s linear infinite',
        
        // Glitch & Effects
        'glitch': 'glitch 0.3s ease',
        'glitch-loop': 'glitch 0.5s ease infinite',
        'glitch-text': 'glitchText 0.5s ease infinite',
        'flicker': 'flicker 0.15s ease infinite',
        'static': 'static 0.5s steps(10) infinite',
        
        // Ring & Orbit
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ripple': 'ripple 1s ease-out infinite',
        'orbit': 'orbit 3s linear infinite',
        'orbit-slow': 'orbit 8s linear infinite',
        'orbit-reverse': 'orbit 3s linear infinite reverse',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spin 2s linear infinite reverse',
        
        // Text
        'text-glow': 'textGlow 2s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'text-reveal': 'textReveal 0.8s ease forwards',
        
        // Particles
        'particle': 'particleFloat 4s ease-in-out infinite',
        'particle-slow': 'particleFloat 8s ease-in-out infinite',
        'twinkle': 'starTwinkle 2s ease-in-out infinite',
        'firefly': 'firefly 5s ease-in-out infinite',
        
        // Progress & Loading
        'progress-glow': 'progressGlow 2s ease-in-out infinite',
        'waveform': 'waveform 1s ease-in-out infinite',
        'loading-dots': 'loadingDots 1.5s ease infinite',
        'skeleton': 'skeletonShimmer 1.5s ease infinite',
      },

      // ═══════════════════════════════════════════════════════════════
      // 🎬 KEYFRAMES
      // ═══════════════════════════════════════════════════════════════
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3)' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px var(--tw-shadow-color, rgba(0, 212, 255, 0.4))',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px var(--tw-shadow-color, rgba(0, 212, 255, 0.6)), 0 0 80px var(--tw-shadow-color, rgba(0, 212, 255, 0.3))',
            transform: 'scale(1.02)',
          },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          from: { opacity: '0', transform: 'rotate(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotate(0) scale(1)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        scanLineHorizontal: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        dataFlow: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
        dataStream: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        morphGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%', filter: 'hue-rotate(0deg)' },
          '25%': { backgroundPosition: '50% 100%' },
          '50%': { backgroundPosition: '100% 50%', filter: 'hue-rotate(15deg)' },
          '75%': { backgroundPosition: '50% 0%' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)', filter: 'none' },
          '20%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(-2px, -2px)', filter: 'hue-rotate(-90deg)' },
          '60%': { transform: 'translate(2px, 2px)', filter: 'hue-rotate(180deg)' },
          '80%': { transform: 'translate(2px, -2px)', filter: 'hue-rotate(-180deg)' },
        },
        glitchText: {
          '0%, 100%': { textShadow: '2px 0 #00d4ff, -2px 0 #d946ef', transform: 'translate(0)' },
          '25%': { textShadow: '-2px 0 #00d4ff, 2px 0 #d946ef', transform: 'translate(1px, -1px)' },
          '50%': { textShadow: '2px 0 #d946ef, -2px 0 #00d4ff', transform: 'translate(-1px, 1px)' },
          '75%': { textShadow: '-2px 0 #d946ef, 2px 0 #00d4ff', transform: 'translate(1px, 1px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '52%': { opacity: '1' },
          '54%': { opacity: '0.9' },
          '56%': { opacity: '1' },
        },
        ping: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(20px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(20px) rotate(-360deg)' },
        },
        textGlow: {
          '0%, 100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor' },
          '50%': { textShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        textReveal: {
          '0%': { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: '0' },
          '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: '1' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
          '25%': { transform: 'translate(10px, -30px) rotate(90deg)', opacity: '0.8' },
          '50%': { transform: 'translate(-5px, -60px) rotate(180deg)', opacity: '0.5' },
          '75%': { transform: 'translate(15px, -90px) rotate(270deg)', opacity: '0.8' },
          '100%': { transform: 'translate(0, -120px) rotate(360deg)', opacity: '0' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        firefly: {
          '0%, 100%': { opacity: '0', transform: 'translate(0, 0)' },
          '10%': { opacity: '1' },
          '50%': { transform: 'translate(var(--tx, 20px), var(--ty, -30px))' },
          '90%': { opacity: '1' },
        },
        progressGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #00d4ff, inset 0 0 5px #00d4ff' },
          '50%': { boxShadow: '0 0 20px #00d4ff, inset 0 0 10px #00d4ff' },
        },
        waveform: {
          '0%, 100%': { height: '20%' },
          '25%': { height: '60%' },
          '50%': { height: '100%' },
          '75%': { height: '40%' },
        },
        loadingDots: {
          '0%, 20%': { opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        skeletonShimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },

      // ═══════════════════════════════════════════════════════════════
      // 🔲 BOX SHADOW
      // ═══════════════════════════════════════════════════════════════
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 212, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.5)',
        'glow-xl': '0 0 60px rgba(0, 212, 255, 0.6), 0 0 100px rgba(0, 212, 255, 0.3)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.5)',
        'glow-magenta': '0 0 30px rgba(217, 70, 239, 0.5)',
        'glow-green': '0 0 30px rgba(16, 185, 129, 0.5)',
        'glow-orange': '0 0 30px rgba(245, 158, 11, 0.5)',
        'glow-red': '0 0 30px rgba(239, 68, 68, 0.5)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.2)',
        'cyber': '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 212, 255, 0.2)',
        'cyber-lg': '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 50px rgba(0, 212, 255, 0.3)',
      },

      // ═══════════════════════════════════════════════════════════════
      // 🖼️ BACKDROP BLUR
      // ═══════════════════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // ═══════════════════════════════════════════════════════════════
      // ⏱️ TRANSITION
      // ═══════════════════════════════════════════════════════════════
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '2000': '2000ms',
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'cyber': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      // ═══════════════════════════════════════════════════════════════
      // 🎭 Z-INDEX
      // ═══════════════════════════════════════════════════════════════
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'modal': '1000',
        'toast': '1100',
        'tooltip': '1200',
      },

      // ═══════════════════════════════════════════════════════════════
      // 🎨 BACKGROUND IMAGE
      // ═══════════════════════════════════════════════════════════════
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)',
        'scan-lines': 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },

      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
};

export default config;
