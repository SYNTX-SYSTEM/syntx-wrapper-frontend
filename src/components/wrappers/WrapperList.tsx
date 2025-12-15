'use client';

import { Card, Button, StatusBadge } from '@/components/ui';
import { useApi, useMutation } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Wrapper } from '@/types/api';

const FREQUENCY_MAP: Record<string, { label: string; color: string }> = {
  'human': { label: 'LOW', color: 'text-syntx-green border-syntx-green/30 bg-syntx-green/10' },
  'sigma': { label: 'MEDIUM', color: 'text-syntx-yellow border-syntx-yellow/30 bg-syntx-yellow/10' },
  'deepsweep': { label: 'HIGH', color: 'text-syntx-magenta border-syntx-magenta/30 bg-syntx-magenta/10' },
};

export function WrapperList() {
  const { data, loading, refetch } = useApi(() => api.getWrappers(), []);
  const { mutate: activate, loading: activating } = useMutation(api.activateWrapper);

  const handleActivate = async (name: string) => {
    try {
      await activate(name);
      refetch();
    } catch (err) {
      console.error('Failed to activate:', err);
    }
  };

  const getFrequency = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('human')) return FREQUENCY_MAP.human;
    if (lower.includes('sigma')) return FREQUENCY_MAP.sigma;
    if (lower.includes('deepsweep')) return FREQUENCY_MAP.deepsweep;
    return { label: 'CUSTOM', color: 'text-syntx-cyan border-syntx-cyan/30 bg-syntx-cyan/10' };
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-syntx-muted flex items-center gap-2">
          <span className="text-syntx-magenta">📦</span>
          Wrapper Frequency Bands
        </h2>
        <Button variant="ghost" size="sm" onClick={refetch}>↻</Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-syntx-dark/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data?.wrappers.map((wrapper) => (
            <div key={wrapper.name} className={`
              relative p-4 rounded-xl border transition-all duration-300
              ${wrapper.is_active 
                ? 'border-syntx-cyan bg-syntx-cyan/5 shadow-glow-cyan' 
                : 'border-syntx-border/30 bg-syntx-dark/30 hover:border-syntx-border'}
            `}>
              {wrapper.is_active && (
                <div className="absolute top-3 right-3">
                  <StatusBadge status="healthy" label="ACTIVE" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${getFrequency(wrapper.name).color}`}>
                  {getFrequency(wrapper.name).label}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm text-syntx-text mb-1">
                    {wrapper.name.replace('syntex_wrapper_', '').toUpperCase()}
                  </div>
                  <div className="text-xs text-syntx-muted">
                    {wrapper.size_human} • {new Date(wrapper.last_modified).toLocaleDateString()}
                  </div>
                </div>
                {!wrapper.is_active && (
                  <Button variant="secondary" size="sm" onClick={() => handleActivate(wrapper.name)} loading={activating}>
                    ACTIVATE
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
