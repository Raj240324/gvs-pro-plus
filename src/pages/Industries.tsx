import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '../components/ui/canvas-reveal-effect';
import { 
  Zap, // Power
  Hammer, // Steel
  FlaskConical, // Chemical
  Fan, // Cooling
  Truck, // Automobile
  Sun, // Renewable
  Box, // Material Handling
  Droplet // Water
} from 'lucide-react';

const industryImages = {
  power: '/assets/power_plants.jpg',
  steel: '/assets/steel_plants.jpg',
  chemical: '/assets/chemical_plants.jpg',
  cooling: '/assets/cooling_towers.jpg',
  automobile: '/assets/automobile_industries.jpg',
  renewable: '/assets/renewable_energy.jpg',
  material: '/assets/bulk_material_handling.jpg',
  water: '/assets/water_treatment_plants.jpg',
};

const Industries = () => {
  useEffect(() => {
    document.title = 'Industries Served - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'GVS Controls provides specialized electrical and automation solutions for power plants, steel, chemical, cooling towers, automobile, renewable energy, bulk material handling, and water treatment industries.');
    }

    const handleScroll = () => {
      const elements = document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.75) {
          element.classList.add('aos-animate');
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const industries = [
    {
      id: 'power',
      name: 'Power Plants',
      description: 'Optimized electrical and automation systems for reliable power generation.',
      longDescription: 'We deliver cutting-edge solutions for power plants, ensuring seamless operations across thermal, biomass, solar, and hydroelectric facilities. Our expertise includes turbine control, grid synchronization, and energy management systems tailored to maximize efficiency and uptime.',
      icon: <Zap size={50} strokeWidth={2} className="text-amber-600" />,
      image: industryImages.power,
      examples: ['Thermal Power Stations', 'Biomass Energy Plants', 'Solar Farms', 'Hydroelectric Dams'],
      stats: { projects: '120+', uptime: '99.8%' },
      color: [[255, 165, 0] as [number, number, number]], // Orange
    },
    {
      id: 'steel',
      name: 'Steel Plants',
      description: 'Robust automation for steel production processes.',
      longDescription: 'Our control systems enhance steel plant operations, from coke ovens to rolling mills. We provide rugged PLC-based solutions, real-time monitoring, and safety integrations to ensure precision, durability, and compliance in high-demand environments.',
      icon: <Hammer size={50} strokeWidth={2} className="text-gray-700" />,
      image: industryImages.steel,
      examples: ['Coke Oven Automation', 'Blast Furnace Controls', 'Rolling Mills', 'Continuous Casting'],
      stats: { systemsInstalled: '80+', safetyRating: '100%' },
      color: [[169, 169, 169] as [number, number, number]], // Gray
    },
    {
      id: 'chemical',
      name: 'Chemical & Process Plants',
      description: 'Safe, efficient automation for complex chemical processes.',
      longDescription: 'We specialize in automation for chemical manufacturing, pharmaceuticals, and petrochemical plants. Our solutions include process control, hazardous area instrumentation, and compliance with stringent safety standards, ensuring operational excellence.',
      icon: <FlaskConical size={50} strokeWidth={2} className="text-emerald-600" />,
      image: industryImages.chemical,
      examples: ['Chemical Manufacturing', 'Pharmaceutical Production', 'Petrochemical Refining', 'Fertilizer Plants'],
      stats: { plantsSupported: '50+', compliance: '99%' },
      color: [[0, 128, 0] as [number, number, number]], // Green
    },
    {
      id: 'cooling',
      name: 'Cooling Towers',
      description: 'Advanced monitoring for cooling tower efficiency.',
      longDescription: 'Our systems optimize concrete and FRP cooling towers used in HVAC and industrial applications. We provide real-time monitoring, vibration analysis, and energy-efficient controls to extend equipment life and reduce operational costs.',
      icon: <Fan size={50} strokeWidth={2} className="text-cyan-500" />,
      image: industryImages.cooling,
      examples: ['Concrete Cooling Towers', 'FRP Cooling Systems', 'HVAC Integration', 'Industrial Cooling'],
      stats: { towersManaged: '90+', efficiencyGain: '30%' },
      color: [[135, 206, 235] as [number, number, number]], // Sky Blue
    },
    {
      id: 'automobile',
      name: 'Automobile Industries',
      description: 'Automation driving automotive manufacturing excellence.',
      longDescription: 'We enhance automobile production with automation for assembly lines, testing, and component manufacturing. Our solutions reduce cycle times, improve quality control, and integrate seamlessly with Industry 4.0 technologies.',
      icon: <Truck size={50} strokeWidth={2} className="text-rose-600" />,
      image: industryImages.automobile,
      examples: ['Production Lines', 'Assembly Automation', 'Quality Testing', 'Component Fabrication'],
      stats: { linesAutomated: '60+', productivityBoost: '35%' },
      color: [[255, 0, 0] as [number, number, number]], // Red
    },
    {
      id: 'renewable',
      name: 'Renewable Energy',
      description: 'Sustainable solutions for green energy production.',
      longDescription: 'We support renewable energy projects with solutions for biomass gasification, solar tracking, wind turbine control, and hybrid systems. Our focus is on sustainability, efficiency, and integrating renewable sources into existing grids.',
      icon: <Sun size={50} strokeWidth={2} className="text-lime-600" />,
      image: industryImages.renewable,
      examples: ['Biomass Gasification', 'Solar Energy Systems', 'Wind Turbines', 'Hybrid Power Plants'],
      stats: { projects: '70+', carbonSaved: '20K Tons' },
      color: [[34, 139, 34] as [number, number, number]], // Forest Green
    },
    {
      id: 'material',
      name: 'Bulk Material Handling',
      description: 'Efficient systems for material movement and storage.',
      longDescription: 'Our control systems streamline bulk material handling for conveyors, stackers, and storage facilities. We optimize throughput, reduce downtime, and enhance safety for industries like mining, cement, and logistics.',
      icon: <Box size={50} strokeWidth={2} className="text-amber-800" />,
      image: industryImages.material,
      examples: ['Conveyor Systems', 'Stacker-Reclaimers', 'Loading/Unloading', 'Storage Management'],
      stats: { systemsDeployed: '100+', throughputIncrease: '25%' },
      color: [[139, 69, 19] as [number, number, number]], // Brown
    },
    {
      id: 'water',
      name: 'Water Treatment Plants',
      description: 'Automation ensuring clean and compliant water systems.',
      longDescription: 'We provide automation for sewage treatment (STP), effluent treatment (ETP), and water treatment plants (WTP), including desalination. Our systems ensure regulatory compliance, efficient water management, and reliable operation.',
      icon: <Droplet size={50} strokeWidth={2} className="text-blue-600" />,
      image: industryImages.water,
      examples: ['Sewage Treatment (STP)', 'Effluent Treatment (ETP)', 'Water Treatment (WTP)', 'Desalination Plants'],
      stats: { plantsAutomated: '85+', waterProcessed: '500M Liters' },
      color: [[0, 191, 255] as [number, number, number]], // Deep Sky Blue
    },
  ];

  interface Industry {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    icon: JSX.Element;
    image: string;
    examples: string[];
    stats: { [key: string]: string | undefined };
    color: [number, number, number][];
  }

  const Card = ({ industry }: { industry: Industry }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <a
        href={`#${industry.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="border border-gray-200 group/canvas-card flex items-center justify-center w-full max-w-sm mx-auto p-4 sm:p-6 md:p-8 relative h-80 sm:h-[24rem] bg-gradient-to-br from-gray-50 via-teal-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        {/* Decorative Elements */}
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-teal-300 rotate-45" />
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-teal-300 rotate-135" />
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-teal-300 rotate-315" />
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-teal-300 rotate-225" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,234,212,0.15)_0,_transparent_70%)] opacity-70 pointer-events-none"></div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full w-full absolute inset-0"
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-gradient-to-br from-gray-900 to-indigo-800"
                colors={industry.color}
                dotSize={2}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 text-center flex flex-col items-center justify-between h-full py-4 sm:py-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 mx-auto group-hover/canvas-card:-translate-y-4 sm:group-hover/canvas-card:-translate-y-6 group-hover/canvas-card:opacity-0 transition-all duration-300 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-indigo-400/30 rounded-full blur-lg group-hover/canvas-card:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10 flex items-center justify-center w-full h-full transform group-hover/canvas-card:rotate-12 transition-transform duration-300">
              {industry.icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-4 transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600 group-hover/canvas-card:bg-none">
              {industry.name}
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base flex-grow group-hover/canvas-card:hidden px-2 sm:px-4 leading-relaxed font-medium">{industry.description}</p>
          </div>
          <div className="mt-3 sm:mt-4 group-hover/canvas-card:hidden">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full shadow-md transform group-hover/canvas-card:scale-105 transition-transform duration-300">
              Discover Now
            </span>
          </div>
        </div>
      </a>
    );
  };

  const Icon = ({ className, ...rest }: { className?: string; [key: string]: unknown }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );

  return (
    <main className="pt-[84px] lg:pt-[140px] overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-teal-600 text-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDMwSDMwTTYwIDMwVjMwTTYwIDMwSDMwTTYwIDMwVjMwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-teal-400/20 backdrop-blur-md text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-pulse">Our Reach</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-indigo-300 animate-fade-in">
              Industries We Empower
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">Tailored electrical and automation solutions driving innovation across diverse sectors.</p>
          </div>
        </div>
      </section>

      {/* Industries Overview */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 aos-fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-700">Our Industry Expertise</h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Specialized solutions crafted with decades of experience to meet your industry’s unique needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {industries.map((industry) => (
              <Card key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Details */}
      {industries.map((industry, index) => (
        <section
          key={industry.id}
          id={industry.id}
          className={`py-12 sm:py-16 md:py-20 ${index % 2 === 0 ? 'bg-gradient-to-br from-teal-50 via-indigo-50 to-gray-100' : 'bg-gradient-to-bl from-gray-50 via-teal-50 to-indigo-50'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              <div className={`${index % 2 === 0 ? 'aos-fade-right' : 'aos-fade-left'} order-2 lg:order-${index % 2 === 0 ? '1' : '2'}`}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 rounded-full bg-teal-500/10 flex items-center justify-center shadow-md transform hover:rotate-12 transition-transform">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">{industry.icon}</div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">{industry.name}</h2>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">{industry.longDescription}</p>
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-base sm:text-lg md:text-xl">Key Applications:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {industry.examples.map((example, i) => (
                      <li key={i} className="flex items-start group">
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
                          <path d="m5 12 5 5L20 7"/>
                        </svg>
                        <span className="text-gray-700 text-sm sm:text-base group-hover:text-teal-600 transition-colors">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-gray-800">
                  <span className="bg-teal-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                    {industry.stats[Object.keys(industry.stats)[0] as keyof typeof industry.stats]} {Object.keys(industry.stats)[0].replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="bg-indigo-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                    {industry.stats[Object.keys(industry.stats)[1] as keyof typeof industry.stats]} {Object.keys(industry.stats)[1].replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              </div>
              <div className={`${index % 2 === 0 ? 'aos-fade-left' : 'aos-fade-right'} order-1 lg:order-${index % 2 === 0 ? '2' : '1'}`}>
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 group">
                  <img src={industry.image} alt={industry.name} className="w-full h-64 sm:h-80 md:h-96 object-cover transition-opacity group-hover:opacity-80" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_80%)] opacity-50 animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center aos-fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">Need Tailored Industry Solutions?</h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">Partner with GVS Controls to address your sector’s unique challenges with precision and expertise.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base border-none outline-none ring-0 focus:ring-0 focus:outline-none hover:ring-0 active:ring-0"
              >
                Get in Touch
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Industries;