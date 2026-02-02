"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContactModal } from '../hooks/use-contact-modal';
import SEO from '../components/SEO';
import { Users, TrendingUp, Factory, Clock, Zap, ArrowRight, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

const WhyUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const contactModal = useContactModal();
  
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const smoothY = useSpring(yHero, { stiffness: 100, damping: 20 });

  const features = [
    {
      title: "30+ Years Legacy",
      desc: "Founded in 2017, backed by three decades of Promoter Experience with industry giants like L&T and Shriram EPC.",
      icon: Users,
      color: "emerald",
      points: ["Expert Leadership", "Deep Industry ties", "Proven Track Record"]
    },
    {
        title: "Cost-Effective Solutions",
        desc: "We engineer for maximum efficiency. Our solutions optimize your operational costs without compromising quality.",
        icon: TrendingUp,
        color: "blue",
        points: ["Smart Engineering", "Staff Collaboration", "Value Engineering"]
    },
    {
        title: "Precision Manufacturing",
        desc: "Strict adherence to IE & CEIG standards. Every unit is a benchmark of safety, reliability, and performance.",
        icon: Factory,
        color: "amber",
        points: ["IE/CEIG Compliant", "Rigorous Testing", "Zero Defects"]
    },
    {
        title: "Tailored Timelines",
        desc: "We respect your schedule. Our agile project management ensures delivery and commissioning happen exactly when needed.",
        icon: Clock,
        color: "purple",
        points: ["On-Time Delivery", "Agile Execution", "Resource Planning"]
    },
    {
        title: "Utility Expertise",
        desc: "Comprehensive knowledge of utility systems gives us a competitive edge in delivering superior service and uptime.",
        icon: Zap,
        color: "cyan",
        points: ["System Operations", "High Availability", "Strategic Consulting"]
    },
    {
        title: "Quality Assurance",
        desc: "An inherent problem-solving culture ensuring optimal interaction between Man and Machine interface.",
        icon: ShieldCheck,
        color: "rose",
        points: ["Safety First", "Premium Components", "Long-term Reliability"]
    }
  ];

  return (
    <main ref={containerRef} className="bg-slate-950 text-white min-h-screen pt-[84px] lg:pt-[128px]">
      <SEO
        title="Why Choose GVS | Engineering Excellence"
        description="30+ Years of Experience. IE/CEIG Compliant. Cost-Effective Solutions."
      />

      {/* --- HERO SECTION: Balanced and Professional --- */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 pb-16 rounded-b-[3rem] shadow-2xl z-10">
         {/* Background Elements */}
         <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-[100%] blur-[100px]" />
         </div>

         <motion.div 
            style={{ y: smoothY, opacity: opacityHero }}
            className="relative z-10 max-w-4xl mx-auto"
         >
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-slate-800/50 border border-slate-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
            >
               <Award className="w-3 h-3" />
               <span>Engineering Excellence since 2017</span>
            </motion.div>

            <motion.h1
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
               className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white"
            >
               Why Industry Leaders <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Trust GVS Controls?</span>
            </motion.h1>

            <motion.p
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
            >
               Bridging the gap between complex engineering needs and practical, cost-effective solutions with 30+ years of promoter expertise.
            </motion.p>
         </motion.div>
      </section>

      {/* --- GRID SECTION: Compact & Clean --- */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-32">
         <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {features.map((feature, idx) => (
                  <FeatureCard key={idx} feature={feature} index={idx} />
               ))}
            </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative py-24 border-t border-white/5 bg-gradient-to-b from-slate-950 to-emerald-950/20">
         <div className="container mx-auto px-4 text-center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Ready to optimize your project?
               </h2>
               <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => contactModal.onOpen()} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-500/10">
                     Get a Quote <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3 border border-slate-700 text-white rounded-lg font-bold text-sm hover:bg-white/5 transition-colors">
                     Explore Services
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

    </main>
  );
};

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
   const colors: any = {
      emerald: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300",
      blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300",
      amber: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:text-amber-300",
      purple: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300",
      cyan: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300",
      rose: "bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 group-hover:text-rose-300",
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         className="group relative bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1"
      >
         <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${colors[feature.color]}`}>
            <feature.icon className="w-6 h-6" strokeWidth={1.5} />
         </div>

         <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            {feature.title}
         </h3>

         <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
            {feature.desc}
         </p>

         <div className="space-y-2 pt-6 border-t border-white/5">
            {feature.points.map((point: string, i: number) => (
               <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500 group-hover:text-slate-400 transition-colors">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${colors[feature.color].split(" ")[1]}`} />
                  {point}
               </div>
            ))}
         </div>
      </motion.div>
   );
};

export default WhyUs;