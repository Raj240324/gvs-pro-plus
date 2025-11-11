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

  const duplicatedClients = [...clients, ...clients];

  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(2000);

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
      setScrollWidth(scrollContainerRef.current.scrollWidth / 2); // half, since we duplicate for seamless
    }
  }, [windowWidth]);

  const getAnimationDuration = () => {
    if (!windowWidth) return 25;
    if (windowWidth < 640) return 20;
    if (windowWidth < 1024) return 25;
    return 30;
  };

  // Create two sets of clients for seamless infinite scroll
  const firstSet = [...clients];
  const secondSet = [...clients];
  const allClients = [...firstSet, ...secondSet];

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 lg:py-24 bg-black text-white overflow-hidden font-futura">
      {/* Enhanced Background with Dynamic Particles */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)] z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 animate-pulse bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zM6 34v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zM6 4v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
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
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 rounded-full text-xs sm:text-sm font-medium text-blue-300 border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Strategic Partners
          </motion.span>
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight"
          >
            Pioneering Progress
          </motion.h2>
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto mt-3 sm:mt-4 font-light"
          >
            Collaborating with visionaries to shape the future.
          </motion.p>
        </motion.div>

        {/* Infinite Scroll with Enhanced Glassmorphic Cards */}
        <div className="relative overflow-hidden py-6 sm:py-8">
          <motion.div
            ref={scrollContainerRef}
            className="flex min-w-max space-x-4 sm:space-x-6 lg:space-x-8"
            animate={{
              x: [0, -scrollWidth],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: getAnimationDuration(),
                ease: "linear",
              },
            }}
          >
            {allClients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                initial={{ opacity: 0, y: 50, rotateX: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  y: windowWidth < 640 ? -10 : -20,
                  rotateY: windowWidth < 640 ? 5 : 10,
                  scale: windowWidth < 640 ? 1.02 : 1.05,
                  boxShadow: "0 15px 30px rgba(59,130,246,0.3)"
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: "easeOut",
                  hover: { duration: 0.3 }
                }}
                className="flex-shrink-0 w-48 sm:w-56 lg:w-64 bg-gradient-to-br from-gray-900/20 to-blue-900/10 rounded-xl sm:rounded-2xl border border-blue-500/30 backdrop-blur-xl shadow-xl group perspective-1000 overflow-visible mt-14"
              >
                <div className="relative flex flex-col items-center w-full pt-12 sm:pt-20 pb-4">
                  <motion.div 
                    className={`absolute left-1/2 -top-7 sm:-top-10 lg:-top-12 -translate-x-1/2 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 aspect-square rounded-full bg-gradient-to-br ${client.color} shadow-lg border-4 border-white/10 z-10`}
                  >
                    <span
                      className={`flex items-center justify-center w-full h-full text-center font-mono leading-none
                        ${client.name.split(' ').map(word => word[0]).filter(char => /[A-Za-z]/.test(char)).join('').length > 2
                          ? 'text-xl sm:text-2xl lg:text-3xl tracking-tight'
                          : 'text-2xl sm:text-3xl lg:text-4xl'
                        } font-extrabold text-white drop-shadow-md`}
                      style={{paddingTop: '2px'}}
                    >
                      {client.name.split(' ').map(word => word[0]).filter(char => /[A-Za-z]/.test(char)).join('')}
                    </span>
                  </motion.div>
                  <motion.p 
                    className="mt-2 text-base sm:text-lg lg:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-500 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {client.name}
                  </motion.p>
                  <motion.p 
                    className="mt-2 text-xs sm:text-sm text-gray-400 group-hover:text-blue-200 transition-colors duration-500 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* client.projects was invalid - replace with something useful or descriptive */}
                    {/* If you want to show extra info, add it to the client object and type! */}
                  </motion.p>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.4)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full top-2 right-2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                      transition: {
                        duration: 2,
                        repeat: Infinity
                      }
                    }}
                  />
                  <motion.div 
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full bottom-2 left-2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5
                      }
                    }}
                  />
                  <motion.div
                    className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-blue-400/30 rounded-full -top-16 -left-16 sm:-top-20 sm:-left-20"
                    animate={{
                      x: [-100, 400],
                      y: [-100, 400],
                      opacity: [0, 0.3, 0],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-8 sm:w-12 lg:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 sm:w-12 lg:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>

        {/* Stats Section */}
        <motion.div
          style={{ scale: statsScale }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-24"
        >
          {[
            { value: "30+", label: "Years of Excellence" },
            { value: "100+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0, rotateX: 20 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              whileHover={{ 
                y: -10, 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(59,130,246,0.6)" 
              }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="relative p-6 sm:p-8 bg-gray-900/20 rounded-xl border border-blue-500/40 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <motion.span 
                className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                {stat.value}
              </motion.span>
              <p className="text-base sm:text-lg text-gray-300 mt-2 sm:mt-3 font-medium">{stat.label}</p>
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  className="absolute w-2 h-2 bg-blue-500 rounded-full top-2 right-2"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 1, 0.5],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity
                    }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default FeaturedClients;  
