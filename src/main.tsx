import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import App from './App';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy Load Pages
const Index = lazy(() => import('./pages/Index'));
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
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <Suspense fallback={<LoadingSpinner />}><Index /></Suspense> },
        { path: 'about', element: <Suspense fallback={<LoadingSpinner />}><About /></Suspense> },
        { path: 'services', element: <Suspense fallback={<LoadingSpinner />}><Services /></Suspense> },
        { path: 'manufacturing-supply', element: <Suspense fallback={<LoadingSpinner />}><ManufacturingSupply /></Suspense> },
        { path: 'projects', element: <Suspense fallback={<LoadingSpinner />}><Projects /></Suspense> },
        { path: 'clients', element: <Suspense fallback={<LoadingSpinner />}><Clients /></Suspense> },
        { path: 'why-us', element: <Suspense fallback={<LoadingSpinner />}><WhyUs /></Suspense> },
        { path: 'gallery', element: <Suspense fallback={<LoadingSpinner />}><Gallery /></Suspense> },
        { path: 'contact', element: <Suspense fallback={<LoadingSpinner />}><Contact /></Suspense> },
        { path: 'privacy-policy', element: <Suspense fallback={<LoadingSpinner />}><PrivacyPolicy /></Suspense> },
        { path: 'terms-of-service', element: <Suspense fallback={<LoadingSpinner />}><TermsOfService /></Suspense> },
        { path: '*', element: <Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense> },
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
    <RouterProvider router={router} />
  </HelmetProvider>
);