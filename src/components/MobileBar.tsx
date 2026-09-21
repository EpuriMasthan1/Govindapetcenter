import { Link } from 'react-router-dom';
import { MessageCircle, CalendarPlus, Phone } from 'lucide-react';
import { buildSimpleWhatsAppUrl, buildTelUrl } from '@/lib/notifications';

export default function MobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-stone-200 bg-white/95 backdrop-blur lg:hidden">
      <a
        href={buildSimpleWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-[#25D366]"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
      <Link
        to="/book"
        className="flex flex-col items-center gap-1 border-x border-stone-200 bg-green-600 py-2.5 text-xs font-semibold text-white"
      >
        <CalendarPlus className="h-5 w-5" />
        Book Now
      </Link>
      <a
        href={buildTelUrl()}
        className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-blue-600"
      >
        <Phone className="h-5 w-5" />
        Call
      </a>
    </div>
  );
}
