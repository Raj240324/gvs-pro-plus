import { NavLink, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Home, Info, Briefcase, Folder, Contact, Shield, FileText } from 'lucide-react';
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
    { to: '/about', label: 'Our Story', Icon: Info },
    { to: '/services', label: 'Solutions', Icon: Briefcase },
    { to: '/projects', label: 'Projects', Icon: Folder },
    { to: '/contact', label: 'Get in Touch', Icon: Contact },
    { to: '/privacy-policy', label: 'Privacy Policy', Icon: Shield },
    { to: '/terms-of-service', label: 'Terms of Service', Icon: FileText },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              className="bg-[#2a9d8f]/10 backdrop-blur-md p-6 rounded-xl border border-[#2a9d8f]/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <img src="/logo.png" alt="GVS Controls Logo" className="h-10 w-auto" />
                <span
                  className="font-montserrat font-bold text-xl ml-3"
                  style={{ color: '#ff0000' }}
                >
                  GVS CONTROLS
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-2"
                style={{ color: '#ffbf00' }}
              >
                Our Vision To Your Solution
              </p>
              <p className="text-[#e0f7fa] text-md leading-relaxed">
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
              className="bg-[#2a9d8f]/10 backdrop-blur-md p-6 rounded-xl border border-[#2a9d8f]/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#ffd700]">
                Explore More
              </h3>
              <nav className="grid gap-3">
                {navLinks.map(({ to, label, Icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="text-[#e0f7fa] hover:text-[#ff6f61] text-base relative group flex items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="mr-2"
                    >
                      <Icon size={16} className="text-[#ff6f61]" />
                    </motion.div>
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
              className="bg-[#2a9d8f]/10 backdrop-blur-md p-6 rounded-xl border border-[#2a9d8f]/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-[#ffd700]">
                What We Offer
              </h3>
              <nav className="grid gap-3">
                {serviceLinks.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className="text-[#e0f7fa] hover:text-[#ff6f61] text-base relative group flex items-center"
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
                  <p className="text-[#e0f7fa] text-sm">
                    Office & Works: Plot No.1476, Sengundram Main Road, Gokulapuram Chengalpattu Dist, Pin-603204 (Land Mark – Mas Robotics)
                  </p>
                </motion.div>
                <motion.div
                  className="flex items-start group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin size={18} className="text-[#ff6f61] mr-2 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-[#e0f7fa] text-sm">
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
                      className="text-[#e0f7fa] hover:text-[#ff6f61] relative text-sm"
                    >
                      +91 73388 80027
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                    <a
                      href="tel:+919884001597"
                      className="text-[#e0f7fa] hover:text-[#ff6f61] relative text-sm"
                    >
                      +91 98840 01597
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
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
                  <div className="flex flex-col">
                    <a
                      href="mailto:projects@gvscontrols.com"
                      className="text-[#e0f7fa] hover:text-[#ff6f61] relative text-sm"
                    >
                      projects@gvscontrols.com
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                    <a
                      href="mailto:services@gvscontrols.com"
                      className="text-[#e0f7fa] hover:text-[#ff6f61] relative text-sm"
                    >
                      services@gvscontrols.com
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                    <a
                      href="mailto:gvscontrols@gmail.com"
                      className="text-[#e0f7fa] hover:text-[#ff6f61] relative text-sm"
                    >
                      gvscontrols@gmail.com
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-[#ff6f61]"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;