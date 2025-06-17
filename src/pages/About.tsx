import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { Timeline } from '../components/ui/timeline';
import pp1 from "../assets/pp-1.png";
import pp2 from "../assets/pp-2.png";
import pp3 from "../assets/pp-3.png";
import pp4 from "../assets/pp-4.png";
import pp5 from "../assets/pp-5.png";
import pp6 from "../assets/pp-6.png";
import re1 from "../assets/re-1.png";
import re2 from "../assets/re-2.png";
import re3 from "../assets/re-3.png";
import re4 from "../assets/re-4.png";
import re5 from "../assets/re-5.png";
import re6 from "../assets/re-6.png";
import cop1 from "../assets/cop-1.png";
import cop14 from "../assets/cop-14.png";
import cop15 from "../assets/cop-15.png";
import cop16 from "../assets/cop-16.png";
import cop17 from "../assets/cop-17.png";
import cop18 from "../assets/cop-19.png";

// Use free business images from Pexels for Mission & Vision
const missionImageUrl: string = "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg";
const visionImageUrl: string = "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg";

// Array of power plant images in public/assets
const powerPlantImages: string[] = [
  pp1,
  pp2,
  pp3,
  pp4,
  pp5,
  pp6,
];

// Array of renewable energy images in public/assets
const renewableEnergyImages: string[] = [
  re1,
  re2,
  re3,
  re4,
  re5,
  re6,
];

// Array of control panel images in public/assets/gallery
const controlPanelImages: string[] = [
  cop1,
  cop14,
  cop15,
  cop16,
  cop17,
  cop18,
];

// Define the type for timeline data
interface TimelineItem {
  title: string;
  content: JSX.Element;
}

const About: React.FC = () => {
  // State to track the current image index for power plants and renewable energy
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  // State to track the current image index for control panel images
  const [currentControlPanelIndex, setCurrentControlPanelIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  // Effect to rotate power plant and renewable energy images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % renewableEnergyImages.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Effect to rotate control panel images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentControlPanelIndex((prevIndex) => (prevIndex + 1) % controlPanelImages.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    document.title = 'About GVS Controls - Our Journey and Expertise';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn about GVS Controls, established in 2017, offering innovative electrical engineering solutions with 30+ years of industry experience.'
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, index]);
          } else {
            setVisibleCards((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.team-value-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const timelineData: TimelineItem[] = [
    {
      title: '2017',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Founded GVS Controls</h3>
          <p className="text-gray-600 mt-2">Established as a proprietary company with a vision for innovative, cost-effective engineering solutions.</p>
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Founded GVS Controls"
            className="w-full h-40 md:h-48 object-cover rounded-xl shadow-md mt-4"
          />
        </div>
      ),
    },
    {
      title: '2018-2020',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Early Projects</h3>
          <p className="text-gray-600 mt-2">Collaborated with Shriram EPC Ltd., Black Stone Group, and L&T on power plants and material handling systems.</p>
          <img
            src={powerPlantImages[currentImageIndex]}
            alt={`Power Plant Project ${currentImageIndex + 1}`}
            className="w-full h-40 md:h-48 object-cover rounded-xl shadow-md mt-4"
          />
        </div>
      ),
    },
    {
      title: '2021',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Expansion</h3>
          <p className="text-gray-600 mt-2">Executed projects for SAIL, TISCO, and RINL in renewable energy and steel sectors.</p>
          <img
            src={renewableEnergyImages[currentImageIndex]}
            alt={`Renewable Energy Project ${currentImageIndex + 1}`}
            className="w-full h-40 md:h-48 object-cover rounded-xl shadow-md mt-4"
          />
        </div>
      ),
    },
    {
      title: '2022-2023',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Automation Leadership</h3>
          <p className="text-gray-600 mt-2">Introduced advanced PLC and VFD control systems for process plants.</p>
          <div className="w-full h-40 md:h-48 overflow-hidden rounded-xl shadow-md mt-4">
            <img
              src={controlPanelImages[currentControlPanelIndex]}
              alt={`Control Panel ${currentControlPanelIndex + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      ),
    },
    {
      title: '2024-2025',
      content: (
        <div>
          <h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Global Reach</h3>
          <p className="text-gray-600 mt-2">Partnered with international clients like Titan Cement (Egypt) and Republic Cement (Philippines).</p>
          <img
            src="https://images.unsplash.com/photo-1727610542348-9636c3b65d2a?q=80&w=3179&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Global Reach"
            className="w-full h-40 md:h-48 object-cover rounded-xl shadow-md mt-4"
          />
        </div>
      ),
    },
  ];

  const teamValues = [
    {
      title: 'Integrity',
      desc: 'Upholding ethical standards in all dealings, ensuring trust and reliability with clients like SAIL, TISCO, and NTPC.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      desc: 'Pioneering cutting-edge automation and engineering solutions for complex challenges across power plants, renewable energy, and process industries.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v5" />
          <path d="m19.07 7.93-3.54 3.54" />
          <path d="M22 12h-5" />
          <path d="m19.07 16.07-3.54-3.54" />
          <path d="M12 22v-5" />
          <path d="m4.93 16.07 3.54-3.54" />
          <path d="M2 12h5" />
          <path d="m4.93 7.93 3.54 3.54" />
        </svg>
      ),
    },
    {
      title: 'Reliability',
      desc: 'Delivering quality solutions on time with tailored timelines, backed by 30+ years of experience with industry leaders like Shriram EPC and L&T.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5.4L2 8zm0-6l7 5.4L16 8" />
          <path d="M20 4H4a2 2 0 0 0-2 2v2l7 5.4L16 8l7-5.4V6a2 2 0 0 0-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Excellence',
      desc: 'Striving for top-tier results in every project, leveraging updated technology and quality manufacturing for turnkey solutions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Customer Focus',
      desc: 'Listening to your needs and offering flexible, cost-effective services tailored to your business and technical objectives.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Efficiency',
      desc: 'Maximizing resource efficiency to deliver results swiftly, with expertise in utility systems and operations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v10" />
          <path d="M12 12l-4-4" />
          <path d="M12 12l4-4" />
        </svg>
      ),
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const flipVariants = {
    hidden: { rotateY: 0 },
    visible: { rotateY: 180 },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { duration: 0.4, yoyo: Infinity },
    },
  };

  const missionVisionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div className="min-h-screen">
      {/* Spacer to push content below fixed header */}
      <div className="h-[84px] lg:h-[140px]"></div>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-800 via-teal-600 to-fuchsia-700 text-white py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_60%)] opacity-80"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjIuNSIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-teal-200 text-sm mb-6 border border-white/30 shadow-md">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-300 drop-shadow-md">
                About GVS Controls
              </h1>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-sm">
                M/s GVS Controls - Started in the year 2017 as a Proprietary Company, The Company was established with Objective of highly Innovative and Cost Effective Engineering Solution and works with Single minded dedication, constantly redefining the term-“Customer Satisfaction”.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 md:py-20 bg-gradient-to-tr from-teal-100 via-indigo-200 to-purple-200 relative">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:20px_20px] opacity-50"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 aos-fade-up">
              <span className="inline-block px-3 py-1 bg-teal-100/80 text-teal-800 rounded-full text-sm font-medium mb-3 border border-teal-200 shadow-sm">
                Our Purpose
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-md">Mission & Vision</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Discover the driving force behind GVS Controls' commitment to innovation and excellence.
              </p>
            </div>
            <div className="space-y-12 lg:space-y-0">
              {/* Mission */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center aos-fade-right">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={missionVisionVariants}
                  className="relative rounded-2xl bg-gradient-to-br from-white/95 to-teal-100/70 backdrop-blur-xl shadow-lg border border-teal-200/30 p-6 md:p-8 overflow-hidden"
                >
                  <GlowingEffect spread={30} glow={true} proximity={50} className="rounded-2xl" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.15)_0,_transparent_70%)] opacity-60"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-full bg-teal-500/10 text-teal-600">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="16" cy="16" r="16" fill="currentColor" fillOpacity="0.2"/>
                          <path d="M10 16.5L14 20.5L22 12.5" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
                        Our Mission
                      </h2>
                    </div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      Founded in 2017, GVS Controls is dedicated to delivering <span className="font-semibold text-teal-600">innovative</span> and <span className="font-semibold text-indigo-600">cost-effective</span> engineering solutions. Our problem-solving culture ensures optimal man-machine interaction, redefining <span className="font-semibold text-teal-600">customer satisfaction</span>.
                    </p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      With over <span className="font-semibold text-teal-600">30 years of experience</span> in EPC projects, our team has worked with industry leaders like Shriram EPC Ltd., Black Stone Group, and L&T, providing a vast service spectrum focused on client success.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { icon: <CheckCircle2 className="text-teal-500 w-4 h-4" />, title: 'Innovation', desc: 'Pioneering solutions.' },
                        { icon: <CheckCircle2 className="text-indigo-500 w-4 h-4" />, title: 'Customer Focus', desc: 'Your needs first.' },
                        { icon: <CheckCircle2 className="text-fuchsia-500 w-4 h-4" />, title: 'Excellence', desc: 'Top-tier quality.' },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2, duration: 0.4 }}
                          className="flex items-start gap-2 bg-white/50 rounded-lg p-3 shadow-sm border border-teal-100/30"
                        >
                          <div className="mt-1">{item.icon}</div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-indigo-400 opacity-70"></div>
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative rounded-2xl overflow-hidden shadow-xl border border-teal-200/30"
                >
                  <img
                    src={missionImageUrl}
                    alt="Our Mission"
                    className="w-full h-[250px] md:h-[400px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
                    <p className="text-xl font-bold">30+ Years</p>
                    <p className="text-sm">Industry Experience</p>
                  </div>
                </motion.div>
              </div>

              {/* Vision */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center aos-fade-left">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative rounded-2xl overflow-hidden shadow-xl border border-indigo-200/30 order-2 lg:order-1"
                >
                  <img
                    src={visionImageUrl}
                    alt="Our Vision"
                    className="w-full h-[250px] md:h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={missionVisionVariants}
                  className="relative rounded-2xl bg-gradient-to-br from-white/95 to-indigo-100/70 backdrop-blur-xl shadow-lg border border-indigo-200/30 p-6 md:p-8 overflow-hidden order-1 lg:order-2"
                >
                  <GlowingEffect spread={30} glow={true} proximity={50} className="rounded-2xl" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.15)_0,_transparent_70%)] opacity-60"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-full bg-indigo-500/10 text-indigo-600">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="16" cy="16" r="16" fill="currentColor" fillOpacity="0.2"/>
                          <path d="M16 10c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79-4-4-4z" fill="#4f46e5"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-600">
                        Our Vision
                      </h2>
                    </div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      To lead globally in <span className="font-semibold text-indigo-600">innovative automation</span> and <span className="font-semibold text-teal-600">engineering solutions</span>, driving sustainable growth and setting new standards in excellence.
                    </p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      Leveraging our <span className="font-semibold text-indigo-600">30+ years of expertise</span>, we aim to pioneer cutting-edge technologies and deliver unmatched value to clients in power, steel, and renewable energy sectors worldwide.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { icon: <CheckCircle2 className="text-indigo-500 w-4 h-4" />, title: 'Global Leadership', desc: 'Leading worldwide.' },
                        { icon: <CheckCircle2 className="text-teal-500 w-4 h-4" />, title: 'Sustainability', desc: 'Eco-friendly focus.' },
                        { icon: <CheckCircle2 className="text-fuchsia-500 w-4 h-4" />, title: 'Excellence', desc: 'Industry standards.' },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2, duration: 0.4 }}
                          className="flex items-start gap-2 bg-white/50 rounded-lg p-3 shadow-sm border border-indigo-100/30"
                        >
                          <div className="mt-1">{item.icon}</div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-teal-400 opacity-70"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-teal-200 via-blue-300 to-indigo-400 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3)_0,_transparent_70%)] opacity-60"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_50%,transparent_50%)] bg-[size:40px_40px] opacity-30"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
            <div className="text-center mb-12 aos-fade-up">
              <span className="inline-block px-3 py-1 bg-teal-100/80 text-teal-800 rounded-full text-sm font-medium mb-3 border border-teal-200 shadow-sm">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-md">Our Milestones</h2>
              <p className="text-gray-700 max-w-xl mx-auto text-base md:text-lg">
                Explore key milestones in GVS Controls' growth since 2017.
              </p>
            </div>
            <div className="relative">
              <style>{`
                /* Override Timeline component styles to remove rotating circles */
                .timeline-circle {
                  display: none !important;
                }
                .timeline-item {
                  position: relative;
                  margin-bottom: 2rem;
                  padding-left: 2rem;
                }
                .timeline-item::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 2px;
                  height: 100%;
                  background: linear-gradient(to bottom, #14b8a6, #4f46e5);
                }
                .timeline-item:first-child::prior {
                  display: none;
                }
                @media (min-width: 768px) {
                  .timeline-item {
                    padding-left: 3rem;
                  }
                }
              `}</style>
              <Timeline data={timelineData} />
              {timelineData.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={timelineItemVariants}
                  className="hidden"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Team Values Section */}
        <section className="py-16 md:py-20 bg-gradient-to-bl from-indigo-100 via-teal-100 to-fuchsia-200 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDMwIHEtMTUgMTUtMzAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-40"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 aos-fade-up">
              <span className="inline-block px-3 py-1 bg-indigo-100/80 text-indigo-800 rounded-full text-sm font-medium mb-3 border border-indigo-200 shadow-sm">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-md">What Drives Us</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Core values guiding our work with clients like SAIL, NTPC, and TISCO, ensuring innovative and reliable solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamValues.map((value, i) => (
                <div
                  key={i}
                  className="relative team-value-card"
                  data-index={i}
                  style={{ 
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <motion.div
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover={!isMobile ? "hover" : undefined}
                    variants={cardVariants}
                    className="relative bg-gradient-to-br from-white/80 to-teal-50/50 backdrop-blur-md p-6 rounded-xl shadow-xl border border-teal-200/50 overflow-hidden transform-gpu"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isMobile && visibleCards.includes(i) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                    }}
                  >
                    <GlowingEffect spread={40} glow={true} proximity={64} className="rounded-xl" />
                    <div 
                      className="relative z-10"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                      }}
                    >
                      <motion.div
                        variants={iconVariants}
                        className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-600 mb-4 shadow-sm"
                      >
                        {value.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                    </div>
                    <div 
                      className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 rounded-xl flex items-center justify-center p-6 text-center"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
                          {value.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{value.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;