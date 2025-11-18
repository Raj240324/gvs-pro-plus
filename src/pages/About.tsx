import React, { useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform as transformScroll } from 'framer-motion';
import { ArrowRight, Building2, Factory, Award } from 'lucide-react';
import Timeline3D, { TimelineEvent } from '@/components/ui/3d-interactive-timeline';
import gvsFront from '../assets/about-image/gvs-front.jpeg';
import gvsMain from '../assets/about-image/gvs-main.jpeg';
import infrastructure from '../assets/about-image/infrastructure.jpeg';
import projectAbout from '../assets/about-image/project-about.jpeg';

export default function AboutUnified() {
  const { scrollYProgress } = useScroll();
  const heroBgOpacity = transformScroll(scrollYProgress, [0, 0.4], [1, 0.85]);

  useEffect(() => {
    document.title = "About Us | GVS Controls – Innovative Electrical & Automation Solutions Since 2017";
  }, []);

  const timelineEvents = useMemo<TimelineEvent[]>(() => [
    {
      id: '1',
      title: 'Company Founded',
      description: 'M/s GVS Controls Was Established as a Proprietary Firm With a Mission to Deliver Innovative, Cost-Effective Engineering Solutions. Driven by Problem-Solving Culture and Customer Satisfaction, We Optimize Man-Machine Interaction Across Industries.',
      icon: <Building2 className="text-white w-5 h-5" />,
      image: [gvsMain, gvsFront],
      category: 'Foundation',
      color: 'indigo',
      link: { url: '/about', text: 'Our Story' }
    },
    {
      id: '2',
      title: 'IE & CEIG Compliant Manufacturing',
      description: 'Launched State-of-the-Art Facility for Manufacturing Electrical Control Panels Compliant With Indian Electrical Standards and CEIG Regulations. Full Turnkey Capability: Design, Supply, Erection, Testing & Commissioning.',
      icon: <Factory className="text-white w-5 h-5" />,
      image: infrastructure,
      category: 'Infrastructure',
      color: 'emerald',
      link: { url: '/manufacturing-supply', text: 'View Facility' }
    },
    {
      id: '3',
      title: 'Major Projects & Industry Recognition',
      description: 'Executed Turnkey E&I Projects for SAIL, NTPC, TISCO, CPCL, Indian Navy (Sea Bird), Aditya Birla, GMR, and Cement Giants via Aumund & Loesche. Delivered PCC, MCC, PLC/VFD Panels, Revamping, and Automation Across Power, Steel, and Process Plants.',
      icon: <Award className="text-white w-5 h-5" />,
      image: projectAbout,
      category: 'Achievement',
      color: 'amber',
      link: { url: '/projects', text: 'View Projects' }
    }
  ], []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 to-slate-900 relative">
        {/* HERO */}
        <motion.section
          className="relative pt-48 md:pt-56 pb-32 md:pb-40 bg-gradient-to-br from-indigo-900 via-teal-700 to-purple-800 overflow-hidden"
          style={{ opacity: heroBgOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-6 py-2 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-teal-200 text-xs md:text-sm font-semibold tracking-widest mb-8 shadow-xl"
            >
              ESTABLISHED 2017 • 30+ YEARS OF PROMOTER EXPERIENCE IN EPC PROJECTS
            </motion.span>

            <div className="flex justify-center mb-8">
              <img
                src="/logo.png"
                alt="M/s GVS Controls Logo"
                className="w-32 h-32 md:w-48 md:h-48 object-contain"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-pink-100 drop-shadow-2xl"
            >
              GVS CONTROLS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-8 text-lg md:text-xl lg:text-2xl text-teal-50 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Turnkey Electrical Panels, PLC Automation, and Revamping Solutions since 2017 — Compliant, Innovative, and Trusted by India’s Leading Industries.
            </motion.p>
          </div>
        </motion.section>

        {/* TIMELINE */}
        <section className="py-0">
          <Timeline3D 
            events={timelineEvents}
            backgroundColor="bg-gradient-to-b from-teal-50 via-cyan-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
            primaryColor="bg-teal-600"
            secondaryColor="bg-indigo-500"
            accentColor="bg-amber-500"
            textColor="text-slate-900 dark:text-white"
            showImages={true}
            className="min-h-screen"
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
              "logo": "https://www.gvscontrols.com/logo.png",
              "foundingDate": "2017",
              "description": "IE & CEIG Compliant Electrical Control Panels, PLC Automation, Turnkey E&I Execution Since 2017",
              "contactPoint": { "@type": "ContactPoint", "email": "info@gvscontrols.com", "contactType": "Customer Service" }
            })
          }}
        />
      </div>
    </>
  );
}