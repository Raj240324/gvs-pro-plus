import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { SparklesCore } from "./sparkles";
import { FaRegStar } from "react-icons/fa";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  useEffect(() => {
    if (!lineRef.current) return;
    const observer = new ResizeObserver(() => {
      setLineHeight(lineRef.current?.offsetHeight || 0);
    });
    observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);
  

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full bg-transparent font-sans">
      <div className="relative max-w-4xl mx-auto pb-20">
        {/* Enhanced timeline vertical line with sparkles and glow */}
        <div ref={lineRef} className="absolute left-8 top-0 w-[4px] h-full z-0">
          {/* Static background gradient and sparkles */}
          <div className="absolute inset-x-0 top-0 w-full h-full bg-gradient-to-t from-teal-400/30 via-indigo-400/20 to-fuchsia-400/10 rounded-full" />
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <SparklesCore minSize={0.5} maxSize={1.2} particleDensity={400} className="w-full h-full" particleColor="#14b8a6" />
          </div>
          {/* Animated flow line with correct height */}
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-t from-cyan-400 via-fuchsia-500 to-yellow-300 rounded-full shadow-[0_0_24px_8px_rgba(251,191,36,0.25)] drop-shadow-lg"
          />
        </div>
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-20 relative z-10"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: index * 0.1, type: 'spring', bounce: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Timeline dot with animated glow and icon */}
            <div className="sticky flex flex-col md:flex-row  z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-teal-200/60 relative animate-float">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 via-indigo-400/20 to-fuchsia-400/20 blur-md animate-pulse" />
                <FaRegStar className="text-teal-500 text-2xl z-10 animate-spin-slow" />
              </div>
              {/* Year badge */}
              <span className="ml-0 md:ml-6 mt-3 md:mt-0 px-3 py-1 rounded-full bg-gradient-to-r from-teal-400 to-indigo-400 text-white text-xs md:text-base font-bold shadow-md border border-white/30 animate-float">
                {item.title}
              </span>
            </div>
            <div className="relative pl-12 pr-2 md:pl-4 md:pr-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
                {item.title}
              </h3>
              <motion.div
                className="group relative rounded-3xl shadow-2xl border border-teal-100/40 p-0 md:p-0 overflow-visible bg-gradient-to-br from-white/80 via-teal-50/70 to-indigo-100/60 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/60"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(34,211,238,0.15)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {/* Decorative animated gradient border */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-teal-300/40 via-indigo-300/30 to-fuchsia-300/30 blur-lg opacity-70 pointer-events-none z-0 animate-pulse" />
                {/* Floating icon with glass effect */}
                <div className="absolute top-4 right-4 z-10 animate-float backdrop-blur-md bg-white/60 rounded-full p-2 shadow-lg border border-teal-100/40">
                  <FaRegStar className="text-fuchsia-400 text-2xl drop-shadow-lg" />
                </div>
                {/* Responsive content layout */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-10">
                  <div className="flex-1 min-w-0">
                    <div className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                      {item.content}
                    </div>
                  </div>
                  {/* Decorative vertical line for desktop */}
                  <div className="hidden md:block w-1 h-24 bg-gradient-to-b from-teal-400 via-indigo-400 to-fuchsia-400 rounded-full shadow-md mx-4 animate-float" />
                </div>
                {/* Shine effect on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-white/60 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700 animate-shine" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};