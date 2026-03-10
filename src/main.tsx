import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import * as Sentry from "@sentry/react";
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

const SentryRouterProvider = Sentry.withSentryReactRouterV6Routing(RouterProvider as any);

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const isValidDsn = sentryDsn && !sentryDsn.includes("your_sentry_dsn") && !sentryDsn.includes("REPLACE_WITH");

Sentry.init({
  dsn: isValidDsn ? sentryDsn : undefined,
  environment: import.meta.env.MODE,
  enabled: import.meta.env.PROD && isValidDsn,
  tracesSampleRate: 0.2,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],

  // Scrub all PII before sending error data to Sentry servers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeSend(event: any) {
    // Helper: remove email addresses
    const scrubEmails = (str: string): string =>
      str.replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[email]"
      );

    // Helper: remove phone numbers (Indian + international formats)
    const scrubPhones = (str: string): string =>
      str.replace(/(\+?[\d\s\-().]{7,15})/g, "[phone]");

    // Combined scrubber
    const scrub = (str: string): string => scrubPhones(scrubEmails(str));

    // 1. Remove user identity fields entirely
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
      delete event.user.username;
    }

    // 2. Scrub request body if it's a string
    if (
      event.request?.data &&
      typeof event.request.data === "string"
    ) {
      event.request.data = scrub(event.request.data);
    }

    // 3. Scrub breadcrumb messages (user action trail)
    if (Array.isArray(event.breadcrumbs)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      event.breadcrumbs = event.breadcrumbs.map((crumb: any) => ({
        ...crumb,
        message: crumb.message
          ? scrub(crumb.message)
          : crumb.message,
      }));
    } else if (event.breadcrumbs && 'values' in event.breadcrumbs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event.breadcrumbs as any).values = ((event.breadcrumbs as any).values as any[]).map((crumb: any) => ({
        ...crumb,
        message: crumb.message
          ? scrub(crumb.message)
          : crumb.message,
      }));
    }

    // 4. Scrub exception values (error messages can contain PII)
    if (event.exception?.values) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      event.exception.values = event.exception.values.map((exception: any) => ({
        ...exception,
        value: exception.value
          ? scrub(exception.value)
          : exception.value,
      }));
    }

    return event;
  },
});

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <GlobalErrorBoundary>
      <SentryRouterProvider router={router} />
    </GlobalErrorBoundary>
  </HelmetProvider>
);