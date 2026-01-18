'use client';

import { Card } from '@/components/ui';
import { useApi } from '@/hooks/useApi';
import { statsAPI } from '@/lib/api';

export function SystemStats() {
  const { data, loading } = useApi(() => statsAPI.getStats(), []);

  const stats = [
    { 
      label: 'Total Requests', 
      value: data?.total_requests || 0,
      icon: '📡',
      color: 'text-syntx-cyan'
    },
    { 
      label: 'Success Rate', 
      value: `${data?.success_rate || 0}%`,
      icon: '✅',
      color: 'text-syntx-green'
    },
    { 
      label: 'Avg Latency', 
      value: `${((data?.average_latency_ms || 0) / 1000).toFixed(2)}s`,
      icon: '⚡',
      color: 'text-syntx-orange'
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-20 bg-syntx-dark/50 rounded" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-syntx-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Wrapper Usage */}
      {data?.wrapper_usage && Object.keys(data.wrapper_usage).length > 0 && (
        <Card className="p-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-syntx-muted mb-4 flex items-center gap-2">
            <span className="text-syntx-magenta">📦</span>
            Wrapper Usage
          </h3>
          <div className="space-y-3">
            {Object.entries(data.wrapper_usage).map(([name, count]) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-syntx-text font-mono">{name}</span>
                  <span className="text-xs text-syntx-cyan font-mono">
                    {count as number} ({Math.round(((count as number) / data.total_requests) * 100)}%)
                  </span>
                </div>
                <div className="h-2 bg-syntx-dark/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-syntx-cyan to-syntx-magenta rounded-full transition-all duration-500"
                    style={{ 
                      width: `${((count as number) / data.total_requests) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
