import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight as ChevronRightIcon, CheckCircle, Factory, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import pp1 from "../assets/pp-1.png";
import re1 from "../assets/re-1.png";
import st1 from "../assets/st-1.png";
import ch1 from "../assets/ch-1.png";
import st3 from "../assets/st-3.png";
import ch2 from "../assets/ch-2.png";

interface Project {
  id: string;
  client: string;
  title: string;
  description: string;
  highlights?: string[];
  impact?: string;
}

interface ClientProjects {
  client: string;
  projects: Project[];
}

interface GreenFieldProject {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Projects: React.FC = () => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isCaseStudiesInView, setIsCaseStudiesInView] = useState<boolean>(false);
  const [isPartnerInView, setIsPartnerInView] = useState<boolean>(false);
  const [isGreenFieldInView, setIsGreenFieldInView] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);
  const greenFieldRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Green Field Projects data from PDF
  const greenFieldProjects: GreenFieldProject[] = [
    {
      id: 'gf1',
      title: 'Power Plant (Thermal, Biomass and Solar)',
      description: 'Power Plant (Thermal, Biomass and Solar)',
      image: pp1,
    },
    {
      id: 'gf2',
      title: 'Renewable Energy Sectors (Biomass Gasification Technology)',
      description: 'Renewable Energy Sectors (Biomass Gasification Technology)',
      image: re1,
    },
    {
      id: 'gf3',
      title: 'Steel plants (Coke oven & SMS (Special Purpose Machineries))',
      description: 'Steel plants (Coke oven & SMS (Special Purpose Machineries))',
      image: st1,
    },
    {
      id: 'gf4',
      title: 'Cooling Towers (Concrete and FRP)',
      description: 'Cooling Towers (Concrete and FRP)',
      image: st3,
    },
    {
      id: 'gf5',
      title: 'Chemical Plants & Process Plants Water STP, ETP and WTP',
      description: 'Chemical Plants & Process Plants Water STP, ETP and WTP',
      image: ch1,
    },
    {
      id: 'gf6',
      title: 'Automobile Industries',
      description: 'Automobile Industries',
      image: ch2,
    },
  ];

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    document.title = 'Projects - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover GVS Controls’ top projects in power, steel, water, chemical, and automation.');
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );

    const caseStudiesObserver = new IntersectionObserver(
      ([entry]) => setIsCaseStudiesInView(entry.isIntersecting),
      { threshold: 0.05 }
    );

    const partnerObserver = new IntersectionObserver(
      ([entry]) => setIsPartnerInView(entry.isIntersecting),
      { threshold: 0.05 }
    );

    const greenFieldObserver = new IntersectionObserver(
      ([entry]) => setIsGreenFieldInView(entry.isIntersecting),
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (caseStudiesRef.current) caseStudiesObserver.observe(caseStudiesRef.current);
    if (partnerRef.current) partnerObserver.observe(partnerRef.current);
    if (greenFieldRef.current) greenFieldObserver.observe(greenFieldRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (caseStudiesRef.current) caseStudiesObserver.unobserve(caseStudiesRef.current);
      if (partnerRef.current) partnerObserver.unobserve(partnerRef.current);
      if (greenFieldRef.current) greenFieldObserver.unobserve(greenFieldRef.current);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 350, damping: 25, mass: 0.7, duration: 0.5 },
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      transition: { type: 'spring', stiffness: 400, damping: 20, duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % greenFieldProjects.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + greenFieldProjects.length) % greenFieldProjects.length);
  };

  const clientProjects: ClientProjects[] = [
    {
      client: 'M/s Aumund Engineering Private Limited - Chennai',
      projects: [
        {
          id: '1',
          client: 'M/s Aumund Engineering Private Limited - Chennai',
          title: 'SAMSON / BRU FEEDER',
          description: 'SAMSON / BRU FEEDER - ACC - Ametha, ULTRATECH - Gujarat, JK Cement HamirPur, JSW FZE - Fujairah, 2 X 800 Darapalli & LARA - NTPC Limited, 2 X 500 Durgapur & MEJIA Thermal Power Station, TITAN CEMENT - EGYPT and DALMIA CEMENT - INDIA',
          highlights: [
            'Custom-engineered feeder systems for diverse clients',
            'Adherence to stringent consultant standards',
            'Multi-location deployment across India and abroad',
          ],
          impact: 'Enhanced material flow efficiency and operational reliability.',
        },
        {
          id: '2',
          client: 'M/s Aumund Engineering Private Limited - Chennai',
          title: 'PADDEL FEEDER',
          description: 'PADDEL FEEDER - 2 X 350 MEENAKSHI ENERGY (P) LTD., - NELLORE - ANDHRA, McNalley Bharat Eng Company Limited.',
          highlights: [
            'Robust paddle feeder design for high reliability',
            'Timely commissioning to meet project deadlines',
            'Enhanced fuel handling capacity',
          ],
          impact: 'Improved fuel supply reliability and plant performance.',
        },
        {
          id: '3',
          client: 'M/s Aumund Engineering Private Limited - Chennai',
          title: 'CENTREX / BIN- X System',
          description: 'CENTREX / BIN- X System - ACC - AMETHA, Republic Cement - PHILIPPINES and Dalmia Cement - BELGUAM.',
          highlights: [
            'Efficient material handling systems',
            'Successful international project execution',
            'Reliable integration with existing plant infrastructure',
          ],
          impact: 'Increased material handling throughput and system efficiency.',
        },
        {
          id: '4',
          client: 'M/s Aumund Engineering Private Limited - Chennai',
          title: 'STACKER & RECLAIMER',
          description: 'STACKER & RECLAIMER - Technical Consultancy - Electrical & Instrumentation - JSW Cement - DOLVI',
          highlights: [
            'Advanced instrumentation solutions',
            'Optimized electrical system layouts',
            'Reduced operational downtime',
          ],
          impact: 'Enhanced material handling efficiency and system reliability.',
        },
      ],
    },
    {
      client: 'M/s Loesche Energy (P) Ltd. - Chennai',
      projects: [
        {
          id: '5',
          client: 'M/s Loesche Energy (P) Ltd. - Chennai',
          title: 'SAMSON / BRU FEEDER',
          description: 'SAMSON / BRU FEEDER - RCCPL 8000 MUKUTBAN - MAHARASHTRA',
          highlights: [
            'High-capacity feeder system for large-scale production',
            'Seamless integration with cement plant operations',
            'Reliable performance under demanding conditions',
          ],
          impact: 'Improved material handling for large-scale cement production.',
        },
        {
          id: '6',
          client: 'M/s Loesche Energy (P) Ltd. - Chennai',
          title: 'CENTREX / BIN- X System',
          description: 'CENTREX / BIN- X System - Friend Ship Power Company - DHAKA - BANGALADESH.',
          highlights: [
            'Successful cross-border project execution',
            'Efficient material handling system design',
            'Reliable operation for power generation',
          ],
          impact: 'Enhanced material handling for power plant operations.',
        },
      ],
    },
    {
      client: 'M/s Metco Roofing Private Limited - Chennai',
      projects: [
        {
          id: '7',
          client: 'M/s Metco Roofing Private Limited - Chennai',
          title: 'Consultancy Services',
          description: 'Consultancy Services - Complete Electrical Systems and lighting for Factory Set up.',
          highlights: [
            'Comprehensive electrical system design',
            'Optimized lighting solutions for factory efficiency',
            'Timely delivery to meet setup deadlines',
          ],
          impact: 'Enabled efficient factory operations with reliable electrical systems.',
        },
      ],
    },
    {
      client: 'M/s ARS Hydrojet Services (P) Ltd. - Chennai',
      projects: [
        {
          id: '8',
          client: 'M/s ARS Hydrojet Services (P) Ltd. - Chennai',
          title: 'HIGH PRESUURE WATER JETING SYSTEM',
          description: 'HIGH PRESUURE WATER JETING SYSTEM - All SAIL Plants - Bokaro, Rourkela, Durgapur Steel Plants and TATA JAMSHEDPUR.',
          highlights: [
            'Custom-designed high-pressure jetting systems',
            'Deployment across multiple steel plants',
            'Reduced maintenance costs and downtime',
          ],
          impact: 'Improved cleaning efficiency and enhanced plant safety.',
        },
      ],
    },
    {
      client: 'M/s Meenakshi Medical College and Hospital - Kanchipuram',
      projects: [
        {
          id: '9',
          client: 'M/s Meenakshi Medical College and Hospital - Kanchipuram',
          title: '11 KV Sub Station and Power Room',
          description: '11 KV Sub Station and Power Room - Complete Revamping and Retro Fitting, Supply, Installation, Testing and Commissioning of 11 KV VCB, 1250 KVA Distribution Transformer, Bus Ducts, PCC Panels and Power DB’s.',
          highlights: [
            'Modernized substation infrastructure',
            'Enhanced safety and CEIG compliance',
            'Minimized power outages for critical operations',
          ],
          impact: 'Ensured reliable power supply for critical medical operations.',
        },
      ],
    },
  ];

  return (
    <main style={{ paddingTop: headerHeight + 'px' }} className="min-h-screen w-full max-w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/90 via-blue-600/80 to-purple-600/70 opacity-95"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={heroVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center">
            <motion.span
              className="inline-block px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-white bg-white/15 backdrop-blur-lg rounded-full border border-white/25"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Our Legacy
            </motion.span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">
              GVS Controls Projects
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto">
              Engineering excellence across power, steel, water, chemical, and automation sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Green Field Projects Section */}
      <section ref={greenFieldRef} className="py-12 sm:py-16 md:py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGreenFieldInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-green-600 bg-green-100/50 dark:bg-green-900/20 rounded-full">
              Green Field Projects
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Pioneering Green Field Initiatives
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base">
              Building the future with innovative, sustainable, and fully integrated green field solutions.
            </p>
          </motion.div>

          {/* Carousel for Green Field Projects */}
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img
                    src={greenFieldProjects[currentSlide].image}
                    alt={greenFieldProjects[currentSlide].title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                    {greenFieldProjects[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                    {greenFieldProjects[currentSlide].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {greenFieldProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRef} className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Our Signature Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base">
              Over 30 years of expertise reflected in projects for SAIL, NTPC, CPCL, and more.
            </p>
          </motion.div>

          {clientProjects.map((clientGroup) => (
            <div key={clientGroup.client} className="mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent mb-6 relative group">
                {clientGroup.client}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-full group-hover:w-20 transition-all duration-300" />
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="grid grid-cols-1 gap-6 sm:gap-8"
              >
                {clientGroup.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md group transition-all duration-300 w-full"
                  >
                    <div className="flex flex-col h-full p-5 sm:p-6">
                      <motion.div variants={contentVariants} className="flex-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent mb-3 leading-tight relative group-hover:scale-[1.02] transition-transform duration-300">
                          {project.title}
                          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-full group-hover:w-16 transition-all duration-300" />
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
                          {project.description}
                        </p>
                        {project.highlights && (
                          <div className="mb-4">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">Highlights:</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm sm:text-base pl-4">
                              {project.highlights.map((highlight, index) => (
                                <li key={index}>{highlight}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {project.impact && (
                          <div>
                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">Impact:</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{project.impact}</p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-12 sm:py-16 md:py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCaseStudiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
              Case Studies
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Client Success Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base">
              Detailed insights into how our solutions have driven efficiency and reliability for industry leaders.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isCaseStudiesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                title: 'Optimizing Bulk Material Handling for JSW Cement',
                description: 'Our electrical and instrumentation consultancy for stacker and reclaimer systems at JSW Cement Dolvi improved material handling efficiency and reduced operational downtime.',
                results: [
                  '25% increase in material handling throughput',
                  'Reduced maintenance downtime by 30%',
                  'Enhanced safety with automated controls',
                  'Cost savings through optimized system design',
                ],
                icon: <Factory className="w-10 h-10 sm:w-12 sm:h-12" />,
              },
              {
                title: 'Revamping 11 KV Substation for Meenakshi Hospital',
                description: 'Complete overhaul of the hospital’s power infrastructure with modern control panels and transformers, ensuring uninterrupted power supply for critical operations.',
                results: [
                  '100% uptime for critical medical equipment',
                  '20% reduction in energy costs',
                  'Improved safety compliance with CEIG standards',
                  'Extended lifespan of electrical systems',
                ],
                icon: <Clock className="w-10 h-10 sm:w-12 sm:h-12" />,
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4 sm:mb-6">
                  {study.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">{study.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm">{study.description}</p>
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 text-sm">Key Results:</h4>
                  <ul className="space-y-2">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white font-medium rounded-md transition-all duration-300 text-sm"
                >
                  Read Full Case Study
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Section */}
      <section ref={partnerRef} className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPartnerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="max-w-3xl mx-auto bg-white/25 dark:bg-gray-800/25 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent mb-4 sm:mb-6">
                Partner with GVS Controls
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                Ready to transform your vision into reality? Let’s collaborate on your next project.
              </p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="gradient"
                  size="lg"
                  className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 border-none outline-none ring-0 focus:ring-0 focus:outline-none hover:ring-0 active:ring-0"
                  onClick={() => navigate('/contact')}
                >
                  Get in Touch
                  <ChevronRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-3" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
