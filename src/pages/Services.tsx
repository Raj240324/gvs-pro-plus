import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Settings,
  Wrench,
  ArrowRight,
  Factory,
  Cpu,
  RefreshCw,
  Boxes,
  CheckCircle2,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { TiltedCard } from '../components/ui/tilted-card';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useContactModal } from '../hooks/use-contact-modal';
import SEO from '../components/SEO';

// --- Premium Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  ctaLink: string;
  gradient: string; 
}

const Services: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();
  const contactModal = useContactModal();
  const { scrollY } = useScroll();
  
  // Parallax & Fade effects for Hero
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);

  const updateHeaderHeight = useCallback(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    const handleResize = () => updateHeaderHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateHeaderHeight]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
        const offset = Math.max(headerHeight + 16, 0);
        window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
      }
    }
  }, [location, headerHeight]);

  const services: Service[] = [
    {
      id: 'consultancy',
      title: 'Consultancy',
      description: 'Expert Project Management and Engineering Consultancy for Turnkey Electrical and Automation projects.',
      icon: <Settings size={28} className="text-white" />,
      features: [
        'Project Management Consultancy (PMC)',
        'System and Field Study for Optimal Design',
        'Project Engineering: Basic and Detail Engineering',
        'Control Design Using Relay Logic and PLC Automation',
        'Sizing Calculations and Selection of Equipment',
        'Owner’s Representative and Coordination',
        'Assistance in Procurement and Inspection',
      ],
      ctaLink: '#consultancy',
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      id: 'automation',
      title: 'Automation',
      description: 'End-to-end Automation and Process Control solutions with PLC/SCADA Engineering and drive integration.',
      icon: <Cpu size={28} className="text-white" />,
      features: [
        'Total Automation and Process Control Solutions',
        'Customer-Driven Engineering for Process Applications',
        'Innovative, Cost-Effective PLC/SCADA Solutions',
        'Instrumentation Engineering per Industry Standards',
      ],
      ctaLink: '#automation',
      gradient: "from-violet-600 to-indigo-600",
    },
    {
      id: 'renovation-revamping',
      title: 'Renovation & Revamping',
      description: 'Retrofit programs to enhance safety, reliability, and efficiency in operating plants.',
      icon: <RefreshCw size={28} className="text-white" />,
      features: [
        'End-to-End Retrofit Programs',
        'On-Site Surveys by Experienced Professionals',
        'Close Coordination with Client Engineering Teams',
        'Skilled Teams for Minimal-Downtime Renovation',
      ],
      ctaLink: '#renovation-revamping',
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: 'services-and-supply',
      title: 'Services & Supply',
      description: 'Control design, system integration, site services, and supply of panels and instrumentation.',
      icon: <Boxes size={28} className="text-white" />,
      features: [
        'Control Design Using Relay Logic and PLC',
        'Revamp and Integration of Electrical Systems',
        'Conversion of Relay Panels to PLC-Based Systems',
        'Technical Services for Installation and Commissioning',
        'Supply of MCC, VFD Panels, and Control Panels',
        'Supply of Field Instruments',
      ],
      ctaLink: '#services-and-supply',
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 'product-manufacturing',
      title: 'Product Manufacturing',
      description: 'Electrical Control Panels designed to IE standards and CEIG requirements.',
      icon: <Factory size={28} className="text-white" />,
      features: [
        'Power Control Centers & Distribution Panels',
        'PCC (415 V; Single/Double Bus Configuration)',
        'EB & DG Synchronizing Panels',
        'LT Bus Ducts and Rising Main Panels',
        'APFC, AMF, Relay Logic & PLC Panels',
        'VFD Control Panels and Custom-Built Panels',
      ],
      ctaLink: '#product-manufacturing',
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 'additional-services',
      title: 'Additional Services',
      description: 'Erection, Testing, Troubleshooting, and Commissioning of Industrial Electrical systems.',
      icon: <Wrench size={28} className="text-white" />,
      features: [
        'Erection, Testing, and Commissioning Services',
        'EB & DG Synchronizing, AMF, and APFC Panels',
        'PLC/VFD Control Panels',
        'Revamp of Power/MCC/Process Control Panels',
        'Supervisory Assistance for Site Works',
        'Plant Shutdowns and Turnarounds',
      ],
      ctaLink: '#additional-services',
      gradient: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-[84px] lg:pt-[128px] overflow-hidden">
      <SEO
        title="Industrial Automation & Electrical Engineering Services"
        description="Expert Consultancy, PLC SCADA Engineering, Panel Manufacturing, and Turnkey EPC Services. Specialized in Revamping industrial electrical and control systems."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/services' : undefined}
      />

      {/* Hero Section – Premium Smooth Scroll Fade */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 overflow-hidden bg-slate-900 rounded-b-[3rem] shadow-2xl z-10">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-teal-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium tracking-wide"
            >
              Excellence in Engineering
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white leading-tight"
            >
              Industrial Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                Reimagined.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Cutting-edge consultancy, automation, and manufacturing services tailored for your success.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service Offerings Grid – High Performance CSS Spotlight */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16"
           >
             <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core Expertise</h2>
             <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
               Comprehensive engineering solutions delivered with precision and quality.
             </p>
           </motion.div>

           <motion.div 
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             variants={staggerContainer}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
           >
             {services.map((service) => (
               <ServiceCardItem key={service.id} service={service} />
             ))}
           </motion.div>
        </div>
      </section>
      
      {/* Detailed Features Section */}
      <div className="relative bg-white dark:bg-slate-900 rounded-t-[3rem] -mt-12 overflow-hidden z-20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.1)]">
         {services.map((service, index) => (
           <FeatureSection key={service.id} service={service} index={index} headerHeight={headerHeight} />
         ))}
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Scale Up?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Partner with GVS Controls for reliable, world-class industrial automation and electrical solutions.
            </p>
            <button
              onClick={() => contactModal.onOpen()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-teal-50 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Get Started Now <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

// --- Sub-Components ---

// 1. Optimized Service Card with CSS Spotlight (No Canvas)
const ServiceCardItem = ({ service }: { service: Service }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div variants={fadeInUp} className="h-full">
      <TiltedCard
        containerHeight="100%"
        containerWidth="100%"
        scaleOnHover={1.02}
        rotateAmplitude={5}
        showMobileWarning={false}
        showTooltip={false}
        className="h-full"
      >
        <div 
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative h-full p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden group"
        >
          {/* Spotlight Effect Gradient */}
          <div 
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(20, 184, 166, 0.1), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 flex flex-col h-full">
             <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.gradient} shadow-lg`}>
                {service.icon}
             </div>
             
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
               {service.title}
             </h3>
             
             <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-grow">
               {service.description}
             </p>
             
             <a href={service.ctaLink} className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold group/link">
               Explore Details 
               <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
             </a>
          </div>
        </div>
      </TiltedCard>
    </motion.div>
  );
};

// 2. Feature Section with Scroll Reveal
const FeatureSection = ({ service, index, headerHeight }: { service: Service, index: number, headerHeight: number }) => {
  const contactModal = useContactModal();
  return (
    <section 
      id={service.id}
      className={`py-24 border-b border-slate-100 dark:border-slate-800 last:border-0 ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}
      style={{ scrollMarginTop: `${headerHeight + 20}px` }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.7 }}
           className="grid md:grid-cols-2 gap-12 items-start"
        >
           <div className="space-y-6">
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                 {service.icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                {service.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.description}
              </p>
              <div className="pt-4">
                 <button onClick={() => contactModal.onOpen()} className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    Request Proposal
                 </button>
              </div>
           </div>

           <div className={`rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg ${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-800'}`}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                 <div className="w-2 h-8 bg-teal-500 rounded-full" />
                 Key Features & Capabilities
              </h3>
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;