'use client';

import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { StreamEvent } from '@/types/api';

const STAGE_COLORS: Record<string, string> = {
  '1_INCOMING': 'text-gray-400 border-gray-500/30',
  '2_WRAPPERS_LOADED': 'text-blue-400 border-blue-500/30',
  '3_FIELD_CALIBRATED': 'text-yellow-400 border-yellow-500/30',
  '4_BACKEND_FORWARD': 'text-fuchsia-400 border-fuchsia-500/30',
  '5_RESPONSE': 'text-syntx-green border-syntx-green/30',
};

export function FieldStream() {
  const [limit, setLimit] = useState(10);
  const { data, loading, refetch } = useApi(() => api.getStream(limit), [limit]);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted flex items-center gap-2">
          <span className="text-syntx-cyan">🌊</span>
          Field Stream
          <span className="text-syntx-cyan/50">— Live Events</span>
        </h2>
        <div className="flex items-center gap-2">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-syntx-dark border border-syntx-border/50 rounded px-2 py-1 text-xs text-syntx-muted"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <Button variant="ghost" size="sm" onClick={refetch}>
            ↻
          </Button>
        </div>
      </div>

      <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="h-10 rounded bg-syntx-dark/50 animate-pulse" />
          ))
        ) : data?.events.length ? (
          data.events.map((event, i) => (
            <StreamEventRow key={`${event.request_id}-${event.stage}-${i}`} event={event} />
          ))
        ) : (
          <div className="text-center py-8 text-syntx-muted text-sm">
            No events yet
          </div>
        )}
      </div>
    </Card>
  );
}

function StreamEventRow({ event }: { event: StreamEvent }) {
  const stageKey = event.stage as keyof typeof STAGE_COLORS;
  const colorClass = STAGE_COLORS[stageKey] || 'text-syntx-muted border-syntx-border/30';
  const stageName = event.stage?.split('_').slice(1).join(' ') || event.stage;

  return (
    <div className={`
      flex items-center gap-3 px-3 py-2 rounded-lg border
      bg-syntx-dark/30 ${colorClass}
      hover:bg-syntx-dark/50 transition-colors cursor-pointer
    `}>
      <span className="text-xs text-syntx-muted/70 font-mono w-16">
        {new Date(event.timestamp).toLocaleTimeString()}
      </span>
      <span className={`text-xs font-mono font-medium w-24 ${colorClass.split(' ')[0]}`}>
        {stageName}
      </span>
      <span className="text-xs text-syntx-muted font-mono flex-1 truncate">
        {event.request_id?.slice(0, 12)}...
      </span>
      {event.latency_ms && (
        <span className="text-xs text-syntx-cyan font-mono">
          {event.latency_ms}ms
        </span>
      )}
    </div>
  );
}
