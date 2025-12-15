'use client';

import { Card } from '@/components/ui';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';

export function SystemStats() {
  const { data, loading } = useApi(() => api.getStats(), []);

  const stats = [
    { 
      label: 'Total Requests', 
      value: data?.total_requests ?? '-', 
      color: 'text-syntx-cyan',
      glow: 'shadow-[0_0_20px_rgba(0,212,255,0.3)]'
    },
    { 
      label: 'Success Rate', 
      value: data ? `${data.success_rate}%` : '-', 
      color: 'text-syntx-green',
      glow: 'shadow-[0_0_20px_rgba(0,255,136,0.3)]'
    },
    { 
      label: 'Avg Latency', 
      value: data ? `${(data.average_latency_ms / 1000).toFixed(1)}s` : '-', 
      color: 'text-syntx-yellow',
      glow: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]'
    },
    { 
      label: 'Median', 
      value: data ? `${(data.median_latency_ms / 1000).toFixed(1)}s` : '-', 
      color: 'text-syntx-magenta',
      glow: 'shadow-[0_0_20px_rgba(255,0,255,0.3)]'
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted mb-6 flex items-center gap-2">
        <span className="text-syntx-yellow">📊</span>
        System Statistics
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-syntx-dark/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`
                p-4 rounded-lg border border-syntx-border/30 
                bg-syntx-dark/50 ${stat.glow}
                transition-all duration-300 hover:scale-105
              `}
            >
              <div className="text-xs text-syntx-muted font-mono uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wrapper Usage */}
      {data?.wrapper_usage && (
        <div className="mt-6 pt-4 border-t border-syntx-border/30">
          <div className="text-xs text-syntx-muted font-mono uppercase tracking-wider mb-3">
            Wrapper Usage
          </div>
          <div className="space-y-2">
            {Object.entries(data.wrapper_usage).map(([name, count]) => (
              <div key={name} className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-syntx-dark overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-syntx-cyan to-syntx-magenta rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(count / data.total_requests) * 100}%` 
                    }}
                  />
                </div>
                <span className="text-xs text-syntx-muted font-mono w-24 truncate">
                  {name.replace('syntex_wrapper_', '')}
                </span>
                <span className="text-xs text-syntx-cyan font-mono w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
