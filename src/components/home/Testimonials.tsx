import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface Testimonial {
  text: string;
  author: string;
  company: string;
  src: string;
}

const testimonials: Testimonial[] = [
  {
    text: "GVS Controls provided exceptional technical consultancy and instrumentation solutions for our Stacker & Reclaimer project. Their expertise ensured seamless integration and timely completion.",
    author: "Sanjay Desai",
    company: "JSW Cement - Dolvi, Maharashtra",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
  },
  {
    text: "The revamping of our 11 KV Sub Station by GVS Controls significantly improved our power distribution efficiency. Their team's professionalism and attention to detail were outstanding.",
    author: "Dr. Meera Rao",
    company: "Meenakshi Medical College & Hospital",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
  },
  {
    text: "Their automation solutions for our Samson/BRU Feeder systems enhanced our operational reliability. GVS Controls delivered innovative and cost-effective engineering support.",
    author: "Amit Patel",
    company: "Aumund Engineering Private Limited - Chennai",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
  },
  {
    text: "GVS Controls' consultancy services for our factory's electrical systems were top-notch. They provided practical solutions that optimized our setup within budget.",
    author: "Ravi Kumar",
    company: "Metco Roof Private Limited - Chennai",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop",
  },
];

const fallbackImg = "/fallback-image.jpg";

const AnimatedGVSTestimonials: React.FC<{ className?: string }> = ({ className }) => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(!(testimonials && testimonials.length > 0));
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  // Auto-advance
  useEffect(() => {
    if (testimonials.length === 0) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  if (isLoading || !testimonials || testimonials.length === 0) {
    return (
      <section className={cn("py-12 px-4 bg-gradient-to-r from-indigo-900 via-blue-800 to-teal-700 text-white", className)}>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 uppercase tracking-wider">
            Client Testimonials
          </h2>
          <div className="text-center text-gray-200">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "py-12 px-4 bg-gradient-to-r from-indigo-900 via-blue-800 to-teal-700 text-white",
        className
      )}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2
          id="testimonials-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 uppercase tracking-wider"
        >
          Client Testimonials
        </h2>
        <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          {/* Image Stack */}
          <div className="w-full md:w-1/3 h-[200px] sm:h-[250px] md:h-[300px] relative mx-auto max-w-[300px] md:max-w-none">
            <AnimatePresence initial={false} mode="wait">
              {testimonials.map((testimonial, index) => (
                <motion.figure
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                  animate={{
                    opacity: index === active ? 1 : 0.7,
                    scale: index === active ? 1 : 0.95,
                    z: index === active ? 0 : -100,
                    rotate: index === active ? 0 : randomRotateY(),
                    zIndex: index === active ? 999 : testimonials.length + 2 - index,
                    y: index === active ? [0, -40, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  aria-hidden={index !== active}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.author}
                    className="h-full w-full rounded-2xl object-cover object-center shadow-md"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImg;
                    }}
                  />
                  <figcaption className="sr-only">{testimonial.author} - {testimonial.company}</figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-2/3 flex flex-col justify-between py-4 px-2">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex-1"
              ref={testimonialRef}
              aria-live="polite"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
                {testimonials[active]?.author || "Unknown Author"}
              </h3>
              <p className="text-sm text-gray-200 mb-4">
                {testimonials[active]?.company || "Unknown Company"}
              </p>
              <motion.blockquote className="text-base sm:text-lg text-gray-200 italic leading-relaxed">
                {testimonials[active]?.text?.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                )) || "No testimonial available"}
              </motion.blockquote>
            </motion.div>

            {/* Navigation */}
            <div className="flex gap-4 mt-6 justify-center">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors group disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
                disabled={testimonials.length <= 1}
              >
                <IconArrowLeft className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors group disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
                disabled={testimonials.length <= 1}
              >
                <IconArrowRight className="h-6 w-6 text-white group-hover:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedGVSTestimonials;