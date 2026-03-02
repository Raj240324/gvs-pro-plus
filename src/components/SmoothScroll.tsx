import { useEffect, memo } from "react";

const SmoothScroll = memo(() => {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    let cleanup: (() => void) | undefined;
    let ScrollTriggerRef: any;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
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

      const raf = (time: number) => {
        lenis.raf(time * 1000);
        ScrollTrigger.update();
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(raf);
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
        lenis.destroy();
      };
    });

    return () => {
      cleanup?.();
      if (ScrollTriggerRef) {
        ScrollTriggerRef.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return null;
});

export default SmoothScroll;