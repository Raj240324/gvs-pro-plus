import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedClients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // ─────────────────────────────────────────────
  // GSAP – RUN ONCE, NO SCROLL BINDING
  // ─────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fc-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const clients = [
    { name: 'SAIL', color: 'from-blue-500 to-cyan-500' },
    { name: 'TISCO', color: 'from-red-500 to-orange-500' },
    { name: 'RINL Vizag', color: 'from-green-500 to-emerald-500' },
    { name: 'CPCL', color: 'from-yellow-500 to-orange-500' },
    { name: 'MRL', color: 'from-indigo-500 to-blue-500' },
    { name: 'Cochin Refinery', color: 'from-teal-500 to-cyan-500' },
    { name: 'Sterlite Group', color: 'from-violet-500 to-purple-500' },
    { name: 'GMR', color: 'from-pink-500 to-rose-500' },
    { name: 'Aditya Birla Group', color: 'from-amber-500 to-yellow-500' },
    { name: 'Sea Bird (NAVY)', color: 'from-slate-500 to-gray-500' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-24 bg-black text-white overflow-hidden"
    >
      {/* Static background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="fc-reveal inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-amber-300 border border-amber-500/30 mb-4">
            FOUNDER'S LEGACY & EXPERIENCE
          </span>

          <h2 className="fc-reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
            Trusted by Industry Leaders
          </h2>

          <p className="fc-reveal text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Our founder’s 30+ years of expertise delivering critical solutions
            for India’s largest industrial organizations.
          </p>
        </div>
      </div>

      {/* CSS-ONLY MARQUEE (GPU SAFE) */}
      <div className="relative w-full overflow-hidden py-10 border-y border-white/5">
        <div className="flex w-max animate-marquee space-x-6 sm:space-x-8 will-change-transform">
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="group relative flex-shrink-0 w-72 h-36 bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${client.color} mix-blend-overlay`}
              />
              <div className="relative h-full flex items-center justify-center p-6">
                <h3 className="text-2xl font-black tracking-tight uppercase text-white/80 group-hover:text-white">
                  {client.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>

      {/* STATS */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16">
          {[
            { value: '30+', label: 'Years of Promoter Experience' },
            { value: '100+', label: 'Projects Delivered' },
            { value: '50+', label: 'Happy Clients' },
          ].map((stat, index) => (
            <div
              key={index}
              className="fc-reveal p-8 bg-white/5 rounded-2xl border border-white/10 transition-colors hover:bg-white/10"
            >
              <div className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400 mb-4">
                {stat.value}
              </div>
              <p className="text-lg text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClients;
