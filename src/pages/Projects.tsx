
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Factory, CheckCircle2, Award, Briefcase, Building2, Zap, Settings, Globe, LayoutGrid, Clock, ArrowRight } from 'lucide-react';
import { useContactModal } from '../hooks/use-contact-modal';
import SEO from '../components/SEO';

// --- Data Models ---
interface Project {
  title: string;
  description: string;
}

interface ClientGroup {
  client: string;
  location?: string;
  projects: Project[];
  icon: any;
  color: string;
}

// --- Data (Strict Adherence to User Content) ---
const gvsControlsProjects: ClientGroup[] = [
  {
    client: 'M/s Aumund Engineering Private Limited',
    location: 'Chennai',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    projects: [
      { title: 'SAMSON / BRU FEEDER', description: 'ACC – Ametha, ULTRATECH – Gujarat, JK Cement – HamirPur, JSW FZE – Fujairah, 2 X 800 Darapalli & LARA – NTPC Limited, 2 X 500 Durgapur & MEJIA Thermal Power Station, TITAN CEMENT – EGYPT and DALMIA CEMENT – INDIA' },
      { title: 'PADDLE FEEDER', description: '2 X 350 MEENAKSHI ENERGY (P) LTD. – NELLORE – ANDHRA, McNalley Bharat Eng Company Limited.' },
      { title: 'CENTREX / BIN-X System', description: 'ACC – AMETHA, Republic Cement – PHILIPPINES and Dalmia Cement – BELGAUM.' },
      { title: 'STACKER & RECLAIMER', description: 'Technical Consultancy – Electrical & Instrumentation – JSW Cement – DOLVI' },
    ],
  },
  {
    client: 'M/s Loesche Energy (P) Ltd.',
    location: 'Delhi & Chennai',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    projects: [
      { title: 'SAMSON / BRU FEEDER', description: 'RCCPL 8000 MUKUTBAN – MAHARASHTRA' },
      { title: 'CENTREX / BIN-X System', description: 'Friend Ship Power Company – DHAKA – BANGLADESH.' },
    ],
  },
  {
    client: 'M/s Metco Roofing Private Limited',
    location: 'Chennai',
    icon: Building2,
    color: 'from-emerald-500 to-teal-500',
    projects: [
      { title: 'Consultancy Services', description: 'Complete Electrical Systems and lighting for Factory Set up.' },
    ],
  },
  {
    client: 'M/s ARS Hydrojet Services (P) Ltd.',
    location: 'Chennai',
    icon: Settings,
    color: 'from-indigo-500 to-purple-500',
    projects: [
      { title: 'HIGH PRESSURE WATER JETTING SYSTEM', description: 'All SAIL Plants – Bokaro, Rourkela, Durgapur Steel Plants and TATA JAMSHEDPUR.' },
    ],
  },
  {
    client: 'M/s Meenakshi Medical College and Hospital',
    location: 'Kanchipuram',
    icon: Award,
    color: 'from-rose-500 to-pink-500',
    projects: [
      { title: '11 KV Sub Station and Power Room', description: "Complete Revamping and Retro Fitting, Supply, Installation, Testing and Commissioning of 11 KV VCB, 1250 KVA Distribution Transformer, Bus Ducts, PCC Panels and Power DB's." },
    ],
  },
];

const founderPriorProjects = [
  {
    sector: 'Steel Giants',
    clients: ['SAIL', 'Tata Steel', 'RINL'],
    stats: 'Major Plants',
    description: 'Coke Oven, SMS Machineries, and Bulk Material Handling Systems.',
    icon: Factory,
    color: 'bg-orange-500'
  },
  {
    sector: 'Power Sector',
    clients: ['NTPC', 'GMR', 'Meenakshi'],
    stats: '500+ MW',
    description: 'E&I Systems for Thermal, Biomass, and Solar Power Plants.',
    icon: Zap,
    color: 'bg-yellow-500'
  },
  {
    sector: 'Refineries',
    clients: ['CPCL', 'MRL', 'Cochin Refinery'],
    stats: 'Safety Critical',
    description: 'Process automation and Water Treatment (STP/ETP).',
    icon: Settings,
    color: 'bg-blue-500'
  },
  {
    sector: 'Cement',
    clients: ['Aditya Birla', 'Sterlite'],
    stats: 'Pan-India',
    description: 'Automation for Bulk Material Handling units.',
    icon: Building2,
    color: 'bg-emerald-500'
  },
];

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gvs' | 'founder'>('gvs');
  const contactModal = useContactModal();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black selection:bg-teal-500/30">
      <SEO
        title="Projects | GVS Controls"
        description="Our portfolio of turnkey engineering solutions and the founder's 30-year legacy of industrial excellence."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/projects' : undefined}
      />

      {/* --- HERO SECTION (Premium Engineering Texture) --- */}
      <div className="bg-white dark:bg-slate-900">
         <section className="relative min-h-[50vh] flex flex-col items-center justify-center pt-32 lg:pt-48 pb-20 overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-b-[3rem] shadow-2xl z-10">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div className="container relative z-10 px-6 text-center">
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6"
               >
                  <LayoutGrid size={12} /> Project Portfolio
               </motion.div>
               
               <motion.h1 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
               >
                  Built for <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-100">Performance.</span>
               </motion.h1>

               <motion.p 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm md:text-lg text-teal-50 max-w-2xl mx-auto leading-relaxed border-l-2 border-teal-400 pl-4 bg-teal-900/10 backdrop-blur-sm pr-2 py-1 rounded-r-lg"
               >
                  Delivering complex Turnkey E&I solutions for Cement, Steel, and Power sectors since <span className="font-bold text-white">2017</span>.
               </motion.p>
            </div>
         </section>
      </div>

      {/* --- TABS (Floating Glass Dock) --- */}
      {/* Tab Navigation */}
      <section className="py-8 bg-white dark:bg-slate-900 sticky top-0 z-40 shadow-sm/50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-4 flex justify-center">
          <LayoutGroup>
            <div className="bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-full inline-flex relative">
              {[
                { id: 'gvs', label: 'GVS Controls (2017-Present)', icon: Building2 },
                { id: 'founder', label: "Founder's Legacy (Prior)", icon: Briefcase }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 ${
                    activeTab === tab.id 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-tab-pill"
                      className="absolute inset-0 bg-white dark:bg-slate-700 shadow-sm rounded-full border border-slate-200/50 dark:border-slate-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <tab.icon className="w-4 h-4 relative z-20" />
                  <span className="relative z-20">{tab.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </section>
      {/* --- CONTENT (Premium Cards) --- */}
      <section className="container mx-auto px-4 md:px-6 pb-32">
         <AnimatePresence mode="wait">
            
            {/* GVS PROJECTS GRID */}
            {activeTab === 'gvs' && (
               <motion.div 
                  key="gvs"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
               >
                  {gvsControlsProjects.map((group, idx) => (
                     <motion.div 
                        key={idx}
                        whileHover={{ y: -8 }}
                        className={`group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${idx === 0 ? 'md:col-span-2' : ''}`}
                     >
                        {/* Colorful Header Strip */}
                        <div className={`h-2 w-full bg-gradient-to-r ${group.color}`} />
                        
                        <div className="p-8 flex-1 relative">
                           {/* Watermark Icon */}
                           <group.icon className="absolute -bottom-4 -right-4 w-40 h-40 text-slate-50 dark:text-slate-800/50 opacity-100 group-hover:scale-110 transition-transform duration-700 -z-0" strokeWidth={1} />
                           
                           <div className="relative z-10">
                              <div className="flex justify-between items-start mb-6">
                                 <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.color} p-[1px]`}>
                                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                                       <group.icon className="w-6 h-6 text-slate-700 dark:text-white" />
                                    </div>
                                 </div>
                                 {group.location && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-200 dark:border-slate-800 rounded-full px-2 py-1">
                                       {group.location}
                                    </span>
                                 )}
                              </div>

                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                                 {group.client}
                              </h3>
                              <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mb-6" />

                              <div className="space-y-6">
                                 {group.projects.map((p, i) => (
                                    <div key={i}>
                                       <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-2">
                                          <CheckCircle2 size={16} className="text-teal-500 shrink-0" /> {p.title}
                                       </h4>
                                       <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-6 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
                                          {p.description}
                                       </p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </motion.div>
            )}

            {/* FOUNDER'S LEGACY GRID */}
            {activeTab === 'founder' && (
               <motion.div 
                  key="founder"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-5xl mx-auto"
               >
                  {/* Summary Banner */}
                  <div className="relative rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 overflow-hidden p-8 md:p-12 mb-12 text-center group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] group-hover:bg-amber-500/30 transition-colors duration-700" />
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] group-hover:bg-orange-500/20 transition-colors duration-700" />
                     
                     <div className="relative z-10">
                        <div className="inline-block p-3 rounded-2xl bg-white/10 mb-6 backdrop-blur-md">
                           <Clock className="w-8 h-8 text-amber-400" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">30+ Years of Mastery</h2>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                           Before GVS, our founder led critical EPC projects for giants like <span className="text-white font-semibold">SAIL</span>, <span className="text-white font-semibold">NTPC</span>, and <span className="text-white font-semibold">L&T</span>.
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {founderPriorProjects.map((item, idx) => (
                        <div key={idx} className="group flex items-start p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 transition-colors duration-300 shadow-sm hover:shadow-xl">
                           <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shrink-0 mr-6 group-hover:scale-110 transition-transform duration-300`}>
                              <item.icon size={28} />
                           </div>
                           <div>
                              <div className="flex items-center justify-between mb-2">
                                 <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.sector}</h3>
                                 <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 tracking-wide">{item.stats}</span>
                              </div>
                              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wide">
                                 {item.clients.join(' • ')}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                 {item.description}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-16 text-center">
                    <motion.button
                      onClick={() => contactModal.onOpen()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      Start Your Project
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  </div>
               </motion.div>
            )}

         </AnimatePresence>
      </section>

    </main>
  );
};

export default Projects;