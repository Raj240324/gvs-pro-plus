import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectStatusCard } from '../components/ui/ProjectStatusCard';

const WhyUs = () => {
  useEffect(() => {
    document.title = 'Why Choose GVS Controls - Our Advantages';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover why GVS Controls is your ideal partner - experienced team, cost-effective solutions, advanced technology, and more.'
      );
    }

    const handleScroll = () => {
      const elements = document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left');
      elements.forEach((element) => {
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

  const advantages = [
    {
      title: 'Experienced Team',
      progress: 100,
      dueDate: 'Achieved',
      contributors: [
        { name: 'Senior Engineer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
        { name: 'Project Lead' },
      ],
      tasks: [
        { title: '30+ Years in EPC Projects', completed: true },
        { title: 'Solution-Based Specialists', completed: true },
        { title: 'Understanding Client Needs', completed: true },
      ],
    },
    {
      title: 'Cost-Effective Solutions',
      progress: 100,
      dueDate: 'Achieved',
      contributors: [
        { name: 'Cost Analyst', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
        { name: 'Service Manager' },
      ],
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
      contributors: [
        { name: 'Tech Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7' },
        { name: 'Automation Lead' },
      ],
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
      contributors: [
        { name: 'Project Manager', image: 'https://images.unsplash.com/photo-1487412723647-9d87d7f7f8b9' },
        { name: 'Coordinator' },
      ],
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
      contributors: [
        { name: 'Utility Engineer', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e' },
        { name: 'System Designer' },
      ],
      tasks: [
        { title: 'System Operations', completed: true },
        { title: 'Competitive Edge', completed: true },
        { title: 'Superior Services', completed: true },
      ],
    },
  ];

  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28">
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
        `}
      </style>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gvs-green to-gvs-blue text-white py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm text-xs sm:text-sm mb-4 sm:mb-6">
              Our Advantages
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Why Choose GVS Controls</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              Partner with us for innovative, reliable engineering solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 aos-fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gvs-dark-gray mb-3 sm:mb-4">
              Our Key Advantages
            </h2>
            {/* Green gradient divider, responsive and centered */}
            <div className="mx-auto mb-4 flex justify-center">
              <div className="h-1 w-20 sm:w-32 rounded-full bg-gradient-to-r from-gvs-green to-gvs-blue" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              With over 30 years of expertise, we deliver exceptional value through specialized services.
            </p>
          </div>

          {/* Responsive and centered ProjectStatusCard grid */}
          <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <ProjectStatusCard
                  key={index}
                  title={advantage.title}
                  progress={advantage.progress}
                  dueDate={advantage.dueDate}
                  tasks={advantage.tasks}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gvs-green via-gvs-teal to-gvs-blue text-white overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center aos-fade-up">
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