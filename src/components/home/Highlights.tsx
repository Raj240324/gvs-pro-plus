import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import {
  FaRegLightbulb,
  FaCogs,
  FaIndustry,
  FaTools,
  FaSyncAlt,
} from 'react-icons/fa';
import cop9 from '../../assets/cop-9.png';
import renovation from '../../assets/renovation.png';
import erection from '../../assets/electrical-erection.png';

const Highlights = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  // ── Animation Variants ─────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // ── Expertise Data (now 100% in sync with the supplied copy) ─────
  const expertiseContent = [
    {
      title: 'Consultancy',
      description:
        'Project Management Consultancy (PMC), System/Field Study & Optimum Design For Turnkey Projects, Basic & Detail Engineering Documents, Control Design Via Relay Logic & PLC, Sizing/Selection Of HT/LT Equipment, Owner‑Consultant Approvals, Procurement Assistance, Material Selection, Inspection & Dispatch Certification.',
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      gradient: 'from-blue-600 to-indigo-700',
      serviceId: 'consultancy-engineering',
      icon: <FaRegLightbulb className="text-3xl md:text-4xl text-blue-500 drop-shadow-lg" />,
    },
    {
      title: 'Automation',
      description:
        'Total Automation & Process Control Solutions Using PLC/Relay Logic, Complete Instrumentation Products, Innovative Cost‑Effective Systems, Engineering Per Standard Practices, And Pragmatic Site Services For Process & Machine Applications.',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      gradient: 'from-teal-600 to-cyan-700',
      serviceId: 'automation-solutions',
      icon: <FaCogs className="text-3xl md:text-4xl text-cyan-600 drop-shadow-lg" />,
    },
    {
      title: 'Product Manufacturing',
      description:
        'Manufacturing Of Electrical Control Panels Per CEIG Standards: PCC (Single/Double Bus), MCC, VFD, APFC, AMF, Relay/PLC Panels, Bus Ducts, Sandwich Bus Ducts, Rising Mains, Push‑Button Stations, Junction Boxes, Lighting Panels (MLDB/LDB/SLDB), Utility DBs, And Custom‑Built Panels.',
      image: cop9,
      gradient: 'from-orange-600 to-red-700',
      serviceId: 'panel-manufacturing',
      icon: <FaIndustry className="text-3xl md:text-4xl text-orange-500 drop-shadow-lg" />,
    },
    {
      title: 'Erection & Commissioning',
      description:
        'Erection, Testing, Troubleshooting & Commissioning Of Bus Ducts, PCC, MCC, VFD, APFC, AMF, DG Synchronizing, PLC Panels, Synchronizing Panels, Machinery Control Panels, Plant Shutdown/Turnaround Services, Supervisory Assistance, And Comprehensive Start‑Up Support.',
      image: erection,
      gradient: 'from-gray-600 to-blue-700',
      serviceId: 'installation-commissioning',
      icon: <FaTools className="text-3xl md:text-4xl text-blue-700 drop-shadow-lg" />,
    },
    {
      title: 'Renovation & Revamping',
      description:
        'Renovation & Revamping Of Existing Electrical Systems To Improve Safety And Efficiency. Site Surveys, Client Coordination, Assessment Of Optimum Requirements, And Execution By Trained Professionals.',
      image: renovation,
      gradient: 'from-purple-600 to-pink-700',
      serviceId: 'renovation-revamping',
      icon: <FaSyncAlt className="text-3xl md:text-4xl text-pink-600 drop-shadow-lg" />,
    },
  ];

  const handleCardClick = (serviceId: string) => {
    navigate(`/services#${serviceId}`);
  };

  return (
    <section className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            variants={textVariants}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-6"
          >
            Capabilities
          </motion.span>
          <motion.h2
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Excellence</span>
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive solutions designed to elevate your projects with innovation, precision, and decades of expertise.
          </motion.p>
        </motion.div>

        {/* Immersive Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {expertiseContent.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleCardClick(item.serviceId)}
              className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)] h-[450px] bg-slate-900 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30 mix-blend-overlay group-hover:opacity-50 transition-opacity duration-500`} />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col items-start justify-end">
                {/* Icon Badge */}
                <div className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                   {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-100 text-sm leading-relaxed mb-6 line-clamp-4 drop-shadow-sm font-medium group-hover:text-white transition-colors duration-300">
                  {item.description}
                </p>

                <div className="flex items-center text-white font-semibold text-sm tracking-wide gap-2 group/btn">
                  <span className="border-b border-transparent group-hover/btn:border-white transition-all duration-300">EXPLORE SOLUTION</span>
                  <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Centering Logic Fix: If we want the last 2 items centered in a 3-col grid, we can just use flexbox for the container or specific classes. 
            Since grid is used, let's leave it as standard alignment (left-aligned last row) which is standard for bento grids, 
            OR change container to flex flex-wrap justify-center. Flex wrap is better for centering odd items.
         */}
      </div>
    </section>
  );
};

export default Highlights;
export { Highlights };