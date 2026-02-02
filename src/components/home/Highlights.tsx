import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaRegLightbulb,
  FaCogs,
  FaIndustry,
  FaTools,
  FaSyncAlt,
} from 'react-icons/fa';

import cop9 from '../../assets/cop-9.webp';
import renovation from '../../assets/renovation.webp';
import erection from '../../assets/electrical-erection.webp';

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // GSAP – PRE-WARMED, RUN ONCE, SCROLL-SAFE
  // ─────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.highlight-card');

      // Pre-set initial state (NO layout surprise on scroll)
      gsap.set(cards, {
        opacity: 0,
        y: 40,
        scale: 0.96,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.12,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────
  // DATA
  // ─────────────────────────────────────────────
  const expertiseContent = [
    {
      title: 'Consultancy',
      description:
        'Project Management Consultancy (PMC), system & field studies, turnkey design, basic and detailed engineering, procurement assistance, inspection, and dispatch certification.',
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1350&q=80',
      icon: <FaRegLightbulb />,
      serviceId: 'consultancy-engineering',
      gradient: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'Automation',
      description:
        'Total automation and process control solutions using PLC, relay logic, and instrumentation with innovative and cost-effective systems.',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1350&q=80',
      icon: <FaCogs />,
      serviceId: 'automation-solutions',
      gradient: 'from-teal-600 to-cyan-700',
    },
    {
      title: 'Product Manufacturing',
      description:
        'Manufacturing of PCC, MCC, VFD, APFC, AMF, PLC panels, bus ducts, lighting panels, and custom-built control systems.',
      image: cop9,
      icon: <FaIndustry />,
      serviceId: 'panel-manufacturing',
      gradient: 'from-orange-600 to-red-700',
    },
    {
      title: 'Erection & Commissioning',
      description:
        'Erection, testing, commissioning, troubleshooting, shutdown services, and complete start-up support.',
      image: erection,
      icon: <FaTools />,
      serviceId: 'installation-commissioning',
      gradient: 'from-gray-600 to-blue-700',
    },
    {
      title: 'Renovation & Revamping',
      description:
        'Renovation and revamping of electrical systems to improve safety, efficiency, and reliability.',
      image: renovation,
      icon: <FaSyncAlt />,
      serviceId: 'renovation-revamping',
      gradient: 'from-purple-600 to-pink-700',
    },
  ];

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Blobs (STATIC – NO ANIMATION) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-6">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Industry{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Expertise
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Comprehensive solutions designed to elevate your projects with
            innovation, precision, and decades of expertise.
          </p>
        </div>

        {/* CARDS */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {expertiseContent.map((item, idx) => (
           <div
  key={idx}
  onClick={() => navigate(`/services#${item.serviceId}`)}
  className="
    highlight-card group relative
    w-full
    md:w-[calc(50%-0.75rem)]
    xl:w-[calc(33.333%-1.34rem)]
    h-[460px]
    rounded-3xl
    overflow-hidden
    cursor-pointer
    shadow-xl
    transition-transform
    duration-300
    hover:-translate-y-1
  "
>
  <img
    src={item.image}
    alt={item.title}
    loading="eager"
    decoding="async"
    width={800}
    height={600}
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-black/70" />
  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30`} />

  <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
    <div className="mb-4 text-3xl">{item.icon}</div>
    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
    <p className="text-sm leading-relaxed text-white/90 mb-6">
      {item.description}
    </p>
    <span className="font-semibold text-sm tracking-wide underline underline-offset-4">
      EXPLORE SOLUTION →
    </span>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
