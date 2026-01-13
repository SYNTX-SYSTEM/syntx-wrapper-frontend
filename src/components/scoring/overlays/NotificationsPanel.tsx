'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

export default function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 9999,
      width: 350,
    }}>
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              border: `2px solid ${notif.type === 'success' ? '#00ff88' : notif.type === 'error' ? '#ff3355' : '#9d00ff'}`,
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: 12,
              boxShadow: `0 0 20px ${notif.type === 'success' ? 'rgba(0,255,136,0.5)' : notif.type === 'error' ? 'rgba(255,51,85,0.5)' : 'rgba(157,0,255,0.5)'}`,
            }}
          >
            <div style={{
              color: notif.type === 'success' ? '#00ff88' : notif.type === 'error' ? '#ff3355' : '#9d00ff',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 700,
              textShadow: `0 0 10px ${notif.type === 'success' ? 'rgba(0,255,136,0.8)' : notif.type === 'error' ? 'rgba(255,51,85,0.8)' : 'rgba(157,0,255,0.8)'}`,
            }}>
              💎 {notif.message}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
