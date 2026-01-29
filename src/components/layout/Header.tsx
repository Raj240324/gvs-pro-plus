import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Phone, Mail, Linkedin } from "lucide-react";
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
  <div className="hidden lg:flex h-11 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800 relative z-50 items-center justify-between px-6 lg:px-12 transition-colors duration-300">
    {/* Left: Socials */}
    <div className="flex items-center gap-4">
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
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:flex items-center justify-center pointer-events-none">
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
    <div className="flex items-center gap-6">
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



  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < 50 || currentScrollY < prevScrollY.current);
      prevScrollY.current = currentScrollY;
    }, 50),
    []
  );

  useEffect(() => {
    prevScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Manufacturing & Supply", path: "/manufacturing-supply" },
    { name: "Projects", path: "/projects" },
    { name: "Clients", path: "/clients" },
    { name: "Why Us", path: "/why-us" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const headerVariants = {
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 40, mass: 0.5 } },
    hidden: { y: -100, opacity: 0, transition: { type: "spring", stiffness: 500, damping: 40, mass: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 40 } },
  };

  const navItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 },
    }),
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 0.7 },
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
                        onClick={handleNavClick}
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
                            layoutId="hovered"
                            className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-[#ff6b6b]/40 via-[#ffd93d]/40 to-[#ff8e53]/40"
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 25,
                              mass: 0.5
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
                <span className="block text-[#ff0000] font-bold text-base sm:text-lg leading-tight">GVS CONTROLS</span>
                <span className="block text-[#ffbf00] font-medium italic text-xs sm:text-sm leading-tight">(Our Vision To Your Solution)</span>
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
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed inset-0 bg-black/70 z-[1999]"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed top-0 right-0 w-[90vw] max-w-[360px] h-[100dvh] z-[2000]"
              style={{
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
                paddingLeft: "env(safe-area-inset-left)",
                paddingRight: "env(safe-area-inset-right)",
              }}
            >
              <div className="relative flex flex-col w-full h-full bg-gradient-to-br from-white/95 via-[#f8fafc]/95 to-[#e9ecef]/95 shadow-2xl rounded-l-3xl border border-[#4ecdc4]/30 backdrop-blur-2xl overflow-hidden">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-white shadow border border-[#4ecdc4]/30 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
                  initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 90 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  <XIcon size={22} />
                </motion.button>
                <div className="flex flex-col items-center pt-4 pb-2 px-4 shrink-0">
                  <img
                    src="/gvs-logo.png"
                    alt="GVS Controls Logo"
                    className="h-8 w-auto mb-1.5 rounded-lg shadow-md bg-white/80"
                    width="100"
                    height="32"
                  />
                  <span className="text-[#ff0000] font-bold text-[16px] leading-tight">GVS Controls</span>
                  <span className="text-[#ffbf00] text-xs font-medium mb-1.5 leading-tight">
                    (Our Vision To Your Solution)
                  </span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
                  <nav className="flex flex-col gap-1 mt-2 mb-3">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        custom={index}
                        variants={navItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        whileTap={{ scale: 0.95 }}
                        style={{ willChange: "transform, opacity" }}
                      >
                        <NavLink
                          to={link.path}
                          end
                          onClick={handleNavClick}
                          className={({ isActive }) =>
                            cn(
                              "block text-[15px] font-semibold px-3 py-2 rounded-lg transition-all duration-300 text-left shadow-sm hover:scale-[1.02] border-b border-[#4ecdc4]/10",
                              isActive
                                ? "bg-gradient-to-r from-[#ff6f61]/40 to-[#ffd700]/40 text-[#ff6f61] shadow-md"
                                : "text-[#4a0e78] hover:bg-[#4ecdc4]/20 hover:text-[#ff6f61] hover:shadow"
                            )
                          }
                        >
                          {link.name}
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-1 text-[#4a0e78] text-[13px] font-medium mb-3">
                    <a
                      href="tel:+917338880027"
                      className="flex items-center gap-1.5 hover:text-[#ff6f61] transition-colors py-1.5"
                    >
                      <Phone size={14} />
                      +91 7338880027
                    </a>
                    <a
                      href="tel:+919884001597"
                      className="flex items-center gap-1.5 hover:text-[#ff6f61] transition-colors py-1.5"
                    >
                      <Phone size={14} />
                      +91 9884001597
                    </a>
                    <a
                      href="mailto:projects@gvscontrols.com"
                      className="flex items-center gap-1.5 hover:text-[#ff6f61] transition-colors py-1.5"
                    >
                      <Mail size={14} />
                      projects@gvscontrols.com
                    </a>
                    <a
                      href="mailto:gvscontrols@gmail.com"
                      className="flex items-center gap-1.5 hover:text-[#ff6f61] transition-colors py-1.5"
                    >
                      <Mail size={14} />
                      gvscontrols@gmail.com
                    </a>
                  </div>
                  <div className="flex justify-center gap-4 mb-3">
                    <a
                      href="https://www.linkedin.com/company/gvs-controls"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4a0e78] hover:text-[#ff6f61] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
                <div className="px-4 pt-2 pb-4 border-t border-[#4ecdc4]/20 bg-white/60 backdrop-blur-xl sticky bottom-0 z-10">
                  <Button
                    variant="gradient"
                    className="w-full bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white hover:from-[#ff6f61] hover:to-[#4a0e78] hover:bg-gradient-to-l transition-all duration-300 rounded-lg py-2 text-[15px] font-semibold shadow-lg no-pseudo-border z-[10000]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileMenuOpen(false);
                      setTimeout(() => contactModal.onOpen(), 300);
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactModal open={contactModal.isOpen} onOpenChange={contactModal.onToggle} />
    </>
  );
};

export default Header;