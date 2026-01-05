"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizerHeader from "./OptimizerHeader";
import SystemStatusCard from "./SystemStatusCard";
import StatsStream from "./StatsStream";
import AnalyzeButton from "./AnalyzeButton";
import SuggestionCard from "./SuggestionCard";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import FieldAnalyticsModal from "./FieldAnalyticsModal";
import RecentLogsModal from "./RecentLogsModal";
import ChangelogModal from "./ChangelogModal";

const cyberStyles = `
  @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px var(--glow-color, #00d4ff); } 50% { box-shadow: 0 0 40px var(--glow-color, #00d4ff), 0 0 60px var(--glow-color, #00d4ff); } }
  @keyframes borderFlow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
  @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px currentColor; } 50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; } }
  @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
  @keyframes slideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes scanLine { 0% { top: -10%; opacity: 0; } 50% { opacity: 0.5; } 100% { top: 110%; opacity: 0; } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes neonFlicker { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.8; } 94% { opacity: 1; } 96% { opacity: 0.9; } 97% { opacity: 1; } }
  @keyframes dataStream { 0% { background-position: 0% 0%; } 100% { background-position: 0% 100%; } }
  .cyber-card { position: relative; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
  .cyber-card:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
  .cyber-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--glow-color, #00d4ff), transparent); opacity: 0.8; }
  .cyber-btn { position: relative; overflow: hidden; transition: all 0.3s ease; }
  .cyber-btn:hover:not(:disabled) { transform: scale(1.02); filter: brightness(1.2); }
  .cyber-btn::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease; }
  .cyber-btn:hover::after { left: 100%; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .neon { animation: neonFlicker 4s infinite; }
  .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
  .scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--scan-color, #00d4ff), transparent); animation: scanLine 3s linear infinite; pointer-events: none; z-index: 10; }
  .data-stream { background: linear-gradient(180deg, rgba(0,212,255,0.03) 0%, transparent 30%, transparent 70%, rgba(217,70,239,0.03) 100%); background-size: 100% 200%; animation: dataStream 8s linear infinite; }
`;

interface Suggestion {
  suggestion_id: string;
  profile_id: string;
  field_name: string;
  confidence: number;
  patterns_to_add: string[];
  reasoning: string;
  estimated_impact: { patterns_before: number; patterns_after: number; new_patterns: number; };
}

export default function OptimizerPanel() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => { fetchSuggestions(); }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("https://dev.syntx-system.com/resonanz/scoring/autonomous/suggestions");
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerAnalysis = async () => {
    setAnalyzing(true);
    try {
      await fetch("https://dev.syntx-system.com/resonanz/scoring/autonomous/analyze?days=7&score_threshold=0.5&min_occurrences=2", { method: "POST" });
      await fetchSuggestions();
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const applySuggestion = async (id: string) => {
    try {
      await fetch(`https://dev.syntx-system.com/resonanz/scoring/autonomous/apply/${id}`, { method: "POST" });
      setSuggestions(prev => prev.filter(s => s.suggestion_id !== id));
    } catch (error) {
      console.error("Apply failed:", error);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div style={{ position: 'relative' }}>
      <style>{cyberStyles}</style>
      <OptimizerHeader />
      <SystemStatusCard />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <QuickActionButton onClick={() => setShowAnalytics(true)} label="ANALYTICS" icon="📈" color="#f59e0b" />
        <QuickActionButton onClick={() => setShowLogs(true)} label="LOGS" icon="📋" color="#00d4ff" />
        <QuickActionButton onClick={() => setShowChangelog(true)} label="CHANGELOG" icon="📜" color="#8b5cf6" />
        <div className="cyber-card" style={{ padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(217,70,239,0.4)', background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          <span style={{ color: '#d946ef', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{suggestions.length} PENDING</span>
        </div>
      </div>

      <StatsStream pending={suggestions.length} window="7d" confidence="95%" />
      <AnalyzeButton analyzing={analyzing} onAnalyze={triggerAnalysis} />
      
      {suggestions.length === 0 ? <EmptyState /> : (
        <AnimatePresence mode="popLayout">
          {suggestions.map((suggestion, idx) => (
            <SuggestionCard key={suggestion.suggestion_id} suggestion={suggestion} index={idx} onApply={() => applySuggestion(suggestion.suggestion_id)} />
          ))}
        </AnimatePresence>
      )}

      <FieldAnalyticsModal isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} />
      <RecentLogsModal isOpen={showLogs} onClose={() => setShowLogs(false)} />
      <ChangelogModal isOpen={showChangelog} onClose={() => setShowChangelog(false)} />
    </div>
  );
}

function QuickActionButton({ onClick, label, icon, color }: { onClick: () => void; label: string; icon: string; color: string }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="cyber-btn" style={{ padding: '16px 20px', borderRadius: 14, border: `1px solid ${color}40`, background: `linear-gradient(135deg, ${color}15, ${color}05)`, color: color, fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 0 20px ${color}10` }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </motion.button>
  );
}
