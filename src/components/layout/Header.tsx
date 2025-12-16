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
              status={health?.status === 'healthy' ? 'healthy' : 'loading'}
              label={health?.status === 'healthy' ? 'RESONATING' : 'CONNECTING'}
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
