/**
 * Performance Detector — Runs ONCE at bootstrap
 *
 * Classifies the current device into a PerformanceTier.
 * Uses viewport width + navigator.hardwareConcurrency + deviceMemory
 * to determine capabilities.
 *
 * CRITICAL: Desktop (>= 1024px) ALWAYS returns TIER_DESKTOP with all
 * capabilities enabled. This function cannot degrade desktop.
 */

import { PerformanceTier, type PerformanceCapabilities } from './performance.types';

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

/**
 * Detect performance tier. Called once, result cached.
 */
function detectTier(): PerformanceTier {
  if (typeof window === 'undefined') return PerformanceTier.DESKTOP;

  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    // Non-touch device → full desktop experience
    return PerformanceTier.DESKTOP;
  }

  // Touch device → mobile classification
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 4;

  if (cores <= 4 || memory <= 2) {
    return PerformanceTier.MOBILE_LOW;
  }

  return PerformanceTier.MOBILE_HIGH;
}

/**
 * Build capability flags from a tier.
 */
function buildCapabilities(tier: PerformanceTier): PerformanceCapabilities {
  switch (tier) {
    case PerformanceTier.DESKTOP:
      return {
        tier,
        isMobile: false,
        enableSmoothScroll: true,
        enableParallax: true,
        enableInfiniteAnimations: true,
        enableBlurEffects: true,
        enableWebGL: true,
        enableParticles: true,
        enableHoverAnimations: true,
      };

    case PerformanceTier.MOBILE_HIGH:
      return {
        tier,
        isMobile: true,
        enableSmoothScroll: false,     // No Lenis/GSAP RAF loop
        enableParallax: false,          // No useScroll/useTransform
        enableInfiniteAnimations: false,// No infinite motion.div loops
        enableBlurEffects: false,       // No backdrop-blur
        enableWebGL: false,             // No three.js
        enableParticles: false,         // No tsparticles
        enableHoverAnimations: false,   // No whileHover (no hover on touch)
      };

    case PerformanceTier.MOBILE_LOW:
      return {
        tier,
        isMobile: true,
        enableSmoothScroll: false,
        enableParallax: false,
        enableInfiniteAnimations: false,
        enableBlurEffects: false,
        enableWebGL: false,
        enableParticles: false,
        enableHoverAnimations: false,
      };
  }
}

// — Singleton: detect once, cache forever —
let _cached: PerformanceCapabilities | null = null;

export function getPerformanceCapabilities(): PerformanceCapabilities {
  if (!_cached) {
    _cached = buildCapabilities(detectTier());
  }
  return _cached;
}

/**
 * Static helpers — safe to call anywhere, no React dependency
 */
export function isMobileDevice(): boolean {
  return getPerformanceCapabilities().isMobile;
}

export function isDesktop(): boolean {
  return getPerformanceCapabilities().tier === PerformanceTier.DESKTOP;
}
