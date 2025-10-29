import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CheckCircle2, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Client {
  name: string;
  location: string;
  description: string;
}

interface Consultant {
  name: string;
}

interface Testimonial {
  text: string;
  author: string;
  company: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface Benefit {
  title: string;
  desc: string;
}

const Clients: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = 'Our Clients - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Trusted by SAIL, TISCO, NTPC, Aumund Engineering, Loesche Energy, and 50+ industry leaders in power, steel, cement, and renewable energy.'
      );
    }

    // GSAP Scroll Animations
    const sections = mainRef.current?.querySelectorAll('.animate-section');
    sections?.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.2,
        }
      );
    });

    // Parallax hero background
    gsap.to('.hero-bg', {
      y: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t: ScrollTrigger) => t.kill());
  }, []);

  /* ------------------------------------------------------------------
   *  CLIENTS – 100% from marketing copy
   * ------------------------------------------------------------------ */
  const clients: Client[] = [
    { name: 'SAIL', location: 'Bhilai, Bokaro, Rourkela', description: 'Bulk Material Handling (Power Plants, Iron Ore & Coal)' },
    { name: 'TISCO', location: 'Jamshedpur', description: 'Steel Plants' },
    { name: 'RINL Vizag', location: 'Visakhapatnam', description: 'Power Plants' },
    { name: 'NTPC Limited', location: 'Darapalli, Ramagundam', description: 'Thermal Power Stations' },
    { name: 'JSW Cement', location: 'Dolvi, Vijayanagar', description: 'Cement & Steel Plants' },
    { name: 'Ultratech Cement', location: 'Gujarat, AP', description: 'Cement Projects' },
    { name: 'Aditya Birla Group', location: 'Multiple', description: 'Process Plants' },
    { name: 'GMR', location: 'Multiple', description: 'Renewable Energy' },
    { name: 'Sterlite Group', location: 'Tuticorin', description: 'Chemical Plants' },
    { name: 'CPCL', location: 'Chennai', description: 'Chemical Plants' },
    { name: 'MRL', location: 'Chennai', description: 'Process Plants' },
    { name: 'Cochin Refinery', location: 'Kochi', description: 'Refinery Projects' },
    { name: 'Sea Bird (NAVY)', location: 'Karwar', description: 'Naval Projects' },
    { name: 'Aumund Engineering', location: 'Chennai', description: 'SAMSON / BRU FEEDER, PADDEL FEEDER, CENTREX / BIN-X, STACKER & RECLAIMER' },
    { name: 'Loesche Energy', location: 'Delhi & Chennai', description: 'SAMSON / BRU FEEDER, CENTREX / BIN-X System' },
    { name: 'Metco Roofing', location: 'Chennai', description: 'Factory Electrical & Lighting Systems' },
    { name: 'ARS Hydrojet', location: 'Chennai', description: 'High‑Pressure Water Jetting System (SAIL Plants)' },
    { name: 'Meenakshi Medical College & Hospital', location: 'Kanchipuram', description: '11 KV Sub Station Revamping & Retro‑Fitting' },
  ];

  const consultants: Consultant[] = [
    { name: 'Engineers India Ltd (EIL)' },
    { name: 'MECON' },
    { name: 'Fichtner' },
    { name: 'Tata Consulting Engineers' },
    { name: 'Black Stone Group Technologies' },
    { name: 'Shriram EPC Ltd.' },
  ];

  const testimonials: Testimonial[] = [
    {
      text: 'GVS Controls delivered a fully automated material handling system ahead of schedule. Their attention to detail and 24/7 support were exceptional.',
      author: 'Project Head',
      company: 'SAIL Bhilai',
    },
    {
      text: 'From design to commissioning, their turnkey solution for our 11 KV substation revamp was flawless. Highly recommended.',
      author: 'Electrical Engineer',
      company: 'Meenakshi Medical College',
    },
    {
      text: 'The CENTREX system integration with our existing plant was seamless. GVS redefined efficiency for us.',
      author: 'Operations Director',
      company: 'Aumund Engineering',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <main ref={mainRef} className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 overflow-hidden">
      <SEO
        title="Our Clients - GVS Controls"
        description="Trusted by SAIL, TISCO, NTPC, Aumund Engineering, Loesche Energy, and 50+ industry leaders in power, steel, cement, and renewable energy."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/clients' : undefined}
      />

      <style>{`
        :root {
          --neon-teal: #2DD4BF;
          --neon-purple: #A855F7;
          --dark-bg: #0F172A;
          --glass-bg: rgba(255, 255, 255, 0.05);
        }

        header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: var(--dark-bg); backdrop-filter: blur(10px); }
        main { margin-top: 0; background: var(--dark-bg); }

        @keyframes neonGlow {
          0%, 100% { filter: brightness(100%) drop-shadow(0 0 5px var(--neon-teal)); }
          50% { filter: brightness(120%) drop-shadow(0 0 15px var(--neon-teal)); }
        }

        @keyframes slideIn {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .glassmorphism {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .neon-border {
          border: 1px solid var(--neon-teal);
          box-shadow: 0 0 10px var(--neon-teal);
        }

        .neon-text {
          background: linear-gradient(90deg, var(--neon-teal), var(--neon-purple));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Hero */}
      <section className="hero-section relative bg-[radial-gradient(circle_at_center,_#1E3A8A_0,_#0F172A_70%)] text-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden animate-section">
        <div className="hero-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full glassmorphism text-sm font-medium mb-6 neon-border animate-[neonGlow_3s_ease-in-out_infinite]">
              Strategic Partners
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Our <span className="neon-text">Valued Clients</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Collaborating with visionaries across power, steel, cement, and renewable energy.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-[linear-gradient(135deg,_#1E3A8A_0%,_#0F172A_100%)] text-white relative overflow-hidden animate-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%,_rgba(45,212,191,0.2)_0,_transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
              Trusted by <span className="neon-text">50+ Industry Leaders</span>
            </h2>
            <p className="text-white/70 max-w-lg mx-auto text-base sm:text-lg font-light">
              Delivering innovation, reliability, and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {clients.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="group glassmorphism rounded-2xl p-6 hover:neon-border transition-all duration-500 animate-[slideIn_0.5s_ease-out] hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10">
                  <div className="h-20 flex items-center justify-center mb-4">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[linear-gradient(45deg,_var(--neon-teal),_var(--neon-purple))] text-white text-2xl font-bold animate-[neonGlow_2s_ease-in-out_infinite]">
                      {client.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold neon-text mb-2 group-hover:animate-[neonGlow_1s_ease-in-out_infinite]">
                    {client.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[var(--neon-teal)] rounded-full animate-pulse"></span>
                    {client.location}
                  </p>
                  <p className="text-sm text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {client.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {([
              { value: '30+', label: 'Years of Excellence', icon: 'Years' },
              { value: '200+', label: 'Projects Delivered', icon: 'Projects' },
              { value: '50+', label: 'Happy Clients', icon: 'Clients' },
            ] as Stat[]).map((stat, i) => (
              <div
                key={i}
                className="group glassmorphism rounded-2xl p-6 neon-border hover:scale-105 transition-all duration-500 animate-[slideIn_0.6s_ease-out]"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4 animate-[bounce_2s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-extrabold neon-text mb-2 animate-[neonGlow_2s_ease-in-out_infinite]">
                    {stat.value}
                  </div>
                  <p className="text-white font-semibold text-lg tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultants */}
      <section className="py-16 sm:py-20 md:py-24 bg-[linear-gradient(135deg,_#1E3A8A_0%,_#0F172A_100%)] text-white animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 glassmorphism text-sm font-semibold mb-4 neon-border animate-[neonGlow_3s_ease-in-out_infinite]">
              Consultant Partners
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Engineering <span className="neon-text">Excellence</span>
            </h2>
            <p className="text-white/70 max-w-lg mx-auto text-base sm:text-lg font-light">
              Collaborating with top EPC consultants.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {consultants.map((c, i) => (
              <div
                key={i}
                className="group glassmorphism rounded-2xl p-6 neon-border hover:scale-105 transition-all duration-500 animate-[slideIn_0.5s_ease-out]"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="relative z-10">
                  <div className="h-20 flex items-center justify-center mb-4">
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[linear-gradient(45deg,_var(--neon-teal),_var(--neon-purple))] text-white text-xl font-bold animate-[neonGlow_2s_ease-in-out_infinite]">
                      {c.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                    </div>
                  </div>
                  <p className="text-center text-lg font-semibold neon-text group-hover:animate-[neonGlow_1s_ease-in-out_infinite]">
                    {c.name}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24 bg-[linear-gradient(135deg,_#1E3A8A_0%,_#0F172A_100%)] text-white animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 glassmorphism text-sm font-medium mb-4 neon-border animate-[neonGlow_3s_ease-in-out_infinite]">
              Client Voices
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What They <span className="neon-text">Say</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg font-light">
              Real feedback from real projects.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-center h-[500px] overflow-hidden perspective-1000">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`absolute w-full max-w-lg transition-all duration-700 ease-in-out transform ${
                    i === activeIndex
                      ? 'translate-x-0 opacity-100 z-10 scale-100 rotate-y-0'
                      : i < activeIndex
                      ? '-translate-x-full opacity-0 scale-90 -rotate-y-10'
                      : 'translate-x-full opacity-0 scale-90 rotate-y-10'
                  }`}
                >
                  <div
                    className="w-full p-8 glassmorphism rounded-2xl shadow-2xl neon-border hover:-translate-y-3 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    onClick={nextTestimonial}
                  >
                    <Quote className="text-[var(--neon-teal)] w-12 h-12 mb-6 opacity-80 mx-auto animate-pulse" />
                    <p className="text-lg text-white italic font-medium leading-relaxed text-center relative z-10 drop-shadow-sm">
                      "{t.text}"
                    </p>
                    <div className="text-center relative z-10 mt-6">
                      <p className="font-semibold text-lg neon-text">{t.author}</p>
                      <p className="text-white/60 text-sm font-light">{t.company}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] scale-x-75 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-[-3rem] top-1/2 -translate-y-1/2 p-4 bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] text-white rounded-full hover:brightness-125 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-[-3rem] top-1/2 -translate-y-1/2 p-4 bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] text-white rounded-full hover:brightness-125 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] w-8 shadow-md'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="glassmorphism rounded-xl p-8 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 neon-border">
              <h3 className="text-2xl font-semibold neon-text mb-4">Your Project, Our Priority</h3>
              <p className="text-white/80 mb-6 text-lg">Let’s build the future together.</p>
              <Link
                to="/contact"
                className="inline-block bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] text-white px-6 py-3 rounded-full font-medium hover:brightness-125 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 md:py-24 bg-[linear-gradient(135deg,_#1E3A8A_0%,_#0F172A_100%)] text-white animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Why Clients Choose GVS</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">The values that define us.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {([
              { title: '30+ Years Experience', desc: 'Deep domain expertise across EPC projects.' },
              { title: 'Turnkey Solutions', desc: 'Design to commissioning under one roof.' },
              { title: 'Innovation', desc: 'Cutting-edge PLC, VFD, and automation.' },
              { title: 'Reliability', desc: 'On-time delivery, every time.' },
              { title: 'Customer Focus', desc: 'Tailored solutions for your success.' },
              { title: 'Quality First', desc: 'ISO-compliant manufacturing & testing.' },
            ] as Benefit[]).map((b, i) => (
              <div
                key={i}
                className="flex items-start p-6 glassmorphism rounded-lg hover:neon-border transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CheckCircle2 className="text-[var(--neon-teal)] mt-1 mr-3 w-6 h-6 animate-bounce" />
                <div>
                  <h3 className="font-semibold text-xl neon-text mb-1">{b.title}</h3>
                  <p className="text-white/80 text-base">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24 bg-[linear-gradient(135deg,_#1E3A8A_0%,_#0F172A_100%)] text-white animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glassmorphism rounded-xl p-8 md:p-10 max-w-3xl mx-auto text-center shadow-xl hover:shadow-2xl transition-all duration-300 neon-border">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text mb-6">Ready to Partner?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">Let’s turn your vision into reality.</p>
            <Link
              to="/contact"
              className="inline-block bg-[linear-gradient(90deg,_var(--neon-teal),_var(--neon-purple))] text-white px-8 py-3 rounded-full font-semibold hover:brightness-125 transition-all duration-300 shadow-md hover:scale-105 text-lg"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Clients;