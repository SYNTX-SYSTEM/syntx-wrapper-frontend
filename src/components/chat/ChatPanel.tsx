"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChatHeader } from './components';
import { useHealthCheck } from './hooks';
import { panelAPI } from '@/lib/api-wrapper-config-panel';
import type { CompletePanelData } from '@/lib/api-wrapper-config-panel';
import type { Wrapper } from '@/types/api';

// V6 Components
import {
  TypingIndicator,
  EmptyState,
  MessageBubble,
  ChatInput,
} from './v6-components';

// Sidebar Components
import {
  WrapperSelector,
  FormatCard,
  FormatModal,
  LivePromptPreview,
  PromptModal,
  SettingsPanel,
  SessionPanel,
  SessionScores,
  GlassCard,
} from './sidebar';

// ═══════════════════════════════════════════════════════════════
// 🎨 CYBER STYLES
// ═══════════════════════════════════════════════════════════════
const cyberStyles = `
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes slideIn {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanLine {
    0% { top: -10%; opacity: 0; }
    50% { opacity: 0.5; }
    100% { top: 110%; opacity: 0; }
  }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-8px); opacity: 1; }
  }
  @keyframes scoreReveal {
    0% { opacity: 0; transform: scale(0.8) translateY(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes dataStream {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.8; }
    94% { opacity: 1; }
    96% { opacity: 0.9; }
    97% { opacity: 1; }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .cyber-card {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cyber-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  .cyber-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--glow-color, #00d4ff), transparent);
    opacity: 0.8;
  }
  .cyber-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .cyber-btn:hover:not(:disabled) {
    transform: scale(1.02);
    filter: brightness(1.2);
  }
  .cyber-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  .cyber-btn:hover::after { left: 100%; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .neon { animation: neonFlicker 4s infinite; }
  .scan-line {
    position: absolute;
    left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--scan-color, #00d4ff), transparent);
    animation: scanLine 3s linear infinite;
    pointer-events: none;
  }
  .score-tag { animation: scoreReveal 0.4s ease-out backwards; }
  .dropdown-menu { animation: slideIn 0.2s ease-out; }
  .data-stream {
    background: linear-gradient(180deg, rgba(0,212,255,0.03) 0%, transparent 30%, transparent 70%, rgba(217,70,239,0.03) 100%);
    background-size: 100% 200%;
    animation: dataStream 8s linear infinite;
  }
`;

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  scores?: Array<{ field: string; score: number; maxScore: number }>;
}

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function ChatPanel() {
  const isMobile = useIsMobile();
  const { isHealthy } = useHealthCheck();
  
  // STATE
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [selectedWrapper, setSelectedWrapper] = useState<string>('');
  const [panelData, setPanelData] = useState<CompletePanelData | null>(null);
  const [formatModalOpen, setFormatModalOpen] = useState(false);
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [panelLoading, setPanelLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(500);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // LOAD WRAPPERS
  useEffect(() => {
    panelAPI.getWrappersList().then(data => {
      setWrappers(data);
      const active = data.find(w => w.is_active);
      if (active) {
        setSelectedWrapper(active.name);
        loadPanelData(active.name);
      }
    });
  }, []);

  // LOAD PANEL DATA
  const loadPanelData = async (wrapperName: string) => {
    setPanelLoading(true);
    try {
      const data = await panelAPI.loadCompletePanelData(wrapperName);
      setPanelData(data);
    } catch (err) {
      console.error('Failed to load panel data:', err);
      setPanelData(null);
    } finally {
      setPanelLoading(false);
    }
  };

  // HANDLE WRAPPER CHANGE
  const handleWrapperChange = (name: string) => {
    setSelectedWrapper(name);
    loadPanelData(name);
  };

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // GENERATE SCORES (DYNAMIC FROM FORMAT!)
  const generateScores = (response: string) => {
    const fields = panelData?.format_details?.fields || [];
    if (fields.length === 0) return [];
    
    const len = response.length;
    return fields.map(field => ({
      field: field.name,
      score: Math.min(10, Math.max(5, Math.floor(Math.random() * 3) + 7 + (len > 500 ? 1 : 0))),
      maxScore: 10
    }));
  };

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await panelAPI.sendChat({
        prompt: userMessage.content,
        mode: selectedWrapper,
        max_new_tokens: maxTokens
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        isUser: false,
        wrapper: selectedWrapper,
        latency: response.metadata.latency_ms,
        timestamp: new Date(),
        scores: generateScores(response.response),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: `❌ Error: ${err.message}`,
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  // STATS
  const aiMessageCount = messages.filter(m => !m.isUser).length;
  const totalLatency = messages.reduce((sum, m) => sum + (m.latency || 0), 0);
  const avgLatency = aiMessageCount > 0 ? totalLatency / aiMessageCount : 0;

  return (
    <div style={{ position: 'relative' }}>
      <style>{cyberStyles}</style>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
        gap: 20,
        height: 'calc(100vh - 200px)',
        minHeight: 600
      }}>
        {/* MAIN CHAT */}
        <GlassCard style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }} glowColor="#d946ef">
          <ChatHeader 
            messageCount={messages.length}
            responseCount={aiMessageCount}
            isHealthy={isHealthy}
            onClear={clearChat}
          />

          <div className="data-stream" style={{
            flex: 1, overflowY: 'auto', padding: 22,
            display: 'flex', flexDirection: 'column'
          }}>
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {messages.map(msg => (
                  <MessageBubble
                    key={msg.id}
                    message={msg.content}
                    isUser={msg.isUser}
                    wrapper={msg.wrapper}
                    latency={msg.latency}
                    timestamp={msg.timestamp}
                    scores={msg.scores}
                    isMobile={isMobile}
                  />
                ))}
                {loading && (
                  <div style={{ 
                    display: 'flex', justifyContent: 'flex-start', marginBottom: 20 
                  }}>
                    <div style={{
                      padding: '0', borderRadius: '20px 20px 20px 4px',
                      background: 'linear-gradient(145deg, rgba(217,70,239,0.12), rgba(217,70,239,0.04))',
                      border: '1px solid rgba(217,70,239,0.4)'
                    }}>
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            input={input}
            loading={loading}
            onInputChange={setInput}
            onSend={sendMessage}
            onKeyDown={handleKeyDown}
          />
        </GlassCard>

        {/* SIDEBAR */}
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
            <GlassCard style={{ padding: 16, position: 'relative', zIndex: 500 }} glowColor="#f59e0b">
              <WrapperSelector
                wrappers={wrappers}
                selectedWrapper={selectedWrapper}
                onWrapperChange={handleWrapperChange}
                loading={panelLoading}
              />
            </GlassCard>

            <FormatCard
              profileWeight={panelData?.mapping?.resonanz_score}
              profileId={panelData?.mapping?.profile_id}
              scoringId={panelData?.profile_id}
              selectedFormat={panelData?.format_name || ''}
              formatDetails={panelData?.format_details || null}
              loading={panelLoading}
              onOpenModal={() => setFormatModalOpen(true)}
            />

            <GlassCard 
              style={{ padding: 16, cursor: 'pointer' }} 
              glowColor="#00d4ff"
              
            >
              <LivePromptPreview 
                wrapperContent={panelData?.mistral_wrapper.content || ''} 
                loading={panelLoading}
                onOpenModal={() => setPromptModalOpen(true)}
              />
            </GlassCard>

            <GlassCard style={{ padding: 16 }} glowColor="#00d4ff">
              <SettingsPanel
                maxTokens={maxTokens}
                onMaxTokensChange={setMaxTokens}
                loading={loading}
              />
            </GlassCard>

            <GlassCard style={{ padding: 16 }} glowColor="#00d4ff">
              <SessionPanel
                aiMessageCount={aiMessageCount}
                totalLatency={totalLatency}
                avgLatency={avgLatency}
              />
            </GlassCard>

            <GlassCard style={{ padding: 16, flex: 1 }} glowColor="#10b981">
              <div style={{
                fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
                marginBottom: 12, letterSpacing: 2,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span className="pulse">🏆</span> SESSION SCORES
              </div>
              <SessionScores messages={messages} />
            </GlassCard>
          </div>
        )}
        
        <PromptModal
          isOpen={promptModalOpen}
          onClose={() => setPromptModalOpen(false)}
          wrapperName={selectedWrapper}
          content={panelData?.mistral_wrapper.content || ''}
        />
        
        <FormatModal
          isOpen={formatModalOpen}
          onClose={() => setFormatModalOpen(false)}
          formatName={panelData?.format_name || ''}
          formatDetails={panelData?.format_details || null}
        />
      </div>
    </div>
  );
}
