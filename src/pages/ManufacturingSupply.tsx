import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Zap, Wrench, CheckCircle2, ArrowRight, Settings, ShieldCheck, Cog } from 'lucide-react';
import { TiltedCard } from '../components/ui/tilted-card';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContactModal } from '../hooks/use-contact-modal';
import SEO from '../components/SEO';

// --- Types ---
interface Product {
  id: string;
  name: string;
  description: React.ReactNode;
  items: string[];
  icon: React.ReactNode;
  color: [number, number, number][];
}

// --- Industrial Animation Variants ---
const slideInBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// --- Components ---

const ProductSpotlightCard = ({ product }: { product: Product }) => {
   const divRef = useRef<HTMLDivElement>(null);
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [opacity, setOpacity] = useState(0);

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
   };

   return (
      <div className="w-full max-w-6xl mx-auto">
         <TiltedCard
            containerHeight="100%"
            containerWidth="100%"
            scaleOnHover={1.01}
            rotateAmplitude={2}
            className="w-full"
         >
            <div 
               ref={divRef}
               onMouseMove={handleMouseMove}
               onMouseEnter={() => setOpacity(1)}
               onMouseLeave={() => setOpacity(0)}
               className="relative w-full bg-slate-900 border border-slate-700 overflow-hidden group min-h-[500px] flex flex-col md:flex-row"
            >
               {/* Spotlight */}
               <div 
                 className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
                 style={{
                   opacity,
                   background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(245, 158, 11, 0.15), transparent 40%)`
                 }}
               />

               {/* Left: Content */}
               <div className="p-8 md:p-16 relative z-10 flex flex-col justify-center border-r border-white/5 w-full md:w-1/2">
                  <div className="mb-6">
                     <span className="text-amber-500 font-mono text-sm tracking-widest uppercase mb-2 block">// Core Expertise</span>
                     <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
                        {product.name}
                     </h2>
                  </div>
                  
                  {/* Description Rendered as Div to allow nested paragraphs */}
                  <div className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
                     {product.description}
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm text-slate-300">
                     <div className="flex items-center gap-4 py-3 border-b border-white/10">
                        <span className="w-32 text-slate-500">Expertise</span>
                        <span>EPC Projects, Turnkey Solutions</span>
                     </div>
                     <div className="flex items-center gap-4 py-3 border-b border-white/10">
                        <span className="w-32 text-slate-500">Compliance</span>
                        <span>IE Rules & CEIG Regulations</span>
                     </div>
                  </div>
               </div>

               {/* Right: Visual Abstract */}
               <div className="relative bg-slate-950/50 p-8 md:p-16 flex items-center justify-center overflow-hidden w-full md:w-1/2">
                  {/* Rotating Gear Effect */}
                  <div className="absolute inset-0 opacity-10">
                     <Factory className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] text-slate-700 animate-spin-slow" />
                  </div>
                  
                  <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
                     {[
                        { val: "2017", label: "GVS Est." },
                        { val: "30+", label: "Promoter Exp." },
                        { val: "Client", label: "Focused" },
                        { val: "Cost", label: "Effective" },
                     ].map((stat, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-800 p-6 text-center hover:border-amber-500/50 transition-colors">
                           <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.val}</div>
                           <div className="text-xs text-slate-500 font-mono uppercase">{stat.label}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </TiltedCard>
      </div>
   );
};

const ProductSection = ({ product }: { product: Product }) => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Spotlight Card */}
        <div className="mb-20">
            <ProductSpotlightCard product={product} />
        </div>

        {/* Product Items List - Industrial Style */}
        <div className="max-w-7xl mx-auto">
            <div className="mb-10 flex items-end justify-between border-b border-white/5 pb-4">
               <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Capabilities</h3>
               <span className="text-amber-500 font-mono text-xs">// FULL SPECTRUM</span>
            </div>

            <motion.div 
               variants={staggerGrid}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {product.items.map((item, i) => (
                <motion.div
                  key={i}
                  variants={slideInBottom}
                  className="group relative bg-slate-900/50 border border-slate-800 p-6 hover:bg-slate-900 hover:border-amber-500/50 transition-all duration-300"
                >
                   {/* Corner Accents */}
                   <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-600 group-hover:border-amber-500 transition-colors" />
                   
                   <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded bg-slate-950 border border-slate-800 text-amber-500 group-hover:text-amber-400 group-hover:scale-110 transition-all">
                         <Zap size={18} />
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed font-medium group-hover:text-white transition-colors">
                        {item}
                      </p>
                   </div>
                </motion.div>
              ))}
            </motion.div>
        </div>

      </div>
    </section>
  );
};

const ManufacturingSupply = () => {
  const { scrollY } = useScroll();
  const contactModal = useContactModal();
  
  // Industrial Parallax
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const product: Product = {
    id: 'control-panels',
    name: 'Electrical Control Panels',
    description: (
      <div className="space-y-6">
        <p>
          <strong className="text-brand-white">GVS Controls</strong> started in <span className="text-amber-500">2017</span> as a Proprietary Company with a single-minded dedication to customer satisfaction. We provide Innovative Engineering Solutions ensuring optimal Man-Machine interface.
        </p>
        <div className="border-l-2 border-amber-500/30 pl-4 py-1">
          <p className="text-slate-300 italic">
            Backed by <strong className="text-white">Promoters</strong> with <strong className="text-amber-400">30+ Years of Experience</strong> in EPC Projects, working with industry giants like L&T and Shriram EPC for clients like SAIL, TISCO, & RINL.
          </p>
        </div>
      </div>
    ),
    items: [
      'Electrical 415 V Panel with Single (or) Double Bus System',
      'Power Control Centers, Power Distribution Panels, Motor Control Centers & Process Control Panels',
      'EB & DG Synchronizing Control Panels & Auto Transfer Switch Panels',
      'LT Bus Ducts, Sandwich Type Bus Ducts & Rising Main Panels',
      'APFC Panels, AMF Control Panels, Relay Logic & PLC Control Panel',
      'Local Push Button Station, Junction Boxes, Lighting Panels MLDB, LDB, SLDB, and Utility DBs',
      'VFD Control Panels & Special Purpose and Other Custom Built Panels'
    ],
    icon: <Factory className="w-16 h-16 text-white" />,
    color: [[245, 158, 11], [30, 41, 59]], // Amber to Slate
  };

  return (
    <main className="bg-slate-950 min-h-screen pt-[84px] lg:pt-[128px] overflow-hidden font-sans">
      <SEO
        title="Manufacturing & Supply - GVS Controls"
        description="We manufacture Electrical Control Panels as per IE Standard Electrical Inspectorate Rules and Regulation (CEIG)."
      />

      {/* --- HERO SECTION: The Blueprint --- */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20 overflow-hidden border-b border-white/5">
        
        {/* Technical Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ 
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
             }} 
        />
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto">
            
            {/* Badge - Technical Look - Updated to focus on GVS */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono tracking-widest uppercase rounded-sm backdrop-blur-md"
            >
              <Cog size={14} className="animate-spin-slow" />
              <span>GVS Controls • Est. 2017</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] flex flex-col items-center"
            >
              <span className="block">MANUFACTURING</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 drop-shadow-2xl">
                & SUPPLY
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed border-l-2 border-amber-500/50 pl-6 text-left md:text-center md:border-l-0 md:pl-0 font-mono"
            >
              // We manufacture Electrical Control Panels as per <span className="text-white">IE Standard Electrical Inspectorate Rules and Regulation (CEIG)</span>.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* --- PRODUCT SECTION (Hybrid) --- */}
      <ProductSection product={product} />

      {/* --- SITE EXECUTION PROTOCOL --- */}
      <section className="py-24 relative z-10 bg-slate-900/30 border-t border-white/5">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <span className="text-amber-500 font-mono text-sm tracking-widest uppercase mb-2 block">// Methodology</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                 Site Execution <span className="text-slate-700">Protocol</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                Our pragmatic site services ensure seamless integration from survey to commissioning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent z-0" />

               {[
                  { step: "01", title: "Site Survey & Assessment", desc: "Expert assessment of optimum requirements for renovation & revamping.", icon: CheckCircle2 },
                  { step: "02", title: "Client Coordination", desc: "Close collaboration with Client Engineering teams to finalize execution modality.", icon: Settings },
                  { step: "03", title: "Turnkey Execution", desc: "Start-up & commissioning services tailored to your schedule.", icon: Wrench },
                  { step: "04", title: "Testing & Commissioning", desc: "Supervisory assistance for Erection, Testing and Commissioning at site.", icon: ShieldCheck },
               ].map((item, idx) => (
                  <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     viewport={{ once: true }}
                     className="relative z-10"
                  >
                     <div className="bg-slate-950 border border-slate-800 p-8 h-full hover:border-amber-500/50 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                           <item.icon size={24} />
                        </div>
                        <div className="text-5xl font-black text-slate-800 absolute top-4 right-4 pointer-events-none select-none group-hover:text-slate-800/50 transition-colors">
                           {item.step}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                           {item.desc}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>


      {/* --- CTA: The Command --- */}
      <section className="py-24 relative overflow-hidden bg-amber-500">
         <div className="absolute inset-0 bg-slate-950 opacity-10 pointer-events-none" 
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 10px, transparent 10px, transparent 20px)' }} 
         />
         
         <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-950 mb-6 uppercase tracking-tight">
               Total Automation.
            </h2>
             <p className="text-base sm:text-lg md:text-2xl text-slate-900 font-medium mb-10 max-w-2xl">
               Providing innovative solutions and electrical panels as per IE & CEIG standards.
            </p>
            <button 
               onClick={() => contactModal.onOpen()}
               className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-950 text-white font-bold text-lg hover:bg-slate-900 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
               <span>Get Started Today</span>
               <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </section>

    </main>
  );
};

export default ManufacturingSupply;