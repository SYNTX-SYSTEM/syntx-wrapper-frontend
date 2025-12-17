"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { api, StreamEvent, StatsResponse } from '@/lib/api';

interface RealtimeState {
  events: StreamEvent[];
  stats: StatsResponse | null;
  lastUpdate: Date | null;
  isLive: boolean;
  newEventCount: number;
  hasNewData: boolean;
}

export function useRealtime(interval = 5000) {
  const [state, setState] = useState<RealtimeState>({
    events: [],
    stats: null,
    lastUpdate: null,
    isLive: false,
    newEventCount: 0,
    hasNewData: false,
  });
  
  const prevEventsRef = useRef<string[]>([]);
  const [pulse, setPulse] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [streamData, statsData] = await Promise.all([
        api.getStream(50),
        api.getStats(),
      ]);

      const newEvents = streamData.events || [];
      const newEventIds = newEvents.map(e => e.request_id);
      
      // Check for new events
      const brandNewCount = newEventIds.filter(
        id => !prevEventsRef.current.includes(id)
      ).length;

      if (brandNewCount > 0 && prevEventsRef.current.length > 0) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }

      prevEventsRef.current = newEventIds;

      setState(prev => ({
        events: newEvents,
        stats: statsData,
        lastUpdate: new Date(),
        isLive: true,
        newEventCount: brandNewCount,
        hasNewData: brandNewCount > 0,
      }));

    } catch (error) {
      console.error('Realtime fetch error:', error);
      setState(prev => ({ ...prev, isLive: false }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, interval);
    return () => clearInterval(timer);
  }, [fetchData, interval]);

  return { ...state, pulse, refresh: fetchData };
}

export function useRealtimeHealth(interval = 10000) {
  const [health, setHealth] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await api.getHealth();
        setHealth(data);
        setIsOnline(data?.status?.includes('GESUND') || data?.status === 'healthy');
      } catch {
        setIsOnline(false);
      }
    };
    
    check();
    const timer = setInterval(check, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { health, isOnline };
}
