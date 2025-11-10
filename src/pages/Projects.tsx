"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Project {
  title: string;
  description: string;
}

interface ClientGroup {
  client: string;
  projects: Project[];
}

const clientGroups: ClientGroup[] = [
  {
    client: 'M/s Aumund Engineering Private Limited - Chennai',
    projects: [
      { title: 'SAMSON / BRU FEEDER', description: 'ACC – Ametha, ULTRATECH – Gujarat, JK Cement – HamirPur, JSW FZE – Fujairah, 2 X 800 Darapalli & LARA – NTPC Limited, 2 X 500 Durgapur & MEJIA Thermal Power Station, TITAN CEMENT – EGYPT and DALMIA CEMENT – INDIA' },
      { title: 'PADDLE FEEDER', description: '2 X 350 MEENAKSHI ENERGY (P) LTD. – NELLORE – ANDHRA, McNalley Bharat Eng Company Limited.' },
      { title: 'CENTREX / BIN-X System', description: 'ACC – AMETHA, Republic Cement – PHILIPPINES and Dalmia Cement – BELGAUM.' },
      { title: 'STACKER & RECLAIMER', description: 'Technical Consultancy – Electrical & Instrumentation – JSW Cement – DOLVI' },
    ],
  },
  {
    client: 'M/s Loesche Energy (P) Ltd. - Chennai',
    projects: [
      { title: 'SAMSON / BRU FEEDER', description: 'RCCPL 8000 MUKUTBAN – MAHARASHTRA' },
      { title: 'CENTREX / BIN-X System', description: 'Friend Ship Power Company – DHAKA – BANGLADESH.' },
    ],
  },
  {
    client: 'M/s Metco Roofing Private Limited - Chennai',
    projects: [
      { title: 'Consultancy Services', description: 'Complete Electrical Systems and lighting for Factory Set up.' },
    ],
  },
  {
    client: 'M/s ARS Hydrojet Services (P) Ltd. - Chennai',
    projects: [
      { title: 'HIGH PRESSURE WATER JETTING SYSTEM', description: 'All SAIL Plants – Bokaro, Rourkela, Durgapur Steel Plants and TATA JAMSHEDPUR.' },
    ],
  },
  {
    client: 'M/s Meenakshi Medical College and Hospital - Kanchipuram',
    projects: [
      { title: '11 KV Sub Station and Power Room', description: 'Complete Revamping and Retro Fitting, Supply, Installation, Testing and Commissioning of 11 KV VCB, 1250 KVA Distribution Transformer, Bus Ducts, PCC Panels and Power DB’s.' },
    ],
  },
  {
    client: 'M/s Steel Authority of India Limited (SAIL), TISCO, RINL, CPCL & Leading Industries',
    projects: [
      { title: 'Power Plants • Bulk Material Handling • Chemical Plants • Cooling Towers • Automobile • Process Plants • Renewable Energy', description: 'Executed for SAIL, TISCO, RINL Vizag, CPCL, MRL Cochin Refinery, Sterlite Group, GMR, Aditya Birla Group, Sea Bird (NAVY) and top private entrepreneurs.' },
    ],
  },
];

const Projects: React.FC = () => {
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

  // Fixed & Optimized Animations (no conflicts, smooth on all devices)
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const clientHeader = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main style={{ paddingTop: `${headerHeight}px` }} className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <SEO
        title="Projects | GVS Controls"
        description="Landmark electrical & automation projects for Aumund, Loesche, SAIL, NTPC, Ultratech, JSW across cement, power & steel sectors."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/projects' : undefined}
      />

      {/* Hero – Fully Responsive */}
      <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-5 py-2 sm:px-6 sm:py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm tracking-wider mb-6 sm:mb-8"
          >
            LEGACY OF EXCELLENCE
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-4"
          >
            Our Landmark Projects
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Delivering turnkey electrical & automation solutions with zero downtime for India’s leading industries
          </motion.p>
        </div>
      </section>

      {/* Projects List – 100% Responsive + Fixed Animations */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {clientGroups.map((group, groupIndex) => (
            <motion.div
              key={group.client}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mb-16 lg:mb-20 last:mb-0"
            >
              {/* Client Header – Responsive */}
              <motion.div
                variants={clientHeader}
                className="flex items-center gap-3 sm:gap-4 mb-8 lg:mb-10"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg flex-shrink-0">
                  <Factory className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                  {group.client}
                </h2>
              </motion.div>

              {/* Project Cards – Fully Responsive Grid */}
              <div className="space-y-5 sm:space-y-6">
                {group.projects.map((proj, i) => (
                  <motion.div
                    key={i}
                    variants={card}
                    whileHover={{ x: 6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="group relative p-5 sm:p-6 md:p-8 rounded-2xl bg-white shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="mt-0.5 flex-shrink-0">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 group-hover:text-cyan-600 transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                          {proj.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA – Fully Responsive */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-cyan-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4"
          >
            Ready for Your Next Project?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-cyan-100 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
          >
            Let’s deliver excellence together — on time, on budget, zero compromise.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-teal-700 font-bold text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 sm:ml-3 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Projects;