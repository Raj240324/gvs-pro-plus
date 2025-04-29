import React, { useState } from "react";
import { motion } from "framer-motion";
import TypewriterEffectSmoothDemo from "../../components/ui/typewriter-effect-demo-1";
import { TextRoll } from "../../components/ui/text-roll";
import ContactModal from "../ContactModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* Blue Parallelogram */}
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

      {/* Green Parallelogram */}
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

      {/* --- Main Content --- */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-center z-10">
        <div className="text-center max-w-3xl">
          <div className="relative z-10">
            {/* Company Name */}
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

            {/* Typewriter */}
            <div className="text-lg sm:text-xl lg:text-2xl">
              <TypewriterEffectSmoothDemo />
            </div>

            {/* Consultant Line */}
            <p
              className="text-lg sm:text-xl lg:text-2xl font-medium mb-3 italic mt-4"
              style={{ color: "#00bfff" }}
            >
              Consultant, Engineering, Manufacturing, Supply & Services
            </p>

            {/* Electrical Automation */}
            <p
              className="text-lg sm:text-xl lg:text-2xl font-bold italic mb-6"
              style={{ color: "#8b0000" }}
            >
              Electrical & Automation
            </p>

            {/* Get in Touch Button */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff6f61] to-[#4a0e78] text-white font-semibold shadow-md hover:from-[#4a0e78] hover:to-[#ff6f61] transition-all duration-300 text-base sm:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default Hero;