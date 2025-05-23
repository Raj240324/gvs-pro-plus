import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const spinTransition = {
  repeat: Infinity,
  ease: 'linear',
  duration: 1,
};

const Preloader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000); // 3-second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-700 ${
        loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg animate-gradientShift" />

      {/* Spinner and logo */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Spinner */}
        <div className="relative h-20 w-20 mb-6">
          {/* Outer circle */}
          <motion.span
            className="absolute inset-0 rounded-full border-4 border-t-[#22d3ee] border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
          {/* Middle circle */}
          <motion.span
            className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-[#22d3ee] border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ ...spinTransition, duration: 1.5 }}
          />
          {/* Inner circle */}
          <motion.span
            className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-transparent border-b-[#22d3ee] border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ ...spinTransition, duration: 2 }}
          />
          {/* Center dot */}
          <span className="absolute inset-8 rounded-full bg-[#0f172a] dark:bg-white" />
        </div>

        {/* Logo (from public folder) */}
        <img
          src="/logo.png"
          alt="GVS Controls Logo"
          className="w-28 h-28 z-10 mb-4 animate-float"
          style={{ filter: 'drop-shadow(0 2px 16px #22d3ee66)' }}
        />

        {/* Loading text */}
        <span className="mt-2 text-white/80 tracking-widest text-lg font-semibold animate-text-reveal">
          Loading...
        </span>
      </div>

      {/* Inline styles for animation */}
      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0e7490 100%);
          background-size: 400% 400%;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 2.2s ease-in-out infinite;
        }
        .animate-gradientShift {
          animation: gradientShift 12s ease-in-out infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-reveal {
          animation: text-reveal 1.5s ease-out forwards;
        }
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
          50% { opacity: 0.5; transform: translateY(10px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
