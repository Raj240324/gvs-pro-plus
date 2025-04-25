import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImagesSliderProps {
  images: string[];
  className?: string;
}

const ImagesSlider: React.FC<ImagesSliderProps> = ({ images, className }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence>
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt={`Slider Image ${currentImage + 1}`}
          className="absolute w-full h-full object-cover image-parallax"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          loading={currentImage === 0 ? "eager" : "lazy"}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </div>
  );
};

export default ImagesSlider;