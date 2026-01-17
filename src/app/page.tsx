"use client";
import { useState } from "react";
import Image from "next/image";
import { WrapperPanel as WrapperControl } from "@/components/wrappers";
import CreateWrapperModal from "@/components/wrappers/CreateWrapperModal";
import StatsPanel from "@/components/analytics/StatsPanel";
import FlowPanel from "@/components/flow/FlowPanel";
import AlchemyPanel from "@/components/alchemy/AlchemyPanel";
import DiffPanel from "@/components/diff/DiffPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import GraphsPanel from "@/components/graphs/GraphsPanel";
import SystemPanel from "@/components/system/SystemPanel";
import DataPanel from "@/components/data/DataPanel";
import FormatPanel from "@/components/formats/FormatPanel";
import { OptimizerPanel } from "@/components/optimizer";
import ProfileOrgan from "@/components/profiles/ProfileOrgan";
import ScoringOrgan from "@/components/scoring/ScoringOrgan";
import { OracleWithBirth } from "@/components/oracle/OracleWithBirth";
import { ProfilesPanel } from "@/components/profiles/system-organs";

type TabId = "data" | "system" | "chat" | "chat-v6" | "graphs" | "wrappers" | "formats" | "analytics" | "flow" | "alchemy" | "diff" | "optimizer" | "profiles" | "profile-organ" | "scoring" | "oracle";

const TABS = [
  { id: "data", label: "DATA", icon: "📊", color: "#8b5cf6" },
  { id: "system", label: "SYSTEM", icon: "🖥️", color: "#10b981" },
  { id: "chat", label: "CHAT", icon: "💬", color: "#00d4ff" },
  { id: "chat-v6", label: "CHAT v6.1", icon: "🔥", color: "#d946ef" },
  { id: "graphs", label: "GRAPHS", icon: "📈", color: "#d946ef" },
  { id: "wrappers", label: "WRAPPERS", icon: "📦", color: "#f59e0b" },
  { id: "formats", label: "FORMATS", icon: "📋", color: "#14b8a6" },
  { id: "analytics", label: "ANALYTICS", icon: "📊", color: "#00d4ff" },
  { id: "flow", label: "FLOW", icon: "🌊", color: "#10b981" },
  { id: "alchemy", label: "ALCHEMY", icon: "⚗️", color: "#d946ef" },
  { id: "diff", label: "DIFF", icon: "🔀", color: "#8b5cf6" },
  { id: "optimizer", label: "OPTIMIZER", icon: "🤖", color: "#00d4ff" },
  { id: "profiles", label: "PROFILES", icon: "👤", color: "#8b5cf6" },
  { id: "scoring", label: "SCORING", icon: "💎", color: "#9d00ff" },
  { id: "oracle", label: "ORACLE", icon: "👁️", color: "#d946ef" },
  { id: "profile-organ", label: "PROFILE ORGAN", icon: "🧬", color: "#00ff9d" },
] as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("chat-v6");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const renderPanel = () => {
    switch (activeTab) {
      case "data": return <DataPanel />;
      case "system": return <SystemPanel />;
      case "chat": return <div style={{ padding: 40, color: 'white' }}>OLD CHAT (Legacy)</div>;
      case "chat-v6": return <ChatPanel />;
      case "graphs": return <GraphsPanel />;
      case "wrappers": return <WrapperControl onCreateNew={() => setCreateModalOpen(true)} />;
      case "formats": return <FormatPanel />;
      case "analytics": return <StatsPanel />;
      case "flow": return <FlowPanel />;
      case "alchemy": return <AlchemyPanel />;
      case "diff": return <DiffPanel />;
      case "optimizer": return <OptimizerPanel />;
      case "profiles": return <ProfilesPanel />;
      case "scoring": return <ScoringOrgan />;
      case "oracle": return <OracleWithBirth />;
      case "profile-organ": return <ProfileOrgan />;
      default: return null;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#0a0e27' }}>
      {/* HEADER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(10, 14, 39, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 24px', gap: 16 }}>
          <Image src="/logo.png" alt="SYNTX" width={35} height={35} />
          <div style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 700, fontFamily: 'Orbitron, monospace', letterSpacing: '2px' }}>SYNTX</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  background: activeTab === tab.id ? 'rgba(0,212,255,0.15)' : 'transparent',
                  border: `1px solid ${activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '6px',
                  color: activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.6)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'JetBrains Mono, monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ position: 'relative' }}>
        {renderPanel()}
      </div>

      {createModalOpen && <CreateWrapperModal onClose={() => setCreateModalOpen(false)} />}
    </div>
  );
}
