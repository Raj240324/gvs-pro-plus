"use client";
import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, PanInfo } from 'framer-motion';
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

const Gallery = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0); // For slide animations
  const containerRef = useRef<HTMLDivElement>(null);
  const contactModal = useContactModal();
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const smoothY = useSpring(yHero, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedId]);

  // Navigate functions
  const navigate = (newDirection: number) => {
    if (!selectedId) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedId);
    let newIndex = currentIndex + newDirection;
    
    // Cyclic navigation
    if (newIndex < 0) newIndex = galleryImages.length - 1;
    if (newIndex >= galleryImages.length) newIndex = 0;
    
    setDirection(newDirection);
    setSelectedId(galleryImages[newIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      if (e.key === 'Escape') setSelectedId(null);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const selectedImage = galleryImages.find(img => img.id === selectedId);

  // Drag logic for swipe & close
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const dismissThreshold = 150;

    // Vertical Drag -> Close
    if (Math.abs(info.offset.y) > dismissThreshold || Math.abs(info.velocity.y) > 500) {
      setSelectedId(null);
      return;
    }

    // Horizontal Drag -> Navigate
    // Only if vertical movement was minimal (to differentiate from close gesture)
    if (Math.abs(info.offset.y) < 100 && Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) navigate(-1); // Swipe Right -> Prev
      else navigate(1); // Swipe Left -> Next
    }
  };

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen pt-[84px] lg:pt-[128px]">
      <SEO
        title="PCC, MCC & PLC cum VFD Control Panels Gallery | GVS Controls"
        description="Explore our premium gallery of PCC, MCC, PLC cum VFD Control Panels, and APFC Systems. Precision engineered for Power, Steel, and Cement industries."
      />

      {/* --- HERO --- */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 pb-12 overflow-hidden">
         <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
             <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
         </div>

         <motion.div style={{ y: smoothY, opacity: opacityHero }} className="relative z-10 max-w-5xl mx-auto">
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
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
               A comprehensive showcase of our manufactured <span className="text-white font-medium">Power Control Centers (PCC)</span>, <span className="text-white font-medium">Motor Control Centers (MCC)</span>, and advanced <span className="text-white font-medium">PLC cum VFD Automation Panels</span>. Engineered for reliability in the most demanding industrial environments.
            </motion.p>
         </motion.div>
      </section>

      {/* --- GRID --- */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="container mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image) => (
              <motion.div
                key={image.id}
                layoutId={`card-${image.id}`}
                className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-zoom-in group"
                onClick={() => setSelectedId(image.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ ease: "easeInOut", duration: 0.4 }}
              >
                 <motion.img
                   layoutId={`image-${image.id}`}
                   src={image.src}
                   alt=""
                   className="w-full h-auto object-cover rounded-2xl bg-slate-900"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LIGHTBOX (Apple-like) --- */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
             {/* Backdrop */}
             <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/95"
                onClick={() => setSelectedId(null)}
             />

             {/* Close Button - Moved to Safe Area */}
             <motion.button 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-[60] p-3 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all sm:top-8 sm:right-8"
             >
               <X size={24} />
             </motion.button>

             {/* Image Container */}
             <motion.div
                layoutId={`card-${selectedImage.id}`}
                className="relative z-50 w-full h-full flex items-center justify-center p-4 sm:p-8 pointer-events-none"
             >
                <motion.img
                   layoutId={`image-${selectedImage.id}`}
                   key={selectedImage.id} // Re-mount on change for slide effect
                   src={selectedImage.src}
                   alt=""
                   className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg pointer-events-auto cursor-grab active:cursor-grabbing"
                   
                   // Combined gestures
                   drag
                   dragElastic={0.7}
                   onDragEnd={onDragEnd}
                   
                   // Slide animation when changing images
                   initial={{ x: direction * 50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   exit={{ opacity: 0 }} // Don't slide out on close, handled by layoutId
                   transition={{ 
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                   }}
                />
             </motion.div>

             {/* Mobile/Desktop Navigation Hints */}
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute z-50 pointer-events-none flex justify-between items-center inset-x-6 bottom-12 sm:inset-x-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
            >
              <button 
                 onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                 className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md pointer-events-auto transition-all transform hover:scale-110 active:scale-95 border border-white/5 shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                 onClick={(e) => { e.stopPropagation(); navigate(1); }}
                 className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md pointer-events-auto transition-all transform hover:scale-110 active:scale-95 border border-white/5 shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
      {/* --- CTA SECTION --- */}
      <section className="relative py-32 border-t border-white/5 bg-gradient-to-b from-black to-indigo-950/20 overflow-hidden">
         {/* Background Glow */}
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
                  Share your requirements with us, and we'll design a solution that fits perfectly.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <button 
                     onClick={() => contactModal.onOpen()}
                     className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 w-full sm:w-auto min-w-[200px]"
                  >
                     <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Custom Quote 
                        <ChevronRight className="w-4 h-4" />
                     </span>
                     <div className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                     <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Get Custom Quote 
                        <ChevronRight className="w-4 h-4" />
                     </span>
                  </button>

                  <Link 
                     to="/manufacturing-supply" 
                     className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto min-w-[200px]"
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