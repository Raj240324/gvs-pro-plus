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
    <footer className="relative bg-gradient-to-r from-[#b2ff8b]/95 via-[#4ecdc4]/95 to-[#2a9d8f]/95 text-[#1a1a2e] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }} />

      {/* Top CTA Banner */}
      <div className="relative z-10 bg-[#1a1a2e] py-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-[#b2ff8b]" />
                <span className="text-sm font-medium">Established 2017</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-white/20" />
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-[#4ecdc4]" />
                <span className="text-sm font-medium">30+ Years Promoter Experience</span>
              </div>
            </div>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#b2ff8b] to-[#4ecdc4] text-[#1a1a2e] font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </motion.a>
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
                <img src="/gvs-logo.png" alt="GVS Controls Logo" className="h-14 w-14 object-contain rounded-lg shadow-md" />
                <div>
                  <h3 className="font-bold text-lg text-[#c40000]">GVS CONTROLS</h3>
                  <p className="text-xs text-[#8a6508] font-semibold italic">Our Vision To Your Solution</p>
                </div>
              </div>
              <p className="text-[#1a1a2e]/80 text-sm leading-relaxed mb-5">
                Delivering innovative, cost-effective engineering solutions. Our problem-solving culture ensures optimal man-machine interaction, focused on one objective — Customer Satisfaction.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#1a1a2e]/60 uppercase tracking-wide">Follow Us</span>
                {socialLinks.map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="w-9 h-9 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white hover:bg-[#0077b5] transition-colors"
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
              <h4 className="font-bold text-base mb-5 text-[#1a1a2e] uppercase tracking-wide border-b-2 border-[#1a1a2e]/20 pb-2">
                Quick Links
              </h4>
              <nav className="grid grid-cols-1 gap-2.5">
                {quickLinks.map(({ to, label, Icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="flex items-center gap-2 text-[#1a1a2e]/80 hover:text-[#c40000] text-sm transition-colors group"
                  >
                    <Icon size={14} className="text-[#1a1a2e]/50 group-hover:text-[#c40000]" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Column 3: Our Services */}
            <div>
              <h4 className="font-bold text-base mb-5 text-[#1a1a2e] uppercase tracking-wide border-b-2 border-[#1a1a2e]/20 pb-2">
                Our Services
              </h4>
              <nav className="grid grid-cols-1 gap-2.5">
                {serviceLinks.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="flex items-center gap-2 text-[#1a1a2e]/80 hover:text-[#c40000] text-sm transition-colors group"
                  >
                    <Briefcase size={14} className="text-[#1a1a2e]/50 group-hover:text-[#c40000]" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h4 className="font-bold text-base mb-5 text-[#1a1a2e] uppercase tracking-wide border-b-2 border-[#1a1a2e]/20 pb-2">
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#c40000] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1a1a2e]/80 leading-relaxed">
                    Plot No.1476, Segundram Main Road, Gokulapuram, MaraimalaiNagar, Chengalpattu - 603209
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#c40000] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <a href="tel:+917338880027" className="block text-[#1a1a2e]/80 hover:text-[#c40000] transition-colors">+91 73388 80027</a>
                    <a href="tel:+919884001597" className="block text-[#1a1a2e]/80 hover:text-[#c40000] transition-colors">+91 98840 01597</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#c40000] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <a href="mailto:projects@gvscontrols.com" className="block text-[#1a1a2e]/80 hover:text-[#c40000] transition-colors">projects@gvscontrols.com</a>
                    <a href="mailto:gvscontrols@gmail.com" className="block text-[#1a1a2e]/80 hover:text-[#c40000] transition-colors">gvscontrols@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-[#c40000] flex-shrink-0" />
                  <a href="https://www.gvscontrols.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#1a1a2e]/80 hover:text-[#c40000] transition-colors">
                    www.gvscontrols.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright & Legal */}
      <div className="relative z-10 bg-[#1a1a2e] py-5">
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