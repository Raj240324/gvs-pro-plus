import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import App from './App';
import Preloader from './components/Preloader';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

// Keep homepage and 404 eager — they're first-load targets
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// All other pages lazy-loaded — dramatically reduces initial bundle size
// Desktop downloads these instantly; mobile saves critical parse time
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ManufacturingSupply = lazy(() => import('./pages/ManufacturingSupply'));
const Projects = lazy(() => import('./pages/Projects'));
const Clients = lazy(() => import('./pages/Clients'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// Suspense wrapper for lazy pages
const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Preloader />}>{children}</Suspense>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <Index /> },
        { path: 'about', element: <LazyPage><About /></LazyPage> },
        { path: 'services', element: <LazyPage><Services /></LazyPage> },
        { path: 'manufacturing-supply', element: <LazyPage><ManufacturingSupply /></LazyPage> },
        { path: 'projects', element: <LazyPage><Projects /></LazyPage> },
        { path: 'clients', element: <LazyPage><Clients /></LazyPage> },
        { path: 'why-us', element: <LazyPage><WhyUs /></LazyPage> },
        { path: 'gallery', element: <LazyPage><Gallery /></LazyPage> },
        { path: 'contact', element: <LazyPage><Contact /></LazyPage> },
        { path: 'privacy-policy', element: <LazyPage><PrivacyPolicy /></LazyPage> },
        { path: 'terms-of-service', element: <LazyPage><TermsOfService /></LazyPage> },
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