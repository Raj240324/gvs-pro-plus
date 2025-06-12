import { Toaster } from "../src/components/ui/toaster";
import { Toaster as SonnerToaster } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { HelmetProvider } from 'react-helmet-async';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/BackToTop";
import Preloader from "./components/Preloader";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showConsent, setShowConsent] = useState(false); // Control banner visibility

  // Handle preloader and banner delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowConsent(true); // Show banner after 1-second delay
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // AOS-like animations
  useEffect(() => {
    if (!isLoading) {
      const debounce = <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
        let timeout: NodeJS.Timeout | null;
        return (...args: T) => {
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => func(...args), wait);
        };
      };

      const handleScroll = debounce(() => {
        const elements = document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left');
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top <= windowHeight * 0.75) {
            element.classList.add('aos-animate');
          }
        });
      }, 50);

      setTimeout(handleScroll, 100);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading]);

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
            {showConsent && (
              <CookieConsent
                location="bottom"
                buttonText="Accept"
                declineButtonText="Reject"
                cookieName="gvsControlsCookieConsent"
                style={{
                  background: '#1e2a44',
                  color: '#e0f7fa',
                  fontFamily: 'Montserrat, sans-serif',
                  padding: '0.75rem 1rem',
                  borderTop: '2px solid #2a9d8f',
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  maxWidth: '100%',
                }}
                contentStyle={{
                  flex: '1 0 auto',
                  margin: '0',
                  maxWidth: '100%',
                }}
                buttonStyle={{
                  background: '#2a9d8f',
                  color: '#e0f7fa',
                  fontWeight: '600',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  margin: '0.25rem',
                }}
                declineButtonStyle={{
                  background: '#ff6f61',
                  color: '#e0f7fa',
                  fontWeight: '600',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  margin: '0.25rem',
                }}
                enableDeclineButton
                debug={true} // Set to false in production
                onAccept={() => console.log('Cookies accepted')}
                onDecline={() => console.log('Non-essential cookies rejected')}
              >
                <span style={{ fontSize: '0.875rem' }}>
                  We use cookies to improve your experience. See our{' '}
                  <a
                    href="/cookie-policy"
                    style={{ color: '#ff6f61', textDecoration: 'underline' }}
                  >
                    Cookie Policy
                  </a>
                  .
                </span>
              </CookieConsent>
            )}
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