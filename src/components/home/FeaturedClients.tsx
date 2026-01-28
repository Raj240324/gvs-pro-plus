import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FeaturedClients = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.1, 1]), { 
    stiffness: 100,
    damping: 20 
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const statsScale = useSpring(useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1]), { 
    stiffness: 120,
    damping: 25 
  });

  const clients = [
    { name: 'SAIL', color: 'from-blue-500 to-cyan-500' },
    { name: 'TISCO', color: 'from-red-500 to-orange-500' },
    { name: 'RINL Vizag', color: 'from-green-500 to-emerald-500' },
    { name: 'CPCL', color: 'from-yellow-500 to-orange-500' },
    { name: 'MRL', color: 'from-indigo-500 to-blue-500' },
    { name: 'Cochin Refinery', color: 'from-teal-500 to-cyan-500' },
    { name: 'Sterlite Group', color: 'from-violet-500 to-purple-500' },
    { name: 'GMR', color: 'from-pink-500 to-rose-500' },
    { name: 'Aditya Birla Group', color: 'from-amber-500 to-yellow-500' },
    { name: 'Sea Bird (NAVY)', color: 'from-slate-500 to-gray-500' },
  ];

  // Create two sets of clients for seamless infinite scroll
  const allClients = [...clients, ...clients];

  const [scrollWidth, setScrollWidth] = useState(2000);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setScrollWidth(scrollContainerRef.current.scrollWidth / 2);
    }
  }, [windowWidth]);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 lg:py-24 bg-black text-white overflow-hidden font-futura">
      {/* Enhanced Background with Dynamic Particles */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)] z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 animate-pulse bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zM6 34v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zM6 4v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(windowWidth < 640 ? 5 : windowWidth < 1024 ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
                transition: {
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block px-3 sm:px-4 py-1.5 bg-amber-500/10 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-amber-300 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] mb-4"
          >
            FOUNDER'S LEGACY & EXPERIENCE
          </motion.span>
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Our founder's 30+ years of expertise delivering critical solutions for India's largest industrial conglomerates.
          </motion.p>
        </motion.div>

        {/* Infinite Scroll with Modern Industrial Cards */}
        <div className="relative overflow-hidden py-10">
          <motion.div
            ref={scrollContainerRef}
            className="flex min-w-max space-x-6 sm:space-x-8"
            animate={{
              x: [0, -scrollWidth],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // Smoother, slower scroll
                ease: "linear",
              },
            }}
          >
            {allClients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                className="group relative flex-shrink-0 w-72 h-36 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Dynamic Gradient Border/Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${client.color} mix-blend-overlay`} />
                
                {/* Metallic shine on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12" />

                <div className="relative h-full flex flex-col items-center justify-center p-6 z-10">
                  <motion.h3 
                    className="text-2xl font-black tracking-tight text-white/80 group-hover:text-white transition-colors duration-300 text-center uppercase"
                  >
                    {client.name}
                  </motion.h3>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white/10 rounded-full group-hover:w-24 group-hover:bg-white/30 transition-all duration-500" />
                  
                  {/* Tech corners */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/60 transition-colors" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/60 transition-colors" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/60 transition-colors" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/60 transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>

        {/* Stats Section - Redesigned to match */}
        <motion.div
          style={{ scale: statsScale }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 lg:mt-24"
        >
          {[
            { value: "30+", label: "Years of Promoter Experience in EPC Projects" },
            { value: "100+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors duration-300"
            >
              <motion.div 
                className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400 mb-4"
              >
                {stat.value}
              </motion.div>
              <p className="text-lg text-slate-400 font-medium leading-snug group-hover:text-slate-300 transition-colors">
                {stat.label}
              </p>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default FeaturedClients;
