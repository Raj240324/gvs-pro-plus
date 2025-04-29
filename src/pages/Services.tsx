import { useEffect, useState, useCallback } from 'react';
import { 
  Settings, 
  Wrench, 
  HardDrive, 
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Define TypeScript interface for service objects
interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string; // Fixed from long5867
  icon: JSX.Element;
  features: string[];
  stats: Record<string, string>;
  image: string;
  ctaLink: string;
}

const Services = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [headerHeight, setHeaderHeight] = useState(0);

  // Function to calculate header height
  const updateHeaderHeight = useCallback(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      const height = headerElement.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  useEffect(() => {
    // Initial header height calculation
    updateHeaderHeight();

    // Update header height on resize
    const handleResize = () => updateHeaderHeight();
    window.addEventListener('resize', handleResize);

    // Update header height on scroll (to account for header height changes)
    const handleScroll = () => updateHeaderHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set document title and meta description
    document.title = 'Services - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'GVS Controls offers expert consultancy, automation, installation, and renovation services for power, steel, cement, and renewable energy industries.');
    }

    // Smooth scroll-triggered animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left');
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [updateHeaderHeight]);

  const toggleDescription = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const services: Service[] = [
    {
      id: 'consultancy-engineering',
      title: 'Consultancy & Project Management',
      description: 'Comprehensive consultancy for turnkey industrial projects.',
      longDescription: 'Project management Consultancy services (PMC). System / Field Study and giving optimum Design for Turnkey Projects, Process Plants and Industries. Project Engineering - Basic and Detail Engineering Documents & Drawings for Turnkey Plants. Control Design through Relay logic and PLC Automation for Process Plant/ Machineries. Sizing Calculation and Selecting complete Electrical HT / LT Equipments for Projects. Serving as Owners Consultant and Obtaining approvals from Leading Engineering Consultant. Providing assistance in procurement Process, Material Selection/ Electrical Equipments and Inspection certifying dispatch worthiness.',
      icon: <Settings size={28} className="text-blue-600" />,
      features: [
        'Project Management Consultancy (PMC)',
        'System / Field Study and Optimum Design',
        'Basic and Detail Engineering Documents & Drawings',
        'Control Design through Relay Logic and PLC Automation',
        'Sizing and Selection of HT/LT Equipments',
        'Owners Consultant and Consultant Approvals',
        'Procurement Assistance and Inspection'
      ],
      stats: { projects: '150+', clients: '20+' },
      image: '/images/consultancy-engineering.jpg',
      ctaLink: '#consultancy-engineering'
    },
    {
      id: 'automation-solutions',
      title: 'Automation & Instrumentation',
      description: 'Total automation and process control solutions.',
      longDescription: 'Providing Total Automation, Process Control Solutions and Variety of Complete Instrumentation Products and also offers highly Customer driven Services for a variety of Process and Machine Application and also Capabilities to offer highly Innovative, Cost effective, Automation systems, Instrumentation Products, Engineering as per Standards Practices and Pragmatic site services to suit the applications.',
      icon: <HardDrive size={28} className="text-blue-600" />,
      features: [
        'Total Automation and Process Control Solutions',
        'Customer-Driven Services for Process and Machine Applications',
        'Innovative and Cost-Effective Automation Systems',
        'Instrumentation Products and Engineering per Standards'
      ],
      stats: { systemsAutomated: '100+', efficiencyGain: '40%' },
      image: '/images/automation-solutions.jpg',
      ctaLink: '#automation-solutions'
    },
    {
      id: 'installation-commissioning',
      title: 'Installation & Commissioning',
      description: 'Erection, testing, and commissioning of electrical systems.',
      longDescription: 'Erection Testing, Trouble Shooting & Commissioning of Bus Ducts, Electrical Panels, Motor Control Centers and Control Panels, EB & DG Synchronizing Panels, AMF Control Panels & APFC Panels, PLC, VFD Control Panels & Special Purpose and Other Custom Built Panels. Revamping of Electrical Power Panels, MCC and Process Control Panels and Integration of Electrical System with suitable Control’s (Relay & PLC) Instrumentation and Conversion of Relay Panel into PLC Panel. Supervisory assistance to Erection, Testing and Commissioning at site. Plant Shutdown and Turnarounds, Comprehensive Start-up & Commissioning Services. Supply of Field Instruments for Power Plants, Bulk Material Handling System, Chemical Plants, Cooling Towers, Automobile Industries, Process Plants, Cement plants and Renewable energy sectors.',
      icon: <Wrench size={28} className="text-blue-600" />,
      features: [
        'Erection, Testing, and Commissioning of Electrical Systems',
        'Revamping and Integration of Control Panels with Relay & PLC',
        'Supervisory Assistance for Erection and Commissioning',
        'Plant Shutdown, Turnarounds, and Start-Up Services',
        'Supply of Field Instruments for Various Industries'
      ],
      stats: { sitesCommissioned: '200+', downtimeReduced: '98%' },
      image: '/images/installation-commissioning.jpg',
      ctaLink: '#installation-commissioning'
    },
    {
      id: 'renovation-revamping',
      title: 'Renovation & Revamping',
      description: 'Renovation of electrical systems for safety and efficiency.',
      longDescription: 'For Industries in operation for years, We are offering Renovation & Revamping of Electrical System in order to ensure safety to people working around as well as to enhance system efficiency. Our Well experienced Professionals carry out site survey to asses the optimum requirement for Renovation and Revamping of Electrical system in close co-ordination with Clients Engineering team and discuss about the modality of execution. Our trained Professionals are capable of Comprehending the needs of clients for execution of such Renovation and Revamping Work.',
      icon: <Clock size={28} className="text-blue-600" />,
      features: [
        'Renovation & Revamping for Safety and Efficiency',
        'Site Surveys to Assess Requirements',
        'Coordination with Client’s Engineering Team',
        'Execution by Trained Professionals'
      ],
      stats: { systemsRevamped: '80+', energySaved: '25%' },
      image: '/images/renovation-revamping.jpg',
      ctaLink: '#renovation-revamping'
    }
  ];

  return (
    <main className="overflow-hidden bg-gray-50" style={{ paddingTop: `${headerHeight}px` }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 via-teal-700 to-gray-900 text-white py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDMwSDMwTTYwIDMwVjMwTTYwIDMwSDMwTTYwIDMwVjMwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md text-sm md:text-base font-semibold mb-6">Since 2017</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
              Engineering Excellence for Industry Leaders
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Trusted by SAIL, NTPC, and Dalmia Cement, GVS Controls delivers innovative automation and electrical solutions with over 30 years of expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 aos-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600">
              Our Core Services
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for power plants, steel, cement, chemical, and renewable energy industries, backed by decades of experience.
            </p>
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
              animation: slideIn 0.5s ease-out forwards;
            }
            .gradient-shift {
              background-size: 200% 100%;
              animation: gradientShift 4s linear infinite;
            }
            .aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
            }
            .aos-fade-right {
              transform: translateX(20px);
            }
            .aos-fade-left {
              transform: translateX(-20px);
            }
            .aos-animate {
              opacity: 1 !important;
              transform: none !important;
            }
            .truncate-3 {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>
          <ul className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {services.map((card) => (
              <div
                key={card.id}
                className="p-6 flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl hover:bg-blue-50 border border-gray-100 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex-shrink-0 relative mb-6">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg object-cover object-center border-2 border-blue-300 transition-transform duration-500 group-hover:scale-110 bg-white"
                    style={{ aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center' }}
                    loading="lazy"
                  />
                </div>
                <div className="text-center flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mt-3 truncate-3">
                      {card.description}
                    </p>
                  </div>
                  <a
                    href={card.ctaLink}
                    className="mt-6 px-5 py-2.5 text-sm md:text-base rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 gradient-shift group relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Learn More
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
          className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-gradient-to-br from-white to-gray-50' : 'bg-gradient-to-bl from-gray-50 to-white'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className={`${index % 2 === 0 ? 'aos-fade-right' : 'aos-fade-left'} order-2 lg:order-${index % 2 === 0 ? '1' : '2'}`}>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 shadow-md transform hover:rotate-12 transition-transform">
                  {service.icon}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{service.title}</h2>
                <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                  {expanded[service.id] ? service.longDescription : `${service.longDescription.slice(0, 150)}...`}
                  {service.longDescription.length > 150 && (
                    <button
                      onClick={() => toggleDescription(service.id)}
                      className="ml-2 text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base flex items-center"
                    >
                      {expanded[service.id] ? 'Show Less' : 'Read More'}
                      {expanded[service.id] ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
                    </button>
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
                        className="text-blue-600 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform w-5 h-5 md:w-6 md:h-6"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <path d="m9 11 3 3L22 4"/>
                      </svg>
                      <span className="text-gray-700 text-sm md:text-base group-hover:text-blue-600 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-sm md:text-base font-semibold text-gray-800">
                  <span className="bg-blue-100 px-4 py-2 rounded-full">{service.stats[Object.keys(service.stats)[0]]} {Object.keys(service.stats)[0].replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="bg-teal-100 px-4 py-2 rounded-full">{service.stats[Object.keys(service.stats)[1]]} {Object.keys(service.stats)[1].replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              </div>
              <div className={`${index % 2 === 0 ? 'aos-fade-left' : 'aos-fade-right'} order-1 lg:order-${index % 2 === 0 ? '2' : '1'}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 group">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-56 sm:h-64 md:h-80 object-cover object-center rounded-2xl transition-opacity group-hover:opacity-90 bg-white"
                    style={{ aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }}
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white font-semibold text-base md:text-lg">{service.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section with Client Highlight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-teal-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0,_transparent_80%)] opacity-40 animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center aos-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">
              Partner with Industry Experts
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              From SAIL to NTPC, our solutions power leading industries. Let us transform your operations with innovative engineering.
            </p>
            <div className="mb-8">
              <p className="text-teal-200 italic text-base md:text-lg">"GVS Controls delivered exceptional automation solutions for our cement plant, ensuring efficiency and reliability." - Dalmia Cement</p>
            </div>
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-base md:text-lg">
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;