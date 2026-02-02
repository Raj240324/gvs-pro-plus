import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use instant scroll to avoid jitter with page transitions and animations
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
