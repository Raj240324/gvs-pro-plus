import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import App from './App';
import Preloader from './components/Preloader';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import ManufacturingSupply from './pages/ManufacturingSupply';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import WhyUs from './pages/WhyUs';
import Gallery from './pages/Gallery'; // Keep Gallery lazy if it has many images
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Keep lesser used pages lazy if desired, or make all eager for max speed
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <Index /> },
        { path: 'about', element: <About /> },
        { path: 'services', element: <Services /> },
        { path: 'manufacturing-supply', element: <ManufacturingSupply /> },
        { path: 'projects', element: <Projects /> },
        { path: 'clients', element: <Clients /> },
        { path: 'why-us', element: <WhyUs /> },
        { path: 'gallery', element: <Gallery /> },
        { path: 'contact', element: <Contact /> },
        { path: 'privacy-policy', element: <Suspense fallback={<Preloader />}><PrivacyPolicy /></Suspense> },
        { path: 'terms-of-service', element: <Suspense fallback={<Preloader />}><TermsOfService /></Suspense> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <GlobalErrorBoundary>
      <RouterProvider router={router} />
    </GlobalErrorBoundary>
  </HelmetProvider>
);