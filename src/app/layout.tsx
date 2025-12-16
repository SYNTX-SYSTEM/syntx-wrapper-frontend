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
