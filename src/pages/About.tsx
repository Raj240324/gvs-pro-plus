import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion, useScroll, useTransform as transformScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Clean Placeholder
const PlaceholderImg = ({ text }: { text: string }) => (
  <div className="w-full h-full grid place-items-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 to-slate-900">
    <span className="text-slate-400 font-medium text-sm">{text}</span>
  </div>
);

// Subtle Glow
function Glow({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${className}`} />
  );
}

// Smooth 3D Tilt
function Tilt({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(reduce ? 0 : useTransform(y, [0, 1], [12, -12]), { stiffness: 180, damping: 30 });
  const rotateY = useSpring(reduce ? 0 : useTransform(x, [0, 1], [-12, 12]), { stiffness: 180, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Elegant Timeline
interface NodeItem { title: string; text: string; img?: string; imgAlt?: string }
function FuturisticTimeline({ items }: { items: NodeItem[] }) {
  const { scrollYProgress } = useScroll();
  const lineScale = transformScroll(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      <style>{`
        @keyframes flow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .neon-line {
          background: linear-gradient(90deg, #14b8a6, #6366f1, #ec4899);
          background-size: 200% 100%;
          animation: flow 10s linear infinite;
        }
      `}</style>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 neon-line rounded-full"
        style={{ scaleY: lineScale }}
        initial={{ scaleY: 0 }}
        aria-hidden="true"
      />

      <ol className="space-y-32">
        {items.map((it, i) => {
          const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });

          return (
            <li key={i} ref={ref} className="relative grid md:grid-cols-2 gap-12 items-center">
              <motion.span
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg ring-4 ring-teal-500/30 z-10"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
              />

              {/* Text */}
              <motion.div
                className={`order-2 md:order-${i % 2 === 0 ? '1' : '2'} ${i % 2 === 0 ? 'md:pr-16' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Tilt className="group">
                  <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 rounded-3xl p-10 shadow-xl">
                    <Glow className="bg-gradient-to-br from-teal-400 to-indigo-600" />
                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-700 dark:from-teal-400 dark:to-indigo-400">
                      {it.title}
                    </h3>
                    <p className="mt-4 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                      {it.text}
                    </p>
                  </div>
                </Tilt>
              </motion.div>

              {/* Image */}
              <motion.div
                className={`order-1 md:order-${i % 2 === 0 ? '2' : '1'} ${i % 2 === 0 ? '' : 'md:pl-16'}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  {it.img ? (
                    <img
                      src={it.img}
                      alt={it.imgAlt || it.title}
                      className="w-full h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <PlaceholderImg text="Milestone" />
                  )}
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// Assets
import milestone1 from '../assets/pp-1.png';
import milestone2 from '../assets/pp-2.png';
import milestone3 from '../assets/pp-3.png';

export default function AboutUnified() {
  const { scrollYProgress } = useScroll();
  const heroBgOpacity = transformScroll(scrollYProgress, [0, 0.4], [1, 0.85]);

  const companyMilestones = useMemo<NodeItem[]>(() => [
    {
      title: 'Founded in 2017',
      text: 'M/s GVS Controls was established as a proprietary company with the primary objective of delivering highly innovative and cost-effective engineering solutions. Focused on redefining customer satisfaction through a problem-solving culture and optimal man-machine interface.',
      img: milestone1,
      imgAlt: 'GVS Controls foundation year'
    },
    {
      title: 'IE & CEIG Compliant Manufacturing',
      text: 'Built a state-of-the-art facility for manufacturing electrical control panels strictly adhering to Indian Electrical Standards and Chief Electrical Inspectorate to Government (CEIG) regulations. Full turnkey capabilities from design to commissioning.',
      img: milestone2,
      imgAlt: 'Manufacturing unit'
    },
    {
      title: 'Trusted Turnkey Partner',
      text: 'Delivered complete bidding support, detail engineering, supply, erection, testing, commissioning and revamping projects for prestigious clients including Aumund Engineering, Loesche Energy, Meenakshi Medical College & Hospital, ARS Hydrojet Services and leading cement & power sector giants.',
      img: milestone3,
      imgAlt: 'Project delivery'
    }
  ], []);

  return (
    <>
      <head>
        <title>About Us | GVS Controls – Innovative Electrical & Automation Solutions Since 2017</title>
        <meta name="description" content="M/s GVS Controls: Founded in 2017. IE & CEIG compliant electrical control panels and turnkey automation solutions for power, cement, steel & process industries." />
      </head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 to-slate-900">
        {/* HERO – Original Rich Gradient + Improved Text */}
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
              ESTABLISHED 2017 • BUILT ON DECADES OF EXPERTISE
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-pink-100 drop-shadow-2xl"
            >
              M/s GVS CONTROLS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-8 text-lg md:text-xl lg:text-2xl text-teal-50 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Pioneering innovative, cost-effective electrical control panels and automation solutions with unwavering dedication to quality, safety, and customer satisfaction since 2017.
            </motion.p>
          </div>
        </motion.section>

        {/* TIMELINE – Original Light Gradient + Premium Text */}
        <section className="py-28 md:py-36 bg-gradient-to-b from-teal-50 via-cyan-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="inline-block px-6 py-2 bg-teal-700 text-white rounded-full text-sm font-bold tracking-wider">
                OUR JOURNEY
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-indigo-800">
                Milestones Since Inception
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                From a visionary start in 2017 to becoming a trusted name in turnkey electrical and automation engineering.
              </p>
            </motion.div>

            <FuturisticTimeline items={companyMilestones} />
          </div>
        </section>

        {/* CTA – Original Deep Gradient + Crisp White Text */}
        <section className="py-24 md:py-32 bg-gradient-to-r from-teal-600 to-indigo-700">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 drop-shadow-md">
              Ready to Elevate Your Electrical Systems?
            </h3>
            <p className="text-lg md:text-xl text-teal-50 mb-10 font-light">
              Share your requirements and receive a tailored proposal within 48 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-700 font-bold text-base md:text-lg rounded-full shadow-2xl hover:scale-105 hover:shadow-teal-500/50 transition-all"
            >
              Get Free Consultation <ArrowRight className="w-5 h-5" />
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
              "description": "Innovative electrical control panels & automation solutions | IE & CEIG compliant | Turnkey execution since 2017",
              "contactPoint": { "@type": "ContactPoint", "email": "info@gvscontrols.com", "contactType": "Customer Service" }
            })
          }}
        />
      </div>
    </>
  );
}