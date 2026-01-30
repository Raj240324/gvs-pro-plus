import { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const BackToTop = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollY = useRef(0);

  const toggleVisibility = () => {
    const currentScrollY = window.scrollY;
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY.current) {
      setIsScrollingDown(true);
    } else if (currentScrollY < lastScrollY.current) {
      setIsScrollingDown(false);
    }

    // Check if at bottom (Force Up arrow)
    // Using offsetHeight and minimal buffer
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
      setIsScrollingDown(false); 
    }
    
    // Check if at top (Force Down arrow)
    if (currentScrollY === 0) {
        setIsScrollingDown(true);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleScroll = () => {
     if (isScrollingDown) {
         // Scroll to bottom
         window.scrollTo({
             top: document.body.scrollHeight,
             behavior: 'smooth'
         });
     } else {
         // Scroll to top
         window.scrollTo({
             top: 0,
             behavior: 'smooth'
         });
     }
  };

  // If at very top, default to scrolling down
  const showDownArrow = isScrollingDown;

  return (
    <button
      onClick={handleScroll}
      className={`back-to-top visible`} 
      aria-label={showDownArrow ? "Scroll to bottom" : "Back to top"}
      title={showDownArrow ? "Scroll to bottom" : "Back to top"}
    >
      {showDownArrow ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
    </button>
  );
};

export default BackToTop;