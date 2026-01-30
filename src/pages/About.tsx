"use client";
import React, { useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform as transformScroll } from 'framer-motion';
import { ArrowRight, Building2, Factory, Award, User, Briefcase, Users, Clock, CheckCircle2 } from 'lucide-react';
import ModernJourney, { TimelineEvent } from '@/components/ui/ModernJourney';
import SEO from '../components/SEO';
import gvsFront from '../assets/about-image/gvs-front.jpeg';
import gvsMain from '../assets/about-image/gvs-main.jpeg';
import infrastructure from '../assets/about-image/infrastructure.jpeg';
import projectAbout from '../assets/about-image/project-about.jpeg';

export default function AboutUnified() {
  const { scrollYProgress } = useScroll();
  const heroBgOpacity = transformScroll(scrollYProgress, [0, 0.4], [1, 0.85]);

  const timelineEvents = useMemo<TimelineEvent[]>(() => [
    {
      id: '1',
      title: 'GVS Controls Founded (2017)',
      description: 'M/s GVS Controls was established as a Proprietary Firm with a mission to deliver innovative, cost-effective engineering solutions. Driven by a problem-solving culture and customer satisfaction, we optimize man-machine interaction across industries.',
      icon: <Building2 className="text-white w-5 h-5" />,
      image: [gvsMain, gvsFront],
      category: 'Foundation',
      color: 'indigo',
      link: { url: '/about', text: 'Our Story' }
    },
    {
      id: '2',
      title: 'IE & CEIG Compliant Manufacturing',
      description: 'Launched state-of-the-art facility for Manufacturing Electrical Control Panels compliant with Indian Electrical Standards and CEIG Regulations. Full Turnkey capability: Design, Supply, Erection, Testing & Commissioning.',
      icon: <Factory className="text-white w-5 h-5" />,
      image: infrastructure,
      category: 'Infrastructure',
      color: 'emerald',
      link: { url: '/manufacturing-supply', text: 'View Facility' }
    },
    {
      id: '3',
      title: 'Major GVS Controls Projects',
      description: 'Executed turnkey E&I projects for Aumund, Loesche, Metco Roofing, ARS Hydrojet, and Meenakshi Medical College. Delivered PCC, MCC, PLC/VFD Panels across cement, power, and process plant sectors.',
      icon: <Award className="text-white w-5 h-5" />,
      image: projectAbout,
      category: 'Achievement',
      color: 'amber',
      link: { url: '/projects', text: 'View Projects' }
    }
  ], []);

  // Founder's prior experience (before GVS Controls)
  const founderExperience = [
    { company: 'Shriram EPC Ltd.', role: 'Senior Engineering Positions' },
    { company: 'L&T (Larsen & Toubro)', role: 'EPC Project Execution' },
    { company: 'Black Stone Group Technologies', role: 'Electrical & Instrumentation' },
  ];

  const priorProjects = [
    'SAIL (Steel Authority of India Limited)',
    'TISCO (Tata Iron and Steel Company)',
    'RINL (Rashtriya Ispat Nigam Limited, Vizag)',
    'CPCL (Chennai Petroleum Corporation Limited)',
    'MRL (Manali Refinery Limited)',
    'Cochin Refinery',
    'Sterlite Group',
    'GMR Group',
    'Aditya Birla Group',
    'Sea Bird (Indian Navy)',
  ];

  const consultantsWorkedWith = [
    'Engineers India Ltd (EIL)',
    'MECON',
    'TISCO M.N. Dasturco',
    'DCPL',
    'Avant Garde',
    'Fichtner',
    'Aquatherm',
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="GVS Controls, founded in 2017, delivers innovative Electrical & Automation solutions. Trusted by Industry Leaders like SAIL and TISCO."
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative pt-[84px] lg:pt-[128px]">
        {/* HERO */}
        <motion.section
          className="relative min-h-[50vh] flex items-center py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-teal-700 to-purple-800 overflow-hidden"
          style={{ opacity: heroBgOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-teal-200 text-xs font-semibold tracking-wider mb-6 shadow-lg"
            >
              ESTABLISHED 2017 • 30+ YEARS PROMOTER EXPERIENCE
            </motion.span>

            <div className="flex justify-center mb-6">
              <img
                src="/gvs-logo.png"
                alt="M/s GVS Controls Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-pink-100 drop-shadow-xl"
            >
              About GVS Controls
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-teal-50 max-w-3xl mx-auto leading-relaxed"
            >
              Turnkey Electrical Panels, PLC Automation & Revamping Solutions — Compliant, Innovative, and Trusted by India's Leading Industries.
            </motion.p>
          </div>
        </motion.section>

        {/* COMPANY STORY */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-4">
                OUR STORY
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Who We Are
              </h2>
              
              <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden text-left relative group">
                {/* Decorative Gradient Line */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 via-indigo-500 to-purple-600" />
                
                <div className="relative z-10">
                  <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-6">
                    <span className="text-teal-600 dark:text-teal-400 font-bold">Since 2017,</span> GVS Controls has been dedicated to delivering highly innovative and Cost-Effective Engineering solutions.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    We work with single-minded dedication, and our inherent <span className="font-semibold text-indigo-600 dark:text-indigo-400">Problem-Solving culture</span> ensures optimal interaction between Man and Machine. Our vast service spectrum is focused on a single, unwavering objective — constantly redefining the term <span className="italic font-semibold text-slate-900 dark:text-white">"Customer Satisfaction"</span>.
                  </p>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-50 dark:bg-teal-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Clock, label: 'Company Est.', value: '2017' },
                { icon: User, label: 'Promoter Experience', value: '30+ Years' },
                { icon: Briefcase, label: 'Industries Served', value: '10+' },
                { icon: Users, label: 'Satisfied Clients', value: '50+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-teal-600 dark:text-teal-400" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER'S LEGACY */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-teal-900">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-sm font-semibold mb-4">
                FOUNDER'S LEGACY
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                30+ Years of Industry Experience
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Before founding GVS Controls in 2017, our promoter accumulated over 30 years of hands-on experience in EPC projects, working with India's premier engineering companies and executing landmark projects across the nation.
              </p>
            </motion.div>

            {/* Prior Employment */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {founderExperience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <Briefcase className="w-10 h-10 text-amber-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{exp.company}</h3>
                  <p className="text-slate-300 text-sm">{exp.role}</p>
                </motion.div>
              ))}
            </div>

            {/* Prior Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Projects Executed by Promoter (Prior to GVS Controls)
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {priorProjects.map((project, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-full text-white text-sm font-medium border border-white/20"
                  >
                    {project}
                  </span>
                ))}
              </div>
              <p className="text-center text-slate-400 mt-6 text-sm">
                * These projects were executed while working at Shriram EPC Ltd., L&T, and Black Stone Group Technologies
              </p>
            </motion.div>

            {/* Consultants */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Engineering Consultants Collaborated With</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {consultantsWorkedWith.map((consultant, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white/10 rounded-lg text-slate-300 text-sm border border-white/10"
                  >
                    {consultant}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* GVS CONTROLS TIMELINE */}
        <section className="py-0">
          <div className="text-center py-16 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-4">
              GVS CONTROLS JOURNEY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Our Milestones Since 2017
            </h2>
          </div>
          <ModernJourney 
            events={timelineEvents}
            className="min-h-screen bg-gradient-to-b from-white via-cyan-50 to-indigo-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900"
          />
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-gradient-to-r from-teal-600 to-indigo-700">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 drop-shadow-md">
              Ready to Upgrade Your Systems?
            </h3>
            <p className="text-lg md:text-xl text-teal-50 mb-10 font-light">
              Get a tailored proposal within 48 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-700 font-bold text-base md:text-lg rounded-full shadow-2xl hover:scale-105 hover:shadow-teal-500/50 transition-all"
            >
              Free Consultation <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "M/s GVS CONTROLS",
              "url": "https://www.gvscontrols.com",
              "logo": "https://www.gvscontrols.com/gvs-logo.png",
              "foundingDate": "2017",
              "description": "IE & CEIG Compliant Electrical Control Panels, PLC Automation, Turnkey E&I Execution Since 2017. Founded by industry veteran with 30+ years of EPC experience.",
              "founder": {
                "@type": "Person",
                "name": "Founder",
                "description": "30+ years of experience in EPC projects with Shriram EPC Ltd., L&T, and Black Stone Group Technologies"
              },
              "contactPoint": { "@type": "ContactPoint", "email": "projects@gvscontrols.com", "contactType": "Customer Service" }
            })
          }}
        />
      </div>
    </>
  );
}