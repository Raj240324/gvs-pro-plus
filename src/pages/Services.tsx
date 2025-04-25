import { useEffect } from 'react';
import { 
  Settings, 
  Cpu, 
  Wrench, 
  HardDrive, 
  Clock,
  FileText,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  useEffect(() => {
    document.title = 'Services - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'GVS Controls provides cutting-edge consultancy, manufacturing, automation, installation, renovation, and support services for electrical and industrial systems.');
    }

    // Smooth scroll-triggered animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left');
    const observerOptions = {
      threshold: 0.15
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const services = [
    {
      id: 'consultancy-engineering',
      title: 'Consultancy & Project Management',
      description: 'Expert project management, system design, and engineering for turnkey projects, backed by 30+ years of promoter experience.',
      longDescription: 'With over three decades of promoter experience, we deliver end-to-end consultancy services, from feasibility studies to detailed system design. Our team excels in optimizing electrical infrastructure, ensuring compliance with global standards, and integrating sustainable practices into every project.',
      icon: <Settings size={28} className="text-teal-500" />,
      features: [
        'Turnkey Project Management Consultancy',
        'System/Field Studies and Optimized Design',
        'Selection and Sizing of HT/LT Electrical Equipment',
        'Procurement Assistance and Equipment Inspection'
      ],
      stats: { projects: '150+', years: '30+' },
      image: '/assets/consultant_engineering.jpg',
      ctaLink: '#consultancy-engineering'
    },
    {
      id: 'panel-manufacturing',
      title: 'Manufacturing & Supply',
      description: 'High-quality electrical control panels manufactured to IE standards for diverse applications.',
      longDescription: 'Our state-of-the-art manufacturing facility produces a wide range of electrical control panels, including medium-voltage switchgear and custom PLC solutions. Each panel undergoes rigorous testing to ensure durability, safety, and seamless integration into your operations.',
      icon: <Cpu size={28} className="text-teal-500" />,
      features: [
        'Medium Voltage Panels (Single/Double Bus System)',
        'Power & Motor Control Centers (PCC/MCC)',
        'EB & DG Synchronizing Panels, Auto Transfer Switch Panels',
        'APFC, AMF, Relay Logic & PLC Control Panels'
      ],
      stats: { panelsBuilt: '500+', industriesServed: '10+' },
      image: '/assets/panel_manufacturing.jpg',
      ctaLink: '#panel-manufacturing'
    },
    {
      id: 'installation-commissioning',
      title: 'Installation, Testing & Commissioning',
      description: 'Flawless execution of electrical system installations with minimal disruption and maximum efficiency.',
      longDescription: 'Our expert technicians handle everything from bus duct installations to full system commissioning. We prioritize safety, precision, and speed, ensuring your systems are operational with zero downtime and fully optimized for performance.',
      icon: <Wrench size={28} className="text-teal-500" />,
      features: [
        'Erection, Testing, and Troubleshooting of Electrical Systems',
        'PLC and VFD Control Panels Commissioning',
        'Integration of Electrical Systems with Control Logic',
        'Revamping of Old Electrical Systems'
      ],
      stats: { sitesCommissioned: '200+', downtimeReduced: '98%' },
      image: '/assets/installation_commission.jpg',
      ctaLink: '#installation-commissioning'
    },
    {
      id: 'automation-solutions',
      title: 'Automation & Instrumentation',
      description: 'Next-generation automation systems designed to streamline processes and enhance productivity.',
      longDescription: 'We provide turnkey automation solutions, integrating PLCs, SCADA systems, and advanced instrumentation. From process optimization to real-time monitoring, our systems are pioneered to reduce costs, improve safety, and drive operational excellence.',
      icon: <HardDrive size={28} className="text-teal-500" />,
      features: [
        'Process Automation Solutions for Industrial Applications',
        'Supply of Field Instruments for Various Industries',
        'Revamping and Integration of Control Panels',
        'Real-Time Monitoring and Control Systems'
      ],
      stats: { systemsAutomated: '100+', efficiencyGain: '40%' },
      image: '/assets/automation.jpg',
      ctaLink: '#automation-solutions'
    },
    {
      id: 'renovation-revamping',
      title: 'Renovation & Revamping',
      description: 'Modernize your legacy systems to meet today’s standards of safety, efficiency, and sustainability.',
      longDescription: 'Our renovation services breathe new life into aging electrical infrastructure. We assess, retrofit, and upgrade systems to enhance reliability, comply with regulations, and reduce energy consumption, all while minimizing operational interruptions.',
      icon: <Clock size={28} className="text-teal-500" />,
      features: [
        'Site Surveys & Assessments for Renovation Solutions',
        'Modernization of Electrical Systems',
        'Energy Efficiency Upgrades',
        'Compliance with Safety Standards'
      ],
      stats: { systemsRevamped: '80+', energySaved: '25%' },
      image: '/assets/renovation_revamping.jpg',
      ctaLink: '#renovation-revamping'
    },
    {
      id: 'support-supply',
      title: 'Support & Supply',
      description: 'Reliable ongoing support and premium field instruments to keep your operations running smoothly.',
      longDescription: 'We offer round-the-clock technical assistance and a robust supply chain for field instruments, catering to industries like power generation, cement, and steel. Our proactive support ensures minimal downtime and maximum system uptime.',
      icon: <FileText size={28} className="text-teal-500" />,
      features: [
        'High-Quality Field Instruments',
        '24/7 Technical Support Hotline',
        'Spare Parts Inventory Management',
        'Expert On-Demand Assistance'
      ],
      stats: { clientsSupported: '50+', uptimeGuaranteed: '99.9%' },
      image: '/assets/support_supply.jpg',
      ctaLink: '#support-supply'
    }
  ];

  return (
    <main className="pt-[84px] lg:pt-[140px] overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-indigo-700 to-purple-800 text-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDMwSDMwTTYwIDMwVjMwTTYwIDMwSDMwTTYwIDMwVjMwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-teal-400/20 backdrop-blur-md text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-pulse">Our Expertise</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-indigo-300 animate-fade-in">
              Comprehensive Engineering Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">Delivering innovative electrical control and automation services since 2017, trusted by industry leaders worldwide.</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 aos-fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-700">Our Services</h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Tailored, cutting-edge solutions for industries including power generation, steel manufacturing, cement production, and renewable energy.</p>
          </div>
          <style>{`
            @keyframes slideIn {
              0% { transform: translateX(-20px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
            .animate-slide-in {
              animation: slideIn 0.3s ease-out forwards;
            }
            .gradient-shift {
              background-size: 200% 100%;
              animation: gradientShift 3s linear infinite;
            }
            /* Smooth transition for aos-animate */
            .aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left {
              opacity: 0;
              transform: translateY(30px);
              transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
            }
            .aos-fade-right {
              transform: translateX(30px);
            }
            .aos-fade-left {
              transform: translateX(-30px);
            }
            .aos-animate {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
          <ul className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {services.map((card) => (
              <div
                key={card.id}
                className="p-4 flex flex-col items-center bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-teal-100 hover:to-indigo-100 dark:hover:from-neutral-700 dark:hover:to-neutral-600 border border-teal-200 dark:border-teal-700 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex-shrink-0 relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-32 w-32 sm:h-40 sm:w-40 rounded-lg object-cover object-top border-2 border-teal-400 dark:border-teal-600 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 text-center flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-neutral-100 line-clamp-2 transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 dark:text-neutral-300 text-sm mt-2 line-clamp-3 lg:line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                  <a
                    href={card.ctaLink}
                    className="mt-4 px-4 py-2 text-sm rounded-full font-bold bg-gradient-to-r from-teal-500 via-indigo-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-teal-600 hover:via-purple-600 hover:to-indigo-600 gradient-shift group relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg animate-pulse animate-once animate-duration-1000"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Explore
                      <ArrowRight
                        className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:animate-slide-in"
                      />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-12 sm:py-16 md:py-20 ${index % 2 === 0 ? 'bg-gradient-to-br from-teal-50 via-indigo-50 to-gray-100' : 'bg-gradient-to-bl from-gray-50 via-teal-50 to-indigo-50'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              <div className={`${index % 2 === 0 ? 'aos-fade-right' : 'aos-fade-left'} order-2 lg:order-${index % 2 === 0 ? '1' : '2'}`}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-teal-500/10 flex items-center justify-center mb-4 sm:mb-6 shadow-md transform hover:rotate-12 transition-transform">
                  {service.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">{service.title}</h2>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">{service.longDescription}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-500 mr-2 sm:mr-3 flex-shrink-0 group-hover:scale-110 transition-transform w-5 h-5 sm:w-6 sm:h-6"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <path d="m9 11 3 3L22 4"/>
                      </svg>
                      <span className="text-gray-700 text-sm sm:text-base group-hover:text-teal-600 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-gray-800">
                  <span className="bg-teal-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">{service.stats[Object.keys(service.stats)[0] as keyof typeof service.stats]} {Object.keys(service.stats)[0].replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="bg-indigo-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">{service.stats[Object.keys(service.stats)[1] as keyof typeof service.stats]} {Object.keys(service.stats)[1].replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              </div>
              <div className={`${index % 2 === 0 ? 'aos-fade-left' : 'aos-fade-right'} order-1 lg:order-${index % 2 === 0 ? '2' : '1'}`}>
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 group">
                  <img src={service.image} alt={service.title} className="w-full h-64 sm:h-80 md:h-96 object-cover transition-opacity group-hover:opacity-80" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
                    <p className="text-white font-semibold text-sm sm:text-base md:text-lg">{service.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_80%)] opacity-50 animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center aos-fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">Ready to Transform Your Operations?</h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">Join industry leaders who trust GVS Controls for innovative, reliable, and sustainable engineering solutions.</p>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
              Contact Our Experts <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;