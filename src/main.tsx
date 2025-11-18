import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { startTransition } from 'react';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import ManufacturingSupply from './pages/ManufacturingSupply';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import WhyUs from './pages/WhyUs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import App from './App';

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
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: 'terms-of-service', element: <TermsOfService /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  }
);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);