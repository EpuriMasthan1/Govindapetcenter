import { Link } from 'react-router-dom';
import { PawPrint, MapPin, MessageCircle, Phone, Mail } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { buildSimpleWhatsAppUrl, buildTelUrl, buildMailUrl } from '@/lib/notifications';

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/offers', label: 'Offers' },
  { to: '/book', label: 'Book Now' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white">
                <PawPrint className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-white">
                {BUSINESS.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-stone-400">
              24/7 Caring for Your Pets
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold text-white">Contact</h3>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
              <span>{BUSINESS.address}</span>
            </p>
            <a
              href={buildSimpleWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <MessageCircle className="h-4 w-4 flex-shrink-0 text-green-400" />
              <span>{BUSINESS.whatsapp}</span>
            </a>
            <a href={buildTelUrl()} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 flex-shrink-0 text-green-400" />
              <span>{BUSINESS.phone}</span>
            </a>
            <a
              href={buildMailUrl()}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="h-4 w-4 flex-shrink-0 text-green-400" />
              <span className="break-all">{BUSINESS.email}</span>
            </a>
          </div>

          {/* Links */}
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-700 pt-6 text-center text-sm text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="mt-1">Dog &amp; Cat Care Center in Tirupati, Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
}
