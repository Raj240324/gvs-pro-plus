"use client";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '../components/ui/canvas-reveal-effect';
import { Factory, Shield, Zap, Wrench } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  color: [number, number, number][];
}

const ProductSection = ({ product, index }: { product: Product; index: number }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 md:py-28 overflow-hidden relative ${
        index % 2 === 0
          ? 'bg-gradient-to-br from-teal-50/60 via-cyan-50/60 to-indigo-50/60'
          : 'bg-gradient-to-bl from-indigo-50/60 via-purple-50/60 to-pink-50/60'
      }`}
    >
      {/* Subtle Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content – Perfect Typography */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`space-y-7 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="flex items-center gap-5">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 shadow-xl"
              >
                {product.icon}
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-indigo-800">
                {product.name}
              </h2>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-start gap-3 p-3.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl hover:bg-white transition-all duration-300"
                >
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-500 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm md:text-base group-hover:text-teal-700 transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Canvas Card – Balanced Size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <HoverCanvasCard product={product} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const HoverCanvasCard = ({ product }: { product: Product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -12 }}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-1">
        <div className="relative z-10 bg-black/95 backdrop-blur-2xl rounded-3xl p-10 text-center">
          <motion.div
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500/20 to-indigo-500/20 backdrop-blur-md flex items-center justify-center border-4 border-white/10"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="p-6 rounded-full bg-gradient-to-br from-teal-400 to-indigo-600 shadow-xl"
            >
              {product.icon}
            </motion.div>
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-3">
            {product.name}
          </h3>
          <p className="text-teal-300 text-base font-medium">
            IE & CEIG Compliant • Premium Quality
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="h-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full mt-6"
          />
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-3xl"
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={product.color}
                dotSize={2}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Floating Particles */}
        {hovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: [-15, -80], opacity: [0.7, 0] }}
                transition={{ duration: 1.8 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
                className="absolute w-2 h-2 bg-teal-400 rounded-full blur-sm"
                style={{ top: "50%", left: `${25 + i * 12}%` }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

const ManufacturingSupply = () => {
  useEffect(() => {
    document.title = 'Manufacturing & Supply - GVS Controls';
  }, []);

  const products: Product[] = [
    {
      id: 'control-panels',
      name: 'Electrical Control Panels',
      description: 'We manufacture Electrical Control Panels as per IE Standard Electrical Inspectorate Rules and Regulation (CEIG) and the Wide Product Range Include:',
      items: [
        'Electrical 415 V Panel with Single (or) Double Bus System',
        'Power Control Centers, Power Distribution Panels, Motor Control Centers & Process Control Panels',
        'EB & DG Synchronizing Control Panels & Auto Transfer Switch Panels',
        'LT Bus Ducts and Sandwich Type Bus Ducts & Raising Main Panels',
        'APFC Panels, AMF Control Panels, Relay Logic & PLC Control Panel',
        'Local Push Button Station, Junction Boxes, Lighting Panels MLDB, LDB, SLDB, and Utility DB’s',
        'VFD Control Panels & Special Purpose and Other Custom Built Panels',
      ],
      icon: <Factory className="w-16 h-16 text-white" />,
      color: [[0, 128, 128], [59, 130, 246]],
    },
    {
      id: 'field-instruments',
      name: 'Supply of Field Instruments',
      description: 'Supply of Field Instruments for Power Plants, Bulk Material Handling System, Chemical Plants, Cooling Towers, Automobile Industries, Process Plants, Cement plants and Renewable energy sectors',
      items: [
        'Safety switches Pull chord and Belt sway – (Schmersal make)',
        'Motion Sensors – (Milltronics)',
        'ZSS-( Pepperl + Fuchs )',
        'Sourcing and Supply of Instruments for Wind Mills and Switches of any Special Requirements',
      ],
      icon: <Shield className="w-16 h-16 text-white" />,
      color: [[138, 43, 226], [236, 72, 153]],
    },
  ];

  return (
    <main className="pt-[84px] lg:pt-[140px] bg-gradient-to-b from-slate-50 via-teal-50 to-indigo-50 min-h-screen">
      {/* Hero – Perfectly Balanced */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-28 md:py-36 bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-25">
          <motion.div
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.25) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%)`
            }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-teal-200 font-semibold text-sm tracking-widest mb-6"
          >
            MANUFACTURING EXCELLENCE
          </motion.span>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-pink-100 mb-6"
          >
            Manufacturing & Supply
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed"
          >
            IE & CEIG compliant panels • Precision field instruments • Engineered for reliability
          </motion.p>
        </div>
      </motion.section>

      {/* Detailed Sections */}
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}

      {/* CTA – Clean & Professional */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-28 bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-700"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
          >
            Ready for Premium Solutions?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-teal-100 mb-10 max-w-2xl mx-auto"
          >
            Custom quote within 24 hours • Unmatched quality guarantee
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-white text-teal-700 font-bold text-lg rounded-full shadow-2xl hover:shadow-teal-500/50 transition-all"
            >
              Get Started Today
              <Wrench className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default ManufacturingSupply;