import { useEffect, useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cop1 from "../assets/cop-1.png";
import cop2 from "../assets/cop-2.png";
import cop3 from "../assets/cop-3.png";
import cop4 from "../assets/cop-4.png";
import cop5 from "../assets/cop-5.png";
import cop6 from "../assets/cop-6.png";
import cop7 from "../assets/cop-7.png";   
import cop8 from "../assets/cop-8.png";
import cop9 from "../assets/cop-9.png";
import cop10 from "../assets/cop-10.png";
import cop11 from "../assets/cop-11.png";
import cop12 from "../assets/cop-12.png";
import cop13 from "../assets/cop-13.png";
import cop14 from "../assets/cop-14.png";
import cop15 from "../assets/cop-15.png";
import cop16 from "../assets/cop-16.png";
import cop17 from "../assets/cop-17.png";
import cop18 from "../assets/cop-18.png";
import cop19 from "../assets/cop-19.png";

// Define gallery image type
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

// Split text into characters for wave animation
const SplitText = ({ children }: { children: string }) => {
  return (
    <>
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20, rotate: 10 },
            visible: { opacity: 1, y: 0, rotate: 0 },
          }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
};

const CustomCard = ({ title, src, onClick }: { title: string; src: string; onClick: () => void }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 shadow-lg transition-all duration-500 hover:shadow-cyan-500/20"
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
      whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <img
        src={src}
        alt={title}
        className="object-cover w-full h-64 sm:h-80 transition-transform duration-700 hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <h3 className="text-[clamp(1rem,2.5vw,1.125rem)] font-mono text-cyan-300">{title}</h3>
      </div>
      <div className="absolute top-2 right-2 bg-cyan-500/20 text-cyan-300 text-[clamp(0.75rem,2vw,0.875rem)] font-mono px-2 py-1 rounded-full">
        View
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // Track navigation direction

  // Define gallery images
  const galleryImages: GalleryImage[] = useMemo(
    () => [
      {
        id: '1',
        src: cop1,
        alt: 'PCC Panel Manufacturing for Industrial Power Distribution',
      },
      {
        id: '2',
        src: cop2,
        alt: 'MCC Panel Manufacturing for Motor Control Systems',
      },
      {
        id: '3',
        src: cop3,
        alt: 'PLC cum VFD Control Panel Manufacturing for Automation',
      },
      {
        id: '4',
        src: cop4,
        alt: 'PCC Panel Assembly for Power Control Centers',
      },
      {
        id: '5',
        src: cop5,
        alt: 'MCC Panel Fabrication for Industrial Applications',
      },
      {
        id: '6',
        src: cop6,
        alt: 'VFD Control Panel Manufacturing for Process Control',
      },
      {
        id: '7',
        src: cop7,
        alt: 'PCC Panel Manufacturing with Advanced Wiring',
      },
      {
        id: '8',
        src: cop8,
        alt: 'MCC Panel Manufacturing for Heavy-Duty Motors',
      },
      {
        id: '9',
        src: cop9,
        alt: 'PLC cum VFD Panel Manufacturing for Precision Automation',
      },
      {
        id: '10',
        src: cop10,
        alt: 'PCC Panel Manufacturing for Energy Management',
      },
      {
        id: '11',
        src: cop11,
        alt: 'MCC Panel Manufacturing for Industrial Automation',
      },
      {
        id: '12',
        src: cop12,
        alt: 'VFD Control Panel Manufacturing for Power Plants',
      },
      {
        id: '13',
        src: cop13,
        alt: 'PCC Panel Manufacturing for Process Industries',
      },
      {
        id: '14',
        src: cop14,
        alt: 'MCC Panel Manufacturing for Bulk Material Handling',
      },
      {
        id: '15',
        src: cop15,
        alt: 'PLC cum VFD Panel Manufacturing for Renewable Energy',
      },
      {
        id: '16',
        src: cop16,
        alt: 'APFC Panel Manufacturing for Power Factor Correction',
      },
      {
        id: '17',
        src: cop17,
        alt: 'AMF Control Panel Manufacturing for Automatic Mains Failure',
      },
      {
        id: '18',
        src: cop18,
        alt: 'Relay Logic Control Panel Manufacturing for Process Plants',
      },
      {
        id: '19',
        src: cop19,
        alt: 'EB & DG Synchronizing Control Panel for Power Distribution',
      },
    ],
    []
  );

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    document.title = 'PCC, MCC & PLC cum VFD Control Panels Gallery - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore GVS Controls’ gallery showcasing innovative PCC, MCC, and PLC cum VFD control panels, manufactured for industrial automation, power management, and customer satisfaction.'
      );
    }

    setTimeout(() => setLoading(false), 1000);
    setImages(galleryImages);

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [galleryImages]);

  const openLightbox = (image: GalleryImage) => {
    const newIndex = images.findIndex((img) => img.id === image.id);
    setSelectedImage(image);
    setCurrentImageIndex(newIndex);
    setDirection(0); // No direction for initial open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToPreviousImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setSelectedImage(images[newIndex]);
    setCurrentImageIndex(newIndex);
    setDirection(-1); // Slide from left
  };

  const goToNextImage = () => {
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setSelectedImage(images[newIndex]);
    setCurrentImageIndex(newIndex);
    setDirection(1); // Slide from right
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(5px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
  };

  // Lightbox animation variants with directional slide
  const lightboxVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
      opacity: 0,
      scale: direction === 0 ? 0.5 : 1,
      rotate: direction === 0 ? -10 : 0,
      filter: 'blur(10px)',
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 100, damping: 20 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 },
        rotate: { duration: 0.6 },
        filter: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : direction < 0 ? '100%' : 0,
      opacity: 0,
      scale: direction === 0 ? 0.5 : 1,
      filter: 'blur(10px)',
      transition: {
        x: { type: 'spring', stiffness: 100, damping: 20 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    }),
  };

  return (
    <main style={{ paddingTop: `${headerHeight}px` }} className="bg-gray-950 text-white">
      {/* Hero Section */}
      <motion.section
        className="relative bg-[radial-gradient(circle_at_center,_#1e3a8a_0,_#0f172a_70%)] py-20 sm:py-24 md:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-[clamp(0.875rem,2vw,1rem)] font-mono mb-6 border border-cyan-500/30"
              variants={textVariants}
            >
              Our Expertise
            </motion.span>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 leading-tight">
              <SplitText>PCC, MCC & PLC cum VFD Control Panels Gallery</SplitText>
            </h1>
            <motion.p
              className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-gray-300 mt-4 max-w-3xl mx-auto"
              variants={textVariants}
            >
              Discover GVS Controls’ innovative and cost-effective engineering solutions for power and automation systems, redefining customer satisfaction.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        className="py-20 sm:py-24 md:py-28 bg-gray-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 sm:mb-20 md:mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold font-mono text-white mb-4">
              <SplitText>Manufacturing Showcase</SplitText>
            </h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto text-[clamp(1.125rem,2.5vw,1.5rem)]"
              variants={textVariants}
            >
              A collection of our PCC, MCC, and PLC cum VFD control panels, manufactured for industrial excellence and reliability.
            </motion.p>
          </motion.div>

          {/* Gallery Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-20 sm:py-24 md:py-28">
              <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
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

          {images.length === 0 && (
            <motion.div
              className="text-center py-20 sm:py-24 md:py-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-gray-400 text-[clamp(1.125rem,2.5vw,1.5rem)] font-mono"
                variants={textVariants}
              >
                No images found.
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section
        className="py-16 bg-gray-900 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-[clamp(1.75rem,3vw,2.25rem)] font-mono text-cyan-300 mb-4">
            <SplitText>Contact GVS Controls</SplitText>
          </h3>
          <motion.p
            className="text-gray-400 text-[clamp(1rem,2.5vw,1.25rem)] mb-6"
            variants={textVariants}
          >
            Reach out for innovative and cost-effective control panel solutions.
          </motion.p>
          <motion.div
            className="text-gray-300 font-mono text-[clamp(0.875rem,2vw,1rem)]"
            variants={textVariants}
          >
            <p>Office: No.9/14, First Floor, EWS Plot, Gudalur, Maraimalai Nagar, Chengalpattu-(District), Pin: 603209</p>
            <p>Mobile: 9884001597 & 7338880027</p>
            <p>Email: <a href="mailto:gvscontrols@gmail.com" className="text-cyan-400 hover:underline">gvscontrols@gmail.com</a></p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence mode="wait" custom={direction}>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[2500] bg-gray-950/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            key={selectedImage.id}
          >
            <motion.div
              className="relative w-full max-w-5xl sm:max-w-6xl md:max-w-7xl max-h-[90vh]"
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
              />
              <button
                className="absolute top-4 right-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 p-3 rounded-full transition-colors"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 p-3 rounded-full transition-colors"
                onClick={goToPreviousImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 p-3 rounded-full transition-colors"
                onClick={goToNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent text-white p-4 sm:p-6 rounded-b-xl">
                <h3 className="font-mono text-[clamp(1.25rem,3vw,1.875rem)] text-cyan-300">
                  {selectedImage.alt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;