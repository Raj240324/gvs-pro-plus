import { Toaster } from "../src/components/ui/toaster";
import { Toaster as SonnerToaster } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from 'react-helmet-async';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/BackToTop";
import Preloader from "./components/Preloader";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle preloader, AOS init, and Lenis smooth scroll
  useEffect(() => {
    // Initialize AOS with performance optimizations
    AOS.init({
      duration: 600, // Faster for less interference
      once: true,
      mirror: false,
      easing: 'ease-out-cubic',
      disable: false,
      startEvent: 'DOMContentLoaded',
      offset: 120,
    });

    // Initialize Lenis with optimized "Apple-like" smooth scroll settings
    const lenis = new Lenis({
      duration: 1.2, // Smooth but responsive
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    } as any);

    // Sync AOS on scroll (optional, but helps with some setups)
    // lenis.on('scroll', AOS.refresh); // Too heavy, let's rely on native scroll events

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster />
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <Header />
              <main id="main-content" tabIndex={-1} className="focus:outline-none">
                <Outlet />
              </main>
              <Footer />
              <BackToTop />
            </>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;