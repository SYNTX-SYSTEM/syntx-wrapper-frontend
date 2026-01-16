import { useState, useEffect, useCallback } from 'react';

type HealthStatus = {
  isHealthy: boolean;
  lastCheck: Date;
  failCount: number;
};

export function useHealthCheck(checkInterval = 30000) {
  const [status, setStatus] = useState<HealthStatus>({
    isHealthy: true,
    lastCheck: new Date(),
    failCount: 0,
  });

  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = useCallback(async () => {
    // Prevent multiple simultaneous checks
    if (isChecking) return;
    
    setIsChecking(true);
    
    try {
      const response = await fetch('/health', {
        method: 'GET',
        cache: 'no-store',
      });

      if (response.ok) {
        setStatus({
          isHealthy: true,
          lastCheck: new Date(),
          failCount: 0,
        });
      } else {
        setStatus(prev => ({
          isHealthy: false,
          lastCheck: new Date(),
          failCount: prev.failCount + 1,
        }));
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setStatus(prev => ({
        isHealthy: false,
        lastCheck: new Date(),
        failCount: prev.failCount + 1,
      }));
    } finally {
      setIsChecking(false);
    }
  }, [isChecking]);

  useEffect(() => {
    // Initial check
    checkHealth();

    // Set up interval
    const interval = setInterval(checkHealth, checkInterval);

    // Cleanup
    return () => clearInterval(interval);
  }, [checkInterval]); // Remove checkHealth from deps to prevent loop

  return { status, checkHealth };
}
