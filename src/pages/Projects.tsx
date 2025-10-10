import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import powerPlant1 from "../assets/pp-1.png";
import powerPlant2 from "../assets/pp-2.png";
import powerPlant3 from "../assets/pp-3.png";
import powerPlant4 from "../assets/pp-4.png";
import powerPlant5 from "../assets/pp-5.png";
import powerPlant6 from "../assets/pp-6.png";
import renewableEnergy1 from "../assets/re-1.png";
import renewableEnergy2 from "../assets/re-2.png";
import renewableEnergy3 from "../assets/re-3.png";
import renewableEnergy4 from "../assets/re-4.png";
import renewableEnergy5 from "../assets/re-5.png";
import steelPlant1 from "../assets/st-1.png";
import steelPlant2 from "../assets/st-2.png";
import coolingTowers1 from "../assets/st-3.png";
import chemicalPlants1 from "../assets/ch-2.png";
import waterTreatment1 from "../assets/ch-1.png";
import fallbackImage from "../assets/ch-3.png";

interface Project {
  id: string;
  client: string;
  title: string;
  description: string;
}

interface ClientProjects {
  client: string;
  projects: Project[];
}

interface GreenFieldProject {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const Projects: React.FC = () => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isGreenFieldInView, setIsGreenFieldInView] = useState<boolean>(false);
  const [isPartnerInView, setIsPartnerInView] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>(new Array(8).fill(0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const greenFieldRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const greenFieldProjects: GreenFieldProject[] = [
    {
      id: 'gf1',
      title: 'Power Plant (Thermal, Biomass and Solar)',
      description: 'Comprehensive solutions for thermal, biomass, and solar power plants, delivering innovative and sustainable energy systems.',
      images: [powerPlant1, powerPlant2, powerPlant3, powerPlant4, powerPlant5, powerPlant6],
    },
    {
      id: 'gf2',
      title: 'Renewable Energy Sectors (Biomass Gasification Technology)',
      description: 'Advanced biomass gasification technology for sustainable energy production in renewable energy sectors.',
      images: [renewableEnergy1, renewableEnergy2, renewableEnergy3, renewableEnergy4, renewableEnergy5],
    },
    {
      id: 'gf3',
      title: 'Steel Plants (Coke Oven & SMS)',
      description: 'Specialized machinery and automation for coke oven and steel melting shop operations in steel plants.',
      images: [steelPlant1, steelPlant2],
    },
    {
      id: 'gf4',
      title: 'Cooling Towers (Concrete and FRP)',
      description: '-Highperformance concrete and FRP cooling towers for industrial applications.',
      images: [coolingTowers1],
    },
    {
      id: 'gf5',
      title: 'Chemical Plants & Process Plants',
      description: 'Tailored automation and control systems for chemical and process plant operations.',
      images: [chemicalPlants1],
    },
    {
      id: 'gf6',
      title: 'Water STP, ETP, and WTP',
      description: 'Advanced solutions for sewage, effluent, and water treatment plants.',
      images: [waterTreatment1],
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
      metaDescription.setAttribute('content', 'Discover GVS Controls’ projects in power, steel, cement, chemical, and automation sectors.');
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Lowered threshold for better visibility detection
    );

    const greenFieldObserver = new IntersectionObserver(
      ([entry]) => setIsGreenFieldInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const partnerObserver = new IntersectionObserver(
      ([entry]) => setIsPartnerInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (greenFieldRef.current) greenFieldObserver.observe(greenFieldRef.current);
    if (partnerRef.current) partnerObserver.observe(partnerRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (greenFieldRef.current) greenFieldObserver.unobserve(greenFieldRef.current);
      if (partnerRef.current) partnerObserver.unobserve(partnerRef.current);
    };
  }, []);

  // Lock isInView to true once section is in view
  useEffect(() => {
    if (isInView) {
      setIsInView(true); // Persist visibility
    }
  }, [isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndexes = [...prev];
        newIndexes[currentSlide] = (newIndexes[currentSlide] + 1) % greenFieldProjects[currentSlide].images.length;
        return newIndexes;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25, duration: 0.6 },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      transition: { type: 'spring', stiffness: 400, damping: 20, duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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

  const imageSlideVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { duration: 0.7, type: 'spring', stiffness: 200, damping: 20 } 
    },
    exit: { opacity: 0, scale: 1.2, rotate: 10, transition: { duration: 0.5 } },
  };

  const titleWaveVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % greenFieldProjects.length);
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[currentSlide] = 0;
      return newIndexes;
    });
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + greenFieldProjects.length) % greenFieldProjects.length);
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[currentSlide] = 0;
      return newIndexes;
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[currentSlide] = (newIndexes[currentSlide] + 1) % greenFieldProjects[currentSlide].images.length;
      return newIndexes;
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[currentSlide] = (newIndexes[currentSlide] - 1 + greenFieldProjects[currentSlide].images.length) % greenFieldProjects[currentSlide].images.length;
      return newIndexes;
    });
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
        },
        {
          id: '2',
          client: 'M/s Aumund Engineering Private Limited - Chennai',
          title: 'PADDLE FEEDER',
          description: 'PADDLE FEEDER - 2 X 350 MEENAKSHI ENERGY (P) LTD., - NELLORE - ANDHRA, McNalley Bharat Eng Company Limited.',
        },
        {
          id: '3',
          client: 'M/s Aumund Engineering Private Limited - Chennai',
          title: 'CENTREX / BIN- X System',
          description: 'CENTREX / BIN- X System - ACC - AMETHA, Republic Cement - PHILIPPINES and Dalmia Cement - BELGUAM.',
        },
        {
          id: '4',
          client: 'M/s Aumund Engineering Private Limited - Chennai',
          title: 'STACKER & RECLAIMER',
          description: 'STACKER & RECLAIMER - Technical Consultancy - Electrical & Instrumentation - JSW Cement - DOLVI',
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
        },
        {
          id: '6',
          client: 'M/s Loesche Energy (P) Ltd. - Chennai',
          title: 'CENTREX / BIN- X System',
          description: 'CENTREX / BIN- X System - Friend Ship Power Company - DHAKA - BANGLADESH.',
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
        },
      ],
    },
    {
      client: 'M/s ARS Hydrojet Services (P) Ltd. - Chennai',
      projects: [
        {
          id: '8',
          client: 'M/s ARS Hydrojet Services (P) Ltd. - Chennai',
          title: 'HIGH PRESSURE WATER JETTING SYSTEM',
          description: 'HIGH PRESSURE WATER JETTING SYSTEM - All SAIL Plants - Bokaro, Rourkela, Durgapur Steel Plants and TATA JAMSHEDPUR.',
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
        },
      ],
    },
  ];

  return (
    <main style={{ paddingTop: headerHeight + 'px' }} className="min-h-screen w-full max-w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SEO
        title="Projects"
        description="Discover GVS Controls’ projects in power, steel, cement, chemical, and automation sectors."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/projects' : undefined}
      />
      <style>{`
        .tilt-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .wave-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(to right, #22c55e, #2563eb);
          border-radius: 9999px;
          transition: width 0.5s ease-out;
        }
        .group:hover .wave-underline {
          width: 80px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/90 via-blue-600/80 to-purple-600/70 opacity-95"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={heroVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center">
            <motion.span
              className="inline-block px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-white bg-white/15 backdrop-blur-lg rounded-full border border-white/25"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Our Legacy
            </motion.span>
            <motion.h1
              variants={titleWaveVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight"
            >
              {'GVS Controls Projects'.split('').map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              variants={contentVariants}
              className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto"
            >
              Engineering excellence across power, steel, cement, chemical, and automation sectors.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Green Field Projects Section */}
      <section ref={greenFieldRef} className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGreenFieldInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.span
              className="inline-block px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-green-600 bg-green-100/50 dark:bg-green-900/20 rounded-full"
              style={{ transform: 'translateY(0)', opacity: 100 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Green Field Projects
            </motion.span>
            <motion.h2
              variants={titleWaveVariants}
              initial="hidden"
              animate={isGreenFieldInView ? 'visible' : 'hidden'}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent relative group"
            >
              {'Pioneering Green Field Initiatives'.split('').map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
              <span className="wave-underline" />
            </motion.h2>
            <motion.p
              variants={contentVariants}
              className="text-gray-600 dark:text-gray-300 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base"
            >
              Building the future with innovative, sustainable, and fully integrated green field solutions.
            </motion.p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl overflow-hidden tilt-card"
            >
              <div className="flex flex-col lg:flex-row items-center">
                {/* Image Section */}
                <div className="lg:w-1/2 relative h-64 sm:h-80 lg:h-96 w-full">
                  <motion.div
                    key={currentImageIndex[currentSlide]}
                    variants={imageSlideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  >
                    <img
                      src={greenFieldProjects[currentSlide].images[currentImageIndex[currentSlide]] || fallbackImage}
                      alt={`${greenFieldProjects[currentSlide].title} - Image ${currentImageIndex[currentSlide] + 1}`}
                      className="w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-r-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </motion.div>
                  {/* Image Navigation */}
                  {greenFieldProjects[currentSlide].images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 z-10">
                      <motion.button
                        onClick={handlePrevImage}
                        className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all"
                        aria-label="Previous Image"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                      </motion.button>
                      <motion.button
                        onClick={handleNextImage}
                        className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all"
                        aria-label="Next Image"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRightIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                      </motion.button>
                    </div>
                  )}
                  {/* Image Indicators */}
                  {greenFieldProjects[currentSlide].images.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-10">
                      {greenFieldProjects[currentSlide].images.map((_, idx) => (
                        <motion.span
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex[currentSlide] === idx ? 'bg-green-500 scale-125' : 'bg-white/70'
                          }`}
                          whileHover={{ scale: 1.5 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {/* Content Section */}
                <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <motion.h3
                    variants={contentVariants}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4"
                  >
                    {greenFieldProjects[currentSlide].title}
                  </motion.h3>
                  <motion.p
                    variants={contentVariants}
                    className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed"
                  >
                    {greenFieldProjects[currentSlide].description}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Project Navigation */}
            <div className="absolute inset-x-0 -top-8 sm:-top-12 flex justify-between px-4 lg:px-0 z-20">
              <motion.button
                onClick={handlePrevSlide}
                className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
                aria-label="Previous Project"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>
              <motion.button
                onClick={handleNextSlide}
                className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
                aria-label="Next Project"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-8 flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl">
                {greenFieldProjects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.15, rotate: 5, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentSlide === index ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'
                    } tilt-card`}
                  >
                    <img
                      src={project.images[0] || fallbackImage}
                      alt={`Thumbnail for ${project.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center px-2">
                        {project.title.split('(')[0].trim()}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {greenFieldProjects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-green-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Project ${index + 1}`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 relative" style={{ minHeight: '400px', zIndex: 10 }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.h2
              variants={titleWaveVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent relative group"
            >
              {'Our Signature Projects'.split('').map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
              <span className="wave-underline" />
            </motion.h2>
            <motion.p
              variants={contentVariants}
              className="text-gray-600 dark:text-gray-300 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base"
            >
              Over 30 years of expertise reflected in projects for SAIL, NTPC, CPCL, and more.
            </motion.p>
          </motion.div>

          {clientProjects.map((clientGroup) => (
            <div key={clientGroup.client} className="mb-12">
              <motion.h3
                variants={titleWaveVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent mb-6 relative group"
              >
                {clientGroup.client.split('').map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
                <span className="wave-underline" />
              </motion.h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ once: true }} // Prevent re-animation
                className="grid grid-cols-1 gap-6 sm:gap-8"
              >
                {clientGroup.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    transition={{ once: true }} // Prevent re-animation
                    className="relative rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md group transition-all duration-300 w-full tilt-card"
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
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
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
              <motion.h3
                variants={titleWaveVariants}
                initial="hidden"
                animate={isPartnerInView ? 'visible' : 'hidden'}
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent mb-4 sm:mb-6 relative group"
              >
                {'Partner with GVS Controls'.split('').map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
                <span className="wave-underline" />
              </motion.h3>
              <motion.p
                variants={contentVariants}
                className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base"
              >
                Ready to transform your vision into reality? Let’s collaborate on your next project.
              </motion.p>
              <motion.div whileHover={{ scale: 1.1, rotate: 3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="gradient"
                  size="lg"
                  className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full border-none hover:border-none active:border-none focus:border-none outline-none hover:outline-none active:outline-none focus:outline-none ring-0 hover:ring-0 active:ring-0 focus:ring-0 no-gradient-border z-[10000]"
                  style={{ outline: 'none', border: 'none' }}
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