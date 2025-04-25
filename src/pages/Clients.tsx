import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Define interfaces for type safety
interface Client {
  name: string;
  location: string;
  logo: string;
  description: string;
}

interface Consultant {
  name: string;
  logo: string;
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
  useEffect(() => {
    document.title = 'Our Clients - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our partnerships with industry leaders like Aumund Engineering and Loesche Energy.');
    }

    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.9) {
          element.classList.add('animate-active');
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clients: Client[] = [
    { name: 'Aumund Engineering', location: 'Chennai', logo: 'https://www.aumund.com/wp-content/uploads/2020/10/aumund-logo.svg', description: 'Material handling systems for cement production.' },
    { name: 'Loesche Energy', location: 'Delhi & Chennai', logo: 'https://www.loesche.com/fileadmin/templates/img/logo-loesche.svg', description: 'Automation for energy production.' },
    { name: 'Metco Roof', location: 'Chennai', logo: 'https://www.metco.co.in/images/logo.png', description: 'Control systems for roofing manufacturing.' },
    { name: 'Meenakshi Medical College', location: 'Kanchipuram', logo: 'https://mmchri.ac.in/wp-content/uploads/2021/09/logo.png', description: '11 KV substation revamping.' },
    { name: 'Ultratech Cement', location: 'Gujarat', logo: 'https://www.ultratechcement.com/content/dam/ultratechcementwebsite/logo.png', description: 'Feeders for cement operations.' },
    { name: 'NTPC Limited', location: 'Darapalli', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/NTPC_Logo.svg', description: 'Electrical systems for power generation.' },
    { name: 'JSW Cement', location: 'Dolvi', logo: 'https://www.jsw.in/sites/default/files/assets/logo/jsw_cement_logo.png', description: 'Stacker and reclaimer consultancy.' },
    { name: 'Meenakshi Energy', location: 'Nellore', logo: 'https://meenakshienergy.com/images/logo.png', description: 'Custom paddle feeder solutions.' },
  ];

  const consultants: Consultant[] = [
    {
      name: 'Engineers India Ltd (EIL)',
      logo: 'https://ui-avatars.com/api/?name=EIL&background=6d28d9&color=fff&bold=true&rounded=true&size=96&length=3'
    },
    {
      name: 'MECON',
      logo: 'https://ui-avatars.com/api/?name=MECON&background=0e7490&color=fff&bold=true&rounded=true&size=96&length=2'
    },
    {
      name: 'Fichtner',
      logo: 'https://ui-avatars.com/api/?name=Fichtner&background=059669&color=fff&bold=true&rounded=true&size=96&length=1'
    },
    {
      name: 'Tata Consulting Engineers',
      logo: 'https://ui-avatars.com/api/?name=TCE&background=be185d&color=fff&bold=true&rounded=true&size=96&length=3'
    },
  ];

  const testimonials: Testimonial[] = [
    { text: 'GVS Controls elevated our efficiency with seamless automation.', author: 'Engineering Director', company: 'Steel Manufacturer' },
    { text: 'Exceptional expertise and timely delivery on every project.', author: 'Project Manager', company: 'Power Generation' },
    { text: 'Their control panels set a new standard for quality.', author: 'Chief Operations Officer', company: 'Manufacturing Firm' },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 overflow-hidden">
      <style>
        {`
          /* Ensure header and content align seamlessly */
          header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            background: #fff; /* Adjust based on your header's background */
          }

          /* Smooth transition for content below header */
          main {
            margin-top: 0;
            transition: padding-top 0.3s ease;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(45, 212, 191, 0.3); }
            50% { box-shadow: 0 0 20px rgba(45, 212, 191, 0.5); }
          }

          @keyframes slideIn {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 text-white py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0,_transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll" data-animation="fade-in-down">
            <span className="inline-block px-4 py-1 sm:px-4 sm:py-2 rounded-full bg-white/20 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-md">Our Partners</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-400">Valued Clients</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Collaborating with industry leaders to shape the future of engineering.</p>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-[300px] h-[300px] bg-teal-500/20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-pulse"></div>
          <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl bottom-[-200px] right-[-200px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-on-scroll" data-animation="fade-in-down">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 tracking-wide">
              Trusted by <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400">Innovators</span>
            </h2>
            <p className="text-gray-300 max-w-lg mx-auto text-sm sm:text-base md:text-lg font-light">Empowering pioneers with cutting-edge solutions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-500 overflow-hidden animate-[slideIn_0.5s_ease-out] hover:animate-[float_2s_ease-in-out_infinite]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[glow_2s_ease-in-out_infinite]"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300 animate-[float_1.5s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300 animate-[float_2s_ease-in-out_infinite]"></div>

                <div className="relative z-10">
                  <div className="h-20 flex items-center justify-center mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-white/10 backdrop-blur-md p-2 rounded-full border border-teal-400/30 hover:border-teal-400/50 shadow-lg hover:shadow-xl"
                        onError={e => (e.currentTarget.style.display = 'none')}
                      />
                    ) : null}
                    {(!client.logo || (typeof window !== 'undefined' && document && !document.querySelector(`img[src='${client.logo}']`))) && (
                      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-400/40 to-purple-400/40 text-white text-2xl font-bold shadow-lg">
                        {client.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                      </div>
                    )}
                    <div className="absolute w-24 h-24 border-2 border-teal-400/20 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-teal-400/40"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-300 group-hover:from-teal-400 group-hover:to-purple-400 transition-all duration-300">
                    {client.name}
                  </h3>
                  <p className="text-sm text-teal-200 mb-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
                    {client.location}
                  </p>
                  <p className="text-sm text-gray-300 font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {client.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {([
              { value: '50+', label: 'Satisfied Clients', icon: '👥' },
              { value: '10+', label: 'Industries Served', icon: '🏭' },
              { value: '95%', label: 'Retention Rate', icon: '🔄' },
            ] as Stat[]).map((stat, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-teal-900/90 to-purple-900/90 rounded-2xl p-6 overflow-hidden border border-teal-400/40 hover:border-teal-400/70 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 animate-[slideIn_0.6s_ease-out]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%,_rgba(45,212,191,0.2)_0,_transparent_70%)] opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-teal-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300 animate-pulse"></div>

                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-3 animate-[bounce_2s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400 mb-2 group-hover:from-teal-300 group-hover:to-purple-300 transition-all duration-300">
                    {stat.value}
                  </div>
                  <p className="text-white font-semibold text-base tracking-wide">{stat.label}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultants Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-100 to-teal-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-on-scroll" data-animation="fade-in-down">
            <span className="inline-block px-4 py-1 sm:px-4 sm:py-2 bg-teal-500/20 text-teal-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Collaborations</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Consultant <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">Partners</span>
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base md:text-lg font-light">Uniting with top-tier consultancies for excellence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-6 sm:py-10">
            {consultants.map((consultant, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-teal-800/90 to-purple-800/90 rounded-2xl p-6 overflow-hidden border border-teal-400/40 hover:border-teal-400/70 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 hover:rotate-1 animate-on-scroll"
                data-animation="flip-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%,_rgba(45,212,191,0.2)_0,_transparent_70%)] opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-teal-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300 animate-pulse"></div>

                <div className="relative z-10">
                  <div className="h-20 flex items-center justify-center mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-purple-400/30 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <img
                      src={consultant.logo}
                      alt={`${consultant.name} logo`}
                      className="h-14 w-auto object-contain transition-all duration-500 group-hover:scale-110 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-teal-400/50 hover:border-teal-400/70 shadow-md hover:shadow-lg"
                    />
                    <div className="absolute w-20 h-20 border-2 border-teal-400/30 rounded-lg animate-[spin_8s_linear_infinite] group-hover:border-teal-400/50"></div>
                  </div>
                  <p className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-purple-300 group-hover:from-teal-400 group-hover:to-purple-400 transition-all duration-300">
                    {consultant.name}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-on-scroll" data-animation="fade-in-down">
            <span className="inline-block px-4 py-1 sm:px-4 sm:py-2 bg-teal-200 text-teal-800 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm">Client Feedback</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">
              What They <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600">Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light">Voices from our valued partners echoing our impact.</p>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-center h-96 sm:h-[450px] md:h-[500px] overflow-hidden perspective-1000">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute w-full max-w-md sm:max-w-lg md:max-w-xl transition-all duration-700 ease-in-out transform ${
                    index === activeIndex
                      ? 'translate-x-0 opacity-100 z-10 scale-100 rotate-y-0'
                      : index < activeIndex
                      ? '-translate-x-full opacity-0 scale-90 -rotate-y-10'
                      : 'translate-x-full opacity-0 scale-90 rotate-y-10'
                  }`}
                >
                  <div
                    className="w-full p-6 sm:p-8 bg-gradient-to-br from-teal-100 via-indigo-100 to-purple-100 rounded-2xl shadow-2xl border border-teal-200/50 hover:shadow-3xl hover:-translate-y-3 transition-all duration-300 cursor-pointer relative overflow-hidden mx-auto backdrop-blur-md"
                    onClick={nextTestimonial}
                  >
                    <div className="absolute top-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-teal-400/20 rounded-full -translate-x-10 sm:-translate-x-12 -translate-y-10 sm:-translate-y-12 blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-purple-400/20 rounded-full translate-x-10 sm:translate-x-12 translate-y-10 sm:translate-y-12 blur-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <Quote className="text-teal-600 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 mb-4 sm:mb-6 opacity-80 mx-auto animate-pulse" />
                    <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-4 sm:mb-6 italic font-medium leading-relaxed text-center relative z-10 drop-shadow-sm">
                      "{testimonial.text}"
                    </p>
                    <div className="text-center relative z-10">
                      <p className="font-semibold text-base sm:text-lg text-gray-900 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">{testimonial.author}</p>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base font-light">{testimonial.company}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 scale-x-75 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 sm:left-[-2rem] md:left-[-3rem] top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-full hover:from-teal-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 sm:right-[-2rem] md:right-[-3rem] top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-full hover:from-teal-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </button>

            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-teal-600 to-purple-600 w-6 sm:w-8 shadow-md'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-16 text-center animate-on-scroll" data-animation="fade-in-scale">
            <div className="bg-gradient-to-r from-teal-100 to-purple-100 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600">Enjoyed Working With Us?</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">We’d love to hear your experience.</p>
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-teal-600 to-purple-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:from-teal-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base md:text-lg"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Benefits */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-on-scroll" data-animation="fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Clients Choose Us</h2>
            <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">The qualities that set us apart.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {([
              { title: 'Expertise', desc: 'Decades of specialized knowledge.' },
              { title: 'Customization', desc: 'Solutions tailoring to you.' },
              { title: 'Quality', desc: 'Unwavering standards.' },
              { title: 'Timeliness', desc: 'Always on schedule.' },
              { title: 'Value', desc: 'Performance meets efficiency.' },
              { title: 'Support', desc: 'Reliable post-project care.' },
            ] as Benefit[]).map((benefit, index) => (
              <div
                key={index}
                className="flex items-start p-4 sm:p-6 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 animate-on-scroll shadow-md hover:shadow-lg"
                data-animation="fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle2 className="text-teal-400 mt-1 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-300">{benefit.title}</h3>
                  <p className="text-white/80 text-sm sm:text-base">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Client CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 rounded-xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto text-center shadow-xl animate-on-scroll hover:shadow-2xl transition-all duration-300" data-animation="fade-in-scale">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Partner With Us</h2>
            <p className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">Let’s create something extraordinary together.</p>
            <Link
              to="/contact"
              className="inline-block bg-white text-teal-700 px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md hover:scale-105 text-sm sm:text-base md:text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Clients;