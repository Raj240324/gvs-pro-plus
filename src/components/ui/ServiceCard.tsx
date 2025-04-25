
import { ReactNode, useRef, useState, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, delay = 0 }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  // Handle 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)'
    });
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
    });
    setIsHovered(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('aos-animate');
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="aos-fade-up gradient-border bg-white dark:bg-gvs-dark-gray/90 rounded-xl shadow-lg p-6 flex flex-col h-full transition-all duration-500 overflow-hidden" 
      style={{ 
        transitionDelay: `${delay}ms`,
        ...tiltStyle
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex items-center mb-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gvs-green/20 to-gvs-blue/20 flex items-center justify-center">
          <div className="text-transparent bg-gradient-to-r from-gvs-green to-gvs-blue bg-clip-text">
            {icon}
          </div>
        </div>
        <h3 className="ml-4 text-xl font-bold text-gvs-dark-gray dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 flex-grow transform transition-all duration-300">
        {description}
      </p>
      <div className={`mt-4 h-1 bg-gradient-to-r from-gvs-green to-gvs-blue rounded-full transform origin-left transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
    </div>
  );
};

export default ServiceCard;
