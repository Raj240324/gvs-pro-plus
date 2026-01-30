"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, CheckCircle, ArrowRight, Award, Briefcase, Building } from 'lucide-react';
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

// GVS Controls Projects (2017-Present)
const gvsControlsProjects: ClientGroup[] = [
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
      { title: '11 KV Sub Station and Power Room', description: "Complete Revamping and Retro Fitting, Supply, Installation, Testing and Commissioning of 11 KV VCB, 1250 KVA Distribution Transformer, Bus Ducts, PCC Panels and Power DB's." },
    ],
  },
];

// Founder's Prior Experience (Before 2017)
const founderPriorProjects = [
  {
    sector: 'Steel Plants',
    clients: ['SAIL (Bokaro, Rourkela, Durgapur, Bhilai)', 'TISCO (Tata Steel, Jamshedpur)', 'RINL (Rashtriya Ispat Nigam Ltd, Vizag)'],
    description: 'Coke Oven, SMS (Special Purpose Machineries), Bulk Material Handling Systems',
  },
  {
    sector: 'Power Plants',
    clients: ['NTPC Projects', 'GMR Power', 'Meenakshi Energy'],
    description: 'Thermal, Biomass, and Solar Power Plant E&I Systems',
  },
  {
    sector: 'Refineries & Chemical Plants',
    clients: ['CPCL (Chennai Petroleum)', 'MRL (Madras Refinery)', 'Cochin Refinery'],
    description: 'Process Plants, Water Treatment (STP, ETP, WTP)',
  },
  {
    sector: 'Cement Plants',
    clients: ['Aditya Birla Group', 'Sterlite Group', 'Various Cement Majors'],
    description: 'Bulk Material Handling, Automation Systems',
  },
  {
    sector: 'Special Projects',
    clients: ['Sea Bird Project (Indian Navy)', 'Cooling Towers (Concrete & FRP)', 'Automobile Industries'],
    description: 'Strategic and specialized E&I installations',
  },
];

const companiesWorkedAt = [
  { name: 'Shriram EPC Ltd.', description: 'Senior Engineering Roles' },
  { name: 'L&T (Larsen & Toubro)', description: 'EPC Project Execution' },
  { name: 'Black Stone Group Technologies', description: 'E&I Solutions' },
];

const Projects: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeTab, setActiveTab] = useState<'gvs' | 'founder'>('gvs');

  useEffect(() => {
    const update = () => {
      const header = document.querySelector('header');
      if (header) setHeaderHeight(header.offsetHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const clientHeader = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-[84px] lg:pt-[128px]">
      <SEO
        title="Projects | GVS Controls"
        description="Landmark Electrical & Automation projects by GVS Controls (2017-present) and our founder's 30+ years of prior EPC experience."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/projects' : undefined}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center py-16 md:py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 overflow-hidden">
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
            Our Project Portfolio
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed px-4"
          >
            GVS Controls projects since 2017 + Founder's 30+ years of prior EPC experience
          </motion.p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white dark:bg-slate-900 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('gvs')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'gvs'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <Building className="inline-block w-5 h-5 mr-2" />
              GVS Controls (2017-Present)
            </button>
            <button
              onClick={() => setActiveTab('founder')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'founder'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <Briefcase className="inline-block w-5 h-5 mr-2" />
              Founder's Prior Experience
            </button>
          </div>
        </div>
      </section>

      {/* GVS Controls Projects Tab */}
      {activeTab === 'gvs' && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-4">
                SINCE 2017
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                GVS Controls Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Turnkey Electrical & Automation solutions executed under the GVS Controls banner since our founding in 2017.
              </p>
            </motion.div>

            {gvsControlsProjects.map((group) => (
              <motion.div
                key={group.client}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="mb-16 lg:mb-20 last:mb-0"
              >
                <motion.div variants={clientHeader} className="flex items-center gap-3 sm:gap-4 mb-8 lg:mb-10">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg flex-shrink-0">
                    <Factory className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white leading-tight">
                    {group.client}
                  </h2>
                </motion.div>

                <div className="space-y-5 sm:space-y-6">
                  {group.projects.map((proj, i) => (
                    <motion.div
                      key={i}
                      variants={card}
                      whileHover={{ x: 6, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group relative p-5 sm:p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-md hover:shadow-lg border border-gray-100 dark:border-slate-700 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 sm:gap-5">
                        <div className="mt-0.5 flex-shrink-0">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 group-hover:text-cyan-600 transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors duration-300">
                            {proj.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
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
      )}

      {/* Founder's Prior Experience Tab */}
      {activeTab === 'founder' && (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-sm font-semibold mb-4">
                30+ YEARS PRIOR EXPERIENCE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Founder's Track Record
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Before founding GVS Controls in 2017, our promoter executed landmark projects across India while working at leading engineering companies.
              </p>
            </motion.div>

            {/* Companies Worked At */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {companiesWorkedAt.map((company, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800"
                >
                  <Briefcase className="w-10 h-10 text-amber-600 dark:text-amber-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{company.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{company.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Prior Projects by Sector */}
            <div className="space-y-8">
              {founderPriorProjects.map((sector, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3">
                        {sector.sector}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{sector.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {sector.clients.map((client, j) => (
                          <span
                            key={j}
                            className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium"
                          >
                            {client}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                <strong>Note:</strong> The projects listed above were executed by our founder while working at Shriram EPC Ltd., L&T, and Black Stone Group Technologies — prior to establishing GVS Controls in 2017. This experience forms the foundation of expertise that GVS Controls brings to every project.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
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
            Let's deliver excellence together — on time, on budget, zero compromise.
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