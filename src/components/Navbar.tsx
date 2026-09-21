import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { buildSimpleWhatsAppUrl } from '@/lib/notifications';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/offers', label: 'Offers' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/faq', label: 'FAQ' },
  { to: '/book', label: 'Book Now' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur'
          : 'bg-white/80 backdrop-blur'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={buildSimpleWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1eb858]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-stone-700 hover:bg-stone-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-green-50 text-green-700'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={buildSimpleWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-base font-semibold text-white"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
