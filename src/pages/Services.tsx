import React, { useEffect, useState, useCallback } from 'react';
import {
  PiGearFill,
  PiWrenchFill,
  PiArrowRightBold,
  PiFactoryFill,
  PiCpuFill,
  PiArrowsClockwiseFill,
  PiCubeFill,
} from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';
import { TiltedCard } from '../components/ui/tilted-card';
import { motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/SEO';
import { AnimatePresence } from 'framer-motion';
import { CanvasRevealEffect } from '../components/ui/canvas-reveal-effect';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  ctaLink: string;
  color: [number, number, number][]; // Added for canvas
}

const Services: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  // === Exact Content – No Changes – Added Colors for Canvas ===
  const services: Service[] = [
    {
      id: 'consultancy',
      title: 'Consultancy',
      description: 'Expert Project Management and Engineering Consultancy for Turnkey Electrical and Automation projects.',
      icon: <PiGearFill className="text-teal-500 text-3xl" />,
      features: [
        'Project Management Consultancy (PMC)',
        'System and Field Study for Optimal Design in Turnkey Projects and Process Plants',
        'Project Engineering: Basic and Detail Engineering Documents and Drawings',
        'Control Design Using Relay Logic and PLC Automation for Process Plants and Machinery',
        'Sizing Calculations and Selection of Complete HT/LT Electrical Equipment',
        'Owner’s Representative and Coordination with Leading Consultants for Approvals',
        'Assistance in Procurement, Material Selection, Equipment Inspection, and Dispatch Certification',
      ],
      ctaLink: '#consultancy',
      color: [[0, 128, 128], [59, 130, 246]],
    },
    {
      id: 'automation',
      title: 'Automation',
      description: 'End-to-end Automation and Process Control solutions with PLC/SCADA Engineering and drive integration.',
      icon: <PiCpuFill className="text-teal-500 text-3xl" />,
      features: [
        'Total Automation and Process Control Solutions',
        'Customer-Driven Engineering for Process and Machine Applications',
        'Innovative, Cost-Effective PLC/SCADA Solutions and Drive Integration',
        'Instrumentation Engineering per Industry Standards and Site-Practical Services',
      ],
      ctaLink: '#automation',
      color: [[138, 43, 226], [236, 72, 153]],
    },
    {
      id: 'renovation-revamping',
      title: 'Renovation & Revamping of Electrical Systems',
      description: 'Retrofit programs to enhance safety, reliability, and efficiency in operating plants.',
      icon: <PiArrowsClockwiseFill className="text-teal-500 text-3xl" />,
      features: [
        'End-to-End Retrofit Programs for Safety and Efficiency Enhancement',
        'On-Site Surveys by Experienced Professionals to Assess Optimal Requirements',
        'Close Coordination with Client Engineering Teams for Execution Planning',
        'Skilled Teams for Minimal-Downtime Renovation and Revamp Projects',
      ],
      ctaLink: '#renovation-revamping',
      color: [[255, 193, 7], [245, 158, 11]],
    },
    {
      id: 'services-and-supply',
      title: 'Services & Supply',
      description: 'Control design, system integration, site services, and supply of panels and instrumentation.',
      icon: <PiCubeFill className="text-teal-500 text-3xl" />,
      features: [
        'Control Design Using Relay Logic and PLC for Process Plants and Machinery',
        'Revamp and Integration of Electrical Systems with Relay and PLC Controls',
        'Conversion of Relay Panels to PLC-Based Systems',
        'Technical Services for Installation and Commissioning at Site',
        'Supply of MCC, VFD Panels, and Local Control Panels',
        'Supply of Relay Logic and PLC-Based Control Panels',
        'Supply of Field Instruments for Cement and Conveyor Systems (Schmersal, Milltronics, Pepperl+Fuchs)',
        'Sourcing and Supply of Instruments for Wind Mills and Special Applications',
      ],
      ctaLink: '#services-and-supply',
      color: [[34, 197, 94], [22, 163, 74]],
    },
    {
      id: 'product-manufacturing',
      title: 'Product Manufacturing & Supply',
      description: 'Electrical Control Panels designed to IE standards and CEIG requirements.',
      icon: <PiFactoryFill className="text-teal-500 text-3xl" />,
      features: [
        'Power Control Centers, Power Distribution Panels, Motor Control Centers, Process Control Panels',
        'PCC (415 V; Single/Double Bus Configuration)',
        'EB & DG Synchronizing Panels and ATS/AMF Panels',
        'LT Bus Ducts, Sandwich Bus Ducts, and Rising Main Panels',
        'APFC Panels, AMF Control Panels, Relay Logic & PLC Control Panels',
        'Local Push-Button Stations, Junction Boxes, Lighting Panels (MLDB, LDB, SLDB, Utility DBs)',
        'VFD Control Panels and Custom-Built Panels',
      ],
      ctaLink: '#product-manufacturing',
      color: [[249, 115, 22], [234, 88, 12]],
    },
    {
      id: 'additional-services',
      title: 'Additional Services',
      description: 'Erection, Testing, Troubleshooting, and Commissioning of Industrial Electrical systems.',
      icon: <PiWrenchFill className="text-teal-500 text-3xl" />,
      features: [
        'Erection, Testing, Troubleshooting, and Commissioning of Bus Ducts, PCC/MCC, and Control Panels',
        'EB & DG Synchronizing, AMF, and APFC Panels',
        'PLC/VFD Control Panels and Custom-Built Systems',
        'Revamp of Power/MCC/Process Control Panels; Relay to PLC Conversions and System Integration',
        'Supervisory Assistance for Erection, Testing, and Commissioning at Site',
        'Plant Shutdowns and Turnarounds; Comprehensive Start-Up and Commissioning Services',
        'Supply of Field Instruments for Power, Material Handling, Chemical, Cooling Towers, Automotive, Cement, and Renewables',
      ],
      ctaLink: '#additional-services',
      color: [[239, 68, 68], [220, 38, 38]],
    },
  ];

  return (
    <main className="bg-gray-50 pt-[84px] lg:pt-[128px]">
      <SEO
        title="Our Services | GVS Controls"
        description="Expert Consultancy, Automation, Manufacturing, and Turnkey Services for Industrial Electrical and Control systems."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/services' : undefined}
      />

      {/* Hero Section – Kept Original + Added Manufacturing Resemblance */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white min-h-[50vh] flex items-center py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl leading-relaxed text-cyan-100"
            >
              Cutting-Edge Electrical and Automation Solutions for Industrial Excellence
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Overview – Kept Tilted Cards + Canvas Integration for Resemblance */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
              `,
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          />
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Service Offerings</h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive suite of solutions engineered to optimize your industrial operations.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((card, index) => (
              <li key={card.id} data-aos="fade-up" data-aos-delay={index * 100} style={{ '--index': index } as React.CSSProperties}>
                <TiltedCard
                  containerHeight="100%"
                  containerWidth="100%"
                  scaleOnHover={1.05}
                  rotateAmplitude={8}
                  showMobileWarning={false}
                  showTooltip={false}
                  className="h-full"
                >
                  <div className="h-full p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg">
                        {React.cloneElement(card.icon as React.ReactElement, { className: 'text-white', size: 24 })}
                      </div>
                      <h3 className="ml-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-gray-200 text-base mb-6 leading-relaxed">
                      {card.description}
                    </p>
                    <a
                      href={card.ctaLink}
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold text-base transition-all duration-200 group"
                    >
                      Learn More
                      <PiArrowRightBold className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </TiltedCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detailed Service Sections – Kept Original + Added Manufacturing Style Resemblance */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 transition-all duration-500 ${index % 6 === 0
              ? 'bg-gradient-to-br from-gray-50 to-teal-50'
              : index % 6 === 1
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50'
                : index % 6 === 2
                  ? 'bg-gradient-to-br from-gray-50 to-cyan-50'
                  : index % 6 === 3
                    ? 'bg-gradient-to-br from-teal-50 to-blue-50'
                    : index % 6 === 4
                      ? 'bg-gradient-to-br from-indigo-50 to-gray-50'
                      : 'bg-gradient-to-br from-cyan-50 to-teal-50'
            }`}
          style={{ scrollMarginTop: `${headerHeight + 32}px` }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div data-aos="fade-up">
              <div className="flex items-center mb-10">
                {React.cloneElement(service.icon as React.ReactElement, {
                  className: 'text-teal-600',
                  size: 32,
                })}
                <h2 className="ml-4 text-3xl md:text-4xl font-bold text-gray-900">{service.title}</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, i) => (
                  <motion.li
                    key={`${service.id}-feature-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start feature-item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-600 mr-3 flex-shrink-0 w-6 h-6 mt-0.5"
                      aria-hidden="true"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-600 via-teal-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Transform Your Operations?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-cyan-100"
          >
            Partner with us to unlock the full potential of your industrial systems with expert engineering and execution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-5 bg-white text-teal-700 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Get in Touch
              <PiArrowRightBold className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Services;