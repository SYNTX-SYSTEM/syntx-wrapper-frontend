'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { FieldFlowVisualizer } from '@/components/flow';
import { useMutation } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { ChatResponse } from '@/types/api';

export function ChatInterface() {
  const [prompt, setPrompt] = useState('');
  const [activeStage, setActiveStage] = useState(0);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const { mutate: sendChat, loading } = useMutation(api.chat);

  useEffect(() => {
    if (loading) {
      setActiveStage(1);
      let i = 1;
      const interval = setInterval(() => {
        i++;
        if (i <= 4) setActiveStage(i);
      }, 800);
      return () => clearInterval(interval);
    } else if (response) {
      setActiveStage(5);
      setTimeout(() => setActiveStage(0), 2000);
    }
  }, [loading, response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    setResponse(null);
    try {
      const result = await sendChat({ prompt });
      setResponse(result);
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <FieldFlowVisualizer activeStage={activeStage} processing={loading} />
      
      <Card className="p-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted mb-6 flex items-center gap-2">
          <span className="text-syntx-cyan">💬</span>
          Resonance Chat
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                disabled={loading}
              />
            </div>
            <Button type="submit" loading={loading} glow>
              ⚡ SEND
            </Button>
          </div>
        </form>

        <div className={`min-h-[150px] p-4 rounded-xl border transition-all duration-500
          ${response ? 'border-syntx-cyan/30 bg-syntx-cyan/5' : 'border-syntx-border/30 bg-syntx-dark/30'}`}>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="flex items-center gap-3 text-syntx-cyan">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                <span className="ml-2 text-sm font-mono">Processing...</span>
              </div>
            </div>
          ) : response ? (
            <div className="space-y-4">
              <p className="text-syntx-text leading-relaxed">{response.response}</p>
              <div className="pt-4 border-t border-syntx-border/30 flex flex-wrap gap-4 text-xs font-mono">
                <span className="text-syntx-muted">
                  Latency: <span className="text-syntx-cyan">{response.metadata.latency_ms}ms</span>
                </span>
                <span className="text-syntx-muted">
                  Wrapper: <span className="text-syntx-magenta">
                    {response.metadata.wrapper_chain?.[0]?.replace('syntex_wrapper_', '').toUpperCase()}
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-syntx-muted text-sm">
              Enter a prompt and click ⚡ SEND
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
