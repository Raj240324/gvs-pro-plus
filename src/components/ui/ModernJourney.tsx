"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
export interface TimelineEvent {
  id: string;
  date?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string | string[];
  category?: string;
  color?: string;
  link?: { url: string; text: string };
}

interface ModernJourneyProps {
  events: TimelineEvent[];
  className?: string;
}

// --- Tracing Beam Component ---
const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const contentHeight = useTransform(
    scrollYProgress,
    [0, 0.8],
    [0, 1000] // Estimate max height, will adjust dynamically if needed or rely on SVG percentages
  );

  // We'll use a spring for the path length to make it feel fluid
  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, 100]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-7xl mx-auto h-full", className)}
    >
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
      
      {/* Mobile Line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:hidden" />

      {/* Tracing SVG Gradient */}
      <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] -ml-[1px] overflow-hidden pointer-events-none z-0">
          <motion.div 
            style={{ height: useTransform(scrollYProgress, value => `${value * 100}%`) }}
            className="w-full bg-gradient-to-b from-teal-500 via-indigo-500 to-purple-500"
          />
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// --- Single Card Component ---
const JourneyCard = ({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col md:flex-row gap-8 mb-24 md:mb-32",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Icon Node (Center mechanism) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-white dark:border-slate-900 bg-gradient-to-br from-teal-500 to-indigo-600 shadow-xl flex items-center justify-center transform transition-transform hover:scale-110">
          {event.icon ? (
            <div className="text-white w-4 h-4 md:w-6 md:h-6">{event.icon}</div>
          ) : (
            <div className="w-3 h-3 bg-white rounded-full" />
          )}
        </div>
      </div>

      {/* Spacer for desktop layout balance */}
      <div className="hidden md:block w-1/2" />

      {/* Content Card */}
      <div className={cn("pl-12 md:pl-0 w-full md:w-1/2", isEven ? "md:pr-16" : "md:pl-16")}>
        <div className="group relative overflow-hidden rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-teal-500/10">
          
          {/* Internal Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Image Handler */}
          {event.image && (
             <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                <img
                    src={Array.isArray(event.image) ? event.image[0] : event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                
                {/* Year/Category Badge over image */}
                <div className="absolute bottom-4 left-4 pt-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase border border-white/20">
                     {event.category || 'Milestone'}
                  </span>
                </div>
             </div>
          )}

          <div className="p-6 md:p-8 relative">
             {/* If no image, show category here */}
             {!event.image && (
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-bold tracking-wider uppercase">
                   {event.category || 'Milestone'}
                </span>
             )}
             
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
               {event.title}
             </h3>
             <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
               {event.description}
             </p>

            {event.link && (
              <a 
                href={event.link.url}
                className="inline-flex items-center mt-6 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
              >
                {event.link.text}
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ModernJourney({ events, className }: ModernJourneyProps) {
  return (
    <div className={cn("relative w-full py-20 px-4 md:px-8", className)}>
      <TracingBeam className="relative">
        <div className="relative pt-10 pb-32">
          {events.map((event, index) => (
             <JourneyCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </TracingBeam>
      
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
    </div>
  );
}
