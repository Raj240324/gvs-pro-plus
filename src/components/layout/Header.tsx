import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Phone, Mail, Linkedin, Home, Info, Briefcase, Factory, FolderKanban, Users, Star, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";
import ContactModal from "../../components/ContactModal";
import { useContactModal } from "../../hooks/use-contact-modal";
import { cn } from "../../lib/utils";

// Utility function to debounce scroll events
function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

type XIconProps = {
  size?: number;
  className?: string;
};

const XIcon = ({ size = 20, className = "" }: XIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(className, "text-[#4a0e78] dark:text-white")}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const AnimatedMenuButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
  const touchHandled = useRef(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent double-firing on mobile (touch + click)
    if (touchHandled.current) {
      touchHandled.current = false;
      return;
    }
    e.stopPropagation();
    onClick();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    touchHandled.current = true;
    e.stopPropagation();
    onClick();
    // Reset after a short delay to allow click event if needed
    setTimeout(() => {
      touchHandled.current = false;
    }, 300);
  };

  return (
    <motion.button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="lg:hidden text-[#4a0e78] hover:text-[#ff6f61] p-2 rounded-full hover:bg-white/20 transition-all duration-300 relative z-[2001] touch-manipulation"
      aria-label={open ? "Close menu" : "Open menu"}
      initial={false}
      animate={open ? "open" : "closed"}
      whileTap={{ scale: 0.95 }}
      style={{
        outline: "none",
        border: "none",
        background: "none",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        WebkitUserSelect: "none",
        cursor: "pointer",
        position: "relative",
        zIndex: 2001
      }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block pointer-events-none"
        style={{ pointerEvents: "none" }}
      >
        <motion.rect
          x="6"
          y="10"
          width="20"
          height="2.5"
          rx="1.25"
          animate={open ? { rotate: 45, y: 11, x: 6 } : { rotate: 0, y: 10, x: 6 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          fill="currentColor"
        />
        <motion.rect
          x="6"
          y="19.5"
          width="20"
          height="2.5"
          rx="1.25"
          animate={open ? { rotate: -45, y: 11, x: 6 } : { rotate: 0, y: 19.5, x: 6 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          fill="currentColor"
        />
      </motion.svg>
    </motion.button>
  );
};

const TopContactBar = () => (
  <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] h-11 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800 relative z-50 items-center px-6 lg:px-12 transition-colors duration-300">
    {/* Left: Socials */}
    <div className="flex items-center gap-4 justify-self-start">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Follow Us</span>
        <motion.a
          href="https://www.linkedin.com/company/gvs-controls"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
        >
          <Linkedin size={14} strokeWidth={2} />
        </motion.a>
      </div>
    </div>

    {/* Center: Expertise Ticker */}
    <div className="hidden xl:flex items-center justify-center pointer-events-none justify-self-center">
      <div className="px-4 py-1 rounded-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 flex items-center gap-2 shadow-sm whitespace-nowrap pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-wide uppercase">
          Consultant • Engineering • Manufacturing
        </span>
        <div className="w-[1px] h-3 bg-slate-300 dark:bg-slate-600" />
        <span className="text-[11px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 uppercase tracking-wide">
          Electrical, Instrumentation & Automation
        </span>
      </div>
    </div>

    {/* Right: Contact Hub */}
    <div className="flex items-center gap-6 justify-self-end">
      <motion.a 
        href="mailto:projects@gvscontrols.com" 
        className="flex items-center gap-2 group"
        whileHover={{ y: -1 }}
      >
        <div className="p-1.5 rounded-md bg-orange-50 dark:bg-orange-900/20 text-orange-500 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
          <Mail size={12} strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          projects@gvscontrols.com
        </span>
      </motion.a>

      <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

      <motion.a 
        href="tel:+917338880027" 
        className="flex items-center gap-2 group"
        whileHover={{ y: -1 }}
      >
        <div className="p-1.5 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
          <Phone size={12} strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          +91 7338880027
        </span>
      </motion.a>
    </div>
  </div>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const contactModal = useContactModal();
  const prevScrollY = useRef(0);
  const [hovered, setHovered] = useState<number | null>(null);



  useEffect(() => {
    let lastScrollY = 0;
    let rafId: number;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;

      // Only update if scroll position changed significantly
      if (Math.abs(scrollY - lastScrollY) > 5) {
        setScrolled(scrollY > 20);

        if (scrollY < 20) {
          setIsVisible(true);
        } else {
          const isScrollingUp = scrollY < lastScrollY;
          setIsVisible(isScrollingUp);
        }
        lastScrollY = scrollY;
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      
      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll");
      window.dispatchEvent(new Event("resize")); // 🔑 Lenis sync
    } else {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
      // Optional: Reset variable after animation
      setTimeout(() => {
        if (!mobileMenuOpen) {
          document.documentElement.style.setProperty('--scrollbar-width', '0px');
        }
      }, 300);
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    };
  }, [mobileMenuOpen]);


  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Manufacturing & Supply", path: "/manufacturing-supply", icon: Factory },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Clients", path: "/clients", icon: Users },
    { name: "Why Us", path: "/why-us", icon: Star },
    { name: "Gallery", path: "/gallery", icon: ImageIcon },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  // Close mobile menu when the path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const headerVariants = {
    visible: { y: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
    hidden: { y: -100, opacity: 0, transition: { type: "tween", ease: "easeIn", duration: 0.3 } },
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      scale: 0.95,
      y: -20,
      transition: { 
        duration: 0.2, 
        ease: [0.4, 0, 1, 1] 
      } 
    },
    open: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      } 
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, y: 10, filter: "blur(4px)" },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        delay: 0.1 + i * 0.04, 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      },
    }),
  };

  const backdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.2 } },
  open: { opacity: 0.7, transition: { duration: 0.2 } },
};


  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        className={cn(
          "fixed top-0 left-0 w-full z-[1000] will-change-transform",
          scrolled
            ? "bg-gradient-to-r from-[#b2ff8b] via-[#4ecdc4] to-[#2a9d8f] shadow-md"
            : "bg-gradient-to-r from-[#b2ff8b]/90 via-[#4ecdc4]/90 to-[#2a9d8f]/90"
        )}
      >
        <TopContactBar />
        <div className="container mx-auto px-2 sm:px-4 lg:px-4 py-3">
          <div className="flex items-center justify-between min-h-[60px] relative">
            <div className="flex items-center gap-1 lg:gap-1.5 xl:gap-3 2xl:gap-8 flex-1">
              <div className="flex items-center shrink-0">
                <NavLink to="/" className="flex items-center gap-1.5" onClick={handleNavClick}>
                  <img
                    src="/gvs-logo.png"
                    alt="GVS Controls Logo"
                    className="h-10 xl:h-12 w-auto transition-transform hover:scale-105"
                    width="150"
                    height="50"
                  />
                  <div className="hidden xl:flex flex-col ml-2">
                    <span className="text-[#ff0000] font-bold text-sm 2xl:text-lg leading-tight">GVS CONTROLS</span>
                    <span className="text-[#ffbf00] font-medium italic text-[10px] 2xl:text-xs leading-tight">(Our Vision To Your Solution)</span>
                  </div>
                </NavLink>
              </div>

              <nav className="hidden lg:flex items-center flex-1 px-1 xl:px-4">
                <div className="flex items-center w-full justify-between bg-white/20 border border-white/30 rounded-full py-1.5 px-3 xl:px-4 shadow-sm backdrop-blur-sm">
                  <motion.div
                    onMouseLeave={() => setHovered(null)}
                    className="flex items-center justify-between w-full gap-0.5 xl:gap-1 2xl:gap-4"
                  >
                    {navLinks.map((link, idx) => (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        end
                        onMouseEnter={() => setHovered(idx)}
                        className={({ isActive }) =>
                          cn(
                            "relative px-1.5 xl:px-2.5 2xl:px-6 py-2 text-[11px] xl:text-xs 2xl:text-sm font-bold rounded-full transition-colors whitespace-nowrap",
                            isActive
                              ? "text-[#ff6f61]"
                              : "text-[#4a0e78] hover:text-[#ff6f61]"
                          )
                        }
                      >
                        {hovered === idx && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-[#ff6b6b]/40 via-[#ffd93d]/40 to-[#ff8e53]/40"
                            transition={{
                              duration: 0.2,
                              ease: "easeInOut"
                            }}
                          >
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-t-full">
                              <div className="absolute w-12 h-6 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 rounded-full blur-md -top-2 -left-2" />
                              <div className="absolute w-8 h-6 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 rounded-full blur-md -top-1" />
                              <div className="absolute w-4 h-4 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 rounded-full blur-sm top-0 left-2" />
                            </div>
                          </motion.div>
                        )}
                        <span className="relative z-20">{link.name}</span>
                      </NavLink>
                    ))}
                  </motion.div>
                </div>
              </nav>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden pointer-events-none">
              <div className="text-center pointer-events-auto">
                <span className="block text-[#ff0000] font-bold text-lg sm:text-2xl md:text-3xl leading-tight whitespace-nowrap">GVS CONTROLS</span>
                <span className="block text-[#ffbf00] font-medium italic text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap">(Our Vision To Your Solution)</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative z-[2001] lg:hidden">
                <AnimatedMenuButton
                  open={mobileMenuOpen}
                  onClick={() => {
                    setMobileMenuOpen(prev => !prev);
                  }}
                />
              </div>

              <div className="hidden lg:block">
                <Button
                  variant="gradient"
                  size="sm"
                  className="bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white hover:from-[#ff6f61] hover:to-[#4a0e78] hover:bg-gradient-to-l transition-all duration-300 text-[11px] xl:text-xs 2xl:text-sm px-3 xl:px-4 2xl:px-8 py-2 xl:py-2.5 rounded-full whitespace-nowrap shrink-0 border-none outline-none ring-0 focus:ring-0 focus:outline-none active:ring-0 no-pseudo-border z-[10000]"
                  onClick={(e) => {
                    e.stopPropagation();
                    contactModal.onOpen();
                  }}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md z-[1999]"
              onClick={() => setMobileMenuOpen(false)}
              style={{ willChange: "opacity" }}
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed inset-4 z-[2000] flex flex-col bg-white/95 dark:bg-slate-900/95 rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Close Button Area */}
              <div className="flex items-center justify-between px-6 py-4 shrink-0">
                 <div className="flex flex-col">
                    <span className="text-[#ff0000] font-bold text-xl tracking-tight leading-tight">GVS CONTROLS</span>
                    <span className="text-[#ffbf00] text-[10px] font-medium italic leading-tight">(Our Vision To Your Solution)</span>
                 </div>
                 <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                 >
                    <XIcon size={24} />
                 </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col justify-center px-8 relative">
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      variants={navItemVariants}
                      custom={index}
                    >
                      <NavLink
                        to={link.path}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-4 text-xl font-bold tracking-tight transition-all duration-200 active:scale-95 touch-manipulation",
                            isActive
                              ? "text-[#ff6f61]"
                              : "text-[#4a0e78] hover:text-[#ff6f61] dark:text-white dark:hover:text-[#ff6f61]"
                          )
                        }
                      >
                        <link.icon className="pointer-events-none" size={22} strokeWidth={2} />
                        <span className="pointer-events-none">{link.name}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Footer / Contact Actions */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 0.4 }}
                 className="p-6 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50"
              >
                  <Button
                    variant="gradient"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-lg font-semibold shadow-lg shadow-blue-500/20 mb-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileMenuOpen(false);
                      setTimeout(() => contactModal.onOpen(), 300);
                    }}
                  >
                    Get in Touch
                  </Button>

                  <div className="flex flex-wrap gap-4 justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                     <div className="flex flex-col gap-2">
                        <a href="tel:+917338880027" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                           <Phone size={16} /> +91 7338880027
                        </a>
                        <a href="mailto:projects@gvscontrols.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                           <Mail size={16} /> projects@gvscontrols.com
                        </a>
                     </div>
                     <a
                       href="https://www.linkedin.com/company/gvs-controls"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                     >
                       <Linkedin size={20} />
                     </a>
                  </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactModal open={contactModal.isOpen} onOpenChange={contactModal.onToggle} />
    </>
  );
};

export default Header;