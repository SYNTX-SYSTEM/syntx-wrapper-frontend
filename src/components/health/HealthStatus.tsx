'use client';
import { Card, StatusBadge } from '@/components/ui';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';

export function HealthStatus() {
  const { data, loading, error, refetch } = useApi(() => api.getHealth(), []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted flex items-center gap-2">
          <span className="text-syntx-green">🏥</span>
          System Health
        </h2>
        <button
          onClick={refetch}
          className="text-xs text-syntx-muted hover:text-syntx-cyan transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-syntx-cyan animate-pulse" />
          <span className="text-syntx-muted text-sm">Connecting...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3">
          <StatusBadge status="error" label="OFFLINE" />
          <span className="text-syntx-red text-xs">{error.message}</span>
        </div>
      ) : data ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <StatusBadge 
              status={data.status === 'healthy' ? 'healthy' : 'error'} 
              label={data.status.toUpperCase()} 
            />
            <span className="text-xs text-syntx-muted font-mono">v{data.version}</span>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
