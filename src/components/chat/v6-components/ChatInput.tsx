"use client";

import React from 'react';

interface ChatInputProps {
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function ChatInput({ input, loading, onInputChange, onSend, onKeyDown }: ChatInputProps) {
  return (
    <div style={{
      padding: 18,
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Nachricht eingeben... (Enter zum Senden)"
          disabled={loading}
          style={{
            flex: 1, padding: '16px 18px', borderRadius: 14,
            border: '1px solid rgba(0,212,255,0.4)',
            background: 'rgba(0,0,0,0.4)',
            color: 'white', fontSize: 14, fontFamily: 'system-ui, sans-serif',
            resize: 'none', minHeight: 54, maxHeight: 150, outline: 'none',
            boxShadow: input ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
            transition: 'all 0.3s ease'
          }}
          rows={1}
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="cyber-btn"
          style={{
            padding: '16px 32px', borderRadius: 14, border: 'none',
            background: loading || !input.trim()
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
            color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#030b15',
            fontWeight: 800, fontFamily: 'monospace', fontSize: 18,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            boxShadow: loading || !input.trim() ? 'none' : '0 0 40px rgba(0,212,255,0.5)',
          }}
        >
          {loading ? '...' : '→'}
        </button>
      </div>
    </div>
  );
}
