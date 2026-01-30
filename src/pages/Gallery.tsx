import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

// Images
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

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

const galleryImages: GalleryImage[] = [
  { id: '1', src: cop1, alt: 'PCC Panel Manufacturing', category: 'Power Control' },
  { id: '2', src: cop2, alt: 'MCC Panel Manufacturing', category: 'Motor Control' },
  { id: '3', src: cop3, alt: 'PLC cum VFD Control Panel', category: 'Automation' },
  { id: '4', src: cop4, alt: 'PCC Panel Assembly', category: 'Power Control' },
  { id: '5', src: cop5, alt: 'MCC Panel Fabrication', category: 'Motor Control' },
  { id: '6', src: cop6, alt: 'VFD Control Panel', category: 'Automation' },
  { id: '7', src: cop7, alt: 'Advanced Wiring Systems', category: 'Engineering' },
  { id: '8', src: cop8, alt: 'Heavy-Duty Motor Control', category: 'Motor Control' },
  { id: '9', src: cop9, alt: 'Precision Automation Systems', category: 'Automation' },
  { id: '10', src: cop10, alt: 'Energy Management Panels', category: 'Power Control' },
  { id: '11', src: cop11, alt: 'Industrial Automation Units', category: 'Automation' },
  { id: '12', src: cop12, alt: 'Power Plant VFD Systems', category: 'Power Control' },
  { id: '13', src: cop13, alt: 'Process Industry Panels', category: 'General' },
  { id: '14', src: cop14, alt: 'Material Handling Control', category: 'Motor Control' },
  { id: '15', src: cop15, alt: 'Renewable Energy Systems', category: 'Green Energy' },
  { id: '16', src: cop16, alt: 'APFC Power Factor Panels', category: 'Power Control' },
  { id: '17', src: cop17, alt: 'AMF Control Panels', category: 'Power Control' },
  { id: '18', src: cop18, alt: 'Relay Logic Control', category: 'Automation' },
  { id: '19', src: cop19, alt: 'Synchronizing Panels', category: 'Power Control' }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  // Scroll Lock Effect
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const openLightbox = (index: number) => {
    setSelectedImage(galleryImages[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const showPrev = () => {
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const showNext = () => {
    const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <main className="min-h-screen bg-white pt-[84px] lg:pt-[128px]">
      <SEO
        title="Gallery | GVS Controls"
        description="Explore our portfolio of industrial control panels, automation systems, and engineering excellence."
      />

      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-600 via-teal-500 to-purple-600 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          {/* Floating Particles */}
          <div className="absolute top-20 left-20 w-3 h-3 rounded-full bg-white/30 animate-pulse" />
          <div className="absolute top-40 right-32 w-2 h-2 rounded-full bg-yellow-300/50 animate-ping" />
          <div className="absolute bottom-32 left-[30%] w-4 h-4 rounded-full bg-teal-300/30 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            Our Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            Our Work Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            A showcase of precision engineering, quality manufacturing, and innovative automation solutions delivered to our clients.
          </motion.p>
        </div>
      </section>

      {/* Uniform Grid - Centered Bottom */}
      <section className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer relative rounded-xl overflow-hidden bg-gray-100 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] aspect-[3/4]"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn size={28} />
                   </div>
                </div>

                {/* Caption Overlay - Removed per user request */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
             {/* Controls */}
             <button 
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
             >
               <X size={32} />
             </button>

             <button 
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                className="absolute left-4 md:left-8 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden sm:block"
             >
               <ChevronLeft size={32} />
             </button>

             <button 
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                className="absolute right-4 md:right-8 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden sm:block"
             >
               <ChevronRight size={32} />
             </button>

            {/* Main Image */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-7xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-sm shadow-2xl"
              />
              {/* Text details removed per user request */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;