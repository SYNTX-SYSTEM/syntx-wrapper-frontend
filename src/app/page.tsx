"use client";
import { useState, useEffect } from "react";
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

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("system");
  const [modalOpen, setModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      alert("Upload fehlgeschlagen!");
    }
  };

  const activeTabConfig = TABS.find(t => t.id === activeTab);

  return (
    <main style={{
      minHeight: "100vh",
      padding: 32,
      fontFamily: "system-ui, sans-serif",
      color: "white",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.5s ease",
    }}>
      {/* HEADER */}
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 32,
        animation: "slideUp 0.6s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Logo */}
          <div style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(217,70,239,0.2))",
            border: "1px solid rgba(0,212,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            animation: "glow 3s ease-in-out infinite",
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: 28,
              fontWeight: 800,
              background: "linear-gradient(135deg, #00d4ff, #d946ef)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 2,
            }}>
              SYNTX
            </h1>
            <p style={{ 
              opacity: 0.5, 
              margin: 0, 
              fontSize: 12, 
              fontFamily: "monospace",
              letterSpacing: 1,
            }}>
              Field Resonance System
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* Status Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 20,
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 10px #10b981",
              animation: "pulse 2s ease-in-out infinite",
            }} />
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#10b981" }}>ONLINE</span>
          </div>

          {activeTab === "wrappers" && (
            <button
              onClick={() => setModalOpen(true)}
              className="btn-cyber"
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #00d4ff, #00a8cc)",
                color: "#030b15",
                fontWeight: 700,
                fontFamily: "monospace",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(0,212,255,0.4)",
              }}
            >
              + NEU
            </button>
          )}
        </div>
      </header>

      {/* TAB NAV */}
      <nav style={{ 
        display: "flex", 
        gap: 6, 
        marginBottom: 24,
        padding: 6,
        background: "rgba(0,0,0,0.3)",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.05)",
        animation: "slideUp 0.6s ease",
        animationDelay: "0.1s",
        animationFillMode: "backwards",
      }}>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as TabId)}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: activeTab === tab.id 
                ? `linear-gradient(135deg, ${tab.color}20, ${tab.color}10)`
                : "transparent",
              color: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              position: "relative",
              overflow: "hidden",
              boxShadow: activeTab === tab.id ? `0 0 20px ${tab.color}30` : "none",
            }}
          >
            {/* Active Indicator */}
            {activeTab === tab.id && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: "20%",
                right: "20%",
                height: 2,
                background: tab.color,
                borderRadius: 2,
                boxShadow: `0 0 10px ${tab.color}`,
              }} />
            )}
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <section style={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
        transition: "all 0.15s ease",
        animation: "slideUp 0.6s ease",
        animationDelay: "0.2s",
        animationFillMode: "backwards",
      }}>
        {activeTab === "system" && <SystemPanel />}
        {activeTab === "chat" && <ChatPanel />}
        {activeTab === "graphs" && <GraphsPanel />}
        {activeTab === "wrappers" && <WrapperControl />}
        {activeTab === "analytics" && <StatsPanel />}
        {activeTab === "flow" && <FlowPanel />}
      </section>

      {/* MODAL */}
      <CreateWrapperModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateWrapper}
      />

      {/* Corner Decorations */}
      <div style={{
        position: "fixed",
        top: 20,
        left: 20,
        width: 60,
        height: 60,
        borderTop: "2px solid rgba(0,212,255,0.2)",
        borderLeft: "2px solid rgba(0,212,255,0.2)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed",
        top: 20,
        right: 20,
        width: 60,
        height: 60,
        borderTop: "2px solid rgba(0,212,255,0.2)",
        borderRight: "2px solid rgba(0,212,255,0.2)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        width: 60,
        height: 60,
        borderBottom: "2px solid rgba(0,212,255,0.2)",
        borderLeft: "2px solid rgba(0,212,255,0.2)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderBottom: "2px solid rgba(0,212,255,0.2)",
        borderRight: "2px solid rgba(0,212,255,0.2)",
        pointerEvents: "none",
      }} />
    </main>
  );
}
