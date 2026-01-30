import { NavLink, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Globe, Home, Info, Briefcase, Folder, Contact, Wrench, Users, Star, Image, ArrowRight, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const quickLinks = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/about', label: 'About Us', Icon: Info },
    { to: '/services', label: 'Services', Icon: Briefcase },
    { to: '/manufacturing-supply', label: 'Manufacturing & Supply', Icon: Wrench },
    { to: '/projects', label: 'Projects', Icon: Folder },
    { to: '/clients', label: 'Clients', Icon: Users },
    { to: '/why-us', label: 'Why Us', Icon: Star },
    { to: '/gallery', label: 'Gallery', Icon: Image },
    { to: '/contact', label: 'Contact', Icon: Contact },
  ];

  const serviceLinks = [
    { to: '/services#consultancy', label: 'Expert Consultancy' },
    { to: '/services#automation', label: 'Smart Automation' },
    { to: '/services#additional-services', label: 'Erection & Commissioning' },
    { to: '/services#renovation-revamping', label: 'Renovation & Revamping' },
    { to: '/services#services-and-supply', label: 'Services & Supply' },
  ];

  const socialLinks = [
    { href: 'https://www.linkedin.com/company/gvs-controls', Icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-indigo-600 via-teal-500 to-purple-600 text-white overflow-hidden">

      {/* Top CTA Banner - Big Stats Version */}
      <div className="relative z-10 bg-zinc-50 py-12 border-b border-zinc-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Stats Group */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {/* Stat 1 */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white shadow-sm rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <span className="block text-3xl font-black text-gray-900 leading-none">2017</span>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Year Established</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-gray-200/80" />

              {/* Stat 2 */}
              <div className="flex items-center gap-4 group">
                 <div className="p-3 bg-white shadow-sm rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <span className="block text-3xl font-black text-gray-900 leading-none">30+</span>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Years Experience</span>
                </div>
              </div>
            </div>

            {/* CTA Action */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-center md:text-right hidden md:block">
                 <span className="block text-gray-900 font-bold text-lg">Ready to start your project?</span>
                 <span className="block text-gray-500 text-sm">Get a custom quote within 24 hours.</span>
              </div>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-teal-900/10 hover:shadow-teal-900/20 hover:-translate-y-1 transition-all text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request a Quote <ArrowRight className="w-5 h-5 ml-1" />
              </motion.a>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Column 1: Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src="/gvs-logo.png" alt="GVS Controls Logo" className="h-14 w-14 object-contain rounded-lg shadow-md" width="56" height="56" />
                <div>
                  <h3 className="font-bold text-lg text-[#ff0000]">GVS CONTROLS</h3>
                  <p className="text-xs text-[#ffbf00] font-semibold italic">Our Vision To Your Solution</p>
                </div>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-5">
                Delivering innovative, Cost-Effective Engineering solutions. Our Problem-Solving culture ensures optimal Man-Machine interaction, focused on one objective — Customer Satisfaction.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">Follow Us</span>
                {socialLinks.map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="w-9 h-9 rounded-full bg-[#4a0e78] flex items-center justify-center text-white hover:bg-[#0077b5] transition-colors"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-bold text-base mb-5 text-white uppercase tracking-wide border-b-2 border-white/30 pb-2">
                Quick Links
              </h4>
              <nav className="grid grid-cols-1 gap-2.5">
                {quickLinks.map(({ to, label, Icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="flex items-center gap-2 text-white/90 hover:text-[#ffbf00] text-sm transition-colors group"
                  >
                    <Icon size={14} className="text-white/60 group-hover:text-[#ffbf00]" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Column 3: Our Services */}
            <div>
              <h4 className="font-bold text-base mb-5 text-white uppercase tracking-wide border-b-2 border-white/30 pb-2">
                Our Services
              </h4>
              <nav className="grid grid-cols-1 gap-2.5">
                {serviceLinks.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="flex items-center gap-2 text-white/90 hover:text-[#ffbf00] text-sm transition-colors group"
                  >
                    <Briefcase size={14} className="text-white/60 group-hover:text-[#ffbf00]" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h4 className="font-bold text-base mb-5 text-white uppercase tracking-wide border-b-2 border-white/30 pb-2">
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#ffbf00] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90 leading-relaxed">
                    Plot No.1476, Segundram Main Road, Gokulapuram, MaraimalaiNagar, Chengalpattu - 603209
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#ffbf00] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <a href="tel:+917338880027" className="block text-white/90 hover:text-[#ffbf00] transition-colors">+91 73388 80027</a>
                    <a href="tel:+919884001597" className="block text-white/90 hover:text-[#ffbf00] transition-colors">+91 98840 01597</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#ffbf00] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <a href="mailto:projects@gvscontrols.com" className="block text-white/90 hover:text-[#ffbf00] transition-colors">projects@gvscontrols.com</a>
                    <a href="mailto:gvscontrols@gmail.com" className="block text-white/90 hover:text-[#ffbf00] transition-colors">gvscontrols@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-[#ffbf00] flex-shrink-0" />
                  <a href="https://www.gvscontrols.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/90 hover:text-[#ffbf00] transition-colors">
                    www.gvscontrols.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright & Legal */}
      <div className="relative z-10 bg-indigo-900/50 backdrop-blur-sm py-5 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-white/90 text-sm font-medium">
                © {new Date().getFullYear()} M/s GVS Controls. All Rights Reserved.
              </p>
              <p className="text-white/50 text-xs mt-1">
                MSME Registered | IE & CEIG Compliant
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <NavLink 
                to="/privacy-policy" 
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </NavLink>
              <span className="text-white/30">|</span>
              <NavLink 
                to="/terms-of-service" 
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;