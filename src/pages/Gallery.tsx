import { useEffect, useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define gallery image type
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const CustomCard = ({ title, src, onClick }: { title: string; src: string; onClick: () => void }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 shadow-lg transition-all duration-500 hover:shadow-cyan-500/20"
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={title}
        className="object-cover w-full h-64 sm:h-80 transition-transform duration-700 hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <h3 className="text-lg font-mono text-cyan-300">{title}</h3>
      </div>
      <div className="absolute top-2 right-2 bg-cyan-500/20 text-cyan-300 text-xs font-mono px-2 py-1 rounded-full">
        View
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  const galleryImages: GalleryImage[] = [
    { id: '1', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', alt: 'Control Panel Manufacturing', category: 'Manufacturing' },
    { id: '2', src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', alt: 'Electrical Installation at Power Plant', category: 'Installation' },
    { id: '3', src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', alt: 'Automation System Design', category: 'Automation' },
    { id: '4', src: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', alt: 'Switchgear Panel Testing', category: 'Testing' },
    { id: '5', src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', alt: 'Electrical Panel Wiring', category: 'Manufacturing' },
    { id: '6', src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', alt: 'Site Installation Work', category: 'Installation' },
    { id: '7', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', alt: 'Control System Programming', category: 'Automation' },
    { id: '8', src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', alt: 'Quality Inspection Process', category: 'Testing' },
    { id: '9', src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', alt: 'Motor Control Center', category: 'Manufacturing' },
    { id: '10', src: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', alt: 'Panel Installation at Client Site', category: 'Installation' },
  ];

  const categories = ['All', ...new Set(galleryImages.map(image => image.category))];

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
    document.title = 'Photo Gallery - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore GVS Controls photo gallery showcasing our electrical engineering projects, control panels, and installations across various industries.');
    }

    setTimeout(() => setLoading(false), 1000);

    if (activeCategory === 'All') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(image => image.category === activeCategory));
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [activeCategory]);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToPreviousImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    setSelectedImage(filteredImages[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const galleryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main style={{ paddingTop: `${headerHeight}px` }} className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative bg-[radial-gradient(circle_at_center,_#1e3a8a_0,_#0f172a_70%)] py-20 sm:py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-mono mb-6 border border-cyan-500/30">
              Our Work
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
              Photo Gallery
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4 max-w-3xl mx-auto">
              Experience our cutting-edge electrical engineering projects in a futuristic showcase.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 sm:py-24 md:py-28 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono text-white mb-4">
              Project Nexus
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl">
              A digital exploration of our innovative solutions.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex justify-center mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex flex-wrap justify-center gap-3 p-4 bg-gray-900/50 backdrop-blur-md rounded-xl border border-cyan-500/20">
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`relative px-4 py-2 sm:px-5 sm:py-3 rounded-lg text-sm sm:text-base font-mono transition-all duration-300 ${
                    activeCategory === category
                      ? 'text-cyan-300'
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-20 sm:py-24 md:py-28">
              <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
              variants={galleryVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredImages.map(image => (
                <motion.div key={image.id} variants={cardVariants}>
                  <CustomCard
                    title={image.alt}
                    src={image.src}
                    onClick={() => openLightbox(image)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-20 sm:py-24 md:py-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gray-400 text-lg sm:text-xl md:text-2xl font-mono">
                No images found in this category. Try another filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-full max-w-5xl sm:max-w-6xl md:max-w-7xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
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
                <h3 className="font-mono text-xl sm:text-2xl md:text-3xl text-cyan-300">{selectedImage.alt}</h3>
                <p className="text-violet-400 text-sm sm:text-base md:text-lg font-mono">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;