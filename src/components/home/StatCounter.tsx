import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface StatCounterProps {
  from?: number;
  to: number;
  duration?: number; // Duration in seconds
  suffix?: string;
  className?: string; // Allow passing styles
}

const StatCounter = ({
  from = 0,
  to,
  duration = 2,
  suffix = "+",
  className = "",
}: StatCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 100,
    duration: duration * 1000, 
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className={className}>{from}{suffix}</span>;
};

export default StatCounter;
