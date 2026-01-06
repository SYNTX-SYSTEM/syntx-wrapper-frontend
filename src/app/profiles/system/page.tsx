'use client';

import Image from 'next/image';

export default function ProfilesSystemPage() {
  return (
    <div className="h-screen bg-gray-950 flex flex-col items-center justify-center">
      <Image 
        src="/logo_original.png" 
        alt="SYNTX" 
        width={200} 
        height={200}
        className="mb-8"
      />
      <div className="text-cyan-300 font-mono text-4xl mb-4">
        🧠 SYSTEM DIAGNOSTICS
      </div>
      <div className="text-green-400 font-mono text-xl">
        ✅ PAGE IS LOADING!
      </div>
    </div>
  );
}
