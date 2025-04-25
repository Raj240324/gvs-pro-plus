import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FeaturedClients = () => {
  const sectionRef = useRef(null);
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
    { name: 'SAIL', logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Bulk Material Handling' },
    { name: 'TISCO', logo: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Steel Plants' },
    { name: 'RINL Vizag', logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Power Plants' },
    { name: 'NTPC', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Thermal Power Stations' },
    { name: 'JSW', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Cement & Steel Plants' },
    { name: 'Ultratech', logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Cement Projects' },
    { name: 'Aditya Birla Group', logo: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Process Plants' },
    { name: 'GMR', logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Renewable Energy' },
    { name: 'Sterlite Group', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Chemical Plants' },
    { name: 'Aumund Engineering', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Samson Feeder Systems' },
    { name: 'Loesche Energy', logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', projects: 'Centrix Systems' },
  ];

  const duplicatedClients = [...clients, ...clients];

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getAnimationDuration = () => {
    if (!windowWidth) return 25;
    if (windowWidth < 640) return 12;
    if (windowWidth < 1024) return 18;
    return 25;
  };

  const getCardWidth = () => {
    if (!windowWidth) return '80vw';
    if (windowWidth < 640) return '80vw';
    if (windowWidth < 1024) return '60vw';
    return '28rem';
  };

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 lg:py-24 bg-black text-white overflow-hidden font-futura">
      {/* Enhanced Background with Dynamic Particles */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)] z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 animate-pulse bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zM6 34v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zM6 4v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(windowWidth < 640 ? 10 : 20)].map((_, i) => (
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
            className="inline-block px-4 sm:px-6 py-2 bg-blue-500/20 rounded-full text-xs sm:text-sm font-medium text-blue-300 border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Strategic Partners
          </motion.span>
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight"
          >
            Pioneering Progress
          </motion.h2>
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-4 sm:mt-6 font-light"
          >
            Collaborating with visionaries to shape the future.
          </motion.p>
        </motion.div>

        {/* Infinite Scroll with Enhanced Glassmorphic Cards */}
        <div className="relative overflow-hidden py-8 sm:py-12">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: getAnimationDuration(), ease: "linear", repeat: Infinity }}
            className="flex space-x-4 sm:space-x-6 whitespace-nowrap"
          >
            {duplicatedClients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                initial={{ opacity: 0, y: 50, rotateX: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  y: -20, 
                  rotateY: 10, 
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(59,130,246,0.3)"
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: "easeOut",
                  hover: { duration: 0.3 }
                }}
                style={{ width: getCardWidth() }}
                className="flex-shrink-0 bg-gradient-to-br from-gray-900/20 to-blue-900/10 rounded-2xl border border-blue-500/30 backdrop-blur-xl shadow-xl group perspective-1000 overflow-hidden"
              >
                <div className="relative p-6 sm:p-8 flex items-center transform-style-3d">
                  <motion.div 
                    className="relative w-16 h-16 sm:w-20 sm:h-20 mr-4 sm:mr-6"
                    whileHover={{ 
                      rotate: 360, 
                      scale: 1.2,
                      boxShadow: "0 0 25px rgba(59,130,246,0.5)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="relative w-full h-full object-contain rounded-full border border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="flex-1">
                    <motion.p 
                      className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-500"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.4 }}
                    >
                      {client.name}
                    </motion.p>
                    <motion.p 
                      className="text-xs sm:text-sm text-gray-400 group-hover:text-blue-200 transition-colors duration-500"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.4 }}
                    >
                      {client.projects}
                    </motion.p>
                  </div>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.4)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="absolute w-2 h-2 bg-blue-500 rounded-full top-2 right-2"
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
                    className="absolute w-2 h-2 bg-purple-500 rounded-full bottom-2 left-2"
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
                    className="absolute w-40 h-40 bg-blue-400/30 rounded-full -top-20 -left-20"
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
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>

        {/* Stats Section */}
        <motion.div
          style={{ scale: statsScale }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-24"
        >
          {[
            { value: "30+", label: "Years of Excellence" },
            { value: "200+", label: "Projects Delivered" },
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