import { NavLink, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, ChevronDown, Home, Users, Image, FolderKanban, Handshake, Award, Wrench, Factory, BrainCircuit, Lightbulb, Zap, HardHat, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Link Interface
interface FooterLink {
  to?: string;
  href?: string;
  label: string;
  icon?: LucideIcon;
}

// Section Interface
interface FooterSectionProps {
  title: string;
  links?: FooterLink[];
  children?: React.ReactNode;
}

const FooterSection = ({ title, links, children }: FooterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="border-b border-white/10 md:border-none last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 md:py-0 md:cursor-default group"
        disabled={!isMobile}
      >
        <h3 className="text-sm font-bold text-white tracking-wider uppercase opacity-100">
          {title}
        </h3>
        {isMobile && (
          <ChevronDown 
            size={16} 
            className={`text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
            animate={isMobile ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={isMobile ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 md:pb-0 md:pt-4 flex flex-col gap-2.5">
              {children ? children : links?.map((link) => {
                const Icon = link.icon;
                const content = (
                  <span className="flex items-center gap-2.5 group/link">
                    {Icon && <Icon size={14} className="text-white/50 group-hover/link:text-white transition-colors flex-shrink-0" />}
                    <span>{link.label}</span>
                  </span>
                );
                return link.to ? (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className="text-sm text-gray-200 hover:text-white transition-colors w-fit font-medium tracking-wide"
                  >
                    {content}
                  </NavLink>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 hover:text-white transition-colors w-fit font-medium tracking-wide"
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const quickLinks: FooterLink[] = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About Us', icon: Users },
    { to: '/gallery', label: 'Gallery', icon: Image },
    { to: '/projects', label: 'Projects', icon: FolderKanban },
    { to: '/clients', label: 'Clients', icon: Handshake },
    { to: '/why-us', label: 'Why Us', icon: Award },
  ];

  const serviceLinks: FooterLink[] = [
    { to: '/services', label: 'All Services', icon: Wrench },
    { to: '/manufacturing-supply', label: 'Manufacturing & Supply', icon: Factory },
  ];

  const offeringsLinks: FooterLink[] = [
    { to: '/services#consultancy', label: 'Expert Consultancy', icon: Lightbulb },
    { to: '/services#automation', label: 'Smart Automation', icon: BrainCircuit },
    { to: '/services#turnkey', label: 'Turnkey Projects', icon: Zap },
    { to: '/services#erection', label: 'Erection & Commissioning', icon: HardHat },
  ];

  return (
    <footer className="bg-gradient-to-br from-indigo-600 via-teal-500 to-purple-600 text-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Top Section: Logo & Breadcrumbs style */}
        <div className="mb-12 border-b border-white/20 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <img src="/gvs-logo.png" alt="GVS Logo" className="w-12 h-12 object-contain" />
              <div>
                <h2 className="text-lg font-bold text-[#ff0000] tracking-wide leading-tight">GVS CONTROLS</h2>
                <p className="text-xs text-[#ffbf00] font-medium italic tracking-wide leading-tight">Our Vision To Your Solution</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="mailto:projects@gvscontrols.com" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Mail size={16} />
              </a>
           </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          <FooterSection title="Explore" links={quickLinks} />
          
          <FooterSection title="Services" links={serviceLinks} />

          <FooterSection title="Offerings" links={offeringsLinks} />
          
          <FooterSection title="Contact">
             <div className="flex flex-col gap-3">
               <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 text-white/80" />
                  <p className="text-sm text-gray-200 font-medium leading-relaxed">
                    Plot No.1476, Segundram Main Road,<br/> 
                    Gokulapuram, MaraimalaiNagar,<br/> 
                    Chengalpattu - 603209
                  </p>
               </div>
               <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-white/80" />
                  <div className="text-sm text-gray-200 font-medium flex flex-col gap-1">
                    <a href="tel:+917338880027" className="hover:underline hover:text-white transition-colors">+91 73388 80027</a>
                    <a href="tel:+919884001597" className="hover:underline hover:text-white transition-colors">+91 98840 01597</a>
                  </div>
               </div>
               <div className="flex items-center gap-2.5">
                  <Mail size={16} className="text-white/80" />
                  <a href="mailto:projects@gvscontrols.com" className="text-sm text-gray-200 font-medium hover:underline hover:text-white transition-colors">
                    projects@gvscontrols.com
                  </a>
               </div>
             </div>
          </FooterSection>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/80 font-medium">
          <div className="order-2 md:order-1">
            Copyright © {new Date().getFullYear()} GVS Controls. All rights reserved.
          </div>
          
          <div className="order-1 md:order-2 flex gap-6">
            <NavLink to="/privacy-policy" className="hover:underline hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms-of-service" className="hover:underline hover:text-white transition-colors">Terms of Use</NavLink>
            <span>IE & CEIG Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;