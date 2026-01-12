'use client';

import { Header } from '@/components/layout';

export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A0E27] to-[#1A1F3A]">
      {/* Header Only */}
      <Header />
      
      {/* Fullscreen Content (No Container!) */}
      <div className="relative" style={{ height: 'calc(100vh - 80px)' }}>
        {children}
      </div>
    </div>
  );
}
