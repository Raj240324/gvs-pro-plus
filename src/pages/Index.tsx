import FeaturedClients from '../components/home/FeaturedClients';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactModal } from '../hooks/use-contact-modal';
import Hero from '../components/home/Hero';
import FAQ from '../components/home/FAQ';
import Button from '../components/ui/Button';
import Highlights from '../components/home/Highlights';
import SEO from '../components/SEO';
import StatCounter from '../components/home/StatCounter';
import InfoCard from '../components/home/InfoCard';
import { motion } from 'framer-motion';

const Index = () => {
  const contactModal = useContactModal();

  return (
    <main>
      <SEO
        title="GVS Controls - Electrical, Instrumentation, Automation & Consultancy | Industrial Solutions"
        description="Turnkey electrical, automation & control solutions for power, steel, cement, renewable energy, and material handling. 30+ years of promoter experience. Serving Aumund, Loesche, and 50+ industry leaders since 2017."
      />
      <Hero />

      {/* About / Info Cards Section (Restored & Modernized) */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 dark:from-gray-950 dark:via-blue-950 dark:to-teal-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 bg-white/20 dark:bg-black/20 text-white rounded-full text-sm font-semibold tracking-wide mb-4 backdrop-blur-sm"
            >
              About Us
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              30+ Years of Promoter's Experience – <span className="bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text drop-shadow-lg">Founded 2017</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              M/s GVS Controls delivers innovative, cost‑effective engineering solutions, redefining customer satisfaction through advanced automation and man‑machine interfaces.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <InfoCard 
              title="Our Foundation"
              badge="Est. 2017"
              subtitle="Innovation & Problem Solving"
              color="blue"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              delay={0.1}
              description="Founded in 2017, GVS Controls provides innovative, cost‑effective engineering solutions, emphasizing a creative culture to optimize man‑machine interfaces."
            />
            
            <InfoCard 
              title="Founder's Experience"
              badge="30+ Years"
              subtitle="Deep EPC Expertise"
              color="green"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              delay={0.2}
              description="Before 2017, our promoter worked with Shriram EPC Ltd., L&T, and Black Stone Group — delivering projects for SAIL, TISCO, NTPC, and leading industries."
            />

            <InfoCard 
              title="Our Expertise"
              badge="Instrumentation"
              subtitle="Automation & Process Control"
              color="red"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              delay={0.3}
              description="We provide Total Automation, Control Solutions, and Innovative Instrumentation products, tailored to diverse process and machine applications."
            />

            <InfoCard 
              title="Our Services"
              badge="Turnkey"
              subtitle="Consultancy & Manufacturing"
              color="yellow"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>}
              delay={0.4}
              description="We offer Consultancy, Manufacturing of Control panels, Bus ducts, Erection, Testing, Commissioning, and Revamping of Electrical systems."
            />

            <InfoCard 
              title="Our Clients"
              badge="50+ Leaders"
              subtitle="Trusted Across Industries"
              color="purple"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              delay={0.5}
              description={
                <span>
                  <strong>Clients:</strong> Aumund, Loesche, Metco, ARS, Meenakshi. <br/>
                  <strong>Prior Exp:</strong> SAIL, TISCO, RINL, NTPC, JSW, CPCL.
                </span>
              }
            />
          </div>

          <div className="text-center mt-12 animate-fade-in delay-400">
            <Link to="/about" className="inline-flex items-center text-white font-medium hover:text-green-400 transition-colors group">
              Discover Our Full Story
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2 duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights / Stats Section */}
      <div>
        <Highlights />
        
        {/* Stats Bar */}
        <section className="py-12 bg-gradient-to-r from-gray-900 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                  { target: 50, label: "Clients Served", icon: "🏢" },
                  { target: 100, label: "Projects Delivered", icon: "🚀" },
                  { target: 30, label: "Years Experience", icon: "⏳" },
                  { target: 2017, label: "Founded", suffix: "", icon: "📅" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-2">
                    <StatCounter to={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm md:text-base text-gray-300 font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
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