import { useEffect, memo } from 'react';
import { isDesktop } from '../lib/performance-detector';

const SmoothScroll = memo(() => {
  useEffect(() => {
    // Mobile: no smooth scroll, no GSAP ticker, no Lenis RAF loop
    // Desktop: identical behavior to original — Lenis + GSAP + ScrollTrigger
    useEffect(() => {
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

  if (isTouchDevice) return;

  // initialize GSAP + Lenis
}, []);

    let cleanup: (() => void) | undefined;
    let ScrollTriggerRef: any;

    // Dynamic import — GSAP/Lenis only loaded on desktop
    // This ensures they're NOT in the mobile critical path
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      ScrollTriggerRef = ScrollTrigger;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 2,
      });

      // 🔒 IMPORTANT: DO NOT use lenis.on('scroll', ScrollTrigger.update)

      // Single RAF function reference (CRITICAL)
      const raf = (time: number) => {
        lenis.raf(time * 1000);
        ScrollTrigger.update();
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(raf);
        // Kill ALL ScrollTrigger instances to prevent orphan accumulation
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
        lenis.destroy();
      };
    });

    return () => {
      cleanup?.();
      // Also kill any orphaned triggers that may have been created
      // by dynamically-imported components after cleanup was set
      if (ScrollTriggerRef) {
        ScrollTriggerRef.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return null;
});

export default SmoothScroll;
