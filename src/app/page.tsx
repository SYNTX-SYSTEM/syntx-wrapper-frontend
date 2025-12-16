"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import WrapperControl from "@/components/wrappers/WrapperControl";
import CreateWrapperModal from "@/components/wrappers/CreateWrapperModal";
import StatsPanel from "@/components/analytics/StatsPanel";
import FlowPanel from "@/components/flow/FlowPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import GraphsPanel from "@/components/graphs/GraphsPanel";
import SystemPanel from "@/components/system/SystemPanel";
import { api } from "@/lib/api";

type TabId = "system" | "chat" | "graphs" | "wrappers" | "analytics" | "flow";

const TABS = [
  { id: "system", label: "SYSTEM", icon: "🖥️", color: "#10b981" },
  { id: "chat", label: "CHAT", icon: "💬", color: "#00d4ff" },
  { id: "graphs", label: "GRAPHS", icon: "📈", color: "#d946ef" },
  { id: "wrappers", label: "WRAPPERS", icon: "📦", color: "#f59e0b" },
  { id: "analytics", label: "ANALYTICS", icon: "📊", color: "#00d4ff" },
  { id: "flow", label: "FLOW", icon: "🌊", color: "#10b981" },
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
          <Image src="/logo.png" alt="SYNTX" width={120} height={120} style={{ filter: "drop-shadow(0 0 30px rgba(0,212,255,0.5))" }} />
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

export default function Page() {
  const [showHero, setShowHero] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("system");
  const [modalOpen, setModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      const blob = new Blob([data.content], { type: "text/plain" });
      const file = new File([blob], `${data.name}.txt`, { type: "text/plain" });
      await api.uploadWrapperMeta(file, { name: data.name, frequency: data.level });
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
            <Image src="/logo.png" alt="SYNTX" width={35} height={35} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SYNTX</h1>
            <p style={{ opacity: 0.4, margin: 0, fontSize: 10, fontFamily: "monospace", fontStyle: "italic" }}>The resonance that governs AI</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#10b981" }}>RESONATING</span>
          </div>
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
        {activeTab === "system" && <SystemPanel />}
        {activeTab === "chat" && <ChatPanel />}
        {activeTab === "graphs" && <GraphsPanel />}
        {activeTab === "wrappers" && <WrapperControl />}
        {activeTab === "analytics" && <StatsPanel />}
        {activeTab === "flow" && <FlowPanel />}
      </section>

      <CreateWrapperModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateWrapper} />
    </main>
  );
}
