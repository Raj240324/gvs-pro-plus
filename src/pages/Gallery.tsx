"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContactModal } from '../hooks/use-contact-modal';
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
}

const galleryImages: GalleryImage[] = [
  { id: '1', src: cop1, alt: 'Gallery Image' },
  { id: '2', src: cop2, alt: 'Gallery Image' },
  { id: '3', src: cop3, alt: 'Gallery Image' },
  { id: '4', src: cop4, alt: 'Gallery Image' },
  { id: '5', src: cop5, alt: 'Gallery Image' },
  { id: '6', src: cop6, alt: 'Gallery Image' },
  { id: '7', src: cop7, alt: 'Gallery Image' },
  { id: '8', src: cop8, alt: 'Gallery Image' },
  { id: '9', src: cop9, alt: 'Gallery Image' },
  { id: '10', src: cop10, alt: 'Gallery Image' },
  { id: '11', src: cop11, alt: 'Gallery Image' },
  { id: '12', src: cop12, alt: 'Gallery Image' },
  { id: '13', src: cop13, alt: 'Gallery Image' },
  { id: '14', src: cop14, alt: 'Gallery Image' },
  { id: '15', src: cop15, alt: 'Gallery Image' },
  { id: '16', src: cop16, alt: 'Gallery Image' },
  { id: '17', src: cop17, alt: 'Gallery Image' },
  { id: '18', src: cop18, alt: 'Gallery Image' },
  { id: '19', src: cop19, alt: 'Gallery Image' }
];

/* Animation Variants for Smooth Slide */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.9,
  })
};

const Gallery = () => {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); 
  const contactModal = useContactModal();

  // Handle Scroll Lock
  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [index]);

  // Handle Navigation
  const changeImage = useCallback((newDirection: number) => {
    if (index === null) return;
    setDirection(newDirection);
    let newIndex = index + newDirection;
    if (newIndex < 0) newIndex = galleryImages.length - 1;
    if (newIndex >= galleryImages.length) newIndex = 0;
    setIndex(newIndex);
  }, [index]);

  // Handle Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowLeft') changeImage(-1);
      if (e.key === 'ArrowRight') changeImage(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, changeImage]);

  const selectedImage = index !== null ? galleryImages[index] : null;

  return (
    <main className="bg-black text-white min-h-screen pt-[84px] lg:pt-[128px]">
      <SEO
        title="PCC, MCC & PLC CUM VFD Control Panel Gallery"
        description="View our extensive gallery of Power Control Centers (PCC), Motor Control Centers (MCC), and PLC cum VFD Automation Panels manufactured to IE/CEIG standards."
      />

      {/* --- HERO --- */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 pb-12 overflow-hidden rounded-b-[3rem] shadow-2xl z-10">
         <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
             <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
         </div>

         <div className="relative z-10 max-w-5xl mx-auto">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-2 px-3 py-1 mb-6 mt-6 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider"
            >
               <ImageIcon className="w-3 h-3" />
               <span>Portfolio Showcase</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            >
              PCC, MCC & PLC CUM <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">VFD CONTROL PANELS GALLERY</span>
            </motion.h1>

            <motion.p
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-lg md:text-xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed"
            >
               A comprehensive showcase of our manufactured <span className="text-white font-medium">Power Control Centers (PCC)</span>, <span className="text-white font-medium">Motor Control Centers (MCC)</span>, and advanced <span className="text-white font-medium">PLC cum VFD Automation Panels</span>.
            </motion.p>
         </div>
      </section>

      {/* --- GRID --- */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {galleryImages.map((image, i) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative overflow-hidden rounded-2xl cursor-zoom-in group aspect-[4/3] bg-slate-800 shadow-lg"
                onClick={() => { setIndex(i); setDirection(0); }}
                whileHover={{ scale: 1.02 }}
              >
                 <img
                   src={image.src}
                   alt={image.alt}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STANDARD LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          >
             {/* Backdrop */}
             <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-md" 
                onClick={() => setIndex(null)} 
             />

             {/* Close Button */}
             <button 
                onClick={() => setIndex(null)}
                className="absolute top-4 right-4 z-[100] p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
             >
               <X size={28} />
             </button>

             {/* Navigation Buttons */}
             <button 
                onClick={(e) => { e.stopPropagation(); changeImage(-1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[100] p-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hidden sm:flex"
             >
               <ChevronLeft size={32} />
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); changeImage(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[100] p-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hidden sm:flex"
             >
               <ChevronRight size={32} />
             </button>

             {/* Main Image */}
             <div className="relative z-50 max-w-7xl w-full max-h-full flex items-center justify-center pointer-events-none">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={selectedImage.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[65vh] sm:max-h-[85vh] object-contain shadow-2xl rounded-sm pointer-events-auto"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -10000) {
                        changeImage(1);
                      } else if (swipe > 10000) {
                        changeImage(-1);
                      }
                    }}
                  />
                </AnimatePresence>
             </div>
             
             {/* Mobile Navigation (Bottom) */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 z-[100] sm:hidden">
                <button 
                  onClick={(e) => { e.stopPropagation(); changeImage(-1); }}
                  className="p-4 bg-white/10 rounded-full text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); changeImage(1); }}
                  className="p-4 bg-white/10 rounded-full text-white"
                >
                  <ChevronRight size={24} />
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CTA SECTION --- */}
      <section className="relative py-32 border-t border-white/5 bg-gradient-to-b from-black to-indigo-950/20 overflow-hidden">
         <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full" />
         </div>

         <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="max-w-3xl mx-auto"
            >
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8">
                  See something you like? <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Let's build yours.</span>
               </h2>
               
               <p className="text-lg text-slate-400 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
                  Every panel in this gallery was custom-engineered to meet specific client needs. 
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <button 
                     onClick={() => contactModal.onOpen()}
                     className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                  >
                     Get Custom Quote
                  </button>

                  <Link 
                     to="/manufacturing-supply" 
                     className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto"
                  >
                     View Manufacturing
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

    </main>
  );
};

export default Gallery;