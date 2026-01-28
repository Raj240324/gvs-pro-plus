import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectStatusCard } from '../components/ui/ProjectStatusCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WhyUs = () => {
  useEffect(() => {
    document.title = 'Why Us - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover why GVS Controls is your ideal partner for engineering solutions.'
      );
    }

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.fromTo(
      '.hero-content',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top 80%',
        },
      }
    );

    // Parallax Background for Hero
    gsap.to('.hero-section', {
      backgroundPosition: '50% 100%',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Advantages Grid Animations
    gsap.utils.toArray('.advantage-card').forEach((card, index) => {
      gsap.fromTo(
        card as Element,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.2, // Staggered animation
        }
      );
    });

    // CTA Section Animation
    gsap.fromTo(
      '.cta-content',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 80%',
        },
      }
    );

    // Clean up ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const advantages = [
    {
      title: 'Experienced Team',
      progress: 100,
      dueDate: 'Achieved',
      tasks: [
        { title: 'Solution-Based Specialists', completed: true },
        { title: 'Understanding Client Needs', completed: true },
        { title: 'Innovative Solutions', completed: true },
      ],
    },
    {
      title: 'Cost-Effective Solutions',
      progress: 100,
      dueDate: 'Achieved',
      tasks: [
        { title: 'Flexible Service Selection', completed: true },
        { title: 'Staff Collaboration', completed: true },
        { title: 'Cost Optimization', completed: true },
      ],
    },
    {
      title: 'Advanced Technology',
      progress: 100,
      dueDate: 'Achieved',
      tasks: [
        { title: 'Quality Manufacturing', completed: true },
        { title: 'Turnkey Solutions', completed: true },
        { title: 'Electrical Installations', completed: true },
      ],
    },
    {
      title: 'Tailored Timelines',
      progress: 100,
      dueDate: 'Achieved',
      tasks: [
        { title: 'Custom Scheduling', completed: true },
        { title: 'Resource Efficiency', completed: true },
        { title: 'Timeline Optimization', completed: true },
      ],
    },
    {
      title: 'Utility System Expertise',
      progress: 100,
      dueDate: 'Achieved',
      tasks: [
        { title: 'System Operations', completed: true },
        { title: 'Competitive Edge', completed: true },
        { title: 'Superior Services', completed: true },
      ],
    },
  ];

  return (
    <main className="pt-[84px] lg:pt-[140px]">
      <style>
        {`
          .hero-section {
            background-size: cover;
            background-position: 50% 0%;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-gvs-green to-gvs-blue text-white min-h-[50vh] flex items-center py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-content max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm text-xs sm:text-sm mb-4 sm:mb-6">
              30+ Years of Promoter Experience
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Why Choose GVS Controls?</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              MSME & IE/CEIG Compliant • Innovative Problem-Solving Culture • Customer-First Approach
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gvs-dark-gray mb-3 sm:mb-4">
              Our Key Advantages
            </h2>
            <div className="mx-auto mb-4 flex justify-center">
              <div className="h-1 w-20 sm:w-32 rounded-full bg-gradient-to-r from-gvs-green to-gvs-blue" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              With over 30 years of Promoter Experience in EPC Projects, we deliver exceptional value through specialized services.
            </p>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <div className="advantage-card" key={index}>
                  <ProjectStatusCard
                    title={advantage.title}
                    progress={advantage.progress}
                    dueDate={advantage.dueDate}
                    tasks={advantage.tasks}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gvs-green via-gvs-teal to-gvs-blue text-white overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="cta-content max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100 drop-shadow-lg">
              Ready to Experience Our Expertise?
            </h2>
            <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl font-light tracking-wide">
              Contact us today to see how we can elevate your next project with tailored solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-white to-gray-200 text-gvs-green hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-xl px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full font-semibold uppercase tracking-wide text-sm sm:text-base"
              >
                Contact Us
              </Link>
              <Link
                to="/services"
                className="bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all duration-300 transform hover:scale-105 px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full font-semibold uppercase tracking-wide border border-white/30 text-sm sm:text-base"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </section>
    </main>
  );
};

export default WhyUs;