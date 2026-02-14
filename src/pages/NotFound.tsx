import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-teal-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -150, 0], y: [0, 150, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="text-center relative z-10 px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-white mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
