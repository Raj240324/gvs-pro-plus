import { NavLink, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Home, Info, Briefcase, Folder, Contact, Shield, FileText, Wrench, Users, Star, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Footer = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/about', label: 'About Us', Icon: Info },
    { to: '/services', label: 'Services', Icon: Briefcase },
    { to: '/manufacturing-supply', label: 'Manufacturing & Supply', Icon: Wrench },
    { to: '/projects', label: 'Projects', Icon: Folder },
    { to: '/clients', label: 'Clients', Icon: Users },
    { to: '/why-us', label: 'Why Us', Icon: Star },
    { to: '/gallery', label: 'Gallery', Icon: Image },
    { to: '/contact', label: 'Contact', Icon: Contact },
    { to: '/privacy-policy', label: 'Privacy Policy', Icon: Shield },
    { to: '/terms-of-service', label: 'Terms of Service', Icon: FileText },
  ];

  const serviceLinks = [
    { to: '/services#consultancy', label: 'Expert Consultancy' },
    { to: '/services#automation', label: 'Smart Automation' },
    { to: '/services#additional-services', label: 'Erection, Testing & Commissioning' },
    { to: '/services#renovation-revamping', label: 'Renovation & Revamping' },
    { to: '/services#services-and-supply', label: 'Services & Supply' },
  ];

  const socialLinks = [
    { href: 'https://linkedin.com/company/gvs-controls', Icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com/gvs-controls', Icon: Twitter, label: 'X Platform' },
    { href: 'https://facebook.com/gvscontrols', Icon: Facebook, label: 'Facebook' },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-[#b2ff8b]/95 via-[#4ecdc4]/95 to-[#2a9d8f]/95 text-[#4a0e78] overflow-hidden">
      {/* Modern Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#b2ff8b]/20 via-[#4ecdc4]/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Animated Gradient Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, rgba(78, 205, 196, 0.1) 50%, transparent 100%),
            linear-gradient(180deg, transparent 0%, rgba(42, 157, 143, 0.05) 50%, transparent 100%)
          `,
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 15,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 pt-16 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              className="backdrop-blur-lg bg-white/20 p-6 rounded-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(74, 14, 120, 0.2)"
              }}
            >
              <div className="flex items-center mb-4">
                <img src="/logo.png" alt="GVS Controls Logo" className="h-10 w-auto" />
                <span className="font-montserrat font-bold text-xl ml-3 text-[#ff0000]">
                  GVS CONTROLS
                </span>
              </div>
              <p className="font-montserrat text-sm leading-relaxed mb-2 text-[#ffbf00] italic font-bold">
                Our Vision To Your Solution
              </p>
              <p className="text-[#4a0e78]/90 text-sm sm:text-md leading-relaxed break-words">
                Since 2017, GVS Controls has delivered innovative, cost-effective engineering solutions, empowering clients with cutting-edge technology. Your vision, our mission.
              </p>
              <div className="flex space-x-3 mt-4">
                {socialLinks.map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="p-2 rounded-full bg-white/30 hover:bg-white/40 transition-all duration-300 border border-white/30"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} className="text-[#4a0e78] hover:text-[#ff6f61]" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="backdrop-blur-lg bg-white/20 p-6 rounded-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(74, 14, 120, 0.2)"
              }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#4a0e78]">
                Explore More
              </h3>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-3">
                {navLinks.map(({ to, label, Icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="text-[#4a0e78]/90 hover:text-[#ff6f61] text-sm relative group flex items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="mr-2"
                    >
                      <Icon size={14} className="text-[#ff6f61]" />
                    </motion.div>
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm"
                    >
                      {label}
                    </motion.span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#ff6f61] to-[#4a0e78]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </NavLink>
                ))}
              </nav>
            </motion.div>

            {/* Services */}
            <motion.div
              className="backdrop-blur-lg bg-white/20 p-6 rounded-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(74, 14, 120, 0.2)"
              }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#4a0e78]">
                What We Offer
              </h3>
              <nav className="grid gap-3">
                {serviceLinks.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="text-[#4a0e78]/90 hover:text-[#ff6f61] text-base relative group flex items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="mr-2"
                    >
                      <Briefcase size={16} className="text-[#ff6f61]" />
                    </motion.div>
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#ff6f61] to-[#4a0e78]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </NavLink>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="backdrop-blur-lg bg-white/20 p-6 rounded-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(74, 14, 120, 0.2)"
              }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#4a0e78]">
                Reach Out
              </h3>
              <div className="space-y-4 text-base">
                <motion.div
                  className="flex items-start group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin size={18} className="text-[#ff6f61] mr-2 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-[#4a0e78]/90 text-sm">
                    Office & Works: Plot No.1476, Sengundram Main Road, Gokulapuram Chengalpattu Dist, Pin-603204 (Land Mark – Mas Robotics)
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-start group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin size={18} className="text-[#ff6f61] mr-2 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-[#4a0e78]/90 text-sm">
                    Reg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar, Govindarajapuram, Guduvanchery – 603202, Kanchipuram Dist
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-center group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone size={18} className="text-[#ff6f61] mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col">
                    <a
                      href="tel:+917338880027"
                      className="text-[#4a0e78]/90 hover:text-[#ff6f61] relative text-sm group-hover:text-[#ff6f61]"
                    >
                      +91 73388 80027
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#ff6f61] to-[#4a0e78]"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                    <a
                      href="tel:+919884001597"
                      className="text-[#4a0e78]/90 hover:text-[#ff6f61] relative text-sm group-hover:text-[#ff6f61]"
                    >
                      +91 98840 01597
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#ff6f61] to-[#4a0e78]"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail size={18} className="text-[#ff6f61] mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a
                    href="mailto:gvscontrols@gmail.com"
                    className="text-[#4a0e78]/90 hover:text-[#ff6f61] relative text-sm group-hover:text-[#ff6f61]"
                  >
                    gvscontrols@gmail.com
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#ff6f61] to-[#4a0e78]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Copyright Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center text-xs sm:text-sm text-[#4a0e78]/80 break-words px-4">
              <p>© {new Date().getFullYear()} GVS Controls. All rights reserved.</p>
              <p className="mt-2">
                GVS Controls is a registered business in India, committed to delivering quality engineering solutions with integrity and professionalism.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;