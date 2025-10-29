"use client";
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

/* ---------- ORIGINAL IMAGE IMPORTS (only existing ones) ---------- */
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([]);
  const [isGreenFieldInView, setIsGreenFieldInView] = useState(false);
  const [isClientInView, setIsClientInView] = useState(false);
  const [isPartnerInView, setIsPartnerInView] = useState(false);

  const greenFieldRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /* ---------- GREEN‑FIELD PROJECTS (6 ONLY) ---------- */
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
      description: 'High‑performance concrete and FRP cooling towers for industrial applications.',
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

  /* ---------- IMAGE INDEX INITIALISATION ---------- */
  useEffect(() => {
    setCurrentImageIndex(new Array(greenFieldProjects.length).fill(0));
  }, []);

  /* ---------- HEADER HEIGHT ---------- */
  useEffect(() => {
    const update = () => {
      const header = document.querySelector('header');
      if (header) setHeaderHeight(header.offsetHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ---------- SEO ---------- */
  useEffect(() => {
    document.title = 'Projects - GVS Controls';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Discover GVS Controls’ expertise in power plants, renewable energy, steel, cooling towers, chemical plants, and water treatment systems.'
      );
    }
  }, []);

  /* ---------- INTERSECTION OBSERVERS ---------- */
  useEffect(() => {
    const gfObs = new IntersectionObserver(([e]) => setIsGreenFieldInView(e.isIntersecting), { threshold: 0.1 });
    const clientObs = new IntersectionObserver(([e]) => setIsClientInView(e.isIntersecting), { threshold: 0.1 });
    const partnerObs = new IntersectionObserver(([e]) => setIsPartnerInView(e.isIntersecting), { threshold: 0.1 });

    if (greenFieldRef.current) gfObs.observe(greenFieldRef.current);
    if (clientRef.current) clientObs.observe(clientRef.current);
    if (partnerRef.current) partnerObs.observe(partnerRef.current);

    return () => {
      gfObs.disconnect();
      clientObs.disconnect();
      partnerObs.disconnect();
    };
  }, []);

  /* ---------- AUTO‑ROTATE IMAGES ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImageIndex(prev => {
        const next = [...prev];
        next[currentSlide] = (next[currentSlide] + 1) % greenFieldProjects[currentSlide].images.length;
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [currentSlide]);

  /* ---------- NAVIGATION HELPERS ---------- */
  const nextSlide = () => setCurrentSlide(p => (p + 1) % greenFieldProjects.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + greenFieldProjects.length) % greenFieldProjects.length);
  const nextImage = () => setCurrentImageIndex(prev => {
    const n = [...prev];
    n[currentSlide] = (n[currentSlide] + 1) % greenFieldProjects[currentSlide].images.length;
    return n;
  });
  const prevImage = () => setCurrentImageIndex(prev => {
    const n = [...prev];
    n[currentSlide] = (n[currentSlide] - 1 + greenFieldProjects[currentSlide].images.length) % greenFieldProjects[currentSlide].images.length;
    return n;
  });

  /* ---------- CLIENT PROJECTS (9 groups, 13 items) ---------- */
  const clientProjects: ClientProjects[] = [
    {
      client: 'M/s Aumund Engineering Private Limited - Chennai',
      projects: [
        { id: 'a1', client: '', title: 'SAMSON / BRU FEEDER', description: 'SAMSON / BRU FEEDER - ACC - Ametha, ULTRATECH - Gujarat, JK Cement HamirPur, JSW FZE - Fujairah, 2 X 800 Darapalli & LARA - NTPC Limited, 2 X 500 Durgapur & MEJIA Thermal Power Station, TITAN CEMENT - EGYPT and DALMIA CEMENT - INDIA' },
        { id: 'a2', client: '', title: 'PADDLE FEEDER', description: 'PADDLE FEEDER - 2 X 350 MEENAKSHI ENERGY (P) LTD., - NELLORE - ANDHRA, McNalley Bharat Eng Company Limited.' },
        { id: 'a3', client: '', title: 'CENTREX / BIN- X System', description: 'CENTREX / BIN- X System - ACC - AMETHA, Republic Cement - PHILIPPINES and Dalmia Cement - BELGUAM.' },
        { id: 'a4', client: '', title: 'STACKER & RECLAIMER', description: 'STACKER & RECLAIMER - Technical Consultancy - Electrical & Instrumentation - JSW Cement - DOLVI' },
      ],
    },
    {
      client: 'M/s Loesche Energy (P) Ltd. - Chennai',
      projects: [
        { id: 'l1', client: '', title: 'SAMSON / BRU FEEDER', description: 'SAMSON / BRU FEEDER - RCCPL 8000 MUKUTBAN - MAHARASHTRA' },
        { id: 'l2', client: '', title: 'CENTREX / BIN- X System', description: 'CENTREX / BIN- X System - Friend Ship Power Company - DHAKA - BANGLADESH.' },
      ],
    },
    {
      client: 'M/s Metco Roofing Private Limited - Chennai',
      projects: [
        { id: 'm1', client: '', title: 'Consultancy Services', description: 'Consultancy Services - Complete Electrical Systems and lighting for Factory Set up.' },
      ],
    },
    {
      client: 'M/s ARS Hydrojet Services (P) Ltd. - Chennai',
      projects: [
        { id: 'ars1', client: '', title: 'HIGH PRESSURE WATER JETTING SYSTEM', description: 'HIGH PRESSURE WATER JETTING SYSTEM - All SAIL Plants - Bokaro, Rourkela, Durgapur Steel Plants and TATA JAMSHEDPUR.' },
      ],
    },
    {
      client: 'M/s Meenakshi Medical College and Hospital - Kanchipuram',
      projects: [
        { id: 'mm1', client: '', title: '11 KV Sub Station and Power Room', description: '11 KV Sub Station and Power Room - Complete Revamping and Retro Fitting, Supply, Installation, Testing and Commissioning of 11 KV VCB, 1250 KVA Distribution Transformer, Bus Ducts, PCC Panels and Power DB’s.' },
      ],
    },
    {
      client: 'M/s Steel Authority of India Limited (SAIL)',
      projects: [
        { id: 'sail1', client: '', title: 'Electrical Revamping', description: 'Revamping of electrical systems in Bokaro, Rourkela, and Durgapur Steel Plants.' },
      ],
    },
    {
      client: 'M/s Tata Iron and Steel Company (TISCO)',
      projects: [
        { id: 'tisco1', client: '', title: 'Automation Upgrades', description: 'PLC and SCADA upgrades for Jamshedpur Steel Works.' },
      ],
    },
    {
      client: 'M/s Rashtriya Ispat Nigam Limited (RINL)',
      projects: [
        { id: 'rinl1', client: '', title: 'Power Distribution', description: 'Design and commissioning of power distribution panels for Visakhapatnam Steel Plant.' },
      ],
    },
    {
      client: 'M/s Chennai Petroleum Corporation Limited (CPCL)',
      projects: [
        { id: 'cpcl1', client: '', title: 'Instrumentation Supply', description: 'Supply and installation of field instruments for refinery expansion.' },
      ],
    },
  ];

  /* ---------- ANIMATION VARIANTS ---------- */
  const titleWave = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };
  const letter = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const paragraphVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, type: 'spring', stiffness: 100, damping: 20 }
    }),
    hover: { y: -4, transition: { type: 'spring', stiffness: 300 } }
  };

  return (
    <main style={{ paddingTop: `${headerHeight}px` }} className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SEO
        title="Projects - GVS Controls"
        description="Discover GVS Controls’ expertise in power plants, renewable energy, steel, cooling towers, chemical plants, and water treatment systems."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/projects' : undefined}
      />

      <style>{`
        .wave-underline {
          position: absolute;
          bottom: -10px;
          left: 0;
          height: 4px;
          width: 0;
          background: linear-gradient(to right, #22c55e, #2563eb);
          border-radius: 9999px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group:hover .wave-underline { width: 120px; }

        .signature-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          position: relative;
          overflow: hidden;
        }
        .signature-bg::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .project-paragraph {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          padding: 1.5rem 2rem;
          border-radius: 1.5rem;
          border-left: 4px solid #22c55e;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        .project-paragraph:hover {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
          border-left-color: #2563eb;
        }
      `}</style>

      {/* ---------- HERO ---------- */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/90 via-blue-600/80 to-purple-600/70 opacity-95"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-white bg-white/15 backdrop-blur rounded-full"
            whileHover={{ scale: 1.1 }} transition={{ type: 'spring' }}>
            Our Legacy
          </motion.span>
          <motion.h1 variants={titleWave} initial="hidden" animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            {'GVS Controls Projects'.split('').map((c, i) => (
              <motion.span key={i} variants={letter}>{c}</motion.span>
            ))}
          </motion.h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Engineering excellence across power, steel, chemical, and automation sectors.
          </p>
        </div>
      </section>

      {/* ---------- GREEN‑FIELD ---------- */}
      <section ref={greenFieldRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isGreenFieldInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
            <motion.h2 variants={titleWave} initial="hidden" animate={isGreenFieldInView ? 'visible' : 'hidden'} className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent relative inline-block group">
              {'Pioneering Green Field Initiatives'.split('').map((c, i) => (
                <motion.span key={i} variants={letter}>{c}</motion.span>
              ))}
              <span className="wave-underline" />
            </motion.h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <motion.div key={currentSlide} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 relative h-64 sm:h-80 lg:h-96">
                  <motion.img
                    key={currentImageIndex[currentSlide]}
                    src={greenFieldProjects[currentSlide].images[currentImageIndex[currentSlide]] || fallbackImage}
                    alt={`${greenFieldProjects[currentSlide].title} - Image ${currentImageIndex[currentSlide] + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                  {greenFieldProjects[currentSlide].images.length > 1 && (
                    <>
                      <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
                        <motion.button onClick={prevImage} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="bg-white/90 p-3 rounded-full shadow-lg">
                          <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button onClick={nextImage} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="bg-white/90 p-3 rounded-full shadow-lg">
                          <ChevronRightIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                        {greenFieldProjects[currentSlide].images.map((_, i) => (
                          <motion.span key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex[currentSlide] === i ? 'bg-green-500' : 'bg-white/70'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {greenFieldProjects[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{greenFieldProjects[currentSlide].description}</p>
                </div>
              </div>
            </motion.div>

            {/* Project navigation */}
            <div className="absolute inset-x-0 -top-12 flex justify-between px-4">
              <motion.button onClick={prevSlide} whileHover={{ scale: 1.2 }} className="bg-green-500 p-3 rounded-full text-white shadow-lg">
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button onClick={nextSlide} whileHover={{ scale: 1.2 }} className="bg-green-500 p-3 rounded-full text-white shadow-lg">
                <ChevronRightIcon className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Thumbnails */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {greenFieldProjects.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => setCurrentSlide(i)}
                  whileHover={{ scale: 1.1 }}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${currentSlide === i ? 'border-green-500' : 'border-gray-300'}`}
                >
                  <img src={p.images[0] || fallbackImage} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                    <span className="text-white text-xs font-medium text-center line-clamp-2">{p.title.split(' (')[0]}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- OUR SIGNATURE PROJECTS – PARAGRAPH STYLE ---------- */}
      <section ref={clientRef} className="py-20 signature-bg relative">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate={isClientInView ? "visible" : "hidden"} className="text-center mb-20">
            <motion.h2 variants={titleWave} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent relative inline-block group">
              {'Our Signature Projects'.split('').map((c, i) => (
                <motion.span key={i} variants={letter}>{c}</motion.span>
              ))}
              <span className="wave-underline" />
            </motion.h2>
          </motion.div>

          <div className="space-y-24">
            {clientProjects.map((group, groupIdx) => (
              <motion.div
                key={group.client}
                initial={{ opacity: 0, y: 50 }}
                animate={isClientInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: groupIdx * 0.2 }}
                className="relative"
              >
                {/* Client Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isClientInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: groupIdx * 0.2 + 0.3 }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold text-sm shadow-lg mb-8"
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  {group.client}
                </motion.div>

                {/* Projects as Animated Paragraphs */}
                <div className="space-y-6">
                  {group.projects.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      custom={idx}
                      variants={paragraphVariant}
                      initial="hidden"
                      animate={isClientInView ? "visible" : "hidden"}
                      whileHover="hover"
                      className="project-paragraph"
                    >
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        <span className="font-bold text-green-600">{p.title}:</span>{' '}
                        {p.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section ref={partnerRef} className="py-16 bg-gradient-to-br from-indigo-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isPartnerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <h3 className="text-3xl font-bold mb-4">Partner with GVS Controls</h3>
            <p className="mb-8 max-w-2xl mx-auto">Ready to transform your vision into reality? Let’s collaborate on your next project.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => navigate('/contact')} className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 shadow-lg">
                Get in Touch <ChevronRightIcon className="inline ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Projects;