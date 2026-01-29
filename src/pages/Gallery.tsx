import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cop1 from '../assets/cop-1.webp';
import cop2 from '../assets/cop-2.webp';
import cop3 from '../assets/cop-3.webp';
import cop4 from '../assets/cop-4.webp';
import cop5 from '../assets/cop-5.webp';
import cop6 from '../assets/cop-6.webp';
import cop7 from '../assets/cop-7.webp';
import cop8 from '../assets/cop-8.webp';
import cop9 from '../assets/cop-9.webp';
import cop10 from '../assets/cop-10.webp';
import cop11 from '../assets/cop-11.webp';
import cop12 from '../assets/cop-12.webp';
import cop13 from '../assets/cop-13.webp';
import cop14 from '../assets/cop-14.webp';
import cop15 from '../assets/cop-15.webp';
import cop16 from '../assets/cop-16.webp';
import cop17 from '../assets/cop-17.webp';
import cop18 from '../assets/cop-18.webp';
import cop19 from '../assets/cop-19.webp';
import React from 'react';
import SEO from '../components/SEO';

// Define gallery image type
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { id: '1', src: cop1, alt: 'PCC Panel Manufacturing for Industrial Power Distribution' },
  { id: '2', src: cop2, alt: 'MCC Panel Manufacturing for Motor Control Systems' },
  { id: '3', src: cop3, alt: 'PLC cum VFD Control Panel Manufacturing for Automation' },
  { id: '4', src: cop4, alt: 'PCC Panel Assembly for Power Control Centers' },
  { id: '5', src: cop5, alt: 'MCC Panel Fabrication for Industrial Applications' },
  { id: '6', src: cop6, alt: 'VFD Control Panel Manufacturing for Process Control' },
  { id: '7', src: cop7, alt: 'PCC Panel Manufacturing with Advanced Wiring' },
  { id: '8', src: cop8, alt: 'MCC Panel Manufacturing for Heavy-Duty Motors' },
  { id: '9', src: cop9, alt: 'PLC cum VFD Panel Manufacturing for Precision Automation' },
  { id: '10', src: cop10, alt: 'PCC Panel Manufacturing for Energy Management' },
  { id: '11', src: cop11, alt: 'MCC Panel Manufacturing for Industrial Automation' },
  { id: '12', src: cop12, alt: 'VFD Control Panel Manufacturing for Power Plants' },
  { id: '13', src: cop13, alt: 'PCC Panel Manufacturing for Process Industries' },
  { id: '14', src: cop14, alt: 'MCC Panel Manufacturing for Bulk Material Handling' },
  { id: '15', src: cop15, alt: 'PLC cum VFD Panel Manufacturing for Renewable Energy' },
  { id: '16', src: cop16, alt: 'APFC Panel Manufacturing for Power Factor Correction' },
  { id: '17', src: cop17, alt: 'AMF Control Panel Manufacturing for Automatic Mains Failure' },
  { id: '18', src: cop18, alt: 'Relay Logic Control Panel Manufacturing for Process Plants' },
  { id: '19', src: cop19, alt: 'EB & DG Synchronizing Control Panel for Power Distribution' }
];

// Custom Card Component (Memoized)
const CustomCard = React.memo(({ title, src, onClick }: { title: string; src: string; onClick: () => void }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${title}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={src}
        alt={title}
        className="object-cover w-full h-64 sm:h-72 md:h-80 transition-transform duration-500 hover:scale-105"
        loading="lazy"
        width="400"
        height="320"
        onError={(e) => {
          e.currentTarget.src = '/fallback-image.png';
        }}
      />
    </motion.div>
  );
});

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  // Define gallery images
  // Define gallery images moved outside component


  // Preload images and set images immediately
  useEffect(() => {
    const preloadImages = () => {
      const promises = galleryImages.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image.src;
          img.onload = resolve;
          img.onerror = resolve; // Resolve even if image fails to load
        });
      });
      return Promise.all(promises);
    };

    preloadImages().then(() => {
      setImages(galleryImages);
    });
  }, []);

  // Handle header height for padding
  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };

    updateHeaderHeight();
    const debouncedUpdate = debounce(updateHeaderHeight, 100);
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, []);

  // Memoized event handlers
  const openLightbox = useCallback((image: GalleryImage) => {
    const newIndex = images.findIndex((img) => img.id === image.id);
    setSelectedImage(image);
    setCurrentImageIndex(newIndex);
    setDirection(0);
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
  }, [images]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  }, []);

  const goToPreviousImage = useCallback(() => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setSelectedImage(images[newIndex]);
    setCurrentImageIndex(newIndex);
    setDirection(-1);
  }, [currentImageIndex, images]);

  const goToNextImage = useCallback(() => {
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setSelectedImage(images[newIndex]);
    setCurrentImageIndex(newIndex);
    setDirection(1);
  }, [currentImageIndex, images]);

  // Set document metadata and ESC/arrow key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPreviousImage();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNextImage();
        } else if (e.key === 'Escape') {
          setSelectedImage(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, goToPreviousImage, goToNextImage]);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const lightboxVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '50%' : direction < 0 ? '-50%' : 0,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-50%' : direction < 0 ? '50%' : 0,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  // Debounce utility
  function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), ms);
    };
  }

  return (
    <main className="bg-gray-950 text-white min-h-screen pt-[84px] lg:pt-[128px]">
      <SEO
        title="Control Panels Gallery"
        description="Explore GVS Controls' PCC, MCC, and PLC cum VFD control panels, manufactured for industrial automation and power management."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/gallery' : undefined}
      />
      {/* Hero Section */}
      <motion.section
        className="relative bg-[radial-gradient(circle_at_center,_#1e3a8a_0,_#0f172a_70%)] min-h-[50vh] flex items-center py-16 md:py-20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={textVariants}>
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-mono mb-6 border border-cyan-500/30"
              variants={textVariants}
            >
              Manufacturing Showcase
            </motion.span>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 leading-tight max-w-4xl mx-auto px-2"
              variants={textVariants}
            >
              Control Panels Gallery
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed px-4"
              variants={textVariants}
            >
              Explore our IE & CEIG compliant PCC, MCC, VFD & PLC Control Panels — Manufactured for Power Plants, Steel, Cement & Industrial Automation.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-gray-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" variants={textVariants}>
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-white mb-4 break-words"
              variants={textVariants}
            >
              Manufacturing Showcase
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base break-words"
              variants={textVariants}
            >
              A collection of our PCC, MCC, and PLC cum VFD control panels, manufactured for industrial excellence.
            </motion.p>
          </motion.div>

          {/* Gallery Cards */}
          {images.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {images.map((image) => (
                <CustomCard
                  key={image.id}
                  title={image.alt}
                  src={image.src}
                  onClick={() => openLightbox(image)}
                />
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence mode="wait" custom={direction}>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            key={`lightbox-${selectedImage.id}`}
          >
            {/* Image Wrapper - Relative for Close Button */}
            <motion.div
              className="relative flex-shrink-1 min-h-0 flex items-center justify-center"
              custom={direction}
              variants={lightboxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl border-2 border-cyan-500/50"
              />

              {/* Close Button - Attached to Image Corner */}
              <button
                className="absolute -top-3 -right-3 bg-white hover:bg-red-500 text-gray-900 hover:text-white p-2 rounded-full shadow-2xl transition-all duration-300 z-50"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={20} className="transition-transform duration-300 hover:rotate-90" />
              </button>
            </motion.div>

            {/* Controls Wrapper - Below Image */}
            <div className="flex-shrink-0 mt-6 flex items-center gap-6 z-50" onClick={(e) => e.stopPropagation()}>
              <button
                className="bg-white/90 hover:bg-cyan-500 text-gray-900 hover:text-white p-3 rounded-full shadow-xl transition-all duration-300"
                onClick={goToPreviousImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm whitespace-nowrap border border-white/10">
                {currentImageIndex + 1} / {images.length}
              </div>

              <button
                className="bg-white/90 hover:bg-cyan-500 text-gray-900 hover:text-white p-3 rounded-full shadow-xl transition-all duration-300"
                onClick={goToNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact CTA Section */}
      <motion.section
        className="py-12 sm:py-16 bg-gray-900 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div variants={textVariants} className="px-4 mx-auto">
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-mono text-cyan-300 mb-4 break-words"
            variants={textVariants}
          >
            Contact GVS Controls
          </motion.h3>
          <motion.p
            className="text-gray-400 text-sm sm:text-base mb-6 max-w-xl mx-auto break-words"
            variants={textVariants}
          >
            Reach out for innovative and cost-effective control panel solutions.
          </motion.p>
          <motion.div
            className="text-gray-300 font-mono text-xs sm:text-sm max-w-xl mx-auto break-words"
            variants={textVariants}
          >
            <p>Office & Works: Plot No.1476, Segundram Main Road, Gokulapuram- MaraimalaiNagar, Chengalpattu-(District), Pin:603209</p>
            <p>Reg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar Govindarajapuram, Nandhivaram, Guduvanchery – 603202, Chengalpattu-(Dist)</p>
            <p>Mobile: 7338880027 & 9884001597</p>
            <p>
              Email:{' '}
              <a href="mailto:projects@gvscontrols.com" className="text-cyan-400 hover:underline">
                projects@gvscontrols.com
              </a>
              {' & '}
              <a href="mailto:gvscontrols@gmail.com" className="text-cyan-400 hover:underline">
                gvscontrols@gmail.com
              </a>
            </p>
            <p>
              Website: <a href="https://www.gvscontrols.com" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">www.gvscontrols.com</a>
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default Gallery;