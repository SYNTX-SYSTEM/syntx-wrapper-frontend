"use client";
import { useState } from "react";
import WrapperControl from "@/components/wrappers/WrapperControl";
import CreateWrapperModal from "@/components/wrappers/CreateWrapperModal";
import StatsPanel from "@/components/analytics/StatsPanel";
import FlowPanel from "@/components/flow/FlowPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import GraphsPanel from "@/components/graphs/GraphsPanel";
import { api } from "@/lib/api";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"chat" | "wrappers" | "analytics" | "flow" | "graphs">("graphs");
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #030b15, #0a1628)",
      color: "white",
      padding: 32,
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0 }}>SYNTX</h1>
          <p style={{ opacity: 0.6, margin: 0 }}>Field Resonance System</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {activeTab === "wrappers" && (
            <button
              onClick={() => setModalOpen(true)}
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #00d4ff, #00a8cc)",
                color: "#030b15",
                fontWeight: 700,
                fontFamily: "monospace",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(0,212,255,0.3)",
              }}
            >
              + NEU
            </button>
          )}
        </div>
      </header>

      {/* TAB NAV */}
      <nav style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[
          { id: "chat", label: "💬 CHAT" },
          { id: "graphs", label: "📈 GRAPHS" },
          { id: "wrappers", label: "📦 WRAPPERS" },
          { id: "analytics", label: "📊 ANALYTICS" },
          { id: "flow", label: "🌊 FLOW" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: activeTab === tab.id ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
              background: activeTab === tab.id ? "rgba(0,212,255,0.1)" : "transparent",
              color: activeTab === tab.id ? "#00d4ff" : "rgba(255,255,255,0.5)",
              fontFamily: "monospace",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <section>
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
    </main>
  );
}
