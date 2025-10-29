"use client";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '../components/ui/canvas-reveal-effect';
import { Box } from 'lucide-react';
import cop1 from "../assets/cop-1.png";
import cop2 from "../assets/cop-2.png";
import cop3 from "../assets/cop-19.png";
import pp1 from "../assets/pp-1.png";
import pp2 from "../assets/pp-2.png";
import pp3 from "../assets/pp-3.png";

interface Product {
  id: string;
  name: string;
  description: string;
  items: string[];
  icon: JSX.Element;
  color: [number, number, number][]; // RGB arrays
  images: string[];
}

const ProductSection = ({ product, index }: { product: Product; index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  return (
    <motion.section
      key={product.id}
      id={product.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`py-12 sm:py-16 md:py-20 ${index % 2 === 0 ? 'bg-gradient-to-br from-teal-50 via-indigo-50 to-gray-100' : 'bg-gradient-to-bl from-gray-50 via-teal-50 to-indigo-50'}`}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`order-2 lg:order-${index % 2 === 0 ? '1' : '2'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 rounded-full bg-teal-500/10 flex items-center justify-center shadow-md transform hover:rotate-12 transition-transform">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">{product.icon}</div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">{product.name}</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">{product.description}</p>
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-base sm:text-lg md:text-xl">Products & Applications:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {product.items.map((item, i) => (
                  <li key={i} className="flex items-start group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-500 mr-2 sm:mr-3 flex-shrink-0 group-hover:scale-110 transition-transform w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-gray-700 text-sm sm:text-base group-hover:text-teal-600 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`order-1 lg:order-${index % 2 === 0 ? '2' : '1'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 group">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} example ${currentImageIndex + 1}`}
                className="w-full h-64 sm:h-80 md:h-96 object-cover transition-opacity group-hover:opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ManufacturingSupply = () => {
  useEffect(() => {
    document.title = 'Manufacturing & Supply - GVS Controls';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'GVS Controls manufactures IE/CEIG-compliant electrical control panels and supplies field instruments for power plants, material handling, cement, renewable energy, and more.'
      );
    }
  }, []);

  const products: Product[] = [
    {
      id: 'control-panels',
      name: 'Electrical Control Panels',
      description: 'Manufactured as per IE Standard Electrical Inspectorate Rules and Regulation (CEIG).',
      items: [
        'Medium Voltage Panel with Single (or) Double Bus System',
        'Power Control Centers',
        'Power Distribution Panels',
        'Motor Control Centers',
        'Process Control Panels',
        'EB & DG Synchronizing Control Panels',
        'Auto Transfer Switch Panels',
        'LT Bus Ducts and Sandwich Type Bus Ducts',
        'Raising Main Panels',
        'APFC Panels',
        'AMF Control Panels',
        'Relay Logic & PLC Control Panel',
        'Local Push Button Station',
        'Junction Boxes',
        'Lighting Panels MLDB, LDB, SLDB, and Utility DBs',
        'VFD Control Panels',
        'Special Purpose and Other Custom Built Panels',
      ],
      icon: <Box size={50} strokeWidth={2} className="text-teal-600" />,
      color: [[0, 128, 128], [0, 150, 136]], // teal gradient
      images: [cop1, cop2, cop3],
    },
    {
      id: 'field-instruments',
      name: 'Field Instruments Supply',
      description: 'Supply of field instruments for various industries and applications.',
      items: [
        'Power Plants',
        'Bulk Material Handling System',
        'Chemical Plants',
        'Cooling Towers',
        'Automobile Industries',
        'Process Plants',
        'Cement Plants',
        'Renewable Energy Sectors',
        'Safety Switches - Pull Cord and Belt Sway (Schmersal make)',
        'Motion Sensors (Milltronics)',
        'ZSS (Pepperl + Fuchs)',
        'Instruments for Wind Mills and Switches of any Special Requirements',
      ],
      icon: <Box size={50} strokeWidth={2} className="text-indigo-600" />,
      color: [[138, 43, 226], [75, 0, 130]], // purple gradient
      images: [pp1, pp2, pp3],
    },
  ];

  const Card = ({ product }: { product: Product }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="border border-gray-200 group/canvas-card flex items-center justify-center w-full max-w-sm mx-auto p-4 sm:p-6 md:p-8 relative h-80 sm:h-[24rem] bg-gradient-to-br from-gray-50 via-teal-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 text-teal-300 rotate-45" />
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-teal-300 rotate-135" />
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 text-teal-300 rotate-315" />
        <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-teal-300 rotate-225" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,234,212,0.15)_0,_transparent_70%)] opacity-70 pointer-events-none"></div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full w-full absolute inset-0"
              style={{ willChange: 'transform, opacity' }}
            >
              <CanvasRevealEffect
                animationSpeed={2}
                containerClassName="bg-gradient-to-br from-gray-800 to-teal-900"
                colors={product.color}
                dotSize={1.5}
                showGradient={false}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 text-center flex flex-col items-center justify-between h-full py-4 sm:py-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 mx-auto group-hover/canvas-card:-translate-y-4 sm:group-hover/canvas-card:-translate-y-6 group-hover/canvas-card:opacity-0 transition-all duration-300 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-indigo-400/30 rounded-full blur-lg group-hover/canvas-card:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10 flex items-center justify-center w-full h-full transform group-hover/canvas-card:rotate-12 transition-transform duration-300">
              {product.icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-4 transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600 group-hover/canvas-card:bg-none">
              {product.name}
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base flex-grow group-hover/canvas-card:hidden px-2 sm:px-4 leading-relaxed font-medium">{product.description}</p>
          </div>
          <div className="mt-3 sm:mt-4 group-hover/canvas-card:hidden">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full shadow-md transform group-hover/canvas-card:scale-105 transition-transform duration-300">
              Explore Products
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  const Icon = ({ className, ...rest }: { className?: string; [key: string]: unknown }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );

  return (
    <main className="pt-[84px] lg:pt-[140px] bg-gray-50">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-teal-600 text-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDMwSDMwTTYwIDMwVjMwTTYwIDMwSDMwTTYwIDMwVjMwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-teal-400/20 backdrop-blur-md text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-pulse">Our Expertise</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-indigo-300">
              Manufacturing & Supply
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              We manufacture Electrical Control Panels as per IE Standard Electrical Inspectorate Rules and Regulation (CEIG) and supply field instruments for various industries.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Overview Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-teal-50"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-700">
              Our Manufacturing & Supply Capabilities
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Wide range of IE/CEIG-compliant control panels and field instruments tailored to industry needs.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Detailed Sections */}
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 text-white relative overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_80%)] opacity-50 animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">
              Need Reliable Manufacturing & Supply?
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
              Contact GVS Controls for high-quality electrical control panels and field instruments tailored to your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base border-none outline-none ring-0 focus:ring-0 focus:outline-none hover:ring-0 active:ring-0"
              >
                Get in Touch
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default ManufacturingSupply;