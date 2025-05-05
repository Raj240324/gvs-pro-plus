import { useEffect, useState, useCallback } from 'react';
import { 
  Settings, 
  Wrench, 
  HardDrive, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Define TypeScript interface for service objects
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
      id: 'additional-services',
      title: 'OUR ADDITIONAL SERVICES',
      description: 'Erection, testing, and commissioning of electrical systems.',
      icon: <Wrench size={28} className="text-teal-500" />,
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
      icon: <Clock size={28} className="text-teal-500" />,
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
      icon: <Settings size={28} className="text-teal-500" />,
      features: [
        'Control Design through Relay logic and PLC Automation for Process Plant/ Machineries',
        'Revamping and Integration of Electrical System with suitable Control’s (Relay& PLC) Instrumentation and Conversion of Relay Panel into PLC Panel',
        'Technical Services for Installation and commissioning activities at site',
        'Supply of Motor Control center VFD Panels and Local Control Panels',
        'Supply of Relay Logic and PLC Based Control Panels',
        'Supply of Field Instruments for Cement plant and Conveyor equipments like Safety switches Pull chord and Belt sway - (Schmersal make) Motion Sensors - (Milltronics) and ZSS-( Pepperl + Fuchs )',
        'Sourcing and Supply of Instruments for Wind Mills and Switches of any Special Requirements'
      ],
      ctaLink: '#services-and-supply'
    }
  ];

  return (
    <main className="bg-gray-50" style={{ paddingTop: `${headerHeight}px` }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Our Services</h1>
            <p className="text-xl md:text-2xl leading-relaxed">Cutting-edge electrical and automation solutions tailored for industrial excellence.</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 aos-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Service Offerings</h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of solutions designed to optimize your industrial operations.
            </p>
          </div>
          <style>{`
            @keyframes fadeUp {
              0% { transform: translateY(50px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes scaleIn {
              0% { transform: scale(0.9); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes slideIn {
              0% { transform: translateX(-50px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            .aos-fade-up {
              opacity: 0;
              transform: translateY(50px);
              transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            }
            .aos-scale-in {
              opacity: 0;
              transform: scale(0.9);
              transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            }
            .aos-slide-in {
              opacity: 0;
              transform: translateX(-50px);
              transition: opacity 1s ease-out, transform 1s ease-out;
            }
            .aos-animate.aos-fade-up {
              animation: fadeUp 0.8s ease-out forwards;
            }
            .aos-animate.aos-scale-in {
              animation: scaleIn 0.8s ease-out forwards;
            }
            .aos-animate.aos-slide-in {
              animation: slideIn 1s ease-out forwards;
            }
            .truncate-3 {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .card-hover {
              transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
            }
            .card-hover:hover {
              transform: translateY(-8px);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
              background: linear-gradient(145deg, #f0f9ff, #e0f2fe);
            }
            .feature-item {
              transition: transform 0.4s ease, opacity 0.4s ease;
            }
            .aos-animate .feature-item {
              animation: slideIn 0.6s ease-out forwards;
              animation-delay: calc(0.1s * var(--index));
            }
          `}</style>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((card, index) => (
              <li
                key={card.id}
                className={`p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover aos-slide-in`}
                style={{ '--index': index } as React.CSSProperties}
              >
                <div className="flex items-center mb-6">
                  {card.icon}
                  <h3 className="ml-4 text-2xl font-bold text-gray-900">{card.title}</h3>
                </div>
                <p className="text-gray-600 text-base mb-6 truncate-3 leading-relaxed">{card.description}</p>
                <a
                  href={card.ctaLink}
                  className="inline-flex items-center text-teal-500 hover:text-teal-700 font-semibold text-base transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
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
          className={`py-20 ${index % 2 === 0 ? 'bg-gradient-to-br from-gray-50 to-blue-50' : 'bg-gradient-to-br from-white to-teal-50'}`}
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
                    key={i}
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
      <section className="py-20 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
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