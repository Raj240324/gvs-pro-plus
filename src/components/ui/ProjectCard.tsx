
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  delay?: number;
}

const ProjectCard = ({ title, description, image, category, delay = 0 }: ProjectCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // Handle 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
    });
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
    });
    setIsHovered(false);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="group h-full overflow-hidden rounded-xl shadow-lg bg-white/70 dark:bg-gvs-dark-gray/70 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-500 hover:shadow-xl"
      style={{ 
        transitionDelay: `${delay}ms`,
        ...tiltStyle
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <div className="relative overflow-hidden aspect-video">
        <div className={`absolute inset-0 bg-gradient-to-r from-gvs-green/20 to-gvs-blue/20 ${loaded ? 'hidden' : 'flex items-center justify-center'}`}>
          <div className="w-8 h-8 border-4 border-gvs-green/30 border-t-gvs-green rounded-full animate-spin" />
        </div>
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'scale-100' : 'scale-110 blur-sm'} group-hover:scale-110`}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">{category}</span>
              <ExternalLink className="text-white h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gradient-to-r from-gvs-blue/10 to-gvs-green/10 text-gvs-blue dark:text-gvs-blue rounded backdrop-blur-sm">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-gvs-dark-gray dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gvs-green group-hover:to-gvs-blue transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
          {description}
        </p>
        <div className={`mt-4 h-0.5 bg-gradient-to-r from-gvs-green to-gvs-blue rounded-full transform origin-left transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
