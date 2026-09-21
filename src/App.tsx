import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import OffersPage from '@/pages/OffersPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import FAQPage from '@/pages/FAQPage';
import BookNowPage from '@/pages/BookNowPage';
import ContactPage from '@/pages/ContactPage';
import AdminPage from '@/pages/AdminPage';

function RedirectFrom404() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  if (redirect) {
    const [path, query] = redirect.split('?');
    const cleanPath = '/' + path.replace(/^\/+/, '');
    return <Navigate to={cleanPath + (query ? '?' + query : '')} replace />;
  }
  return <HomePage />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/book" element={<BookNowPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/index.html" element={<RedirectFrom404 />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
