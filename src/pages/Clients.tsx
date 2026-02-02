"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Factory, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../hooks/use-contact-modal';
import SEO from '../components/SEO';

interface Client {
  name: string;
  location: string;
}

const clients: Client[] = [
  { name: 'M/s Aumund Engineering Private Limited', location: 'Chennai' },
  { name: 'M/s Loesche Energy (P) Ltd.', location: 'Delhi & Chennai' },
  { name: 'M/s Metco Roofing Private Limited', location: 'Chennai' },
  { name: 'M/s ARS Hydrojet Services (P) Ltd.', location: 'Chennai' },
  { name: 'M/s Meenakshi Medical College and Hospital', location: 'Kanchipuram' },
  { name: 'M/s Black Stone Group Technologies Private Limited', location: 'Chennai' },
  { name: 'M/s Dukes Engineering India (P) Ltd.', location: 'Chennai Region' },
];

const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactModal = useContactModal();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Optimized Parallax: Smoother damping, less distance
  const yHero = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // High-performance spring physics for non-jittery updates
  const smoothY = useSpring(yHero, { stiffness: 100, damping: 20, mass: 0.5 });

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen pt-[84px] lg:pt-[128px] overflow-x-hidden">
      <SEO
        title="Our Clients | GVS Controls"
        description="Trusted by industry leaders like Aumund, Loesche, and more."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/clients' : undefined}
      />

      {/* --- HERO SECTION ---
          Removed 'sticky' and massive height to fix jitter. 
          Standard relative positioning with GPU-accelerated transforms. 
      */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center p-4">
         {/* Animated Background Mesh */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-emerald-500/10 rounded-[100%] blur-[120px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
         </div>

         <motion.div 
           style={{ y: smoothY, opacity: opacityHero }}
           className="relative z-10 text-center max-w-4xl mx-auto will-change-transform"
         >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400 font-medium text-sm tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
              Trusted Partners
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
            >
              Our Valued Clients
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
            >
              Driving innovation across Steel, Power, and Cement industries since 2017.
            </motion.p>
         </motion.div>
      </section>


      {/* --- GRID SECTION --- */}
      <section className="relative z-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {clients.map((client, index) => (
              <GlassCard key={index} client={client} index={index} />
            ))}
          </div>
        </div>
      </section>


      {/* --- CTA SECTION --- */}
      <section className="relative z-20 py-24 border-t border-white/5 bg-gradient-to-b from-black to-slate-900/50">
        <div className="container mx-auto px-4 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="max-w-4xl mx-auto"
            >
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                  Ready to Start?
                </h2>
                <button 
                  onClick={() => contactModal.onOpen()}
                  className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                </button>
            </motion.div>
        </div>
      </section>

    </main>
  );
};

// Optimized Card Component - Using CSS transition for hover instead of heavy motion values
const GlassCard = ({ client, index }: { client: Client; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group relative h-[280px] w-full"
        >
            <div className="h-full w-full bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 p-8 flex flex-col justify-between transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.2)]">
                {/* Gradient Blob for Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex justify-between items-start">
                    <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <Factory className="w-8 h-8" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 -rotate-45 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-3 group-hover:text-emerald-300 transition-colors">
                        {client.name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{client.location}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Clients;