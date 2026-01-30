"use client";
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Client {
  name: string;
  location: string;
}

const Clients: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      const header = document.querySelector('header');
      if (header) setHeaderHeight(header.offsetHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const post2017Clients = useMemo<Client[]>(() => [
    { name: 'M/s Aumund Engineering Private Limited', location: 'Chennai' },
    { name: 'M/s Loesche Energy (P) Ltd.', location: 'Chennai' },
    { name: 'M/s Metco Roofing Private Limited', location: 'Chennai' },
    { name: 'M/s ARS Hydrojet Services (P) Ltd.', location: 'Chennai' },
    { name: 'M/s Meenakshi Medical College and Hospital', location: 'Kanchipuram' },
    { name: 'M/s Black Stone Group Technologies Private Limited', location: 'Chennai' },
    { name: 'M/s Dukes Engineering India (P) Ltd.', location: 'Chennai Region' },
  ], []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden pt-[84px] lg:pt-[128px]">
      <SEO
        title="Our Clients Since 2017 | GVS Controls"
        description="Elite post-2017 partners: Aumund Engineering, Loesche Energy, Metco Roofing, ARS Hydrojet, Meenakshi Hospital, Black Stone Technologies, Dukes Engineering."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/clients' : undefined}
      />

      {/* Hero - Same epic style, now buttery smooth */}
      <section className="relative min-h-[50vh] flex items-center py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl will-change-transform"
          />
          <motion.div
            animate={{ x: [0, -150, 0], y: [0, 150, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-32 right-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl will-change-transform"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="inline-block px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 mb-6 text-xs sm:text-sm"
          >
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-bold tracking-widest uppercase">
              Trusted Partners Since 2017
            </span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Our Valued Clients
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Industry leaders across Power, Steel, Cement & Engineering sectors who trust GVS Controls for excellence.
          </motion.p>
        </div>
      </section>

      {/* Client Cards - Zero lag, perfect responsiveness */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
            {post2017Clients.map((client, index) => (
              <div key={index} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2.5rem)] flex justify-center">
                <ClientCard client={client} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Same luxury feel */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 90 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-12 leading-tight"
          >
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              READY TO START YOUR PROJECT?
            </span>
          </motion.h2>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center px-12 py-6 md:px-16 md:py-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl font-bold text-xl md:text-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20"
            >
              <span className="relative z-10 text-white">Get in Touch</span>
              <ArrowRight className="ml-4 w-7 h-7 md:w-8 md:h-8 relative z-10 transition-transform group-hover:translate-x-3" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const ClientCard: React.FC<{ client: Client; index: number }> = ({ client, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -20, scale: 1.03 }}
      className="group relative will-change-transform"
    >
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-1 shadow-2xl border border-white/10 overflow-hidden h-full">
        <div className="bg-black/40 rounded-3xl p-8 md:p-10 h-full relative overflow-hidden">
          {/* Breathing orb - now GPU friendly */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-500/40 to-blue-600/40 rounded-full blur-3xl will-change-transform"
          />

          <motion.div
            whileHover={{ scale: 1.2, rotate: 12 }}
            className="mb-8 w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-4 md:p-5 shadow-xl flex items-center justify-center"
          >
            <Factory className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </motion.div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center text-white leading-tight line-clamp-3">
            {client.name}
          </h3>

          <div className="flex items-center justify-center gap-3 text-gray-300">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span className="text-base md:text-lg font-medium">{client.location}</span>
          </div>

          {/* Hover glow - lightweight */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(16, 185, 129, 0.3) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Clients;