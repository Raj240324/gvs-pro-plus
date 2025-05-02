import { NavLink, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Footer = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'Our Story' },
    { to: '/services', label: 'Solutions' },
    { to: '/projects', label: 'Portfolio' },
    { to: '/contact', label: 'Get in Touch' },
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/terms-of-service', label: 'Terms of Service' },
    { to: '/cookie-policy', label: 'Cookie Policy' },
  ];

  const serviceLinks = [
    { to: '/services#consultancy', label: 'Expert Consultancy' },
    { to: '/services#manufacturing', label: 'Precision Manufacturing' },
    { to: '/services#automation', label: 'Smart Automation' },
    { to: '/services#commissioning', label: 'Seamless Commissioning' },
    { to: '/services#renovation', label: 'Modern Revamping' },
  ];

  const socialLinks = [
    { href: 'https://linkedin.com/company/gvs-controls', Icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com/gvs-controls', Icon: Twitter, label: 'X Platform' },
    { href: 'https://facebook.com/gvscontrols', Icon: Facebook, label: 'Facebook' },
  ];

  return (
    <footer className="relative bg-[#1e2a44] text-[#e0f7fa] overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#2a9d8f]/20 via-[#1e2a44]/80 to-[#ff6f61]/20 opacity-90"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
        transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 pt-16 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              className="bg-[#2a9d8f]/10 backdrop-blur-md p-6 rounded-xl border border-[#2a9d8f]/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <img src="/assets/pp1.jpg" alt="GVS Controls Logo" className="h-10 w-auto" />
                <span
                  className="font-montserrat font-bold text-xl ml-3"
                  style={{ color: '#ff0000' }}
                >
                  GVS CONTROLS
                </span>
              </div>
              <p
                className="text-xs leading-relaxed mb-2"
                style={{ color: '#ffbf00' }}
              >
                Our Vision To Your Solution
              </p>
              <p className="text-[#e0f7fa] text-sm leading-relaxed">
                Since 2017, GVS Controls has delivered innovative, cost-effective engineering solutions, empowering clients with cutting-edge technology. Your vision, our mission.
              </p>
              <div className="flex space-x-3 mt-4">
                {socialLinks.map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="p-2 rounded-full bg-[#2a9d8f]/20 hover:bg-[#ff6f61]/50 transition-all duration-300"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} className="text-[#e0f7fa] hover:text-[#ffd700]" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#ffd700]">
                Explore More
              </h3>
              <nav className="grid gap-2">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="text-[#e0f7fa] hover:text-[#ff6f61] text-base relative group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#ffd700]">
                What We Offer
              </h3>
              <nav className="grid gap-2">
                {serviceLinks.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="text-[#e0f7fa] hover:text-[#ff6f61] text-base relative group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
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
              className="bg-[#2a9d8f]/10 backdrop-blur-md p-6 rounded-xl border border-[#2a9d8f]/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#ffd700]">
                Reach Out
              </h3>
              <div className="space-y-4 text-base">
                <motion.div
                  className="flex items-start group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin size={18} className="text-[#ff6f61] mr-2 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-[#e0f7fa]">
                    No.9/14, First Floor, EWS Plot, Gudalur, Maraimalai Nagar, Chengalpattu District, Tamil Nadu, Pin: 603209
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-center group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone size={18} className="text-[#ff6f61] mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a
                    href="tel:+919087772798"
                    className="text-[#e0f7fa] hover:text-[#ff6f61] relative"
                  >
                    +91 90877 72798
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail size={18} className="text-[#ff6f61] mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a
                    href="mailto:gvscontrols@gmail.com"
                    className="text-[#e0f7fa] hover:text-[#ff6f61] relative"
                  >
                    gvscontrols@gmail.com
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer */}
          <motion.div
            className="mt-10 pt-6 border-t border-[#2a9d8f]/30 text-center text-[#e0f7fa] text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="relative inline-block group">
              © {new Date().getFullYear()} GVS Controls. All rights reserved. | Engineered for the future.
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff6f61]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;