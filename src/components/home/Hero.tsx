import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp, FaFilePdf, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import TypewriterEffectSmoothDemo from "../../components/ui/typewriter-effect-demo-1";
import { TextRoll } from "../../components/ui/text-roll";
import ContactModal from "../ContactModal";

// 1. Define allowed icon keys
type IconKey = "Mail" | "BookOpen" | "Phone" | "WhatsApp";

// 2. Define iconMap with proper typing
const iconMap: Record<IconKey, ({ size }: { size?: number }) => JSX.Element> = {
  Mail: ({ size = 24 }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg">
      <FaEnvelope size={size} color="#fff" />
    </span>
  ),
  BookOpen: ({ size = 24 }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-lg">
      <FaFilePdf size={size} color="#fff" />
    </span>
  ),
  Phone: ({ size = 24 }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
      <FaPhoneAlt size={size} color="#fff" />
    </span>
  ),
  WhatsApp: ({ size = 24 }) => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
      <FaWhatsapp size={size} color="#fff" />
    </span>
  ),
};

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonsOpen, setIsButtonsOpen] = useState(false);

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0, x: 0, y: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      x: 0,
      y: -(60 + 70 * i),
      transition: { delay: i * 0.05, duration: 0.3, type: "spring", stiffness: 140, damping: 12 },
    }),
    exit: { scale: 0, opacity: 0, x: 0, y: 0, transition: { duration: 0.15 } },
  };

  // 3. Strongly typed buttons array
  const buttons: {
    id: string;
    icon: IconKey;
    text: string;
    action: () => void;
  }[] = [
    {
      id: "inquiry",
      icon: "Mail",
      text: "Send Inquiry",
      action: () => setIsModalOpen(true),
    },
    {
      id: "catalogue",
      icon: "BookOpen",
      text: "Catalogue",
      action: () => window.open("/catalogue/gvs_catalogue.pdf", "_blank"),
    },
    {
      id: "call",
      icon: "Phone",
      text: "Call",
      action: () => (window.location.href = "tel:+919087772798"),
    },
    {
      id: "whatsapp",
      icon: "WhatsApp",
      text: "WhatsApp",
      action: () =>
        window.open(
          "https://wa.me/919087772798?text=Hello%20GVS%20Controls,%20I%20have%20an%20inquiry.",
          "_blank"
        ),
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-teal-400 to-purple-500 dark:from-indigo-900 dark:via-teal-800 dark:to-purple-900 pt-24 sm:pt-32 lg:pt-40 pb-16 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-teal-500/10 to-blue-500/10"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </div>

      {/* Decorative Parallelograms */}
      <div
        className="absolute hidden sm:block"
        style={{
          top: "200px",
          left: "0",
          width: "150px",
          height: "250px",
          backgroundColor: "#0046ad",
          transform: "skewX(-325deg)",
          transformOrigin: "top left",
          boxShadow: "20px 20px 50px rgba(0,0,0,0.3)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute hidden sm:block"
        style={{
          top: "150px",
          left: "140px",
          width: "150px",
          height: "250px",
          backgroundColor: "#7fc6a4",
          transform: "skewX(-145deg)",
          transformOrigin: "top left",
          boxShadow: "20px 20px 50px rgba(0,0,0,0.3)",
          opacity: 0.7,
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-center z-10">
        <div className="text-center max-w-3xl">
          <div className="relative z-10">
            <h1 className="mb-4">
              <span style={{ color: "#ff0000" }}>
                <TextRoll
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  duration={0.3}
                  getEnterDelay={(i) => i * 0.05}
                  getExitDelay={(i) => i * 0.05 + 0.1}
                >
                  GVS CONTROLS
                </TextRoll>
              </span>
            </h1>

            <div className="text-lg sm:text-xl lg:text-2xl">
              <TypewriterEffectSmoothDemo />
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-3 italic mt-4" style={{ color: "#00bfff" }}>
              Consultant, Engineering, Manufacturing, Supply & Services
            </p>

            <p className="text-lg sm:text-xl lg:text-2xl font-bold italic mb-6" style={{ color: "#8b0000" }}>
              Electrical & Automation
            </p>

            <motion.button
              onClick={() => setIsButtonsOpen(true)}
              className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white font-semibold shadow-md hover:from-[#4a0e78] hover:to-[#ff6f61] transition-all duration-300 text-base sm:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Inquiry
            </motion.button>
          </div>
        </div>
      </div>

      {/* Toggle Button for Action Icons */}
      <motion.button
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white shadow-lg z-50 border border-[rgba(255,255,255,0.5)] hover:bg-gradient-to-r hover:from-[#4a0e78] hover:to-[#ff6f61] transition-all duration-300"
        onClick={() => setIsButtonsOpen(!isButtonsOpen)}
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 111, 97, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        aria-label={isButtonsOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          animate={{ rotate: isButtonsOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <ArrowRight size={24} color="#ffffff" />
        </motion.div>
      </motion.button>

      {/* Animated Buttons */}
      <AnimatePresence>
        {isButtonsOpen && (
          <div className="fixed bottom-24 right-20 z-50">
            {buttons.map((button, idx) => {
              const Icon = iconMap[button.icon];
              return (
                <motion.button
                  key={button.id}
                  custom={idx}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={button.action}
                  aria-label={button.text}
                  className="group relative flex items-center justify-center w-14 h-14 rounded-full glassmorphism transition-transform duration-300 hover:scale-110 focus:outline-none"
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                  style={{ position: "absolute" }}
                >
                  <Icon size={24} />
                  <span className="sr-only">{button.text}</span>
                  <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-black/80 text-white text-xs opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {button.text}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default Hero;
