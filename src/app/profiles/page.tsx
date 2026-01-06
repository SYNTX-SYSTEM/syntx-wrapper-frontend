// ═══════════════════════════════════════════════════════════════════════════
// 📊 PROFILES PAGE - System Diagnostics View
// ═══════════════════════════════════════════════════════════════════════════

import { Suspense } from 'react';
import { ProfilesPanel } from '@/components/profiles/system-organs';

function ProfilesLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="text-cyan-300 font-mono text-lg animate-pulse">
        LOADING SYSTEM ORGANS...
      </div>
    </div>
  );
}

export default function ProfilesPage() {
  return (
    <Suspense fallback={<ProfilesLoading />}>
      <ProfilesPanel />
    </Suspense>
  );
}
