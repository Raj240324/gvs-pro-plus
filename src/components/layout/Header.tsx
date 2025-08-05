import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";
import ContactModal from "../../components/ContactModal";
import { useContactModal } from "../../hooks/use-contact-modal";
import { cn } from "../../lib/utils";
import { SiX } from "react-icons/si";

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

const AnimatedMenuButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="lg:hidden text-[#4a0e78] hover:text-[#ff6f61] p-2 rounded-full hover:bg-white/20 transition-all duration-300"
    aria-label={open ? "Close menu" : "Open menu"}
    initial={false}
    animate={open ? "open" : "closed"}
    whileTap={{ scale: 0.9 }}
    style={{ outline: "none", border: "none", background: "none" }}
  >
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
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

const TopContactBar = () => (
  <div className="hidden lg:block bg-gradient-to-r from-white/80 via-[#f8fafc]/80 to-white/80 dark:from-black/40 dark:via-[#23272f]/60 dark:to-black/40 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-sm relative">
    <div className="container mx-auto px-8 flex items-center justify-between h-14 text-sm font-inter text-[#2d2250] dark:text-white/90 relative">
      <div className="flex items-center gap-3 pr-6 border-r border-[#e0e0e0] dark:border-[#333] z-10">
        <span className="font-semibold text-xs text-[#4a0e78] dark:text-white/80 mr-2 tracking-wide">Follow</span>
        <motion.a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group focus:outline-none bg-transparent p-0 border-0 inline-flex items-center justify-center"
          aria-label="Facebook"
          style={{ background: "none", border: "none" }}
        >
          <motion.span
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#1877F3]/90 to-[#3b5998]/80 shadow-md transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.18, rotate: -8, boxShadow: "0 4px 16px #1877f355" }}
            whileTap={{ scale: 0.95 }}
          >
            <Facebook size={20} className="text-white group-hover:text-[#ffd700] transition" />
          </motion.span>
        </motion.a>
        <motion.a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group focus:outline-none bg-transparent p-0 border-0 inline-flex items-center justify-center"
          aria-label="X (Twitter)"
          style={{ background: "none", border: "none" }}
        >
          <motion.span
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#000000]/90 to-[#23272f]/80 shadow-md transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.18, rotate: 8, boxShadow: "0 4px 16px #00000033" }}
            whileTap={{ scale: 0.95 }}
          >
            <SiX size={20} className="text-white group-hover:text-[#ffd700] transition" />
          </motion.span>
        </motion.a>
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group focus:outline-none bg-transparent p-0 border-0 inline-flex items-center justify-center"
          aria-label="Instagram"
          style={{ background: "none", border: "none" }}
        >
          <motion.span
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#E4405F]/90 via-[#fd1d1d]/80 to-[#fcb045]/80 shadow-md transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.18, rotate: -8, boxShadow: "0 4px 16px #E4405F55" }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={20} className="text-white group-hover:text-[#ffd700] transition" />
          </motion.span>
        </motion.a>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full pointer-events-none">
        <span className="flex flex-col items-center text-xs font-bold tracking-wide text-[#4a0e78] dark:text-white/90 px-6 py-2 rounded-full bg-white/70 dark:bg-black/40 shadow border border-white/30 dark:border-white/10 backdrop-blur-md drop-shadow-sm uppercase pointer-events-auto">
        Consultant, Engineering, Manufacturing (Supply & Services)
        <span>Electrical & Automation</span>
        </span>
      </div>
      <div className="flex items-center gap-2 pl-4 border-l border-[#e0e0e0] dark:border-[#333] z-10 min-w-0">
        <div className="flex flex-col gap-1">
          <motion.a
            href="mailto:projects@gvscontrols.com"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-[#fff7e6] to-[#ffe0e0] dark:from-[#2a2a40] dark:to-[#3a2a3a] shadow-sm font-semibold text-[#4a0e78] dark:text-[#ffd700] text-xs group relative overflow-hidden whitespace-nowrap min-w-0"
            whileHover={{ scale: 1.04, boxShadow: "0 2px 8px #ff6f6133" }}
            whileTap={{ scale: 0.97 }}
            aria-label="Email us at projects@gvscontrols.com"
            style={{ maxWidth: 180 }}
          >
            <motion.span
              className="flex items-center justify-center"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Mail size={14} className="text-[#ff6f61] group-hover:scale-110 transition-transform duration-300" />
            </motion.span>
            <span className="ml-0.5 truncate group-hover:text-[#ff6f61] transition">projects@gvscontrols.com</span>
          </motion.a>
          <motion.a
            href="mailto:gvscontrols@gmail.com"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-[#fff7e6] to-[#ffe0e0] dark:from-[#2a2a40] dark:to-[#3a2a3a] shadow-sm font-semibold text-[#4a0e78] dark:text-[#ffd700] text-xs group relative overflow-hidden whitespace-nowrap min-w-0"
            whileHover={{ scale: 1.04, boxShadow: "0 2px 8px #ff6f6133" }}
            whileTap={{ scale: 0.97 }}
            aria-label="Email us at gvscontrols@gmail.com"
            style={{ maxWidth: 180 }}
          >
            <motion.span
              className="flex items-center justify-center"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Mail size={14} className="text-[#ff6f61] group-hover:scale-110 transition-transform duration-300" />
            </motion.span>
            <span className="ml-0.5 truncate group-hover:text-[#ff6f61] transition">gvscontrols@gmail.com</span>
          </motion.a>
        </div>
        <span className="w-1 h-1 rounded-full bg-[#4a0e78]/30 dark:bg-white/30 mx-1" />
        <motion.a
          href="tel:+919958611814"
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-[#e6fff7] to-[#e0f7ff] dark:from-[#2a403a] dark:to-[#2a3a3a] shadow-sm font-semibold text-[#4a0e78] dark:text-[#ffd700] text-xs group relative overflow-hidden whitespace-nowrap min-w-0"
          whileHover={{ scale: 1.04, boxShadow: "0 2px 8px #4a0e7833" }}
          whileTap={{ scale: 0.97 }}
          aria-label="Call us at +91 9958611814"
          style={{ maxWidth: 140 }}
        >
          <motion.span
            className="flex items-center justify-center"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          >
            <Phone size={14} className="text-[#4a0e78] group-hover:scale-110 transition-transform duration-300" />
          </motion.span>
          <span className="ml-0.5 truncate group-hover:text-[#4a0e78] transition">+91 9884001597</span>
        </motion.a>
      </div>
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

  // Apply blur to body when contact modal is open
  useEffect(() => {
    if (contactModal.isOpen) {
      document.body.classList.add("modal-blur", "modal-open");
    } else {
      document.body.classList.remove("modal-blur", "modal-open");
    }
    return () => {
      document.body.classList.remove("modal-blur", "modal-open");
    };
  }, [contactModal.isOpen]);

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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between min-h-[60px]">
            <div className="flex items-center shrink-0">
              <NavLink to="/" className="flex items-center gap-3" onClick={handleNavClick}>
                <img
                  src="/logo.png"
                  alt="GVS Controls Logo"
                  className="h-12 w-auto max-w-[150px] transition-transform hover:scale-105"
                />
                <div className="hidden lg:flex flex-col">
                  <span className="text-[#ff0000] font-bold text-lg">GVS CONTROLS</span>
                  <span className="text-[#ffbf00] font-medium italic">Our Vision To Your Solution</span>
                </div>
              </NavLink>
            </div>
            <div className="flex-1 flex justify-center items-center lg:hidden">
              <div className="text-center">
                <span className="block text-[#ff0000] font-bold text-xl">GVS CONTROLS</span>
                <span className="block text-[#ffbf00] font-medium italic">Our Vision To Your Solution</span>
              </div>
            </div>
            <AnimatedMenuButton open={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
            <div className="hidden lg:flex items-center justify-end w-full lg:w-auto mt-2 lg:mt-0">
              <nav className="flex items-center">
                <div className="flex items-center gap-1 bg-white/20 border border-white/30 rounded-full py-1 px-2">
                  <motion.div
                    onMouseLeave={() => setHovered(null)}
                    className="flex items-center justify-center"
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
                            "relative px-3 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap",
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
              <Button
                variant="gradient"
                size="sm"
                className="ml-4 bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white hover:from-[#ff6f61] hover:to-[#4a0e78] hover:bg-gradient-to-l transition-all duration-300 text-sm px-4 py-1.5 rounded-full whitespace-nowrap shrink-0 border-none outline-none ring-0 focus:ring-0 focus:outline-none active:ring-0 no-pseudo-border z-[10000]"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Get in Touch button clicked, opening modal');
                  contactModal.onOpen();
                }}
              >
                Get in Touch
              </Button>
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
              onClick={() => setMobileMenuOpen(false)}
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
                    src="/logo.png"
                    alt="GVS Controls Logo"
                    className="h-8 w-auto mb-1.5 rounded-lg shadow-md bg-white/80"
                  />
                  <span className="text-[#ff0000] font-bold text-[16px] leading-tight">GVS Controls</span>
                  <span className="text-[#ffbf00] text-xs font-medium mb-1.5 leading-tight">
                    Our Vision To Your Solution
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
                      href="tel:+919958611814"
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
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4a0e78] hover:text-[#ff6f61] transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={16} />
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4a0e78] hover:text-[#ff6f61] transition-colors"
                      aria-label="X"
                    >
                      <SiX size={16} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4a0e78] hover:text-[#ff6f61] transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={16} />
                    </a>
                  </div>
                </div>
                <div className="px-4 pt-2 pb-4 border-t border-[#4ecdc4]/20 bg-white/60 backdrop-blur-xl sticky bottom-0 z-10">
                  <Button
                    variant="gradient"
                    className="w-full bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white hover:from-[#ff6f61] hover:to-[#4a0e78] hover:bg-gradient-to-l transition-all duration-300 rounded-lg py-2 text-[15px] font-semibold shadow-lg no-pseudo-border z-[10000]"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Contact Us button clicked, opening modal');
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