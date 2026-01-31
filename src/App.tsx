import { Toaster } from "../src/components/ui/toaster";
import { Toaster as SonnerToaster } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from "react-ga4";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/BackToTop";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Preloader from "./components/Preloader";
import CookieConsentBanner from "./components/CookieConsentBanner";
import SmoothScroll from "./components/SmoothScroll";

const queryClient = new QueryClient();

// Use your Google Analytics Measurement ID from the .env file
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID; 

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Initialize GA4
  useEffect(() => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      ReactGA.initialize(GA_MEASUREMENT_ID);
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  // Handle preloader, AOS init, and Lenis smooth scroll
  // Handle preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
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
              <SmoothScroll />
              <Header />
              <main id="main-content" tabIndex={-1} className="focus:outline-none">
                <Outlet />
              </main>
              <Footer />

              <BackToTop />
              <FloatingWhatsApp />
              <CookieConsentBanner />
            </>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;