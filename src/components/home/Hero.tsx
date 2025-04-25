import { X, ArrowLeft } from "lucide-react";
import { FaWhatsapp, FaFilePdf, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactModal from "../ContactModal";

interface Content {
  title: string;
  badge: string;
  description: string;
  images: string[];
}

interface ImagesSliderProps {
  className?: string;
  images: string[];
  alt: string; // Ensure the alt property is required
}

// Map for brand icons for use in floating button stacks or anywhere matching icons are needed
const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  Mail: ({ size }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg">
      <FaEnvelope size={size} color="#fff" />
    </span>
  ),
  BookOpen: ({ size }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-lg">
      <FaFilePdf size={size} color="#fff" />
    </span>
  ),
  Phone: ({ size }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
      <FaPhoneAlt size={size} color="#fff" />
    </span>
  ),
  WhatsApp: ({ size }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
      <FaWhatsapp size={size} color="#fff" />
    </span>
  ),
};

const ImagesSlider: React.FC<ImagesSliderProps> = ({ className, images, alt }) => {
  return (
    <div className={className + " flex flex-row gap-4 h-full w-full"}>
      {images.map((image, index) => (
        <div key={index} className="flex-1 h-full min-w-0">
          <img
            src={image}
            alt={alt}
            className="object-cover w-full h-full rounded-xl border border-white/10 shadow-lg"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
        </div>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState<number>(0);
  const [expandedButton, setExpandedButton] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  const heroImages = [
    '/public/assets/power_plants.jpg',
    '/public/assets/panel_manufacturing.jpg',
    '/public/assets/automation.jpg',
    '/public/assets/consultant_engineering.jpg',
  ];

  const contents: Content[] = [
    {
      title: "GVS Controls - Powering Industries",
      badge: "Since 2017",
      description:
        "With over 30 years of expertise in EPC projects, we deliver cutting-edge electrical and automation solutions for power plants, renewable energy, steel, cement, and more. Trust us for innovative consultancy, manufacturing, and system integration.",
      images: [
        heroImages[0] // industrial plant
      ],
    },
    {
      title: "Medium Voltage Panels & Control Centers",
      badge: "Precision Manufacturing",
      description:
        "We design and manufacture Medium Voltage Panels, Power Control Centers, and Motor Control Centers for seamless industrial operations. Our panels ensure reliability and efficiency across power plants, cement, and steel industries.",
      images: [
        heroImages[1] // electrical control panel manufacturing
      ],
    },
    {
      title: "Automation & Instrumentation",
      badge: "Smart Solutions",
      description:
        "Our process automation and instrumentation solutions optimize operations in chemical plants, water treatment, and automobile industries. From PLC control panels to field instruments, we deliver tailored automation systems.",
      images: [
        heroImages[2] // automation
      ],
    },
    {
      title: "Turnkey Project Management",
      badge: "End-to-End Execution",
      description:
        "From consultancy to commissioning, we manage turnkey projects with precision. Our services include system design, equipment sizing, installation, and revamping of electrical systems for industries like renewable energy and cooling towers.",
      images: [
        heroImages[3] // project management
      ],
    },
  ];

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setIsLoaded(true), 300);
    const interval = setInterval(() => {
      if (isHeroVisible) {
        setCurrentContent((prev) => (prev + 1) % contents.length);
      }
    }, 8000);

    const heroSection = document.getElementById("hero-section");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0) {
          setIsHeroVisible(entries[0].isIntersecting);
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (heroSection) {
      observer.observe(heroSection);
    } else {
      console.warn("Hero section not found");
    }

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(interval);
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, [isHeroVisible]);

  const current: Content = contents[currentContent];

  const buttons = [
    {
      id: "inquiry",
      href: "/contact",
      icon: "Mail",
      color: "#f28e38",
      hoverColor: "#d67a30",
      text: "Send Inquiry",
      action: () => navigate("/contact"),
    },
    {
      id: "catalogue",
      href: "/catalogue/gvs_catalogue.pdf",
      icon: "BookOpen",
      color: "#f28e38",
      hoverColor: "#d67a30",
      text: "Catalogue",
      action: () => window.open("/catalogue/gvs_catalogue.pdf", "_blank"),
    },
    {
      id: "call",
      href: "tel:+919087772798",
      icon: "Phone",
      color: "#4a4a4a",
      hoverColor: "#333333",
      text: "Call",
      action: () => (window.location.href = "tel:+919087772798"),
    },
    {
      id: "whatsapp",
      href: "https://wa.me/919087772798?text=Hello%20GVS%20Controls,%20I%20have%20an%20inquiry.",
      icon: "WhatsApp",
      color: "#25D366",
      hoverColor: "#1DA851",
      text: "WhatsApp",
      action: () =>
        window.open(
          "https://wa.me/919087772798?text=Hello%20GVS%20Controls,%20I%20have%20an%20inquiry.",
          "_blank"
        ),
    },
  ];

  const expandVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "16rem",
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
  };

  const buttonStackVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 pt-32 lg:pt-40 pb-16 overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-teal-500/10 to-blue-500/10"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row h-full z-10">
        {/* Left Side - Images Slider with Parallax */}
        <motion.div
          className="w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-160px)] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <ImagesSlider
            className="h-full w-full rounded-2xl shadow-2xl object-cover"
            images={current.images}
            alt={`Slide for ${current.title}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
        </motion.div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentContent}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
            >
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white text-sm font-semibold mb-6 shadow-lg"
              >
                {current.badge}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl lg:text-4xl font-extrabold leading-tight mb-6 tracking-tight text-white font-roboto"
              >
                {current.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base lg:text-lg text-gray-200 mb-8 leading-relaxed font-light"
              >
                {current.description}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-sm text-gray-300 mt-6 italic"
              >
                Trusted by SAIL, NTPC, Aditya Birla Group, and more
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Toggleable button stack with arrow icon */}
      <div
        className={`fixed bottom-6 right-0 z-50 transition-opacity duration-300 ${
          isHeroVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Arrow Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsExpanded(!isExpanded);
            }
          }}
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
          className="relative inline-flex items-center justify-center w-12 h-12 rounded-l-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500/50 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={24} />
          </motion.div>
        </motion.button>

        {/* Button Stack */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={buttonStackVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute bottom-20 right-12 flex flex-col gap-3" // Adjusted right to align with button
            >
              {buttons.map((button, idx) => {
                const Icon = iconMap[button.icon];
                const tooltip = button.text;
                return (
                  <motion.button
                    key={button.id}
                    onClick={button.action}
                    aria-label={button.text}
                    className={`relative flex items-center justify-center w-14 h-14 rounded-full glassmorphism transition-transform duration-300 hover:scale-110 focus:outline-none animate-float`}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.92 }}
                    tabIndex={0}
                  >
                    {Icon && <Icon size={28} />}
                    <span className="sr-only">{tooltip}</span>
                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-black/80 text-white text-xs opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {tooltip}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ContactModal open={showModal} onOpenChange={setShowModal} />
    </section>
  );
};

export default Hero;