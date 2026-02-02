"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

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

// --- Tracing Beam Component (Restored & Refined) ---
const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-6xl mx-auto h-full", className)}>
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:hidden" />
      
      {/* Tracing SVG Gradient */}
      <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] -ml-[1px] overflow-hidden pointer-events-none z-0 hidden md:block">
          <motion.div 
            style={{ height: useTransform(scrollYProgress, value => `${value * 100}%`) }}
            className="w-full bg-gradient-to-b from-teal-500 via-indigo-500 to-purple-500"
          />
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// --- Compact Premium Card ---
const JourneyCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn("relative flex flex-col md:flex-row gap-6 mb-12 md:mb-20", isEven ? "md:flex-row-reverse" : "")}
    >
      {/* Icon Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className="w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 bg-teal-500 shadow-md flex items-center justify-center">
           <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>

      <div className="hidden md:block w-1/2" />

      <div className={cn("pl-12 md:pl-0 w-full md:w-1/2", isEven ? "md:pr-10" : "md:pl-10")}>
        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
          
          {event.image && (
             <div className="relative h-40 overflow-hidden">
                <img
                    src={Array.isArray(event.image) ? event.image[0] : event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                     {event.category}
                  </span>
                </div>
             </div>
          )}

          <div className="p-5">
             {!event.image && (
                <div className="mb-2">
                   <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{event.category}</span>
                </div>
             )}
             
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
               {event.title}
             </h3>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
               {event.description}
             </p>

            {event.link && (
              <a href={event.link.url} className="inline-flex items-center mt-4 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
                {event.link.text} <ArrowUpRight className="w-3 h-3 ml-1" />
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
    <div className={cn("relative w-full py-10 px-4", className)}>
      <TracingBeam>
        <div className="pt-4 pb-12">
          {events.map((event, index) => (
             <JourneyCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </TracingBeam>
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
    </div>
  );
}
