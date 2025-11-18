"use client";
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CardSpotlight } from '../components/ui/card-spotlight';
import { Factory, Shield, Zap, Wrench } from 'lucide-react';
import React from 'react';

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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden relative ${
        index % 2 === 0
          ? 'bg-gradient-to-br from-teal-50/60 via-cyan-50/60 to-indigo-50/60'
          : 'bg-gradient-to-bl from-indigo-50/60 via-purple-50/60 to-pink-50/60'
      }`}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-72 h-72 bg-teal-300/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-300/15 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start lg:items-center">
          {/* Left: Full Content (Original) */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`space-y-6 sm:space-y-8 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="flex items-center gap-3 sm:gap-5">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 shadow-xl flex-shrink-0"
              >
                {React.cloneElement(product.icon as React.ReactElement, {
                  className: "w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white",
                })}
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-indigo-800">
                {product.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {product.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-white/90 shadow-md hover:shadow-xl hover:bg-white transition-all duration-300 border border-gray-100"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-500 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm md:text-base group-hover:text-teal-700 transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Perfectly Centered Spotlight Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`relative w-full ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} mt-8 lg:mt-0`}
          >
            <ProductSpotlightCard product={product} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ProductSpotlightCard = ({ product }: { product: Product }) => {
  const spotlightColor = useMemo(() => {
    const [r1, g1, b1] = product.color[0];
    const [r2, g2, b2] = product.color[1] || product.color[0];
    return `rgb(${Math.floor((r1 + r2) / 2)}, ${Math.floor((g1 + g2) / 2)}, ${Math.floor((b1 + b2) / 2)})`;
  }, [product.color]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <CardSpotlight
        radius={350}
        color={spotlightColor}
        className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900 min-h-[400px] sm:min-h-[480px] md:h-[560px] border border-white/10"
      >
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 text-center space-y-6 sm:space-y-8 md:space-y-12">
          {/* Elegant Icon */}
          <motion.div
            whileHover={{ scale: 1.12, rotate: 6 }}
            transition={{ duration: 0.4 }}
            className="p-5 sm:p-6 md:p-8 rounded-full bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-600 shadow-2xl ring-4 sm:ring-6 md:ring-8 ring-white/10"
          >
            {React.cloneElement(product.icon as React.ReactElement, {
              className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white",
            })}
          </motion.div>

          {/* Clean & Sophisticated Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug tracking-tight max-w-xs px-2">
            {product.name}
          </h3>

          {/* Subtle & Premium Subtitle */}
          <p className="text-teal-200 text-sm sm:text-base md:text-lg font-medium tracking-wider opacity-90 px-2">
            IE & CEIG Compliant • Premium Quality
          </p>

          {/* Refined Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "65%" }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
            className="h-1 sm:h-1.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 rounded-full shadow-lg shadow-cyan-500/40 max-w-xs"
          />
        </div>
      </CardSpotlight>
    </div>
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
        'Local Push Button Station, Junction Boxes, Lighting Panels ML singular, LDB, SLDB, and Utility DB’s',
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
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 sm:px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-teal-200 font-semibold text-xs sm:text-sm tracking-widest mb-4 sm:mb-6"
          >
            MANUFACTURING EXCELLENCE
          </motion.span>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-pink-100 mb-4 sm:mb-6 px-2"
          >
            Manufacturing & Supply
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed px-2"
          >
            IE & CEIG compliant panels • Precision field instruments • Engineered for reliability
          </motion.p>
        </div>
      </motion.section>

      {/* Product Sections */}
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        className="py-16 sm:py-20 md:py-28 bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-700"
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 px-2"
          >
            Ready for Premium Solutions?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
          >
            Custom quote within 24 hours • Unmatched quality guarantee
          </motion.p>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-white text-teal-700 font-bold text-base sm:text-lg md:text-xl rounded-full shadow-2xl hover:shadow-teal-500/60 transition-all duration-300"
            >
              Get Started Today
              <Wrench className="ml-2 sm:ml-3 md:ml-4 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default ManufacturingSupply;