import { useEffect, memo } from "react";

const SmoothScroll = memo(() => {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    let cleanup: (() => void) | undefined;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      // 🔥 Correct GSAP-Lenis integration
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // 🚫 REMOVE refresh on mount
      // Let ScrollTrigger auto-handle layout

      cleanup = () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return null;
});

export default SmoothScroll;