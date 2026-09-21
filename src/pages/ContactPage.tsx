import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import {
  buildSimpleWhatsAppUrl,
  buildTelUrl,
  buildMailUrl,
} from '@/lib/notifications';
import LocationMap from '@/components/LocationMap';
import QRCodeSection from '@/components/QRCodeSection';
import { CTASection } from '@/components/Sections';

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">
            Govinda Pet Center
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            Get in touch with us for your pet care needs
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* WhatsApp */}
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10">
                  <MessageCircle className="h-6 w-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800">WhatsApp</h3>
                  <p className="text-sm text-stone-600">{BUSINESS.whatsapp}</p>
                </div>
              </div>
              <a
                href={buildSimpleWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-4 w-full"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Phone */}
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800">Phone</h3>
                  <p className="text-sm text-stone-600">{BUSINESS.phone}</p>
                </div>
              </div>
              <a href={buildTelUrl()} className="btn-call mt-4 w-full">
                <Phone className="h-5 w-5" />
                Call Us
              </a>
            </div>

            {/* Email */}
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <Mail className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800">Email</h3>
                  <p className="break-all text-sm text-stone-600">{BUSINESS.email}</p>
                </div>
              </div>
              <a href={buildMailUrl()} className="btn-accent mt-4 w-full">
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </div>

            {/* Address */}
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800">Address</h3>
                  <p className="text-sm text-stone-600">{BUSINESS.address}</p>
                </div>
              </div>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 w-full"
              >
                <MapPin className="h-5 w-5" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map & QR */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="section-title text-center">Find Govinda Pet Center</h2>
          <p className="section-subtitle text-center">{BUSINESS.address}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-stone-200/60">
              <LocationMap height="360px" />
            </div>
            <QRCodeSection />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
