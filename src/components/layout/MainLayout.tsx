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
