// Timeline3D.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

interface Timeline3DProps {
  events: TimelineEvent[];
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  accentColor?: string;
  showImages?: boolean;
  className?: string;
}

const defaultColors = {
  background: 'bg-slate-900',
  primary: 'bg-indigo-600',
  secondary: 'bg-violet-500',
  text: 'text-white',
  accent: 'bg-emerald-500',
};

// Image Slideshow Component
const ImageSlideshow: React.FC<{
  images: string[];
  title: string;
  activeEvent: boolean;
  category?: string;
  accentColor: string;
}> = ({ images, title, activeEvent, category, accentColor }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-slate-900/50 rounded-t-[1.1rem]">
      {images.map((img, idx) => (
        <motion.img
          key={idx}
          src={img}
          alt={`${title} - Image ${idx + 1}`}
          className="w-full h-full object-cover absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentImageIndex === idx ? 1 : 0,
            scale: activeEvent ? 1.02 : 1
          }}
          transition={{ duration: 0.8 }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
      {category && (
        <div className="absolute top-4 right-4 z-10">
          <span className={`${accentColor} px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase`}>
            {category}
          </span>
        </div>
      )}
    </div>
  );
};

// Single Event Component (Hooks are safe here)
const TimelineEventItem: React.FC<{
  event: TimelineEvent;
  index: number;
  activeEvent: string | null;
  setActiveEvent: (id: string | null) => void;
  mousePosition: { x: number; y: number };
  primaryColor: string;
  accentColor: string;
  showImages: boolean;
}> = ({
  event,
  index,
  activeEvent,
  setActiveEvent,
  mousePosition,
  primaryColor,
  accentColor,
  showImages,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;
  const eventColor = event.color ? `bg-${event.color}-500` : primaryColor;

  return (
    <motion.div
      ref={ref}
      className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${
        isEven ? 'md:justify-start' : 'md:justify-end'
      }`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: isEven ? 50 : -50, y: 20 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
    >
      {/* Node */}
      <div
        className={`absolute left-1/2 md:left-auto ${
          isEven ? 'md:left-0' : 'md:right-0'
        } top-0 transform -translate-x-1/2 z-20`}
      >
        <motion.div
          className={`w-10 h-10 rounded-full ${eventColor} flex items-center justify-center border-4 border-slate-900 cursor-pointer`}
          whileHover={{ scale: 1.2 }}
          onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
          animate={{
            boxShadow:
              activeEvent === event.id
                ? ['0 0 0 rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 0 rgba(255,255,255,0.5)']
                : '0 0 0 rgba(255,255,255,0)',
          }}
          transition={{ repeat: activeEvent === event.id ? Infinity : 0, duration: 1.5 }}
        >
          {event.icon || <span className="text-white font-bold">{index + 1}</span>}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className={`relative z-10 bg-slate-800 bg-opacity-80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl w-full md:w-[calc(100%-2rem)] ${
          isEven ? 'md:ml-12' : 'md:mr-12'
        } border border-slate-700`}
        whileHover={{ y: -5, x: isEven ? 5 : -5 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateY(${mousePosition.x * (isEven ? -3 : 3)}deg) rotateX(${mousePosition.y * -3}deg)`,
        }}
        onMouseEnter={() => setActiveEvent(event.id)}
        onMouseLeave={() => setActiveEvent(null)}
      >
        {showImages && event.image && (
          <ImageSlideshow
            images={Array.isArray(event.image) ? event.image : [event.image]}
            title={event.title}
            activeEvent={activeEvent === event.id}
            category={event.category}
            accentColor={accentColor}
          />
        )}

         <div className="p-6">
           <div className="flex items-center justify-end mb-4">
             <motion.div
               className={`w-3 h-3 rounded-full ${eventColor}`}
               animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
               transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
             />
           </div>

          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: activeEvent === event.id ? 'auto' : 0, opacity: activeEvent === event.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-slate-300 mt-3 leading-relaxed">{event.description}</p>
            {event.link && (
              <a
                href={event.link.url}
                className={`inline-block mt-4 px-4 py-2 ${primaryColor} hover:bg-opacity-80 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-1`}
              >
                {event.link.text}
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${eventColor}`}
          initial={{ width: '0%' }}
          animate={{ width: activeEvent === event.id ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Main Timeline3D Component
export const Timeline3D: React.FC<Timeline3DProps> = ({
  events,
  backgroundColor = defaultColors.background,
  primaryColor = defaultColors.primary,
  secondaryColor = defaultColors.secondary,
  textColor = defaultColors.text,
  accentColor = defaultColors.accent,
  showImages = true,
  className = '',
}) => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const container = containerRef.current;
    if (container) container.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`w-full ${backgroundColor} py-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${textColor} ${className}`}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Floating Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full opacity-20 ${i % 2 === 0 ? primaryColor : secondaryColor}`}
              animate={{
                x: [`${20 + i * 10}%`, `${30 + i * 8}%`, `${15 + i * 12}%`, `${20 + i * 10}%`],
                y: [`${10 + i * 12}%`, `${20 + i * 10}%`, `${30 + i * 8}%`, `${10 + i * 12}%`],
                scale: [1, 1.2, 1.1, 1],
              }}
              transition={{ duration: 20 + i * 2, ease: 'easeInOut', repeat: Infinity }}
              style={{ width: `${50 + i * 20}px`, height: `${50 + i * 20}px`, filter: 'blur(8px)' }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div className="relative z-10 text-center mb-20" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-6 py-2 bg-teal-700 text-white rounded-full text-sm font-bold tracking-wider mb-6">
            OUR JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="relative inline-block">
              <span className={`absolute -inset-1 rounded-lg ${accentColor} blur opacity-30`}></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-indigo-800 dark:from-teal-400 dark:to-indigo-400">
                Milestones Since Inception
              </span>
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-3xl mx-auto">
            From vision to trusted partner in electrical & automation engineering.
          </p>
        </motion.div>

        <div className="relative">
          {/* Center Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${primaryColor} rounded-full`} style={{ boxShadow: `0 0 15px ${primaryColor}` }}></div>

          {/* Events */}
          {events.map((event, index) => (
            <TimelineEventItem
              key={event.id}
              event={event}
              index={index}
              activeEvent={activeEvent}
              setActiveEvent={setActiveEvent}
              mousePosition={mousePosition}
              primaryColor={primaryColor}
              accentColor={accentColor}
              showImages={showImages}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline3D;