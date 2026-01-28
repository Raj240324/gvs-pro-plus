import FeaturedClients from '../components/home/FeaturedClients';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useContactModal } from '../hooks/use-contact-modal';
import Hero from '../components/home/Hero';
import FAQ from '../components/home/FAQ';
import Button from '../components/ui/Button';
import Highlights from '../components/home/Highlights';
import SEO from '../components/SEO';

const Index = () => {
  const contactModal = useContactModal();
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    document.title = 'GVS Controls - 30+ Years of Promoter Experience in EPC Projects';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'GVS Controls delivers turnkey electrical, automation & control solutions for power, steel, cement, renewable energy, and material handling sectors. 30+ years of promoter experience. Serving Aumund, Loesche, and 50+ clients since 2017.'
      );
    }

    // Mobile detection
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Throttle scroll handler for better performance
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (scrollTimeout) return; // Skip if already scheduled

      scrollTimeout = setTimeout(() => {
        const winH = window.innerHeight;

        // AOS-style fade-in on scroll (throttled)
        document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left')
          .forEach(el => {
            if (el.getBoundingClientRect().top <= winH * 0.8) el.classList.add('aos-animate');
          });

        // Counter animation
        const statsEl = statsRef.current;
        if (statsEl && statsEl.dataset.animated !== 'true') {
          const rect = statsEl.getBoundingClientRect();
          if (rect.top <= winH * 0.9) {
            statsEl.dataset.animated = 'true';
            statsEl.querySelectorAll<HTMLElement>('.stat-counter').forEach(counter => {
              const target = parseInt(counter.dataset.target || '0', 10);
              if (!target) return;

              let cur = 0;
              const dur = 2000;
              let start: number | null = null;

              const step = (ts: number) => {
                if (!start) start = ts;
                const prog = ts - start;
                cur = Math.min(target, Math.ceil((prog / dur) * target));
                counter.textContent = `${cur}`;
                if (cur < target) requestAnimationFrame(step);
                else counter.textContent = `${target}+`;
              };
              requestAnimationFrame(step);
            });
          }
        }

        scrollTimeout = null;
      }, 16); // ~60fps throttle
    };

    setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile flip-card auto-rotate
    if (isMobile) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx = parseInt(entry.target.getAttribute('data-card-index') || '0', 10);
              setTimeout(() => {
                setFlippedCards(p => new Set([...p, idx]));
                setTimeout(() => setFlippedCards(p => {
                  const n = new Set(p);
                  n.delete(idx);
                  return n;
                }), 2000);
              }, idx * 500 + 800);
            }
          });
        },
        { threshold: 0.5, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('.flip-card').forEach((c, i) => {
        c.setAttribute('data-card-index', i.toString());
        observer.observe(c);
      });

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkMobile);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isMobile]);

  return (
    <main>
      <SEO
        title="GVS Controls - Electrical, Instrumentation, Automation & Consultancy | Industrial Solutions"
        description="Turnkey electrical, automation & control solutions for power, steel, cement, renewable energy, and material handling. 30+ years of promoter experience. Serving Aumund, Loesche, and 50+ industry leaders since 2017."
      />
      <Hero />

      {/* About / Flip Cards */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 dark:from-gray-950 dark:via-blue-950 dark:to-teal-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/20 dark:bg-black/20 text-white rounded-full text-sm font-semibold tracking-wide mb-4 animate-fade-in backdrop-blur-sm">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              30+ Years of Promoter Experience in EPC Projects – <span className="bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text drop-shadow-lg">Founded 2017</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
              M/s GVS Controls, founded in 2017, delivers innovative, cost‑effective engineering solutions, redefining customer satisfaction through advanced automation and man‑machine interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* 1 – Foundation */}
            <div className="flip-card group" style={{ perspective: '1000px' }}>
              <div
                className="flip-card-inner transition-transform duration-700 ease-in-out relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isMobile && flippedCards.has(0) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onMouseEnter={() => !isMobile && setFlippedCards(p => new Set([...p, 0]))}
                onMouseLeave={() => !isMobile && setFlippedCards(p => { const n = new Set(p); n.delete(0); return n; })}
              >
                <div className="flip-card-front bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-400/30 group-hover:shadow-blue-400/40 transition-all duration-500 flex flex-col items-center justify-center p-7 absolute w-full h-full z-20"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br from-blue-300 to-blue-100 dark:from-blue-300 dark:to-blue-600 shadow-lg border-2 border-blue-300/50">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-1">Our Foundation</h3>
                  <span className="inline-block bg-blue-100/60 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">Est. 2017</span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm text-center font-medium">Rooted in Innovation and problem‑solving.</p>
                </div>
                <div className="flip-card-back bg-gradient-to-br from-blue-500/90 to-blue-700/90 dark:from-blue-700/90 dark:to-blue-900/90 text-white rounded-2xl shadow-2xl border border-blue-400/40 flex flex-col items-center justify-center p-7 absolute w-full h-full z-30"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-sm leading-relaxed text-center font-medium">
                    Founded in 2017, M/s GVS Controls provides innovative, cost‑effective engineering solutions, emphasizing a problem‑solving culture to optimize man‑machine interfaces and redefine customer satisfaction.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 – Experience */}
            <div className="flip-card group" style={{ perspective: '1000px' }}>
              <div
                className="flip-card-inner transition-transform duration-700 ease-in-out relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isMobile && flippedCards.has(1) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onMouseEnter={() => !isMobile && setFlippedCards(p => new Set([...p, 1]))}
                onMouseLeave={() => !isMobile && setFlippedCards(p => { const n = new Set(p); n.delete(1); return n; })}
              >
                <div className="flip-card-front bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-400/30 group-hover:shadow-green-400/40 transition-all duration-500 flex flex-col items-center justify-center p-7 absolute w-full h-full z-20"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br from-green-300 to-green-100 dark:from-green-300 dark:to-green-600 shadow-lg border-2 border-green-300/50">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-200 mb-1">Founder's Experience</h3>
                  <span className="inline-block bg-green-100/60 dark:bg-green-900/40 text-green-700 dark:text-green-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">30+ Years</span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm text-center font-medium">Deep EPC expertise before founding GVS.</p>
                </div>
                <div className="flip-card-back bg-gradient-to-br from-green-500/90 to-green-700/90 dark:from-green-700/90 dark:to-green-900/90 text-white rounded-2xl shadow-2xl border border-green-400/40 flex flex-col items-center justify-center p-7 absolute w-full h-full z-30"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-sm leading-relaxed text-center font-medium">
                    Before founding GVS Controls in 2017, our promoter worked with Shriram EPC Ltd., L&T, and Black Stone Group — delivering projects for SAIL, TISCO, NTPC, and leading industries.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 – Expertise */}
            <div className="flip-card group" style={{ perspective: '1000px' }}>
              <div
                className="flip-card-inner transition-transform duration-700 ease-in-out relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isMobile && flippedCards.has(2) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onMouseEnter={() => !isMobile && setFlippedCards(p => new Set([...p, 2]))}
                onMouseLeave={() => !isMobile && setFlippedCards(p => { const n = new Set(p); n.delete(2); return n; })}
              >
                <div className="flip-card-front bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-400/30 group-hover:shadow-red-400/40 transition-all duration-500 flex flex-col items-center justify-center p-7 absolute w-full h-full z-20"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br from-red-300 to-red-100 dark:from-red-300 dark:to-red-600 shadow-lg border-2 border-red-300/50">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-700 dark:text-red-200 mb-1">Our Expertise</h3>
                  <span className="inline-block bg-red-100/60 dark:bg-red-900/40 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">Instrumentation</span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm text-center font-medium">Instrumentation, Total automation & Process control.</p>
                </div>
                <div className="flip-card-back bg-gradient-to-br from-red-500/90 to-red-700/90 dark:from-red-700/90 dark:to-red-900/90 text-white rounded-2xl shadow-2xl border border-red-400/40 flex flex-col items-center justify-center p-7 absolute w-full h-full z-30"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-sm leading-relaxed text-center font-medium">
                    We provide Total Automation, Process control solutions, and Innovative Instrumentation products, delivering customer‑driven services and cost‑effective systems tailored to diverse process and machine applications.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 – Services */}
            <div className="flip-card group" style={{ perspective: '1000px' }}>
              <div
                className="flip-card-inner transition-transform duration-700 ease-in-out relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isMobile && flippedCards.has(3) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onMouseEnter={() => !isMobile && setFlippedCards(p => new Set([...p, 3]))}
                onMouseLeave={() => !isMobile && setFlippedCards(p => { const n = new Set(p); n.delete(3); return n; })}
              >
                <div className="flip-card-front bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-yellow-400/30 group-hover:shadow-yellow-400/40 transition-all duration-500 flex flex-col items-center justify-center p-7 absolute w-full h-full z-20"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-100 dark:from-yellow-300 dark:to-yellow-600 shadow-lg border-2 border-yellow-300/50">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-200 mb-1">Our Services</h3>
                  <span className="inline-block bg-yellow-100/60 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">Turnkey</span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm text-center font-medium">Consultancy, Manufacturing, Revamping.</p>
                </div>
                <div className="flip-card-back bg-gradient-to-br from-yellow-500/90 to-yellow-700/90 dark:from-yellow-700/90 dark:to-yellow-900/90 text-white rounded-2xl shadow-2xl border border-yellow-400/40 flex flex-col items-center justify-center p-7 absolute w-full h-full z-30"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-sm leading-relaxed text-center font-medium">
                    We offer Consultancy, Manufacturing of Control panels & Bus ducts, Erection, Testing, Commissioning, and Revamping of Electrical systems for safety and efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* 5 – Clients */}
            <div className="flip-card group" style={{ perspective: '1000px' }}>
              <div
                className="flip-card-inner transition-transform duration-700 ease-in-out relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isMobile && flippedCards.has(4) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onMouseEnter={() => !isMobile && setFlippedCards(p => new Set([...p, 4]))}
                onMouseLeave={() => !isMobile && setFlippedCards(p => { const n = new Set(p); n.delete(4); return n; })}
              >
                <div className="flip-card-front bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-400/30 group-hover:shadow-purple-400/40 transition-all duration-500 flex flex-col items-center justify-center p-7 absolute w-full h-full z-20"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br from-purple-300 to-purple-100 dark:from-purple-300 dark:to-purple-600 shadow-lg border-2 border-purple-300/50">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-purple-700 dark:text-purple-200 mb-1">Our Clients</h3>
                  <span className="inline-block bg-purple-100/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">50+ Leaders</span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm text-center font-medium">Trusted across industries.</p>
                </div>
                <div className="flip-card-back bg-gradient-to-br from-teal-500/90 to-teal-700/90 dark:from-teal-700/90 dark:to-teal-900/90 text-white rounded-2xl shadow-2xl border border-purple-400/40 flex flex-col items-center justify-center p-7 absolute w-full h-full z-30"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-sm leading-relaxed text-center font-medium">
                    <strong>GVS Clients:</strong> Aumund, Loesche, Metco, ARS, Meenakshi, Dukes, Black Stone. <strong>Founder's Prior Experience:</strong> SAIL, TISCO, RINL, NTPC, JSW, GMR, Sterlite, CPCL, MRL, Cochin Refinery, Sea Bird (NAVY).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in delay-400">
            <Link to="/about" className="inline-flex items-center text-white font-medium hover:text-green-400 transition-colors group">
              Discover Our Full Story
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2 duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <div ref={statsRef}>
        <Highlights />
      </div>
      <FeaturedClients />
      <FAQ />

      {/* CTA */}
      <section className="section-padding bg-gray-100 dark:bg-black/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 pulsating-bg" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 animate-text-reveal">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
              Our team of Expert Engineers is ready to help you with Electrical systems, Automation, and Engineering needs.
            </p>
            <Button
              variant="gradient"
              size="lg"
              className="relative ripple-button overflow-hidden border-none outline-none ring-0 focus:ring-0 focus:outline-none hover:ring-0 active:ring-0"
              onClick={contactModal.onOpen}
            >
              <span className="relative z-10">Get in Touch</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;