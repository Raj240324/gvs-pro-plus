import { useEffect, useState, useCallback } from 'react';
import React from 'react';
import { 
  Settings, 
  Wrench, 
  HardDrive, 
  Clock,
  ArrowRight,
  Factory
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { TiltedCard } from '../components/ui/tilted-card';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  ctaLink: string;
}

const Services = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  const updateHeaderHeight = useCallback(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      const height = headerElement.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    const handleResize = () => updateHeaderHeight();
    window.addEventListener('resize', handleResize);
    const handleScroll = () => updateHeaderHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });

    document.title = 'Services - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'GVS Controls offers consultancy, automation, installation, and renovation services for industrial electrical and automation systems.');
    }

    const animatedElements = document.querySelectorAll('.aos-fade-up, .aos-scale-in, .aos-slide-in');
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [updateHeaderHeight]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
        const offset = Math.max(headerHeight + 16, 0);
        window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
      }
    }
  }, [location]);

  const services: Service[] = [
    {
      id: 'consultancy',
      title: 'CONSULTANCY',
      description: 'Project management and engineering consultancy services.',
      icon: <Settings size={28} className="text-teal-500" />,
      features: [
        'Project management Consultancy services (PMC)',
        'System / Field Study and giving optimum Design for Turnkey Projects, Process Plants and Industries',
        'Project Engineering - Basic and Detail Engineering Documents & Drawings for Turnkey Plants',
        'Control Design through Relay logic and PLC Automation for Process Plant/ Machineries',
        'Sizing Calculation and Selecting complete Electrical HT / LT Equipments for Projects',
        'Serving as Owners Consultant and Obtaining approvals from Leading Engineering Consultant',
        'Providing assistance in procurement Process, Material Selection/ Electrical Equipments and Inspection certifying dispatch worthiness'
      ],
      ctaLink: '#consultancy'
    },
    {
      id: 'automation',
      title: 'AUTOMATION',
      description: 'Total automation and process control solutions.',
      icon: <HardDrive size={28} className="text-teal-500" />,
      features: [
        'Providing Total Automation, Process Control Solutions and Variety of Complete Instrumentation Products',
        'Highly Customer driven Services for a variety of Process and Machine Application',
        'Capabilities to offer highly Innovative, Cost effective, Automation systems',
        'Instrumentation Products, Engineering as per Standards Practices and Pragmatic site services to suit the applications'
      ],
      ctaLink: '#automation'
    },
    {
      id: 'renovation-revamping',
      title: 'RENOVATION & REVAMPING OF ELECTRICAL SYSTEM',
      description: 'Renovation and revamping of electrical systems.',
      icon: <Clock size={28} className="text-teal-500" />,
      features: [
        'Renovation & Revamping of Electrical System in order to ensure safety to people working around as well as to enhance system efficiency',
        'Well experienced Professionals carry out site survey to asses the optimum requirement for Renovation and Revamping of Electrical system',
        'Close co-ordination with Clients Engineering team and discuss about the modality of execution',
        'Trained Professionals are capable of Comprehending the needs of clients for execution of such Renovation and Revamping Work'
      ],
      ctaLink: '#renovation-revamping'
    },
    {
      id: 'services-and-supply',
      title: 'SERVICES AND SUPPLY',
      description: 'Control design and supply of control panels and instruments.',
      icon: <Settings size={28} className="text-teal-500" />,
      features: [
        'Control Design through Relay logic and PLC Automation for Process Plant/ Machineries',
        'Revamping and Integration of Electrical System with suitable Controls (Relay & PLC) Instrumentation and Conversion of Relay Panel into PLC Panel',
        'Technical Services for Installation and commissioning activities at site',
        'Supply of Motor Control center VFD Panels and Local Control Panels',
        'Supply of Relay Logic and PLC Based Control Panels',
        'Supply of Field Instruments for Cement plant and Conveyor equipments like Safety switches Pull chord and Belt sway - (Schmersal make) Motion Sensors - (Milltronics) and ZSS-( Pepperl + Fuchs )',
        'Sourcing and Supply of Instruments for Wind Mills and Switches of any Special Requirements'
      ],
      ctaLink: '#services-and-supply'
    },
    {
      id: 'product-manufacturing',
      title: 'PRODUCT MANUFACTURING & SUPPLY',
      description: 'Electrical control panels manufactured as per IE standards.',
      icon: <Factory size={28} className="text-teal-500" />,
      features: [
        'Medium Voltage Panel with Single (or) Double Bus System',
        'Power Control Centers, Power Distribution Panels, Motor Control Centers & Process Control Panels',
        'EB & DG Synchronizing Control Panels & Auto Transfer Switch Panels',
        'LT Bus Ducts and Sandwich Type Bus Ducts & Raising Main Panels',
        'APFC Panels, AMF Control Panels, Relay Logic & PLC Control Panel',
        'Local Push Button Station, Junction Boxes, Lighting Panels MLDB, LDB, SLDB, and Utility DB’s',
        'VFD Control Panels & Special Purpose and Other Custom Built Panels'
      ],
      ctaLink: '#product-manufacturing'
    },
    {
      id: 'additional-services',
      title: 'OUR ADDITIONAL SERVICES',
      description: 'Erection, testing, and commissioning of electrical systems.',
      icon: <Wrench size={28} className="text-teal-500" />,
      features: [
        'Erection Testing, Trouble Shooting & Commissioning of Bus Ducts, Power Control Centers, Motor Control Centers and Control Panels',
        'EB & DG Synchronizing Panels, AMF Control Panels & APFC Panels',
        'PLC,VFD Control Panels & Special Purpose and Other Custom Built Panels',
        'Revamping of Electrical Power Panels, MCC and Process Control Panels and Integration of Electrical System with suitable Controls (Relay & PLC) Instrumentation and Conversion of Relay Panel into PLC Panel',
        'Supervisory assistance to Erection, Testing and Commissioning at site',
        'Plant Shutdown and Turnarounds, Comprehensive Start-up & Commissioning Services',
        'Supply of Field Instruments for Power Plants, Bulk Material Handling System, Chemical Plants, Cooling Towers, Automobile Industries, Process Plants, Cement plants and Renewable energy sectors'
      ],
      ctaLink: '#additional-services'
    }
  ];

  return (
    <main className="bg-gray-50" style={{ paddingTop: `${headerHeight}px` }}>
      <SEO
        title="Services"
        description="GVS Controls offers consultancy, automation, installation, and renovation services for industrial electrical and automation systems."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/services' : undefined}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Our Services</h1>
            <p className="text-xl md:text-2xl leading-relaxed">Cutting-edge electrical and automation solutions tailored for industrial excellence.</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e40af]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-cyan-500/10 to-transparent" />
        
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.06) 50%, transparent 100%),
              linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)
            `,
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 15,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 aos-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Service Offerings</h2>
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of solutions designed to optimize your industrial operations.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((card, index) => (
              <li
                key={card.id}
                className="aos-slide-in"
                style={{ '--index': index } as React.CSSProperties}
              >
                <TiltedCard
                  containerHeight="100%"
                  containerWidth="100%"
                  scaleOnHover={1.05}
                  rotateAmplitude={10}
                  showMobileWarning={false}
                  showTooltip={false}
                  className="h-full"
                >
                  <div className="h-full p-8 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                        {React.cloneElement(card.icon as React.ReactElement, {
                          className: "text-white",
                          size: 24
                        })}
                      </div>
                      <h3 className="ml-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-base mb-6 truncate-3 leading-relaxed">
                      {card.description}
                    </p>
                    <a
                      href={card.ctaLink}
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold text-base transition-colors duration-200"
                    >
                      Learn More <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                </TiltedCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${
            index % 6 === 0 ? 'bg-gradient-to-br from-gray-50 to-teal-50' :
            index % 6 === 1 ? 'bg-gradient-to-br from-blue-50 to-indigo-50' :
            index % 6 === 2 ? 'bg-gradient-to-br from-gray-50 to-cyan-50' :
            index % 6 === 3 ? 'bg-gradient-to-br from-teal-50 to-blue-50' :
            index % 6 === 4 ? 'bg-gradient-to-br from-indigo-50 to-gray-50' :
            'bg-gradient-to-br from-cyan-50 to-teal-50'
          }`}
          style={{ scrollMarginTop: `${headerHeight + 24}px` }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aos-fade-up">
              <div className="flex items-center mb-8">
                {service.icon}
                <h2 className="ml-4 text-4xl font-bold text-gray-900">{service.title}</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, i) => (
                  <li
                    key={`${feature}-${i}`}
                    className="flex items-start feature-item aos-slide-in"
                    style={{ '--index': i } as React.CSSProperties}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-500 mr-3 flex-shrink-0 w-6 h-6"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <path d="m9 11 3 3L22 4"/>
                    </svg>
                    <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Operations?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with us to unlock the full potential of your industrial systems with our expert services.
            </p>
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get in Touch <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;