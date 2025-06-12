import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cop1 from '../assets/cop-1.png';
import cop2 from '../assets/cop-2.png';
import cop3 from '../assets/cop-3.png';
import cop4 from '../assets/cop-4.png';
import cop5 from '../assets/cop-5.png';
import cop6 from '../assets/cop-6.png';
import cop7 from '../assets/cop-7.png';
import cop8 from '../assets/cop-8.png';
import cop9 from '../assets/cop-9.png';
import cop10 from '../assets/cop-10.png';
import cop11 from '../assets/cop-11.png';
import cop12 from '../assets/cop-12.png';
import cop13 from '../assets/cop-13.png';
import cop14 from '../assets/cop-14.png';
import cop15 from '../assets/cop-15.png';
import cop16 from '../assets/cop-16.png';
import cop17 from '../assets/cop-17.png';
import cop18 from '../assets/cop-18.png';
import cop19 from '../assets/cop-19.png';
import React from 'react';

// Define gallery image type
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

// Custom Card Component (Memoized)
const CustomCard = React.memo(({ title, src, onClick }: { title: string; src: string; onClick: () => void }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
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
        onError={(e) => {
          e.currentTarget.src = '/fallback-image.png';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <h3 className="text-sm font-mono text-cyan-300 break-words">{title}</h3>
      </div>
      <div className="absolute top-2 right-2 bg-cyan-500/20 text-cyan-300 text-xs font-mono px-2 py-1 rounded-full">
        View
      </div>
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

  // Set document metadata and ESC key handler
  useEffect(() => {
    document.title = 'PCC, MCC & PLC cum VFD Control Panels Gallery - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore GVS Controls\' gallery showcasing innovative PCC, MCC, and PLC cum VFD control panels, manufactured for industrial automation and power management.'
      );
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, []);

  // Memoized event handlers
  const openLightbox = useCallback((image: GalleryImage) => {
    const newIndex = images.findIndex((img) => img.id === image.id);
    setSelectedImage(image);
    setCurrentImageIndex(newIndex);
    setDirection(0);
    document.body.style.overflow = 'hidden';
  }, [images]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
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
  function debounce(fn: Function, ms: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), ms);
    };
  }

  return (
    <main style={{ paddingTop: `${headerHeight}px` }} className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative bg-[radial-gradient(circle_at_center,_#1e3a8a_0,_#0f172a_70%)] py-12 sm:py-16 md:py-20 overflow-hidden"
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
              Our Expertise
            </motion.span>
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 leading-tight max-w-[90vw] mx-auto break-words"
              variants={textVariants}
            >
              PCC, MCC & PLC cum VFD Control Panels Gallery
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base text-gray-300 mt-4 max-w-2xl mx-auto break-words"
              variants={textVariants}
            >
              Discover GVS Controls' innovative and cost-effective engineering solutions for power and automation systems, redefining customer satisfaction.
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
            className="fixed inset-0 z-[2500] bg-gray-950/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            key={selectedImage.id}
          >
            <motion.div
              className="relative w-full max-w-[95vw] sm:max-w-4xl max-h-[90vh]"
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
                className="w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-xl shadow-2xl border border-cyan-500/30"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/fallback-image.png';
                }}
              />
              <button
                className="absolute top-4 right-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 p-2 rounded-full transition-colors"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 p-2 rounded-full transition-colors"
                onClick={goToPreviousImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 p-2 rounded-full transition-colors"
                onClick={goToNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent text-white p-4 rounded-b-xl">
                <h3 className="font-mono text-sm sm:text-base text-cyan-300 break-words">{selectedImage.alt}</h3>
              </div>
            </motion.div>
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
        <motion.div variants={textVariants}>
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
            <p>Office & Works: Plot No.1476, Sengundram Main Road, Gokulapuram Chengalpattu Dist, Pin-603204 (Land Mark – Mas Robotics)</p>
            <p>Reg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar, Govindarajapuram, Guduvanchery – 603202, Kanchipuram Dist</p>
            <p>Mobile: +91 7338880027 & 9884001597</p>
            <p>
              Email:{' '}
              <a href="mailto:projects@gvscontrols.com" className="text-cyan-400 hover:underline">
                projects@gvscontrols.com
              </a>
              {', '}
              <a href="mailto:services@gvscontrols.com" className="text-cyan-400 hover:underline">
                services@gvscontrols.com
              </a>
              {', '}
              <a href="mailto:gvscontrols@gmail.com" className="text-cyan-400 hover:underline">
                gvscontrols@gmail.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default Gallery;