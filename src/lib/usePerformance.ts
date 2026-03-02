/**
 * usePerformance — React hook for performance-gated rendering
 *
 * Returns cached PerformanceCapabilities. Does NOT cause re-renders
 * because the value is computed once at bootstrap and never changes.
 *
 * Usage:
 *   const { isMobile, enableParallax } = usePerformance();
 */

import { useMemo } from 'react';
import { getPerformanceCapabilities } from './performance-detector';
import type { PerformanceCapabilities } from './performance.types';

export function usePerformance(): PerformanceCapabilities {
  // useMemo with empty deps — computed once per component lifetime
  // getPerformanceCapabilities() itself is a cached singleton
  return useMemo(() => getPerformanceCapabilities(), []);
}
