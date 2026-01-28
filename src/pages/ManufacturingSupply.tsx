"use client";
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CardSpotlight } from '../components/ui/card-spotlight';
import { Factory, Zap, Wrench } from 'lucide-react';
import React from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  color: [number, number, number][];
}

const ProductSection = ({ product }: { product: Product }) => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden relative bg-gradient-to-br from-teal-50/60 via-cyan-50/60 to-indigo-50/60">
      {/* Static Background Orbs - Removed animation for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Centered Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 sm:gap-5 mb-6">
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 shadow-xl flex-shrink-0 transition-transform duration-200 hover:scale-105">
                {React.cloneElement(product.icon as React.ReactElement, {
                  className: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white",
                })}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-indigo-800">
                {product.name}
              </h2>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {product.description}
            </p>
          </div>

          {/* Centered Layout: Spotlight Card Above, Items Below */}
          <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
            {/* Spotlight Card - Centered and Wider */}
            <div className="w-full flex justify-center">
              <ProductSpotlightCard product={product} />
            </div>

            {/* Product Items - Full Width Below Card */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {product.items.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-white/90 shadow-md hover:shadow-xl hover:bg-white transition-all duration-200 border border-gray-100"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-500 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium text-sm md:text-base group-hover:text-teal-700 transition-colors duration-200 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductSpotlightCard = ({ product }: { product: Product }) => {
  const spotlightColor = useMemo(() => {
    const [r1, g1, b1] = product.color[0];
    const [r2, g2, b2] = product.color[1] || product.color[0];
    return `rgb(${Math.floor((r1 + r2) / 2)}, ${Math.floor((g1 + g2) / 2)}, ${Math.floor((b1 + b2) / 2)})`;
  }, [product.color]);

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto">
      <CardSpotlight
        radius={350}
        color={spotlightColor}
        className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] border border-white/10"
      >
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-14 text-center space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10">
          {/* Elegant Icon */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-7 rounded-full bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-600 shadow-2xl ring-4 sm:ring-5 md:ring-6 lg:ring-8 ring-white/10 transition-transform duration-200 hover:scale-105">
            {React.cloneElement(product.icon as React.ReactElement, {
              className: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white",
            })}
          </div>

          {/* Clean & Sophisticated Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight sm:leading-snug tracking-tight px-2 sm:px-4 max-w-2xl">
            {product.name}
          </h3>

          {/* Subtle & Premium Subtitle */}
          <p className="text-teal-200 text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-wide sm:tracking-wider opacity-90 px-2 sm:px-4 max-w-xl">
            IE & CEIG Compliant • Premium Quality
          </p>

          {/* Refined Progress Bar - Static for performance */}
          <div className="h-1 sm:h-1.5 md:h-2 w-[60%] sm:w-[55%] md:w-[50%] lg:w-[45%] bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 rounded-full shadow-lg shadow-cyan-500/40" />
        </div>
      </CardSpotlight>
    </div>
  );
};

const ManufacturingSupply = () => {
  useEffect(() => {
    document.title = 'Manufacturing & Supply - GVS Controls';
  }, []);

  const product: Product = {
    id: 'control-panels',
    name: 'Electrical Control Panels',
    description: 'We manufacture Electrical Control Panels as per IE Standard Electrical Inspectorate Rules and Regulation (CEIG) and the Wide Product Range Include:',
    items: [
      'Power Control Centers, Power Distribution Panels, Motor Control Centers & Process Control Panels',
      'Electrical 415 V Panel with Single (or) Double Bus System',
      'EB & DG Synchronizing Control Panels & Auto Transfer Switch Panels',
      'LT Bus Ducts and Sandwich Type Bus Ducts & Raising Main Panels',
      'APFC Panels, AMF Control Panels, Relay Logic & PLC Control Panel',
      'Local Push Button Station, Junction Boxes, Lighting Panels ML singular, LDB, SLDB, and Utility DB\'s',
      'VFD Control Panels & Special Purpose and Other Custom Built Panels',
    ],
    icon: <Factory className="w-16 h-16 text-white" />,
    color: [[0, 128, 128], [59, 130, 246]],
  };

  return (
    <main className="pt-[84px] lg:pt-[140px] bg-gradient-to-b from-slate-50 via-teal-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-teal-800 to-purple-900 overflow-hidden">
        {/* Static background - Removed animation for performance */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block px-4 sm:px-6 py-2 rounded-full bg-white/20 border border-white/30 text-teal-200 font-semibold text-xs sm:text-sm tracking-widest mb-4 sm:mb-6">
            MANUFACTURING EXCELLENCE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-pink-100 mb-4 sm:mb-6 px-2">
            Manufacturing & Supply
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed px-2">
            IE & CEIG Compliant Panels • Premium Quality Manufacturing • Engineered for Reliability
          </p>
        </div>
      </section>

      {/* Product Section */}
      <ProductSection product={product} />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 px-2">
            Ready for Premium Solutions?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
            Custom quote within 24 hours • Unmatched quality guarantee
          </p>
          <div className="transition-transform duration-200 hover:scale-105">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-white text-teal-700 font-bold text-base sm:text-lg md:text-xl rounded-full shadow-2xl hover:shadow-teal-500/60 transition-all duration-200"
            >
              Get Started Today
              <Wrench className="ml-2 sm:ml-3 md:ml-4 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManufacturingSupply;