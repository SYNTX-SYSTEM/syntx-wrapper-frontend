"use client";

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
  addToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const colors = {
    info: { bg: 'rgba(0,212,255,0.15)', border: '#00d4ff', text: '#00d4ff' },
    success: { bg: 'rgba(16,185,129,0.15)', border: '#10b981', text: '#10b981' },
    warning: { bg: 'rgba(245,158,11,0.15)', border: '#f59e0b', text: '#f59e0b' },
    error: { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', text: '#ef4444' },
  };

  const icons = {
    info: '📡',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {toasts.map((toast, i) => (
          <div
            key={toast.id}
            style={{
              padding: '12px 20px',
              background: colors[toast.type].bg,
              border: `1px solid ${colors[toast.type].border}`,
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              animation: 'slideIn 0.3s ease',
              boxShadow: `0 0 20px ${colors[toast.type].border}40`,
            }}
          >
            <span style={{ fontSize: 16 }}>{icons[toast.type]}</span>
            <span style={{
              fontSize: 12,
              fontFamily: 'monospace',
              color: colors[toast.type].text,
            }}>
              {toast.message}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
