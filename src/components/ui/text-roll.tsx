"use client";

import {
  motion,
  VariantLabels,
  Target,
  TargetAndTransition,
  Transition,
} from "framer-motion";

export type TextRollProps = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  style?: React.CSSProperties; // <--- Added for inline styles
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
};

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  style, // <--- accept style prop here
  transition = { ease: "easeIn" },
  variants,
  onAnimationComplete,
}: TextRollProps) {
  const defaultVariants = {
    enter: {
      initial: { rotateX: 0 },
      animate: { rotateX: 90 },
    },
    exit: {
      initial: { rotateX: 90 },
      animate: { rotateX: 0 },
    },
  } as const;

  const letters = children.split("");

  return (
    <span className={className} style={{ ...style, willChange: "transform" }}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
          style={{ 
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }}
          aria-hidden="true"
        >
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
            initial={variants?.enter?.initial ?? defaultVariants.enter.initial}
            animate={variants?.enter?.animate ?? defaultVariants.enter.animate}
            transition={{
              ...transition,
              duration,
              delay: getEnterDelay(i),
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            style={{ 
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden"
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>

          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
            initial={variants?.exit?.initial ?? defaultVariants.exit.initial}
            animate={variants?.exit?.animate ?? defaultVariants.exit.animate}
            transition={{
              ...transition,
              duration,
              delay: getExitDelay(i),
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            style={{ 
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden"
            }}
            onAnimationComplete={
              letters.length === i + 1 ? onAnimationComplete : undefined
            }
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>

          <span className="invisible">
            {letter === " " ? "\u00A0" : letter}
          </span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}
