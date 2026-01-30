import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp, FaFilePdf, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import TypewriterEffectSmoothDemo from "../../components/ui/typewriter-effect-demo-1";
import { TextRoll } from "../../components/ui/text-roll";
import ContactModal from "../ContactModal";
import { useNavigate } from "react-router-dom";
import { FloatingButton, FloatingButtonItem } from "../../components/ui/floating-button";
import { cn } from "../../lib/utils";

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
  const navigate = useNavigate();

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0, x: 0, y: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      x: 0,
      y: -(60 + 70 * i),
      transition: {
        scale: { duration: 0 }, // Instant scale
        opacity: { duration: 0 }, // Instant opacity
        y: { type: "spring", stiffness: 140, damping: 12, duration: 0.3 }, // Smooth vertical movement
      },
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
        action: () => window.open("/catalogue/gvs-controls-com.pdf", "_blank"),
      },
      {
        id: "call",
        icon: "Phone",
        text: "Call",
        action: () => (window.location.href = "tel:+919884001597"),
      },
      {
        id: "whatsapp",
        icon: "WhatsApp",
        text: "WhatsApp",
        action: () =>
          window.open(
            "https://wa.me/917338880027?text=Hello%20GVS%20Controls,%20I%20have%20an%20inquiry.",
            "_blank"
          ),
      },
    ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-teal-400 to-purple-500 dark:from-indigo-900 dark:via-teal-800 dark:to-purple-900 pt-32 sm:pt-36 lg:pt-48 pb-16 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-teal-500/10 to-blue-500/10"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
            type: "tween"
          }}
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }}
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center z-10">
        <div className="text-center max-w-5xl">
          <div className="relative z-10">
            <h1 className="mb-4">
              <span className="sr-only">Industrial Electrical & Automation Solutions - </span>
              <span style={{ color: "#ff0000" }}>
                <TextRoll
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight break-words"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  duration={0.3}
                  getEnterDelay={(i) => i * 0.05}
                  getExitDelay={(i) => i * 0.05 + 0.1}
                >
                  GVS CONTROLS
                </TextRoll>
              </span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              <TypewriterEffectSmoothDemo />
            </div>

              <p
                className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-3 italic mt-6 break-words px-2"
                style={{ color: "#ffffff", textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)" }}
              >
                <span style={{
                  color: "#FFD700", // Gold instead of bright yellow
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(255, 215, 0, 0.6)",
                  fontWeight: "700"
                }}>Consultant</span>, <span style={{
                  color: "#FF3333", // Darker red
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(255, 51, 51, 0.6)",
                  fontWeight: "700"
                }}>Engineering</span>, <span style={{
                  color: "#00FF00", // Standard Green
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 255, 0, 0.6)",
                  fontWeight: "700"
                }}>Manufacturing</span> <span style={{
                  color: "#ffffff",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(255, 255, 255, 0.6)",
                  fontWeight: "600"
                }}>(Supply & Services)</span>
              </p>

              <p className="text-xl sm:text-2xl lg:text-3xl font-bold italic mb-8">
                <span
                  style={{
                    color: "#FFA500", // Orange
                    textShadow:
                      "0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(255, 165, 0, 0.6)",
                    fontWeight: "700",
                  }}
                >
                  Electrical,{" "}
                </span>

                {/* ---- UPDATED INSTRUMENTATION SPAN ---- */}
                <span
                  style={{
                    color: "#FFD700", // Gold
                    textShadow:
                      "0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(255,215,0,0.6)", 
                    fontWeight: "700",
                  }}
                >
                  Instrumentation
                </span>
                {" "}&{" "}
                <span
                  style={{
                    color: "#00FFFF", // Cyan
                    textShadow:
                      "0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 255, 255, 0.6)",
                    fontWeight: "700",
                  }}
                >
                  Automation
                </span>
              </p>

            <motion.button
              onClick={() => navigate("/services")}
              className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white font-semibold shadow-md hover:from-[#4a0e78] hover:to-[#ff6f61] transition-all duration-300 text-base sm:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
              }}
              aria-label="Explore Services"
            >
              Explore Services
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingButton
        isOpen={isButtonsOpen}
        onOpenChange={setIsButtonsOpen}
        triggerContent={
          <motion.button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white shadow-lg ring-1 ring-white/30 hover:ring-white/50 hover:bg-gradient-to-r hover:from-[#4a0e78] hover:to-[#ff6f61] transition-all duration-300"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 111, 97, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden"
            }}
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
        }>
        {buttons.map((button, idx) => {
          const Icon = iconMap[button.icon];
          const tooltipColors = {
            Mail: "bg-gradient-to-br from-orange-400 to-yellow-400",
            BookOpen: "bg-gradient-to-br from-red-500 to-pink-500",
            Phone: "bg-gradient-to-br from-blue-500 to-cyan-500",
            WhatsApp: "bg-gradient-to-br from-green-500 to-emerald-500"
          };
          return (
            <FloatingButtonItem key={`${button.id}-${idx}`}>
              <motion.button
                onClick={button.action}
                aria-label={button.text}
                className="group relative flex items-center justify-center w-14 h-14 rounded-full glassmorphism transition-transform duration-300 hover:scale-110 focus:outline-none"
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon size={24} />
                <span className="sr-only">{button.text}</span>
                <span className={cn(
                  "absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md text-white text-xs opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg",
                  tooltipColors[button.icon]
                )}>
                  {button.text}
                </span>
              </motion.button>
            </FloatingButtonItem>
          );
        })}
      </FloatingButton>

      <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default Hero;