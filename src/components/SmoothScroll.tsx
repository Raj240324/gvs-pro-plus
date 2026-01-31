import { useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = memo(() => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15, // slightly tighter than 1.2
      easing: (t) => 1 - Math.pow(1 - t, 3), // smoother + cheaper than expo
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    // 🔒 IMPORTANT: DO NOT use lenis.on('scroll', ScrollTrigger.update)

    // Single RAF function reference (CRITICAL)
    const raf = (time: number) => {
      // 1. Advance Lenis
      lenis.raf(time * 1000);

      // 2. Sync ScrollTrigger AFTER scroll updates
      ScrollTrigger.update();
    };

    // GSAP becomes the master clock
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Ensure proper refresh after setup
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
});

export default SmoothScroll;
