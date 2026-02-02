"use client";
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform as transformScroll } from 'framer-motion';
import FlipCard from '@/components/ui/FlipCard';
import ModernJourney, { TimelineEvent } from '@/components/ui/ModernJourney';
import { ArrowRight, Award, Briefcase, Building2, CheckCircle2, Clock, Factory, Handshake, Settings, ShieldCheck, User, Users, History, Zap, MapPin } from 'lucide-react';
import { useContactModal } from '../hooks/use-contact-modal';
import SEO from '../components/SEO';
import gvsMain from '../assets/about-image/gvs-main.jpeg';
import infrastructure from '../assets/about-image/infrastructure.jpeg';
import projectAbout from '../assets/about-image/project-about.jpeg';

// --- Animated Counter (Simple) ---
const Counter = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-2">
      {value}
    </span>
    <span className="text-slate-500 dark:text-slate-500 font-medium text-xs md:text-sm uppercase tracking-wider">{label}</span>
  </div>
);

// --- Section Header Implementation (Scaled Down) ---
const SectionHeader = ({ badge, title, subtitle, textColor }: { badge: string, title: string, subtitle?: string, textColor?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-12 space-y-3"
  >
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-[10px] md:text-xs font-bold tracking-widest uppercase border border-slate-200 dark:border-white/10">
      {badge}
    </span>
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${textColor || "text-slate-900 dark:text-white"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default function AboutUnified() {
  const { scrollYProgress } = useScroll();
  const contactModal = useContactModal();
  const heroOpacity = transformScroll(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = transformScroll(scrollYProgress, [0, 0.3], [1, 0.95]);

  const timelineEvents = useMemo<TimelineEvent[]>(() => [
    {
      id: '1',
      title: 'Foundation',
      description: 'M/s GVS Controls was established as a Proprietary Firm in 2017. Driven by a mission to deliver innovative, cost-effective engineering solutions and optimize man-machine interaction.',
      icon: <Building2 className="text-white w-5 h-5" />,
      image: gvsMain,
      category: '2017',
      color: 'indigo',
      link: { url: '/manufacturing-supply', text: 'View Works' }
    },
    {
      id: '2',
      title: 'Expansion',
      description: 'Launched compliant Manufacturing Facility for Control Panels (IE & CEIG standards). Expanded capabilities to full Turnkey: Design, Supply, Erection, Testing & Commissioning.',
      icon: <Factory className="text-white w-5 h-5" />,
      image: infrastructure,
      category: 'Infrastructure',
      color: 'emerald',
      link: { url: '/manufacturing-supply', text: 'Our Facility' }
    },
    {
      id: '3',
      title: 'Execution',
      description: 'Successfully executed turnkey E&I projects for major clients like Aumund, Loesche, and Meenakshi Medical College. Specialized in PCC, MCC, and VFD Panels for cement and power sectors.',
      icon: <Award className="text-white w-5 h-5" />,
      image: projectAbout,
      category: 'Projects',
      color: 'amber',
      link: { url: '/projects', text: 'Recent Projects' }
    }
  ], []);

  const founderExperience = [
    { company: 'Shriram EPC Ltd.', role: 'Senior Engineering Positions' },
    { company: 'L&T (Larsen & Toubro)', role: 'EPC Project Execution' },
    { company: 'Black Stone Group', role: 'Electrical & Instrumentation' },
  ];

  const priorProjects = [ 'SAIL', 'TISCO', 'RINL Vizag', 'CPCL', 'MRL', 'Cochin Refinery', 'Sterlite Group', 'GMR Group', 'Aditya Birla', 'Indian Navy (Sea Bird)' ];
  const consultants = [ 'EIL', 'MECON', 'TISCO M.N. Dasturco', 'DCPL', 'Avant Garde', 'Fichtner', 'Aquatherm' ];

  return (
    <>
      <SEO title="About Us" description="Building the future of automation since 2017. 30+ years of promoter experience driving innovation in Electrical Panels & Automation." />
      
      <main className="bg-white dark:bg-black relative overflow-hidden">
        
        {/* --- Hero Section (Premium Smooth Scroll Fade - Unique Deep Blue Theme) --- */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-32 lg:pt-48 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-b-[3rem] shadow-2xl z-10">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow" />
               <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div 
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium tracking-wide"
              >
                Since 2017
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white leading-tight"
              >
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
                  Excellence.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
              >
                Redefining automation with a problem-solving culture and a legacy of precision.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* --- Bento Grid Story & Stats (Compact) --- */}
        <section className="py-20 container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-4 auto-rows-fr">
              
              {/* Main Story Card (Large) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="col-span-1 md:col-span-6 lg:col-span-2 row-span-2 bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group border border-slate-200 dark:border-slate-800"
              >
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Who We Are</h3>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                       Established in <span className="font-semibold text-teal-600 dark:text-teal-400">2017</span>, GVS Controls works with single-minded dedication to optimize the interaction between Man and Machine.
                    </p>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                       Our vast service spectrum is focused on one objective — redefining <span className="font-semibold text-indigo-600 dark:text-indigo-400">Customer Satisfaction</span> through innovative, compliant, and cost-effective turnkey solutions.
                    </p>
                 </div>
                 <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-teal-100 to-transparent dark:from-teal-900/20 rounded-full opacity-50 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              </motion.div>

              {/* Stat Card: Promoter Experience (Highlight) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="col-span-1 md:col-span-3 lg:col-span-1 bg-slate-900 dark:bg-slate-800 text-white rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-20 group-hover:opacity-30 transition-opacity" />
                 <Briefcase className="w-8 h-8 mb-3 text-indigo-300" />
                 <div className="text-4xl font-bold mb-1">30+</div>
                 <div className="text-xs font-medium opacity-80 uppercase tracking-widest">Years Experience</div>
                 <p className="text-[10px] text-indigo-200 mt-1">Promoter's Expertise</p>
              </motion.div>

              {/* Stat Card: Founded */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="col-span-1 md:col-span-3 lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center"
              >
                 <History className="w-8 h-8 mb-3 text-teal-500" />
                 <div className="text-4xl font-bold mb-1 text-slate-900 dark:text-white">2017</div>
                 <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Established</div>
                 <p className="text-[10px] text-slate-400 mt-1">Growing Strong</p>
              </motion.div>

              {/* Stat Card: Industries */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="col-span-1 md:col-span-3 lg:col-span-1 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-900 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center border border-teal-100 dark:border-slate-800"
              >
                 <Factory className="w-8 h-8 mb-3 text-emerald-600 dark:text-emerald-500" />
                 <Counter value="10+" label="Industries" />
              </motion.div>

              {/* Stat Card: Clients */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="col-span-1 md:col-span-3 lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center"
              >
                 <Users className="w-8 h-8 mb-3 text-rose-500" />
                 <Counter value="50+" label="Happy Clients" />
              </motion.div>

           </div>
        </section>

        {/* --- Core Values (Compact Flip Cards) --- */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950/50">
           <SectionHeader badge="Our Philosophy" title="What Drives Us" subtitle="The core principles that guide every decision, interaction, and project we undertake." />
           
           <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                  { icon: Settings, color: 'blue', title: 'Innovation', sub: 'Pioneering Solutions', back: 'Future Ready', desc: 'Constantly exploring new tech to deliver state-of-the-art results.' },
                  { icon: ShieldCheck, color: 'emerald', title: 'Quality', sub: 'Standard Compliant', back: 'Certified', desc: 'Adhering strictly to IE & CEIG regulations for highest safety.' },
                  { icon: Handshake, color: 'amber', title: 'Integrity', sub: 'Honest Partnerships', back: 'Trust First', desc: 'Building relationships through transparency and ethical practices.' },
                  { icon: Users, color: 'rose', title: 'Focus', sub: 'Client First', back: 'You Matter', desc: 'Dedicated to understanding and exceeding client expectations.' },
                  { icon: Award, color: 'purple', title: 'Excellence', sub: 'Pursuit of Best', back: 'Top Tier', desc: 'Leveraging 30+ years of expertise for premium results.' },
              ].map((item, i) => (
                  <FlipCard key={i}
                     frontContent={
                        <div className="h-full flex flex-col items-center justify-center text-center">
                           <div className={`p-3 rounded-2xl bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400 mb-4`}>
                              <item.icon size={24} />
                           </div>
                           <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                           <p className="text-slate-500 text-xs font-medium">{item.sub}</p>
                        </div>
                     }
                     backContent={
                        <div className="h-full flex flex-col items-center justify-center text-center p-2">
                            <h4 className={`text-base font-bold text-${item.color}-600 dark:text-${item.color}-400 mb-2`}>{item.back}</h4>
                            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                     }
                  />
              ))}
           </div>
        </section>

        {/* --- Founder's Legacy (Compact Glass) --- */}
        <section className="py-24 relative overflow-hidden">
           <div className="absolute inset-0 bg-slate-900 dark:bg-black">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px]" />
           </div>

           <div className="container relative z-10 mx-auto px-6">
              <SectionHeader badge="Founder's Legacy" title="30+ Years Expertise" textColor="text-white" />
              
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                 {/* Left: Text & Exp */}
                 <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                       Before founding GVS Controls in <span className="text-white font-semibold">2017</span>, our promoter accumulated over three decades of hands-on experience in EPC projects, working with India's premier engineering giants.
                    </p>
                    <div className="space-y-3">
                       {founderExperience.map((exp, i) => (
                          <motion.div key={i} initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                             className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                             <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                                <Briefcase size={18} />
                             </div>
                             <div>
                                <h4 className="text-white font-bold text-sm">{exp.company}</h4>
                                <p className="text-slate-400 text-xs">{exp.role}</p>
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 </div>

                 {/* Right: Projects Cloud */}
                 <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                       <Zap className="text-amber-400 w-5 h-5" fill="currentColor" /> Landmark Projects
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                       {priorProjects.map((p, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-full bg-white/10 text-slate-200 text-xs font-medium border border-white/5 hover:bg-white/20 transition-all cursor-default">
                             {p}
                          </span>
                       ))}
                    </div>
                    
                    <div className="h-px w-full bg-white/10 my-6" />
                    
                    <p className="text-xs text-slate-400 text-center mb-4 uppercase tracking-widest font-bold">Collaborated Consultants</p>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                       {consultants.map((c, i) => (
                          <span key={i} className="text-xs text-slate-300 font-medium opacity-70 hover:opacity-100 transition-opacity">
                             {c}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Journey Timeline --- */}
        <section className="bg-slate-50 dark:bg-slate-950 pt-20 pb-0">
           <SectionHeader badge="Milestones" title="Our Journey" />
           <ModernJourney events={timelineEvents} className="bg-transparent" />
        </section>

        {/* --- CTA --- */}
        <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
           <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                 Ready to Build <br />
                 <span className="text-indigo-600 dark:text-indigo-500">Something Great?</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                 Partner with a team that combines decades of experience with modern innovation.
              </p>
              <button 
                 onClick={() => contactModal.onOpen()}
                 className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full text-base font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                 Get Your Free Quote
              </button>
           </div>
        </section>

      </main>
    </>
  );
}