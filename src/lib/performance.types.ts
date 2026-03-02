/**
 * Performance Tier System — Types
 *
 * Classifies devices into performance tiers at bootstrap.
 * Desktop always gets TIER_DESKTOP (full experience).
 * Mobile devices are classified as HIGH or LOW based on hardware.
 *
 * This system NEVER modifies desktop behavior.
 */

export enum PerformanceTier {
  /** Desktop (>= 1024px): Full animations, GSAP, Lenis, three.js, particles */
  DESKTOP = 'DESKTOP',

  /** High-end mobile (< 768px, good hardware): Simplified animations, no parallax, no particles */
  MOBILE_HIGH = 'MOBILE_HIGH',

  /** Low-end mobile (< 768px, weak hardware): Minimal animations, no GSAP, no three.js */
  MOBILE_LOW = 'MOBILE_LOW',
}

export interface PerformanceCapabilities {
  /** The detected performance tier */
  tier: PerformanceTier;

  /** Whether this is a mobile viewport (<= 768px) */
  isMobile: boolean;

  /** Whether smooth scroll (Lenis + GSAP) should be enabled */
  enableSmoothScroll: boolean;

  /** Whether framer-motion parallax (useScroll/useTransform) should be enabled */
  enableParallax: boolean;

  /** Whether infinite/looping animations should run */
  enableInfiniteAnimations: boolean;

  /** Whether backdrop-blur CSS effects should be applied */
  enableBlurEffects: boolean;

  /** Whether three.js / WebGL canvases should load */
  enableWebGL: boolean;

  /** Whether tsparticles should load */
  enableParticles: boolean;

  /** Whether heavy framer-motion hover/tap animations should run */
  enableHoverAnimations: boolean;
}
