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
  longDescription: string;
  icon: JSX.Element;
  features: string[];
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

    const animatedElements = document.querySelectorAll('.aos-fade-up, .aos-fade-in');
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
      id: 'consultancy',
      title: 'CONSULTANCY',
      description: 'Project management and engineering consultancy services.',
      longDescription: 'Project management Consultancy services (PMC). System / Field Study and giving optimum Design for Turnkey Projects, Process Plants and Industries. Project Engineering - Basic and Detail Engineering Documents & Drawings for Turnkey Plants. Control Design through Relay logic and PLC Automation for Process Plant/ Machineries. Sizing Calculation and Selecting complete Electrical HT / LT Equipments for Projects. Serving as Owners Consultant and Obtaining approvals from Leading Engineering Consultant. Providing assistance in procurement Process, Material Selection/ Electrical Equipments and Inspection certifying dispatch worthiness.',
      icon: <Settings size={28} className="text-teal-600" />,
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
      longDescription: 'Providing Total Automation, Process Control Solutions and Variety of Complete Instrumentation Products and also offers highly Customer driven Services for a variety of Process and Machine Application and also Capabilities to offer highly Innovative, Cost effective, Automation systems ,Instrumentation Products, Engineering as per Standards Practices and Pragmatic site services to suit the applications.',
      icon: <HardDrive size={28} className="text-teal-600" />,
      features: [
        'Providing Total Automation, Process Control Solutions and Variety of Complete Instrumentation Products',
        'Highly Customer driven Services for a variety of Process and Machine Application',
        'Capabilities to offer highly Innovative, Cost effective, Automation systems',
        'Instrumentation Products, Engineering as per Standards Practices and Pragmatic site services to suit the applications'
      ],
      ctaLink: '#automation'
    },
    {
      id: 'additional-services',
      title: 'OUR ADDITIONAL SERVICES',
      description: 'Erection, testing, and commissioning of electrical systems.',
      longDescription: 'Erection Testing, Trouble Shooting & Commissioning of Following Electrical Systems: Bus Ducts, Power Control Centers. Motor Control Centers and Control Panels. EB & DG Synchronizing Panels, AMF Control Panels & APFC Panels. PLC,VFD Control Panels & Special Purpose and Other Custom Built Panels. Revamping of Electrical Power Panels, MCC and Process Control Panels and Integration of Electrical System with suitable Control’s (Relay& PLC) Instrumentation and Conversion of Relay Panel into PLC Panel Supervisory assistance to Erection, Testing and Commissioning at site. Plant Shutdown and Turnarounds, Comprehensive Start-up & Commissioning Services. Supply of Field Instruments for Power Plants, Bulk Material Handling System, Chemical Plants, Cooling Towers,Automobile Industries, Process Plants, Cement plants and Renewable energy sectors.',
      icon: <Wrench size={28} className="text-teal-600" />,
      features: [
        'Erection Testing, Trouble Shooting & Commissioning of Bus Ducts, Power Control Centers, Motor Control Centers and Control Panels',
        'EB & DG Synchronizing Panels, AMF Control Panels & APFC Panels',
        'PLC,VFD Control Panels & Special Purpose and Other Custom Built Panels',
        'Revamping of Electrical Power Panels, MCC and Process Control Panels and Integration of Electrical System with suitable Control’s (Relay& PLC) Instrumentation and Conversion of Relay Panel into PLC Panel',
        'Supervisory assistance to Erection, Testing and Commissioning at site',
        'Plant Shutdown and Turnarounds, Comprehensive Start-up & Commissioning Services',
        'Supply of Field Instruments for Power Plants, Bulk Material Handling System, Chemical Plants, Cooling Towers,Automobile Industries, Process Plants, Cement plants and Renewable energy sectors'
      ],
      ctaLink: '#additional-services'
    },
    {
      id: 'renovation-revamping',
      title: 'RENOVATION & REVAMPING OF ELECTRICAL SYSTEM',
      description: 'Renovation and revamping of electrical systems.',
      longDescription: 'For Industries in operation for years, We are offering Renovation& Revamping of Electrical System in order to ensure safety to people working around as well as to enhance system efficiency. Our Well experienced Professionals carry out site survey to asses the optimum requirement for Renovation and Revamping of Electrical system in close co-ordination with Clients Engineering team and discuss about the modality of execution. Our trained Professionals are capable of Comprehending the needs of clients for execution of such Renovation and Revamping Work.',
      icon: <Clock size={28} className="text-teal-600" />,
      features: [
        'Renovation& Revamping of Electrical System in order to ensure safety to people working around as well as to enhance system efficiency',
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
      longDescription: 'Control Design through Relay logic and PLC Automation for Process Plant/ Machineries. Revamping and Integration of Electrical System with suitable Control’s (Relay& PLC) Instrumentation and Conversion of Relay Panel into PLC Panel. Technical Services for Installation and commissioning activities at site. Supply of Motor Control center VFD Panels and Local Control Panels. Supply of Relay Logic and PLC Based Control Panels. Supply of Field Instruments for Cement plant and Conveyor equipments like Safety switches Pull chord and Belt sway - (Schmersal make) Motion Sensors - (Milltronics ) and ZSS-( Pepperl + Fuchs ) and also Sourcing and Supply of Instruments for Wind Mills and Switches of any Special Requirements.',
      icon: <Settings size={28} className="text-teal-600" />,
      features: [
        'Control Design through Relay logic and PLC Automation for Process Plant/ Machineries',
        'Revamping and Integration of Electrical System with suitable Control’s (Relay& PLC) Instrumentation and Conversion of Relay Panel into PLC Panel',
        'Technical Services for Installation and commissioning activities at site',
        'Supply of Motor Control center VFD Panels and Local Control Panels',
        'Supply of Relay Logic and PLC Based Control Panels',
        'Supply of Field Instruments for Cement plant and Conveyor equipments like Safety switches Pull chord and Belt sway - (Schmersal make) Motion Sensors - (Milltronics ) and ZSS-( Pepperl + Fuchs )',
        'Sourcing and Supply of Instruments for Wind Mills and Switches of any Special Requirements'
      ],
      ctaLink: '#services-and-supply'
    }
  ];

  return (
    <main className="bg-white" style={{ paddingTop: `${headerHeight}px` }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg md:text-xl">Comprehensive electrical and automation solutions for industrial applications.</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 aos-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Service Offerings</h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Tailored solutions for industrial electrical and automation needs.
            </p>
          </div>
          <style>{`
            @keyframes slideIn {
              0% { transform: translateY(20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            .aos-fade-up, .aos-fade-in {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.6s ease-out, transform 0.6s ease-out;
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
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((card) => (
              <li
                key={card.id}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 hover:bg-teal-50"
              >
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">{card.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 truncate-3">{card.description}</p>
                <a
                  href={card.ctaLink}
                  className="inline-flex items-center text-teal-600 hover:text-teal-800 font-semibold text-sm"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </a>
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
          className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aos-fade-up">
              <div className="flex items-center mb-6">
                {service.icon}
                <h2 className="ml-3 text-3xl font-bold text-gray-900">{service.title}</h2>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {expanded[service.id] ? service.longDescription : `${service.longDescription.slice(0, 200)}...`}
                {service.longDescription.length > 200 && (
                  <button
                    onClick={() => toggleDescription(service.id)}
                    className="ml-2 text-teal-600 hover:text-teal-800 font-semibold text-sm"
                  >
                    {expanded[service.id] ? 'Show Less' : 'Read More'}
                    {expanded[service.id] ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
                  </button>
                )}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
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
                      className="text-teal-600 mr-2 flex-shrink-0 w-5 h-5"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <path d="m9 11 3 3L22 4"/>
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center aos-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Operations?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Contact us to explore our consultancy, automation, and electrical system services.
            </p>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-white text-teal-600 font-semibold rounded-md hover:bg-gray-100 transition-all">
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;